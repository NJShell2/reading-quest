/* Reading Quest engine: save system. Per-hero progress, shared coins.
   localStorage only. No accounts, no network. */
(function () {
  "use strict";
  var KEY = "reading-quest-save-v1";

  function pack() { return window.ContentPacks.reading; }

  function freshHero() {
    return { xp: 0, level: 1, bonusPower: 0, bonusHp: 0,
             familiarStage: 0, battlesWon: 0 };
  }

  function fresh() {
    var s = { v: 1, coins: 25, activeHero: "knight",
              heroes: {}, beastsUnlocked: [], bossesBeaten: [],
              chestsOpened: 0, bestStreak: 0,
              items: { potion: 1, crystal: 0, elixir: 0, lucky: 0 },
              luckyNext: false, elixirTurns: 0 };
    pack().classes.forEach(function (c) { s.heroes[c.id] = freshHero(); });
    pack().beasts.forEach(function (b) { s.heroes[b.id] = freshHero(); });
    return s;
  }

  var Save = {
    data: null,
    load: function () {
      try {
        var raw = window.localStorage.getItem(KEY);
        if (raw) {
          var s = JSON.parse(raw);
          if (s && s.v === 1) { this.data = s; return s; }
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
                 hp: b.hp, power: b.power, spells: base.spells,
                 familiar: base.familiar, beast: true, baseId: b.baseClass };
      }
      return null;
    },
    maxHp: function (id) { return this.heroDef(id).hp + this.hero(id).bonusHp; },
    power: function (id) { return this.heroDef(id).power + this.hero(id).bonusPower; },
    xpForLevel: function (level) {
      var t = pack().xpTable;
      return t[level] !== undefined ? t[level] : t[t.length - 1] + (level - t.length + 1) * 300;
    },
    /* Add XP; returns array of levels gained (for fanfare). Handles beast 2x mult. */
    addXp: function (id, amount) {
      var h = this.hero(id);
      var mult = this.isBeast(id) ? pack().beastXpMult : 1;
      h.xp += Math.round(amount * mult);
      var gained = [];
      while (h.level < pack().maxLevel && h.xp >= this.xpForLevel(h.level + 1)) {
        h.level += 1;
        gained.push(h.level);
      }
      /* familiar milestones: egg at 3, hatch at 4, evolve at 7 */
      if (h.familiarStage === 0 && h.level >= 3) h.familiarStage = 1;
      if (h.familiarStage === 1 && h.level >= 4) h.familiarStage = 2;
      if (h.familiarStage === 2 && h.level >= 7) h.familiarStage = 3;
      this.write();
      return gained;
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
          newly.push(b.id);
        }
      });
      if (newly.length) this.write();
      return newly;
    }
  };

  window.RQSave = Save;
})();
