/* Reading Quest engine: audio (Web Audio SFX + speech synthesis). No audio files needed. */
(function () {
  "use strict";
  var ctx = null;

  function ensure() {
    if (!ctx) {
      try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { ctx = null; }
    }
    if (ctx && ctx.state === "suspended") { ctx.resume(); }
    return ctx;
  }

  function tone(freq, t0, dur, type, vol) {
    var c = ensure(); if (!c) return;
    var o = c.createOscillator(), g = c.createGain();
    o.type = type || "sine"; o.frequency.value = freq;
    var t = c.currentTime + (t0 || 0);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol || 0.18, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(c.destination);
    o.start(t); o.stop(t + dur + 0.05);
  }

  var SFX = {
    click: function () { tone(660, 0, 0.08, "triangle", 0.12); },
    correct: function () { tone(523, 0, 0.12, "sine", 0.2); tone(659, 0.09, 0.12, "sine", 0.2); tone(784, 0.18, 0.2, "sine", 0.2); },
    wrong: function () { tone(220, 0, 0.2, "sawtooth", 0.08); tone(175, 0.12, 0.25, "sawtooth", 0.08); },
    hit: function () { tone(180, 0, 0.15, "square", 0.12); tone(90, 0.05, 0.2, "square", 0.1); },
    enemyHit: function () { tone(300, 0, 0.12, "sawtooth", 0.1); },
    levelup: function () {
      var n = [523, 659, 784, 1046, 784, 1046];
      n.forEach(function (f, i) { tone(f, i * 0.11, 0.22, "triangle", 0.2); });
    },
    chest: function () { tone(392, 0, 0.15, "triangle", 0.18); tone(587, 0.12, 0.15, "triangle", 0.18); tone(880, 0.24, 0.3, "triangle", 0.2); },
    coin: function () { tone(988, 0, 0.08, "square", 0.08); tone(1319, 0.07, 0.15, "square", 0.08); },
    heal: function () { tone(440, 0, 0.2, "sine", 0.15); tone(554, 0.15, 0.25, "sine", 0.15); },
    boss: function () { tone(110, 0, 0.4, "sawtooth", 0.15); tone(82, 0.3, 0.5, "sawtooth", 0.15); },
    victory: function () {
      var n = [523, 523, 659, 784, 1046];
      n.forEach(function (f, i) { tone(f, i * 0.13, 0.25, "triangle", 0.2); });
    },
    streak: function () { tone(784, 0, 0.1, "sine", 0.18); tone(1046, 0.08, 0.18, "sine", 0.18); },
    unlock: function () {
      var n = [392, 523, 659, 784, 1046, 1319];
      n.forEach(function (f, i) { tone(f, i * 0.1, 0.25, "sawtooth", 0.12); });
    }
  };

  /* ---------- speech: smart voice picking + letter-by-letter spelling ----------
     Voice ranking: Google US English, then Google UK English, then
     Microsoft natural voices (Aria, Guy, Zira, David), then Apple
     voices (Samantha), then any en-US voice, then any English voice,
     then whatever the platform offers. Silent no-op when speech
     synthesis is unavailable. */
  var Speech = {
    _voice: null,
    _triedLoad: false,
    _spellGen: 0,

    _pick: function (voices) {
      function byName(re) {
        for (var i = 0; i < voices.length; i++) {
          if (re.test(voices[i].name || "")) return voices[i];
        }
        return null;
      }
      function byLang(re) {
        for (var j = 0; j < voices.length; j++) {
          if (re.test(voices[j].lang || "")) return voices[j];
        }
        return null;
      }
      return byName(/google us english/i) ||
             byName(/google uk english/i) ||
             byName(/microsoft[^,]*\b(aria|guy|zira|david)\b/i) ||
             byName(/\baria\b|\bguy\b|\bzira\b|\bdavid\b/i) ||
             byName(/samantha/i) ||
             byLang(/^en-US/i) ||
             byLang(/^en/i) ||
             voices[0] || null;
    },

    _loadVoices: function () {
      try {
        if (!("speechSynthesis" in window)) return;
        var vs = window.speechSynthesis.getVoices() || [];
        if (vs.length) {
          this._voice = this._pick(vs);
          this._triedLoad = true;
        }
      } catch (e) { /* keep silent */ }
    },

    /* The chosen voice object (or null). Handy for tests and settings. */
    voice: function () {
      if (!this._triedLoad) this._loadVoices();
      return this._voice;
    },
    voiceName: function () {
      var v = this.voice();
      return v ? (v.name || "") : "";
    },

    _utter: function (text) {
      if (typeof SpeechSynthesisUtterance === "undefined") return null;
      var u = new SpeechSynthesisUtterance(text);
      var v = this.voice();
      if (v) u.voice = v;
      u.rate = 0.95;
      u.pitch = 1.0;
      return u;
    },

    say: function (text, opts) {
      try {
        if (!("speechSynthesis" in window)) return;
        this._spellGen++;
        window.speechSynthesis.cancel();
        var u = this._utter(text);
        if (!u) return;
        if (opts && opts.rate) u.rate = opts.rate;
        if (opts && opts.pitch) u.pitch = opts.pitch;
        window.speechSynthesis.speak(u);
      } catch (e) { /* audio unavailable, keep playing silently */ }
    },

    /* Read a word letter by letter with pauses between letters.
       Easier to follow than the default voice slurring whole words. */
    spell: function (word) {
      try {
        if (!("speechSynthesis" in window)) return;
        if (typeof SpeechSynthesisUtterance === "undefined") return;
        var synth = window.speechSynthesis;
        synth.cancel();
        /* Generation guard: a new say/spell/stop cancels any letter
           chain still speaking from an earlier call. */
        var gen = ++this._spellGen;
        var self = this;
        var letters = String(word).toUpperCase().split("");
        var i = 0;
        function next() {
          if (gen !== self._spellGen) return;
          if (i >= letters.length) return;
          var ch = letters[i++];
          var u = new SpeechSynthesisUtterance(ch === " " ? "space" : ch);
          var v = self.voice();
          if (v) u.voice = v;
          u.rate = 0.8;
          u.pitch = 1.0;
          var moved = false;
          function advance() {
            if (moved) return;
            moved = true;
            setTimeout(next, 240);
          }
          /* Watchdog: some platforms never fire onend. Never strand the spelling. */
          var watchdog = setTimeout(advance, 1600);
          u.onend = function () { clearTimeout(watchdog); advance(); };
          u.onerror = function () { clearTimeout(watchdog); advance(); };
          synth.speak(u);
        }
        next();
      } catch (e) { /* audio unavailable, keep playing silently */ }
    },

    stop: function () {
      try {
        this._spellGen++;
        if ("speechSynthesis" in window) window.speechSynthesis.cancel();
      } catch (e) {}
    }
  };

  /* Voices load async on most platforms; refresh the pick when they arrive. */
  try {
    if ("speechSynthesis" in window) {
      Speech._loadVoices();
      var synthRef = window.speechSynthesis;
      if (synthRef) {
        var prev = synthRef.onvoiceschanged;
        synthRef.onvoiceschanged = function () {
          Speech._triedLoad = false;
          Speech._loadVoices();
          if (typeof prev === "function") { try { prev(); } catch (e) {} }
        };
      }
    }
  } catch (e) {}

  window.RQAudio = { SFX: SFX, Speech: Speech, ensure: ensure };
})();
