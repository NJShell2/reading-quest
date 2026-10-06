/* Reading Quest engine: save system. Per-hero progress, shared coins.
   localStorage only. No accounts, no network.
   Schema v3: wizardName, grade, onboarding, goals, petbook, zones, gear,
   inventory, daily rewards. Migrates v1 and v2 forward. */
(function () {
  "use strict";
  var KEY = "reading-quest-save-v1";

  function pack() { return window.ContentPacks.reading; }

  function freshHero() {
    return { xp: 0, level: 1, bonusPower: 0, bonusHp: 0,
             familiarStage: 0, familiar: null,
             gear: { wand: null, hat: null, garb: null, boots: null, ring: null },
             battlesWon: 0,
             tier: 1, recent: [], answersSinceChange: 0, sinceEval: 0 };
  }

  function freshGoals() {
    return pack().goals.map(function (g) {
      return { id: g.id, title: g.title, desc: g.desc, done: false, reward: g.reward || null };
    });
  }

  function freshZones() {
    var z = {};
    pack().worlds.forEach(function (w, i) {
      z[w.id] = { unlocked: i === 0, nodesBeaten: [] };
    });
    return z;
  }

  function fresh() {
    var s = { v: 3, coins: 25, activeHero: "knight",
              heroes: {}, beastsUnlocked: [], bossesBeaten: [],
              chestsOpened: 0, bestStreak: 0,
              items: { potion: 1, crystal: 0, elixir: 0, lucky: 0 },
              luckyNext: false, elixirTurns: 0,
              /* v3 fields */
              wizardName: null, grade: null,
              onboardingDone: false, onboardingStep: null, guideMet: false,
              wandGifted: false,
              goals: freshGoals(),
              petbook: [],
              seenMonsters: [],
              zones: freshZones(),
              daily: { lastClaim: null, streak: 0 },
              inventory: [],
              pendingGiftGear: [],
              quests: { main: null } };
    pack().classes.forEach(function (c) { s.heroes[c.id] = freshHero(); });
    pack().beasts.forEach(function (b) { s.heroes[b.id] = freshHero(); });
    return s;
  }

  /* Turn a legacy class familiar (egg/baby/adult pipeline) into a chosen
     familiar object so old saves keep their friend. */
  function legacyFamiliar(def, stage) {
    if (stage < 2) return null;
    var evolved = stage >= 3;
    return {
      uid: "legacy-" + def.id + "-" + Date.now(),
      defId: "legacy-" + def.id,
      name: evolved ? def.familiar.adult : def.familiar.baby,
      icon: def.familiar.icons[stage - 1],
      rarity: "Common",
      stats: evolved ? { power: 4, hearts: 12, magic: 14, speed: 7 }
                     : { power: 2, hearts: 8, magic: 10, speed: 6 },
      evolved: evolved, rescued: false, isNew: false
    };
  }

  function migrateToV3(s) {
    if (s.wizardName === undefined) s.wizardName = null;
    if (s.grade === undefined) s.grade = null;
    if (s.onboardingDone === undefined) s.onboardingDone = true; /* existing players are past onboarding */
    if (s.onboardingStep === undefined) s.onboardingStep = null;
    if (s.guideMet === undefined) s.guideMet = true;
    if (s.wandGifted === undefined) s.wandGifted = true;
    if (!s.goals) s.goals = freshGoals();
    if (!s.petbook) s.petbook = [];
    if (!s.seenMonsters) s.seenMonsters = [];
    if (!s.zones) s.zones = freshZones();
    if (!s.daily) s.daily = { lastClaim: null, streak: 0 };
    if (!s.inventory) s.inventory = [];
    if (!s.pendingGiftGear) s.pendingGiftGear = [];
    if (!s.quests) s.quests = { main: null };

    /* hero fields + legacy familiar migration */
    Object.keys(s.heroes).forEach(function (id) {
      var hh = s.heroes[id];
      if (hh.familiar === undefined) {
        var def = null;
        try { def = Save.heroDef(id); } catch (e) {}
        hh.familiar = (def && !def.beast) ? legacyFamiliar(def, hh.familiarStage || 0) : null;
        if (hh.familiar) s.petbook.push(hh.familiar);
      }
      if (!hh.gear) hh.gear = { wand: null, hat: null, garb: null, boots: null, ring: null };
      if (hh.battlesWon === undefined) hh.battlesWon = 0;
    });

    /* zones from boss history: W1 boss beaten unlocks W2, etc. */
    var worlds = pack().worlds;
    worlds.forEach(function (w, i) {
      var z = s.zones[w.id];
      if (i === 0) {
        z.unlocked = true;
        if (s.bossesBeaten.indexOf("mumblemouth") !== -1) {
          w.nodes.forEach(function (n) {
            if (z.nodesBeaten.indexOf(n.id) === -1) z.nodesBeaten.push(n.id);
          });
        }
      } else if (w.unlockBoss && s.bossesBeaten.indexOf(w.unlockBoss) !== -1) {
        z.unlocked = true;
      }
    });

    /* goals: mark done from history */
    var anyWins = Object.keys(s.heroes).some(function (id) { return s.heroes[id].battlesWon > 0; });
    function done(id) {
      var g = s.goals.filter(function (x) { return x.id === id; })[0];
      if (g) g.done = true;
    }
    if (anyWins || s.bossesBeaten.length) { done("training"); done("pick-name"); done("first-familiar"); }
    var totalWins = Object.keys(s.heroes).reduce(function (n, id) { return n + (s.heroes[id].battlesWon || 0); }, 0);
    if (totalWins >= 3) done("win-3");
    if (s.bossesBeaten.indexOf("mumblemouth") !== -1) done("w1-boss");
    if (s.bossesBeaten.indexOf("wipeout-wraith") !== -1) done("page-2");
    if (s.bossesBeaten.indexOf("the-slowdown") !== -1) done("page-3");
    if (s.petbook.length > 1) done("first-rescue");

    s.v = 3;
    return s;
  }

  var Save = {
    data: null,
    load: function () {
      try {
        var raw = window.localStorage.getItem(KEY);
        if (raw) {
          var s = JSON.parse(raw);
          if (s && s.v === 3) { this.data = s; return s; }
          if (s && s.v === 2) { s = migrateToV3(s); this.data = s; this.write(); return s; }
          if (s && s.v === 1) {
            /* migrate v1 -> v2: add adaptive-difficulty fields */
            Object.keys(s.heroes).forEach(function (id) {
              var hh = s.heroes[id];
              if (hh.tier === undefined) hh.tier = 1;
              if (!hh.recent) hh.recent = [];
              hh.answersSinceChange = hh.answersSinceChange || 0;
              hh.sinceEval = hh.sinceEval || 0;
            });
            s.v = 2;
            s = migrateToV3(s);
            this.data = s;
            this.write();
            return s;
          }
        }
      } catch (e) {}
      this.data = fresh();
      this.write();
      return this.data;
    },
    write: function () {
      try { window.localStorage.setItem(KEY, JSON.stringify(this.data)); } catch (e) {}
    },
    reset: function () {
      this.data = fresh();
      this.write();
    },
    hero: function (id) {
      if (!this.data.heroes[id]) this.data.heroes[id] = freshHero();
      return this.data.heroes[id];
    },
    isBeast: function (id) {
      return pack().beasts.some(function (b) { return b.id === id; });
    },
    heroDef: function (id) {
      var c = pack().classes.filter(function (x) { return x.id === id; })[0];
      if (c) return c;
      var b = pack().beasts.filter(function (x) { return x.id === id; })[0];
      if (b) {
        var base = pack().classes.filter(function (x) { return x.id === b.baseClass; })[0];
        return { id: b.id, name: b.name, title: b.name, strategy: base.strategy,
                 desc: b.desc, icon: b.icon, color: base.color,
                 hp: b.hp, power: b.power, spells: base.spells, gens: base.gens,
                 familiar: base.familiar, beast: true, baseId: b.baseClass };
      }
      return null;
    },

    /* ---------- gear + derived stats ---------- */
    gearDef: function (gearId) {
      return pack().gear.filter(function (g) { return g.id === gearId; })[0] || null;
    },
    gearBonus: function (id, stat) {
      var h = this.hero(id), self = this, total = 0;
      Object.keys(h.gear || {}).forEach(function (slot) {
        var gid = h.gear[slot];
        if (!gid) return;
        var g = self.gearDef(gid);
        if (g) total += (g[stat] || 0);
      });
      return total;
    },
    maxHp: function (id) { return this.heroDef(id).hp + this.hero(id).bonusHp + this.gearBonus(id, "hp"); },
    power: function (id) { return this.heroDef(id).power + this.hero(id).bonusPower + this.gearBonus(id, "power"); },
    maxMagic: function (id) { return 100 + this.gearBonus(id, "magic"); },
    equipGear: function (heroId, gearId) {
      var h = this.hero(heroId), g = this.gearDef(gearId);
      if (!g) return false;
      var idx = this.data.inventory.indexOf(gearId);
      if (idx === -1) return false;
      this.data.inventory.splice(idx, 1);
      var old = h.gear[g.slot];
      if (old) this.data.inventory.push(old);
      h.gear[g.slot] = gearId;
      this.write();
      return true;
    },
    unequipGear: function (heroId, slot) {
      var h = this.hero(heroId);
      var old = h.gear[slot];
      if (!old) return false;
      h.gear[slot] = null;
      this.data.inventory.push(old);
      this.write();
      return true;
    },
    grantGear: function (gearId) {
      /* Adds to inventory and queues the Wear / Not now moment. */
      if (this.data.inventory.indexOf(gearId) === -1 &&
          !this.gearEquippedAnywhere(gearId)) {
        this.data.inventory.push(gearId);
      }
      if (this.data.pendingGiftGear.indexOf(gearId) === -1) {
        this.data.pendingGiftGear.push(gearId);
      }
      this.write();
    },
    gearEquippedAnywhere: function (gearId) {
      var self = this;
      return Object.keys(this.data.heroes).some(function (id) {
        var h = self.data.heroes[id];
        return h.gear && Object.keys(h.gear).some(function (s) { return h.gear[s] === gearId; });
      });
    },

    /* ---------- goals engine ---------- */
    goal: function (id) {
      return this.data.goals.filter(function (g) { return g.id === id; })[0] || null;
    },
    /* Marks a goal done; fires its gear reward. Returns true if newly done. */
    completeGoal: function (id) {
      var g = this.goal(id);
      if (!g || g.done) return false;
      g.done = true;
      if (g.reward) this.grantGear(g.reward);
      this.write();
      return true;
    },

    /* ---------- petbook (familiars collection) ---------- */
    addPet: function (pet) {
      pet.uid = pet.uid || ("pet-" + Date.now() + "-" + Math.floor(Math.random() * 1e6));
      pet.isNew = true;
      this.data.petbook.push(pet);
      this.write();
      return pet;
    },
    petByUid: function (uid) {
      return this.data.petbook.filter(function (p) { return p.uid === uid; })[0] || null;
    },
    ownedCount: function (defId) {
      return this.data.petbook.filter(function (p) { return p.defId === defId; }).length;
    },
    setActiveFamiliar: function (heroId, uid) {
      var pet = this.petByUid(uid);
      if (!pet) return false;
      this.hero(heroId).familiar = JSON.parse(JSON.stringify(pet));
      this.hero(heroId).familiar.uid = uid;
      this.write();
      return true;
    },
    markPetsSeen: function () {
      var changed = false;
      this.data.petbook.forEach(function (p) { if (p.isNew) { p.isNew = false; changed = true; } });
      if (changed) this.write();
    },

    /* ---------- zones ---------- */
    zone: function (zoneId) {
      if (!this.data.zones[zoneId]) {
        this.data.zones[zoneId] = { unlocked: false, nodesBeaten: [] };
      }
      return this.data.zones[zoneId];
    },
    worldIndex: function (zoneId) {
      for (var i = 0; i < pack().worlds.length; i++) {
        if (pack().worlds[i].id === zoneId) return i;
      }
      return -1;
    },
    nodeBeaten: function (zoneId, nodeId) {
      return this.zone(zoneId).nodesBeaten.indexOf(nodeId) !== -1;
    },
    markNodeBeaten: function (zoneId, nodeId) {
      var z = this.zone(zoneId);
      if (z.nodesBeaten.indexOf(nodeId) === -1) z.nodesBeaten.push(nodeId);
      /* boss beaten unlocks the next world */
      var worlds = pack().worlds, wi = this.worldIndex(zoneId);
      var node = worlds[wi].nodes.filter(function (n) { return n.id === nodeId; })[0];
      if (node && node.boss && wi + 1 < worlds.length) {
        this.zone(worlds[wi + 1].id).unlocked = true;
      }
      this.write();
    },
    isNodeOpen: function (zoneId, nodeIdx) {
      var worlds = pack().worlds, wi = this.worldIndex(zoneId);
      if (wi < 0 || !this.zone(zoneId).unlocked) return false;
      if (nodeIdx === 0) return true;
      var prev = worlds[wi].nodes[nodeIdx - 1];
      return this.nodeBeaten(zoneId, prev.id);
    },
    worldProgress: function (zoneId) {
      var worlds = pack().worlds, wi = this.worldIndex(zoneId);
      if (wi < 0) return { beaten: 0, total: 0 };
      var z = this.zone(zoneId);
      return { beaten: z.nodesBeaten.length, total: worlds[wi].nodes.length };
    },

    /* ---------- main quest tracker ---------- */
    keystonePages: function () {
      var bosses = pack().keystoneBosses;
      return this.data.bossesBeaten.filter(function (id) { return bosses.indexOf(id) !== -1; }).length;
    },
    currentObjective: function () {
      if (!this.data.onboardingDone) return "Finish your training with Inkwell";
      var b = this.data.bossesBeaten;
      if (b.indexOf("mumblemouth") === -1) return "Defeat MUMBLEMOUTH in Whisperwood";
      if (b.indexOf("wipeout-wraith") === -1) return "Defeat the WIPEOUT WRAITH in Murkfen Marsh";
      if (b.indexOf("the-slowdown") === -1) return "Defeat THE SLOWDOWN in Gloomhollow";
      return "The Great Book is whole! You are a legend!";
    },

    /* ---------- daily reward ---------- */
    todayStr: function () {
      var d = new Date();
      return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
    },
    dailyAvailable: function () {
      return this.data.daily.lastClaim !== this.todayStr();
    },
    claimDaily: function () {
      var D = pack().daily, d = this.data.daily;
      var today = this.todayStr();
      if (d.lastClaim === today) return null;
      var y = new Date(); y.setDate(y.getDate() - 1);
      var yStr = y.getFullYear() + "-" + ("0" + (y.getMonth() + 1)).slice(-2) + "-" + ("0" + y.getDate()).slice(-2);
      d.streak = (d.lastClaim === yStr) ? d.streak + 1 : 1;
      d.lastClaim = today;
      var coins = D.baseCoins + Math.min(d.streak, D.streakCap) * D.streakBonus;
      this.data.coins += coins;
      var item = null;
      if (Math.random() < D.itemChance) {
        item = Math.random() < 0.5 ? "potion" : "crystal";
        this.data.items[item] = (this.data.items[item] || 0) + 1;
      }
      this.write();
      return { coins: coins, streak: d.streak, item: item };
    },

    /* ---------- grade seeding ---------- */
    setGrade: function (grade) {
      this.data.grade = grade;
      var seedTier = (grade - 1) * 2 + 1;
      var self = this;
      Object.keys(this.data.heroes).forEach(function (id) {
        var hh = self.data.heroes[id];
        if (hh.xp === 0 && (hh.tier === 1 || !hh.tier)) hh.tier = seedTier;
      });
      this.write();
    },

    /* ---------- misc ---------- */
    markSeen: function (monsterId) {
      if (this.data.seenMonsters.indexOf(monsterId) === -1) {
        this.data.seenMonsters.push(monsterId);
        this.write();
      }
    },

    xpForLevel: function (level) {
      var t = pack().xpTable;
      return t[level] !== undefined ? t[level] : t[t.length - 1] + (level - t.length + 1) * 300;
    },
    /* Add XP; returns { gained:[levels], evolvedFamiliar:bool }. Handles beast 2x mult. */
    addXp: function (id, amount) {
      var h = this.hero(id);
      var mult = this.isBeast(id) ? pack().beastXpMult : 1;
      h.xp += Math.round(amount * mult);
      var gained = [];
      while (h.level < pack().maxLevel && h.xp >= this.xpForLevel(h.level + 1)) {
        h.level += 1;
        gained.push(h.level);
      }
      /* chosen familiar evolves at hero level 7 */
      var evolvedFamiliar = false;
      if (h.familiar && !h.familiar.evolved && h.level >= 7) {
        var sd = this.starterFamiliarDef(h.familiar.defId);
        var evo = sd ? sd.evolved : null;
        if (evo) {
          h.familiar.name = evo.name;
          h.familiar.icon = evo.icon;
          h.familiar.stats = JSON.parse(JSON.stringify(evo.stats));
        } else {
          h.familiar.stats.power += 2; h.familiar.stats.hearts += 4;
          h.familiar.stats.magic += 4; h.familiar.stats.speed += 1;
        }
        h.familiar.evolved = true;
        var pet = this.petByUid(h.familiar.uid);
        if (pet) {
          pet.name = h.familiar.name; pet.icon = h.familiar.icon;
          pet.stats = JSON.parse(JSON.stringify(h.familiar.stats));
          pet.evolved = true;
        }
        evolvedFamiliar = true;
      }
      this.write();
      return { gained: gained, evolvedFamiliar: evolvedFamiliar };
    },
    starterFamiliarDef: function (defId) {
      return pack().starterFamiliars.filter(function (f) { return f.id === defId; })[0] || null;
    },
    spellsFor: function (id) {
      var def = this.heroDef(id), lvl = this.hero(id).level;
      return def.spells.filter(function (s) { return s.level <= lvl; });
    },
    checkBeastUnlocks: function () {
      /* Returns list of newly unlocked beast ids. */
      var self = this, newly = [];
      pack().beasts.forEach(function (b) {
        if (self.data.beastsUnlocked.indexOf(b.id) === -1 &&
            self.hero(b.baseClass).level >= pack().beastUnlockLevel) {
          self.data.beastsUnlocked.push(b.id);
          /* beasts enter the ladder above the basics, still adaptive */
          self.hero(b.id).tier = pack().beastStartTier || 4;
          newly.push(b.id);
        }
      });
      if (newly.length) this.write();
      return newly;
    }
  };

  window.RQSave = Save;
})();
