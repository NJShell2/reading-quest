/* Reading Quest test harness.
   Minimal DOM shim (tests/dom-shim.js); loads engine files in
   index.html order and asserts:
     (a) all 5 familiars render with clickable buttons in familiarChoice
     (b) every overlay-producing function has a dismiss path
     (c) stage intro: scene/dialogue state machine, full-screen play,
         skip flag behavior
     (d) TTS voice picker ranks voices and falls back gracefully
     (e) no em dashes in user-facing strings of changed files
     (f) overworld maze: layout, movement, walls, battle on contact
     (g) maze solvability: BFS spawn-to-boss reachable for every world,
         optimal path ramps with world index
     (h) familiars (Petbook) screen: every button works, no JS errors
         on render, Set Active switches the familiar, top-bar buttons
         navigate without a refresh (Item 2 regression)
     (i) maze continuity: encounter round trip restores exact x/y and
         facing, defeated roam monsters stay gone across save/load,
         fled-from monsters stay, boss/Keystone progression intact
         (Item 3)
   Run: node tests/test.js */
"use strict";

var fs = require("fs");
var path = require("path");
var vm = require("vm");
var shim = require("./dom-shim.js");

var ROOT = path.join(__dirname, "..");
shim.install();

["engine/audio.js", "engine/save.js", "engine/adaptive.js", "engine/questions.js",
 "engine/battle.js", "engine/stage.js", "engine/onboarding.js", "engine/overworld.js",
 "engine/game.js", "content/reading-pack.js"].forEach(function (f) {
  vm.runInThisContext(fs.readFileSync(path.join(ROOT, f), "utf8"), { filename: f });
});

var S = window.RQSave;
var OB = window.RQOnboard;
var Game = window.RQGame;
var OW = window.RQOverworld;
function pack() { return window.ContentPacks.reading; }

var passed = 0, failed = 0;
function assert(cond, msg) {
  if (cond) { passed++; }
  else { failed++; console.log("FAIL: " + msg); }
}
function $(id) { return document.getElementById(id); }
function overlays() { return document.querySelectorAll(".rq-overlay").length; }
function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
function freshSave() {
  window.localStorage.clear();
  S.load();
  S.data.activeHero = "knight";
}
function clickAll(id, times) {
  for (var i = 0; i < times; i++) {
    var e = $(id);
    if (!e) return false;
    e.click();
  }
  return true;
}

async function testA_familiarChoice() {
  console.log("-- (a) familiarChoice: 5 cards, clickable, Nova reachable");
  freshSave();
  var nextCalls = 0;
  OB.familiarChoice(function () { nextCalls++; });
  var btns = document.querySelectorAll("[data-fam]");
  assert(btns.length === 5, "familiarChoice renders 5 Add to Team buttons (got " + btns.length + ")");
  var ids = btns.map(function (b) { return b.getAttribute("data-fam"); }).sort();
  assert(ids.join(",") === "ember,hoot,nova,pip,ripple",
    "all 5 familiars present incl. Nova (got " + ids.join(",") + ")");
  var nova = null;
  btns.forEach(function (b) { if (b.getAttribute("data-fam") === "nova") nova = b; });
  assert(!!nova, "Nova the Starwhal button exists");
  assert(!nova.disabled, "Nova button is enabled/clickable");
  nova.click();
  assert(nextCalls === 1, "clicking Nova calls next() exactly once (c)");
  assert(S.data.petbook.length === 1 && S.data.petbook[0].defId === "nova",
    "Nova added to petbook");
  var fam = S.hero("knight").familiar;
  assert(!!fam && fam.uid === S.data.petbook[0].uid,
    "Nova set as knight's active familiar");
  assert(overlays() === 0, "familiar modal removed after assignment");
  /* double-tap hardening: a second click must not double-assign or re-advance */
  nova.click();
  assert(nextCalls === 1, "double-tap does not re-fire next()");
  assert(S.data.petbook.length === 1, "double-tap does not duplicate the pet");
  /* the captured next() must lead to the villain cutscene */
  var villainNext = null;
  OB.familiarChoice(function () { villainNext = true; });
  document.querySelector('[data-fam="pip"]').click();
  assert(villainNext === true, "familiar next() fires without exception (c)");
}

