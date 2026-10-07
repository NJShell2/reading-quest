/* Reading Quest engine: overworld maze exploration.
   Each world is a tile-based maze, Pokemon-style. The wizard walks with
   arrow keys / WASD, touch-drag on the map, or the on-screen joystick;
   walls block movement (with smooth wall-sliding). Roaming monsters
   wander the corridors with wall-aware random-walk AI; touching one
   starts a battle through Game.launchBattle, so adaptive questions,
   rescue, and rewards all keep working. The world boss waits at the
   maze destination (the open tile farthest from the entrance); beating
   it uses the real boss node id, so markNodeBeaten / Keystone page
   progression and world unlocks keep working. Locked worlds stay locked.

   Difficulty ramps with the world index (Whisperwood -> Murkfen Marsh ->
   Gloomhollow): bigger mazes, longer optimal routes, more dead ends.
   Layouts are recursive-backtracker perfect mazes on fixed seeds, so the
   boss is ALWAYS reachable; OW.mazeFor exposes the layout plus a BFS
   verifier for tests. */
(function () {
  "use strict";

  function pack() { return window.ContentPacks.reading; }
  function $(id) { return document.getElementById(id); }
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  /* Deterministic PRNG so every player gets the same maze per world. */
  function seededRand(seed) {
    var s = seed >>> 0;
    return function () {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  }

  /* Per-world maze specs. Sizes ramp up; seeds were picked so the
     optimal spawn-to-boss path strictly grows with the world index
     (8 < 26 < 38 tiles) and dead ends grow too (2 < 4 < 6). */
  var MAZE_SPECS = [
    { cols: 7,  rows: 5,  seed: 7919,   monsters: 4 },  /* whisperwood: trivially easy */
    { cols: 11, rows: 9,  seed: 166300, monsters: 5 },  /* murkfen: longer, branchier */
    { cols: 13, rows: 11, seed: 126706, monsters: 6 }   /* gloomhollow: longest, most dead ends */
  ];

  var THEMES = {
    whisperwood: "rq-ow-whisperwood",
    murkfen:     "rq-ow-murkfen",
    gloomhollow: "rq-ow-gloomhollow"
  };

  /* Recursive-backtracker perfect maze. grid[y][x] === true means wall.
     cols/rows must be odd; cells live on odd coordinates. */
  function genMaze(cols, rows, seed) {
    var grid = [];
    for (var y = 0; y < rows; y++) {
      grid.push([]);
      for (var x = 0; x < cols; x++) grid[y].push(true);
    }
    var rnd = seededRand(seed);
    var cw = (cols - 1) / 2, ch = (rows - 1) / 2;
    var visited = [];
    for (var cy = 0; cy < ch; cy++) {
      visited.push([]);
      for (var cx = 0; cx < cw; cx++) visited[cy].push(false);
    }
    var stack = [[0, 0]];
    visited[0][0] = true;
    grid[1][1] = false;
    while (stack.length) {
      var top = stack[stack.length - 1];
      var cx0 = top[0], cy0 = top[1];
      var nbs = [];
      if (cx0 > 0 && !visited[cy0][cx0 - 1]) nbs.push([-1, 0]);
      if (cx0 < cw - 1 && !visited[cy0][cx0 + 1]) nbs.push([1, 0]);
      if (cy0 > 0 && !visited[cy0 - 1][cx0]) nbs.push([0, -1]);
      if (cy0 < ch - 1 && !visited[cy0 + 1][cx0]) nbs.push([0, 1]);
      if (!nbs.length) { stack.pop(); continue; }
      var d = nbs[Math.floor(rnd() * nbs.length)];
      var nx = cx0 + d[0], ny = cy0 + d[1];
      visited[ny][nx] = true;
      grid[cy0 * 2 + 1 + d[1]][cx0 * 2 + 1 + d[0]] = false;
      grid[ny * 2 + 1][nx * 2 + 1] = false;
      stack.push([nx, ny]);
    }
    return grid;
  }

  /* BFS from the entrance over open tiles. Returns distances, the
     farthest open tile (the boss destination), and a dead-end count. */
  function analyzeMaze(grid, sx, sy) {
    var rows = grid.length, cols = grid[0].length;
    var dist = [];
    for (var y = 0; y < rows; y++) {
      dist.push([]);
      for (var x = 0; x < cols; x++) dist[y].push(-1);
    }
    dist[sy][sx] = 0;
    var q = [[sx, sy]];
    var far = { tx: sx, ty: sy, d: 0 };
    while (q.length) {
      var c = q.shift(), x = c[0], y = c[1];
      var dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
      for (var i = 0; i < dirs.length; i++) {
        var nx = x + dirs[i][0], ny = y + dirs[i][1];
        if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue;
        if (grid[ny][nx]) continue;
        if (dist[ny][nx] !== -1) continue;
        dist[ny][nx] = dist[y][x] + 1;
        if (dist[ny][nx] > far.d) far = { tx: nx, ty: ny, d: dist[ny][nx] };
        q.push([nx, ny]);
      }
    }
    var deadEnds = 0;
    for (var yy = 1; yy < rows - 1; yy++) {
      for (var xx = 1; xx < cols - 1; xx++) {
        if (grid[yy][xx]) continue;
        if (xx === sx && yy === sy) continue;
        var open = 0;
        if (!grid[yy - 1][xx]) open++;
        if (!grid[yy + 1][xx]) open++;
        if (!grid[yy][xx - 1]) open++;
        if (!grid[yy][xx + 1]) open++;
        if (open === 1) deadEnds++;
      }
    }
    return { dist: dist, far: far, deadEnds: deadEnds };
  }

  /* Full layout for a world: maze grid, entrance, boss destination,
     optimal route length, dead-end count. Cached per world index. */
  var _mazeCache = {};
  function mazeFor(worldIdx) {
    if (_mazeCache[worldIdx]) return _mazeCache[worldIdx];
    var spec = MAZE_SPECS[worldIdx] || MAZE_SPECS[0];
    var grid = genMaze(spec.cols, spec.rows, spec.seed);
    var a = analyzeMaze(grid, 1, 1);
    var mz = { spec: spec, grid: grid,
               spawn: { tx: 1, ty: 1 },
               boss: { tx: a.far.tx, ty: a.far.ty },
               optimalLen: a.far.d, deadEnds: a.deadEnds,
               dist: a.dist };
    _mazeCache[worldIdx] = mz;
    return mz;
  }

  /* Positions are in tile units; sprites sit at tile centers. */
  var WIZ_TPS = 2.4;    /* wizard tiles per second */
  var MON_TPS = 0.9;    /* monster tiles per second */
  var TICK_MS = 50;
  var TOUCH_R = 0.5;    /* battle trigger radius, in tiles */
  var BODY_R = 0.3;     /* collision body radius, in tiles */

  var OW = {
    _worldId: null,
    _worldIdx: 0,
    _open: false,
    _maze: null,
    _wizard: null,
    _wizEl: null,
    _monsters: [],
    _keys: {},
    _joyVec: null,
    _dragTarget: null,
    _loop: null,
    _keyDown: null,
    _keyUp: null,
    _winExtra: [],
    /* Pending overworld encounter: captured when a roam/boss battle
       starts, consumed when the maze reopens after the battle. */
    _pendingReturn: null,
    /* Injectable battle launcher (tests stub this). Default routes
       through Game.launchBattle like map node battles do. */
    _onBattle: null,

    themeFor: function (worldId) {
      return THEMES[worldId] || "rq-ow-whisperwood";
    },

    /* Test hook: layout + BFS verifier data for a world. */
    mazeFor: mazeFor,

    open: function (worldId) {
      var S = window.RQSave;
      if (!S) return false;
      var worlds = pack().worlds;
      var wi = -1;
      for (var i = 0; i < worlds.length; i++) {
        if (worlds[i].id === worldId) { wi = i; break; }
      }
      if (wi < 0) return false;
      /* Locked worlds stay locked. */
      if (!S.zone(worldId).unlocked) return false;
      this.close();
      this._worldId = worldId;
      this._worldIdx = wi;
      this._maze = mazeFor(wi);
      this._keys = {};
      this._joyVec = null;
      this._dragTarget = null;
      this._buildMap(worlds[wi]);
      this._open = true;
      this._bindKeys();
      var self = this;
      this._loop = setInterval(function () { self._tick(); }, TICK_MS);
      try { window.scrollTo(0, 0); } catch (e) {}
      return true;
    },

    close: function () {
      this._open = false;
      if (this._loop) { clearInterval(this._loop); this._loop = null; }
      this._unbindKeys();
      this._monsters = [];
      this._wizEl = null;
      this._wizard = null;
      this._maze = null;
      this._joyVec = null;
      this._dragTarget = null;
    },

    isOpen: function () { return this._open; },

    /* Is the tile at (possibly fractional) tile coords a wall? */
    _solidAt: function (tx, ty) {
      var mz = this._maze;
      if (!mz) return true;
      var gx = Math.floor(tx), gy = Math.floor(ty);
      if (gx < 0 || gy < 0 || gx >= mz.spec.cols || gy >= mz.spec.rows) return true;
      return mz.grid[gy][gx];
    },

    /* ---------- map construction ---------- */
    _buildMap: function (w) {
      var S = window.RQSave;
      var self = this;
      var scr = $("screen-overworld");
      scr.innerHTML = "";
      var theme = this.themeFor(w.id);
      var mz = this._maze, spec = mz.spec;

      var wrap = el("div", "rq-owwrap");
      var head = el("div", "rq-owhead");
      var titleBox = el("div", null,
        '<div class="rq-owtitle">' + w.icon + " " + w.name + "</div>" +
        '<div class="rq-owsub">Find the 📜 page at the end of the maze! ' +
        "Walk with arrows/WASD, drag, or the joystick. Bump a monster to battle!</div>");
      head.appendChild(titleBox);
      var exit = el("button", "rq-ghostbtn", "🗺️ Map");
      exit.addEventListener("click", function () {
        window.RQAudio.SFX.click();
        self.close();
        window.RQGame.showMap(self._worldIdx, false);
      });
      head.appendChild(exit);
      wrap.appendChild(head);

      var map = el("div", "rq-owmap " + theme);
      map.setAttribute("id", "rq-owmap");

      /* the maze grid */
      var grid = el("div", "rq-owgrid");
      grid.style.gridTemplateColumns = "repeat(" + spec.cols + ", 1fr)";
      grid.style.gridTemplateRows = "repeat(" + spec.rows + ", 1fr)";
      grid.style.aspectRatio = spec.cols + " / " + spec.rows;
      for (var gy = 0; gy < spec.rows; gy++) {
        for (var gx = 0; gx < spec.cols; gx++) {
          var cell = el("div", "rq-ow-cell" + (mz.grid[gy][gx] ? " rq-ow-wall" : ""));
          if (gx === mz.boss.tx && gy === mz.boss.ty) {
            cell.classList.add("rq-ow-exit");
            cell.textContent = "📜";
          }
          if (gx === mz.spawn.tx && gy === mz.spawn.ty) cell.classList.add("rq-ow-spawn");
          grid.appendChild(cell);
        }
      }
      map.appendChild(grid);

      /* wizard starts at the maze entrance, unless a battle just
         ended (or a mid-battle refresh happened): then the saved
         encounter position is restored so the round trip returns to
         the exact tile, facing the same way. Consumed on use. */
      var ret = S.data.owReturn;
      var def = S.heroDef(S.data.activeHero);
      var startX = mz.spawn.tx + 0.5, startY = mz.spawn.ty + 0.5, facing = "down";
      if (ret && ret.worldId === w.id &&
          typeof ret.x === "number" && typeof ret.y === "number") {
        startX = ret.x; startY = ret.y; facing = ret.facing || "down";
        S.data.owReturn = null;
        S.write();
      }
      this._wizard = { x: startX, y: startY, facing: facing };
      this._wizEl = el("div", "rq-owsprite rq-ow-wizard", def ? def.icon : "🧙");
      map.appendChild(this._wizEl);

      /* wandering monsters along the corridors. Defeated roamers stay
         gone: their uids are persisted per maze in the save, so a page
         refresh cannot resurrect them. */
      this._monsters = [];
      var defeated = (S.data.owDefeated && S.data.owDefeated[w.id]) || [];
      var seen = {};
      var defs = [];
      w.nodes.forEach(function (n) {
        if (n.boss) return;
        var md = pack().monsters.filter(function (x) { return x.id === n.monster; })[0];
        if (md && !seen[md.id]) { seen[md.id] = true; defs.push(md); }
      });
      var rnd = seededRand(spec.seed + 99);
      var spots = this._pickMonsterSpots(rnd, spec.monsters);
      for (var j = 0; j < spots.length && defs.length; j++) {
        var uid = "ow-" + defs[j % defs.length].id + "-" + j;
        if (defeated.indexOf(uid) !== -1) continue;
        var md2 = defs[j % defs.length];
        this._addMonster(map, md2,
          { id: uid, name: md2.name + " of the wilds" },
          false, spots[j].tx + 0.5, spots[j].ty + 0.5, rnd);
      }

      /* the world boss waits at the maze destination, until beaten */
      var bossNode = null, bossDef = null;
      for (var b = 0; b < w.nodes.length; b++) {
        if (w.nodes[b].boss) { bossNode = w.nodes[b]; break; }
      }
      if (bossNode) {
        bossDef = pack().monsters.filter(function (x) { return x.id === bossNode.monster; })[0];
      }
      if (bossDef && S.data.bossesBeaten.indexOf(bossDef.id) === -1) {
        this._addMonster(map, bossDef, bossNode, true,
          mz.boss.tx + 0.5, mz.boss.ty + 0.5, rnd);
      }

      /* on-screen joystick */
      map.appendChild(this._buildJoystick(map));

      /* touch-drag: wizard follows your finger */
      this._bindDrag(map);

      wrap.appendChild(map);
      scr.appendChild(wrap);
      this._paint();
    },

    /* Corridor tiles for roaming monsters: open tiles away from the
       entrance and the boss destination, shuffled deterministically. */
    _pickMonsterSpots: function (rnd, count) {
      var mz = this._maze, spec = mz.spec;
      var cands = [];
      for (var gy = 1; gy < spec.rows - 1; gy++) {
        for (var gx = 1; gx < spec.cols - 1; gx++) {
          if (mz.grid[gy][gx]) continue;
          if (gx === mz.spawn.tx && gy === mz.spawn.ty) continue;
          if (gx === mz.boss.tx && gy === mz.boss.ty) continue;
          var dSpawn = Math.abs(gx - mz.spawn.tx) + Math.abs(gy - mz.spawn.ty);
          if (dSpawn < 3) continue;
          cands.push({ tx: gx, ty: gy });
        }
      }
      for (var i = cands.length - 1; i > 0; i--) {
        var k = Math.floor(rnd() * (i + 1));
        var t = cands[i]; cands[i] = cands[k]; cands[k] = t;
      }
      /* Keep monsters spread out. Small mazes cannot fit a wide
         spread, so relax the minimum gap until enough spots fit. */
      var spots = [];
      for (var gap = 3; gap >= 1 && spots.length < count; gap--) {
        spots = [];
        for (var s = 0; s < cands.length && spots.length < count; s++) {
          var ok = true;
          for (var m = 0; m < spots.length; m++) {
            if (Math.abs(cands[s].tx - spots[m].tx) + Math.abs(cands[s].ty - spots[m].ty) < gap) {
              ok = false; break;
            }
          }
          if (ok) spots.push(cands[s]);
        }
      }
      return spots;
    },

    _addMonster: function (map, def, node, isBoss, x, y, rnd) {
      var dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
      var m = {
        def: def, node: node, isBoss: !!isBoss,
        uid: node.id,
        x: x, y: y,
        dir: dirs[Math.floor(rnd() * dirs.length)]
      };
      var s = el("div",
        "rq-owsprite rq-ow-mon" + (isBoss ? " rq-ow-boss" : ""),
        def.icon);
      if (isBoss) s.appendChild(el("div", "rq-ow-bosstag", "👹 BOSS"));
      m.el = s;
      map.appendChild(s);
      this._monsters.push(m);
      return m;
    },

    /* ---------- controls ---------- */
    _keyMap: function (k) {
      switch (k) {
        case "ArrowUp": case "w": case "W": return "up";
        case "ArrowDown": case "s": case "S": return "down";
        case "ArrowLeft": case "a": case "A": return "left";
        case "ArrowRight": case "d": case "D": return "right";
        default: return null;
      }
    },
    _bindKeys: function () {
      var self = this;
      this._unbindKeys();
      this._keyDown = function (ev) {
        var dir = self._keyMap(ev.key);
        if (dir) {
          self._keys[dir] = true;
          if (ev.preventDefault) ev.preventDefault();
        }
      };
      this._keyUp = function (ev) {
        var dir = self._keyMap(ev.key);
        if (dir) {
          self._keys[dir] = false;
          if (ev.preventDefault) ev.preventDefault();
        }
      };
      window.addEventListener("keydown", this._keyDown);
      window.addEventListener("keyup", this._keyUp);
    },
    _unbindKeys: function () {
      if (this._keyDown) window.removeEventListener("keydown", this._keyDown);
      if (this._keyUp) window.removeEventListener("keyup", this._keyUp);
      this._keyDown = null;
      this._keyUp = null;
      var extra = this._winExtra;
      this._winExtra = [];
      extra.forEach(function (h) {
        try { window.removeEventListener(h.type, h.fn); } catch (e) {}
      });
    },
    _winOn: function (type, fn) {
      window.addEventListener(type, fn);
      this._winExtra.push({ type: type, fn: fn });
    },

    _buildJoystick: function (map) {
      var self = this;
      var joy = el("div", "rq-joy");
      var knob = el("div", "rq-joyknob");
      joy.appendChild(knob);
      function setKnob(dx, dy) {
        knob.style.left = (33 + dx) + "px";
        knob.style.top = (33 + dy) + "px";
      }
      function vecFrom(ev, rect) {
        var cx = rect.left + rect.width / 2;
        var cy = rect.top + rect.height / 2;
        var px = ev.clientX !== undefined ? ev.clientX
               : (ev.touches && ev.touches[0] ? ev.touches[0].clientX : cx);
        var py = ev.clientY !== undefined ? ev.clientY
               : (ev.touches && ev.touches[0] ? ev.touches[0].clientY : cy);
        return { x: px - cx, y: py - cy };
      }
      joy.addEventListener("pointerdown", function (ev) {
        if (ev.preventDefault) ev.preventDefault();
        var rect = joy.getBoundingClientRect();
        function move(e2) {
          var v = vecFrom(e2, rect);
          var r = 34;
          var len = Math.sqrt(v.x * v.x + v.y * v.y);
          var dx = v.x, dy = v.y;
          if (len > r) { dx = dx / len * r; dy = dy / len * r; len = r; }
          setKnob(dx, dy);
          self._joyVec = len < 6 ? null : { x: dx / r, y: dy / r };
        }
        function end() {
          self._joyVec = null;
          setKnob(0, 0);
          window.removeEventListener("pointermove", move);
          window.removeEventListener("pointerup", end);
          window.removeEventListener("pointercancel", end);
        }
        move(ev);
        window.addEventListener("pointermove", move);
        window.addEventListener("pointerup", end);
        window.addEventListener("pointercancel", end);
      });
      return joy;
    },

    _bindDrag: function (map) {
      var self = this;
      var mz = this._maze, spec = mz.spec;
      function insideJoy(t) {
        while (t) {
          if (t.classList && t.classList.contains("rq-joy")) return true;
          t = t.parentNode;
        }
        return false;
      }
      function point(ev) {
        var rect = map.getBoundingClientRect();
        var cx = ev.clientX !== undefined ? ev.clientX
               : (ev.touches && ev.touches[0] ? ev.touches[0].clientX : 0);
        var cy = ev.clientY !== undefined ? ev.clientY
               : (ev.touches && ev.touches[0] ? ev.touches[0].clientY : 0);
        var wpx = rect.width || 1, hpx = rect.height || 1;
        return {
          x: clamp((cx - rect.left) / wpx, 0, 1) * spec.cols,
          y: clamp((cy - rect.top) / hpx, 0, 1) * spec.rows
        };
      }
      var dragging = false;
      map.addEventListener("pointerdown", function (ev) {
        if (insideJoy(ev.target)) return;
        dragging = true;
        self._dragTarget = point(ev);
        if (ev.preventDefault) ev.preventDefault();
      });
      this._winOn("pointermove", function (ev) {
        if (dragging) self._dragTarget = point(ev);
      });
      function stop() { dragging = false; self._dragTarget = null; }
      this._winOn("pointerup", stop);
      this._winOn("pointercancel", stop);
    },

    /* ---------- simulation ---------- */
    _tick: function () {
      if (!this._open) return;
      this._moveWizard();
      this._moveMonsters();
      this._checkCollisions();
      this._paint();
    },

    /* Try moving along one axis; walls block that axis only, so the
       wizard slides along corridors instead of sticking. */
    _stepAxis: function (dx, dy) {
      var w = this._wizard;
      if (!w) return;
      var nx = w.x + dx, ny = w.y + dy;
      var pts = dx !== 0
        ? [[nx + (dx > 0 ? BODY_R : -BODY_R), w.y - BODY_R * 0.7],
           [nx + (dx > 0 ? BODY_R : -BODY_R), w.y],
           [nx + (dx > 0 ? BODY_R : -BODY_R), w.y + BODY_R * 0.7]]
        : [[w.x - BODY_R * 0.7, ny + (dy > 0 ? BODY_R : -BODY_R)],
           [w.x, ny + (dy > 0 ? BODY_R : -BODY_R)],
           [w.x + BODY_R * 0.7, ny + (dy > 0 ? BODY_R : -BODY_R)]];
      for (var i = 0; i < pts.length; i++) {
        if (this._solidAt(pts[i][0], pts[i][1])) return;
      }
      w.x = nx; w.y = ny;
    },

    _moveWizard: function () {
      var w = this._wizard;
      if (!w) return;
      var step = WIZ_TPS * (TICK_MS / 1000);
      var vx = 0, vy = 0;
      if (this._keys.up) vy -= 1;
      if (this._keys.down) vy += 1;
      if (this._keys.left) vx -= 1;
      if (this._keys.right) vx += 1;
      if (this._joyVec) { vx += this._joyVec.x; vy += this._joyVec.y; }
      if (vx || vy) {
        this._dragTarget = null;
        var len = Math.sqrt(vx * vx + vy * vy);
        if (Math.abs(vx) >= Math.abs(vy)) w.facing = vx > 0 ? "right" : "left";
        else w.facing = vy > 0 ? "down" : "up";
        this._stepAxis(vx / len * step, 0);
        this._stepAxis(0, vy / len * step);
      } else if (this._dragTarget) {
        var dx = this._dragTarget.x - w.x;
        var dy = this._dragTarget.y - w.y;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d < 0.2) {
          this._dragTarget = null;
        } else {
          if (Math.abs(dx) >= Math.abs(dy)) w.facing = dx > 0 ? "right" : "left";
          else w.facing = dy > 0 ? "down" : "up";
          this._stepAxis(dx / d * step, 0);
          this._stepAxis(0, dy / d * step);
        }
      }
    },

    /* Wall-aware random walk: pick a new open direction when blocked. */
    _moveMonsters: function () {
      var self = this;
      var step = MON_TPS * (TICK_MS / 1000);
      var dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
      this._monsters.forEach(function (m) {
        if (m.isBoss) return; /* the boss holds the destination tile */
        var ahead = 0.45;
        var nx = m.x + m.dir[0] * ahead, ny = m.y + m.dir[1] * ahead;
        if (self._solidAt(nx, ny)) {
          var open = [];
          for (var i = 0; i < dirs.length; i++) {
            if (dirs[i][0] === -m.dir[0] && dirs[i][1] === -m.dir[1]) continue;
            if (!self._solidAt(m.x + dirs[i][0] * ahead, m.y + dirs[i][1] * ahead)) {
              open.push(dirs[i]);
            }
          }
          m.dir = open.length ? open[Math.floor(Math.random() * open.length)]
                              : [-m.dir[0], -m.dir[1]];
        } else {
          m.x += m.dir[0] * step;
          m.y += m.dir[1] * step;
        }
      });
    },

    _checkCollisions: function () {
      var w = this._wizard;
      if (!w) return;
      for (var i = 0; i < this._monsters.length; i++) {
        var m = this._monsters[i];
        var dx = m.x - w.x, dy = m.y - w.y;
        if (dx * dx + dy * dy < TOUCH_R * TOUCH_R) {
          this._startBattle(m);
          return;
        }
      }
    },

    _startBattle: function (m) {
      if (!this._open) return;
      var worldId = this._worldId;
      /* Capture the exact encounter spot (same maze, same facing)
         BEFORE the maze closes. Persisted in the save so the round
         trip is seamless even across a mid-battle page refresh; the
         maze consumes it when it reopens after the battle. */
      var w = this._wizard;
      var ret = { worldId: worldId,
                  x: w ? w.x : null, y: w ? w.y : null,
                  facing: w ? (w.facing || "down") : "down",
                  monsterUid: m.uid || null, isBoss: !!m.isBoss };
      this._pendingReturn = ret;
      window.RQSave.data.owReturn = ret;
      window.RQSave.write();
      this.close();
      var heroId = window.RQSave.data.activeHero;
      /* Winning (or retreating) out in the wilds returns to the wilds. */
      window.RQGame._afterBattleReturn = function () {
        window.RQGame.showOverworld(worldId);
      };
      var launch = this._onBattle || function (wid, node, mon, hid) {
        window.RQGame.launchBattle(wid, node, mon, hid);
      };
      launch(worldId, m.node, m.def, heroId);
    },

    /* Called by Game.afterBattle once the battle result is known. A
       defeated roaming monster is recorded per maze in the save, so it
       stays off the board across rebuilds and refreshes. Monsters the
       player fled from (or lost to) are left alone. Bosses are tracked
       through bossesBeaten / Keystone progression, never here. */
    afterEncounter: function (res) {
      var S = window.RQSave;
      if (!S || !S.data) return;
      var ret = this._pendingReturn || S.data.owReturn;
      this._pendingReturn = null;
      if (!ret || !ret.worldId) return;
      if (res && res.victory && ret.monsterUid && !ret.isBoss) {
        if (!S.data.owDefeated) S.data.owDefeated = {};
        var arr = S.data.owDefeated[ret.worldId] ||
                  (S.data.owDefeated[ret.worldId] = []);
        if (arr.indexOf(ret.monsterUid) === -1) arr.push(ret.monsterUid);
        S.write();
      }
    },

    _paint: function () {
      var spec = this._maze ? this._maze.spec : null;
      if (!spec) return;
      if (this._wizEl && this._wizard) {
        this._wizEl.style.left = (this._wizard.x / spec.cols * 100) + "%";
        this._wizEl.style.top = (this._wizard.y / spec.rows * 100) + "%";
      }
      this._monsters.forEach(function (m) {
        if (m.el) {
          m.el.style.left = (m.x / spec.cols * 100) + "%";
          m.el.style.top = (m.y / spec.rows * 100) + "%";
        }
      });
    }
  };

  window.RQOverworld = OW;
})();
