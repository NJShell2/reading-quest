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

## New-player onboarding (Prodigy-gap build, Oct 2026)

Implemented from `~/workspace/game-design/prodigy-opening-spec.md`, adapted (no accounts,
no purchases, no school mode, no ads). The exact new-player order:

1. **Title** with rotating loading tips (`pack.tips`, new tip every 4s).
2. **Full-screen theatrical story intro** (`engine/stage.js`, this game only):
   red velvet curtains OPEN on a painted night-sky backdrop (moon, tower,
   floating book) with a spotlight and wooden floor. Inkwell the owl guide
   and THE UNREADER move on stage and talk through three scenes: Night at
   the Tower (set the scene) -> The Unreader Strikes (villain confrontation,
   the page-tearing moment, pages scatter) -> The Quest (the quest call:
   **"Reclaim the Keystone Pages"**). Scripted dialogue beats with TTS
   voices, character entrances/exits, and a scene title card per scene.
   The dialogue is a testable state machine (`RQStage.createMachine`).
   First viewing plays through; replays get a visible Skip button.
   Completing or skipping saves `stageIntroSeen`, marks the guide met, and
   reveals the main quest, then flows into grade select.
3. **Grade select** (Grades 1-4): seeds every fresh hero's adaptive tier as
   `(grade-1)*2+1` (grade 1 -> tier 1, grade 2 -> tier 3, ...). The adaptive
   engine keeps working normally afterward.
4. **FREE Training Wand** gift from Bram the Shopkeep, with a Wear / Not now
   moment (Wear equips it, Not now puts it in the Backpack inventory).
5. **Scripted tutorial battle vs Mumblekit** (`pack.tutorialMonster`, a harmless
   baby Mumblemouth). An animated pointer guides every click, one mechanic at a
   time, in this exact order: spell card shows Power/Aim/Recharge stats ->
   click card (it enlarges) -> "Select a target" (click enemy) -> question
   appears -> correct answer fires the spell big -> enemy turn is a scripted
   miss/fumble -> "Out of Magic!" (cards grey out) -> pointer to the Meditate
   button -> answer to refill -> cast again -> Inkwell calls off the battle
   ("That's enough!") -> friendly auto-end. Wrong answers in the tutorial just
   re-ask; nothing is recorded to the adaptive engine during training.
6. **Victory screen guaranteeing level 2** (awards exactly enough XP) with a
   star-badge celebration, followed by a dedicated **rewards screen** (XP +
   coins).
7. **"Your Goals" panel auto-opens** after the tutorial: quest cards with the
   first marked complete and the rest to-do. (Quests toolbar button reopens it
   anytime.)
8. **Starter familiar choice**: 5 options (Pip the Bookmouse, Hoot the Letter
   Owl, Ripple the Inkfin, Ember the Storyspark, Nova the Starwhal), each card
   with art, rarity ribbon (Common/Uncommon/Rare), 4 stats
   (Power/Hearts/Magic/Speed), and "Add to Team". The chosen familiar is per
   hero and **evolves at hero level 7** (new name, art, and boosted stats).
   (The villain confrontation and quest call already played in the
   full-screen stage intro, so the chain continues straight to the rescue
   tutorial.)
9. **Rescue tutorial battle**: wild Bristleback (`pack.rescueMonster`). Weaken
    it below 30% HP -> a pulsing "RESCUE" paw badge appears -> panel shows
    rarity and "Owned: 0" -> Free -> light-column animation -> card with a
    "Rescued" stamp -> Claim -> added to the Petbook collection. The rescue
    mechanic is general: any monster flagged `rescuable` (Bristleback, Mire
    Moth, Sluggard) can be rescued the same way in normal battles.
10. **Wizard name picker**: adjective + noun dropdowns + Random button, with a
    "Don't choose your real name!" warning. Saved as `save.wizardName` and
    shown in the HUD portrait.