async function testB_overlays() {
  console.log("-- (b) overlay dismiss paths");
  freshSave();
  /* post-onboarding state so showHub never re-opens familiar choice */
  var starterPet = S.addPet({ defId: "pip", name: "Pip the Bookmouse", icon: "🐭",
    rarity: "Common", stats: { power: 2, hearts: 8, magic: 10, speed: 6 },
    evolved: false, rescued: false });
  S.setActiveFamiliar("knight", starterPet.uid);

  /* dialogue */
  var dlgDone = 0;
  OB.dialogue({ icon: "🦉", name: "Inkwell", lines: ["one", "two"],
                onDone: function () { dlgDone++; } });
  assert($("rq-dline").textContent === "one", "dialogue shows first line");
  assert(clickAll("rq-dnext", 2), "dialogue Next clickable twice");
  assert(overlays() === 0 && dlgDone === 1, "dialogue dismisses via Next, onDone fires");

  /* wand gift */
  var wandNext = 0;
  OB.wandGift(function () { wandNext++; });
  $("rq-wear").click();
  assert(overlays() === 0 && wandNext === 1, "wandGift dismisses via Wear it!");
  assert(S.hero("knight").gear.wand === "wand-training", "wand equipped");

  /* generic gear gift */
  var gearNext = 0;
  OB.giftGearModal("cap-training", function () { gearNext++; });
  $("rq-notnow").click();
  assert(overlays() === 0 && gearNext === 1, "giftGearModal dismisses via Not now");

  /* tutorial victory (two-step) */
  var tvNext = 0;
  OB.tutorialVictory(function () { tvNext++; });
  assert(clickAll("rq-vok", 1) && clickAll("rq-rok", 1), "victory buttons clickable");
  assert(overlays() === 0 && tvNext === 1, "tutorialVictory dismisses via Amazing/Collect");

  /* goals panel */
  var gNext = 0;
  OB.goalsPanel(function () { gNext++; });
  $("rq-gok").click();
  assert(overlays() === 0 && gNext === 1, "goalsPanel dismisses");

  /* name picker */
  var nNext = 0;
  OB.namePicker(function () { nNext++; });
  assert($("rq-adj") && $("rq-noun"), "name picker selects render");
  $("rq-namesave").click();
  assert(overlays() === 0 && nNext === 1 && !!S.data.wizardName,
    "namePicker dismisses and saves wizard name");

  /* quest story cards: mini stages */
  var scNext = 0;
  OB.questStoryCards(function () { scNext++; });
  assert(!!document.querySelector("#rq-storycards .rq-stage-mini"),
    "story cards use the mini stage");
  assert(clickAll("rq-scnext", 3), "story cards advance 3x");
  assert(overlays() === 0 && scNext === 1, "questStoryCards dismisses");

  /* coach bubble: tap-to-dismiss */
  var tgt = document.createElement("div");
  document.body.appendChild(tgt);
  OB.pointAt(tgt, "Tap me");
  var bubble = document.querySelector(".rq-coachbubble");
  assert(!!bubble, "coach bubble appears");
  bubble.click();
  assert(document.querySelectorAll(".rq-coachbubble").length === 0,
    "coach bubble tap-to-dismiss works");
  tgt.remove();

  /* questions.ask clears transient popups before rendering */
  var t2 = document.createElement("div");
  document.body.appendChild(t2);
  OB.pointAt(t2, "stuck bubble?");
  var qc = document.createElement("div");
  var qp = window.RQQuestions.ask(qc, { kind: "choice", prompt: "Pick",
                                        choices: ["a", "b"], answer: 0 });
  assert(document.querySelectorAll(".rq-coachbubble").length === 0 &&
         document.querySelectorAll(".rq-pointer").length === 0,
    "RQQuestions.ask clears coach pointer/bubble before rendering");
  qc.querySelectorAll(".rq-opt")[1].click();
  var qr = await qp;
  assert(qr.correct === false, "choice question still resolves after popup sweep");
  t2.remove();

  /* build renderer: Hear it + Spell it buttons */
  var bc = document.createElement("div");
  var spellCalls = [];
  var origSpell = window.RQAudio.Speech.spell;
  window.RQAudio.Speech.spell = function (w) { spellCalls.push(w); };
  var bp = window.RQQuestions.ask(bc, { kind: "build", prompt: "Build it",
                                        answer: "cat", letters: ["t", "a", "c"] });
  var speakBtns = bc.querySelectorAll(".rq-speak");
  assert(speakBtns.length === 2, "spelling has Hear it + Spell it buttons");
  var hasSpellIt = speakBtns.some(function (b) { return b.textContent.indexOf("Spell it") !== -1; });
  assert(hasSpellIt, "Spell it button labeled correctly");
  speakBtns.forEach(function (b) {
    if (b.textContent.indexOf("Spell it") !== -1) b.click();
  });
  assert(spellCalls.join(",") === "cat", "Spell it reads the word via Speech.spell");
  window.RQAudio.Speech.spell = origSpell;
  /* answer by tapping tiles c, a, t */
  var tiles = bc.querySelectorAll(".rq-tile");
  ["c", "a", "t"].forEach(function (ch) {
    tiles.forEach(function (t) { if (t.textContent === ch && t.dataset.used !== "1") t.click(); });
  });
  var br = await bp;
  assert(br.correct === true, "spelling tiles still answer correctly");

  /* game modals */
  Game.showMenu();
  assert(overlays() === 1, "menu opens");
  $("m-how").click();
  assert(!!$("m-howok"), "How to Play swaps in");
  $("m-howok").click();
  assert(overlays() === 0, "menu dismisses via Got it!");

  var pgNext = 0;
  Game.pickGradeModal(function () { pgNext++; });
  document.querySelector('[data-mg="3"]').click();
  assert(overlays() === 0 && pgNext === 1 && S.data.grade === 3,
    "pickGradeModal dismisses and sets grade");

  S.data.daily = { lastClaim: null, streak: 0 };
  Game.claimDaily();
  assert(overlays() === 1, "daily reward modal opens");
  $("d-ok").click();
  assert(overlays() === 0, "daily reward dismisses");

  /* boss intro modal */
  var bossMon = pack().monsters.filter(function (m) { return m.id === "mumblemouth"; })[0];
  Game.startBattle("whisperwood",
    { id: "w1n5", name: "Garbler's Cave", monster: "mumblemouth", boss: true }, bossMon);
  assert(!!$("boss-fight"), "boss intro shows Fight button");
  $("boss-fight").click();
  assert(overlays() === 0, "boss intro dismisses into battle");
  assert(!!document.querySelector("#screen-battle .rq-battlewrap"),
    "battle arena built after boss intro");

  /* afterBattle defeat + victory */
  S.data.grade = 2; S.data.onboardingDone = true;
  Game.afterBattle({ victory: false, xp: 5 }, "whisperwood",
    { id: "w1n1" }, { id: "letterbat", name: "Letterbat" });
  assert(!!$("r-ok"), "defeat modal shows Continue");
  $("r-ok").click();
  assert(overlays() === 0, "defeat modal dismisses");

  Game.afterBattle({ victory: true, xp: 10, coins: 5, levelsGained: [],
                     evolvedFamiliar: false, newBeasts: [], boss: false,
                     outro: null, tierMove: null },
    "whisperwood", { id: "w1n1", name: "Rustling Path" },
    { id: "letterbat", name: "Letterbat" });
  assert(!!$("r-ok"), "victory modal shows Continue");
  $("r-ok").click();
  assert(overlays() === 0, "victory modal dismisses");

  /* afterRescueBattle defeat path */
  var srbCalled = 0;
  var origSRB = Game.startRescueBattle;
  Game.startRescueBattle = function () { srbCalled++; };
  Game.afterRescueBattle({ victory: false });
  $("r-retry").click();
  assert(overlays() === 0 && srbCalled === 1, "rescue retry dismisses and retries");
  Game.startRescueBattle = origSRB;

  /* shop gear modal */
  S.data.coins = 500;
  Game.showShop();
  var gearBtn = null;
  document.querySelectorAll("[data-item]").forEach(function (b) {
    if (b.getAttribute("data-item") === "ring") gearBtn = b;
  });
  /* find the actual gear-effect item button */
  document.querySelectorAll("#screen-shop [data-item]").forEach(function (b) {
    var it = pack().shop.filter(function (x) { return x.id === b.getAttribute("data-item"); })[0];
    if (it && it.effect === "gear") gearBtn = b;
  });
  assert(!!gearBtn, "shop has a gear item to buy");
  gearBtn.click();
  assert(!!$("g-ok"), "gear purchase modal opens");
  $("g-ok").click();
  assert(overlays() === 0, "gear modal dismisses");
}

