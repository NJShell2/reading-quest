/* ============================================================
   READING QUEST - Reading content pack
   This file is PURE CONTENT. The engine in ../engine/ never
   contains subject matter. A future subject (science, history,
   etc.) ships as one new file implementing the same interface:
     window.ContentPacks.<id> = { id, name, classes, beasts,
       monsters, worlds, bosses, shop, spellsPerClass... }
   Question object contract (what generators return):
     { kind, prompt, speak, choices, answer, letters, passage,
       timeMs, hint, tier }
     kind: "choice" | "build" | "flash" | "story"
     - choice: prompt + choices[4], answer = index of correct
     - build:  prompt + speak(word); letters = shuffled tiles,
               answer = the word string
     - flash:  like choice but with timeMs countdown (fluency)
     - story:  passage shown, then prompt + choices, answer index
     Every question is tagged with its ladder tier (engine sets q.tier).
   Generators: gen(tier, helpers) where tier = 1..pack.tiers on the long
   ladder (grades 1 through college). Use helpers.band(tier, bands) to
   pick the right content band; tiers above the authored content reuse
   the hardest band until harder content is written.
   ============================================================ */
(function () {
  "use strict";

  function pick(rng, arr) { return arr[Math.floor(rng() * arr.length)]; }
  function shuffle(rng, arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(rng() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function sample(rng, arr, n, avoid) {
    var pool = arr.filter(function (w) { return w !== avoid; });
    return shuffle(rng, pool).slice(0, n);
  }
  /* Pick the content band for a ladder tier. bands = [[maxTier, bank], ...]
     in ascending order. Tiers above the last band reuse the hardest bank:
     the ladder is long (grades 1 to college) and content fills in over time,
     so the schema never needs a rewrite to hold harder items later. */
  function band(tier, bands) {
    for (var i = 0; i < bands.length; i++) {
      if (tier <= bands[i][0]) return bands[i][1];
    }
    return bands[bands.length - 1][1];
  }

  /* ---------------- shared word banks ---------------- */
  var CVC = ("cat hat mat sat rat bat dog log fog hog pig big wig sun run fun " +
    "cup pup bus map tap man pan bed red ten pen fox box six mix van jet").split(" ");
  var DIGRAPH = ("ship shop fish dish chat chin rich much this that with then moth " +
    "bath path wish chick thick shut").split(" ");
  var BLEND = ("frog clap drum grass snap trip frost drink plant blink clump " +
    "grump stand twist").split(" ");
  var SILENT_E = ("cake make take name game time ride like home nose cute mule " +
    "tape rope dive five").split(" ");
  var MULTI = ("rabbit sunset picnic trumpet magnet dentist helmet basket " +
    "pocket velvet goblin").split(" ");
  var NONSENSE = ("zib fep wug dax lum vorp skib thrim glip snorf plack " +
    "drim quaf yolt").split(" ");
  var SIGHT = ("the and said was are you he she we they have has had do does did " +
    "can could will would should there their where what when who why how here come " +
    "some from about into over after again because before every little never under " +
    "water people very your saw put out now today made find funny jump help play " +
    "look with my me").split(" ");
  var IRREGULAR = ("said was were does done gone laugh enough through though " +
    "thought island answer honest").split(" ");

  var VOCAB = [
    ["gigantic", "very, very big"], ["tiny", "very small"],
    ["brave", "not afraid"], ["swift", "very fast"],
    ["ancient", "very, very old"], ["fragile", "breaks easily"],
    ["fierce", "strong and scary"], ["gleam", "to shine brightly"],
    ["gloomy", "dark and sad"], ["journey", "a long trip"],
    ["treasure", "something worth a lot"], ["beast", "a wild animal"],
    ["courage", "being brave"], ["wisdom", "knowing a lot"],
    ["realm", "a kingdom or land"], ["quest", "an adventure to find something"],
    ["potion", "a magic drink"], ["shield", "something that protects you"],
    ["thunder", "the loud sound after lightning"], ["whisper", "to speak very quietly"],
    ["shiver", "to shake because you are cold or scared"], ["gallop", "how a horse runs fast"],
    ["soar", "to fly high in the sky"], ["creep", "to move slowly and quietly"],
    ["sparkle", "to shine with little lights"], ["mumble", "to speak so no one can hear"],
    ["giggle", "to laugh a little bit"], ["stomp", "to step down hard"],
    ["tumble", "to fall and roll over"], ["flutter", "to wave quickly in the air"]
  ];
  var MORPH = [
    ["unhappy", "not happy"], ["redo", "do again"], ["replay", "play again"],
    ["playful", "full of play"], ["kindness", "being kind"], ["darkness", "no light"],
    ["quickly", "in a fast way"], ["helper", "one who helps"], ["unfair", "not fair"]
  ];

  var STORIES = [
    { text: "Pip the fox found a red boat. He jumped in the boat. The boat went down the river.",
      qs: [
        { q: "Who found the boat?", c: ["Pip the fox", "A bear", "A bird", "A fish"], a: 0 },
        { q: "What color was the boat?", c: ["Blue", "Red", "Green", "Yellow"], a: 1 }
      ],
      ev: ["Pip found a red boat", "Pip jumped in the boat", "The boat went down the river"]
    },
    { text: "Mia the knight woke up early. She put on her shiny armor. Then she rode to the dark cave.",
      qs: [
        { q: "When did Mia wake up?", c: ["Late at night", "Early", "At lunch", "Never"], a: 1 },
        { q: "Where did Mia ride?", c: ["To the lake", "To the dark cave", "To the farm", "To school"], a: 1 }
      ],
      ev: ["Mia woke up early", "Mia put on her shiny armor", "Mia rode to the dark cave"]
    },
    { text: "The little dragon was sad. He lost his fire. His friend gave him warm soup, and his fire came back!",
      qs: [
        { q: "Why was the dragon sad?", c: ["He lost his fire", "He was hungry", "He was lost", "He was tired"], a: 0 },
        { q: "What helped the dragon?", c: ["Cold water", "A nap", "Warm soup", "A song"], a: 2 }
      ],
      ev: ["The dragon lost his fire", "His friend gave him warm soup", "His fire came back"]
    },
    { text: "Sam saw big clouds in the sky. He ran home fast. Just then, the rain started to fall.",
      qs: [
        { q: "What did Sam see?", c: ["Big clouds", "A rainbow", "Stars", "A kite"], a: 0 },
        { q: "Why did Sam run home?", c: ["He was hungry", "It started to rain", "He lost a game", "His mom called"], a: 1 }
      ],
      ev: ["Sam saw big clouds", "Sam ran home fast", "The rain started to fall"]
    },
    { text: "Lily planted a small seed. She gave it water every day. Soon a tall green plant grew.",
      qs: [
        { q: "What did Lily plant?", c: ["A rock", "A small seed", "A toy", "A hat"], a: 1 },
        { q: "What happened in the end?", c: ["Nothing grew", "A tall plant grew", "It snowed", "The seed ran away"], a: 1 }
      ],
      ev: ["Lily planted a small seed", "She gave it water every day", "A tall green plant grew"]
    },
    { text: "The king lost his gold crown. The jester looked under the bed. The crown was in the soup pot!",
      qs: [
        { q: "What did the king lose?", c: ["His shoe", "His gold crown", "His dog", "His cape"], a: 1 },
        { q: "Where was the crown?", c: ["Under the bed", "In the soup pot", "In the garden", "On his head"], a: 1 }
      ],
      ev: ["The king lost his gold crown", "The jester looked under the bed", "The crown was in the soup pot"]
    },
    { text: "Ben the bat was afraid of the dark. His mom gave him a tiny lantern. Now Ben flies at night with no fear.",
      qs: [
        { q: "How did Ben feel at first?", c: ["Happy", "Afraid", "Angry", "Silly"], a: 1 },
        { q: "What helped Ben?", c: ["A tiny lantern", "A loud drum", "A big map", "A warm hat"], a: 0 }
      ],
      ev: ["Ben was afraid of the dark", "His mom gave him a tiny lantern", "Ben flies at night with no fear"]
    },
    { text: "Zoe the wizard mixed a potion. It turned green and bubbled. She drank one sip and could hop like a frog!",
      qs: [
        { q: "What color was the potion?", c: ["Green", "Purple", "Blue", "Pink"], a: 0 },
        { q: "What could Zoe do after one sip?", c: ["Fly", "Hop like a frog", "Swim", "Turn invisible"], a: 1 }
      ],
      ev: ["Zoe mixed a potion", "It turned green and bubbled", "She could hop like a frog"]
    }
  ];

  var RHYMES = [
    ["cat", ["hat", "mat", "bat"]], ["dog", ["log", "fog", "hog"]],
    ["sun", ["run", "fun"]], ["pig", ["big", "wig"]],
    ["bed", ["red", "fed"]], ["cake", ["make", "take", "lake"]],
    ["boat", ["goat", "coat"]], ["tree", ["bee", "see"]],
    ["ball", ["tall", "call"]], ["fish", ["dish", "wish"]]
  ];

  /* ---------------- class definitions ---------------- */
  var CLASSES = [
    {
      id: "knight", name: "Codebreaker Knight", title: "Knight",
      strategy: "Phonics and Decoding",
      desc: "Cracks the secret code of letters. Sounds out words piece by piece, from simple cat to mighty trumpet.",
      icon: "🛡️", color: "#e8b34b",
      hp: 40, power: 6,
      spells: [
        { name: "Letter Slash", icon: "⚔️", mult: 1.0, level: 1, desc: "A quick slash powered by one sounded-out word." },
        { name: "Sound Shield Bash", icon: "🛡️", mult: 1.4, level: 3, desc: "Bash with blended sounds." },
        { name: "Decoding Wave", icon: "🌊", mult: 1.9, level: 5, desc: "A wave of decoded words crashes down." },
        { name: "Codebreaker Fury", icon: "🔥", mult: 2.6, level: 8, desc: "The ultimate: every letter bends to your will." }
      ],
      familiar: { egg: "Rune Egg", baby: "Bookwyrm", adult: "Tome Drake", icons: ["🥚", "🐛", "🐉"] },
      gens: [
        function buildWord(tier, h) {
          var bank = band(tier, [[2, CVC], [4, DIGRAPH], [6, BLEND.concat(SILENT_E)], [8, MULTI], [1e9, MULTI]]);
          var w = h.pick(bank);
          return { kind: "build", prompt: "Sound it out, then build the word:", speak: w,
                   letters: h.shuffle(w.split("")), answer: w };
        },
        function hearWord(tier, h) {
          var bank = band(tier, [[2, CVC], [4, DIGRAPH.concat(SILENT_E)], [6, BLEND.concat(MULTI)], [1e9, MULTI]]);
          var w = h.pick(bank);
          var opts = h.shuffle([w].concat(h.sample(bank, 3, w)));
          return { kind: "choice", prompt: "Listen... which word did you hear?", speak: w,
                   choices: opts, answer: opts.indexOf(w) };
        },
        function alienWord(tier, h) {
          var w = h.pick(NONSENSE);
          var opts = h.shuffle([w].concat(h.sample(NONSENSE, 3, w)));
          return { kind: "choice", prompt: "An alien word! Sound it out: which one matches what you hear?",
                   speak: w, choices: opts, answer: opts.indexOf(w) };
        }
      ]
    },
    {
      id: "wizard", name: "Sight Wizard", title: "Wizard",
      strategy: "Sight Words and Fast Recognition",
      desc: "Sees a word once, twice, and then knows it forever. Zaps words the instant they appear.",
      icon: "🧙", color: "#9b7bff",
      hp: 32, power: 8,
      spells: [
        { name: "Word Zap", icon: "⚡", mult: 1.0, level: 1, desc: "Zap a word the moment you see it." },
        { name: "Flash Bolt", icon: "🌩️", mult: 1.4, level: 3, desc: "A bolt of instant recognition." },
        { name: "Mind Library", icon: "📚", mult: 1.9, level: 5, desc: "Every word you ever mapped, unleashed." },
        { name: "Omnisight Storm", icon: "🌪️", mult: 2.6, level: 8, desc: "No word can hide from your sight." }
      ],
      familiar: { egg: "Star Egg", baby: "Blinkbat", adult: "Gaze Griffin", icons: ["🥚", "🦇", "🦅"] },
      gens: [
        function blastWord(tier, h) {
          var bank = band(tier, [[8, SIGHT], [1e9, IRREGULAR]]);
          var w = h.pick(bank);
          var opts = h.shuffle([w].concat(h.sample(bank, 3, w)));
          return { kind: "choice", prompt: "Blast the word you hear!", speak: w,
                   choices: opts, answer: opts.indexOf(w) };
        },
        function quickMatch(tier, h) {
          var bank = band(tier, [[8, SIGHT], [1e9, IRREGULAR]]);
          var w = h.pick(bank);
          var opts = h.shuffle([w].concat(h.sample(bank, 3, w)));
          return { kind: "flash", prompt: "Quick! Tap the matching word:", speak: w,
                   choices: opts, answer: opts.indexOf(w), timeMs: Math.max(4000, 9500 - tier * 500) };
        }
      ]
    },
    {
      id: "archer", name: "Fleetfoot Archer", title: "Archer",
      strategy: "Fluency: Fast and Smooth Reading",
      desc: "Reads like the wind. The faster and smoother she reads, the faster her arrows fly.",
      icon: "🏹", color: "#6fd66f",
      hp: 34, power: 7,
      spells: [
        { name: "Quick Shot", icon: "➶", mult: 1.0, level: 1, desc: "One fast, true arrow." },
        { name: "Double Volley", icon: "🏹", mult: 1.4, level: 3, desc: "Two arrows, twice as smooth." },
        { name: "Wind Runner", icon: "💨", mult: 1.9, level: 5, desc: "Outrun every stumble." },
        { name: "Thousand Arrow Rain", icon: "🌧️", mult: 2.6, level: 8, desc: "Reading so smooth it becomes a storm." }
      ],
      familiar: { egg: "Feather Egg", baby: "Zipwing", adult: "Gale Falcon", icons: ["🥚", "🐤", "🦅"] },
      gens: [
        function speedRead(tier, h) {
          var bank = band(tier, [[4, SIGHT.concat(CVC)], [8, BLEND.concat(DIGRAPH)], [1e9, MULTI.concat(IRREGULAR)]]);
          var w = h.pick(bank);
          var opts = h.shuffle([w].concat(h.sample(bank, 3, w)));
          return { kind: "flash", prompt: "Read it FAST, then tap it!", speak: w,
                   choices: opts, answer: opts.indexOf(w), timeMs: Math.max(3000, 8500 - tier * 400) };
        },
        function smoothPick(tier, h) {
          var bank = band(tier, [[4, CVC], [8, BLEND.concat(DIGRAPH)], [1e9, MULTI]]);
          var w = h.pick(bank);
          var opts = h.shuffle([w].concat(h.sample(bank, 3, w)));
          return { kind: "flash", prompt: "Smooth and quick: which word did you hear?", speak: w,
                   choices: opts, answer: opts.indexOf(w), timeMs: Math.max(3000, 8500 - tier * 400) };
        }
      ]
    },
    {
      id: "druid", name: "Word Druid", title: "Druid",
      strategy: "Vocabulary: Growing Word Meanings",
      desc: "Grows word meanings like plants in a magic garden. The more words you know, the stronger your magic.",
      icon: "🌿", color: "#4fc3a1",
      hp: 36, power: 7,
      spells: [
        { name: "Thorn Word", icon: "🌵", mult: 1.0, level: 1, desc: "A sharp word, precisely meant." },
        { name: "Vine Grasp", icon: "🌱", mult: 1.4, level: 3, desc: "Meanings wrap around the foe." },
        { name: "Ancient Roots", icon: "🌳", mult: 1.9, level: 5, desc: "Old, deep words hold fast." },
        { name: "Forest of Meaning", icon: "🌲", mult: 2.6, level: 8, desc: "A whole forest of words you own." }
      ],
      familiar: { egg: "Seed Egg", baby: "Sproutling", adult: "Elder Treantling", icons: ["🥚", "🌱", "🌳"] },
      gens: [
        function wordMeaning(tier, h) {
          var bank = band(tier, [[8, VOCAB], [1e9, MORPH]]);
          var pair = h.pick(bank);
          var others = h.sample(bank, 3, pair).map(function (p) { return p[1]; });
          var opts = h.shuffle([pair[1]].concat(others));
          return { kind: "choice", prompt: "What does \"" + pair[0] + "\" mean?",
                   choices: opts, answer: opts.indexOf(pair[1]) };
        },
        function reverseMeaning(tier, h) {
          var bank = band(tier, [[8, VOCAB], [1e9, MORPH]]);
          var pair = h.pick(bank);
          var others = h.sample(bank, 3, pair).map(function (p) { return p[0]; });
          var opts = h.shuffle([pair[0]].concat(others));
          return { kind: "choice", prompt: "Which word means: " + pair[1] + "?",
                   choices: opts, answer: opts.indexOf(pair[0]) };
        }
      ]
    },
    {
      id: "bard", name: "Story Bard", title: "Bard",
      strategy: "Comprehension: Understanding Stories",
      desc: "Every song is a story, and he remembers them all. Prove you understood the tale to unleash its power.",
      icon: "🎵", color: "#ff9d5c",
      hp: 34, power: 7,
      spells: [
        { name: "Tale Chord", icon: "🎶", mult: 1.0, level: 1, desc: "One true note from the story." },
        { name: "Chorus Blast", icon: "📯", mult: 1.4, level: 3, desc: "The whole chorus joins in." },
        { name: "Epic Verse", icon: "📜", mult: 1.9, level: 5, desc: "A verse of pure understanding." },
        { name: "Legend Song", icon: "🎺", mult: 2.6, level: 8, desc: "The song every hero remembers." }
      ],
      familiar: { egg: "Melody Egg", baby: "Humbird", adult: "Chorus Phoenix", icons: ["🥚", "🐦", "🔥"] },
      gens: [
        function storyQ(tier, h) {
          var s = h.pick(STORIES);
          var q = h.pick(s.qs);
          return { kind: "story", passage: s.text, prompt: q.q,
                   choices: q.c, answer: q.a };
        },
        function sequenceIt(tier, h) {
          var s = h.pick(STORIES);
          var first = h.pick([true, false]);
          var correct = first ? s.ev[0] : s.ev[2];
          var others = h.sample(s.ev, 2, correct);
          var distractor = h.pick(STORIES.filter(function (x) { return x !== s; })).ev[1];
          var opts = h.shuffle([correct].concat(others).concat([distractor]));
          return { kind: "story", passage: s.text,
                   prompt: first ? "What happened FIRST in the story?" : "What happened LAST in the story?",
                   choices: opts, answer: opts.indexOf(correct) };
        }
      ]
    },
    {
      id: "monk", name: "Echo Monk", title: "Monk",
      strategy: "Phonemic Awareness: Hearing Sounds",
      desc: "Trains the ears before the eyes. Hears every tiny sound inside a word, blindfolded and unbeatable.",
      icon: "🔔", color: "#7bc4ff",
      hp: 38, power: 6,
      spells: [
        { name: "Echo Palm", icon: "👋", mult: 1.0, level: 1, desc: "A palm strike tuned to a single sound." },
        { name: "Rhyme Fist", icon: "✊", mult: 1.4, level: 3, desc: "Words that rhyme, strike together." },
        { name: "Sound Split", icon: "🌀", mult: 1.9, level: 5, desc: "Split any word into its sounds." },
        { name: "Silent Thunder", icon: "⛈️", mult: 2.6, level: 8, desc: "Heard by no one. Felt by everyone." }
      ],
      familiar: { egg: "Bell Egg", baby: "Chimekit", adult: "Resonance Tiger", icons: ["🥚", "🐱", "🐯"] },
      gens: [
        function rhymeTime(tier, h) {
          var set = h.pick(RHYMES);
          var word = set[0], rhymes = set[1];
          var correct = h.pick(rhymes);
          var pool = [];
          RHYMES.forEach(function (s) { if (s[0] !== word) pool = pool.concat(s[1]); });
          var opts = h.shuffle([correct].concat(h.sample(pool, 3, correct)));
          return { kind: "choice", prompt: "Which word rhymes with \"" + word + "\"?",
                   speak: word, choices: opts, answer: opts.indexOf(correct) };
        },
        function firstSound(tier, h) {
          var w = h.pick(CVC.concat(SIGHT.slice(0, 20)));
          var s = w[0];
          var pool = "bcdfghjklmnpqrstvwyz".split("");
          var opts = h.shuffle([s].concat(h.sample(pool, 3, s)));
          return { kind: "choice", prompt: "What is the FIRST sound in \"" + w + "\"?",
                   speak: w, choices: opts, answer: opts.indexOf(s) };
        },
        function blendIt(tier, h) {
          var w = h.pick(CVC);
          var spoken = w.split("").join(" ... ");
          var opts = h.shuffle([w].concat(h.sample(CVC, 3, w)));
          return { kind: "choice", prompt: "Blend the sounds together. What word is it?",
                   speak: spoken, choices: opts, answer: opts.indexOf(w) };
        }
      ]
    }
  ];

  /* ---------------- challenge classes (Beast Within) ---------------- */
  var BEASTS = [
    { id: "minotaur", baseClass: "knight", name: "Minotaur", icon: "🐂",
      desc: "The Knight's beast within. Cracks brutal multisyllabic code words. Harder battles, DOUBLE experience.",
      hp: 60, power: 10 },
    { id: "medusa", baseClass: "wizard", name: "Medusa", icon: "🐍",
      desc: "The Wizard's beast within. Masters the trickiest irregular words. Harder battles, DOUBLE experience.",
      hp: 48, power: 12 },
    { id: "tigress", baseClass: "archer", name: "Tigress", icon: "🐅",
      desc: "The Archer's beast within. Reads at lightning speed under brutal timers. Harder battles, DOUBLE experience.",
      hp: 50, power: 11 },
    { id: "treant", baseClass: "druid", name: "Treant", icon: "🌲",
      desc: "The Druid's beast within. Commands ancient word magic and word parts. Harder battles, DOUBLE experience.",
      hp: 54, power: 11 },
    { id: "unicorn", baseClass: "bard", name: "Unicorn", icon: "🦄",
      desc: "The Bard's beast within. Understands the deepest stories and hidden meanings. Harder battles, DOUBLE experience.",
      hp: 50, power: 11 },
    { id: "jackal", baseClass: "monk", name: "Jackal", icon: "🐕",
      desc: "The Monk's beast within. Hears sounds no one else can split. Harder battles, DOUBLE experience.",
      hp: 56, power: 10 }
  ];

  /* ---------------- monsters, worlds, bosses ---------------- */
  var MONSTERS = [
    { id: "letterbat", name: "Letterbat", icon: "🦇", hp: 22, power: 3, xp: 16, coins: [8, 16] },
    { id: "grumblegoblin", name: "Grumblegoblin", icon: "👺", hp: 30, power: 4, xp: 20, coins: [10, 20] },
    { id: "snatchwing", name: "Snatchwing", icon: "🦅", hp: 38, power: 5, xp: 24, coins: [12, 24] },
    { id: "mumblemouth", name: "MUMBLEMOUTH", icon: "👹", hp: 120, power: 8, xp: 80, coins: [40, 70],
      boss: true,
      intro: "I am MUMBLEMOUTH, the Garbler! I mumble every sound and garble every word! None shall pass!",
      outro: "Nooo... my mumbles... are... clear... The first page of the Great Book is yours, hero!" },
    /* ---- World 2: Murkfen Marsh (sight words) ---- */
    { id: "miremoth", name: "Mire Moth", icon: "🦋", hp: 52, power: 6, xp: 32, coins: [18, 34],
      rescuable: true, rarity: "Common",
      petStats: { power: 3, hearts: 10, magic: 12, speed: 8 } },
    { id: "bogblur", name: "Bogblur", icon: "🐸", hp: 60, power: 7, xp: 36, coins: [20, 36] },
    { id: "fogfiend", name: "Fogfiend", icon: "👻", hp: 68, power: 8, xp: 42, coins: [22, 40] },
    { id: "siltslink", name: "Silt Slink", icon: "🦎", hp: 76, power: 9, xp: 48, coins: [24, 44] },
    { id: "wipeout-wraith", name: "WIPEOUT WRAITH", icon: "🌪️", hp: 230, power: 12, xp: 150, coins: [70, 110],
      boss: true,
      intro: "I am the WIPEOUT WRAITH! I wipe whole words off the page! Sight words vanish where I pass!",
      outro: "My winds... fading... The second page of the Great Book is yours. Read it well..." },
    /* ---- World 3: Gloomhollow (fluency) ---- */
    { id: "sluggard", name: "Sluggard", icon: "🐌", hp: 88, power: 10, xp: 56, coins: [28, 50],
      rescuable: true, rarity: "Uncommon",
      petStats: { power: 4, hearts: 14, magic: 14, speed: 4 } },
    { id: "drawlbat", name: "Drawlbat", icon: "🦇", hp: 96, power: 11, xp: 62, coins: [30, 54] },
    { id: "turtlehex", name: "Turtlehex", icon: "🐢", hp: 104, power: 12, xp: 68, coins: [32, 58] },
    { id: "drowsydrake", name: "Drowsy Drake", icon: "🐲", hp: 112, power: 13, xp: 74, coins: [34, 62] },
    { id: "the-slowdown", name: "THE SLOWDOWN", icon: "🐌👑", hp: 340, power: 16, xp: 240, coins: [110, 170],
      boss: true,
      intro: "I am THE SLOWDOWN. I drag every reader down to a crawl. You will never finish a page in time...",
      outro: "So... fast... The final page is yours. The Great Book is whole again. You read like the wind!" }
  ];

  var WORLDS = [
    { id: "whisperwood", name: "Whisperwood", icon: "🌲", desc: "Where words grow on trees.",
      nodes: [
        { id: "w1n1", name: "Rustling Path", monster: "letterbat" },
        { id: "w1n2", name: "Goblin Clearing", monster: "grumblegoblin" },
        { id: "w1n3", name: "Whispering Hollow", monster: "letterbat" },
        { id: "w1n4", name: "Snatchwing Nest", monster: "snatchwing" },
        { id: "w1n5", name: "Garbler's Cave", monster: "mumblemouth", boss: true }
      ] },
    { id: "murkfen", name: "Murkfen Marsh", icon: "🌫️", desc: "A foggy swamp where sight words sink from sight.",
      unlockBoss: "mumblemouth", unlockText: "Defeat MUMBLEMOUTH in Whisperwood to enter.",
      nodes: [
        { id: "w2n1", name: "Soggy Trail", monster: "miremoth" },
        { id: "w2n2", name: "Croaking Bog", monster: "bogblur" },
        { id: "w2n3", name: "Foggy Fen", monster: "fogfiend" },
        { id: "w2n4", name: "Silt Flats", monster: "siltslink" },
        { id: "w2n5", name: "Wraith's Whirlpool", monster: "wipeout-wraith", boss: true }
      ] },
    { id: "gloomhollow", name: "Gloomhollow", icon: "🌑", desc: "A gloomy valley where slow readers lose their way.",
      unlockBoss: "wipeout-wraith", unlockText: "Defeat the WIPEOUT WRAITH in Murkfen Marsh to enter.",
      nodes: [
        { id: "w3n1", name: "Drowsy Dell", monster: "sluggard" },
        { id: "w3n2", name: "Drawling Cave", monster: "drawlbat" },
        { id: "w3n3", name: "Hex Hollow", monster: "turtlehex" },
        { id: "w3n4", name: "Sleepy Summit", monster: "drowsydrake" },
        { id: "w3n5", name: "Throne of Slow", monster: "the-slowdown", boss: true }
      ] }
  ];

  /* ---------------- shop ---------------- */
  var SHOP = [
    { id: "potion", name: "Healing Potion", icon: "🧪", cost: 40,
      desc: "Restores half your health in battle.", effect: "heal" },
    { id: "crystal", name: "Magic Crystal", icon: "💎", cost: 25,
      desc: "Lets you cast one extra spell in battle.", effect: "crystal" },
    { id: "elixir", name: "Power Elixir", icon: "⚗️", cost: 60,
      desc: "Double spell damage for 3 turns.", effect: "elixir" },
    { id: "whetstone", name: "Whetstone", icon: "🪓", cost: 150,
      desc: "Permanent +2 Power for your current hero.", effect: "power" },
    { id: "charm", name: "Heart Charm", icon: "❤️", cost: 150,
      desc: "Permanent +10 max health for your current hero.", effect: "maxhp" },
    { id: "lucky", name: "Lucky Coin", icon: "🪙", cost: 100,
      desc: "Double coins from your next battle.", effect: "lucky" },
    { id: "ring-river", name: "Riverstone Ring", icon: "💍", cost: 120,
      desc: "A smooth stone that hums with spells. +15 max magic, +1 power. Find it in your Backpack!",
      effect: "gear", gearId: "ring-river" }
  ];

  /* ---------------- new-player systems content ---------------- */

  /* Rotating loading tips, shown on the title screen and transitions. */
  var TIPS = [
    "Tip: wrong answers never hurt you. They only fizzle the spell!",
    "Tip: tap Meditate in battle to refill your magic by answering a question.",
    "Tip: rescued friends fight beside you. Open the Petbook to meet them!",
    "Tip: gear from your Backpack makes your spells stronger.",
    "Tip: each hero trains a different reading power. Switch at the Tower!",
    "Tip: bosses guard the torn pages of the Great Book.",
    "Tip: come back every day to open the gift box and grow your streak!",
    "Tip: weaken a wild creature below 30% health, then RESCUE it!",
    "Tip: your training tier adapts to you. Fast and accurate? You climb!",
    "Tip: the shop sells potions, crystals, and the Riverstone Ring.",
    "Tip: every world boss you beat unlocks a new land to explore.",
    "Tip: Inkwell the owl always has a wise word. Talk to him at the Tower!"
  ];

  /* Scripted tutorial battle opponent: a harmless baby Mumblemouth. */
  var TUTORIAL_MONSTER = {
    id: "mumblekit", name: "Mumblekit", icon: "🐭", hp: 40, power: 0, xp: 0, coins: [0, 0],
    intro: "Squeak! (Mumblekit is only a baby. It cannot hurt you. Perfect for practice!)"
  };

  /* Rescue tutorial creature: weakened below 30% HP, then freed. */
  var RESCUE_MONSTER = {
    id: "bristleback", name: "Bristleback", icon: "🦔", hp: 60, power: 5, xp: 30, coins: [15, 25],
    rescuable: true, rarity: "Common",
    petStats: { power: 3, hearts: 10, magic: 12, speed: 7 },
    intro: "A wild Bristleback snuffles out of the bushes. It looks scared, not mean.",
    outro: "Thank you for setting me free! I will fight beside you now!"
  };

  /* Starter familiar choice: pick one, it is yours. Evolves at hero level 7. */
  var STARTER_FAMILIARS = [
    { id: "pip", name: "Pip the Bookmouse", icon: "🐭", rarity: "Common",
      desc: "Nibbles the boring corners off books.",
      stats: { power: 2, hearts: 8, magic: 10, speed: 6 },
      evolved: { name: "Pip the Pagekeeper", icon: "🐀",
        stats: { power: 4, hearts: 12, magic: 14, speed: 7 } } },
    { id: "hoot", name: "Hoot the Letter Owl", icon: "🦉", rarity: "Common",
      desc: "Spots every letter, even in the dark.",
      stats: { power: 2, hearts: 8, magic: 10, speed: 6 },
      evolved: { name: "Hoot the Lorewing", icon: "🦅",
        stats: { power: 4, hearts: 12, magic: 14, speed: 7 } } },
    { id: "ripple", name: "Ripple the Inkfin", icon: "🐟", rarity: "Uncommon",
      desc: "Swims through sentences like a river.",
      stats: { power: 3, hearts: 10, magic: 12, speed: 7 },
      evolved: { name: "Ripple the Tidecaller", icon: "🐬",
        stats: { power: 5, hearts: 14, magic: 16, speed: 8 } } },
    { id: "ember", name: "Ember the Storyspark", icon: "🔥", rarity: "Uncommon",
      desc: "Every tale she hears lights a little fire.",
      stats: { power: 3, hearts: 10, magic: 12, speed: 7 },
      evolved: { name: "Ember the Taleblaze", icon: "🐉",
        stats: { power: 5, hearts: 14, magic: 16, speed: 8 } } },
    { id: "nova", name: "Nova the Starwhal", icon: "🐋", rarity: "Rare",
      desc: "A whale who swims the sea of stars.",
      stats: { power: 4, hearts: 12, magic: 14, speed: 9 },
      evolved: { name: "Nova the Galaxwhal", icon: "🐳",
        stats: { power: 6, hearts: 16, magic: 18, speed: 10 } } }
  ];

  /* Gear: equippable in the Backpack. Bonuses feed maxHp, power, maxMagic. */
  var GEAR = [
    { id: "wand-training", name: "Training Wand", icon: "🪄", slot: "wand",
      power: 1, hp: 0, magic: 10,
      desc: "A free gift from Bram. Every wizard starts here." },
    { id: "cap-training", name: "Training Cap", icon: "🧢", slot: "hat",
      power: 0, hp: 5, magic: 5,
      desc: "A pointy cap that keeps your thoughts warm." },
    { id: "garb-training", name: "Training Garb", icon: "🥋", slot: "garb",
      power: 1, hp: 8, magic: 0,
      desc: "Sturdy robes for a young battler." },
    { id: "shoes-training", name: "Training Shoes", icon: "👟", slot: "boots",
      power: 0, hp: 4, magic: 15,
      desc: "Light shoes for quick thinking." },
    { id: "ring-river", name: "Riverstone Ring", icon: "💍", slot: "ring",
      power: 1, hp: 0, magic: 15,
      desc: "A smooth stone that hums with spells." }
  ];

  var GEAR_SLOTS = [
    { id: "wand", name: "Wand", icon: "🪄" },
    { id: "hat", name: "Hat", icon: "🎩" },
    { id: "garb", name: "Garb", icon: "🥋" },
    { id: "boots", name: "Boots", icon: "👟" },
    { id: "ring", name: "Ring", icon: "💍" }
  ];

  /* Tower NPCs with rotating tip lines. */
  var NPCS = {
    inkwell: { name: "Inkwell", title: "Keeper of the Great Book", icon: "🦉",
      lines: [
        "Hoo! Wrong answers never hurt you here. They only fizzle the spell, so keep trying!",
        "When your magic runs low, tap Meditate and answer well to refill it.",
        "The Unreader tore three pages from the Great Book. Each world boss holds one!",
        "Rescued friends fight beside you. Open your Petbook to see your whole team.",
        "Your training tier adapts to you. Answer fast and true, and you will climb!"
      ] },
    bram: { name: "Bram", title: "Shopkeep of the Tower", icon: "🧙‍♂️",
      lines: [
        "Psst! Gear in your Backpack makes your spells stronger. Come see my wares!",
        "The Riverstone Ring hums with spells. Only 120 coins, friend!",
        "Potions save heroes. Stock up before you face a boss!",
        "Every hero needs a wand. Lucky for you, the first one is free!"
      ] }
  };

  /* Wizard name picker: adjective + noun. Never the real name! */
  var WIZARD_NAMES = {
    adjectives: ["Brave", "Clever", "Merry", "Silent", "Starry", "Bold",
                 "Quick", "Gentle", "Wild", "Lucky", "Sleepy", "Thunder"],
    nouns: ["Fox", "Owl", "Badger", "Wren", "Otter", "Hawk",
            "Mole", "Finch", "Bear", "Wolf", "Toad", "Lynx"]
  };

  /* Goals engine: checked on game events, gear rewards grant Wear/Not now. */
  var GOALS = [
    { id: "training", title: "Complete wizard training",
      desc: "Finish the training battle with Inkwell.", reward: null },
    { id: "pick-name", title: "Choose a wizard name",
      desc: "Pick a fun name. Do not use your real name!", reward: null },
    { id: "first-familiar", title: "Choose a familiar",
      desc: "Pick one of the five starter friends.", reward: null },
    { id: "first-rescue", title: "Rescue a wild friend",
      desc: "Weaken a wild creature, then set it free.", reward: "shoes-training" },
    { id: "win-3", title: "Win 3 battles",
      desc: "Win any 3 battles out in the wild.", reward: "cap-training" },
    { id: "w1-boss", title: "Defeat MUMBLEMOUTH",
      desc: "Beat the boss of Whisperwood.", reward: "garb-training" },
    { id: "page-2", title: "Reclaim the 2nd Keystone Page",
      desc: "Defeat the Wipeout Wraith in Murkfen Marsh.", reward: null },
    { id: "page-3", title: "Reclaim the 3rd Keystone Page",
      desc: "Defeat The Slowdown in Gloomhollow.", reward: null }
  ];

  var DAILY = { baseCoins: 20, streakBonus: 5, streakCap: 10, itemChance: 0.25 };

  window.ContentPacks = window.ContentPacks || {};
  window.ContentPacks.reading = {
    id: "reading",
    name: "Reading Quest",
    tagline: "Answer to cast. Read to win.",
    classes: CLASSES,
    beasts: BEASTS,
    monsters: MONSTERS,
    worlds: WORLDS,
    shop: SHOP,
    tips: TIPS,
    tutorialMonster: TUTORIAL_MONSTER,
    rescueMonster: RESCUE_MONSTER,
    starterFamiliars: STARTER_FAMILIARS,
    gear: GEAR,
    gearSlots: GEAR_SLOTS,
    npcs: NPCS,
    wizardNames: WIZARD_NAMES,
    goals: GOALS,
    daily: DAILY,
    keystoneBosses: ["mumblemouth", "wipeout-wraith", "the-slowdown"],
    helpers: { pick: pick, shuffle: shuffle, sample: sample, band: band },
    /* XP needed (cumulative) to reach each level, index = level */
    xpTable: [0, 0, 30, 80, 150, 240, 350, 480, 630, 810, 1000],
    maxLevel: 10,
    beastUnlockLevel: 5,
    beastXpMult: 2,
    /* ---- the long ladder: grades 1 through college ----
       32 tiers, two per grade. Every generated question is tagged with
       its tier. v1 reading content is honestly authored for tiers 1-8
       (about grades 1-4); higher tiers reuse the hardest available banks
       until college-level content is written. No schema change needed. */
    tiers: 32,
    tierLabel: function (t) {
      var g = Math.ceil(t / 2), sub = (t % 2 === 1) ? "Early" : "Late";
      if (g <= 12) return "Grade " + g + " " + sub;
      return "College Year " + (g - 12) + " " + sub;
    },
    beastStartTier: 4,
    /* ---- adaptive pacing calibration (per question kind) ----
       fastMs: at or below this the answer felt instant for its kind.
       slowMs: at or above this the answer was a real struggle.
       A story takes longer to read than a word takes to tap, so the
       numbers differ per kind instead of one raw number everywhere. */
    pacing: {
      window: 12,
      evalEvery: 6,
      cooldown: 8,
      whizAcc: 0.92,
      stompAcc: 0.45,
      fastMs: { choice: 2500, build: 10000, flash: 2500, story: 30000, default: 4000 },
      slowMs: { choice: 15000, build: 45000, flash: 12000, story: 90000, default: 20000 }
    }
  };
})();
