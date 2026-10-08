/* Reading Quest engine: bank question selector (pass 4).
   Picks questions from the static content banks in content/rq-bank-*.js
   (window.RQBank.<scope>, 1000 items each, tiers 1-8).
   A 20-question per-scope cooldown in the save keeps battles from
   repeating recent questions. The bank items are pure content; this
   file only wires selection. */
(function () {
  "use strict";

  var MAX_COOLDOWN = 20;

  function cooldownFor(scope) {
    try {
      var qcool = window.RQSave && window.RQSave.data && window.RQSave.data.qcool;
      if (qcool && qcool[scope]) return qcool[scope];
    } catch (e) {}
    return [];
  }

  function saveCooldown(scope, buffer) {
    try {
      if (window.RQSave && window.RQSave.data && window.RQSave.data.qcool) {
        window.RQSave.data.qcool[scope] = buffer;
        window.RQSave.write();
      }
    } catch (e) {}
  }

  function pick(scope, tier) {
    if (!window.RQBank || !window.RQBank[scope]) return null;
    var bank = window.RQBank[scope];
    if (!bank.length) return null;

    /* Tiers above 8 map to tier 8 (the hardest bank tier). */
    var effectiveTier = Math.min(Math.max(tier || 1, 1), 8);
    var pool = bank.filter(function (q) { return q.tier === effectiveTier; });
    if (!pool.length) pool = bank; /* graceful: tier pool empty, use whole bank */

    /* Cooldown: skip the last 20 asked for this scope. */
    var cooldown = cooldownFor(scope);
    var avail = pool.filter(function (q) { return cooldown.indexOf(q.qid) < 0; });
    if (!avail.length) avail = pool; /* never return nothing */

    var chosen = avail[Math.floor(Math.random() * avail.length)];
    if (!chosen) chosen = pool[0];

    /* Push to cooldown buffer, capped at 20. */
    var buffer = cooldownFor(scope).slice();
    buffer.push(chosen.qid);
    while (buffer.length > MAX_COOLDOWN) buffer.shift();
    saveCooldown(scope, buffer);

    /* The hero's actual tier rides on the question for render/scoring. */
    chosen.tier = tier || 1;
    return chosen;
  }

  window.RQBankSelect = { pick: pick };
})();