async function testB_battles() {
  console.log("-- (b) battle-internal overlays: tier modal, chest, rescue");
  freshSave();
  var realAsk = window.RQQuestions.ask;
  var realRecord = window.RQAdaptive.record;
  window.RQQuestions.ask = function () { return Promise.resolve({ correct: true }); };

  /* tier modal via stubbed adaptive move */
  var moveOnce = { dir: 1, tier: 5 };
  window.RQAdaptive.record = function () {
    var m = moveOnce; moveOnce = null; return m;
  };
  var done1 = false;
  window.RQBattles.start({ heroId: "knight",
    monster: { id: "t1", name: "Testmon", icon: "👾", hp: 100, power: 1, xp: 10, coins: [1, 2] },
    nodeId: "w1n1", worldId: "whisperwood", onDone: function () { done1 = true; } });
  await sleep(50);
  var spellBtns = document.querySelectorAll("#b-spells .rq-spell").filter(function (b) { return !b.disabled; });
  assert(spellBtns.length > 0, "battle renders clickable spell buttons");
  spellBtns[0].click();
  await sleep(150);
  var tierOv = document.querySelector(".rq-overlay");
  assert(!!tierOv && !!$("rq-tier-ok"), "tier modal appears after adaptive move");
  tierOv.click({ target: tierOv });
  assert(document.querySelectorAll(".rq-overlay").length === 0,
    "tier modal dismisses via tap-outside");
  await sleep(2600);
  var back = document.querySelectorAll("#b-spells .rq-spell").filter(function (b) { return !b.disabled; });
  assert(back.length > 0, "battle continues after tier modal dismiss");
  window.RQAdaptive.record = realRecord;

  /* chest on victory */
  var result = null;
  window.RQBattles.start({ heroId: "knight",
    monster: { id: "t2", name: "Tiny", icon: "🐭", hp: 1, power: 0, xp: 10, coins: [5, 5] },
    nodeId: "w1n1", worldId: "whisperwood",
    onDone: function (r) { result = r; } });
  await sleep(50);
  document.querySelectorAll("#b-spells .rq-spell").filter(function (b) { return !b.disabled; })[0].click();
  await sleep(1700);
  assert(!!$("rq-chestopen"), "treasure chest modal appears on victory");
  $("rq-chestopen").click();
  await sleep(100);
  assert($("rq-chestrewards").style.display === "block", "chest reveals rewards");
  $("rq-chestopen").click();
  await sleep(100);
  assert(document.querySelectorAll(".rq-overlay").length === 0, "chest dismisses");
  assert(!!result && result.victory === true, "victory onDone fires after chest");

  /* rescue sequence */
  var rescued = null;
  window.RQAdaptive.record = function () { return null; }; /* no tier popups mid-rescue */
  var realRandom = Math.random;
  Math.random = function () { return 0.5; }; /* fixed 6-dmg casts: 20 -> 14 -> 8 -> 2, badge, no kill */
  window.RQBattles.start({ heroId: "knight",
    monster: { id: "t3", name: "Rescuable", icon: "🦔", hp: 20, power: 0, xp: 10,
               coins: [1, 2], rescuable: true, rarity: "Common",
               petStats: { power: 1, hearts: 5, magic: 5, speed: 5 } },
    nodeId: "w1n1", worldId: "whisperwood",
    onDone: function (r) { rescued = r; } });
  await sleep(50);
  var badge = null;
  for (var i = 0; i < 8 && !badge; i++) {
    var sb = document.querySelectorAll("#b-spells .rq-spell").filter(function (b) { return !b.disabled; })[0];
    if (sb) sb.click();
    await sleep(2600);
    badge = document.querySelector(".rq-rescuebadge");
  }
  assert(!!badge, "RESCUE badge appears below 30% HP");
  badge.click();
  await sleep(50);
  assert(!!$("rq-free"), "rescue modal offers Free");
  $("rq-free").click();
  await sleep(1900);
  assert(!!$("rq-claim"), "rescue claim step appears");
  $("rq-claim").click();
  await sleep(100);
  assert(document.querySelectorAll(".rq-overlay").length === 0, "rescue modal dismisses");
  await sleep(1600);
  assert(!!rescued && rescued.rescued === true, "rescue victory onDone fires");

  window.RQQuestions.ask = realAsk;
  window.RQAdaptive.record = realRecord;
  Math.random = realRandom;
}

