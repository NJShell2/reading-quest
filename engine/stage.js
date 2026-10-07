/* Reading Quest engine: full-screen theatrical story intro.
   A real stage play that fills the viewport: red velvet curtains that
   OPEN, a spotlight, a painted night-sky backdrop (moon, tower, floating
   book), and a wooden floor. Inkwell the owl guide and THE UNREADER are
   animated characters who move on stage and talk through scripted
   dialogue beats across three scenes:

     1. Night at the Tower      (set the scene)
     2. The Unreader Strikes    (villain confrontation, page-tearing)
     3. The Quest               (the quest call: Reclaim the Keystone Pages)

   The dialogue is a pure state machine (RQStage.createMachine) over
   RQStage.script(), so tests can drive scene triggers, dialogue
   progression, and skip behavior without a DOM. RQStage.play(onDone)
   renders it full-screen. The first viewing has no skip button;
   replays (save flag stageIntroSeen) get a visible Skip button.
   Completing or skipping sets stageIntroSeen, guideMet, and reveals
   the main quest, then flows into grade selection. */
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

  /* A beat is one step of the play:
       nar:      narration line (no speaker) for stage directions
       speaker:  who talks ("Inkwell" / "THE UNREADER" / null)
       icon:     speaker emoji
       line:     the spoken line
       stage:    actor placement changes { inkwell: pos, unreader: pos }
                pos: "off-l" | "left" | "center" | "right" | "off-r"
       fx:      stage effect for this beat
                "curtains-open" | "darken" | "tear" | "scatter" | "spot" | "quest"
       sfx:     name of an RQAudio.SFX sound to play
       cta:     button label override
     Actor placement persists across beats until changed. */
  var SCRIPT = [
    { id: "night", title: "Night at the Tower", beats: [
      { nar: "The curtains open on a moonlit night. The Great Book glows atop its tower.",
        fx: "curtains-open", stage: { inkwell: "off-l", unreader: "off-r" }, cta: "Watch" },
      { speaker: "Inkwell", icon: "🦉", stage: { inkwell: "left" },
        line: "Hoo! Welcome, young wizard. I am Inkwell, keeper of the Great Book." },
      { speaker: "Inkwell", icon: "🦉", stage: { inkwell: "center" },
        line: "This book holds every story ever told. Six heroes train here, each a master of one reading power." },
      { speaker: "Inkwell", icon: "🦉", stage: { inkwell: "right" },
        line: "But tonight the wind smells of torn paper. Something wicked is coming. Stay close to me." }
    ] },
    { id: "unreader", title: "The Unreader Strikes", beats: [
      { nar: "The sky darkens. A cold wind howls through the trees.", fx: "darken" },
      { speaker: "THE UNREADER", icon: "🌑", stage: { unreader: "right" },
        line: "I am THE UNREADER! Words are noise! Stories are clutter!", sfx: "boss" },
      { speaker: "THE UNREADER", icon: "🌑", stage: { unreader: "center" },
        line: "I will erase every word in this world, starting with the Great Book!" },
      { speaker: "Inkwell", icon: "🦉", stage: { inkwell: "left" },
        line: "No! Those pages belong to every reader! You shall not touch them!" },
      { speaker: "THE UNREADER", icon: "🌑",
        line: "Then watch me TEAR them out!", fx: "tear", sfx: "hit" },
      { nar: "The Keystone Pages scatter to the far corners of the land!", fx: "scatter" },
      { speaker: "THE UNREADER", icon: "🌑", stage: { unreader: "off-r" },
        line: "Three pages! Three bosses shall guard them! None shall read again! Ha ha ha!" },
      { speaker: "Inkwell", icon: "🦉", stage: { inkwell: "center" },
        line: "The pages are gone... scattered across Whisperwood, Murkfen Marsh, and Gloomhollow." }
    ] },
    { id: "quest", title: "The Quest", beats: [
      { speaker: "Inkwell", icon: "🦉", fx: "spot",
        line: "But all is not lost. A hero has come. YOU." },
      { speaker: "Inkwell", icon: "🦉",
        line: "Battle the monsters. Free the pages. Grow stronger with every word you read." },
      { speaker: "Inkwell", icon: "🦉", fx: "quest",
        line: "Your quest: RECLAIM THE KEYSTONE PAGES. Three pages. Three bosses. One hero." },
      { speaker: "Inkwell", icon: "🦉",
        line: "Answer to cast. Read to win! Now... let your training begin!", cta: "Begin!" }
    ] }
  ];

  function totalBeats() {
    return SCRIPT.reduce(function (n, sc) { return n + sc.beats.length; }, 0);
  }

  /* ---------- the testable state machine ---------- */
  function createMachine() {
    var m = { scene: 0, beat: 0, done: false };
    m.current = function () {
      if (m.done) return null;
      var sc = SCRIPT[m.scene];
      return { scene: m.scene, beat: m.beat,
               sceneDef: sc, beatDef: sc.beats[m.beat],
               sceneCount: SCRIPT.length, beatCount: sc.beats.length };
    };
    /* Advance one beat. Returns { done, scene, beat }. */
    m.next = function () {
      if (m.done) return { done: true, scene: m.scene, beat: m.beat };
      var sc = SCRIPT[m.scene];
      if (m.beat + 1 < sc.beats.length) { m.beat++; }
      else if (m.scene + 1 < SCRIPT.length) { m.scene++; m.beat = 0; }
      else { m.done = true; }
      return { done: m.done, scene: m.scene, beat: m.beat };
    };
    m.skip = function () {
      m.done = true;
      return { done: true, scene: m.scene, beat: m.beat };
    };
    return m;
  }

  /* ---------- full-screen rendering ---------- */
  var POS_CLS = {
    "off-l": "rq-sf-off-l", "left": "rq-sf-left", "center": "rq-sf-center",
    "right": "rq-sf-right", "off-r": "rq-sf-off-r"
  };

  function play(onDone) {
    var S = window.RQSave, A = window.RQAudio;
    var machine = createMachine();
    var pos = { inkwell: "off-l", unreader: "off-r" };
    var finished = false;
    /* Tracked timers: finish() clears them all so no effect can fire
       after the stage is struck. */
    var timers = [];
    function later(ms, fn) {
      var id = setTimeout(function () {
        var ix = timers.indexOf(id);
        if (ix !== -1) timers.splice(ix, 1);
        fn();
      }, ms);
      timers.push(id);
      return id;
    }
    function clearTimers() {
      timers.forEach(function (id) { clearTimeout(id); });
      timers = [];
    }

    var root = el("div", "rq-stagefull");
    root.setAttribute("id", "rq-stagefull");
    root.innerHTML =
      '<div class="rq-sf-sky"><span class="rq-sf-stars">✨ ⭐ ✨ ⭐ ✨ ⭐ ✨</span>' +
      '<span class="rq-sf-moon">🌕</span></div>' +
      '<div class="rq-sf-tower">🏰</div>' +
      '<div class="rq-sf-book">📖</div>' +
      '<div class="rq-sf-spotlight"></div>' +
      '<div class="rq-sf-floor"></div>' +
      '<div class="rq-sf-actor rq-sf-inkwell rq-sf-off-l">🦉</div>' +
      '<div class="rq-sf-actor rq-sf-unreader rq-sf-off-r">🌑</div>' +
      '<div class="rq-sf-fx"></div>' +
      '<div class="rq-sf-titlecard"></div>' +
      '<div class="rq-sf-dialog">' +
        '<div class="rq-sf-speaker"></div>' +
        '<div class="rq-sf-line"></div>' +
        '<button class="rq-sf-next rq-bigbtn">Next ➜</button>' +
      '</div>' +
      '<div class="rq-sf-valance"></div>' +
      '<div class="rq-sf-curtain rq-sf-curtain-l"></div>' +
      '<div class="rq-sf-curtain rq-sf-curtain-r"></div>';
    /* Replays get a visible Skip button; the first viewing plays through. */
    if (S.data.stageIntroSeen) {
      var skip = el("button", "rq-sf-skip rq-ghostbtn", "Skip intro ➜");
      skip.setAttribute("id", "rq-sf-skip");
      skip.addEventListener("click", function () { finish(true); });
      root.appendChild(skip);
    }
    document.body.appendChild(root);

    var inkEl = root.querySelector(".rq-sf-inkwell");
    var unrEl = root.querySelector(".rq-sf-unreader");
    var fxBox = root.querySelector(".rq-sf-fx");
    var titleCard = root.querySelector(".rq-sf-titlecard");
    var speakerEl = root.querySelector(".rq-sf-speaker");
    var lineEl = root.querySelector(".rq-sf-line");
    var nextBtn = root.querySelector(".rq-sf-next");

    function setPos(elm, p) {
      Object.keys(POS_CLS).forEach(function (k) { elm.classList.remove(POS_CLS[k]); });
      elm.classList.add(POS_CLS[p]);
    }

    function applyFx(fx) {
      if (fx === "darken") root.classList.add("rq-sf-dark");
      if (fx === "spot") root.classList.add("rq-sf-spot-inkwell");
      if (fx === "tear") {
        var tear = el("div", "rq-sf-tear", "📖");
        fxBox.appendChild(tear);
        later(700, function () {
          tear.textContent = "💥";
          try { A.SFX.hit(); } catch (e) {}
        });
        later(1600, function () { if (tear.parentNode) tear.parentNode.removeChild(tear); });
      }
      if (fx === "scatter") {
        ["📄", "📄", "📄"].forEach(function (pg, i) {
          var p = el("div", "rq-sf-page rq-sf-scatter" + (i + 1), pg);
          fxBox.appendChild(p);
        });
        later(2600, function () {
          /* Remove children one by one (not innerHTML="") so every
             removed node detaches cleanly. */
          while (fxBox.children.length) fxBox.removeChild(fxBox.children[0]);
        });
      }
      if (fx === "quest") {
        var q = el("div", "rq-sf-questbanner",
          "📜 RECLAIM THE KEYSTONE PAGES<br><span>(0 of 3)</span>");
        fxBox.appendChild(q);
        later(3200, function () { if (q.parentNode === fxBox) fxBox.removeChild(q); });
      }
    }

    function showTitleCard(title) {
      titleCard.textContent = title;
      titleCard.classList.add("rq-sf-show");
      later(1500, function () { titleCard.classList.remove("rq-sf-show"); });
    }

    function renderBeat() {
      var cur = machine.current();
      if (!cur) return;
      var b = cur.beatDef;
      if (cur.beat === 0) showTitleCard(cur.sceneDef.title);
      if (b.stage) {
        if (b.stage.inkwell) { pos.inkwell = b.stage.inkwell; setPos(inkEl, pos.inkwell); }
        if (b.stage.unreader) { pos.unreader = b.stage.unreader; setPos(unrEl, pos.unreader); }
      }
      if (b.fx === "curtains-open") {
        /* Let the closed curtains paint first, then sweep them open. */
        later(120, function () { root.classList.add("rq-sf-open"); });
      } else if (b.fx) {
        applyFx(b.fx);
      }
      if (b.sfx && A.SFX[b.sfx]) { try { A.SFX[b.sfx](); } catch (e) {} }
      var text = b.line || b.nar || "";
      if (b.speaker) {
        speakerEl.textContent = (b.icon ? b.icon + " " : "") + b.speaker;
        /* add/remove instead of toggle(force): the test DOM shim
           ignores toggle's second argument. */
        if (b.speaker === "THE UNREADER") speakerEl.classList.add("rq-sf-villain");
        else speakerEl.classList.remove("rq-sf-villain");
      } else {
        speakerEl.textContent = "";
        speakerEl.classList.remove("rq-sf-villain");
      }
      lineEl.textContent = text;
      var isLast = (cur.scene === SCRIPT.length - 1) &&
                   (cur.beat === cur.beatCount - 1);
      nextBtn.textContent = b.cta ? (b.cta + " ➜") : (isLast ? "Begin! ➜" : "Next ➜");
      /* Inkwell and the Unreader TALK: ranked TTS voices read each line. */
      if (text) {
        try {
          A.Speech.stop();
          A.Speech.say(text, b.speaker === "THE UNREADER"
            ? { rate: 0.85, pitch: 0.7 } : { rate: 0.95, pitch: 1.1 });
        } catch (e) {}
      }
    }

    function finish(skipped) {
      if (finished) return;
      finished = true;
      machine.skip();
      try { A.Speech.stop(); } catch (e) {}
      try {
        S.data.stageIntroSeen = true;
        S.data.guideMet = true;
        if (!S.data.quests) S.data.quests = {};
        S.data.quests.main = { id: "keystone", title: "Reclaim the Keystone Pages", revealed: true };
        S.write();
      } catch (e) {}
      /* Curtains sweep shut, then the stage is struck. Pending
         effects are cancelled first so nothing fires afterwards. */
      clearTimers();
      root.classList.remove("rq-sf-open");
      setTimeout(function () {
        if (root.parentNode) root.parentNode.removeChild(root);
        if (onDone) onDone();
      }, 700);
    }

    nextBtn.addEventListener("click", function () {
      try { A.ensure(); A.SFX.click(); } catch (e) {}
      var r = machine.next();
      if (r.done) finish(false);
      else renderBeat();
    });

    renderBeat();
  }

  window.RQStage = {
    script: function () { return SCRIPT; },
    totalBeats: totalBeats,
    createMachine: createMachine,
    play: play
  };
})();