11. **World map with locked zones**: World 1 Whisperwood (boss MUMBLEMOUTH),
    World 2 Murkfen Marsh (boss WIPEOUT WRAITH, sight-words themed), World 3
    Gloomhollow (boss THE SLOWDOWN, fluency themed). Each world has 4 nodes +
    a boss node. World 2 unlocks when the World 1 boss falls, World 3 when the
    World 2 boss falls. Nodes unlock sequentially within a world. Each world
    shows % completion (nodes beaten / total).
12. **Quest chain intro**: story cards (what happened, what the pages do, your
    quest) plus a persistent **quest tracker banner** in the HUD showing the
    current objective ("Reclaim the Keystone Pages (n/3), Next: ...").

## Systems added with the onboarding build

- **Magic meter** (shared): `maxMagic = 100 + gear bonus`, refilled at the
  start of every battle. Spells cost magic (default 30, per-spell `sp.cost`).
  The **Meditate** button answers a question to refill: +45 magic if correct,
  +15 if not (meditating uses your turn). Spell cards grey out when
  unaffordable, with an "Out of Magic!" hint.
- **Spell card stats**: Power (estimated damage from `sp.mult`), Aim (default
  100), Recharge (cooldown turns, `sp.recharge`, default 2), and magic cost.
- **Goals engine**: `pack.goals` defines id/title/desc/optional gear reward;
  `save.goals` tracks done state. `completeGoal(id)` fires on game events
  (training done, name picked, familiar chosen, first rescue, 3 wins, each
  world boss). Gear rewards grant a Wear / Not now moment.
- **Gear + Backpack**: slots for wand, hat, garb, boots, ring. Gear defs carry
  power/hp/magic bonuses that feed `S.power` / `S.maxHp` / `S.maxMagic`.
  Starter set: Training Wand (gift), Training Cap (win 3 battles goal),
  Training Garb (Mumblemouth goal), Training Shoes (first rescue goal). The
  shop also sells a Riverstone Ring (+15 magic). Backpack screen shows gear
  slots, Wizard Stats (Hearts/Magic/Power), and inventory with Equip buttons.
- **Petbook (Familiars screen)**: collection grid with rarity ribbons,
  "Rescued" stamps, "New!" badges, evolved markers; set the active familiar
  per hero. The active familiar adds bonus damage in battle and a once-per-
  battle heal.
- **Hub NPCs**: Inkwell and Bram the Shopkeep with Talk buttons and rotating
  tip lines. Never-battled monsters show "New!" badges on the map.
- **Daily reward**: the HUD gift box pulses "Collect!" once per calendar day;
  claiming grants coins scaled by streak plus an occasional item. Streak
  resets if a day is missed.
- **Full HUD** on hub/map/shop/backpack/familiars: portrait (wizard name, hero
  icon, level badge, notification dot when a gift or goal reward is pending),
  quest tracker banner, coin counter, toolbar (Menu, Backpack, Familiars,
  Quests, Shop, Map), gift box.

## Save schema v3

Added: `wizardName`, `grade`, `onboardingDone`, `onboardingStep`, `guideMet`,
`wandGifted`, `goals[]`, `petbook[]`, `seenMonsters[]`,
`zones{zoneId:{unlocked,nodesBeaten[]}}`, `daily{lastClaim,streak}`,
`inventory[]`, `pendingGiftGear[]`, `quests{main}`, per-hero `familiar`
(object, replacing the old `familiarStage` egg pipeline) and per-hero
`gear{wand,hat,garb,boots,ring}`. Migration: v2 saves become v3 with
`onboardingDone=true`; legacy familiars (stage 2+) convert to chosen-familiar
objects in the petbook; `bossesBeaten` unlocks zones; goals backfill from
history. Old saves with no familiar get the choice UI on their next hub
visit. `addXp` now returns `{gained, evolvedFamiliar}` and evolves the active
familiar at hero level 7.