async function testC_stage() {
  console.log("-- (c) stage intro: machine, dialogue, full-screen play, skip flag");
  freshSave();
  var ST = window.RQStage;
  assert(!!ST && typeof ST.createMachine === "function" &&
         typeof ST.play === "function",
    "RQStage exposes createMachine + play");

  /* script shape: 3 scenes, snappy but complete */
  var script = ST.script();
  assert(script.length === 3, "stage script has 3 scenes (got " + script.length + ")");
  assert(script[0].title === "Night at the Tower", "scene 1 sets the scene");
  assert(script[1].title === "The Unreader Strikes",
    "scene 2 is the villain confrontation");
  assert(script[2].title === "The Quest", "scene 3 is the quest call");
  assert(ST.totalBeats() >= 12 && ST.totalBeats() <= 24,
    "snappy but compelling: " + ST.totalBeats() + " beats");

  /* the machine starts at the beginning */
  var m = ST.createMachine();
  var cur = m.current();
  assert(cur && cur.scene === 0 && cur.beat === 0 && m.done === false,
    "machine starts at scene 0 beat 0, not done");

  /* drive scene 1: curtains open, Inkwell moves on stage and talks */
  var sawInkwell = false, sawCurtains = false, sawMove = false;
  for (var i = 0; i < script[0].beats.length; i++) {
    var c = m.current();
    if (c.beatDef.speaker === "Inkwell") sawInkwell = true;
    if (c.beatDef.fx === "curtains-open") sawCurtains = true;
    if (c.beatDef.stage && c.beatDef.stage.inkwell &&
        c.beatDef.stage.inkwell !== "off-l") sawMove = true;
    m.next();
  }
  assert(sawCurtains, "scene 1: curtains-open trigger fires");
  assert(sawInkwell, "scene 1: Inkwell talks");
  assert(sawMove, "scene 1: Inkwell moves on stage");
  cur = m.current();
  assert(cur.scene === 1 && cur.beat === 0,
    "scene trigger: finishing scene 1 enters scene 2");

  /* drive scene 2: the Unreader enters, confrontation, page-tearing */
  var sawUnreader = false, sawTear = false, sawScatter = false, sawExit = false;
  for (var j = 0; j < script[1].beats.length; j++) {
    var c2 = m.current();
    if (c2.beatDef.speaker === "THE UNREADER") sawUnreader = true;
    if (c2.beatDef.fx === "tear") sawTear = true;
    if (c2.beatDef.fx === "scatter") sawScatter = true;
    if (c2.beatDef.stage && c2.beatDef.stage.unreader === "off-r") sawExit = true;
    m.next();
  }
  assert(sawUnreader, "scene 2: THE UNREADER talks");
  assert(sawTear, "scene 2: page-tearing moment exists");
  assert(sawScatter, "scene 2: torn pages scatter");
  assert(sawExit, "scene 2: THE UNREADER exits the stage");
  assert(m.current().scene === 2, "scene trigger: finishing scene 2 enters scene 3");

  /* scene 3: the quest call */
  var questLine = script[2].beats.map(function (b) { return b.line || ""; }).join(" ");
  assert(questLine.indexOf("RECLAIM THE KEYSTONE PAGES") !== -1,
    "scene 3: the quest call names the Keystone Pages");

  /* drive to the end of the play */
  while (!m.done) m.next();
  assert(m.done === true && m.current() === null,
    "machine is done after the last beat");
  assert(m.next().done === true, "next() past the end stays done");

  /* skip() short-circuits mid-play */
  var m2 = ST.createMachine();
  m2.next(); m2.next();
  m2.skip();
  assert(m2.done === true, "skip() marks the machine done");

  /* play(): full-screen overlay; first viewing has NO skip button */
  freshSave();
  var done1 = 0;
  ST.play(function () { done1++; });
  assert(!!$("rq-stagefull"), "play() builds the full-screen stage overlay");
  ["rq-sf-curtain-l", "rq-sf-curtain-r", "rq-sf-valance", "rq-sf-spotlight",
   "rq-sf-floor", "rq-sf-moon", "rq-sf-tower", "rq-sf-book",
   "rq-sf-inkwell", "rq-sf-unreader"].forEach(function (cls) {
    assert(!!document.querySelector("#rq-stagefull ." + cls),
      "stage has " + cls);
  });
  assert(!$("rq-sf-skip"), "first viewing: no Skip button");
  assert(document.querySelector("#rq-stagefull .rq-sf-line").textContent.length > 0,
    "dialogue line renders on the first beat");

  /* click Next through every beat of the play */
  var beats = ST.totalBeats();
  for (var k = 0; k < beats; k++) {
    var nb = document.querySelector("#rq-stagefull .rq-sf-next");
    assert(!!nb, "Next button present on beat " + k);
    var line = document.querySelector("#rq-stagefull .rq-sf-line").textContent;
    nb.click();
    if (k < beats - 1) {
      var line2 = document.querySelector("#rq-stagefull .rq-sf-line").textContent;
      assert(line2 !== line, "dialogue advances on beat " + k);
    }
  }
  await sleep(900); /* curtains sweep shut, then the stage is struck */
  assert(done1 === 1, "full playthrough calls onDone exactly once");
  assert(!$("rq-stagefull"), "stage overlay removed after the play");
  assert(S.data.stageIntroSeen === true, "skip flag saved in save state");
  assert(S.data.guideMet === true, "guide marked met after the intro");
  assert(S.data.quests.main && S.data.quests.main.revealed === true,
    "main quest revealed by the intro");

  /* replay: a visible Skip button dismisses the play */
  freshSave();
  S.data.stageIntroSeen = true;
  S.write();
  var done2 = 0;
  ST.play(function () { done2++; });
  assert(!!$("rq-sf-skip"), "replay: visible Skip button");
  $("rq-sf-skip").click();
  await sleep(900);
  assert(done2 === 1, "skip calls onDone exactly once");
  assert(!$("rq-stagefull"), "stage overlay removed after skip");
  assert(S.data.stageIntroSeen === true, "skip keeps the flag set");
}

