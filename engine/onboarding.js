/* Reading Quest engine: onboarding and new-player widgets.
   Guide NPC dialogue, animated pointer, wand gift, tutorial victory,
   goals panel, starter familiar choice, wizard name picker, and quest
   story cards. The story intro itself (Inkwell meets THE UNREADER,
   the torn pages, the quest call) is the full-screen stage play in
   engine/stage.js. Pure UI; game.js owns screen flow. */
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

  function modal(html) {
    var ov = el("div", "rq-overlay");
    ov.innerHTML = '<div class="rq-modal">' + html + '</div>';
    document.body.appendChild(ov);
    return ov;
  }

  function rarityClass(r) { return "rq-rar-" + String(r || "Common").toLowerCase(); }

  var OB = {
    /* ---------- random loading tip ---------- */
    randomTip: function () {
      var tips = pack().tips;
      return tips[Math.floor(Math.random() * tips.length)];
    },

    /* ---------- dialogue: NPC icon + name, lines, Next button ---------- */
    dialogue: function (opts) {
      var A = window.RQAudio;
      var i = 0;
      var ov = modal(
        '<div class="rq-npcicon">' + opts.icon + '</div>' +
        '<h2>' + opts.name + '</h2>' +
        (opts.title ? '<div class="rq-npctitle">' + opts.title + '</div>' : '') +
        '<p class="rq-dialogue" id="rq-dline"></p>' +
        '<button class="rq-bigbtn" id="rq-dnext">Next ➜</button>');
      function show() {
        $("rq-dline").textContent = opts.lines[i];
        $("rq-dnext").textContent = (i === opts.lines.length - 1) ? (opts.lastCta || "Let's go! ➜") : "Next ➜";
      }
      show();
      $("rq-dnext").addEventListener("click", function () {
        A.ensure(); A.SFX.click();
        i++;
        if (i >= opts.lines.length) { ov.remove(); if (opts.onDone) opts.onDone(); }
        else show();
      });
      return ov;
    },

    /* ---------- animated pointer + coach bubble ---------- */
    pointAt: function (target, text) {
      this.clearPointer();
      if (!target) return;
      var r = target.getBoundingClientRect();
      var p = el("div", "rq-pointer", "👉");
      p.style.left = Math.max(4, r.left - 44) + "px";
      p.style.top = Math.max(4, r.top + r.height / 2 - 20) + "px";
      document.body.appendChild(p);
      this._pointer = p;
      if (text) {
        var b = el("div", "rq-coachbubble", text);
        b.style.left = Math.min(window.innerWidth - 240, Math.max(4, r.left)) + "px";
        b.style.top = Math.max(4, r.top - 64) + "px";
        /* Tap-to-dismiss: the bubble never traps the player. */
        b.title = "Tap to dismiss";
        b.addEventListener("click", function () { OB.clearPointer(); });
        document.body.appendChild(b);
        this._bubble = b;
      }
      var t = target;
      t.classList.add("rq-pointtarget");
      this._target = t;
    },
    clearPointer: function () {
      ["_pointer", "_bubble"].forEach(function (k) {
        if (OB[k] && OB[k].parentNode) OB[k].parentNode.removeChild(OB[k]);
        OB[k] = null;
      });
      if (OB._target) { OB._target.classList.remove("rq-pointtarget"); OB._target = null; }
    },

    /* ---------- 4. FREE Training Wand gift ---------- */
    wandGift: function (next) {
      var S = window.RQSave;
      var ov = modal(
        '<div class="rq-npcicon">🧙‍♂️</div><h2>Bram the Shopkeep</h2>' +
        '<p>"Welcome to my shop! Every new wizard gets a <b>FREE Training Wand</b>!"</p>' +
        '<div class="rq-giftitem"><span class="rq-gifticon">🪄</span>' +
        '<div><b>Training Wand</b><div class="rq-sub2">+1 Power, +10 Magic</div></div></div>' +
        '<button class="rq-bigbtn" id="rq-wear">Wear it!</button>' +
        '<button class="rq-ghostbtn" id="rq-notnow">Not now</button>');
      function done(wear) {
        var id = S.data.activeHero;
        if (wear) {
          S.hero(id).gear.wand = "wand-training";
        } else {
          if (S.data.inventory.indexOf("wand-training") === -1) S.data.inventory.push("wand-training");
        }
        S.data.wandGifted = true;
        S.write();
        ov.remove();
        next();
      }
      $("rq-wear").addEventListener("click", function () {
        window.RQAudio.SFX.unlock(); done(true);
      });
      $("rq-notnow").addEventListener("click", function () {
        window.RQAudio.SFX.click(); done(false);
      });
    },

    /* ---------- 16. generic gear gift: Wear / Not now ---------- */
    giftGearModal: function (gearId, next) {
      var S = window.RQSave;
      var g = S.gearDef(gearId);
      if (!g) { next(); return; }
      var ov = modal(
        '<div class="rq-npcicon">🎁</div><h2>A gift for you!</h2>' +
        '<p>Inkwell rewards your hard work with a <b>' + g.name + "</b>!</p>" +
        '<div class="rq-giftitem"><span class="rq-gifticon">' + g.icon + "</span>" +
        '<div><b>' + g.name + '</b><div class="rq-sub2">' + g.desc + "</div></div></div>" +
        '<button class="rq-bigbtn" id="rq-wear">Wear it!</button>' +
        '<button class="rq-ghostbtn" id="rq-notnow">Not now</button>');
      function done(wear) {
        if (wear) {
          var idx = S.data.inventory.indexOf(gearId);
          if (idx !== -1) S.data.inventory.splice(idx, 1);
          var h = S.hero(S.data.activeHero);
          var old = h.gear[g.slot];
          if (old) S.data.inventory.push(old);
          h.gear[g.slot] = gearId;
          S.write();
        }
        var pi = S.data.pendingGiftGear.indexOf(gearId);
        if (pi !== -1) S.data.pendingGiftGear.splice(pi, 1);
        S.write();
        ov.remove();
        next();
      }
      $("rq-wear").addEventListener("click", function () {
        window.RQAudio.SFX.unlock(); done(true);
      });
      $("rq-notnow").addEventListener("click", function () {
        window.RQAudio.SFX.click(); done(false);
      });
    },

    /* ---------- 6. tutorial victory: guaranteed level 2 + rewards screen ---------- */
    tutorialVictory: function (next) {
      var S = window.RQSave, A = window.RQAudio;
      var id = S.data.activeHero;
      var h = S.hero(id);
      var need = Math.max(1, S.xpForLevel(2) - h.xp) + 5;
      var coins = 30;
      S.data.coins += coins;
      var r = S.addXp(id, need);
      S.completeGoal("training");
      h.battlesWon++;
      S.write();
      A.SFX.levelup();
      setTimeout(function () { A.SFX.victory(); }, 600);
      var ov = modal(
        '<div class="rq-celebrate">🎉</div>' +
        '<div class="rq-starbadge">⭐</div>' +
        '<h2>You reached LEVEL 2!</h2>' +
        '<p>' + S.heroDef(id).name + " grows stronger! Inkwell is so proud he might cry. (Owls do that.)</p>" +
        '<button class="rq-bigbtn" id="rq-vok">Amazing! ➜</button>');
      $("rq-vok").addEventListener("click", function () {
        A.SFX.click();
        ov.querySelector(".rq-modal").innerHTML =
          '<h2>🎁 Battle Rewards</h2>' +
          '<div class="rq-results">' +
          '<div>✨ +' + need + ' XP</div>' +
          '<div>🪙 +' + coins + ' coins</div></div>' +
          '<p class="rq-sub2">Training complete. The real adventure begins!</p>' +
          '<button class="rq-bigbtn" id="rq-rok">Collect ➜</button>';
        A.SFX.coin();
        $("rq-rok").addEventListener("click", function () {
          A.SFX.click(); ov.remove(); next();
        });
      });
    },

    /* ---------- 7. Your Goals panel (auto-opens) ---------- */
    goalsPanel: function (next) {
      var S = window.RQSave;
      var html = '<h2>🎯 Your Goals</h2><p class="rq-sub2">Finish goals to earn gear and glory!</p><div class="rq-goals">';
      S.data.goals.forEach(function (g) {
        var rw = g.reward ? " <span class='rq-goalreward'>🎁 " + (S.gearDef(g.reward) || {}).name + "</span>" : "";
        html += '<div class="rq-goal' + (g.done ? " rq-goaldone" : "") + '">' +
          '<div class="rq-goalcheck">' + (g.done ? "✅" : "⬜") + "</div>" +
          '<div><b>' + g.title + "</b>" + rw +
          '<div class="rq-sub2">' + g.desc + "</div></div></div>";
      });
      html += '</div><button class="rq-bigbtn" id="rq-gok">Let\'s go! ➜</button>';
      var ov = modal(html);
      $("rq-gok").addEventListener("click", function () {
        window.RQAudio.SFX.click(); ov.remove(); next();
      });
    },

    /* ---------- 8. starter familiar choice ---------- */
    familiarChoice: function (next) {
      var S = window.RQSave, A = window.RQAudio;
      var fams = pack().starterFamiliars;
      var html = '<div class="rq-npcicon">🦉</div>' +
        '<h2>Choose your familiar!</h2>' +
        '<p class="rq-sub2">Inkwell: "Every wizard needs a friend. Choose one. It will fight beside you, and evolve when you reach level 7!"</p>' +
        '<div class="rq-famgrid">';
      fams.forEach(function (f) {
        html += '<div class="rq-famcard"><div class="rq-rarity ' + rarityClass(f.rarity) + '">' + f.rarity + "</div>" +
          '<div class="rq-famart">' + f.icon + "</div>" +
          '<div class="rq-famname">' + f.name + "</div>" +
          '<div class="rq-sub2">' + f.desc + "</div>" +
          '<div class="rq-famstats">' +
          '<span title="Power">⚔️' + f.stats.power + '</span>' +
          '<span title="Hearts">❤️' + f.stats.hearts + '</span>' +
          '<span title="Magic">🔮' + f.stats.magic + '</span>' +
          '<span title="Speed">💨' + f.stats.speed + '</span></div>' +
          '<button class="rq-buybtn" data-fam="' + f.id + '">Add to Team</button></div>';
      });
      html += "</div>";
      var ov = modal(html);
      var assigned = false;
      Array.prototype.forEach.call(ov.querySelectorAll("[data-fam]"), function (btn) {
        btn.addEventListener("click", function () {
          /* One tap, one familiar: ignore repeats so a double-tap can
             never stack two villain cutscenes on top of each other. */
          if (assigned) return;
          assigned = true;
          btn.disabled = true;
          A.SFX.unlock();
          try {
            var f = fams.filter(function (x) { return x.id === btn.getAttribute("data-fam"); })[0];
            var pet = {
              defId: f.id, name: f.name, icon: f.icon, rarity: f.rarity,
              stats: JSON.parse(JSON.stringify(f.stats)),
              evolved: false, rescued: false
            };
            S.addPet(pet);
            S.setActiveFamiliar(S.data.activeHero, pet.uid);
            S.completeGoal("first-familiar");
          } catch (err) {
            /* A save-layer hiccup must never strand the player: the
               flow always advances to the villain cutscene. */
            if (window.console && console.warn) console.warn("familiar assign failed:", err);
          }
          ov.remove();
          next();
        });
      });
    },

    /* ---------- 10. rescue intro ---------- */
    rescueIntro: function (next) {
      this.dialogue({
        icon: "🦉", name: "Inkwell", title: "Keeper of the Great Book",
        lastCta: "To the rescue! ➜",
        lines: [
          "Hoo! A wild Bristleback! It is scared, not mean.",
          "Weaken it in battle until its health drops low. Then a RESCUE badge will appear!",
          "Tap RESCUE, set it free, and it will join your Petbook as a friend forever."
        ],
        onDone: next
      });
    },

    /* ---------- 11. wizard name picker ---------- */
    namePicker: function (next) {
      var S = window.RQSave, A = window.RQAudio;
      var WN = pack().wizardNames;
      function opts(arr) {
        return arr.map(function (w) { return '<option value="' + w + '">' + w + "</option>"; }).join("");
      }
      var ov = modal(
        '<h2>🧙 Choose your wizard name!</h2>' +
        '<p class="rq-warning">Do not choose your real name!</p>' +
        '<div class="rq-namerow">' +
        '<select id="rq-adj" class="rq-namesel">' + opts(WN.adjectives) + "</select>" +
        '<select id="rq-noun" class="rq-namesel">' + opts(WN.nouns) + "</select></div>" +
        '<button class="rq-ghostbtn" id="rq-random">🎲 Random</button>' +
        '<div class="rq-namepreview" id="rq-nameprev"></div>' +
        '<button class="rq-bigbtn" id="rq-namesave">That is my name! ➜</button>');
      function preview() {
        $("rq-nameprev").textContent = $("rq-adj").value + " " + $("rq-noun").value;
      }
      function randomize() {
        $("rq-adj").selectedIndex = Math.floor(Math.random() * WN.adjectives.length);
        $("rq-noun").selectedIndex = Math.floor(Math.random() * WN.nouns.length);
        preview(); A.SFX.click();
      }
      $("rq-adj").addEventListener("change", preview);
      $("rq-noun").addEventListener("change", preview);
      $("rq-random").addEventListener("click", randomize);
      randomize();
      $("rq-namesave").addEventListener("click", function () {
        A.SFX.unlock();
        S.data.wizardName = $("rq-adj").value + " " + $("rq-noun").value;
        S.completeGoal("pick-name");
        S.write();
        ov.remove();
        next();
      });
    },

    /* ---------- 13. quest chain intro story cards ---------- */
    questStoryCards: function (next) {
      var cards = [
        { icon: "📖💥", title: "What happened",
          body: "The Unreader tore three pages from the Great Book and scattered them. " +
                "Each page is now guarded by a world boss who garbles words." },
        { icon: "📜", title: "The Keystone Pages",
          body: "Each page seals a boss's garbling magic. Win it back, and reading grows stronger across the land." },
        { icon: "⚔️", title: "Your quest",
          body: "Battle! Level up! Rescue friends! Reclaim all 3 Keystone Pages and defeat The Unreader's plan!" }
      ];
      var i = 0;
      var ov = modal('<div id="rq-storycards"></div>');
      function miniStage(icon) {
        return '<div class="rq-stage rq-stage-mini">' +
          '<div class="rq-stagebackdrop">' +
            '<span class="rq-bk-stars">✨ ⭐ ✨</span>' +
            '<span class="rq-bk-moon">🌕</span>' +
            '<span class="rq-bk-tower">🏰</span>' +
            '<span class="rq-bk-book">📖</span>' +
          "</div>" +
          '<div class="rq-spotlight"></div>' +
          '<div class="rq-stagefloor"></div>' +
          '<div class="rq-curtain rq-curtain-left"></div>' +
          '<div class="rq-curtain rq-curtain-right"></div>' +
          '<div class="rq-valance"></div>' +
          '<div class="rq-actor">' + icon + "</div>" +
        "</div>";
      }
      function show() {
        var c = cards[i];
        $("rq-storycards").innerHTML =
          miniStage(c.icon) + "<h2>" + c.title + "</h2><p>" + c.body + "</p>" +
          '<button class="rq-bigbtn" id="rq-scnext">' +
          (i === cards.length - 1 ? "Begin the quest! ➜" : "Next ➜") + "</button>";
        $("rq-scnext").addEventListener("click", function () {
          window.RQAudio.SFX.click();
          i++;
          if (i >= cards.length) { ov.remove(); next(); }
          else show();
        });
      }
      show();
    },

    /* ---------- 12/13. map reveal: Inkwell shows the locked world map ---------- */
    mapReveal: function (next) {
      this.dialogue({
        icon: "🦉", name: "Inkwell", title: "Keeper of the Great Book",
        lastCta: "Show me the map! ➜",
        lines: [
          "Behold, the world map! Whisperwood is open to you.",
          "Murkfen Marsh and Gloomhollow hide in shadow. Defeat each world boss to unlock the next land!",
          "Tap a glowing node to battle. Nodes open one by one as you win."
        ],
        onDone: next
      });
    }
  };

  window.RQOnboard = OB;
})();
