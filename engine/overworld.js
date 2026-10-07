/* Reading Quest engine: overworld exploration.
   A walkable 2D map for the current world. The wizard moves with arrow
   keys / WASD, touch-drag on the map, or the on-screen joystick.
   Monsters wander with simple random-walk AI; touching one starts a
   battle through Game.launchBattle, so adaptive questions, rescue,
   and rewards all keep working. The world boss roams as a special
   encounter. Locked worlds stay locked. */
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

  /* Deterministic decoration layout per world. */
  function seededRand(seed) {
    var s = seed >>> 0;
    return function () {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  }

  var THEMES = {
    whisperwood: { cls: "rq-ow-whisperwood",
                   decos: ["🌲", "🌳", "🍄", "🌿", "🌲", "🌳", "🍄", "🌿", "🌲"] },
    murkfen:     { cls: "rq-ow-murkfen",
                   decos: ["🌫️", "🪷", "🐸", "💧", "🌾", "🪷", "🐸", "💧", "🌾"] },
    gloomhollow: { cls: "rq-ow-gloomhollow",
                   decos: ["🌑", "🦇", "🕸️", "🍂", "🪨", "🦇", "🍂", "🪨", "🌑"] }
  };

  /* Positions are fractions (0..1) of the map; the map keeps a 4:3
     aspect ratio at any CSS size. */
  var WIZ_SPEED = 0.0075;
  var MON_SPEED = 0.0028;
  var BOSS_SPEED = 0.0018;
  var TOUCH_R = 0.055;
  var BOSS_R = 0.075;
  var EDGE = 0.045;

  var OW = {
    _worldId: null,
    _worldIdx: 0,
    _open: false,
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
    /* Injectable battle launcher (tests stub this). Default routes
       through Game.launchBattle like map node battles do. */
    _onBattle: null,

    themeFor: function (worldId) {
      return THEMES[worldId] ||
        { cls: "rq-ow-whisperwood", decos: ["🌲", "🌳", "🍄"] };
    },

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
      this._keys = {};
      this._joyVec = null;
      this._dragTarget = null;
      this._buildMap(worlds[wi]);
      this._open = true;
      this._bindKeys();
      var self = this;
      this._loop = setInterval(function () { self._tick(); }, 50);
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
      this._joyVec = null;
      this._dragTarget = null;
    },

    isOpen: function () { return this._open; },

    /* ---------- map construction ---------- */
    _buildMap: function (w) {
      var S = window.RQSave;
      var self = this;
      var scr = $("screen-overworld");
      scr.innerHTML = "";
      var theme = this.themeFor(w.id);

      var wrap = el("div", "rq-owwrap");
      var head = el("div", "rq-owhead");
      var titleBox = el("div", null,
        '<div class="rq-owtitle">' + w.icon + " " + w.name + "</div>" +
        '<div class="rq-owsub">Walk with arrows/WASD, drag, or the joystick. ' +
        "Bump a monster to battle!</div>");
      head.appendChild(titleBox);
      var exit = el("button", "rq-ghostbtn", "🗺️ Map");
      exit.addEventListener("click", function () {
        window.RQAudio.SFX.click();
        self.close();
        window.RQGame.showMap(self._worldIdx, false);
      });
      head.appendChild(exit);
      wrap.appendChild(head);

      var map = el("div", "rq-owmap " + theme.cls);
      map.setAttribute("id", "rq-owmap");

      /* decorations */
      var rnd = seededRand(this._worldIdx * 1000 + 7);
      for (var i = 0; i < theme.decos.length; i++) {
        var d = el("div", "rq-ow-deco", theme.decos[i]);
        d.style.left = (0.06 + rnd() * 0.88) * 100 + "%";
        d.style.top = (0.08 + rnd() * 0.72) * 100 + "%";
        map.appendChild(d);
      }

      /* wizard starts near the bottom center */
      var def = S.heroDef(S.data.activeHero);
      this._wizard = { x: 0.5, y: 0.85 };
      this._wizEl = el("div", "rq-owsprite rq-ow-wizard", def ? def.icon : "🧙");
      map.appendChild(this._wizEl);

      /* wandering monsters from this world's non-boss nodes */
      this._monsters = [];
      var seen = {};
      var defs = [];
      w.nodes.forEach(function (n) {
        if (n.boss) return;
        var md = pack().monsters.filter(function (x) { return x.id === n.monster; })[0];
        if (md && !seen[md.id]) { seen[md.id] = true; defs.push(md); }
      });
      var count = Math.min(4, Math.max(defs.length, 2));
      for (var j = 0; j < count && defs.length; j++) {
        var md2 = defs[j % defs.length];
        this._addMonster(map, md2,
          { id: "ow-" + md2.id + "-" + j, name: md2.name + " of the wilds" },
          false, rnd);
      }

      /* the world boss roams as a special encounter, until beaten */
      var bossNode = null, bossDef = null;
      for (var b = 0; b < w.nodes.length; b++) {
        if (w.nodes[b].boss) { bossNode = w.nodes[b]; break; }
      }
      if (bossNode) {
        bossDef = pack().monsters.filter(function (x) { return x.id === bossNode.monster; })[0];
      }
      if (bossDef && S.data.bossesBeaten.indexOf(bossDef.id) === -1) {
        this._addMonster(map, bossDef, bossNode, true, rnd);
      }

      /* on-screen joystick */
      map.appendChild(this._buildJoystick(map));

      /* touch-drag: wizard follows your finger */
      this._bindDrag(map);

      wrap.appendChild(map);
      scr.appendChild(wrap);
      this._paint();
    },

    _addMonster: function (map, def, node, isBoss, rnd) {
      var m = {
        def: def, node: node, isBoss: !!isBoss,
        x: 0.1 + rnd() * 0.8, y: 0.1 + rnd() * 0.6,
        a: rnd() * Math.PI * 2, t: 20 + Math.floor(rnd() * 40)
      };
      /* do not spawn on top of the wizard's start */
      if (Math.abs(m.x - 0.5) < 0.15 && m.y > 0.65) m.y = 0.25;
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
          x: clamp((cx - rect.left) / wpx, 0, 1),
          y: clamp((cy - rect.top) / hpx, 0, 1)
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

    _moveWizard: function () {
      var w = this._wizard;
      if (!w) return;
      var vx = 0, vy = 0;
      if (this._keys.up) vy -= 1;
      if (this._keys.down) vy += 1;
      if (this._keys.left) vx -= 1;
      if (this._keys.right) vx += 1;
      if (this._joyVec) { vx += this._joyVec.x; vy += this._joyVec.y; }
      if (vx || vy) {
        this._dragTarget = null;
        var len = Math.sqrt(vx * vx + vy * vy);
        w.x = clamp(w.x + vx / len * WIZ_SPEED, EDGE, 1 - EDGE);
        w.y = clamp(w.y + vy / len * WIZ_SPEED, EDGE, 1 - EDGE);
      } else if (this._dragTarget) {
        var dx = this._dragTarget.x - w.x;
        var dy = this._dragTarget.y - w.y;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d < 0.015) {
          this._dragTarget = null;
        } else {
          w.x = clamp(w.x + dx / d * WIZ_SPEED, EDGE, 1 - EDGE);
          w.y = clamp(w.y + dy / d * WIZ_SPEED, EDGE, 1 - EDGE);
        }
      }
    },

    _moveMonsters: function () {
      this._monsters.forEach(function (m) {
        m.t -= 1;
        if (m.t <= 0) {
          m.a = Math.random() * Math.PI * 2;
          m.t = 20 + Math.floor(Math.random() * 50);
        }
        var sp = m.isBoss ? BOSS_SPEED : MON_SPEED;
        m.x += Math.cos(m.a) * sp;
        m.y += Math.sin(m.a) * sp;
        if (m.x < EDGE) { m.x = EDGE; m.a = Math.PI - m.a; }
        if (m.x > 1 - EDGE) { m.x = 1 - EDGE; m.a = Math.PI - m.a; }
        if (m.y < EDGE) { m.y = EDGE; m.a = -m.a; }
        if (m.y > 1 - EDGE) { m.y = 1 - EDGE; m.a = -m.a; }
      });
    },

    _checkCollisions: function () {
      var w = this._wizard;
      if (!w) return;
      for (var i = 0; i < this._monsters.length; i++) {
        var m = this._monsters[i];
        var dx = m.x - w.x, dy = m.y - w.y;
        var r = m.isBoss ? BOSS_R : TOUCH_R;
        if (dx * dx + dy * dy < r * r) {
          this._startBattle(m);
          return;
        }
      }
    },

    _startBattle: function (m) {
      if (!this._open) return;
      var worldId = this._worldId;
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

    _paint: function () {
      if (this._wizEl && this._wizard) {
        this._wizEl.style.left = this._wizard.x * 100 + "%";
        this._wizEl.style.top = this._wizard.y * 100 + "%";
      }
      this._monsters.forEach(function (m) {
        if (m.el) {
          m.el.style.left = m.x * 100 + "%";
          m.el.style.top = m.y * 100 + "%";
        }
      });
    }
  };

  window.RQOverworld = OW;
})();