async function testD_tts() {
  console.log("-- (d) TTS voice ranking + spell()");
  var spoken = [];
  function setVoices(list) {
    window.speechSynthesis = {
      _v: list,
      getVoices: function () { return this._v; },
      speak: function (u) { spoken.push(u); if (u.onend) u.onend(); },
      cancel: function () {},
      onvoiceschanged: null
    };
    window.RQAudio.Speech._triedLoad = false;
    window.RQAudio.Speech._voice = null;
  }

  setVoices([
    { name: "Microsoft David - English (United States)", lang: "en-US" },
    { name: "Google US English", lang: "en-US" },
    { name: "Samantha", lang: "en-US" }
  ]);
  assert(window.RQAudio.Speech.voiceName() === "Google US English",
    "prefers Google US English (got " + window.RQAudio.Speech.voiceName() + ")");

  setVoices([{ name: "Google UK English Female", lang: "en-GB" }]);
  assert(/UK English/i.test(window.RQAudio.Speech.voiceName()),
    "falls to Google UK English when no US voice");

  setVoices([{ name: "Microsoft Aria Online (Natural) - English (United States)", lang: "en-US" }]);
  assert(/Aria/i.test(window.RQAudio.Speech.voiceName()),
    "picks Microsoft natural voice Aria");

  setVoices([{ name: "Samantha", lang: "en-US" }]);
  assert(window.RQAudio.Speech.voiceName() === "Samantha", "picks Apple voice Samantha");

  setVoices([{ name: "Some Voice", lang: "en-US" }]);
  assert(window.RQAudio.Speech.voiceName() === "Some Voice", "falls back to any en-US voice");

  setVoices([{ name: "Deutsch", lang: "de-DE" }]);
  assert(window.RQAudio.Speech.voiceName() === "Deutsch",
    "falls back to first available voice when no English voice");

  setVoices([]);
  assert(window.RQAudio.Speech.voice() === null, "empty voice list -> null voice");
  var threw = false;
  try { window.RQAudio.Speech.say("hello"); window.RQAudio.Speech.spell("cat"); }
  catch (e) { threw = true; }
  assert(!threw, "say/spell do not throw with no voices");

  /* graceful when speechSynthesis is missing entirely */
  delete window.speechSynthesis;
  window.RQAudio.Speech._triedLoad = false;
  window.RQAudio.Speech._voice = null;
  threw = false;
  try { window.RQAudio.Speech.say("hello"); window.RQAudio.Speech.spell("cat"); }
  catch (e) { threw = true; }
  assert(!threw, "say/spell do not throw without speechSynthesis");

  /* rate/pitch + letter-by-letter spelling */
  setVoices([{ name: "Google US English", lang: "en-US" }]);
  spoken = [];
  window.RQAudio.Speech.say("hello");
  assert(spoken.length === 1 && spoken[0].rate === 0.95 && spoken[0].pitch === 1.0,
    "say uses rate 0.95, pitch 1.0");
  assert(spoken[0].voice && spoken[0].voice.name === "Google US English",
    "say uses the picked voice");
  spoken = [];
  window.RQAudio.Speech.spell("cat");
  await sleep(1500);
  var letters = spoken.map(function (u) { return u.text; });
  assert(letters.join(",") === "C,A,T",
    "spell() reads letter by letter with pauses (got " + letters.join(",") + ")");
  assert(spoken.every(function (u) { return u.rate === 0.8; }),
    "spell() uses a slower rate per letter");
}

function testE_emdashes() {
  console.log("-- (e) em-dash scan of changed files");
  var files = ["engine/audio.js", "engine/save.js", "engine/adaptive.js",
    "engine/questions.js", "engine/battle.js", "engine/stage.js",
    "engine/onboarding.js",
    "engine/overworld.js", "engine/game.js", "content/reading-pack.js",
    "css/style.css", "index.html"];
  files.forEach(function (f) {
    var src = fs.readFileSync(path.join(ROOT, f), "utf8");
    var bad = src.indexOf("–") !== -1 || src.indexOf("—") !== -1;
    assert(!bad, "no em dashes in " + f);
  });
}

