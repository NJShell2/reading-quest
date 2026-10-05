# Reading Quest: DESIGN

A Prodigy-style fantasy RPG that teaches READING. Answer reading questions to cast spells, defeat monsters, earn familiars, and beat bosses.

## Research foundations

**Prodigy (what we copy):** Turn-based battles where answering questions is fuel, not punishment. A wrong answer only loses your turn; it never damages you. Spells learned through progression, pets that fight alongside you, treasure chests, a shop, collection loops, celebration density. We skip Prodigy's multiplayer, chat, and membership gates entirely.

**Gauntlet Dark Legacy (what we copy):** Hero classes you pick and switch between at a hub (progress per character, never shared). Secret "Beast Within" challenge characters: each is the powered-up alter ego of a base class (Warrior becomes Minotaur), unlocked through achievement, with better stats and growth. Realm bosses with themed legendary counters. Familiars earned at level thresholds. Gold spent in the hub shop on direct stat upgrades.

**Reading science (what we teach):** The five pillars of reading instruction map 1:1 to six hero classes (phonemic awareness gets its own pre-letter class). Systematic phonics is the evidence-backed core; sight words are built by decoding (orthographic mapping), so sight-word play unlocks after decoding practice; whole-language guessing-from-pictures is NOT rewarded; Orton-Gillingham's multisensory mastery-gated approach shapes our level gates and re-teaching.

## The six hero classes (one per reading pillar)

| Class | Reading strategy | Fantasy identity | Beast Within (challenge class) |
|---|---|---|---|
| Echo Monk | Phonemic awareness (hearing sounds, no letters) | Blindfolded monk who hears what others cannot | Jackal |
| Codebreaker Knight | Systematic phonics (decoding) | Armored knight who cracks the letter code | Minotaur |
| Sight Wizard | Sight words (rapid recognition via orthographic mapping) | Wizard whose spells are words seen in a flash | Medusa |
| Fleetfoot Archer | Fluency (speed + accuracy + expression) | Archer whose arrows fly as fast as she reads | Tigress |
| Word Druid | Vocabulary (word meanings, word parts) | Druid who grows word-meanings like plants | Treant |
| Story Bard | Comprehension (understanding stories) | Bard whose songs are stories; answers prove he listened | Unicorn |

Each class keeps its OWN persistent progress (XP, level, spells, familiar, stats). Switching happens at the Tower hub, Gauntlet-style. Coins are shared across classes (kid-friendly).

## Challenge classes (Beast Within)

Unlocked by achievement: reach level 5 with the base class. Beasts ask HARDER questions (difficulty tier 3: longer words, trickier patterns, tighter timers, inference questions) but grant DOUBLE XP and better coin drops. Risk and reward. They are separate progression tracks, like Gauntlet.

## Bosses

Each world ends with a boss guarding a Keystone page of the Great Book. Original creations, Gauntlet-flavored:
- World 1 boss: **Mumblemouth**, the Garbler (mumbles and garbles sounds; phonics-themed)
- Planned: Wipeout Wraith (sight words), The Slowdown (fluency), Gobbledygook (vocabulary), Muddlewitch (comprehension), Echo Eater (phonemic awareness)
- Final boss: **The Unreader**, who wants to erase every word in the world

## Systems shipped in v1

- **Battles:** turn-based, hero + familiar vs monster. Pick a spell, answer a reading question to cast it. Correct = damage. Wrong = fumble (turn lost, no damage taken). Enemy deals small damage; defeat means a safe retreat with XP kept.
- **Spells:** 4 per class, learned at levels 1/3/5/8. Damage scales with level and Power.
- **Familiars:** egg granted at class level 3, hatches at 4, evolves at 7. Adds bonus damage and a once-per-battle heal.
- **XP/levels:** levels 1 to 10 per class in v1 (engine supports more). XP curve rises steadily.
- **Coins and chests:** every won battle drops a treasure chest with random coins and occasional items. Juicy opening animation.
- **Shop (the Tower):** health potions, magic crystals, powerups (double damage), permanent stat upgrades (Gauntlet-style direct buys).
- **Streaks:** consecutive correct answers build a streak with bonus XP/coins and celebrations at 5 and 10.
- **World map:** World 1 "Whisperwood" with 5 battle nodes and the boss node. Engine renders any number of worlds.
- **Saves:** localStorage, per-class progress, shared coins and unlocks. No accounts, no external links, kid-safe.
- **Audio:** Web Audio sound effects plus built-in speech synthesis for spoken words (no audio files needed).

## Architecture (for the Science/Social Studies/etc. expansion)

The ENGINE never contains subject content. `engine/` holds: game screens and navigation, the battle loop, question renderers, progression math, shop, saves, audio, and the adaptive difficulty engine. `content/` holds packs: `reading-pack.js` defines classes, beasts, spells, items, familiars, worlds, bosses, monsters, word banks, question generators, the tier ladder, and pacing calibration. A future subject ships as one new file (e.g. `science-pack.js`, `business-pack.js`) implementing the same pack interface; the engine loads whichever pack is active. Question renderers are generic (choice, build-a-word, timed flash, story question), so new subjects reuse them.

## Adaptive difficulty: the flow-state engine (`engine/adaptive.js`)

This is engine-level, so every future subject gets it free. It keeps each player in the zone of proximal development: challenged to grow without being crushed.

**How it works.** Every hero trains on the pack's long tier ladder, starting at tier 1. After every answered question, the engine records `{correct, responseMs, questionKind}` into a rolling window (last 12 answers, evaluated every 6). It tracks BOTH accuracy and speed:

- **WHIZING** (accuracy at least 92% AND very fast): the hero advances a tier early. No grinding through material they have mastered.
- **STEADY** (solid accuracy with real effort): hold the tier. This is the growth zone; most play lives here.
- **STOMPED** (accuracy at most 45% AND very slow): drop one tier. This is framed in-game as a **Secret Side Quest**: a hidden training trail the wisest heroes take. It is never a demotion, never a failure message, never "too hard". The copy is checked by an automated banned-word list (`demot*`, `fail*`, `too hard`, ...).

**Per-kind calibration.** "Fast" means something different for tapping a word vs reading a whole story, so Nicholas's extremes (sub-second answers, hour-long struggles) are NOT applied as one raw number. Each answer is normalized to a 0..1 speed score against its own kind's fast/slow marks, then averaged across the window. The reading pack calibrates: choice (2.5s / 15s), build-a-word (10s / 45s), timed flash (2.5s / 12s), story (30s / 90s). A future pack (say, Business) sets its own numbers for its own question kinds.

**Anti yo-yo rules.** A tier change needs a full 6-answer evaluation sample, then an 8-answer cooldown before the next change can fire, and the window resets after every move. Tiers clamp to 1..pack.tiers. Beasts enter the ladder at `beastStartTier` (tier 4 for reading) and adapt from there, keeping their double XP.

## The long ladder: grades 1 through college

The engine's difficulty scale is a LONG ladder, not a short one: 32 tiers, two per grade, from Grade 1 Early all the way to College Year 4 Late. The pack schema carries `tiers`, `tierLabel(tier)`, and per-tier content bands. Every content item (every generated question) is tagged with its tier (`q.tier`), and the adaptive engine moves players along the full ladder.

**Honest v1 scope.** v1 ships the complete ladder architecture plus a starter content set honestly authored for tiers 1-8 (about grades 1-4). Tiers above the authored content reuse the hardest available bank for their class, so the game stays playable and challenging while college-level content is written over time. When that content arrives, it slots into the existing bands with zero schema changes and zero engine changes.
