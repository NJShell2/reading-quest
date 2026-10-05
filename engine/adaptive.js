/* Reading Quest engine: adaptive difficulty (the flow-state engine).
   Subject-agnostic. Every hero trains on a long tier ladder (the pack
   defines how many tiers and what each means). The engine watches a
   rolling window of recent answers, tracking BOTH accuracy and response
   time, and moves the hero along the ladder:

     WHIZING   near-perfect accuracy + very fast  -> tier up early
     STEADY    solid accuracy with real effort     -> hold (the growth zone)
     STOMPED   mostly wrong + very slow            -> tier down one notch

   A tier drop is NEVER framed as failure. In-game it is a "Secret Side
   Quest": a hidden training trail the wisest heroes take. No demotion
   language anywhere.

   Speed is calibrated per question kind, because "fast" means something
   different for tapping a word vs reading a whole story. Each answer is
   converted to a speed score in 0..1 using that kind's fast/slow marks:
     speedT = clamp((slowMs - ms) / (slowMs - fastMs))
   1 = blazing, 0 = struggling. The window average decides.
*/
(function () {
  "use strict";

  function pack() { return window.ContentPacks.reading; }

  var BANNED = ["demot", "fail", "too hard", "too difficult", "stupid",
                "give up", "not good enough"];

  var Adaptive = {
    tierLabel: function (tier) {
      var p = pack();
      if (typeof p.tierLabel === "function") return p.tierLabel(tier);
      return "Tier " + tier;
    },

    /* ev: { correct: bool, ms: number, kind: string }
       Returns null, or { dir: 1|-1, tier: number }. */
    record: function (heroId, ev) {
      var S = window.RQSave, p = pack(), pc = p.pacing;
      var h = S.hero(heroId);
      if (!h.recent) h.recent = [];
      h.recent.push({ c: ev.correct ? 1 : 0, ms: Math.max(0, ev.ms || 0), k: ev.kind || "default" });
      if (h.recent.length > pc.window) h.recent.shift();
      h.answersSinceChange = (h.answersSinceChange || 0) + 1;
      h.sinceEval = (h.sinceEval || 0) + 1;
      S.write();

      if (h.recent.length < 6) return null;              // need a real sample
      if (h.sinceEval < pc.evalEvery) return null;       // evaluate on cadence
      h.sinceEval = 0;
      if (h.answersSinceChange < pc.cooldown) return null; // no yo-yo after a move

      var w = h.recent;
      var acc = 0, speed = 0;
      for (var i = 0; i < w.length; i++) {
        acc += w[i].c;
        var fast = pc.fastMs[w[i].k] !== undefined ? pc.fastMs[w[i].k] : pc.fastMs.default;
        var slow = pc.slowMs[w[i].k] !== undefined ? pc.slowMs[w[i].k] : pc.slowMs.default;
        var t = (slow - w[i].ms) / Math.max(1, slow - fast);
        speed += Math.min(1, Math.max(0, t));
      }
      acc /= w.length;
      speed /= w.length;

      var tier = h.tier || 1;
      if (acc >= pc.whizAcc && speed >= 0.75 && tier < p.tiers) {
        return this._move(S, h, heroId, 1);
      }
      if (acc <= pc.stompAcc && speed <= 0.25 && tier > 1) {
        return this._move(S, h, heroId, -1);
      }
      return null;
    },

    _move: function (S, h, heroId, dir) {
      h.tier = Math.min(pack().tiers, Math.max(1, (h.tier || 1) + dir));
      h.recent = [];
      h.answersSinceChange = 0;
      h.sinceEval = 0;
      S.write();
      return { dir: dir, tier: h.tier };
    },

    /* Copy used by battle/game screens. Positive framing only. */
    copyFor: function (move) {
      var label = this.tierLabel(move.tier);
      if (move.dir > 0) {
        return {
          title: "New Heights!",
          body: "You are blazing through every challenge! The quest grows to match your power. Welcome to " + label + "!",
          cta: "Onward!",
          icon: "📈"
        };
      }
      return {
        title: "Secret Side Quest!",
        body: "A hidden trail winds away from the main path. The wisest heroes take training detours to grow even stronger. New trail: " + label + ".",
        cta: "Let's go!",
        icon: "🌿"
      };
    },

    /* Self-check: returns a list of banned words found in the copy. */
    checkCopy: function () {
      var found = [];
      [this.copyFor({ dir: 1, tier: 5 }), this.copyFor({ dir: -1, tier: 2 })].forEach(function (c) {
        var text = (c.title + " " + c.body).toLowerCase();
        BANNED.forEach(function (w) { if (text.indexOf(w) !== -1) found.push(w); });
      });
      return found;
    }
  };

  window.RQAdaptive = Adaptive;
})();