async function testF_overworld() {
  console.log("-- (f) overworld maze: layout, movement, walls, battle on contact");
  freshSave();
  var battles = [];
  OW._onBattle = function (wid, node, mon, hid) {
    battles.push({ wid: wid, node: node, mon: mon, hid: hid });
  };

  assert(OW.open("nope") === false, "unknown world refuses to open");
  assert(OW.open("murkfen") === false, "locked world stays locked");
  assert(OW.open("whisperwood") === true, "unlocked world opens");
  assert(OW.isOpen(), "overworld reports open");
  assert(!!$("rq-owmap"), "map element built");
  assert(!!document.querySelector(".rq-owgrid"), "maze grid built");
  assert(!!document.querySelector(".rq-ow-wall"), "maze has wall tiles");
  assert(!!document.querySelector(".rq-ow-exit"), "maze destination marked with a page");
  assert(!!document.querySelector(".rq-joy"), "on-screen joystick built");
  assert(!!document.querySelector(".rq-ow-wizard"), "wizard sprite built");
  assert(OW._monsters.length >= 3, "wandering monsters spawn (got " + OW._monsters.length + ")");
  assert(OW._monsters.some(function (m) { return m.isBoss; }),
    "world boss waits at the maze destination");
  assert(OW._monsters.every(function (m) { return !!m.def.icon && !!m.node && !!m.def.hp; }),
    "every monster has a def, node, and battle stats");
  /* wizard starts on the open entrance tile, boss on an open far tile */
  var mz = OW._maze;
  assert(!mz.grid[mz.spawn.ty][mz.spawn.tx], "wizard spawns on an open tile");
  assert(!mz.grid[mz.boss.ty][mz.boss.tx], "boss tile is open");
  assert(OW._wizard.x === mz.spawn.tx + 0.5 && OW._wizard.y === mz.spawn.ty + 0.5,
    "wizard starts at the maze entrance");

  /* keyboard movement along an open corridor */
  var wx = OW._wizard.x, wy = OW._wizard.y;
  var dirs = [
    { key: "ArrowRight", dx: 1, dy: 0 },
    { key: "ArrowLeft", dx: -1, dy: 0 },
    { key: "ArrowDown", dx: 0, dy: 1 },
    { key: "ArrowUp", dx: 0, dy: -1 }
  ];
  var moved = false;
  for (var d = 0; d < dirs.length && !moved; d++) {
    var dd = dirs[d];
    if (!OW._solidAt(wx + dd.dx, wy + dd.dy)) {
      window.dispatchEvent({ type: "keydown", key: dd.key, preventDefault: function () {} });
      OW._tick();
      window.dispatchEvent({ type: "keyup", key: dd.key, preventDefault: function () {} });
      moved = (OW._wizard.x !== wx || OW._wizard.y !== wy);
    }
  }
  assert(moved, "wizard moves with the keyboard along an open corridor");

  /* monsters roam the corridors on their own */
  var m0 = OW._monsters[0];
  var mx0 = m0.x, my0 = m0.y;
  for (var i = 0; i < 40; i++) OW._tick();
  assert(m0.x !== mx0 || m0.y !== my0, "monsters roam with wall-aware random-walk AI");
  assert(!OW._solidAt(m0.x, m0.y), "roaming monsters never end up inside walls");

  /* park monsters far away so the wall test cannot bump into one */
  OW._monsters.forEach(function (mm) { mm.x = -50; mm.y = -50; });

  /* walls block: pushing into a wall never leaves the wizard inside one */
  var walled = false;
  for (var d2 = 0; d2 < dirs.length && !walled; d2++) {
    var ddd = dirs[d2];
    if (OW._solidAt(OW._wizard.x + ddd.dx, OW._wizard.y + ddd.dy)) {
      window.dispatchEvent({ type: "keydown", key: ddd.key, preventDefault: function () {} });
      for (var t = 0; t < 20; t++) OW._tick();
      window.dispatchEvent({ type: "keyup", key: ddd.key, preventDefault: function () {} });
      walled = !OW._solidAt(OW._wizard.x, OW._wizard.y);
    }
  }
  assert(walled, "walls block the wizard (center never ends inside a wall)");

  /* contact triggers a battle through the launcher */
  m0.x = OW._wizard.x; m0.y = OW._wizard.y;
  OW._tick();
  assert(battles.length === 1, "touching a monster triggers a battle");
  assert(battles[0].wid === "whisperwood", "battle routed with world id");
  assert(battles[0].mon.id === m0.def.id, "battle routed with monster def");
  assert(battles[0].hid === "knight", "battle routed with active hero");
  assert(typeof Game._afterBattleReturn === "function",
    "overworld battle sets a return-to-overworld hook");
  assert(!OW.isOpen(), "overworld closes while battling");

  /* boss uses the real boss node so progression/unlocks keep working */
  freshSave();
  battles = [];
  OW._onBattle = function (wid, node, mon, hid) {
    battles.push({ wid: wid, node: node, mon: mon, hid: hid });
  };
  OW.open("whisperwood");
  var boss = null;
  OW._monsters.forEach(function (m) { if (m.isBoss) boss = m; });
  assert(!!boss, "boss present in the maze");
  boss.x = OW._wizard.x; boss.y = OW._wizard.y;
  OW._tick();
  assert(battles.length === 1 && battles[0].mon.boss === true,
    "boss contact triggers a boss battle");
  assert(battles[0].node.id === "w1n5",
    "boss battle uses the real boss node id (got " + battles[0].node.id + ")");

  OW._onBattle = null;
  OW.close();
  assert(!OW.isOpen(), "close() shuts the overworld down");

  /* map screen Explore button wires into the overworld */
  Game.showMap(0, false);
  assert(!!$("w-explore"), "map screen has an Explore button");
  $("w-explore").click();
  assert(OW.isOpen(), "map Explore button opens the overworld");
  OW.close();
}

async function testG_maze() {
  console.log("-- (g) maze: solvable for every world, difficulty ramps");
  freshSave();
  var worlds = pack().worlds;
  assert(worlds.length === 3, "3 Keystone Pages worlds");
  assert(worlds[0].id === "whisperwood" && worlds[1].id === "murkfen" &&
         worlds[2].id === "gloomhollow",
    "world order: Whisperwood, Murkfen Marsh, Gloomhollow");
  var lens = [], deads = [], sizes = [];
  for (var wi = 0; wi < worlds.length; wi++) {
    var mz = OW.mazeFor(wi);
    var grid = mz.grid, rows = grid.length, cols = grid[0].length;
    /* BFS reachability from the entrance to the boss destination */
    var d = mz.dist[mz.boss.ty][mz.boss.tx];
    assert(d > 0, worlds[wi].id + ": boss reachable from spawn (BFS distance " + d + ")");
    assert(d === mz.optimalLen, worlds[wi].id + ": optimalLen matches BFS");
    /* a perfect maze is fully connected: every open tile reachable */
    var open = 0, reached = 0;
    for (var y = 0; y < rows; y++) {
      for (var x = 0; x < cols; x++) {
        if (!grid[y][x]) { open++; if (mz.dist[y][x] !== -1) reached++; }
      }
    }
    assert(open === reached,
      worlds[wi].id + ": every open tile reachable (" + reached + "/" + open + ")");
    assert(!grid[mz.spawn.ty][mz.spawn.tx], worlds[wi].id + ": spawn is open");
    assert(!grid[mz.boss.ty][mz.boss.tx], worlds[wi].id + ": boss tile is open");
    lens.push(d); deads.push(mz.deadEnds); sizes.push(cols * rows);
  }
  assert(lens[0] < lens[1] && lens[1] < lens[2],
    "optimal path ramps with world index: " + lens.join(" < ") + " tiles");
  assert(lens[0] <= 10,
    "world 1 trivially easy with an almost-direct path (" + lens[0] + " tiles)");
  assert(deads[0] < deads[2] && deads[0] <= deads[1] && deads[1] <= deads[2],
    "dead ends grow with world index: " + deads.join(", "));
  assert(sizes[0] < sizes[1] && sizes[1] < sizes[2],
    "maze size grows with world index: " + sizes.join(" < ") + " tiles");
}

