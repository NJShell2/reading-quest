/* Reading Quest engine: turn-based battle loop (Prodigy-style).
   Answer reading questions to cast spells. Wrong answers only fumble
   your turn; they never damage you.
   Magic meter: spells cost magic (default 30). Meditate to refill.
   startTutorial: fully scripted hand-held first battle vs Mumblekit.
   Rescuable monsters: weaken below 30% HP, then RESCUE them. */
(function () {
  "use strict";

  function pack() { return window.ContentPacks.reading; }
  function $(id) { return document.getElementById(id); }
  function rnd(a, b) { return a + Math.random() * (b - a); }
  function ri(a, b) { return Math.floor(rnd(a, b + 1)); }

  function spellCost(sp) { return sp.cost || 30; }
  function spellAim(sp) { return sp.aim || 100; }
  function spellRecharge(sp) { return sp.recharge || 2; }
  function spellEst(sp, heroId) {
    return Math.max(1, Math.round(sp.mult * window.RQSave.power(heroId)));
  }

  function makeQuestion(heroId, def) {
    var tier = window.RQSave.hero(heroId).tier || 1;
    var gens = def.gens || pack().classes[0].gens;
    var g = gens[ri(0, gens.length - 1)];
    var H = pack().helpers;
    var helpers = {
      pick: function (a) { return H.pick(Math.random, a); },
      shuffle: function (a) { return H.shuffle(Math.random, a); },
      sample: function (a, n, avoid) { return H.sample(Math.random, a, n, avoid); }
    };
    var q = g(tier, helpers);
    q.tier = tier;
    return q;
  }

  function familiarOf(heroId) {
    return window.RQSave.hero(heroId).familiar || null;
  }

      /* Shared arena shell used by normal and tutorial battles. */
  function buildArena(mon, heroId) {
    /* Safety: a battle always starts on a clean stage. Any overlay left
       over from an earlier flow (double-tap, interrupted modal) is
       removed so it can never cover the arena or trap the player. */
    try {
      Array.prototype.forEach.call(
        document.querySelectorAll(".rq-overlay"),
        function (o) { o.remove(); });
    } catch (e) {}
    var S = window.RQSave;
    var def = S.heroDef(heroId), h = S.hero(heroId);
    var fam = familiarOf(heroId);
    var scr = $("screen-battle");
    scr.innerHTML = "";
    var wrap = document.createElement("div");
    wrap.className = "rq-battlewrap";
    wrap.innerHTML =
      '<div class="rq-arena">' +
        '<div class="rq-fighter rq-enemy" id="b-enemy-fighter"><div class="rq-sprite" id="b-enemy-sprite">' + mon.icon + '</div>' +
        '<div class="rq-fname">' + mon.name + '</div>' +
        '<div class="rq-hpbar"><div class="rq-hpfill rq-enemyhp" id="b-enemy-hp"></div></div></div>' +
        '<div class="rq-vs">⚔️</div>' +
        '<div class="rq-fighter rq-hero"><div class="rq-sprite" id="b-hero-sprite">' + def.icon + '</div>' +
        '<div class="rq-fname">' + def.name + ' <span class="rq-lvl">Lv ' + h.level + '</span>' +
        (fam ? ' <span class="rq-fam" title="Familiar">' + fam.icon + '</span>' : '') + '</div>' +
        '<div class="rq-hpbar"><div class="rq-hpfill rq-herohp" id="b-hero-hp"></div></div>' +
        '<div class="rq-magicbar" title="Magic"><div class="rq-magicfill" id="b-magic"></div></div>' +
        '<div class="rq-magiclabel">🔮 <span id="b-magicnum"></span></div></div>' +
      '</div>' +
      '<div class="rq-bmsg" id="b-msg"></div>' +
      '<div class="rq-qzone" id="b-q"></div>' +
      '<div class="rq-spellbar" id="b-spells"></div>' +
      '<div class="rq-itembar" id="b-items"></div>';
    scr.appendChild(wrap);
    return scr;
  }

  function paintBars(state) {
    $("b-enemy-hp").style.width = Math.max(0, state.monHp / state.monMax * 100) + "%";
    $("b-hero-hp").style.width = Math.max(0, state.heroHp / state.heroMax * 100) + "%";
    $("b-magic").style.width = Math.max(0, state.magic / state.maxMagic * 100) + "%";
    $("b-magicnum").textContent = Math.floor(state.magic) + "/" + state.maxMagic;
  }
  function shake(id) {
    var e = $(id);
    e.classList.remove("rq-shake"); void e.offsetWidth; e.classList.add("rq-shake");
  }

  var Battle = {
    /* opts: { heroId, monster, nodeId, worldId, onDone(result) } */
    start: function (opts) {
      var S = window.RQSave, A = window.RQAudio;
      var heroId = opts.heroId, def = S.heroDef(heroId), h = S.hero(heroId);
      var mon = JSON.parse(JSON.stringify(opts.monster));
      var maxMagic = S.maxMagic(heroId);
      var state = {
        heroHp: S.maxHp(heroId), heroMax: S.maxHp(heroId),
        monHp: mon.hp, monMax: mon.hp,
        magic: maxMagic, maxMagic: maxMagic,
        cooldowns: {}, streak: 0, best: 0,
        familiarHealUsed: false, over: false,
        rescueOffered: false, rescueDone: false,
        xpEarned: 0, coinsEarned: 0
      };
      var fam = familiarOf(heroId);
      var famDmg = fam ? fam.stats.power + (fam.evolved ? 2 : 0) : 0;

      buildArena(mon, heroId);
      var msgEl = $("b-msg"), qEl = $("b-q");
      function say(t) { msgEl.textContent = t; }
      paintBars(state);
      if (mon.boss) { A.SFX.boss(); }
      say("A wild " + mon.name + " appears!");
      renderSpells(); renderItems();

      /* ---- spell bar: Power / Aim / Recharge stats, magic cost ---- */
      function renderSpells() {
        var bar = $("b-spells"); bar.innerHTML = "";
        var spells = S.spellsFor(heroId);
        var anyAffordable = false;
        spells.forEach(function (sp) {
          var cost = spellCost(sp);
          var cd = state.cooldowns[sp.name] || 0;
          var afford = state.magic >= cost;
          if (afford && cd <= 0) anyAffordable = true;
          var b = document.createElement("button");
          b.className = "rq-spell" + (afford ? "" : " rq-nomagic"); b.type = "button";
          b.innerHTML = '<span class="rq-spellicon">' + sp.icon + '</span>' +
            '<span class="rq-spellname">' + sp.name + '</span>' +
            '<span class="rq-spellstats">⚔️' + spellEst(sp, heroId) +
            ' 🎯' + spellAim(sp) + ' ⏳' + spellRecharge(sp) + ' 🔮' + cost + '</span>' +
            (cd > 0 ? '<span class="rq-cd">' + cd + '</span>' : '');
          b.disabled = cd > 0 || !afford || state.over;
          b.title = sp.desc;
          b.addEventListener("click", function () { playerCast(sp); });
          bar.appendChild(b);
        });
        if (!anyAffordable && !state.over) {
          var hint = document.createElement("div");
          hint.className = "rq-oom";
          hint.textContent = "Out of Magic! Tap Meditate below.";
          bar.appendChild(hint);
        }
      }

      function renderItems() {
        var bar = $("b-items"); bar.innerHTML = "";
        /* Meditate: always available, refills magic by answering */
        var med = document.createElement("button");
        med.className = "rq-item rq-meditate"; med.type = "button";
        med.innerHTML = "🧘 Meditate";
        med.title = "Answer a question to refill magic (+45 if right, +15 if not)";
        med.disabled = state.over || state.magic >= state.maxMagic;
        med.addEventListener("click", meditate);
        bar.appendChild(med);
        var items = [["potion", "🧪"], ["crystal", "💎"]];
        items.forEach(function (pair) {
          var id = pair[0];
          if ((S.data.items[id] || 0) <= 0) return;
          var b = document.createElement("button");
          b.className = "rq-item"; b.type = "button";
          b.textContent = pair[1] + " x" + S.data.items[id];
          b.addEventListener("click", function () { useItem(id); });
          bar.appendChild(b);
        });
        if (fam && !state.familiarHealUsed) {
          var fb = document.createElement("button");
          fb.className = "rq-item"; fb.type = "button";
          fb.textContent = fam.icon + " Heal";
          fb.addEventListener("click", function () {
            if (state.over || state.familiarHealUsed) return;
            state.familiarHealUsed = true;
            var amt = Math.round(state.heroMax * 0.3);
            state.heroHp = Math.min(state.heroMax, state.heroHp + amt);
            A.SFX.heal(); paintBars(state); renderSpells(); renderItems();
            say(fam.name + " heals you for " + amt + "!");
            setTimeout(enemyTurn, 900);
          });
          bar.appendChild(fb);
        }
        /* RESCUE paw badge: wild rescuable creature below 30% HP.
           Once offered, the badge is re-rendered on every item-bar
           refresh until the rescue resolves: an earlier refresh must
           never wipe it away while the player is deciding. */
        var rescueReady = mon.rescuable && !state.rescueDone && state.monHp > 0 &&
                          state.monHp / state.monMax < 0.3;
        if (rescueReady && !state.rescueOffered) {
          state.rescueOffered = true;
          A.SFX.unlock();
          say(mon.name + " is weak! Tap RESCUE to set it free!");
        }
        if (state.rescueOffered && !state.rescueDone) {
          var rb = document.createElement("button");
          rb.className = "rq-rescuebadge"; rb.type = "button";
          rb.innerHTML = "🐾 RESCUE!";
          rb.addEventListener("click", rescueSequence);
          bar.appendChild(rb);
        }
      }

      function useItem(id) {
        if (state.over || (S.data.items[id] || 0) <= 0) return;
        S.data.items[id]--; S.write();
        if (id === "potion") {
          var amt = Math.round(state.heroMax * 0.5);
          state.heroHp = Math.min(state.heroMax, state.heroHp + amt);
          A.SFX.heal(); say("Potion! +" + amt + " health.");
        } else if (id === "crystal") {
          state.cooldowns = {};
          A.SFX.streak(); say("Magic crystal! All spells ready again!");
        }
        paintBars(state); renderSpells(); renderItems();
      }

      /* Meditate: answer a question, refill magic. Uses your turn. */
      function meditate() {
        if (state.over || state.magic >= state.maxMagic) return;
        A.ensure(); A.SFX.click();
        $("b-spells").innerHTML = ""; $("b-items").innerHTML = "";
        say("Breathe in... breathe out... answer to gather magic.");
        var q = makeQuestion(heroId, def);
        var t0 = Date.now();
        window.RQQuestions.ask(qEl, q).then(function (res) {
          qEl.innerHTML = "";
          var ms = Date.now() - t0;
          window.RQAdaptive.record(heroId, { correct: res.correct, ms: ms, kind: q.kind });
          var gain = res.correct ? 45 : 15;
          state.magic = Math.min(state.maxMagic, state.magic + gain);
          if (res.correct) { state.streak++; A.SFX.correct(); }
          else { state.streak = 0; A.SFX.wrong(); }
          say(res.correct ? "Focused! +" + gain + " magic." : "A little magic trickles in: +" + gain + ".");
          paintBars(state);
          setTimeout(function () { if (!state.over) enemyTurn(); }, 900);
        });
      }

      /* ---- player turn ---- */
      function playerCast(sp) {
        if (state.over) return;
        var cost = spellCost(sp);
        if (state.magic < cost) return;
        A.ensure(); A.SFX.click();
        state.magic -= cost;
        $("b-spells").innerHTML = ""; $("b-items").innerHTML = "";
        say("Cast " + sp.name + "! Answer to unleash it...");
        var q = makeQuestion(heroId, def);
        var t0 = Date.now();
        window.RQQuestions.ask(qEl, q).then(function (res) {
          qEl.innerHTML = "";
          var ms = Date.now() - t0;
          var move = window.RQAdaptive.record(heroId, { correct: res.correct, ms: ms, kind: q.kind });
          if (res.correct) {
            state.streak++; state.best = Math.max(state.best, state.streak);
            var elixirMult = S.data.elixirTurns > 0 ? 2 : 1;
            var dmg = Math.round(sp.mult * S.power(heroId) * rnd(0.9, 1.15) * elixirMult) + famDmg;
            state.monHp -= dmg;
            A.SFX.correct(); setTimeout(function () { A.SFX.hit(); }, 150);
            shake("b-enemy-sprite");
            var sTxt = state.streak >= 3 ? " 🔥 Streak x" + state.streak + "!" : "";
            say(sp.name + " hits for " + dmg + "!" + sTxt);
            if (state.streak === 5 || state.streak === 10) {
              A.SFX.streak();
              say(sTxt + " Amazing! The crowd goes wild!");
            }
            if (S.data.elixirTurns > 0) S.data.elixirTurns--;
            if (S.spellsFor(heroId).length > 1) state.cooldowns[sp.name] = spellRecharge(sp);
          } else {
            state.streak = 0;
            A.SFX.wrong();
            say(res.timedOut ? "Too slow! The spell fizzles... shake it off!" :
                              "Fumbled! The spell fizzles... no worries, try the next one!");
          }
          paintBars(state);
          Object.keys(state.cooldowns).forEach(function (k) {
            if (state.cooldowns[k] > 0) state.cooldowns[k]--;
          });
          if (state.monHp <= 0) { victory(move); return; }
          if (move) { showTierModal(move, continueTurn); return; }
          continueTurn();
        });

        function continueTurn() {
          setTimeout(function () { if (!state.over) { renderSpells(); renderItems(); } }, 700);
          setTimeout(function () { if (!state.over) enemyTurn(); }, 1100);
        }
      }

      /* ---- adaptive tier change: always positive framing ---- */
      function showTierModal(move, done) {
        var copy = window.RQAdaptive.copyFor(move);
        if (move.dir > 0) A.SFX.levelup(); else A.SFX.heal();
        var ov = document.createElement("div");
        ov.className = "rq-overlay";
        ov.innerHTML =
          '<div class="rq-modal"><div class="rq-bossintro">' + copy.icon + "</div>" +
          "<h2>" + copy.title + "</h2><p>" + copy.body + "</p>" +
          '<button class="rq-bigbtn" id="rq-tier-ok">' + copy.cta + " ➜</button></div>";
        document.body.appendChild(ov);
        function dismissTier() { ov.remove(); done(); }
        $("rq-tier-ok").addEventListener("click", dismissTier);
        /* Tap outside the modal also dismisses it. The modal always
           has a way out; it can never trap the battle. */
        ov.addEventListener("click", function (ev) {
          if (ev.target === ov) dismissTier();
        });
      }

      /* ---- rescue sequence: panel -> Free -> light column -> Rescued stamp -> Claim ---- */
      function rescueSequence() {
        if (state.over) return;
        state.over = true;
        var owned = S.ownedCount(mon.id);
        var ov = document.createElement("div");
        ov.className = "rq-overlay";
        ov.innerHTML =
          '<div class="rq-modal"><div class="rq-rarity rq-rar-' + (mon.rarity || "Common").toLowerCase() + '">' +
            (mon.rarity || "Common") + '</div>' +
            '<div class="rq-bossintro">' + mon.icon + '</div>' +
            '<h2>' + mon.name + '</h2>' +
            '<div class="rq-owned">Owned: ' + owned + '</div>' +
            '<p>It is weak and scared. Set it free, and it will join your Petbook as a friend!</p>' +
            '<button class="rq-bigbtn" id="rq-free">💛 Free</button>' +
            '<button class="rq-ghostbtn" id="rq-keepfight">Keep battling</button></div>';
        document.body.appendChild(ov);
        $("rq-free").addEventListener("click", function () {
          A.SFX.unlock();
          state.rescueDone = true;
          ov.querySelector(".rq-modal").innerHTML =
            '<div class="rq-lightcol"><div class="rq-lightcritter">' + mon.icon + '</div></div>' +
            '<h2>' + mon.name + ' is free!</h2>';
          setTimeout(function () {
            var pet = {
              defId: mon.id, name: mon.name, icon: mon.icon,
              rarity: mon.rarity || "Common",
              stats: JSON.parse(JSON.stringify(mon.petStats || { power: 2, hearts: 8, magic: 10, speed: 6 })),
              evolved: false, rescued: true
            };
            S.addPet(pet);
            S.completeGoal("first-rescue");
            ov.querySelector(".rq-modal").innerHTML =
              '<div class="rq-petcard"><div class="rq-rarity rq-rar-' + pet.rarity.toLowerCase() + '">' +
                pet.rarity + '</div>' +
                '<div class="rq-bossintro">' + pet.icon + '</div>' +
                '<h2>' + pet.name + '</h2>' +
                '<div class="rq-rescuedstamp">Rescued</div>' +
                '<button class="rq-bigbtn" id="rq-claim">Claim ➜</button></div>';
            A.SFX.levelup();
            $("rq-claim").addEventListener("click", function () {
              ov.remove();
              rescueVictory();
            });
          }, 1600);
        });
        $("rq-keepfight").addEventListener("click", function () {
          state.over = false;
          ov.remove();
          renderSpells(); renderItems();
        });
      }

      function rescueVictory() {
        state.over = true;
        A.SFX.victory();
        var xp = mon.xp, coins = ri(mon.coins[0], mon.coins[1]);
        S.data.coins += coins;
        var r = S.addXp(heroId, xp);
        h.battlesWon++;
        S.data.bestStreak = Math.max(S.data.bestStreak, state.best);
        S.write();
        var newly = S.checkBeastUnlocks();
        say(mon.name + " joins your Petbook! (+" + xp + " XP, +" + coins + " coins)");
        setTimeout(function () {
          opts.onDone({ victory: true, rescued: true, xp: xp, coins: coins,
                        levelsGained: r.gained, evolvedFamiliar: r.evolvedFamiliar,
                        newBeasts: newly, boss: !!mon.boss, outro: mon.outro,
                        tierMove: null });
        }, 1400);
      }

      /* ---- enemy turn ---- */
      function enemyTurn() {
        if (state.over) return;
        if (Math.random() < 0.18) {
          say(mon.name + " fumbles its attack! Lucky!");
          setTimeout(function () { if (!state.over) { renderSpells(); renderItems(); } }, 800);
          return;
        }
        var dmg = Math.max(1, Math.round(mon.power * rnd(0.7, 1.2)));
        state.heroHp -= dmg;
        A.SFX.enemyHit(); shake("b-hero-sprite");
        say(mon.name + " hits you for " + dmg + "!");
        paintBars(state);
        if (state.heroHp <= 0) { defeat(); return; }
        setTimeout(function () { if (!state.over) { renderSpells(); renderItems(); } }, 800);
      }

      /* ---- endings ---- */
      function victory(move) {
        state.over = true;
        A.SFX.victory();
        var xp = mon.xp, coins = ri(mon.coins[0], mon.coins[1]);
        if (S.data.luckyNext) { coins *= 2; S.data.luckyNext = false; }
        var streakBonus = state.best >= 5 ? (state.best - 4) * 2 : 0;
        coins += streakBonus;
        S.data.coins += coins;
        var r = S.addXp(heroId, xp);
        h.battlesWon++;
        S.data.bestStreak = Math.max(S.data.bestStreak, state.best);
        if (mon.boss && S.data.bossesBeaten.indexOf(mon.id) === -1) {
          S.data.bossesBeaten.push(mon.id);
        }
        if (opts.nodeId && opts.worldId) S.markNodeBeaten(opts.worldId, opts.nodeId);
        S.write();
        var newly = S.checkBeastUnlocks();
        say("Victory! +" + xp + " XP, +" + coins + " coins!");
        setTimeout(function () {
          showChest(coins, function () {
            opts.onDone({ victory: true, xp: xp, coins: coins,
                          levelsGained: r.gained, evolvedFamiliar: r.evolvedFamiliar,
                          newBeasts: newly,
                          boss: !!mon.boss, outro: mon.outro,
                          tierMove: move || null });
          });
        }, 1200);
      }

      function defeat() {
        state.over = true;
        A.SFX.wrong();
        var consolation = Math.round(mon.xp / 3);
        S.addXp(heroId, consolation);
        S.write();
        say("You retreat to fight another day... (kept " + consolation + " XP)");
        setTimeout(function () {
          opts.onDone({ victory: false, xp: consolation });
        }, 1800);
      }

      /* ---- treasure chest ---- */
      function showChest(coins, done) {
        S.data.chestsOpened++; S.write();
        var ov = document.createElement("div");
        ov.className = "rq-overlay";
        var bonus = Math.random() < 0.3;
        var itemName = "", itemIcon = "";
        if (bonus) {
          var it = Math.random() < 0.5 ? "potion" : "crystal";
          S.data.items[it] = (S.data.items[it] || 0) + 1; S.write();
          itemName = it === "potion" ? "Healing Potion" : "Magic Crystal";
          itemIcon = it === "potion" ? "🧪" : "💎";
        }
        ov.innerHTML =
          '<div class="rq-modal rq-chestmodal">' +
            '<div class="rq-chest" id="rq-chesticon">🎁</div>' +
            '<h2>Treasure Chest!</h2>' +
            '<div class="rq-chestrewards" id="rq-chestrewards" style="display:none">' +
              '<div class="rq-reward">🪙 +' + coins + ' coins</div>' +
              (bonus ? '<div class="rq-reward">' + itemIcon + ' ' + itemName + '!</div>' : '') +
            '</div>' +
            '<button class="rq-bigbtn" id="rq-chestopen">Open it!</button>' +
          '</div>';
        document.body.appendChild(ov);
        $("rq-chestopen").addEventListener("click", function () {
          A.SFX.chest(); setTimeout(function () { A.SFX.coin(); }, 300);
          $("rq-chesticon").textContent = "💰";
          $("rq-chesticon").classList.add("rq-chestopen");
          $("rq-chestrewards").style.display = "block";
          $("rq-chestopen").textContent = "Awesome! ➜";
          $("rq-chestopen").onclick = function () {
            ov.remove(); done();
          };
        });
      }
    },

    /* ============ SCRIPTED TUTORIAL BATTLE vs Mumblekit ============
       One mechanic at a time, pointer-guided:
       card stats -> click card (enlarges) -> select target -> question ->
       correct fires big -> scripted enemy fumble -> Out of Magic! ->
       Meditate -> refill -> cast again -> Inkwell calls it off. */
    startTutorial: function (opts) {
      var S = window.RQSave, A = window.RQAudio;
      var OB = window.RQOnboard;
      var heroId = opts.heroId, def = S.heroDef(heroId);
      var mon = JSON.parse(JSON.stringify(pack().tutorialMonster));
      var spell = S.spellsFor(heroId)[0];
      var cost = spellCost(spell);
      var maxMagic = S.maxMagic(heroId);
      /* Exactly one cast of magic to start, so "Out of Magic!" always fires. */
      var state = {
        heroHp: S.maxHp(heroId), heroMax: S.maxHp(heroId),
        monHp: mon.hp, monMax: mon.hp,
        magic: cost, maxMagic: maxMagic,
        over: false, step: "card", castCount: 0
      };

      buildArena(mon, heroId);
      var msgEl = $("b-msg"), qEl = $("b-q");
      function say(t) { msgEl.innerHTML = '<span class="rq-coach">🦉 Inkwell: </span>' + t; }
      paintBars(state);
      say("Meet " + mon.name + "! It is only a baby, so it cannot hurt you. Watch closely, young wizard.");

      function point(sel, text) {
        if (OB && OB.pointAt) {
          var t = typeof sel === "string" ? $(sel) : sel;
          OB.pointAt(t, text);
        }
      }
      function unpoint() { if (OB && OB.clearPointer) OB.clearPointer(); }

      /* One spell card, stats visible. Clickable only on the "card" step. */
      function renderTutSpells() {
        var bar = $("b-spells"); bar.innerHTML = "";
        var b = document.createElement("button");
        b.id = "b-tutspell";
        var afford = state.magic >= cost;
        b.className = "rq-spell" + (afford ? "" : " rq-nomagic"); b.type = "button";
        b.innerHTML = '<span class="rq-spellicon">' + spell.icon + '</span>' +
          '<span class="rq-spellname">' + spell.name + '</span>' +
          '<span class="rq-spellstats">⚔️' + spellEst(spell, heroId) +
          ' 🎯' + spellAim(spell) + ' ⏳' + spellRecharge(spell) + ' 🔮' + cost + '</span>';
        b.disabled = state.over || !afford || state.step !== "card";
        b.title = spell.desc;
        b.addEventListener("click", onCardClick);
        bar.appendChild(b);
        var ib = $("b-items"); ib.innerHTML = "";
        var med = document.createElement("button");
        med.id = "b-tutmed";
        med.className = "rq-item rq-meditate"; med.type = "button";
        med.textContent = "🧘 Meditate";
        med.disabled = state.over || state.step !== "meditate" || state.magic >= state.maxMagic;
        med.addEventListener("click", onMeditate);
        ib.appendChild(med);
      }

      function askUntilCorrect(done) {
        var q = makeQuestion(heroId, def);
        say("Answer to cast your spell!");
        window.RQQuestions.ask(qEl, q).then(function (res) {
          qEl.innerHTML = "";
          if (res.correct) { done(); return; }
          A.SFX.wrong();
          say("Not quite. Try again, hero!");
          setTimeout(function () { if (!state.over) askUntilCorrect(done); }, 900);
        });
      }

      function bigCast() {
        var heroSprite = $("b-hero-sprite");
        heroSprite.classList.add("rq-castbig");
        A.SFX.correct();
        setTimeout(function () { A.SFX.hit(); }, 250);
        setTimeout(function () { heroSprite.classList.remove("rq-castbig"); }, 1200);
      }

      /* ---- step: click the card ---- */
      function onCardClick() {
        if (state.over || state.step !== "card" || state.magic < cost) return;
        A.SFX.click();
        state.step = "target";
        unpoint();
        var card = $("b-tutspell");
        card.classList.add("rq-spellbig");
        say("Now choose your target! Tap " + mon.name + "!");
        point($("b-enemy-fighter"), "Tap " + mon.name + "!");
        $("b-enemy-fighter").style.cursor = "pointer";
        $("b-enemy-fighter").onclick = onTargetClick;
      }

      /* ---- step: select the target ---- */
      function onTargetClick() {
        if (state.over || state.step !== "target") return;
        A.SFX.click();
        state.step = "question";
        unpoint();
        $("b-enemy-fighter").onclick = null;
        $("b-enemy-fighter").style.cursor = "default";
        $("b-spells").innerHTML = ""; $("b-items").innerHTML = "";
        state.magic -= cost;
        paintBars(state);
        askUntilCorrect(onCastLanded);
      }

      function onCastLanded() {
        if (state.step !== "question") return;
        var dmg = Math.max(8, Math.round(spell.mult * S.power(heroId) * 1.2));
        state.monHp = Math.max(1, state.monHp - dmg);
        bigCast();
        shake("b-enemy-sprite");
        paintBars(state);
        say("Direct hit! " + spell.name + " strikes for " + dmg + "!");
        if (state.castCount === 0) {
          state.castCount = 1;
          state.step = "enemy";
          setTimeout(scriptedFumble, 1800);
        } else {
          state.step = "finish";
          setTimeout(callItOff, 1800);
        }
      }

      /* ---- enemy turn: scripted miss/fumble ---- */
      function scriptedFumble() {
        if (state.over) return;
        state.step = "oom";
        shake("b-enemy-sprite");
        say(mon.name + " winds up to attack... and trips over its own tail! Fumble! Zero damage!");
        A.SFX.wrong();
        setTimeout(outOfMagic, 2000);
      }

      /* ---- Out of Magic! -> Meditate ---- */
      function outOfMagic() {
        if (state.over) return;
        state.step = "meditate";
        renderTutSpells();
        say("Oh no! You are OUT OF MAGIC! Your spell card is grey. Tap Meditate to refill it!");
        point("b-tutmed", "Tap Meditate!");
      }

      function onMeditate() {
        if (state.over || state.step !== "meditate") return;
        A.SFX.click();
        unpoint();
        $("b-spells").innerHTML = ""; $("b-items").innerHTML = "";
        say("Breathe in... breathe out... answer to gather magic.");
        var q = makeQuestion(heroId, def);
        window.RQQuestions.ask(qEl, q).then(function (res) {
          qEl.innerHTML = "";
          var gain = res.correct ? 45 : 15;
          state.magic = Math.min(state.maxMagic, state.magic + gain);
          paintBars(state);
          if (res.correct) {
            A.SFX.correct();
            say("Focused! +" + gain + " magic. Your spell is ready again!");
            setTimeout(secondCastPrompt, 1400);
          } else {
            A.SFX.wrong();
            if (state.magic >= cost) {
              say("A little magic trickles in: +" + gain + ". That is enough to cast!");
              setTimeout(secondCastPrompt, 1400);
            } else {
              say("A little magic trickles in: +" + gain + ". Answer once more for a full refill!");
              setTimeout(onMeditate, 1400);
            }
          }
        });
      }

      function secondCastPrompt() {
        if (state.over) return;
        state.step = "card";
        renderTutSpells();
        say("Magic restored! Cast your spell one more time!");
        point("b-tutspell", "Tap your spell!");
      }

      /* Inkwell calls off the battle: a friendly auto-end. */
      function callItOff() {
        if (state.over) return;
        state.over = true;
        unpoint();
        A.SFX.victory();
        say("That is enough! Training complete! Well fought, young wizard!");
        setTimeout(function () { opts.onDone({ victory: true, tutorial: true }); }, 2200);
      }

      renderTutSpells();
      setTimeout(function () {
        if (!state.over && state.step === "card") {
          say("This is your spell card. Power, Aim, and Recharge are written on it. Tap it to begin!");
          point("b-tutspell", "Tap your spell card!");
        }
      }, 1600);
    }
  };

  window.RQBattles = Battle;
})();
