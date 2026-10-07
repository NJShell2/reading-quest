/* Reading Quest engine: screens and navigation.
   Title -> full-screen stage intro -> grade select -> classes -> wand gift ->
   tutorial battle -> victory -> goals -> familiar ->
   rescue battle -> name picker -> world map -> quest cards -> hub.
   Hub/map carry the full HUD: portrait, quest tracker, coins, toolbar,
   gift box, NPCs. */
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

  function showScreen(id) {
    Array.prototype.forEach.call(document.querySelectorAll(".rq-screen"), function (s) {
      s.classList.remove("rq-active");
    });
    $(id).classList.add("rq-active");
    window.scrollTo(0, 0);
  }

  function coinsHUD() {
    return '<div class="rq-coins">🪙 <span id="rq-coin-count">' +
      window.RQSave.data.coins + '</span></div>';
  }
  function refreshCoins() {
    var c = $("rq-coin-count");
    if (c) c.textContent = window.RQSave.data.coins;
  }

  function modal(html) {
    var ov = el("div", "rq-overlay");
    ov.innerHTML = '<div class="rq-modal">' + html + '</div>';
    document.body.appendChild(ov);
    return ov;
  }

  var Game = {
    _tipTimer: null,
    _mapWorld: 0,

    init: function () {
      window.RQSave.load();
      this.showTitle();
    },

    /* ---------- rotating loading tips ---------- */
    startTips: function (id) {
      var self = this;
      this.stopTips();
      var tipEl = $(id);
      if (!tipEl) return;
      var show = function () {
        if (!$("screen-title").classList.contains("rq-active")) return;
        tipEl.textContent = "💡 " + window.RQOnboard.randomTip();
      };
      show();
      this._tipTimer = setInterval(show, 4000);
    },
    stopTips: function () {
      if (this._tipTimer) { clearInterval(this._tipTimer); this._tipTimer = null; }
    },

    /* ---------- title ---------- */
    showTitle: function () {
      var self = this;
      var s = $("screen-title");
      s.innerHTML =
        '<div class="rq-titlewrap">' +
          '<div class="rq-gamelogo">📖⚔️</div>' +
          '<h1 class="rq-gametitle">Reading Quest</h1>' +
          '<p class="rq-tagline">' + pack().tagline + '</p>' +
          '<p class="rq-story">The Unreader has torn the pages from the Great Book and scattered them across the land. ' +
          'Six heroes, each a master of one reading power, must battle monsters, free the pages, and defeat the bosses ' +
          'who garble words. Answer to cast. Read to win!</p>' +
          '<button class="rq-bigbtn" id="t-start">⚔️ Start Adventure</button>' +
          '<button class="rq-ghostbtn" id="t-reset">Start over (erase saved game)</button>' +
          '<p class="rq-tip" id="t-tip"></p>' +
        '</div>';
      showScreen("screen-title");
      this.startTips("t-tip");
      $("t-start").addEventListener("click", function () {
        window.RQAudio.ensure(); window.RQAudio.SFX.click();
        self.stopTips();
        if (!window.RQSave.data.onboardingDone) self.startStoryIntro();
        else self.showClasses();
      });
      $("t-reset").addEventListener("click", function () {
        if (confirm("Erase your whole saved game and start over?")) {
          window.RQSave.reset();
          self.stopTips();
          Game.showTitle();
        }
      });
    },

    /* ---------- 0. full-screen theatrical story intro ----------
       Curtains open on Inkwell and THE UNREADER; the torn pages set up
       the quest. First viewing plays through; replays get a Skip
       button. Afterwards the stage flows into grade selection. */
    startStoryIntro: function () {
      var self = this;
      this.stopTips();
      window.RQStage.play(function () { self.showGradeSelect(); });
    },

    /* ---------- 1. grade select (seeds adaptive tier) ---------- */
    showGradeSelect: function () {
      var self = this;
      var s = $("screen-grade");
      var grades = [
        { g: 1, label: "Grade 1", desc: "Just starting to read" },
        { g: 2, label: "Grade 2", desc: "Reading short books" },
        { g: 3, label: "Grade 3", desc: "Reading chapter books" },
        { g: 4, label: "Grade 4", desc: "Reading to learn" }
      ];
      var html = '<h2>What grade are you in?</h2>' +
        '<p class="rq-sub">This sets your starting training tier. The game keeps adapting as you play!</p>' +
        '<div class="rq-cardgrid">';
      grades.forEach(function (gr) {
        html += '<button class="rq-classcard" data-grade="' + gr.g + '">' +
          '<div class="rq-classicon">🎓</div>' +
          '<div class="rq-classname">' + gr.label + '</div>' +
          '<div class="rq-classdesc">' + gr.desc + '</div></button>';
      });
      html += "</div>";
      s.innerHTML = html;
      showScreen("screen-grade");
      Array.prototype.forEach.call(s.querySelectorAll("[data-grade]"), function (card) {
        card.addEventListener("click", function () {
          window.RQAudio.SFX.click();
          var g = parseInt(card.getAttribute("data-grade"), 10);
          window.RQSave.setGrade(g);
          self.showClasses();
        });
      });
    },

    /* grade prompt for migrated saves that never picked one */
    pickGradeModal: function (next) {
      var grades = [1, 2, 3, 4];
      var html = '<h2>What grade are you in?</h2>' +
        '<p class="rq-sub2">This tunes your training tier. It keeps adapting as you play!</p>';
      grades.forEach(function (g) {
        html += '<button class="rq-bigbtn" data-mg="' + g + '">Grade ' + g + '</button>';
      });
      var ov = modal(html);
      Array.prototype.forEach.call(ov.querySelectorAll("[data-mg]"), function (b) {
        b.addEventListener("click", function () {
          window.RQAudio.SFX.click();
          window.RQSave.setGrade(parseInt(b.getAttribute("data-mg"), 10));
          ov.remove();
          next();
        });
      });
    },

    /* ---------- class select ---------- */
    showClasses: function () {
      var S = window.RQSave, self = this;
      var s = $("screen-classes");
      var html = '<h2>Choose your hero</h2>' +
        '<p class="rq-sub">Each hero trains a different reading power. ' +
        'Switch heroes anytime at the Tower. Every hero keeps their own progress.</p>' +
        '<div class="rq-cardgrid">';
      pack().classes.forEach(function (c) {
        var h = S.hero(c.id);
        html += '<button class="rq-classcard" data-hero="' + c.id + '">' +
          '<div class="rq-classicon" style="border-color:' + c.color + '">' + c.icon + '</div>' +
          '<div class="rq-classname">' + c.name + '</div>' +
          '<div class="rq-classtrat">' + c.strategy + '</div>' +
          '<div class="rq-classlvl">Level ' + h.level + '</div>' +
          '<div class="rq-classdesc">' + c.desc + '</div></button>';
      });
      html += '</div><h2>🔒 Challenge heroes</h2>' +
        '<p class="rq-sub">Beast Within forms: harder battles, DOUBLE experience. ' +
        'Unlock one by reaching level ' + pack().beastUnlockLevel + ' with its hero.</p>' +
        '<div class="rq-cardgrid">';
      pack().beasts.forEach(function (b) {
        var unlocked = S.data.beastsUnlocked.indexOf(b.id) !== -1;
        var base = pack().classes.filter(function (c) { return c.id === b.baseClass; })[0];
        var h = S.hero(b.id);
        html += '<button class="rq-classcard rq-beast' + (unlocked ? '' : ' rq-locked') + '" ' +
          (unlocked ? 'data-hero="' + b.id + '"' : 'disabled') + '>' +
          '<div class="rq-classicon">' + (unlocked ? b.icon : '🔒') + '</div>' +
          '<div class="rq-classname">' + b.name + '</div>' +
          '<div class="rq-classtrat">' + (unlocked ? 'Beast Within: ' + base.title : 'Reach Lv ' + pack().beastUnlockLevel + ' as ' + base.title) + '</div>' +
          (unlocked ? '<div class="rq-classlvl">Level ' + h.level + '</div><div class="rq-classdesc">' + b.desc + '</div>'
                    : '<div class="rq-classdesc">' + b.desc + '</div>') + '</button>';
      });
      html += '</div>';
      s.innerHTML = html;
      showScreen("screen-classes");
      Array.prototype.forEach.call(s.querySelectorAll("[data-hero]"), function (card) {
        card.addEventListener("click", function () {
          window.RQAudio.SFX.click();
          S.data.activeHero = card.getAttribute("data-hero");
          S.write();
          if (!S.data.onboardingDone && !S.data.wandGifted) {
            /* new player: wand gift, then the scripted tutorial battle */
            window.RQOnboard.wandGift(function () { self.startTutorialBattle(); });
          } else {
            self.showHub();
          }
        });
      });
    },

    /* ---------- 5. scripted tutorial battle ---------- */
    startTutorialBattle: function () {
      var self = this;
      showScreen("screen-battle");
      window.RQBattles.startTutorial({
        heroId: window.RQSave.data.activeHero,
        onDone: function () { self.afterTutorial(); }
      });
    },

    /* 6-13. post-tutorial chain, in spec order. The full-screen stage
       intro already played the villain confrontation and the quest
       call, so the chain goes straight from familiar choice to the
       rescue tutorial. */
    afterTutorial: function () {
      var self = this, OB = window.RQOnboard;
      OB.tutorialVictory(function () {
        OB.goalsPanel(function () {          /* 7. auto-opens */
          OB.familiarChoice(function () {    /* 8. starter familiar */
            OB.rescueIntro(function () {      /* 10. rescue tutorial */
              self.startRescueBattle();
            });
          });
        });
      });
    },

    startRescueBattle: function () {
      var self = this;
      showScreen("screen-battle");
      window.RQSave.markSeen("bristleback");
      window.RQBattles.start({
        heroId: window.RQSave.data.activeHero,
        monster: pack().rescueMonster,
        onDone: function (res) { self.afterRescueBattle(res); }
      });
    },

    afterRescueBattle: function (res) {
      var self = this, OB = window.RQOnboard;
      if (!res.victory) {
        var ov = modal('<h2>The Bristleback got away!</h2>' +
          '<p>Shake it off, hero. Let us try the rescue again!</p>' +
          '<button class="rq-bigbtn" id="r-retry">Try again ➜</button>');
        ov.querySelector("#r-retry").addEventListener("click", function () {
          ov.remove(); self.startRescueBattle();
        });
        return;
      }
      OB.namePicker(function () {            /* 11. wizard name */
        OB.mapReveal(function () {           /* 12. world map reveal */
          self.showMap(0, true);
        });
      });
    },

    finishOnboarding: function () {
      var self = this;
      window.RQSave.data.onboardingDone = true;
      window.RQSave.write();
      window.RQOnboard.questStoryCards(function () {  /* 13. quest chain intro */
        self.showHub();
      });
    },

    /* ---------- 14. full HUD ---------- */
    hudHTML: function () {
      var S = window.RQSave;
      var id = S.data.activeHero, def = S.heroDef(id), h = S.hero(id);
      var wiz = S.data.wizardName || "Young Wizard";
      var dot = (S.dailyAvailable() || S.data.pendingGiftGear.length > 0)
        ? '<span class="rq-notifdot"></span>' : "";
      var tracker;
      if (S.data.quests && S.data.quests.main && S.data.quests.main.revealed) {
        tracker = '<div class="rq-tracker">📜 <b>Quest:</b> Reclaim the Keystone Pages ' +
          '(' + S.keystonePages() + '/3)<br><span class="rq-objective">Next: ' +
          S.currentObjective() + '</span></div>';
      } else {
        tracker = '<div class="rq-tracker">📜 <b>Quest:</b> ' + S.currentObjective() + '</div>';
      }
      var gift = S.dailyAvailable()
        ? '<button class="rq-giftbox rq-giftpulse" id="hud-gift">🎁<span>Collect!</span></button>'
        : '<button class="rq-giftbox" id="hud-gift" disabled>🎁</button>';
      return '<div class="rq-hud">' +
        '<div class="rq-portrait">' +
          '<div class="rq-portraiticon">' + def.icon + dot + '</div>' +
          '<div class="rq-portraitinfo"><div class="rq-wizname">🧙 ' + wiz + '</div>' +
          '<div class="rq-heroline">' + def.name + ' <span class="rq-lvlbadge">Lv ' + h.level + '</span></div></div>' +
        '</div>' +
        tracker +
        '<div class="rq-hudrow">' + coinsHUD() + gift + '</div>' +
        '<div class="rq-toolbar">' +
          '<button class="rq-toolbtn" id="hud-menu">☰<span>Menu</span></button>' +
          '<button class="rq-toolbtn" id="hud-pack">🎒<span>Backpack</span></button>' +
          '<button class="rq-toolbtn" id="hud-fams">🐾<span>Familiars</span></button>' +
          '<button class="rq-toolbtn" id="hud-quests">🎯<span>Quests</span></button>' +
          '<button class="rq-toolbtn" id="hud-shop">🛒<span>Shop</span></button>' +
          '<button class="rq-toolbtn" id="hud-map">🗺️<span>Map</span></button>' +
        '</div></div>';
    },

    /* HUD buttons are wired scoped to the screen that owns them.
       Screens are hidden by CSS class, never removed, so every HUD
       screen carries duplicate hud-* element ids. A document-wide
       getElementById would bind the visible buttons' handlers onto an
       earlier screen's hidden duplicates, leaving the visible top bar
       completely dead (the Familiars-page dead-button bug). */
    wireHUD: function (root) {
      var self = this, A = window.RQAudio;
      root = root || document;
      function go(id, fn) {
        var b = root.querySelector("#" + id);
        if (b) b.addEventListener("click", function () { A.SFX.click(); fn(); });
      }
      go("hud-menu", function () { self.showMenu(); });
      go("hud-pack", function () { self.showBackpack(); });
      go("hud-fams", function () { self.showFamiliars(); });
      go("hud-quests", function () { window.RQOnboard.goalsPanel(function () {}); });
      go("hud-shop", function () { self.showShop(); });
      go("hud-map", function () { self.showMap(self._mapWorld || 0, false); });
      var gift = root.querySelector("#hud-gift");
      if (gift && !gift.disabled) {
        gift.addEventListener("click", function () { self.claimDaily(); });
      }
    },

    npcTalk: function (key) {
      var npc = pack().npcs[key];
      var line = npc.lines[Math.floor(Math.random() * npc.lines.length)];
      window.RQOnboard.dialogue({
        icon: npc.icon, name: npc.name, title: npc.title,
        lines: [line], lastCta: "Thanks! ➜", onDone: function () {}
      });
    },

    /* ---------- hub (the Tower) ---------- */
    showHub: function () {
      var S = window.RQSave, A = window.RQAudio, self = this;
      var id = S.data.activeHero, def = S.heroDef(id), h = S.hero(id);
      var s = $("screen-hub");
      var xpNeed = S.xpForLevel(h.level + 1), xpHave = h.xp - S.xpForLevel(h.level);
      var xpSpan = Math.max(1, xpNeed - S.xpForLevel(h.level));
      var spells = S.spellsFor(id);
      var fam = h.familiar;
      var famLine = fam ? fam.icon + " " + fam.name + (fam.evolved ? " (evolved!)" : "")
                        : "No familiar yet";
      s.innerHTML =
        this.hudHTML() +
        '<div class="rq-heropanel" style="border-color:' + def.color + '">' +
          '<div class="rq-herosprite">' + def.icon + '</div>' +
          '<div class="rq-heroinfo"><h2>' + def.name + '</h2>' +
          '<div class="rq-strategy">' + def.strategy + '</div>' +
          '<div class="rq-lvlbig">Level ' + h.level + '</div>' +
          '<div class="rq-strategy">📈 Training tier: ' + window.RQAdaptive.tierLabel(h.tier || 1) + '</div>' +
          '<div class="rq-xpbar"><div class="rq-xpfill" style="width:' +
            Math.min(100, xpHave / xpSpan * 100) + '%"></div></div>' +
          '<div class="rq-stats">❤️ ' + S.maxHp(id) + ' &nbsp; 🔮 ' + S.maxMagic(id) +
          ' &nbsp; ⚔️ ' + S.power(id) + ' &nbsp; 🏆 ' + h.battlesWon + ' wins</div>' +
          '<div class="rq-familiar">' + famLine + '</div></div>' +
        '</div>' +
        '<div class="rq-spelllist"><h3>Spells</h3>' +
          spells.map(function (sp) {
            return '<div class="rq-spellinfo" title="' + sp.desc + '">' + sp.icon + ' ' + sp.name + '</div>';
          }).join("") +
          (spells.length < def.spells.length ?
            '<div class="rq-spellinfo rq-nextspell">🔒 Next spell at Lv ' + def.spells[spells.length].level + ': ' +
            def.spells[spells.length].name + '</div>' : '') +
        '</div>' +
        '<div class="rq-npcs">' +
          '<button class="rq-npc" id="npc-inkwell"><span class="rq-npcicon2">🦉</span><span>Inkwell<br><small>Talk</small></span></button>' +
          '<button class="rq-npc" id="npc-bram"><span class="rq-npcicon2">🧙‍♂️</span><span>Bram<br><small>Talk</small></span></button>' +
        '</div>' +
        '<button class="rq-bigbtn" id="hub-explore">🧭 Explore the Wilds</button>' +
        '<p class="rq-tip">💡 ' + window.RQOnboard.randomTip() + '</p>';
      showScreen("screen-hub");
      this.wireHUD(s);
      $("npc-inkwell").addEventListener("click", function () { A.SFX.click(); self.npcTalk("inkwell"); });
      $("npc-bram").addEventListener("click", function () { A.SFX.click(); self.npcTalk("bram"); });
      $("hub-explore").addEventListener("click", function () {
        A.SFX.click();
        var wid = pack().worlds[self._mapWorld || 0].id;
        if (!S.zone(wid).unlocked) wid = pack().worlds[0].id;
        self.showOverworld(wid);
      });
      /* migrated saves: pick a grade once */
      if (!S.data.grade) {
        this.pickGradeModal(function () { self.showHub(); });
        return;
      }
      /* old saves with no familiar get the choice UI */
      if (S.data.onboardingDone && !h.familiar && !self._famChoiceShown) {
        self._famChoiceShown = true;
        window.RQOnboard.familiarChoice(function () { self.showHub(); });
        return;
      }
      /* queued gear gifts: Wear / Not now, one at a time */
      if (S.data.pendingGiftGear.length) {
        var gid = S.data.pendingGiftGear[0];
        window.RQOnboard.giftGearModal(gid, function () { self.showHub(); });
      }
    },

    /* ---------- menu ---------- */
    showMenu: function () {
      var self = this;
      var ov = modal('<h2>☰ Menu</h2>' +
        '<button class="rq-bigbtn" id="m-goals">🎯 Your Goals</button>' +
        '<button class="rq-bigbtn" id="m-how">❓ How to Play</button>' +
        '<button class="rq-ghostbtn" id="m-close">Close</button>' +
        '<button class="rq-ghostbtn" id="m-reset">Start over (erase saved game)</button>');
      ov.querySelector("#m-goals").addEventListener("click", function () {
        ov.remove(); window.RQOnboard.goalsPanel(function () {});
      });
      ov.querySelector("#m-how").addEventListener("click", function () {
        ov.querySelector(".rq-modal").innerHTML = '<h2>❓ How to Play</h2>' +
          '<p class="rq-howto">Pick a spell, then answer the reading question to cast it! ' +
          'Correct answers deal damage. Wrong answers only fizzle the spell, they never hurt you.<br><br>' +
          'Spells cost magic (🔮). When you run low, tap <b>Meditate</b> and answer to refill.<br><br>' +
          'Weaken wild creatures below 30% health, then <b>RESCUE</b> them to add friends to your Petbook!<br><br>' +
          'Defeat each world boss to reclaim a torn page of the Great Book.</p>' +
          '<button class="rq-bigbtn" id="m-howok">Got it! ➜</button>';
        ov.querySelector("#m-howok").addEventListener("click", function () { ov.remove(); });
      });
      ov.querySelector("#m-close").addEventListener("click", function () { ov.remove(); });
      ov.querySelector("#m-reset").addEventListener("click", function () {
        if (confirm("Erase your whole saved game and start over?")) {
          window.RQSave.reset(); ov.remove(); self.showTitle();
        }
      });
    },

    /* ---------- 18. daily reward ---------- */
    claimDaily: function () {
      var S = window.RQSave, A = window.RQAudio, self = this;
      var r = S.claimDaily();
      if (!r) return;
      A.SFX.chest(); setTimeout(function () { A.SFX.coin(); }, 300);
      var itemLine = r.item ? '<div class="rq-reward">' +
        (r.item === "potion" ? "🧪 Healing Potion!" : "💎 Magic Crystal!") + '</div>' : '';
      var ov = modal('<div class="rq-npcicon">🎁</div><h2>Daily Gift!</h2>' +
        '<div class="rq-reward">🪙 +' + r.coins + ' coins</div>' + itemLine +
        '<div class="rq-streakline">🔥 Day ' + r.streak + ' streak! Come back tomorrow!</div>' +
        '<button class="rq-bigbtn" id="d-ok">Yay! ➜</button>');
      ov.querySelector("#d-ok").addEventListener("click", function () {
        ov.remove(); self.showHub();
      });
    },

    /* ---------- 12. world map with locked zones ---------- */
    showMap: function (worldIdx, onboarding) {
      var S = window.RQSave, self = this;
      var s = $("screen-map");
      var worlds = pack().worlds;
      this._mapWorld = worldIdx || 0;
      var html = this.hudHTML() + '<div class="rq-worldtabs">';
      worlds.forEach(function (w, i) {
        var z = S.zone(w.id);
        var p = S.worldProgress(w.id);
        var pct = p.total ? Math.round(p.beaten / p.total * 100) : 0;
        html += '<button class="rq-worldtab' + (i === self._mapWorld ? ' rq-worldtab-active' : '') +
          (z.unlocked ? '' : ' rq-worldtab-locked') + '" data-world="' + i + '">' +
          '<div class="rq-worldtabicon">' + (z.unlocked ? w.icon : '🔒') + '</div>' +
          '<div class="rq-worldtabname">' + w.name + '</div>' +
          '<div class="rq-worldtabpct">' + (z.unlocked ? pct + '% complete' : 'Locked') + '</div></button>';
      });
      html += '</div><div id="rq-worldbody"></div>';
      if (onboarding) {
        html += '<button class="rq-bigbtn" id="m-continue">Continue ➜</button>';
      }
      s.innerHTML = html;
      showScreen("screen-map");
      this.wireHUD(s);
      this.renderWorldBody(this._mapWorld);
      Array.prototype.forEach.call(s.querySelectorAll("[data-world]"), function (tab) {
        tab.addEventListener("click", function () {
          window.RQAudio.SFX.click();
          self._mapWorld = parseInt(tab.getAttribute("data-world"), 10);
          self.showMap(self._mapWorld, onboarding);
        });
      });
      if (onboarding) {
        $("m-continue").addEventListener("click", function () {
          window.RQAudio.SFX.click();
          self.finishOnboarding();
        });
        setTimeout(function () {
          var first = s.querySelector(".rq-node:not(.rq-nodelocked)");
          if (first) window.RQOnboard.pointAt(first, "Tap a glowing node to battle!");
        }, 400);
      }
    },

    renderWorldBody: function (worldIdx) {
      var S = window.RQSave, self = this;
      var worlds = pack().worlds;
      var w = worlds[worldIdx];
      var z = S.zone(w.id);
      var body = $("rq-worldbody");
      if (!z.unlocked) {
        body.innerHTML = '<div class="rq-lockedworld"><div class="rq-lockbig">🔒</div>' +
          '<h2>' + w.name + '</h2><p>' + w.unlockText + '</p></div>';
        return;
      }
      var p = S.worldProgress(w.id);
      var html = '<h2>' + w.icon + ' ' + w.name + '</h2><p class="rq-sub">' + w.desc + '</p>' +
        '<div class="rq-nodepath">';
      w.nodes.forEach(function (n, i) {
        var mon = pack().monsters.filter(function (m) { return m.id === n.monster; })[0];
        var beaten = S.nodeBeaten(w.id, n.id);
        var open = S.isNodeOpen(w.id, i);
        var isNew = S.data.seenMonsters.indexOf(mon.id) === -1;
        var cls = "rq-node" + (n.boss ? " rq-bossnode" : "") +
          (beaten ? " rq-nodebeaten" : "") + (open && !beaten ? " rq-nodeopen" : "") +
          (!open && !beaten ? " rq-nodelocked" : "");
        html += '<button class="' + cls + '" data-node="' + i + '"' +
          ((!open && !beaten) ? ' disabled' : '') + '>' +
          '<div class="rq-nodeicon">' + ((!open && !beaten) ? '🔒' : mon.icon) + '</div>' +
          '<div class="rq-nodename">' + n.name + '</div>' +
          '<div class="rq-nodemon">' + (beaten ? '✅ Beaten' : mon.name + (n.boss ? ' 👹BOSS' : '')) + '</div>' +
          (isNew && open && !beaten ? '<div class="rq-newbadge">New!</div>' : '') +
          '</button>';
        if (i < w.nodes.length - 1) html += '<div class="rq-pathline">⬇</div>';
      });
      html += '</div>';
      html += '<button class="rq-bigbtn" id="w-explore">🧭 Explore the Wilds</button>';
      body.innerHTML = html;
      $("w-explore").addEventListener("click", function () {
        window.RQAudio.SFX.click();
        self.showOverworld(w.id);
      });
      Array.prototype.forEach.call(body.querySelectorAll("[data-node]"), function (btn) {
        btn.addEventListener("click", function () {
          window.RQAudio.SFX.click();
          var n = w.nodes[parseInt(btn.getAttribute("data-node"), 10)];
          var mon = pack().monsters.filter(function (m) { return m.id === n.monster; })[0];
          self.startBattle(w.id, n, mon);
        });
      });
    },

    startBattle: function (worldId, node, mon) {
      var self = this;
      var heroId = window.RQSave.data.activeHero;
      window.RQSave.markSeen(mon.id);
      if (mon.boss) {
        var ov = modal('<div class="rq-bossintro">' + mon.icon + '</div><h2>' + mon.name + '</h2>' +
          '<p class="rq-bossquote">"' + mon.intro + '"</p>' +
          '<button class="rq-bigbtn" id="boss-fight">⚔️ Fight!</button>');
        window.RQAudio.SFX.boss();
        ov.querySelector("#boss-fight").addEventListener("click", function () {
          ov.remove();
          self.launchBattle(worldId, node, mon, heroId);
        });
        return;
      }
      this.launchBattle(worldId, node, mon, heroId);
    },

    launchBattle: function (worldId, node, mon, heroId) {
      var self = this;
      showScreen("screen-battle");
      window.RQBattles.start({
        heroId: heroId, monster: mon, nodeId: node.id, worldId: worldId,
        onDone: function (res) { self.afterBattle(res, worldId, node, mon); }
      });
    },

    afterBattle: function (res, worldId, node, mon) {
      var S = window.RQSave, A = window.RQAudio, self = this;
      var id = S.data.activeHero, def = S.heroDef(id);
      refreshCoins();
      /* Overworld encounter bookkeeping first: a defeated roaming
         monster is recorded in the save the moment victory is known,
         so it stays off the board even if the page is refreshed on
         the results modal. Fled-from monsters are left alone. */
      if (window.RQOverworld) window.RQOverworld.afterEncounter(res);
      if (!res.victory) {
        var ov = modal('<h2>Safe retreat!</h2><p>You kept ' + res.xp + ' XP. ' +
          'Visit the shop for potions, then try again. Heroes never give up!</p>' +
          '<button class="rq-bigbtn" id="r-ok">Back to the Tower ➜</button>');
        ov.querySelector("#r-ok").addEventListener("click", function () {
          ov.remove(); self._returnAfterBattle();
        });
        return;
      }
      /* goals from battle events */
      if (S.hero(id).battlesWon >= 3) S.completeGoal("win-3");
      if (mon.id === "mumblemouth") S.completeGoal("w1-boss");
      if (mon.id === "wipeout-wraith") S.completeGoal("page-2");
      if (mon.id === "the-slowdown") S.completeGoal("page-3");
      var worlds = pack().worlds;
      var wi = S.worldIndex(worldId);
      var unlockHtml = "";
      if (mon.boss && wi + 1 < worlds.length && S.zone(worlds[wi + 1].id).unlocked) {
        unlockHtml = '<div class="rq-newspell">🔓 New land unlocked: ' +
          worlds[wi + 1].icon + ' ' + worlds[wi + 1].name + '!</div>';
      }
      var html = '<h2>🏆 Victory!</h2>' +
        '<div class="rq-results"><div>✨ +' + res.xp + ' XP' + (S.isBeast(id) ? ' (beast double!)' : '') + '</div>' +
        '<div>🪙 +' + res.coins + ' coins</div></div>';
      res.levelsGained.forEach(function (lv) {
        html += '<div class="rq-levelup">🎉 LEVEL ' + lv + '! ' + def.name + ' grows stronger!</div>';
        var sp = def.spells.filter(function (x) { return x.level === lv; })[0];
        if (sp) html += '<div class="rq-newspell">✨ New spell: ' + sp.icon + ' ' + sp.name + '!</div>';
      });
      if (res.evolvedFamiliar) {
        var fam = S.hero(id).familiar;
        html += '<div class="rq-newspell">' + (fam ? fam.icon : '🐾') +
          ' Your familiar evolved' + (fam ? ' into ' + fam.name : '') + '!</div>';
      }
      if (res.boss && res.outro) html += '<p class="rq-bossquote">"' + res.outro + '"</p>';
      html += unlockHtml;
      if (res.tierMove) {
        var tLabel = window.RQAdaptive.tierLabel(res.tierMove.tier);
        html += res.tierMove.dir > 0
          ? '<div class="rq-newspell">📈 New Heights! Now training at ' + tLabel + '.</div>'
          : '<div class="rq-newspell">🌿 Secret Side Quest: now training at ' + tLabel + '.</div>';
      }
      html += '<button class="rq-bigbtn" id="r-ok">Continue ➜</button>';
      var ov2 = modal(html);
      if (res.levelsGained.length) A.SFX.levelup();
      ov2.querySelector("#r-ok").addEventListener("click", function () {
        ov2.remove();
        if (res.newBeasts && res.newBeasts.length) {
          res.newBeasts.forEach(function (bid) {
            var b = pack().beasts.filter(function (x) { return x.id === bid; })[0];
            var bo = modal('<div class="rq-bossintro">' + b.icon + '</div>' +
              '<h2>🔓 BEAST WITHIN UNLEASHED!</h2>' +
              '<p>The <b>' + b.name + '</b> answers your call! Harder battles, DOUBLE experience. ' +
              'Find it on the hero select screen.</p>' +
              '<button class="rq-bigbtn" id="u-ok">ROAR! ➜</button>');
            A.SFX.unlock();
            bo.querySelector("#u-ok").addEventListener("click", function () {
              bo.remove(); self._returnAfterBattle();
            });
          });
        } else {
          self._returnAfterBattle();
        }
      });
    },

    /* Where to go after a battle ends. Overworld roam battles set
       _afterBattleReturn so winning out in the wilds returns to the
       wilds; every other battle returns to the Tower hub. */
    _afterBattleReturn: null,
    _returnAfterBattle: function () {
      var f = this._afterBattleReturn;
      this._afterBattleReturn = null;
      if (f) f(); else this.showHub();
    },

    /* ---------- overworld: walk the wilds, monsters roam ---------- */
    showOverworld: function (worldId) {
      if (window.RQOverworld && window.RQOverworld.open(worldId)) {
        showScreen("screen-overworld");
      }
    },

    /* ---------- 15. backpack: gear slots + stats + inventory ---------- */
    showBackpack: function () {
      var S = window.RQSave, self = this;
      var id = S.data.activeHero, def = S.heroDef(id), h = S.hero(id);
      var s = $("screen-backpack");
      var html = this.hudHTML() + '<h2>🎒 Backpack</h2>' +
        '<p class="rq-sub">Gear for ' + def.name + '. Bonuses apply right away!</p>' +
        '<div class="rq-gearslots">';
      pack().gearSlots.forEach(function (slot) {
        var gid = h.gear[slot.id];
        var g = gid ? S.gearDef(gid) : null;
        html += '<div class="rq-gearslot"><div class="rq-gearslotname">' + slot.icon + ' ' + slot.name + '</div>' +
          (g ? '<div class="rq-gearitem"><span class="rq-gearicon">' + g.icon + '</span>' +
            '<div><b>' + g.name + '</b><div class="rq-sub2">' + self.gearBonusText(g) + '</div></div></div>' +
            '<button class="rq-ghostbtn" data-unequip="' + slot.id + '">Remove</button>'
               : '<div class="rq-gearempty">Empty</div>') + '</div>';
      });
      html += '</div><div class="rq-wizstats"><h3>Wizard Stats</h3>' +
        '<div class="rq-stats">❤️ Hearts: ' + S.maxHp(id) +
        ' &nbsp; 🔮 Magic: ' + S.maxMagic(id) +
        ' &nbsp; ⚔️ Power: ' + S.power(id) + '</div></div>' +
        '<h3>Inventory</h3><div class="rq-inventory">';
      if (!S.data.inventory.length) {
        html += '<p class="rq-sub2">Empty. Win goals and visit the shop to find gear!</p>';
      }
      S.data.inventory.forEach(function (gid) {
        var g = S.gearDef(gid);
        if (!g) return;
        html += '<div class="rq-gearitem"><span class="rq-gearicon">' + g.icon + '</span>' +
          '<div><b>' + g.name + '</b><div class="rq-sub2">' + g.desc + '<br>' +
          self.gearBonusText(g) + '</div></div>' +
          '<button class="rq-buybtn" data-equip="' + gid + '">Equip</button></div>';
      });
      html += '</div>';
      s.innerHTML = html;
      showScreen("screen-backpack");
      this.wireHUD(s);
      Array.prototype.forEach.call(s.querySelectorAll("[data-equip]"), function (b) {
        b.addEventListener("click", function () {
          window.RQAudio.SFX.click();
          S.equipGear(id, b.getAttribute("data-equip"));
          self.showBackpack();
        });
      });
      Array.prototype.forEach.call(s.querySelectorAll("[data-unequip]"), function (b) {
        b.addEventListener("click", function () {
          window.RQAudio.SFX.click();
          S.unequipGear(id, b.getAttribute("data-unequip"));
          self.showBackpack();
        });
      });
    },

    gearBonusText: function (g) {
      var parts = [];
      if (g.power) parts.push("+" + g.power + " Power");
      if (g.hp) parts.push("+" + g.hp + " Hearts");
      if (g.magic) parts.push("+" + g.magic + " Magic");
      return parts.join(", ") || "No bonus";
    },

    /* ---------- petbook (familiars screen) ---------- */
    showFamiliars: function () {
      var S = window.RQSave, self = this;
      var id = S.data.activeHero, h = S.hero(id);
      var activeUid = h.familiar ? h.familiar.uid : null;
      var s = $("screen-familiars");
      var html = this.hudHTML() + '<h2>🐾 Petbook</h2>' +
        '<p class="rq-sub">Your collection of friends. Tap "Set Active" to choose who fights beside ' +
        S.heroDef(id).name + '.</p>';
      if (!S.data.petbook.length) {
        html += '<p class="rq-sub2">No friends yet. Rescue wild creatures in battle to fill your Petbook!</p>';
      }
      html += '<div class="rq-petgrid">';
      S.data.petbook.forEach(function (p) {
        var isActive = p.uid === activeUid;
        html += '<div class="rq-petcard' + (isActive ? ' rq-petactive' : '') + '">' +
          '<div class="rq-rarity rq-rar-' + p.rarity.toLowerCase() + '">' + p.rarity + '</div>' +
          '<div class="rq-famart">' + p.icon + '</div>' +
          '<div class="rq-famname">' + p.name + '</div>' +
          (p.rescued ? '<div class="rq-rescuedstamp">Rescued</div>' : '') +
          (p.isNew ? '<div class="rq-newbadge">New!</div>' : '') +
          (p.evolved ? '<div class="rq-evobadge">Evolved</div>' : '') +
          '<div class="rq-famstats">' +
          '<span>⚔️' + p.stats.power + '</span><span>❤️' + p.stats.hearts + '</span>' +
          '<span>🔮' + p.stats.magic + '</span><span>💨' + p.stats.speed + '</span></div>' +
          (isActive ? '<div class="rq-activebadge">Fighting now!</div>'
                    : '<button class="rq-buybtn" data-active="' + p.uid + '">Set Active</button>') +
          '</div>';
      });
      html += '</div>';
      s.innerHTML = html;
      showScreen("screen-familiars");
      this.wireHUD(s);
      Array.prototype.forEach.call(s.querySelectorAll("[data-active]"), function (b) {
        b.addEventListener("click", function () {
          window.RQAudio.SFX.click();
          S.setActiveFamiliar(id, b.getAttribute("data-active"));
          self.showFamiliars();
        });
      });
      S.markPetsSeen();
    },

    /* ---------- shop ---------- */
    showShop: function () {
      var S = window.RQSave, A = window.RQAudio, self = this;
      var s = $("screen-shop");
      var id = S.data.activeHero;
      var html = this.hudHTML() +
        '<h2>🛒 Tower Shop</h2><p class="rq-sub">Spend coins to grow stronger. Upgrades apply to ' +
        S.heroDef(id).name + '.</p><div class="rq-shopgrid">';
      pack().shop.forEach(function (item) {
        var owned = item.effect === "heal" || item.effect === "crystal" || item.effect === "lucky" ?
          (S.data.items[item.id] || 0) : null;
        html += '<div class="rq-shopitem"><div class="rq-shopicon">' + item.icon + '</div>' +
          '<div class="rq-shopname">' + item.name + '</div>' +
          '<div class="rq-shopdesc">' + item.desc + '</div>' +
          (owned !== null ? '<div class="rq-owned">Owned: ' + owned + '</div>' : '') +
          '<button class="rq-buybtn" data-item="' + item.id + '">Buy: 🪙' + item.cost + '</button></div>';
      });
      html += '</div>';
      s.innerHTML = html;
      showScreen("screen-shop");
      this.wireHUD(s);
      Array.prototype.forEach.call(s.querySelectorAll("[data-item]"), function (btn) {
        btn.addEventListener("click", function () {
          var itemId = btn.getAttribute("data-item");
          var item = pack().shop.filter(function (x) { return x.id === itemId; })[0];
          if (S.data.coins < item.cost) {
            A.SFX.wrong();
            alert("Not enough coins! Win battles to earn more.");
            return;
          }
          S.data.coins -= item.cost;
          if (item.effect === "power") S.hero(id).bonusPower += 2;
          else if (item.effect === "maxhp") S.hero(id).bonusHp += 10;
          else if (item.effect === "elixir") { S.data.elixirTurns = 3; }
          else if (item.effect === "lucky") { S.data.luckyNext = true; }
          else if (item.effect === "gear") {
            S.data.inventory.push(item.gearId);
            var g = S.gearDef(item.gearId);
            var ov = modal('<h2>You got the ' + g.name + '!</h2><p>Find it in your Backpack to wear it.</p>' +
              '<button class="rq-bigbtn" id="g-ok">Cool! ➜</button>');
            ov.querySelector("#g-ok").addEventListener("click", function () {
              ov.remove(); self.showShop();
            });
            S.write(); A.SFX.coin();
            return;
          }
          else S.data.items[itemId] = (S.data.items[itemId] || 0) + 1;
          S.write(); A.SFX.coin();
          Game.showShop();
        });
      });
    }
  };

  window.RQGame = Game;
})();