async function testH_familiars() {
  console.log("-- (h) familiars screen: every button works, no JS errors (Item 2)");
  freshSave();
  S.data.onboardingDone = true;
  S.data.grade = 2;
  var nova = S.addPet({ defId: "nova", name: "Nova the Starwhal", icon: "🐋",
    rarity: "Rare", stats: { power: 3, hearts: 10, magic: 12, speed: 6 },
    evolved: false, rescued: true });
  var bristle = S.addPet({ defId: "bristleback", name: "Bristleback", icon: "🦔",
    rarity: "Common", stats: { power: 2, hearts: 8, magic: 10, speed: 6 },
    evolved: false, rescued: true });
  S.setActiveFamiliar("knight", nova.uid);

  function clicks(elm) {
    return (elm && elm._listeners && elm._listeners.click) ? elm._listeners.click.length : 0;
  }
  function topBtn(screenId, btnId) {
    return $(screenId).querySelector("#" + btnId);
  }

  /* hub first, then familiars: this exact order left the Familiars
     top bar dead before the wireHUD scoping fix. */
  var threw = null;
  try {
    Game.showHub();
    Game.showFamiliars();
  } catch (e) { threw = e; }
  assert(!threw, "showFamiliars renders with no JS errors" +
    (threw ? " (got " + threw.message + ")" : ""));
  assert($("screen-familiars").classList.contains("rq-active"),
    "familiars screen is active");
  var famScr = $("screen-familiars");

  /* rescued-familiar flow (RESCUE badge fix) keeps rendering */
  assert(famScr.querySelectorAll(".rq-rescuedstamp").length === 2,
    "both rescued familiars show the Rescued stamp");
  assert(famScr.querySelectorAll(".rq-rarity").length === 2,
    "rarity badges render on both cards");

  /* every top-bar button on THIS screen must own a working handler */
  ["hud-menu", "hud-pack", "hud-fams", "hud-quests", "hud-shop", "hud-map"].forEach(function (id) {
    var b = topBtn("screen-familiars", id);
    assert(!!b && clicks(b) > 0, "familiars top bar: " + id + " has a click handler");
  });

  /* top-bar navigation actually switches screens, no refresh */
  topBtn("screen-familiars", "hud-map").click();
  assert($("screen-map").classList.contains("rq-active"), "hud-map navigates to the map screen");
  topBtn("screen-map", "hud-shop").click();
  assert($("screen-shop").classList.contains("rq-active"), "map hud-shop navigates to the shop");
  topBtn("screen-shop", "hud-pack").click();
  assert($("screen-backpack").classList.contains("rq-active"), "shop hud-pack navigates to the backpack");
  topBtn("screen-backpack", "hud-menu").click();
  assert(overlays() === 1, "backpack hud-menu opens the menu");
  $("m-close").click();
  assert(overlays() === 0, "menu closes");
  topBtn("screen-backpack", "hud-quests").click();
  assert(overlays() === 1, "backpack hud-quests opens the goals panel");
  $("rq-gok").click();
  assert(overlays() === 0, "goals panel closes");
  topBtn("screen-backpack", "hud-fams").click();
  assert($("screen-familiars").classList.contains("rq-active"),
    "backpack hud-fams navigates back to familiars");
  famScr = $("screen-familiars");

  /* Set Active switches the active familiar and the card states update */
  assert(S.hero("knight").familiar.uid === nova.uid, "Nova starts as the active familiar");
  var setBtn = null;
  famScr.querySelectorAll("[data-active]").forEach(function (b) {
    if (b.getAttribute("data-active") === bristle.uid) setBtn = b;
  });
  assert(!!setBtn && clicks(setBtn) > 0, "inactive card offers a working Set Active button");
  setBtn.click();
  assert(S.hero("knight").familiar.uid === bristle.uid,
    "Set Active switches the active familiar");
  famScr = $("screen-familiars");
  var activeBadges = famScr.querySelectorAll(".rq-activebadge");
  assert(activeBadges.length === 1 &&
         activeBadges[0].textContent.indexOf("Fighting now!") !== -1,
    "re-render shows Fighting now! on the newly active card");
  assert(famScr.querySelectorAll(".rq-rescuedstamp").length === 2,
    "Rescued stamps survive the Set Active re-render");

  /* the other HUD screens got scoped wiring too */
  Game.showHub();
  assert(clicks(topBtn("screen-hub", "hud-fams")) > 0, "hub top bar wired");
  Game.showMap(0, false);
  assert(clicks(topBtn("screen-map", "hud-fams")) > 0, "map top bar wired");
  Game.showShop();
  assert(clicks(topBtn("screen-shop", "hud-fams")) > 0, "shop top bar wired");
  Game.showBackpack();
  assert(clicks(topBtn("screen-backpack", "hud-fams")) > 0, "backpack top bar wired");
}

async function testI_maze() {
  console.log("-- (i) maze continuity: round trip, defeated stay gone, fled stay (Item 3)");
  freshSave();
  S.data.onboardingDone = true;
  S.data.grade = 2;
  OW._onBattle = function () {}; /* stub: the battle never really runs */

  assert(OW.open("whisperwood") === true, "overworld opens");
  var mz = OW._maze;
  /* park the wizard on an open tile a few tiles from the entrance */
  var spot = null;
  for (var y = 1; y < mz.spec.rows - 1 && !spot; y++) {
    for (var x = 1; x < mz.spec.cols - 1; x++) {
      if (!mz.grid[y][x] && mz.dist[y][x] > 2) { spot = { x: x + 0.5, y: y + 0.5 }; break; }
    }
  }
  assert(!!spot, "found an open tile away from spawn");
  OW._wizard.x = spot.x; OW._wizard.y = spot.y; OW._wizard.facing = "left";

  var roam = null;
  OW._monsters.forEach(function (mm) { if (!mm.isBoss && !roam) roam = mm; });
  assert(!!roam && !!roam.uid, "roaming monster present with a uid");
  var muid = roam.uid;

  /* (1) encounter round trip: exact x/y and facing are captured */
  OW._startBattle(roam);
  assert(!OW.isOpen(), "overworld closes while battling");
  var ret = S.data.owReturn;
  assert(!!ret && ret.worldId === "whisperwood", "encounter position persisted in the save");
  assert(ret.x === spot.x && ret.y === spot.y, "saved x/y match the encounter tile exactly");
  assert(ret.facing === "left", "facing persisted across the battle");
  assert(ret.monsterUid === muid && ret.isBoss === false, "pending monster recorded, not a boss");
  assert(typeof Game._afterBattleReturn === "function", "return-to-overworld hook set");

  /* victory records the defeated roam monster per maze */
  OW.afterEncounter({ victory: true, xp: 10, coins: 5 });
  assert((S.data.owDefeated["whisperwood"] || []).indexOf(muid) !== -1,
    "defeated roam monster recorded in owDefeated");

  /* returning lands on the identical tile, facing the same way */
  Game._afterBattleReturn();
  assert(OW.isOpen(), "battle returns to the overworld");
  assert(OW._wizard.x === spot.x && OW._wizard.y === spot.y,
    "wizard returns to the exact encounter coordinates");
  assert(OW._wizard.facing === "left", "wizard keeps the same facing after the battle");
  assert(S.data.owReturn === null, "pending return consumed after the round trip");
  var stillThere = OW._monsters.some(function (mm) { return mm.uid === muid; });
  assert(!stillThere, "defeated monster is gone from the board");

  /* (2) the defeated monster stays gone across a save/load (refresh) */
  S.write();
  S.load();
  OW.open("whisperwood");
  var resurrected = OW._monsters.some(function (mm) { return mm.uid === muid; });
  assert(!resurrected, "defeated monster stays gone after save/load");

  /* (3) a fled-from monster is NOT removed */
  var roam2 = null;
  OW._monsters.forEach(function (mm) { if (!mm.isBoss && !roam2) roam2 = mm; });
  assert(!!roam2, "another roaming monster still on the board");
  var muid2 = roam2.uid;
  OW._startBattle(roam2);
  OW.afterEncounter({ victory: false, xp: 3 });
  Game._afterBattleReturn();
  var fled = OW._monsters.some(function (mm) { return mm.uid === muid2; });
  assert(fled, "fled-from monster remains on the board");
  assert((S.data.owDefeated["whisperwood"] || []).indexOf(muid2) === -1,
    "fled-from monster not recorded as defeated");

  /* roam pseudo-nodes never mark map progress (kept behavior) */
  S.markNodeBeaten("whisperwood", "ow-letterbat-0");
  assert(!S.nodeBeaten("whisperwood", "ow-letterbat-0"),
    "roam pseudo-nodes still never mark map progress");

  /* (4) boss progression intact: bosses stay out of owDefeated and the
     real node id still drives Keystone/world-unlock progression */
  var boss = null;
  OW._monsters.forEach(function (mm) { if (mm.isBoss) boss = mm; });
  assert(!!boss, "world boss waits at the maze destination");
  OW._startBattle(boss);
  assert(S.data.owReturn.isBoss === true, "boss encounter flagged as boss");
  OW.afterEncounter({ victory: true, xp: 50, coins: 20, boss: true });
  assert((S.data.owDefeated["whisperwood"] || []).indexOf(boss.uid) === -1,
    "boss never lands in owDefeated");
  S.data.bossesBeaten.push("mumblemouth"); /* what battle victory() records */
  S.markNodeBeaten("whisperwood", "w1n5");
  assert(S.zone("murkfen").unlocked === true,
    "beating the world boss still unlocks the next world");
  Game._afterBattleReturn();
  var bossGone = !OW._monsters.some(function (mm) { return mm.isBoss; });
  assert(bossGone, "beaten boss no longer waits at the destination");

  OW._onBattle = null;
  OW.close();
}

async function main() {
  try {
    await testA_familiarChoice();
    await testB_overlays();
    await testB_battles();
    await testC_stage();
    await testD_tts();
    testE_emdashes();
    await testF_overworld();
    await testG_maze();
    await testH_familiars();
    await testI_maze();
  } catch (e) {
    failed++;
    console.log("UNCAUGHT EXCEPTION: " + (e && e.stack || e));
  }
  try { Game.stopTips(); } catch (e) {}
  try { OW.close(); } catch (e) {}
  console.log("----------------------------------------");
  console.log("ASSERTIONS: " + passed + " passed, " + failed + " failed");
  process.exit(failed ? 1 : 0);
}

main();
