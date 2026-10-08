/* ============================================================
   READING QUEST - Vocabulary content bank
   1000 choice questions, tiers 1-8 (125 per tier).
   PURE CONTENT: the engine never contains subject matter.
   Item: { qid, kind, tier, prompt, choices[4], answer }
   Registers as window.RQBank.vocabulary.
   ============================================================ */
(function () {
  "use strict";

  var ITEMS =   [
    {
      "qid": "rq-vocabulary-0001",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"brave\" mean?",
      "choices": [
        "not afraid",
        "a long way away",
        "going far down",
        "did not give away"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0002",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"happy\" mean?",
      "choices": [
        "full of light",
        "not bent",
        "not fresh",
        "feeling good"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0003",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"sad\" mean?",
      "choices": [
        "old and orange from water",
        "needs food",
        "paid money for",
        "feeling bad"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0004",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"big\" mean?",
      "choices": [
        "not sick",
        "large in size",
        "full of light",
        "with a thin edge"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0005",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"small\" mean?",
      "choices": [
        "high up",
        "seen again",
        "little in size",
        "not soft to touch"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0006",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"fast\" mean?",
      "choices": [
        "high up",
        "not hard to do",
        "has little money",
        "moving quickly"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0007",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"slow\" mean?",
      "choices": [
        "does not weigh much",
        "nice to look at",
        "moving little by little",
        "not wet"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0008",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"hot\" mean?",
      "choices": [
        "made right again",
        "very warm",
        "did not give away",
        "gave for money"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0009",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"cold\" mean?",
      "choices": [
        "needs rest",
        "very cool",
        "in pieces",
        "not tall"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0010",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"new\" mean?",
      "choices": [
        "nice to look at",
        "covered in water",
        "hard to find",
        "just made or bought"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0011",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"old\" mean?",
      "choices": [
        "made a long time ago",
        "acts like a friend",
        "not afraid",
        "needs rest"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0012",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"kind\" mean?",
      "choices": [
        "close to the ground",
        "nice to others",
        "gave for money",
        "little in size"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0013",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"loud\" mean?",
      "choices": [
        "weighs a lot",
        "making a lot of noise",
        "not bad",
        "not sick"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0014",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"quiet\" mean?",
      "choices": [
        "making little noise",
        "not flat",
        "not soft to touch",
        "likes to play"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0015",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"soft\" mean?",
      "choices": [
        "made right again",
        "acts like a friend",
        "not well",
        "not hard to touch"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0016",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"hard\" mean?",
      "choices": [
        "has a lot of power",
        "not tall",
        "not soft to touch",
        "in pieces"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0017",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"wet\" mean?",
      "choices": [
        "makes you afraid",
        "covered in water",
        "gave for money",
        "made a long time ago"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0018",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"dry\" mean?",
      "choices": [
        "not wet",
        "not smooth",
        "not short",
        "not wide"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0019",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"tall\" mean?",
      "choices": [
        "bright and glowing",
        "close by",
        "high up",
        "easy to see through"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0020",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"short\" mean?",
      "choices": [
        "not narrow",
        "kind and good",
        "not tall",
        "gone bad"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0021",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"long\" mean?",
      "choices": [
        "not short",
        "not bad",
        "hurts a little",
        "a little cold"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0022",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"round\" mean?",
      "choices": [
        "made a long time ago",
        "shaped like a ball",
        "does not like to work",
        "curved out of shape"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0023",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"full\" mean?",
      "choices": [
        "very cool",
        "up in the sky",
        "with nothing missing",
        "not flat"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0024",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"empty\" mean?",
      "choices": [
        "covered in dust",
        "needs rest",
        "with nothing inside",
        "not smooth"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0025",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"clean\" mean?",
      "choices": [
        "not hard to do",
        "not dirty",
        "large in size",
        "gave for money"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0026",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"sweet\" mean?",
      "choices": [
        "can not be found",
        "with a sharp end",
        "tastes like candy",
        "gave some to others"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0027",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"sour\" mean?",
      "choices": [
        "tastes like lemons",
        "makes you smile",
        "easy to see through",
        "handed to someone"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0028",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"fun\" mean?",
      "choices": [
        "makes you smile",
        "a little hot",
        "hurts a little",
        "kind and good"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0029",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"funny\" mean?",
      "choices": [
        "needs food",
        "thinks well",
        "makes you laugh",
        "before the right time"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0030",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"silly\" mean?",
      "choices": [
        "not soft to touch",
        "not bumpy",
        "funny in a goofy way",
        "curved out of shape"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0031",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"cute\" mean?",
      "choices": [
        "not bumpy",
        "funny in a goofy way",
        "a little hot",
        "nice to look at"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0032",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"glad\" mean?",
      "choices": [
        "large in size",
        "made by putting parts together",
        "moving quickly",
        "happy about something"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0033",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"angry\" mean?",
      "choices": [
        "very mad",
        "sleeping now",
        "bad to taste",
        "hurts a little"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0034",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"tired\" mean?",
      "choices": [
        "needs rest",
        "not good",
        "hard to find",
        "covered in water"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0035",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"hungry\" mean?",
      "choices": [
        "not dirty",
        "moving little by little",
        "needs food",
        "not sick"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0036",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"sleepy\" mean?",
      "choices": [
        "before the right time",
        "with a sharp end",
        "needs sleep",
        "close by"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0037",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"strong\" mean?",
      "choices": [
        "not strong",
        "has a lot of power",
        "thinks well",
        "a long way away"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0038",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"weak\" mean?",
      "choices": [
        "not strong",
        "carried away",
        "not wild",
        "gave for money"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0039",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"good\" mean?",
      "choices": [
        "not bent",
        "can not be found",
        "not bad",
        "before the right time"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0040",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"bad\" mean?",
      "choices": [
        "not good",
        "weighs a lot",
        "not wet",
        "does good for others"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0041",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"smart\" mean?",
      "choices": [
        "not rough",
        "thinks well",
        "new and clean",
        "with a sharp end"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0042",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"easy\" mean?",
      "choices": [
        "nice to look at",
        "not in danger",
        "not hard to do",
        "not afraid"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0043",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"pretty\" mean?",
      "choices": [
        "nice looking",
        "can not be found",
        "paid money for",
        "very warm"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0044",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"scary\" mean?",
      "choices": [
        "makes you afraid",
        "not open",
        "very cool",
        "shaped like a ball"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0045",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"safe\" mean?",
      "choices": [
        "not in danger",
        "very mad",
        "made right again",
        "makes you afraid"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0046",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"nice\" mean?",
      "choices": [
        "covered in mud",
        "nice looking",
        "kind and good",
        "a little cold"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0047",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"mean\" mean?",
      "choices": [
        "not nice",
        "with nothing missing",
        "up in the sky",
        "done fast"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0048",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"helpful\" mean?",
      "choices": [
        "does good for others",
        "very mad",
        "easy to see through",
        "close to the ground"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0049",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"lazy\" mean?",
      "choices": [
        "new and clean",
        "not rough",
        "happy about something",
        "does not like to work"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0050",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"busy\" mean?",
      "choices": [
        "has a lot to do",
        "tastes like candy",
        "hurts a little",
        "makes you afraid"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0051",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"quick\" mean?",
      "choices": [
        "kind and good",
        "done fast",
        "before the right time",
        "new and clean"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0052",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"late\" mean?",
      "choices": [
        "not tame",
        "good to eat",
        "not afraid",
        "not on time"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0053",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"early\" mean?",
      "choices": [
        "before the right time",
        "not bad",
        "tastes like lemons",
        "curved out of shape"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0054",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"fresh\" mean?",
      "choices": [
        "covered in dust",
        "new and clean",
        "making a lot of noise",
        "not sick"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0055",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"warm\" mean?",
      "choices": [
        "not afraid",
        "kind and good",
        "a little hot",
        "not straight"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0056",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"cool\" mean?",
      "choices": [
        "shaped like a ball",
        "liked a lot",
        "sticks to things",
        "a little cold"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0057",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"shiny\" mean?",
      "choices": [
        "shaped like a ball",
        "not thick",
        "not open",
        "bright and glowing"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0058",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"smooth\" mean?",
      "choices": [
        "not on time",
        "not rough",
        "feeling pain",
        "shaped like a ball"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0059",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"rough\" mean?",
      "choices": [
        "kind and good",
        "not smooth",
        "weighs a lot",
        "a long way away"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0060",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"sticky\" mean?",
      "choices": [
        "handed to someone",
        "up in the sky",
        "sticks to things",
        "covered in dust"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0061",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"bright\" mean?",
      "choices": [
        "good to eat",
        "full of light",
        "not bent",
        "not thin"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0062",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"dark\" mean?",
      "choices": [
        "needs food",
        "shaped like a ball",
        "not short",
        "with little light"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0063",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"clear\" mean?",
      "choices": [
        "easy to see through",
        "a little hot",
        "large in size",
        "done fast"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0064",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"heavy\" mean?",
      "choices": [
        "weighs a lot",
        "large in size",
        "new and clean",
        "not wild"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0065",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"light\" mean?",
      "choices": [
        "does not weigh much",
        "funny in a goofy way",
        "wished for",
        "little in size"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0066",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"thin\" mean?",
      "choices": [
        "not hard to touch",
        "not closed",
        "acts like a friend",
        "not thick"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0067",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"thick\" mean?",
      "choices": [
        "not sick",
        "can not be found",
        "makes you afraid",
        "not thin"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0068",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"wide\" mean?",
      "choices": [
        "happy about something",
        "nice to look at",
        "not old",
        "not narrow"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0069",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"narrow\" mean?",
      "choices": [
        "made right again",
        "gave for money",
        "not wide",
        "liked a lot"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0070",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"deep\" mean?",
      "choices": [
        "just made or bought",
        "not narrow",
        "going far down",
        "sleeping now"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0071",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"shallow\" mean?",
      "choices": [
        "makes you laugh",
        "not deep",
        "not bent",
        "ready to eat"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0072",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"high\" mean?",
      "choices": [
        "turned to ice",
        "with a sharp end",
        "up in the sky",
        "before the right time"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0073",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"low\" mean?",
      "choices": [
        "just made or bought",
        "close to the ground",
        "wished for",
        "not thick"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0074",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"near\" mean?",
      "choices": [
        "not narrow",
        "close by",
        "makes you laugh",
        "has a bad smell"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0075",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"far\" mean?",
      "choices": [
        "not deep",
        "shaped like a ball",
        "not rough",
        "a long way away"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0076",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"open\" mean?",
      "choices": [
        "a little cold",
        "new and clean",
        "curved out of shape",
        "not closed"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0077",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"closed\" mean?",
      "choices": [
        "not nice",
        "easy to see through",
        "not open",
        "a little cold"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0078",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"wild\" mean?",
      "choices": [
        "made right again",
        "not tame",
        "nice to others",
        "not thick"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0079",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"tame\" mean?",
      "choices": [
        "not flat",
        "hurts a little",
        "not wild",
        "not fresh"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0080",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"young\" mean?",
      "choices": [
        "not old",
        "makes a high noise",
        "not wet",
        "has a lot of power"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0081",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"rich\" mean?",
      "choices": [
        "not sick",
        "has a lot of money",
        "not narrow",
        "gave for money"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0082",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"poor\" mean?",
      "choices": [
        "happy about something",
        "not old",
        "had to have",
        "has little money"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0083",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"playful\" mean?",
      "choices": [
        "likes to play",
        "not flat",
        "very mad",
        "not fresh"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0084",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"friendly\" mean?",
      "choices": [
        "tastes like candy",
        "does not weigh much",
        "close to the ground",
        "acts like a friend"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0085",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"awake\" mean?",
      "choices": [
        "not asleep",
        "not straight",
        "not closed",
        "a long way away"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0086",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"asleep\" mean?",
      "choices": [
        "makes you laugh",
        "does good for others",
        "not deep",
        "sleeping now"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0087",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"thirsty\" mean?",
      "choices": [
        "can not be found",
        "needs a drink",
        "gave some to others",
        "with nothing missing"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0088",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"sick\" mean?",
      "choices": [
        "moving quickly",
        "does not like to work",
        "not afraid",
        "not well"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0089",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"well\" mean?",
      "choices": [
        "makes you laugh",
        "has a lot to do",
        "not sick",
        "not good"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0090",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"sore\" mean?",
      "choices": [
        "curved out of shape",
        "hurts a little",
        "a long way away",
        "carried away"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0091",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"ripe\" mean?",
      "choices": [
        "very mad",
        "makes you laugh",
        "ready to eat",
        "has a lot of money"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0092",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"rotten\" mean?",
      "choices": [
        "not in danger",
        "made right again",
        "gone bad",
        "up in the sky"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0093",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"stale\" mean?",
      "choices": [
        "not fresh",
        "bad to taste",
        "needs a drink",
        "turned to ice"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0094",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"broken\" mean?",
      "choices": [
        "acts like a friend",
        "in pieces",
        "seen again",
        "not thin"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0095",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"fixed\" mean?",
      "choices": [
        "high up",
        "full of light",
        "made right again",
        "new and clean"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0096",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"lost\" mean?",
      "choices": [
        "feeling pain",
        "not open",
        "can not be found",
        "large in size"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0097",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"found\" mean?",
      "choices": [
        "seen again",
        "tastes like lemons",
        "not old",
        "feeling good"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0098",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"hidden\" mean?",
      "choices": [
        "old and orange from water",
        "hard to find",
        "done fast",
        "acts like a friend"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0099",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"loved\" mean?",
      "choices": [
        "not open",
        "liked a lot",
        "not wild",
        "not tame"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0100",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"wanted\" mean?",
      "choices": [
        "not on time",
        "wished for",
        "not sharp",
        "happy about something"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0101",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"needed\" mean?",
      "choices": [
        "had to have",
        "nice to others",
        "not thick",
        "very cool"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0102",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"kept\" mean?",
      "choices": [
        "carried away",
        "not straight",
        "not sick",
        "did not give away"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0103",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"shared\" mean?",
      "choices": [
        "not well",
        "gave some to others",
        "not tame",
        "handed to someone"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0104",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"taken\" mean?",
      "choices": [
        "carried away",
        "turned to ice",
        "not on time",
        "making a lot of noise"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0105",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"given\" mean?",
      "choices": [
        "not narrow",
        "gone bad",
        "not bad",
        "handed to someone"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0106",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"bought\" mean?",
      "choices": [
        "old and orange from water",
        "paid money for",
        "not rough",
        "full of light"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0107",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"sold\" mean?",
      "choices": [
        "does not like to work",
        "making little noise",
        "not thick",
        "gave for money"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0108",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"built\" mean?",
      "choices": [
        "made by putting parts together",
        "with a very thin edge",
        "had to have it now",
        "feeling a lot of pain"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0109",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"bent\" mean?",
      "choices": [
        "curved out of shape",
        "made right again",
        "feeling pain",
        "makes you laugh"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0110",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"straight\" mean?",
      "choices": [
        "had to have",
        "does not like to work",
        "not bent",
        "making little noise"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0111",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"crooked\" mean?",
      "choices": [
        "liked a lot",
        "not straight",
        "little in size",
        "close by"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0112",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"flat\" mean?",
      "choices": [
        "not open",
        "not bumpy",
        "not hard to touch",
        "not tall"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0113",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"bumpy\" mean?",
      "choices": [
        "not flat",
        "going far down",
        "carried away",
        "seen again"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0114",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"pointy\" mean?",
      "choices": [
        "not wild",
        "with a sharp end",
        "with little light",
        "covered in mud"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0115",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"sharp\" mean?",
      "choices": [
        "full of light",
        "with a thin edge",
        "funny in a goofy way",
        "not narrow"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0116",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"dull\" mean?",
      "choices": [
        "new and clean",
        "not hard to do",
        "needs rest",
        "not sharp"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0117",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"rusty\" mean?",
      "choices": [
        "had to have",
        "large in size",
        "old and orange from water",
        "tastes like candy"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0118",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"squeaky\" mean?",
      "choices": [
        "not bent",
        "full of light",
        "makes a high noise",
        "covered in water"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0119",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"smelly\" mean?",
      "choices": [
        "not nice",
        "a long way away",
        "has a bad smell",
        "not on time"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0120",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"tasty\" mean?",
      "choices": [
        "good to eat",
        "new and clean",
        "not soft to touch",
        "made by putting parts together"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0121",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"yucky\" mean?",
      "choices": [
        "sleeping now",
        "covered in dust",
        "makes a high noise",
        "bad to taste"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0122",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"hurt\" mean?",
      "choices": [
        "not thin",
        "a little cold",
        "not wild",
        "feeling pain"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0123",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"muddy\" mean?",
      "choices": [
        "covered in mud",
        "not in danger",
        "covered in water",
        "not bad"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0124",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"dusty\" mean?",
      "choices": [
        "covered in dust",
        "close by",
        "nice to look at",
        "not straight"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0125",
      "kind": "choice",
      "tier": 1,
      "prompt": "What does \"frozen\" mean?",
      "choices": [
        "funny in a goofy way",
        "curved out of shape",
        "not sharp",
        "turned to ice"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0126",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"honest\" mean?",
      "choices": [
        "strong and steady",
        "gives to others freely",
        "now and then",
        "tells the truth"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0127",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"dishonest\" mean?",
      "choices": [
        "not special",
        "moving slow and low",
        "not real",
        "does not tell the truth"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0128",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"polite\" mean?",
      "choices": [
        "has good manners",
        "happens fast without warning",
        "crying and complaining",
        "not ever"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0129",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"rude\" mean?",
      "choices": [
        "looking quickly",
        "has bad manners",
        "tight and worried",
        "not upset"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0130",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"greedy\" mean?",
      "choices": [
        "not upset",
        "wants too much",
        "forgets things a lot",
        "on time"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0131",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"generous\" mean?",
      "choices": [
        "clean and in order",
        "gives to others freely",
        "does things with care",
        "does not behave"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0132",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"patient\" mean?",
      "choices": [
        "afraid to talk to people",
        "has bad manners",
        "waits without getting mad",
        "lasting a short time"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0133",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"impatient\" mean?",
      "choices": [
        "looking quickly",
        "feels bad about what was done",
        "not seen often",
        "does not like to wait"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0134",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"careful\" mean?",
      "choices": [
        "lasting a short time",
        "does things with care",
        "every year",
        "more than enough"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0135",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"careless\" mean?",
      "choices": [
        "seen a lot",
        "glad for what you have",
        "moving quietly in secret",
        "does not pay attention"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0136",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"calm\" mean?",
      "choices": [
        "not special",
        "letting out a long breath",
        "complaining in a low voice",
        "not upset"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0137",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"nervous\" mean?",
      "choices": [
        "making your body long",
        "cannot be used",
        "worried and shaky",
        "in a bad mood"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0138",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"excited\" mean?",
      "choices": [
        "very happy and full of energy",
        "every time",
        "moves in a pretty way",
        "done right away"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0139",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"bored\" mean?",
      "choices": [
        "happens fast without warning",
        "complaining in a low voice",
        "tired of doing nothing",
        "forgets things a lot"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0140",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"eager\" mean?",
      "choices": [
        "wants to do it now",
        "feels bad about what was done",
        "making a sad face",
        "wet from heat"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0141",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"shy\" mean?",
      "choices": [
        "moving quietly in secret",
        "not ever",
        "crying and complaining",
        "afraid to talk to people"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0142",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"bold\" mean?",
      "choices": [
        "drops and bumps things",
        "running as fast as you can",
        "not afraid to act",
        "gives to others freely"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0143",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"cheerful\" mean?",
      "choices": [
        "not serious",
        "not ready",
        "being brave",
        "happy and smiling"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0144",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"grumpy\" mean?",
      "choices": [
        "moving quietly in secret",
        "in a bad mood",
        "does not pay attention",
        "more than needed"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0145",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"lonely\" mean?",
      "choices": [
        "alone and sad",
        "walking back and forth",
        "not upset",
        "there now"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0146",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"proud\" mean?",
      "choices": [
        "more than enough",
        "moving on hands and knees",
        "feels good about what was done",
        "being brave"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0147",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"ashamed\" mean?",
      "choices": [
        "afraid to talk to people",
        "as much as needed",
        "alone and sad",
        "feels bad about what was done"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0148",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"thankful\" mean?",
      "choices": [
        "not ordinary",
        "glad for what you have",
        "walking back and forth",
        "not seen often"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0149",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"thoughtful\" mean?",
      "choices": [
        "making a happy face",
        "thinks of others",
        "seen a lot",
        "happy and smiling"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0150",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"forgetful\" mean?",
      "choices": [
        "forgets things a lot",
        "not fancy",
        "alone and sad",
        "complaining in a low voice"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0151",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"useful\" mean?",
      "choices": [
        "not there",
        "moving very fast",
        "can be used",
        "more than enough"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0152",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"useless\" mean?",
      "choices": [
        "waits without getting mad",
        "not ordinary",
        "cannot be used",
        "not serious"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0153",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"lucky\" mean?",
      "choices": [
        "not afraid to act",
        "strong and steady",
        "not true",
        "good things happen to them"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0154",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"unlucky\" mean?",
      "choices": [
        "not joking",
        "late to school",
        "complaining in a low voice",
        "bad things happen to them"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0155",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"clever\" mean?",
      "choices": [
        "tight and worried",
        "smart in a tricky way",
        "hardly ever",
        "afraid to talk to people"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0156",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"wise\" mean?",
      "choices": [
        "lasting a short time",
        "looking quickly",
        "smart from learning a lot",
        "hardly ever"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0157",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"foolish\" mean?",
      "choices": [
        "happy and smiling",
        "not smart",
        "waits without getting mad",
        "did not expect it"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0158",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"stubborn\" mean?",
      "choices": [
        "not joking",
        "will not change their mind",
        "forgets things a lot",
        "does not behave"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0159",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"obedient\" mean?",
      "choices": [
        "not ever",
        "walking with heavy steps",
        "does what they are told",
        "walking on your toes"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0160",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"naughty\" mean?",
      "choices": [
        "watching in secret",
        "does not behave",
        "letting out a long breath",
        "every day"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0161",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"graceful\" mean?",
      "choices": [
        "moving slow and low",
        "not joking",
        "moves in a pretty way",
        "seen a lot"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0162",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"clumsy\" mean?",
      "choices": [
        "lasting a short time",
        "sure about it",
        "what you expect",
        "drops and bumps things"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0163",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"sturdy\" mean?",
      "choices": [
        "thought it would happen",
        "every week",
        "strong and steady",
        "crying hard"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0164",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"flimsy\" mean?",
      "choices": [
        "many times",
        "weak and breaks easily",
        "wet from heat",
        "staring in anger"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0165",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"cozy\" mean?",
      "choices": [
        "did not expect it",
        "warm and comfy",
        "good things happen to them",
        "running fast"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0166",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"messy\" mean?",
      "choices": [
        "does things with care",
        "cannot be used",
        "not neat",
        "does not pay attention"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0167",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"neat\" mean?",
      "choices": [
        "smart in a tricky way",
        "watching in secret",
        "not seen often",
        "clean and in order"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0168",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"fancy\" mean?",
      "choices": [
        "does not tell the truth",
        "moves in a pretty way",
        "can be used",
        "very nice looking"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0169",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"plain\" mean?",
      "choices": [
        "not normal",
        "has good manners",
        "very happy and full of energy",
        "not fancy"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0170",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"common\" mean?",
      "choices": [
        "seen a lot",
        "strong and steady",
        "lasting a short time",
        "hardly ever"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0171",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"rare\" mean?",
      "choices": [
        "seen all the time",
        "talking big about yourself",
        "not seen often",
        "clean and in order"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0172",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"strange\" mean?",
      "choices": [
        "as much as needed",
        "not normal",
        "opening your mouth wide when tired",
        "does what they are told"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0173",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"normal\" mean?",
      "choices": [
        "feels good about what was done",
        "does not like to wait",
        "can be used",
        "the usual way"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0174",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"typical\" mean?",
      "choices": [
        "will not change their mind",
        "what you expect",
        "watching in secret",
        "tells the truth"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0175",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"special\" mean?",
      "choices": [
        "not ordinary",
        "more than needed",
        "wet from heat",
        "smart from learning a lot"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0176",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"ordinary\" mean?",
      "choices": [
        "did not expect it",
        "not special",
        "looking quickly",
        "glad for what you have"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0177",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"real\" mean?",
      "choices": [
        "walking with no plan",
        "not fake",
        "not seen often",
        "crying and complaining"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0178",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"fake\" mean?",
      "choices": [
        "smart from learning a lot",
        "thought it would happen",
        "not real",
        "has bad manners"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0179",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"true\" mean?",
      "choices": [
        "not false",
        "every year",
        "does not tell the truth",
        "does what they are told"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0180",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"false\" mean?",
      "choices": [
        "not true",
        "staring in anger",
        "done right away",
        "looking quickly"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0181",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"correct\" mean?",
      "choices": [
        "right",
        "not neat",
        "hardly ever",
        "not normal"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0182",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"wrong\" mean?",
      "choices": [
        "not right",
        "lasting a short time",
        "warm and comfy",
        "running as fast as you can"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0183",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"certain\" mean?",
      "choices": [
        "running fast",
        "more than needed",
        "not real",
        "sure about it"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0184",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"unsure\" mean?",
      "choices": [
        "watching in secret",
        "moving slow and low",
        "gives to others freely",
        "not sure"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0185",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"ready\" mean?",
      "choices": [
        "walking with heavy steps",
        "not ever",
        "set to go",
        "thought it would happen"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0186",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"unprepared\" mean?",
      "choices": [
        "staring in anger",
        "does what they are told",
        "right",
        "not ready"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0187",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"surprised\" mean?",
      "choices": [
        "every day",
        "did not expect it",
        "looking quickly",
        "on time"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0188",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"expected\" mean?",
      "choices": [
        "moving very fast",
        "set to go",
        "thought it would happen",
        "smart in a tricky way"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0189",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"sudden\" mean?",
      "choices": [
        "staring in anger",
        "not seen often",
        "happens fast without warning",
        "does things with care"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0190",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"daily\" mean?",
      "choices": [
        "walking in step",
        "every day",
        "every year",
        "on time"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0191",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"weekly\" mean?",
      "choices": [
        "every week",
        "shaking from cold",
        "alone and sad",
        "every day"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0192",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"yearly\" mean?",
      "choices": [
        "looking quickly",
        "every year",
        "tired of doing nothing",
        "making fun in play"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0193",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"rarely\" mean?",
      "choices": [
        "feels good about what was done",
        "right",
        "not very often",
        "can be used"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0194",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"often\" mean?",
      "choices": [
        "not upset",
        "tight and worried",
        "hardly ever",
        "many times"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0195",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"never\" mean?",
      "choices": [
        "walking with no plan",
        "being brave",
        "not ever",
        "not ready"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0196",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"always\" mean?",
      "choices": [
        "every time",
        "feels good about what was done",
        "sure about it",
        "moving slow and low"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0197",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"sometimes\" mean?",
      "choices": [
        "did not expect it",
        "now and then",
        "making your body long",
        "afraid to talk to people"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0198",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"seldom\" mean?",
      "choices": [
        "thinks of others",
        "every single day",
        "not ordinary",
        "hardly ever"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0199",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"brief\" mean?",
      "choices": [
        "crying hard",
        "walking with heavy steps",
        "lasting a short time",
        "drops and bumps things"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0200",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"lengthy\" mean?",
      "choices": [
        "not seen often",
        "not joking",
        "lasting a long time",
        "forgets things a lot"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0201",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"plenty\" mean?",
      "choices": [
        "more than enough",
        "warm and comfy",
        "moving quietly in secret",
        "happens fast without warning"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0202",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"scarce\" mean?",
      "choices": [
        "calm and at ease",
        "tight and worried",
        "not enough",
        "thinks of others"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0203",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"enough\" mean?",
      "choices": [
        "as much as needed",
        "laughing in a soft way",
        "does not like to wait",
        "not ordinary"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0204",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"extra\" mean?",
      "choices": [
        "complaining in a low voice",
        "moving very fast",
        "more than needed",
        "not ever"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0205",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"missing\" mean?",
      "choices": [
        "every day",
        "not neat",
        "not there",
        "worried and shaky"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0206",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"present\" mean?",
      "choices": [
        "there now",
        "done in a rush",
        "being brave",
        "lasting a short time"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0207",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"absent\" mean?",
      "choices": [
        "wants to do it now",
        "as much as needed",
        "not joking",
        "gone away"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0208",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"punctual\" mean?",
      "choices": [
        "making your body long",
        "on time",
        "moving slow and low",
        "did not expect it"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0209",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"tardy\" mean?",
      "choices": [
        "not ordinary",
        "lasting a long time",
        "gives to others freely",
        "late to school"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0210",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"prompt\" mean?",
      "choices": [
        "crying hard",
        "done right away",
        "calm and at ease",
        "thinks of others"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0211",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"hurried\" mean?",
      "choices": [
        "forgets things a lot",
        "done in a rush",
        "not neat",
        "calm and at ease"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0212",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"relaxed\" mean?",
      "choices": [
        "as much as needed",
        "not neat",
        "wants to do it now",
        "calm and at ease"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0213",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"tense\" mean?",
      "choices": [
        "tells the truth",
        "tight and worried",
        "what you expect",
        "opening your mouth wide when tired"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0214",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"serious\" mean?",
      "choices": [
        "not serious",
        "wants too much",
        "bad things happen to them",
        "not joking"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0215",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"joking\" mean?",
      "choices": [
        "not serious",
        "feels good about what was done",
        "lasting a long time",
        "shaking from cold"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0216",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"teasing\" mean?",
      "choices": [
        "making fun in play",
        "not enough",
        "wet from heat",
        "in a bad mood"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0217",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"bragging\" mean?",
      "choices": [
        "talking big about yourself",
        "laughing in a soft way",
        "alone and sad",
        "lasting a short time"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0218",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"whining\" mean?",
      "choices": [
        "crying and complaining",
        "hardly ever",
        "strong and steady",
        "looking quickly"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0219",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"grumbling\" mean?",
      "choices": [
        "going from place to place",
        "not true",
        "complaining in a low voice",
        "every week"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0220",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"giggling\" mean?",
      "choices": [
        "laughing in a soft way",
        "thinks of others",
        "tells the truth",
        "there now"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0221",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"chuckling\" mean?",
      "choices": [
        "not enough",
        "worried and shaky",
        "laughing quietly",
        "seen a lot"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0222",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"weeping\" mean?",
      "choices": [
        "moving on hands and knees",
        "has good manners",
        "crying hard",
        "looking in secret"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0223",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"sobbing\" mean?",
      "choices": [
        "does not like to wait",
        "walking back and forth",
        "there now",
        "crying with shaking"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0224",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"sighing\" mean?",
      "choices": [
        "letting out a long breath",
        "set to go",
        "forgets things a lot",
        "not afraid to act"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0225",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"yawning\" mean?",
      "choices": [
        "sure about it",
        "opening your mouth wide when tired",
        "set to go",
        "drops and bumps things"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0226",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"stretching\" mean?",
      "choices": [
        "making your body long",
        "warm and comfy",
        "does not tell the truth",
        "right"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0227",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"shivering\" mean?",
      "choices": [
        "shaking from cold",
        "wet from heat",
        "weak and breaks easily",
        "the usual way"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0228",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"sweating\" mean?",
      "choices": [
        "wet from heat",
        "crying and complaining",
        "has bad manners",
        "running slow and steady"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0229",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"blushing\" mean?",
      "choices": [
        "laughing quietly",
        "walking with no plan",
        "face turning red",
        "moving slow and low"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0230",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"frowning\" mean?",
      "choices": [
        "not ready",
        "what you expect",
        "making a sad face",
        "walking on your toes"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0231",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"smiling\" mean?",
      "choices": [
        "happens fast without warning",
        "making a happy face",
        "every week",
        "feels bad about what was done"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0232",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"glaring\" mean?",
      "choices": [
        "staring in anger",
        "does things with care",
        "smart in a tricky way",
        "face turning red"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0233",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"staring\" mean?",
      "choices": [
        "tight and worried",
        "looking quickly",
        "looking hard at something",
        "thought it would happen"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0234",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"glancing\" mean?",
      "choices": [
        "looking quickly",
        "smart in a tricky way",
        "does not pay attention",
        "not there"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0235",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"peeking\" mean?",
      "choices": [
        "done right away",
        "walking in step",
        "not neat",
        "looking in secret"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0236",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"spying\" mean?",
      "choices": [
        "watching in secret",
        "can be used",
        "opening your mouth wide when tired",
        "staring in anger"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0237",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"sneaking\" mean?",
      "choices": [
        "moving very fast",
        "moving quietly in secret",
        "crying and complaining",
        "not smart"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0238",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"creeping\" mean?",
      "choices": [
        "does not tell the truth",
        "not normal",
        "moving slow and low",
        "moving very fast"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0239",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"crawling\" mean?",
      "choices": [
        "moving on hands and knees",
        "can be used",
        "face turning red",
        "as much as needed"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0240",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"marching\" mean?",
      "choices": [
        "walking in step",
        "moves in a pretty way",
        "not sure",
        "not special"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0241",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"stomping\" mean?",
      "choices": [
        "now and then",
        "seen a lot",
        "walking with heavy steps",
        "worried and shaky"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0242",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"tiptoeing\" mean?",
      "choices": [
        "walking on your toes",
        "gone away",
        "not real",
        "very happy and full of energy"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0243",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"wandering\" mean?",
      "choices": [
        "lasting a long time",
        "drops and bumps things",
        "walking with no plan",
        "laughing quietly"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0244",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"roaming\" mean?",
      "choices": [
        "going from place to place",
        "not right",
        "happy and smiling",
        "opening your mouth wide when tired"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0245",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"rushing\" mean?",
      "choices": [
        "opening your mouth wide when tired",
        "tired of doing nothing",
        "moving very slowly",
        "moving very fast"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0246",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"dashing\" mean?",
      "choices": [
        "smart in a tricky way",
        "not ordinary",
        "running fast",
        "moving very fast"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0247",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"sprinting\" mean?",
      "choices": [
        "moves in a pretty way",
        "alone and sad",
        "running as fast as you can",
        "shaking from cold"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0248",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"jogging\" mean?",
      "choices": [
        "bad things happen to them",
        "does things with care",
        "running slow and steady",
        "happens fast without warning"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0249",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"pacing\" mean?",
      "choices": [
        "will not change their mind",
        "weak and breaks easily",
        "thinks of others",
        "walking back and forth"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0250",
      "kind": "choice",
      "tier": 2,
      "prompt": "What does \"bravery\" mean?",
      "choices": [
        "laughing in a soft way",
        "making a happy face",
        "lasting a short time",
        "being brave"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0251",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"gloomy\" mean?",
      "choices": [
        "slow and relaxed",
        "full of life",
        "dark and sad",
        "smooth and thick like cream"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0252",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"enormous\" mean?",
      "choices": [
        "warm and nice",
        "a little cold",
        "very, very big",
        "weak and old"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0253",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"tremendous\" mean?",
      "choices": [
        "short and strong",
        "tastes fresh and sharp",
        "very, very great",
        "very, very angry"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0254",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"minuscule\" mean?",
      "choices": [
        "very, very small",
        "giving off light",
        "very fierce",
        "smooth and shiny"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0255",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"colossal\" mean?",
      "choices": [
        "covered in snow",
        "very, very scared",
        "huge in size",
        "dark and gloomy"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0256",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"gigantic\" mean?",
      "choices": [
        "bright green",
        "tastes sharp like citrus",
        "really big",
        "smooth and thick like cream"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0257",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"massive\" mean?",
      "choices": [
        "worn by wind and rain",
        "strong and healthy",
        "bright green",
        "very big and heavy"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0258",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"miniature\" mean?",
      "choices": [
        "very small",
        "slow and lazy",
        "very fierce",
        "very unhappy"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0259",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"vast\" mean?",
      "choices": [
        "dirty with stuck-on dirt",
        "thin from hunger",
        "slow and lazy",
        "very wide and big"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0260",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"immense\" mean?",
      "choices": [
        "with strong bursts of wind",
        "too quick",
        "very, very large",
        "smells sweet"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0261",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"petite\" mean?",
      "choices": [
        "all the way wet",
        "very, very hot",
        "very, very dry",
        "small and pretty"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0262",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"puny\" mean?",
      "choices": [
        "feeling silly in front of others",
        "bright blue",
        "small and weak",
        "bright red"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0263",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"bulky\" mean?",
      "choices": [
        "warm and nice",
        "tastes like nothing",
        "giving off light",
        "big and hard to carry"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0264",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"hefty\" mean?",
      "choices": [
        "very, very small",
        "making you feel calm",
        "very fierce",
        "big and heavy"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0265",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"slender\" mean?",
      "choices": [
        "slow and lazy",
        "cool and fresh",
        "rough to touch",
        "thin in a nice way"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0266",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"lanky\" mean?",
      "choices": [
        "tall and thin",
        "full of energy",
        "with sharp points",
        "calm and peaceful"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0267",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"stocky\" mean?",
      "choices": [
        "all the way wet",
        "with sharp points",
        "short and strong",
        "makes noise when you bite"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0268",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"plump\" mean?",
      "choices": [
        "smells rotten",
        "very fierce",
        "a little bit fat",
        "afraid of losing what you have"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0269",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"gaunt\" mean?",
      "choices": [
        "thin from hunger",
        "dirty with stuck-on dirt",
        "bright and strong in color",
        "smooth and shiny"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0270",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"frail\" mean?",
      "choices": [
        "dark and gloomy",
        "tastes like nothing",
        "a little bit fat",
        "weak and easy to hurt"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0271",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"robust\" mean?",
      "choices": [
        "strong and healthy",
        "calm and peaceful",
        "afraid of losing what you have",
        "thin from hunger"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0272",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"vigorous\" mean?",
      "choices": [
        "small and pretty",
        "super happy",
        "full of energy",
        "a little bit fat"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0273",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"feeble\" mean?",
      "choices": [
        "weak and old",
        "very unhappy",
        "thin in a nice way",
        "worn by wind and rain"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0274",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"lively\" mean?",
      "choices": [
        "full of color and life",
        "feeling sick about something",
        "huge in size",
        "full of life"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0275",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"sluggish\" mean?",
      "choices": [
        "very, very great",
        "big and hard to carry",
        "all the way wet",
        "slow and lazy"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0276",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"brisk\" mean?",
      "choices": [
        "with a soft wind",
        "smells sweet",
        "quick and full of energy",
        "bright green"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0277",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"leisurely\" mean?",
      "choices": [
        "soft like velvet",
        "slow and relaxed",
        "makes noise when you bite",
        "bright blue"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0278",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"hasty\" mean?",
      "choices": [
        "too quick",
        "covered in snow",
        "not bright",
        "huge in size"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0279",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"thrilled\" mean?",
      "choices": [
        "bright and strong in color",
        "dull from age",
        "cold and without hope",
        "very, very excited"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0280",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"devastated\" mean?",
      "choices": [
        "very, very sad",
        "soft and full of air",
        "small and weak",
        "worn by wind and rain"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0281",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"furious\" mean?",
      "choices": [
        "very, very big",
        "very, very angry",
        "very, very large",
        "soft like velvet"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0282",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"terrified\" mean?",
      "choices": [
        "shining softly",
        "too quick",
        "very, very great",
        "very, very scared"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0283",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"delighted\" mean?",
      "choices": [
        "golden yellow",
        "very, very happy",
        "slow and relaxed",
        "deep red"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0284",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"astonished\" mean?",
      "choices": [
        "tastes like nothing",
        "soft and full of air",
        "very, very surprised",
        "tastes good, not sweet"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0285",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"disgusted\" mean?",
      "choices": [
        "very, very dry",
        "very, very small",
        "feeling sick about something",
        "wet in the air"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0286",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"embarrassed\" mean?",
      "choices": [
        "feeling silly in front of others",
        "perfect and like new",
        "bright green",
        "dirty with stuck-on dirt"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0287",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"envious\" mean?",
      "choices": [
        "small and pretty",
        "perfect and like new",
        "wanting what someone else has",
        "very, very happy"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0288",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"jealous\" mean?",
      "choices": [
        "thin in a nice way",
        "tastes good, not sweet",
        "afraid of losing what you have",
        "tastes sharp and not sweet"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0289",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"anxious\" mean?",
      "choices": [
        "soft and kind",
        "glad the worry is over",
        "worried about what is coming",
        "tall and thin"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0290",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"relieved\" mean?",
      "choices": [
        "smooth and shiny",
        "soft and caring",
        "very, very big",
        "glad the worry is over"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0291",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"content\" mean?",
      "choices": [
        "so bright it hurts your eyes",
        "golden yellow",
        "tastes sharp and not sweet",
        "happy with what you have"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0292",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"miserable\" mean?",
      "choices": [
        "very unhappy",
        "with no spots",
        "very, very excited",
        "perfect and like new"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0293",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"ecstatic\" mean?",
      "choices": [
        "shining on and off",
        "very bright in color",
        "with strong bursts of wind",
        "super happy"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0294",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"murky\" mean?",
      "choices": [
        "makes noise when you bite",
        "dark and hard to see through",
        "feeling silly in front of others",
        "feeling sick about something"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0295",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"dreary\" mean?",
      "choices": [
        "bright and strong in color",
        "perfect and like new",
        "huge in size",
        "dull and sad"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0296",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"bleak\" mean?",
      "choices": [
        "cold and without hope",
        "wild and cruel",
        "golden yellow",
        "wild and stormy"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0297",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"dismal\" mean?",
      "choices": [
        "dark and gloomy",
        "wanting what someone else has",
        "very, very dry",
        "really big"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0298",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"radiant\" mean?",
      "choices": [
        "bright and shining",
        "smells rotten",
        "tastes like nothing",
        "small and weak"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0299",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"luminous\" mean?",
      "choices": [
        "giving off light",
        "very, very angry",
        "tastes sharp like citrus",
        "dirty with stuck-on dirt"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0300",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"gleaming\" mean?",
      "choices": [
        "shining bright",
        "smells sweet",
        "very big and heavy",
        "perfect and like new"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0301",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"sparkling\" mean?",
      "choices": [
        "shining with little flashes",
        "very bright in color",
        "thin in a nice way",
        "showing love"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0302",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"glimmering\" mean?",
      "choices": [
        "shining softly",
        "very, very happy",
        "dull and sad",
        "tastes like nothing"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0303",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"flickering\" mean?",
      "choices": [
        "tastes sharp and not sweet",
        "tastes hot like pepper",
        "shining on and off",
        "weak and easy to hurt"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0304",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"dim\" mean?",
      "choices": [
        "soft and full of air",
        "not bright",
        "very, very hot",
        "makes noise when you bite"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0305",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"dazzling\" mean?",
      "choices": [
        "very happy and glad",
        "so bright it hurts your eyes",
        "soft and full of care",
        "wild and very cruel"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0306",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"vivid\" mean?",
      "choices": [
        "huge in size",
        "bright and strong in color",
        "very, very surprised",
        "showing love"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0307",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"vibrant\" mean?",
      "choices": [
        "golden yellow",
        "full of color and life",
        "too quick",
        "smells strong and sharp"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0308",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"pastel\" mean?",
      "choices": [
        "soft and sticky",
        "bright and strong in color",
        "all the way wet",
        "soft and light in color"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0309",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"neon\" mean?",
      "choices": [
        "bright green",
        "with a big storm",
        "very bright in color",
        "smells sweet"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0310",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"crimson\" mean?",
      "choices": [
        "deep red",
        "very, very dry",
        "full of color and life",
        "quiet and calm"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0311",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"scarlet\" mean?",
      "choices": [
        "bright red",
        "dull from age",
        "worried about what is coming",
        "tastes good, not sweet"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0312",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"azure\" mean?",
      "choices": [
        "huge in size",
        "bright blue",
        "strong and healthy",
        "full of color and life"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0313",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"emerald\" mean?",
      "choices": [
        "feeling sick about something",
        "bright green",
        "very dirty",
        "small and weak"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0314",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"amber\" mean?",
      "choices": [
        "wild and cruel",
        "very, very sad",
        "golden yellow",
        "calm and peaceful"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0315",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"ivory\" mean?",
      "choices": [
        "glad the worry is over",
        "creamy white",
        "very, very large",
        "very, very surprised"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0316",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"ebony\" mean?",
      "choices": [
        "giving off light",
        "tall and thin",
        "slow and lazy",
        "deep black"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0317",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"fragrant\" mean?",
      "choices": [
        "smells sweet",
        "weak and easy to hurt",
        "creamy white",
        "very, very sad"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0318",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"aromatic\" mean?",
      "choices": [
        "calm and peaceful",
        "smells nice and strong",
        "bright and shining",
        "dark and hard to see through"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0319",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"pungent\" mean?",
      "choices": [
        "cool and fresh",
        "smells strong and sharp",
        "tastes sharp like citrus",
        "deep red"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0320",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"musty\" mean?",
      "choices": [
        "smells old and damp",
        "showing love",
        "soft and full of air",
        "slow and relaxed"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0321",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"rancid\" mean?",
      "choices": [
        "smells rotten",
        "very small",
        "dirty with stuck-on dirt",
        "small and weak"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0322",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"savory\" mean?",
      "choices": [
        "soft like velvet",
        "super happy",
        "tastes good, not sweet",
        "afraid of losing what you have"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0323",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"bland\" mean?",
      "choices": [
        "dull and sad",
        "very wide and big",
        "tastes like nothing",
        "showing love"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0324",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"zesty\" mean?",
      "choices": [
        "tastes fresh and sharp",
        "perfect and like new",
        "full of energy",
        "dirty with stuck-on dirt"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0325",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"tangy\" mean?",
      "choices": [
        "golden yellow",
        "tastes sharp like citrus",
        "bright blue",
        "dull from age"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0326",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"bitter\" mean?",
      "choices": [
        "soft and caring",
        "tastes sharp and not sweet",
        "very fierce",
        "small and weak"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0327",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"spicy\" mean?",
      "choices": [
        "with strong bursts of wind",
        "tastes hot like pepper",
        "very wet and soft",
        "glad the worry is over"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0328",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"mild\" mean?",
      "choices": [
        "tastes good, not sweet",
        "dark and sad",
        "not strong in taste",
        "very, very great"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0329",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"creamy\" mean?",
      "choices": [
        "smooth and thick like cream",
        "small and weak",
        "wanting what someone else has",
        "very, very scared"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0330",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"crunchy\" mean?",
      "choices": [
        "quiet and calm",
        "strong and healthy",
        "makes noise when you bite",
        "cool and fresh"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0331",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"chewy\" mean?",
      "choices": [
        "needs lots of chewing",
        "very, very large",
        "big and heavy",
        "bright and shining"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0332",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"gooey\" mean?",
      "choices": [
        "soft and sticky",
        "so bright it hurts your eyes",
        "with no spots",
        "with a big storm"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0333",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"fluffy\" mean?",
      "choices": [
        "soft and full of air",
        "shining with little flashes",
        "needs lots of chewing",
        "worn by wind and rain"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0334",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"silky\" mean?",
      "choices": [
        "smooth like silk",
        "worn by wind and rain",
        "bright red",
        "with sharp points"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0335",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"velvety\" mean?",
      "choices": [
        "creamy white",
        "big and hard to carry",
        "very, very small",
        "soft like velvet"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0336",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"coarse\" mean?",
      "choices": [
        "full of energy",
        "tastes sharp like citrus",
        "giving off light",
        "rough to touch"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0337",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"jagged\" mean?",
      "choices": [
        "weak and easy to hurt",
        "quick and full of energy",
        "smells sweet",
        "with sharp points"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0338",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"sleek\" mean?",
      "choices": [
        "covered in ice",
        "dry like a desert",
        "very, very small",
        "smooth and shiny"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0339",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"polished\" mean?",
      "choices": [
        "very, very small",
        "feeling sick about something",
        "smooth and shiny from rubbing",
        "bright and shining"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0340",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"tarnished\" mean?",
      "choices": [
        "wild and stormy",
        "feeling silly in front of others",
        "dull from age",
        "bright red"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0341",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"weathered\" mean?",
      "choices": [
        "worn by wind and rain",
        "full of energy",
        "shining with little flashes",
        "happy with what you have"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0342",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"pristine\" mean?",
      "choices": [
        "perfect and like new",
        "thin from hunger",
        "full of peace",
        "full of energy"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0343",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"spotless\" mean?",
      "choices": [
        "with no spots",
        "giving off light",
        "full of peace",
        "tastes fresh and sharp"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0344",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"filthy\" mean?",
      "choices": [
        "very, very hot",
        "super happy",
        "shining softly",
        "very dirty"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0345",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"grimy\" mean?",
      "choices": [
        "very, very sad",
        "calm and peaceful",
        "dirty with stuck-on dirt",
        "very, very small"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0346",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"soggy\" mean?",
      "choices": [
        "very wet and soft",
        "very fierce",
        "smooth like silk",
        "with no spots"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0347",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"drenched\" mean?",
      "choices": [
        "very fierce",
        "showing love",
        "covered in ice",
        "all the way wet"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0348",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"parched\" mean?",
      "choices": [
        "rough to touch",
        "bright and strong in color",
        "so bright it hurts your eyes",
        "very, very dry"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0349",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"arid\" mean?",
      "choices": [
        "makes noise when you bite",
        "smells rotten",
        "dry like a desert",
        "very, very small"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0350",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"humid\" mean?",
      "choices": [
        "full of wild anger",
        "all the way wet",
        "wet in the air",
        "tastes good, not sweet"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0351",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"frigid\" mean?",
      "choices": [
        "very, very cold",
        "bright and strong in color",
        "smooth like silk",
        "with no spots"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0352",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"sweltering\" mean?",
      "choices": [
        "with strong bursts of wind",
        "very, very excited",
        "soft and caring",
        "very, very hot"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0353",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"balmy\" mean?",
      "choices": [
        "warm and nice",
        "making you feel calm",
        "very, very happy",
        "very wet and soft"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0354",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"crisp\" mean?",
      "choices": [
        "cool and fresh",
        "full of energy",
        "very, very scared",
        "quick and full of energy"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0355",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"chilly\" mean?",
      "choices": [
        "tastes sharp and not sweet",
        "very, very angry",
        "wild and cruel",
        "a little cold"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0356",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"frosty\" mean?",
      "choices": [
        "dark and sad",
        "covered in frost",
        "feeling silly in front of others",
        "showing love"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0357",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"icy\" mean?",
      "choices": [
        "covered in ice",
        "slow and relaxed",
        "very, very hot",
        "dull and sad"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0358",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"snowy\" mean?",
      "choices": [
        "perfect and like new",
        "soft and sticky",
        "covered in snow",
        "very, very great"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0359",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"stormy\" mean?",
      "choices": [
        "with a big storm",
        "cold and without hope",
        "soft and full of air",
        "feeling sick about something"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0360",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"breezy\" mean?",
      "choices": [
        "with strong bursts of wind",
        "with a soft wind",
        "shining with little flashes",
        "thin from hunger"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0361",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"gusty\" mean?",
      "choices": [
        "afraid of losing what you have",
        "bright and shining",
        "with strong bursts of wind",
        "cool and fresh"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0362",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"serene\" mean?",
      "choices": [
        "with a soft wind",
        "soft and light in color",
        "smooth and shiny from rubbing",
        "calm and peaceful"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0363",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"tranquil\" mean?",
      "choices": [
        "dull and sad",
        "strong and healthy",
        "making you feel calm",
        "quiet and calm"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0364",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"peaceful\" mean?",
      "choices": [
        "full of peace",
        "thin from hunger",
        "tastes sharp like citrus",
        "wet in the air"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0365",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"restful\" mean?",
      "choices": [
        "makes noise when you bite",
        "giving rest",
        "feeling sick about something",
        "short and strong"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0366",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"soothing\" mean?",
      "choices": [
        "making you feel calm",
        "short and strong",
        "very bright in color",
        "smooth and shiny"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0367",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"turbulent\" mean?",
      "choices": [
        "wild and stormy",
        "smooth and thick like cream",
        "with a soft wind",
        "slow and relaxed"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0368",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"raging\" mean?",
      "choices": [
        "dirty with stuck-on dirt",
        "full of life",
        "dark and hard to see through",
        "full of wild anger"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0369",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"fierce\" mean?",
      "choices": [
        "wild and stormy",
        "with a soft wind",
        "cold and without hope",
        "strong and scary"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0370",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"ferocious\" mean?",
      "choices": [
        "bright and shining",
        "very wide and big",
        "very, very sad",
        "very fierce"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0371",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"savage\" mean?",
      "choices": [
        "giving rest",
        "wild and cruel",
        "bright blue",
        "very fierce"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0372",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"gentle\" mean?",
      "choices": [
        "afraid of losing what you have",
        "shining with little flashes",
        "cold and without hope",
        "soft and kind"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0373",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"tender\" mean?",
      "choices": [
        "golden yellow",
        "tastes like nothing",
        "shining on and off",
        "soft and caring"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0374",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"affectionate\" mean?",
      "choices": [
        "a little bit fat",
        "super happy",
        "very, very surprised",
        "showing love"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0375",
      "kind": "choice",
      "tier": 3,
      "prompt": "What does \"fond\" mean?",
      "choices": [
        "covered in frost",
        "liking a lot",
        "bright blue",
        "with a big storm"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0376",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"unhappy\" mean?",
      "choices": [
        "one hundred",
        "a pair",
        "not happy",
        "act badly"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0377",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"unfair\" mean?",
      "choices": [
        "where two sides meet",
        "in the middle of two",
        "not fit",
        "not fair"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0378",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"untrue\" mean?",
      "choices": [
        "not to like",
        "being dark",
        "not true",
        "being strong"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0379",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"unkind\" mean?",
      "choices": [
        "not kind",
        "not safe",
        "the part that faces forward",
        "tell again"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0380",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"unsafe\" mean?",
      "choices": [
        "the finish",
        "with each other",
        "not safe",
        "touching and pushing"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0381",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"unusual\" mean?",
      "choices": [
        "not usual",
        "in the inner part",
        "being warm",
        "twenty of something"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0382",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"uncommon\" mean?",
      "choices": [
        "judge wrongly",
        "one hundred",
        "not common",
        "being cold"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0383",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"unsteady\" mean?",
      "choices": [
        "not steady",
        "being kind",
        "the far side",
        "inside of"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0384",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"uneven\" mean?",
      "choices": [
        "not even",
        "beside and moving with",
        "inside of",
        "being brave in fear"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0385",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"unfit\" mean?",
      "choices": [
        "not fit",
        "play again",
        "with others around",
        "under"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0386",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"unaware\" mean?",
      "choices": [
        "not at either end",
        "not to agree",
        "not inside",
        "not knowing"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0387",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"uncertain\" mean?",
      "choices": [
        "not here",
        "the lowest part",
        "not sure",
        "being rough"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0388",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"undecided\" mean?",
      "choices": [
        "where two sides meet",
        "past",
        "write again",
        "not yet decided"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0389",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"undone\" mean?",
      "choices": [
        "not steady",
        "twelve of something",
        "not done",
        "not tied"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0390",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"unfinished\" mean?",
      "choices": [
        "being wise",
        "the finish",
        "being late",
        "not finished"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0391",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"untouched\" mean?",
      "choices": [
        "go out of sight",
        "not touched",
        "being strong",
        "being sweet"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0392",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"unopened\" mean?",
      "choices": [
        "not to trust",
        "not opened",
        "the part behind",
        "not sure"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0393",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"unlocked\" mean?",
      "choices": [
        "not finished",
        "on all sides",
        "not locked",
        "the part behind"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0394",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"unplugged\" mean?",
      "choices": [
        "not plugged in",
        "not here",
        "look at before",
        "being soft"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0395",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"unbuttoned\" mean?",
      "choices": [
        "from one side to the other",
        "get the wrong meaning",
        "not buttoned",
        "with each other"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0396",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"untied\" mean?",
      "choices": [
        "not steady",
        "do again",
        "not to obey",
        "not tied"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0397",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"unwrapped\" mean?",
      "choices": [
        "being dark",
        "not usual",
        "telling the truth",
        "not wrapped"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0398",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"uncovered\" mean?",
      "choices": [
        "pay before",
        "not covered",
        "the top of something",
        "way in"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0399",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"dislike\" mean?",
      "choices": [
        "being bitter",
        "not to like",
        "not yet decided",
        "the finish"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0400",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"disagree\" mean?",
      "choices": [
        "not kind",
        "not knowing",
        "twelve of something",
        "not to agree"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0401",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"disobey\" mean?",
      "choices": [
        "being dark",
        "not to obey",
        "shame from bad acts",
        "put in the wrong place"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0402",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"disappear\" mean?",
      "choices": [
        "being loud",
        "not touched",
        "go out of sight",
        "the part behind"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0403",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"discourage\" mean?",
      "choices": [
        "going in one side and out the other",
        "the lowest part",
        "not done",
        "take away hope"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0404",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"dishonor\" mean?",
      "choices": [
        "not even",
        "count again",
        "shame from bad acts",
        "underneath"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0405",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"disrespect\" mean?",
      "choices": [
        "feeling happy",
        "not to trust",
        "not showing respect",
        "not true"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0406",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"misspell\" mean?",
      "choices": [
        "school before kindergarten",
        "spell the wrong way",
        "not happy",
        "shame from bad acts"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0407",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"misplace\" mean?",
      "choices": [
        "not together",
        "being late",
        "put in the wrong place",
        "fill again"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0408",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"misunderstand\" mean?",
      "choices": [
        "spell the wrong way",
        "heat again",
        "the far side",
        "get the wrong meaning"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0409",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"misbehave\" mean?",
      "choices": [
        "act badly",
        "going in one side and out the other",
        "spell the wrong way",
        "under"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0410",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"mistrust\" mean?",
      "choices": [
        "feeling sad",
        "touching and pushing",
        "being clean",
        "not to trust"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0411",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"misjudge\" mean?",
      "choices": [
        "judge wrongly",
        "done alone",
        "open again",
        "not wrapped"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0412",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"reopen\" mean?",
      "choices": [
        "being rough",
        "open again",
        "build again",
        "way out"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0413",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"rewrite\" mean?",
      "choices": [
        "write again",
        "being quick",
        "not inside",
        "in the middle of two"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0414",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"rebuild\" mean?",
      "choices": [
        "being strong",
        "not at either end",
        "build again",
        "being clean"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0415",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"replay\" mean?",
      "choices": [
        "one hundred",
        "tell again",
        "play again",
        "not the front or back"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0416",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"retell\" mean?",
      "choices": [
        "where two sides meet",
        "not inside",
        "tell again",
        "not true"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0417",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"redo\" mean?",
      "choices": [
        "one hundred",
        "do again",
        "being bitter",
        "a group of three"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0418",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"reheat\" mean?",
      "choices": [
        "heat again",
        "the middle point",
        "one thousand",
        "judge wrongly"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0419",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"refill\" mean?",
      "choices": [
        "not yet decided",
        "build again",
        "fill again",
        "one hundred"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0420",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"recount\" mean?",
      "choices": [
        "the far side",
        "count again",
        "being grown up",
        "being rich"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0421",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"review\" mean?",
      "choices": [
        "not fair",
        "from one side to the other",
        "not done",
        "look over again"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0422",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"preview\" mean?",
      "choices": [
        "look at before",
        "feeling sad",
        "not showing respect",
        "not kind"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0423",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"preheat\" mean?",
      "choices": [
        "being bitter",
        "heat before cooking",
        "the far side",
        "not fair"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0424",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"prepay\" mean?",
      "choices": [
        "a pair",
        "over the top of",
        "not inside",
        "pay before"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0425",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"preschool\" mean?",
      "choices": [
        "school before kindergarten",
        "look at before",
        "being quick",
        "the middle point"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0426",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"kindness\" mean?",
      "choices": [
        "being kind",
        "being brave in fear",
        "the finish",
        "touching and pushing"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0427",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"honesty\" mean?",
      "choices": [
        "not showing respect",
        "being weak",
        "telling the truth",
        "not opened"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0428",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"friendship\" mean?",
      "choices": [
        "school before kindergarten",
        "being quick",
        "being friends",
        "not fair"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0429",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"freedom\" mean?",
      "choices": [
        "being free",
        "shame from bad acts",
        "not plugged in",
        "the lowest part"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0430",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"wisdom\" mean?",
      "choices": [
        "way out",
        "being wise",
        "inside of",
        "on top of"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0431",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"courage\" mean?",
      "choices": [
        "not to obey",
        "being brave in fear",
        "the top of something",
        "not true"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0432",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"strength\" mean?",
      "choices": [
        "twelve of something",
        "feeling happy",
        "the start",
        "being strong"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0433",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"weakness\" mean?",
      "choices": [
        "not to like",
        "not to trust",
        "being weak",
        "one hundred"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0434",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"sadness\" mean?",
      "choices": [
        "under",
        "a group of three",
        "feeling sad",
        "spell the wrong way"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0435",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"happiness\" mean?",
      "choices": [
        "not common",
        "not opened",
        "being grown up",
        "feeling happy"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0436",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"darkness\" mean?",
      "choices": [
        "not fair",
        "not safe",
        "being dark",
        "play again"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0437",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"brightness\" mean?",
      "choices": [
        "being rough",
        "being bright",
        "being strong",
        "the part that faces forward"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0438",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"warmth\" mean?",
      "choices": [
        "being warm",
        "not tied",
        "not opened",
        "act badly"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0439",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"coldness\" mean?",
      "choices": [
        "not even",
        "not having",
        "being cold",
        "not locked"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0440",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"softness\" mean?",
      "choices": [
        "one hundred",
        "being quiet",
        "tell again",
        "being soft"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0441",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"roughness\" mean?",
      "choices": [
        "one hundred",
        "way out",
        "being soft",
        "being rough"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0442",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"sweetness\" mean?",
      "choices": [
        "not usual",
        "being bright",
        "not kind",
        "being sweet"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0443",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"bitterness\" mean?",
      "choices": [
        "being rich",
        "on the subject of",
        "being fresh",
        "being bitter"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0444",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"freshness\" mean?",
      "choices": [
        "with others around",
        "being fresh",
        "not showing respect",
        "not fit"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0445",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"cleanliness\" mean?",
      "choices": [
        "leaving a place",
        "not true",
        "going in the direction of",
        "being clean"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0446",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"loudness\" mean?",
      "choices": [
        "being cold",
        "heat again",
        "not to trust",
        "being loud"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0447",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"quietness\" mean?",
      "choices": [
        "on top of",
        "being quiet",
        "beside and moving with",
        "going in the direction of"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0448",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"quickness\" mean?",
      "choices": [
        "not having",
        "not true",
        "being quick",
        "leaving a place"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0449",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"slowness\" mean?",
      "choices": [
        "past",
        "not showing respect",
        "being slow",
        "twelve of something"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0450",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"lateness\" mean?",
      "choices": [
        "being late",
        "put in the wrong place",
        "not covered",
        "the finish"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0451",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"richness\" mean?",
      "choices": [
        "being rich",
        "count again",
        "the part that faces forward",
        "not true"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0452",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"arrival\" mean?",
      "choices": [
        "a pair",
        "coming to a place",
        "not opened",
        "being dark"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0453",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"departure\" mean?",
      "choices": [
        "tell again",
        "not to like",
        "leaving a place",
        "not opened"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0454",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"entrance\" mean?",
      "choices": [
        "way in",
        "not at either end",
        "not to trust",
        "being bright"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0455",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"exit\" mean?",
      "choices": [
        "on top of",
        "on all sides",
        "being wise",
        "way out"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0456",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"beginning\" mean?",
      "choices": [
        "the start",
        "school before kindergarten",
        "the part behind",
        "in the middle of two"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0457",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"ending\" mean?",
      "choices": [
        "shame from bad acts",
        "not happy",
        "twenty of something",
        "the finish"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0458",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"middle\" mean?",
      "choices": [
        "not at either end",
        "not sure",
        "touching and pushing",
        "act badly"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0459",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"edge\" mean?",
      "choices": [
        "not buttoned",
        "not showing respect",
        "tell again",
        "the far side"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0460",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"center\" mean?",
      "choices": [
        "the middle point",
        "not covered",
        "in the inner part",
        "done alone"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0461",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"corner\" mean?",
      "choices": [
        "heat before cooking",
        "where two sides meet",
        "a group of four",
        "the part that faces forward"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0462",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"surface\" mean?",
      "choices": [
        "one hundred",
        "the part that faces forward",
        "being brave in fear",
        "the top of something"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0463",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"bottom\" mean?",
      "choices": [
        "the highest part",
        "with each other",
        "not inside",
        "the lowest part"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0464",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"top\" mean?",
      "choices": [
        "the middle point",
        "get the wrong meaning",
        "the bottom part",
        "the highest part"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0465",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"side\" mean?",
      "choices": [
        "from one side to the other",
        "not the front or back",
        "write again",
        "school before kindergarten"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0466",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"front\" mean?",
      "choices": [
        "the way that is out",
        "all by yourself",
        "the part that faces forward",
        "on every single side"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0467",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"back\" mean?",
      "choices": [
        "not fair",
        "the part behind",
        "not to obey",
        "being a kid"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0468",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"inside\" mean?",
      "choices": [
        "in the inner part",
        "being cold",
        "not having",
        "not even"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0469",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"outside\" mean?",
      "choices": [
        "not wrapped",
        "not inside",
        "leaving a place",
        "take away hope"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0470",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"above\" mean?",
      "choices": [
        "being kind",
        "over the top of",
        "not yet decided",
        "being sweet"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0471",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"below\" mean?",
      "choices": [
        "the start",
        "under",
        "not fair",
        "not sure"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0472",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"beneath\" mean?",
      "choices": [
        "not yet decided",
        "coming to a place",
        "the far side",
        "underneath"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0473",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"beyond\" mean?",
      "choices": [
        "past",
        "being quick",
        "being bright",
        "not here"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0474",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"between\" mean?",
      "choices": [
        "being cold",
        "in the middle of two",
        "being grown up",
        "being dark"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0475",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"among\" mean?",
      "choices": [
        "not kind",
        "being quick",
        "with others around",
        "not even"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0476",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"against\" mean?",
      "choices": [
        "not buttoned",
        "not common",
        "inside of",
        "touching and pushing"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0477",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"along\" mean?",
      "choices": [
        "not inside",
        "beside and moving with",
        "being grown up",
        "heat again"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0478",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"across\" mean?",
      "choices": [
        "telling it all again",
        "from one side to the other",
        "being very strong",
        "being really slow"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0479",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"through\" mean?",
      "choices": [
        "counting it all again",
        "went past it all",
        "going in one side and out the other",
        "being very free"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0480",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"around\" mean?",
      "choices": [
        "on all sides",
        "being friends",
        "the lowest part",
        "a group of four"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0481",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"about\" mean?",
      "choices": [
        "being fresh",
        "not tied",
        "on the subject of",
        "twenty of something"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0482",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"over\" mean?",
      "choices": [
        "on top of",
        "underneath",
        "way in",
        "past"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0483",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"within\" mean?",
      "choices": [
        "pay before",
        "inside of",
        "the part behind",
        "under"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0484",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"without\" mean?",
      "choices": [
        "not to agree",
        "fill again",
        "not safe",
        "not having"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0485",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"toward\" mean?",
      "choices": [
        "up on the very top",
        "not sure at all",
        "going in the direction of",
        "the side far away"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0486",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"away\" mean?",
      "choices": [
        "under",
        "coming to a place",
        "not here",
        "judge wrongly"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0487",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"apart\" mean?",
      "choices": [
        "not together",
        "not to like",
        "open again",
        "twelve of something"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0488",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"together\" mean?",
      "choices": [
        "being grown up",
        "feeling sad",
        "not here",
        "with each other"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0489",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"alone\" mean?",
      "choices": [
        "by yourself",
        "with a friend",
        "underneath",
        "take away hope"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0490",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"solo\" mean?",
      "choices": [
        "done alone",
        "being a kid",
        "being quiet",
        "way out"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0491",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"duo\" mean?",
      "choices": [
        "get the wrong meaning",
        "way in",
        "a pair",
        "act badly"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0492",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"trio\" mean?",
      "choices": [
        "the part that faces forward",
        "being cold",
        "not the front or back",
        "a group of three"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0493",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"quartet\" mean?",
      "choices": [
        "way in",
        "with others around",
        "a group of four",
        "being cold"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0494",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"dozen\" mean?",
      "choices": [
        "on the subject of",
        "tell again",
        "twelve of something",
        "being cold"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0495",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"score\" mean?",
      "choices": [
        "spell the wrong way",
        "twenty of something",
        "being bitter",
        "under"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0496",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"hundred\" mean?",
      "choices": [
        "being warm",
        "not common",
        "fill again",
        "ten tens"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0497",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"thousand\" mean?",
      "choices": [
        "with each other",
        "the start",
        "ten hundreds",
        "one who helps"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0498",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"childhood\" mean?",
      "choices": [
        "the finish",
        "being wise",
        "judge wrongly",
        "being a kid"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0499",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"adulthood\" mean?",
      "choices": [
        "being grown up",
        "not inside",
        "in the middle of two",
        "not opened"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0500",
      "kind": "choice",
      "tier": 4,
      "prompt": "What does \"helper\" mean?",
      "choices": [
        "being sweet",
        "not touched",
        "the top of something",
        "one who helps"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0501",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"fragile\" mean?",
      "choices": [
        "breaks easily",
        "wants to learn more",
        "where a river meets the sea",
        "a wise teacher"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0502",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"curious\" mean?",
      "choices": [
        "a job you must do right",
        "old but still cool",
        "wants to learn more",
        "learning from a master"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0503",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"durable\" mean?",
      "choices": [
        "special acts for an event",
        "a fun fair with rides",
        "lasts a long time",
        "a stream feeding a river"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0504",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"portable\" mean?",
      "choices": [
        "where a river meets the sea",
        "always good",
        "a small promise between friends",
        "easy to carry"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0505",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"flexible\" mean?",
      "choices": [
        "the power to think",
        "does it for fun, not pay",
        "the very best at it",
        "bends without breaking"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0506",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"rigid\" mean?",
      "choices": [
        "does not bend",
        "bends without breaking",
        "quick and light in moving",
        "a big fun gathering"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0507",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"elastic\" mean?",
      "choices": [
        "stretches and snaps back",
        "a deep narrow valley",
        "a strong tie",
        "what you point at"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0508",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"brittle\" mean?",
      "choices": [
        "joined together",
        "a person who studies a lot",
        "what your family hands down",
        "breaks into pieces easily"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0509",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"delicate\" mean?",
      "choices": [
        "the way to go",
        "easy to break or hurt",
        "a written promise",
        "the very best at it"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0510",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"resilient\" mean?",
      "choices": [
        "what is left behind",
        "family",
        "popular right now",
        "bounces back after trouble"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0511",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"adaptable\" mean?",
      "choices": [
        "changes to fit new things",
        "low land between hills",
        "no longer used",
        "a job you must do right"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0512",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"versatile\" mean?",
      "choices": [
        "the reason it exists",
        "good at many things",
        "very simple and early",
        "moves fast and easy"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0513",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"nimble\" mean?",
      "choices": [
        "a group of islands",
        "quick and light in moving",
        "a wise teacher",
        "learning from a master"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0514",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"agile\" mean?",
      "choices": [
        "moves fast and easy",
        "an important job",
        "low land between hills",
        "a job to do"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0515",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"dexterous\" mean?",
      "choices": [
        "a group of islands",
        "one part of a chain",
        "what you must do",
        "good with the hands"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0516",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"awkward\" mean?",
      "choices": [
        "not smooth in moving",
        "a small calm bay",
        "good for a long time",
        "good at inventing"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0517",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"elegant\" mean?",
      "choices": [
        "a small calm bay",
        "where streets cross",
        "pretty and graceful",
        "always good"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0518",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"refined\" mean?",
      "choices": [
        "the usual way of a people",
        "a big street",
        "polished and classy",
        "what you shoot for"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0519",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"crude\" mean?",
      "choices": [
        "an open square in town",
        "popular right now",
        "rough and not finished",
        "a serious promise"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0520",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"primitive\" mean?",
      "choices": [
        "easy to carry",
        "the one who gets it next",
        "an open square in town",
        "very simple and early"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0521",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"modern\" mean?",
      "choices": [
        "thinking things through",
        "a link between things",
        "a deep narrow valley",
        "of today"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0522",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"antique\" mean?",
      "choices": [
        "a way to walk",
        "where a river meets the sea",
        "a link between things",
        "very old and worth keeping"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0523",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"vintage\" mean?",
      "choices": [
        "too old to use",
        "old but still cool",
        "a person who studies a lot",
        "the usual way of a people"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0524",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"classic\" mean?",
      "choices": [
        "a wide street",
        "good for a long time",
        "land at a river's mouth",
        "quick and light in moving"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0525",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"timeless\" mean?",
      "choices": [
        "where a river meets the sea",
        "does it for pay",
        "saying you will do it",
        "always good"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0526",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"trendy\" mean?",
      "choices": [
        "does not bend",
        "changes to fit new things",
        "a person who studies a lot",
        "popular right now"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0527",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"obsolete\" mean?",
      "choices": [
        "no longer used",
        "polished and classy",
        "a big fun gathering",
        "quick and light in moving"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0528",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"outdated\" mean?",
      "choices": [
        "what you plan to do",
        "a way around",
        "too old to use",
        "rough and not finished"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0529",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"innovative\" mean?",
      "choices": [
        "new and smart",
        "breaks easily",
        "moves fast and easy",
        "a path through wild land"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0530",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"creative\" mean?",
      "choices": [
        "a fun fair with rides",
        "makes new things",
        "family from long ago",
        "knows a lot about one thing"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0531",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"inventive\" mean?",
      "choices": [
        "land at a river's mouth",
        "good at inventing",
        "what is done every time",
        "a way around"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0532",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"resourceful\" mean?",
      "choices": [
        "a stream feeding a river",
        "finds a way with what is there",
        "part of your family",
        "people marching in a line"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0533",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"ingenious\" mean?",
      "choices": [
        "very smart and new",
        "what you plan to do",
        "where a river meets the sea",
        "thinking things through"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0534",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"brilliant\" mean?",
      "choices": [
        "a gathering with games and food",
        "a serious promise",
        "very, very smart",
        "a narrow street"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0535",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"gifted\" mean?",
      "choices": [
        "too old to use",
        "a narrow street",
        "born with talent",
        "a small road"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0536",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"talented\" mean?",
      "choices": [
        "very good at something",
        "good from practice",
        "bounces back after trouble",
        "a way around"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0537",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"skilled\" mean?",
      "choices": [
        "good from practice",
        "learning from a master",
        "what your family hands down",
        "an open square in town"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0538",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"expert\" mean?",
      "choices": [
        "knows a lot about one thing",
        "very simple and early",
        "very, very smart",
        "low land between hills"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0539",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"novice\" mean?",
      "choices": [
        "not smooth in moving",
        "breaks into pieces easily",
        "new at something",
        "a ring-shaped island"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0540",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"amateur\" mean?",
      "choices": [
        "knows a lot about one thing",
        "too old to use",
        "does it for fun, not pay",
        "the power to think"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0541",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"professional\" mean?",
      "choices": [
        "easy to carry",
        "quick and light in moving",
        "new and smart",
        "does it for pay"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0542",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"master\" mean?",
      "choices": [
        "a small promise between friends",
        "the very best at it",
        "easy to carry",
        "an open square in town"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0543",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"apprentice\" mean?",
      "choices": [
        "the pointed top",
        "the goal",
        "learning from a master",
        "where a river meets the sea"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0544",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"mentor\" mean?",
      "choices": [
        "good from practice",
        "finds a way with what is there",
        "an important job",
        "a wise teacher"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0545",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"prodigy\" mean?",
      "choices": [
        "good at lots of things",
        "a kid who is amazing at something",
        "the best one of all",
        "what you have to do"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0546",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"genius\" mean?",
      "choices": [
        "a big fun gathering",
        "makes new things",
        "of today",
        "super smart person"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0547",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"scholar\" mean?",
      "choices": [
        "the reason why",
        "a link between things",
        "a person who studies a lot",
        "born with talent"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0548",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"intellect\" mean?",
      "choices": [
        "does not bend",
        "the usual way of a people",
        "a narrow street",
        "the power to think"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0549",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"reasoning\" mean?",
      "choices": [
        "an outdoor market",
        "thinking things through",
        "a big fun gathering",
        "does it for pay"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0550",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"logic\" mean?",
      "choices": [
        "the reason why",
        "breaks into pieces easily",
        "thinking in a clear order",
        "the very best at it"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0551",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"rationale\" mean?",
      "choices": [
        "a big street",
        "breaks easily",
        "the reason why",
        "a small calm bay"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0552",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"motive\" mean?",
      "choices": [
        "a serious promise",
        "the power to think",
        "a place to buy and sell",
        "the reason for doing it"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0553",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"intent\" mean?",
      "choices": [
        "easy to carry",
        "what you shoot for",
        "what you plan to do",
        "of today"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0554",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"purpose\" mean?",
      "choices": [
        "the goal",
        "where streets cross",
        "the reason it exists",
        "a quicker way"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0555",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"goal\" mean?",
      "choices": [
        "a serious promise",
        "the one who gets it next",
        "what you want to reach",
        "easy to break or hurt"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0556",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"aim\" mean?",
      "choices": [
        "a small boring job",
        "a written promise",
        "where roads meet",
        "what you point at"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0557",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"target\" mean?",
      "choices": [
        "what you shoot for",
        "a group of islands",
        "a promise to fix it",
        "no longer used"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0558",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"objective\" mean?",
      "choices": [
        "the goal",
        "the pointed top",
        "a small road",
        "a wise teacher"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0559",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"mission\" mean?",
      "choices": [
        "thinking in a clear order",
        "joined together",
        "learning from a master",
        "an important job"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0560",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"task\" mean?",
      "choices": [
        "a job to do",
        "makes new things",
        "learning from a master",
        "knows a lot about one thing"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0561",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"chore\" mean?",
      "choices": [
        "family that comes later",
        "a small boring job",
        "a narrow strip of land",
        "a narrow street"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0562",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"duty\" mean?",
      "choices": [
        "a written promise",
        "what you must do",
        "a road that stops",
        "makes new things"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0563",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"responsibility\" mean?",
      "choices": [
        "a group of islands",
        "a way around",
        "a job you must do right",
        "special acts for an event"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0564",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"obligation\" mean?",
      "choices": [
        "a kid who is amazing at something",
        "a way to walk",
        "what you point at",
        "something you must do"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0565",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"commitment\" mean?",
      "choices": [
        "the reason it exists",
        "a promise to do it",
        "finds a way with what is there",
        "the usual way of a people"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0566",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"promise\" mean?",
      "choices": [
        "a wide street",
        "of today",
        "what your family hands down",
        "saying you will do it"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0567",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"vow\" mean?",
      "choices": [
        "bounces back after trouble",
        "a way around",
        "a secret you keep",
        "a strong promise"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0568",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"oath\" mean?",
      "choices": [
        "a serious promise",
        "where streets cross",
        "where roads meet",
        "the very top"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0569",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"pledge\" mean?",
      "choices": [
        "a narrow street",
        "popular right now",
        "does not bend",
        "a promise to give or do"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0570",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"guarantee\" mean?",
      "choices": [
        "quick and light in moving",
        "a promise it will work",
        "what you point at",
        "lasts a long time"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0571",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"warranty\" mean?",
      "choices": [
        "bounces back after trouble",
        "lasts a long time",
        "a wise teacher",
        "a promise to fix it"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0572",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"contract\" mean?",
      "choices": [
        "good from practice",
        "new at something",
        "a written promise",
        "very old and worth keeping"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0573",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"treaty\" mean?",
      "choices": [
        "a wide street",
        "a road that stops",
        "land at a river's mouth",
        "a peace promise between lands"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0574",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"alliance\" mean?",
      "choices": [
        "born with talent",
        "a team promise",
        "good with the hands",
        "land almost all around water"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0575",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"pact\" mean?",
      "choices": [
        "a path through wild land",
        "changes to fit new things",
        "a small promise between friends",
        "a person who studies a lot"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0576",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"bond\" mean?",
      "choices": [
        "polished and classy",
        "a strong tie",
        "new at something",
        "breaks into pieces easily"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0577",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"tie\" mean?",
      "choices": [
        "a link between things",
        "joined together",
        "an important job",
        "always good"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0578",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"link\" mean?",
      "choices": [
        "easy to break or hurt",
        "one part of a chain",
        "old but still cool",
        "a group of islands"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0579",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"chain\" mean?",
      "choices": [
        "a promise to fix it",
        "links joined together",
        "rough and not finished",
        "family"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0580",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"connection\" mean?",
      "choices": [
        "the power to think",
        "joined together",
        "the one who gets it next",
        "a team promise"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0581",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"relation\" mean?",
      "choices": [
        "thinking in a clear order",
        "new and smart",
        "how two things go together",
        "the very top"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0582",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"relative\" mean?",
      "choices": [
        "a job to do",
        "makes new things",
        "part of your family",
        "new and smart"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0583",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"kin\" mean?",
      "choices": [
        "people marching in a line",
        "what you want to reach",
        "family",
        "acts done the same way"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0584",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"ancestor\" mean?",
      "choices": [
        "good at many things",
        "where roads meet",
        "family from long ago",
        "part of your family"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0585",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"descendant\" mean?",
      "choices": [
        "a link between things",
        "family from long ago",
        "family that comes later",
        "polished and classy"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0586",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"heir\" mean?",
      "choices": [
        "what you must do",
        "born with talent",
        "the one who gets it next",
        "a happy party"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0587",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"legacy\" mean?",
      "choices": [
        "a way to walk",
        "what is left behind",
        "moves fast and easy",
        "family"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0588",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"heritage\" mean?",
      "choices": [
        "a wide street",
        "what you shoot for",
        "what your family hands down",
        "something you must do"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0589",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"tradition\" mean?",
      "choices": [
        "knows a lot about one thing",
        "what is done every time",
        "a happy party",
        "the usual way of a people"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0590",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"custom\" mean?",
      "choices": [
        "a wide street",
        "the usual way of a people",
        "good at many things",
        "the reason for doing it"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0591",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"ritual\" mean?",
      "choices": [
        "not smooth in moving",
        "a way to walk",
        "acts done the same way",
        "the usual way of a people"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0592",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"ceremony\" mean?",
      "choices": [
        "special acts for an event",
        "good with the hands",
        "an important job",
        "a team promise"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0593",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"celebration\" mean?",
      "choices": [
        "a happy party",
        "learning from a master",
        "the reason why",
        "new and smart"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0594",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"festival\" mean?",
      "choices": [
        "does not bend",
        "a big fun gathering",
        "good for a long time",
        "family that comes later"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0595",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"parade\" mean?",
      "choices": [
        "a peace promise between lands",
        "people marching in a line",
        "land at a river's mouth",
        "a group of islands"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0596",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"carnival\" mean?",
      "choices": [
        "a fun fair with rides",
        "quick and light in moving",
        "links joined together",
        "what you point at"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0597",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"fair\" mean?",
      "choices": [
        "changes to fit new things",
        "a gathering with games and food",
        "the reason it exists",
        "pretty and graceful"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0598",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"market\" mean?",
      "choices": [
        "a place to buy and sell",
        "does not bend",
        "a promise to do it",
        "thinking things through"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0599",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"bazaar\" mean?",
      "choices": [
        "an outdoor market",
        "does not bend",
        "part of your family",
        "a promise to fix it"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0600",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"plaza\" mean?",
      "choices": [
        "the pointed top",
        "changes to fit new things",
        "good at many things",
        "an open square in town"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0601",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"boulevard\" mean?",
      "choices": [
        "a wide street",
        "good at inventing",
        "the reason why",
        "rough and not finished"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0602",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"avenue\" mean?",
      "choices": [
        "what you point at",
        "the pointed top",
        "a big street",
        "a promise to give or do"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0603",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"alley\" mean?",
      "choices": [
        "a narrow street",
        "a place to buy and sell",
        "the reason for doing it",
        "good at many things"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0604",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"lane\" mean?",
      "choices": [
        "a small road",
        "easy to carry",
        "the goal",
        "very good at something"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0605",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"trail\" mean?",
      "choices": [
        "polished and classy",
        "a path through wild land",
        "pretty and graceful",
        "an important job"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0606",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"path\" mean?",
      "choices": [
        "a way to walk",
        "the reason it exists",
        "super smart person",
        "what you point at"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0607",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"route\" mean?",
      "choices": [
        "a promise to give or do",
        "bends without breaking",
        "the way to go",
        "land almost all around water"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0608",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"shortcut\" mean?",
      "choices": [
        "low land between hills",
        "one part of a chain",
        "a quicker way",
        "a job to do"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0609",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"detour\" mean?",
      "choices": [
        "popular right now",
        "a way around",
        "how two things go together",
        "good at many things"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0610",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"dead end\" mean?",
      "choices": [
        "a person who studies a lot",
        "a road that stops",
        "no longer used",
        "a serious promise"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0611",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"crossroads\" mean?",
      "choices": [
        "a place to buy and sell",
        "where roads meet",
        "a way around",
        "special acts for an event"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0612",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"intersection\" mean?",
      "choices": [
        "a narrow strip of land",
        "finds a way with what is there",
        "where streets cross",
        "a serious promise"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0613",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"summit\" mean?",
      "choices": [
        "the very top",
        "an open square in town",
        "family",
        "bends without breaking"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0614",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"peak\" mean?",
      "choices": [
        "the pointed top",
        "a strong promise",
        "how two things go together",
        "joined together"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0615",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"valley\" mean?",
      "choices": [
        "easy to break or hurt",
        "thinking in a clear order",
        "low land between hills",
        "the very top"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0616",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"canyon\" mean?",
      "choices": [
        "flat high land",
        "knows a lot about one thing",
        "a deep narrow valley",
        "a big street"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0617",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"plateau\" mean?",
      "choices": [
        "flat high land",
        "too old to use",
        "breaks easily",
        "an important job"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0618",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"peninsula\" mean?",
      "choices": [
        "always good",
        "the pointed top",
        "the one who gets it next",
        "land almost all around water"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0619",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"isthmus\" mean?",
      "choices": [
        "a small promise between friends",
        "good at inventing",
        "a path through wild land",
        "a narrow strip of land"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0620",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"archipelago\" mean?",
      "choices": [
        "a team promise",
        "a group of islands",
        "family from long ago",
        "always good"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0621",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"atoll\" mean?",
      "choices": [
        "a wide street",
        "family from long ago",
        "the pointed top",
        "a ring-shaped island"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0622",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"lagoon\" mean?",
      "choices": [
        "a wise teacher",
        "a big street",
        "a small calm bay",
        "a fun fair with rides"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0623",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"estuary\" mean?",
      "choices": [
        "new at something",
        "flat high land",
        "where a river meets the sea",
        "a link between things"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0624",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"delta\" mean?",
      "choices": [
        "rough and not finished",
        "the usual way of a people",
        "a promise to fix it",
        "land at a river's mouth"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0625",
      "kind": "choice",
      "tier": 5,
      "prompt": "What does \"tributary\" mean?",
      "choices": [
        "a road that stops",
        "a stream feeding a river",
        "something you must do",
        "what is left behind"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0626",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"adversity\" mean?",
      "choices": [
        "hard times",
        "to help two sides agree",
        "taken by law",
        "to talk to make a deal"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0627",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"prosperity\" mean?",
      "choices": [
        "a punishment",
        "good times with plenty",
        "a cruel ruler",
        "a trip to explore"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0628",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"triumph\" mean?",
      "choices": [
        "proof you were elsewhere",
        "a big win",
        "what a witness says",
        "going back from battle"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0629",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"defeat\" mean?",
      "choices": [
        "to help two sides agree",
        "proof you were elsewhere",
        "one who saw it happen",
        "a loss"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0630",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"victory\" mean?",
      "choices": [
        "winning",
        "a great act",
        "people who decide guilt",
        "rising against rulers"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0631",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"conquest\" mean?",
      "choices": [
        "forgiven by the leader",
        "ships traveling together",
        "a brave act",
        "winning by fighting"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0632",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"siege\" mean?",
      "choices": [
        "surrounding a place to win it",
        "to admit you lost",
        "the punishment given",
        "a risky trick"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0633",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"truce\" mean?",
      "choices": [
        "to remove from the throne",
        "a very long trip",
        "a pause in fighting",
        "sent away from home"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0634",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"ceasefire\" mean?",
      "choices": [
        "a trip to find something",
        "an order to stop fighting",
        "a case in court",
        "the lawyer against"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0635",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"armistice\" mean?",
      "choices": [
        "safe shelter",
        "a line one behind another",
        "an end to war",
        "a safe harbor"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0636",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"retreat\" mean?",
      "choices": [
        "forgiven by the leader",
        "fooling someone",
        "an act done",
        "going back from battle"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0637",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"advance\" mean?",
      "choices": [
        "stealing from stores",
        "one who steals secrets",
        "moving forward",
        "travelers moving together"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0638",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"charge\" mean?",
      "choices": [
        "a long trip by sea",
        "money to get out of jail",
        "running at the enemy",
        "ships traveling together"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0639",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"ambush\" mean?",
      "choices": [
        "a small group of soldiers",
        "one who argues in court",
        "a surprise attack",
        "one who decides in court"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0640",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"strategy\" mean?",
      "choices": [
        "going back from battle",
        "a smart plan",
        "making someone king or queen",
        "the one who was hurt"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0641",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"tactic\" mean?",
      "choices": [
        "a small smart move",
        "taken by law",
        "cheating for money",
        "cheating someone out of money"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0642",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"maneuver\" mean?",
      "choices": [
        "a case in court",
        "a planned move",
        "a large army group",
        "a safe place"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0643",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"formation\" mean?",
      "choices": [
        "breaking in to steal",
        "the shape of a group",
        "crew turning on leaders",
        "watched instead of jail"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0644",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"rank\" mean?",
      "choices": [
        "a holy safe place",
        "a row of soldiers",
        "an order to stop fighting",
        "a punishment"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0645",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"file\" mean?",
      "choices": [
        "to give up on terms",
        "travelers moving together",
        "a great act",
        "a line one behind another"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0646",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"platoon\" mean?",
      "choices": [
        "winning",
        "a small group of soldiers",
        "a cruel ruler",
        "hard times"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0647",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"squad\" mean?",
      "choices": [
        "a small team",
        "winning",
        "a lawyer",
        "one who rises up"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0648",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"battalion\" mean?",
      "choices": [
        "a loss",
        "a small smart move",
        "an order to stop fighting",
        "a big group of soldiers"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0649",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"regiment\" mean?",
      "choices": [
        "good times with plenty",
        "a large army group",
        "turning against your land",
        "winning by fighting"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0650",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"fleet\" mean?",
      "choices": [
        "stealing from pockets",
        "a group of ships",
        "giving up as punishment",
        "an act done"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0651",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"armada\" mean?",
      "choices": [
        "one who fights rulers",
        "thought to have done it",
        "a huge fleet",
        "setting fires on purpose"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0652",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"convoy\" mean?",
      "choices": [
        "a safe harbor",
        "ships traveling together",
        "surrounding a place to win it",
        "taken by law"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0653",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"caravan\" mean?",
      "choices": [
        "ships traveling together",
        "each side gives up some",
        "travelers moving together",
        "a loss"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0654",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"expedition\" mean?",
      "choices": [
        "a trip to explore",
        "the one who sues",
        "one who tells secrets",
        "the ruling group"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0655",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"voyage\" mean?",
      "choices": [
        "stealing things",
        "one who saw it happen",
        "rising against rulers",
        "a long trip by sea"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0656",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"journey\" mean?",
      "choices": [
        "people rising together",
        "winning by fighting",
        "to help two sides agree",
        "a long trip"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0657",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"odyssey\" mean?",
      "choices": [
        "a small team",
        "a long trip by sea",
        "a lawyer",
        "a very long trip"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0658",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"pilgrimage\" mean?",
      "choices": [
        "a holy trip",
        "to admit you lost",
        "a trip to find something",
        "a big win"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0659",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"quest\" mean?",
      "choices": [
        "a trip to find something",
        "to decide between two sides",
        "winning by fighting",
        "a trick to steal money"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0660",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"adventure\" mean?",
      "choices": [
        "the one on trial",
        "an act done",
        "an exciting trip",
        "a trip to explore"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0661",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"escapade\" mean?",
      "choices": [
        "running at the enemy",
        "grab by force",
        "a strong fort",
        "a wild adventure"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0662",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"exploit\" mean?",
      "choices": [
        "a huge fleet",
        "a brave act",
        "one who fights rulers",
        "proof you were elsewhere"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0663",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"feat\" mean?",
      "choices": [
        "a great act",
        "taking over the leaders",
        "to decide between two sides",
        "money to get out of jail"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0664",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"deed\" mean?",
      "choices": [
        "a trip to explore",
        "setting fires on purpose",
        "money to get out of jail",
        "an act done"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0665",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"stunt\" mean?",
      "choices": [
        "a risky trick",
        "a holy safe place",
        "one who fights rulers",
        "wrecking on purpose"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0666",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"trick\" mean?",
      "choices": [
        "fooling someone",
        "taken by law",
        "winning",
        "running at the enemy"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0667",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"prank\" mean?",
      "choices": [
        "turning against your land",
        "asking a higher court",
        "a joke trick",
        "did the bad act"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0668",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"hoax\" mean?",
      "choices": [
        "a lawyer",
        "a king or queen",
        "the punishment given",
        "a trick to fool many"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0669",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"scam\" mean?",
      "choices": [
        "proof you were elsewhere",
        "a trick to steal money",
        "did not do it",
        "watched instead of jail"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0670",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"fraud\" mean?",
      "choices": [
        "a small group of soldiers",
        "asking a higher court",
        "cheating for money",
        "the punishment given"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0671",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"swindle\" mean?",
      "choices": [
        "to talk to make a deal",
        "one who decides in court",
        "cheating someone out of money",
        "good times with plenty"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0672",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"heist\" mean?",
      "choices": [
        "stealing something big",
        "did the bad act",
        "rising against rulers",
        "moving forward"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0673",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"robbery\" mean?",
      "choices": [
        "what a witness says",
        "an act done",
        "stealing from a place",
        "rising against rulers"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0674",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"burglary\" mean?",
      "choices": [
        "people rising together",
        "the one who was hurt",
        "an end to war",
        "breaking in to steal"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0675",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"theft\" mean?",
      "choices": [
        "shows it is true",
        "hearing in court",
        "stealing",
        "a big group of soldiers"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0676",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"larceny\" mean?",
      "choices": [
        "stealing things",
        "one who turns against",
        "the time a ruler rules",
        "grab by force"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0677",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"pickpocket\" mean?",
      "choices": [
        "going back from battle",
        "forgiven by the leader",
        "stealing from pockets",
        "a joke trick"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0678",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"shoplifter\" mean?",
      "choices": [
        "a smart plan",
        "one who decides in court",
        "stealing from stores",
        "a group of ships"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0679",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"vandal\" mean?",
      "choices": [
        "rising against rulers",
        "hearing in court",
        "one who wrecks things",
        "stealing something big"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0680",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"arson\" mean?",
      "choices": [
        "setting fires on purpose",
        "a smart plan",
        "a long trip by sea",
        "a risky trick"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0681",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"sabotage\" mean?",
      "choices": [
        "a case in court",
        "to admit you lost",
        "a surprise attack",
        "wrecking on purpose"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0682",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"treason\" mean?",
      "choices": [
        "to give up the throne",
        "turning against your land",
        "the one who did it",
        "stealing from a place"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0683",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"traitor\" mean?",
      "choices": [
        "stealing from a place",
        "people who decide guilt",
        "one who turns against",
        "asking a higher court"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0684",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"spy\" mean?",
      "choices": [
        "a case in court",
        "one who steals secrets",
        "a big group of soldiers",
        "a smart plan"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0685",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"informant\" mean?",
      "choices": [
        "a surprise attack",
        "running at the enemy",
        "one who tells secrets",
        "a small team"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0686",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"witness\" mean?",
      "choices": [
        "a punishment",
        "setting fires on purpose",
        "a loss",
        "one who saw it happen"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0687",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"testimony\" mean?",
      "choices": [
        "a long trip",
        "what a witness says",
        "to give up on terms",
        "a lawyer"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0688",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"evidence\" mean?",
      "choices": [
        "let out of jail early",
        "proof of what happened",
        "a small group of soldiers",
        "a lawyer"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0689",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"proof\" mean?",
      "choices": [
        "safe shelter",
        "a pause in fighting",
        "a large army group",
        "shows it is true"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0690",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"alibi\" mean?",
      "choices": [
        "a punishment",
        "proof you were elsewhere",
        "a smart plan",
        "a lawyer"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0691",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"suspect\" mean?",
      "choices": [
        "a very long trip",
        "a wild adventure",
        "safe shelter",
        "thought to have done it"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0692",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"culprit\" mean?",
      "choices": [
        "an act done",
        "people who decide guilt",
        "the one who did it",
        "stealing"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0693",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"accomplice\" mean?",
      "choices": [
        "one who helps the crime",
        "turning against your land",
        "the one who was hurt",
        "going back from battle"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0694",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"accessory\" mean?",
      "choices": [
        "grab by force",
        "stealing from stores",
        "making someone king or queen",
        "one who helps after"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0695",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"victim\" mean?",
      "choices": [
        "fooling someone",
        "the one who was hurt",
        "one who helps the crime",
        "a trick to steal money"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0696",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"innocent\" mean?",
      "choices": [
        "a safe place",
        "a huge fleet",
        "did not do it",
        "wrecking on purpose"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0697",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"guilty\" mean?",
      "choices": [
        "to give up on terms",
        "a trick to steal money",
        "did the bad act",
        "the one who saw it"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0698",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"verdict\" mean?",
      "choices": [
        "winning",
        "stealing",
        "the court's decision",
        "an exciting trip"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0699",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"sentence\" mean?",
      "choices": [
        "a large army group",
        "a small smart move",
        "the punishment given",
        "a cruel ruler"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0700",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"trial\" mean?",
      "choices": [
        "breaking in to steal",
        "people rising together",
        "hearing in court",
        "a ruler with total power"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0701",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"judge\" mean?",
      "choices": [
        "a long trip by sea",
        "a trick to steal money",
        "one who decides in court",
        "to give up"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0702",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"jury\" mean?",
      "choices": [
        "let out of jail early",
        "to help two sides agree",
        "people who decide guilt",
        "watched instead of jail"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0703",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"lawyer\" mean?",
      "choices": [
        "one who argues in court",
        "the one on trial",
        "watched instead of jail",
        "stealing from pockets"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0704",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"attorney\" mean?",
      "choices": [
        "stealing things",
        "the ruling group",
        "a lawyer",
        "proof of what happened"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0705",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"prosecutor\" mean?",
      "choices": [
        "forgiven by the leader",
        "cheating for money",
        "asking a higher court",
        "the lawyer against"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0706",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"defendant\" mean?",
      "choices": [
        "a small group of soldiers",
        "the one on trial",
        "a pause in fighting",
        "a small team"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0707",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"plaintiff\" mean?",
      "choices": [
        "the one who sues",
        "a small smart move",
        "stealing from a place",
        "the shape of a group"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0708",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"lawsuit\" mean?",
      "choices": [
        "stealing",
        "the time a ruler rules",
        "an exciting trip",
        "a case in court"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0709",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"appeal\" mean?",
      "choices": [
        "a safe place",
        "cheating for money",
        "asking a higher court",
        "an exciting trip"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0710",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"pardon\" mean?",
      "choices": [
        "shows it is true",
        "forgiven by the leader",
        "each side gives up some",
        "a big group of soldiers"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0711",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"parole\" mean?",
      "choices": [
        "let out of jail early",
        "fooling someone",
        "travelers moving together",
        "an order to stop fighting"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0712",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"probation\" mean?",
      "choices": [
        "watched instead of jail",
        "a pause in fighting",
        "a joke trick",
        "the ruling group"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0713",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"bail\" mean?",
      "choices": [
        "stealing from pockets",
        "money to get out of jail",
        "a small team",
        "a great act"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0714",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"fine\" mean?",
      "choices": [
        "a risky trick",
        "an exciting trip",
        "money paid as punishment",
        "hard times"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0715",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"penalty\" mean?",
      "choices": [
        "a punishment",
        "a family of rulers",
        "to help two sides agree",
        "one who helps the crime"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0716",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"forfeit\" mean?",
      "choices": [
        "a big group of soldiers",
        "stealing from stores",
        "giving up as punishment",
        "one who steals secrets"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0717",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"confiscate\" mean?",
      "choices": [
        "the punishment given",
        "taken by law",
        "a family of rulers",
        "surrounding a place to win it"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0718",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"seize\" mean?",
      "choices": [
        "each side gives up some",
        "grab by force",
        "rising against rulers",
        "a lawyer"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0719",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"raid\" mean?",
      "choices": [
        "one who steals secrets",
        "stealing things",
        "a ruler with total power",
        "a sudden attack or search"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0720",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"negotiate\" mean?",
      "choices": [
        "a long trip",
        "to talk to make a deal",
        "a holy trip",
        "safe shelter"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0721",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"mediate\" mean?",
      "choices": [
        "to help two sides agree",
        "a long trip",
        "a smart plan",
        "a wild adventure"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0722",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"arbitrate\" mean?",
      "choices": [
        "good times with plenty",
        "did not do it",
        "to decide between two sides",
        "a row of soldiers"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0723",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"compromise\" mean?",
      "choices": [
        "taking over the leaders",
        "one who decides in court",
        "each side gives up some",
        "money paid as punishment"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0724",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"concede\" mean?",
      "choices": [
        "to admit you lost",
        "a line one behind another",
        "a family of rulers",
        "good times with plenty"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0725",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"surrender\" mean?",
      "choices": [
        "the one on trial",
        "a king or queen",
        "stealing from pockets",
        "to give up"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0726",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"capitulate\" mean?",
      "choices": [
        "did not do it",
        "to give up on terms",
        "a holy trip",
        "a strong fort"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0727",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"mutiny\" mean?",
      "choices": [
        "crew turning on leaders",
        "the court's decision",
        "did not do it",
        "one who helps the crime"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0728",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"revolt\" mean?",
      "choices": [
        "rising against rulers",
        "an exciting trip",
        "winning",
        "the one who sues"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0729",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"rebel\" mean?",
      "choices": [
        "cheating someone out of money",
        "winning",
        "a strong fort",
        "one who fights rulers"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0730",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"insurgent\" mean?",
      "choices": [
        "the one who did it",
        "one who rises up",
        "did not do it",
        "turning against your land"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0731",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"uprising\" mean?",
      "choices": [
        "people rising together",
        "hard times",
        "a long trip by sea",
        "setting fires on purpose"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0732",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"coup\" mean?",
      "choices": [
        "taking over the leaders",
        "one who tells secrets",
        "stealing from a place",
        "stealing something big"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0733",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"regime\" mean?",
      "choices": [
        "a lawyer",
        "a trip to explore",
        "grab by force",
        "the ruling group"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0734",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"junta\" mean?",
      "choices": [
        "proof you were elsewhere",
        "a holy safe place",
        "rulers who took over",
        "a punishment"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0735",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"tyrant\" mean?",
      "choices": [
        "a cruel ruler",
        "stealing from pockets",
        "safe shelter",
        "a group of ships"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0736",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"despot\" mean?",
      "choices": [
        "a holy trip",
        "a ruler with total power",
        "one who fights rulers",
        "people who decide guilt"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0737",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"monarch\" mean?",
      "choices": [
        "hard times",
        "a pause in fighting",
        "ships traveling together",
        "a king or queen"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0738",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"dynasty\" mean?",
      "choices": [
        "a strong fort",
        "a brave act",
        "a huge fleet",
        "a family of rulers"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0739",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"reign\" mean?",
      "choices": [
        "making someone king or queen",
        "one who argues in court",
        "giving up as punishment",
        "the time a ruler rules"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0740",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"coronation\" mean?",
      "choices": [
        "one who argues in court",
        "to take power wrongly",
        "did not do it",
        "making someone king or queen"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0741",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"abdicate\" mean?",
      "choices": [
        "rulers who took over",
        "forgiven by the leader",
        "to give up the throne",
        "a group of ships"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0742",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"usurp\" mean?",
      "choices": [
        "a trick to fool many",
        "cheating for money",
        "travelers moving together",
        "to take power wrongly"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0743",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"dethrone\" mean?",
      "choices": [
        "to remove from the throne",
        "a sudden attack or search",
        "moving forward",
        "a trick to steal money"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0744",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"exile\" mean?",
      "choices": [
        "sent away from home",
        "to give up the throne",
        "one who argues in court",
        "an order to stop fighting"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0745",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"asylum\" mean?",
      "choices": [
        "a small team",
        "the court's decision",
        "the shape of a group",
        "safe shelter"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0746",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"refuge\" mean?",
      "choices": [
        "shows it is true",
        "a risky trick",
        "a safe place",
        "people who decide guilt"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0747",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"sanctuary\" mean?",
      "choices": [
        "an end to war",
        "one who rises up",
        "a holy safe place",
        "a long trip"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0748",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"haven\" mean?",
      "choices": [
        "a group of ships",
        "one who saw it happen",
        "a safe harbor",
        "surrounding a place to win it"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0749",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"fortress\" mean?",
      "choices": [
        "a huge fleet",
        "stealing things",
        "a strong fort",
        "the one who was hurt"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0750",
      "kind": "choice",
      "tier": 6,
      "prompt": "What does \"garrison\" mean?",
      "choices": [
        "one who steals secrets",
        "a large army group",
        "watched instead of jail",
        "soldiers guarding a fort"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0751",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"ancient\" mean?",
      "choices": [
        "very, very old",
        "a first time on stage",
        "fast in music",
        "rolled-up writing"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0752",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"archaic\" mean?",
      "choices": [
        "an old handwritten book",
        "dream-like art",
        "art from glued pieces",
        "very old and no longer used"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0753",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"antiquated\" mean?",
      "choices": [
        "a wise old saying",
        "words meant for the crowd",
        "an old made thing",
        "too old-fashioned"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0754",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"extinct\" mean?",
      "choices": [
        "words that mean more than they say",
        "a picture made of small pieces",
        "no longer alive",
        "an afternoon show"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0755",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"fossil\" mean?",
      "choices": [
        "old bones turned to stone",
        "words that sound alike",
        "an old famous story",
        "many short clips together"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0756",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"relic\" mean?",
      "choices": [
        "the actors in a show",
        "a play sung all the way",
        "an old kept thing",
        "poem lines"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0757",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"artifact\" mean?",
      "choices": [
        "words that mean more than they say",
        "a song in an opera",
        "an old made thing",
        "an afternoon show"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0758",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"ruins\" mean?",
      "choices": [
        "getting softer",
        "art that is not real-looking",
        "art that looks real",
        "broken old buildings"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0759",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"excavation\" mean?",
      "choices": [
        "an old kept thing",
        "a funny five-line poem",
        "digging up old things",
        "cloth for painting on"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0760",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"archaeology\" mean?",
      "choices": [
        "the actors in a show",
        "studying old things",
        "the money boss of a show",
        "a beat in a word"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0761",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"historian\" mean?",
      "choices": [
        "talking in a play",
        "notes that sound good together",
        "the written words of a play",
        "one who studies history"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0762",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"chronicle\" mean?",
      "choices": [
        "a record of events",
        "how speech sounds",
        "getting softer",
        "praise for one who died"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0763",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"annals\" mean?",
      "choices": [
        "very, very old",
        "planned dance moves",
        "yearly records",
        "the music boss"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0764",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"archive\" mean?",
      "choices": [
        "one who studies history",
        "kept old records",
        "words that mean more than they say",
        "the beat of music or words"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0765",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"manuscript\" mean?",
      "choices": [
        "a big part of a play",
        "a small part of a play",
        "words that mean more than they say",
        "an old handwritten book"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0766",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"scroll\" mean?",
      "choices": [
        "an old god story",
        "rolled-up writing",
        "a break in the show",
        "no longer alive"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0767",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"tablet\" mean?",
      "choices": [
        "a flat stone with writing",
        "no longer alive",
        "talking in a play",
        "notes that sound good together"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0768",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"inscription\" mean?",
      "choices": [
        "too old-fashioned",
        "words cut in stone",
        "loud long applause",
        "a place for plays"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0769",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"hieroglyph\" mean?",
      "choices": [
        "where actors perform",
        "slow in music",
        "old bones turned to stone",
        "picture writing"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0770",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"rune\" mean?",
      "choices": [
        "an old magic letter",
        "art that looks real",
        "one who writes song words",
        "clapping hands"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0771",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"alphabet\" mean?",
      "choices": [
        "rolled-up writing",
        "all the letters",
        "painting on wet plaster",
        "dancing to tell a story"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0772",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"syllable\" mean?",
      "choices": [
        "hard words of a job",
        "praise for one who died",
        "a beat in a word",
        "a play sung all the way"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0773",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"phoneme\" mean?",
      "choices": [
        "all the works a group knows",
        "a funny five-line poem",
        "a TV show's written words",
        "one sound in speech"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0774",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"dialect\" mean?",
      "choices": [
        "very old and no longer used",
        "a group playing together",
        "the backup actor",
        "a way of speaking in a place"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0775",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"accent\" mean?",
      "choices": [
        "art that is not real-looking",
        "talking alone on stage",
        "how speech sounds",
        "old bones turned to stone"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0776",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"jargon\" mean?",
      "choices": [
        "hard words of a job",
        "studying old things",
        "painting on wet plaster",
        "a small 3D scene"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0777",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"slang\" mean?",
      "choices": [
        "praise for one who died",
        "words that sound alike",
        "casual cool words",
        "an old famous story"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0778",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"idiom\" mean?",
      "choices": [
        "the tune you hum",
        "words that mean more than they say",
        "music written on paper",
        "a big part in a play"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0779",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"proverb\" mean?",
      "choices": [
        "a wise old saying",
        "a big part of a play",
        "words on a grave",
        "an old kept thing"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0780",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"adage\" mean?",
      "choices": [
        "art that looks real",
        "a short wise saying",
        "a poem of praise",
        "the backup actor"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0781",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"maxim\" mean?",
      "choices": [
        "all the works a group knows",
        "studying old things",
        "a rule to live by",
        "one person talking long"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0782",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"motto\" mean?",
      "choices": [
        "a short saying of a group",
        "the music boss",
        "one who writes song words",
        "drawn plans for a film"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0783",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"epitaph\" mean?",
      "choices": [
        "art from glued pieces",
        "words on a grave",
        "one who studies history",
        "a very near camera shot"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0784",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"eulogy\" mean?",
      "choices": [
        "praise for one who died",
        "art of light and color",
        "yearly records",
        "a break in the show"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0785",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"memoir\" mean?",
      "choices": [
        "the end of the show",
        "poem lines",
        "one who plays alone",
        "a book of memories"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0786",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"autobiography\" mean?",
      "choices": [
        "a TV show's written words",
        "your own life story",
        "a poem of fourteen lines",
        "no longer alive"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0787",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"biography\" mean?",
      "choices": [
        "someone's life story",
        "a painting of land",
        "yearly records",
        "fast in music"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0788",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"legend\" mean?",
      "choices": [
        "a short three-line poem",
        "an old famous story",
        "clapping hands",
        "no longer alive"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0789",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"myth\" mean?",
      "choices": [
        "an old god story",
        "a piece for a star player",
        "talking in a play",
        "one who studies history"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0790",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"fable\" mean?",
      "choices": [
        "a story with a lesson",
        "art that looks real",
        "an afternoon show",
        "poem lines"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0791",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"parable\" mean?",
      "choices": [
        "a way of speaking in a place",
        "a story that teaches",
        "notes that sound good together",
        "walking speed in music"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0792",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"allegory\" mean?",
      "choices": [
        "dancing to tell a story",
        "one person talking long",
        "the music boss",
        "a story with a hidden meaning"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0793",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"epic\" mean?",
      "choices": [
        "the flow of sounds",
        "a story with a hidden meaning",
        "a very long hero story",
        "a long piece for orchestra"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0794",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"saga\" mean?",
      "choices": [
        "a long family story",
        "art that looks real",
        "a group of poem lines",
        "broken old buildings"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0795",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"ballad\" mean?",
      "choices": [
        "a song that tells a story",
        "hard words of a job",
        "words meant for the crowd",
        "the backup actor"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0796",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"ode\" mean?",
      "choices": [
        "a poem of praise",
        "a first time on stage",
        "a short wise saying",
        "one who studies history"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0797",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"sonnet\" mean?",
      "choices": [
        "walking speed in music",
        "art that looks real",
        "hard words of a job",
        "a poem of fourteen lines"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0798",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"haiku\" mean?",
      "choices": [
        "a short three-line poem",
        "loud in music",
        "a beat in a word",
        "a book of memories"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0799",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"limerick\" mean?",
      "choices": [
        "words meant for the crowd",
        "cloth for painting on",
        "a master player",
        "a funny five-line poem"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0800",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"stanza\" mean?",
      "choices": [
        "walking speed in music",
        "the boss of the show",
        "fast in music",
        "a group of poem lines"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0801",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"verse\" mean?",
      "choices": [
        "one who writes plays",
        "poem lines",
        "loud long applause",
        "the beat of music or words"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0802",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"rhyme\" mean?",
      "choices": [
        "words that sound alike",
        "a story with a lesson",
        "words on a grave",
        "the flow of sounds"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0803",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"rhythm\" mean?",
      "choices": [
        "the beat of music or words",
        "walking speed in music",
        "a long family story",
        "one person talking long"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0804",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"meter\" mean?",
      "choices": [
        "no longer alive",
        "the beat pattern in poems",
        "an afternoon show",
        "a big part of a play"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0805",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"cadence\" mean?",
      "choices": [
        "studying old things",
        "the flow of sounds",
        "words meant for the crowd",
        "the actors in a show"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0806",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"melody\" mean?",
      "choices": [
        "the tune",
        "words that sound alike",
        "the beat pattern in poems",
        "a record of events"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0807",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"harmony\" mean?",
      "choices": [
        "notes that sound good together",
        "praise for one who died",
        "loud in music",
        "the words of an opera"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0808",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"tempo\" mean?",
      "choices": [
        "how fast music goes",
        "a big wall painting",
        "a wide wide view",
        "the beat of music or words"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0809",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"crescendo\" mean?",
      "choices": [
        "art of boxes and shapes",
        "words meant for the crowd",
        "getting louder",
        "a painting of a person"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0810",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"diminuendo\" mean?",
      "choices": [
        "getting softer",
        "very, very old",
        "many short clips together",
        "hard words of a job"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0811",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"forte\" mean?",
      "choices": [
        "playing it again by request",
        "one who plays alone",
        "the actors in a show",
        "loud in music"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0812",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"piano\" mean?",
      "choices": [
        "painting on wet plaster",
        "words that mean more than they say",
        "soft in music",
        "a wise old saying"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0813",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"allegro\" mean?",
      "choices": [
        "the words of an opera",
        "fast in music",
        "your own life story",
        "a play sung all the way"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0814",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"andante\" mean?",
      "choices": [
        "art of light and color",
        "walking speed in music",
        "a painting of objects",
        "too old-fashioned"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0815",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"adagio\" mean?",
      "choices": [
        "kept old records",
        "the boss of the show",
        "a movie's written words",
        "slow in music"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0816",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"symphony\" mean?",
      "choices": [
        "a painting of land",
        "a short wise saying",
        "a book of memories",
        "a long piece for orchestra"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0817",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"concerto\" mean?",
      "choices": [
        "a piece for a star player",
        "one who writes song words",
        "the words of an opera",
        "a big part of a play"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0818",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"overture\" mean?",
      "choices": [
        "a poem of fourteen lines",
        "music before the show",
        "a break in the show",
        "dancing to tell a story"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0819",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"aria\" mean?",
      "choices": [
        "a small part of a play",
        "a song in an opera",
        "getting louder",
        "where actors perform"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0820",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"opera\" mean?",
      "choices": [
        "a funny five-line poem",
        "poem lines",
        "a play sung all the way",
        "the end of the show"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0821",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"ballet\" mean?",
      "choices": [
        "planned dance moves",
        "dancing to tell a story",
        "an old famous story",
        "a poem of fourteen lines"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0822",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"choreography\" mean?",
      "choices": [
        "planned dance moves",
        "kept old records",
        "someone's life story",
        "a song in an opera"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0823",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"ensemble\" mean?",
      "choices": [
        "one who writes song words",
        "kept old records",
        "one who writes plays",
        "a group playing together"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0824",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"soloist\" mean?",
      "choices": [
        "a book of memories",
        "a TV show's written words",
        "music on paper",
        "one who plays alone"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0825",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"virtuoso\" mean?",
      "choices": [
        "talking alone on stage",
        "rolled-up writing",
        "slow in music",
        "a master player"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0826",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"maestro\" mean?",
      "choices": [
        "the music boss",
        "one who writes music",
        "an old magic letter",
        "loud in music"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0827",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"composer\" mean?",
      "choices": [
        "a play sung all the way",
        "how fast music goes",
        "playing it again by request",
        "one who writes music"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0828",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"lyricist\" mean?",
      "choices": [
        "a TV show's written words",
        "the beat pattern in poems",
        "a beat in a word",
        "one who writes song words"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0829",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"libretto\" mean?",
      "choices": [
        "loud long applause",
        "a painting of a person",
        "the words of an opera",
        "the boss of the show"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0830",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"sheet music\" mean?",
      "choices": [
        "an old handwritten book",
        "words on a grave",
        "one who plays alone",
        "music on paper"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0831",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"theater\" mean?",
      "choices": [
        "a painting of a person",
        "your own life story",
        "one who studies history",
        "a place for plays"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0832",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"stage\" mean?",
      "choices": [
        "a rule to live by",
        "a play sung all the way",
        "where actors perform",
        "the end of the show"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0833",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"script\" mean?",
      "choices": [
        "the written words of a play",
        "a group of poem lines",
        "an old magic letter",
        "praise for one who died"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0834",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"dialogue\" mean?",
      "choices": [
        "the end of the show",
        "a short saying of a group",
        "the actors in a show",
        "talking in a play"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0835",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"monologue\" mean?",
      "choices": [
        "playing it again by request",
        "one who plays alone",
        "one person talking long",
        "digging up old things"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0836",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"soliloquy\" mean?",
      "choices": [
        "talking alone on stage",
        "one who writes plays",
        "a short wise saying",
        "drawn plans for a film"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0837",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"aside\" mean?",
      "choices": [
        "the backup actor",
        "an old kept thing",
        "words meant for the crowd",
        "one who plays alone"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0838",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"act\" mean?",
      "choices": [
        "an old made thing",
        "a big part of a play",
        "music on paper",
        "the money boss of a show"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0839",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"scene\" mean?",
      "choices": [
        "a master player",
        "the money boss of a show",
        "soft in music",
        "a small part of a play"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0840",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"intermission\" mean?",
      "choices": [
        "fast in music",
        "the tune",
        "loud in music",
        "a break in the show"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0841",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"finale\" mean?",
      "choices": [
        "the end of the show",
        "a small 3D scene",
        "loud long applause",
        "a group of poem lines"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0842",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"encore\" mean?",
      "choices": [
        "art that is not real-looking",
        "one who plays alone",
        "a piece for a star player",
        "playing it again by request"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0843",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"applause\" mean?",
      "choices": [
        "an old famous story",
        "the tune",
        "clapping hands",
        "a master player"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0844",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"ovation\" mean?",
      "choices": [
        "the money boss of a show",
        "a play sung all the way",
        "loud long applause",
        "yearly records"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0845",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"debut\" mean?",
      "choices": [
        "all the letters",
        "one person talking long",
        "loud long applause",
        "a first time on stage"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0846",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"premiere\" mean?",
      "choices": [
        "the first show",
        "the words of an opera",
        "slow in music",
        "an old famous story"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0847",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"matinee\" mean?",
      "choices": [
        "words meant for the crowd",
        "yearly records",
        "getting louder",
        "an afternoon show"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0848",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"repertoire\" mean?",
      "choices": [
        "all the letters",
        "an afternoon show",
        "art that looks real",
        "all the works a group knows"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0849",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"troupe\" mean?",
      "choices": [
        "the beat of music or words",
        "a poem of fourteen lines",
        "talking alone on stage",
        "a group of actors"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0850",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"cast\" mean?",
      "choices": [
        "playing it again by request",
        "music before the show",
        "the actors in a show",
        "a flat stone with writing"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0851",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"understudy\" mean?",
      "choices": [
        "the backup actor",
        "many short clips together",
        "art that looks real",
        "one who writes music"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0852",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"director\" mean?",
      "choices": [
        "words meant for the crowd",
        "praise for one who died",
        "the boss of the show",
        "music on paper"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0853",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"producer\" mean?",
      "choices": [
        "your own life story",
        "a painting of a person",
        "loud in music",
        "the money boss of a show"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0854",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"playwright\" mean?",
      "choices": [
        "very, very old",
        "one who writes plays",
        "the flow of sounds",
        "a group playing together"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0855",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"screenplay\" mean?",
      "choices": [
        "the music boss",
        "a movie's written words",
        "poem lines",
        "music before the show"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0856",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"teleplay\" mean?",
      "choices": [
        "a TV show's written words",
        "digging up old things",
        "the first show",
        "dancing to tell a story"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0857",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"storyboard\" mean?",
      "choices": [
        "the tune",
        "drawn plans for a film",
        "how speech sounds",
        "poem lines"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0858",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"montage\" mean?",
      "choices": [
        "many short clips together",
        "one who writes plays",
        "picture writing",
        "the boss of the show"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0859",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"close-up\" mean?",
      "choices": [
        "rolled-up writing",
        "how speech sounds",
        "a very near camera shot",
        "the colors an artist uses"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0860",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"panorama\" mean?",
      "choices": [
        "a group playing together",
        "a song that tells a story",
        "a very wide view",
        "an afternoon show"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0861",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"diorama\" mean?",
      "choices": [
        "very, very old",
        "a small 3D scene",
        "very old and no longer used",
        "all the works a group knows"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0862",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"mural\" mean?",
      "choices": [
        "a big wall painting",
        "a group playing together",
        "drawn plans for a film",
        "one who writes music"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0863",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"fresco\" mean?",
      "choices": [
        "digging up old things",
        "a small 3D scene",
        "one person talking long",
        "painting on wet plaster"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0864",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"mosaic\" mean?",
      "choices": [
        "an old made thing",
        "studying old things",
        "a picture made of small pieces",
        "an old magic letter"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0865",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"collage\" mean?",
      "choices": [
        "art from glued pieces",
        "a very near camera shot",
        "a long family story",
        "talking in a play"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0866",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"portrait\" mean?",
      "choices": [
        "a painting of a person",
        "broken old buildings",
        "one sound in speech",
        "hard words of a job"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0867",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"landscape\" mean?",
      "choices": [
        "digging up old things",
        "a short three-line poem",
        "a piece for a star player",
        "a painting of land"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0868",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"still life\" mean?",
      "choices": [
        "dancing to tell a story",
        "an old handwritten book",
        "a painting of objects",
        "how fast music goes"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0869",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"abstract\" mean?",
      "choices": [
        "art that is not real-looking",
        "soft in music",
        "a movie's written words",
        "the beat pattern in poems"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0870",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"realism\" mean?",
      "choices": [
        "art that looks real",
        "the colors an artist uses",
        "hard words of a job",
        "the music boss"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0871",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"impressionism\" mean?",
      "choices": [
        "art of light and color",
        "the backup actor",
        "a book of memories",
        "a picture made of small pieces"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0872",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"cubism\" mean?",
      "choices": [
        "a very long hero story",
        "art of boxes and shapes",
        "art that looks real",
        "the flow of sounds"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0873",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"surrealism\" mean?",
      "choices": [
        "dream-like art",
        "an old magic letter",
        "a very near camera shot",
        "where actors perform"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0874",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"palette\" mean?",
      "choices": [
        "words that sound alike",
        "drawn plans for a film",
        "the boss of the show",
        "the colors an artist uses"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0875",
      "kind": "choice",
      "tier": 7,
      "prompt": "What does \"canvas\" mean?",
      "choices": [
        "cloth for painting on",
        "studying old things",
        "a movie's written words",
        "a long family story"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0876",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"benevolent\" mean?",
      "choices": [
        "thinking you are better",
        "kind and good",
        "the top stone of an arch",
        "a trick to win"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0877",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"malevolent\" mean?",
      "choices": [
        "a dreamlike state",
        "a machine that moves alone",
        "mean and wishing harm",
        "a robot like a person"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0878",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"magnanimous\" mean?",
      "choices": [
        "big-hearted and forgiving",
        "a wrong idea",
        "a curved top over a door",
        "to hold attention"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0879",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"altruistic\" mean?",
      "choices": [
        "spinning around",
        "a wrong idea",
        "putting others first",
        "to put in a trance"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0880",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"egotistical\" mean?",
      "choices": [
        "a robot like a person",
        "how sound acts in a room",
        "thinking only of yourself",
        "a low wall on top"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0881",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"narcissistic\" mean?",
      "choices": [
        "loving yourself too much",
        "a sign of what is coming",
        "one who runs ahead",
        "plain and tough"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0882",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"humble\" mean?",
      "choices": [
        "plain and strict",
        "too big and showy",
        "a false belief",
        "not thinking you are better"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0883",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"arrogant\" mean?",
      "choices": [
        "the path of a flying thing",
        "smart trickiness",
        "kind and good",
        "thinking you are better"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0884",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"conceited\" mean?",
      "choices": [
        "a church tower",
        "too proud of yourself",
        "being shy and quiet",
        "a wall that holds up a wall"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0885",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"pretentious\" mean?",
      "choices": [
        "loving yourself too much",
        "echo in a room",
        "the path around a planet",
        "trying to seem better"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0886",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"ostentatious\" mean?",
      "choices": [
        "a bridge that lifts up",
        "part person, part machine",
        "showing off wealth",
        "wise judgment"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0887",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"flamboyant\" mean?",
      "choices": [
        "a wall that holds up a wall",
        "cool and fancy",
        "bright and showy",
        "one full turn around"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0888",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"subdued\" mean?",
      "choices": [
        "quiet and not showy",
        "cool and fancy",
        "rich and fancy",
        "echoing together"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0889",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"understated\" mean?",
      "choices": [
        "a warning sign",
        "simple and not showy",
        "kind and good",
        "swinging back and forth"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0890",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"austere\" mean?",
      "choices": [
        "trying to seem better",
        "a trick of heat and light",
        "part person, part machine",
        "plain and strict"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0891",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"spartan\" mean?",
      "choices": [
        "a safe fort",
        "plain and tough",
        "the line things spin on",
        "to put in a trance"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0892",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"lavish\" mean?",
      "choices": [
        "to put in a trance",
        "to hold attention",
        "what a door swings on",
        "rich and fancy"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0893",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"opulent\" mean?",
      "choices": [
        "one who tells what is coming",
        "a trap that catches",
        "a church tower",
        "very rich and fancy"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0894",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"sumptuous\" mean?",
      "choices": [
        "rich and pleasing",
        "a strong safe place",
        "speed in a direction",
        "showing off wealth"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0895",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"plush\" mean?",
      "choices": [
        "a huge unstoppable force",
        "a safe fort",
        "soft and fancy",
        "able to feel and think"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0896",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"posh\" mean?",
      "choices": [
        "a huge beast",
        "fancy and rich",
        "simple and not showy",
        "a safe fort"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0897",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"swanky\" mean?",
      "choices": [
        "machines that act alive",
        "big-hearted and forgiving",
        "to catch like in a net",
        "cool and fancy"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0898",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"ritzy\" mean?",
      "choices": [
        "fancy and pricey",
        "a tall pointed tower",
        "the point things turn on",
        "the front group"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0899",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"grandiose\" mean?",
      "choices": [
        "too big and showy",
        "a stone beast on a roof",
        "a huge sea beast",
        "tricky smartness"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0900",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"monumental\" mean?",
      "choices": [
        "huge and important",
        "sound bouncing back",
        "mean and wishing harm",
        "a small tower"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0901",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"titanic\" mean?",
      "choices": [
        "able to feel and think",
        "a risky opening move",
        "building robots",
        "huge like a giant"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0902",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"mammoth\" mean?",
      "choices": [
        "swinging back and forth",
        "huge like the beast",
        "able to feel and think",
        "simple and not showy"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0903",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"behemoth\" mean?",
      "choices": [
        "one full turn around",
        "a huge beast",
        "a small tower",
        "an arched ceiling"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0904",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"leviathan\" mean?",
      "choices": [
        "a trick to win",
        "a huge sea beast",
        "one who tells what is coming",
        "a fake to draw away"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0905",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"juggernaut\" mean?",
      "choices": [
        "thinking only of yourself",
        "a huge unstoppable force",
        "to catch like in a net",
        "swinging back and forth"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0906",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"catalyst\" mean?",
      "choices": [
        "a false belief",
        "the point things turn on",
        "something that starts change",
        "to catch in a trap"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0907",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"impetus\" mean?",
      "choices": [
        "a gate that drops down",
        "machines that act alive",
        "a push to start",
        "swinging back and forth"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0908",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"momentum\" mean?",
      "choices": [
        "the push of moving things",
        "rich and fancy",
        "a water ditch around a fort",
        "echoing together"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0909",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"inertia\" mean?",
      "choices": [
        "food to catch with",
        "staying still or moving on",
        "a huge unstoppable force",
        "a high fort wall"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0910",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"friction\" mean?",
      "choices": [
        "something that fools the eye",
        "too big and showy",
        "rubbing that slows things",
        "staying still or moving on"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0911",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"traction\" mean?",
      "choices": [
        "smart trickiness",
        "what comes first",
        "a sign of what is coming",
        "grip that moves things"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0912",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"leverage\" mean?",
      "choices": [
        "using a tool to lift more",
        "a safe fort",
        "the front group",
        "a sign of what is coming"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0913",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"fulcrum\" mean?",
      "choices": [
        "using a tool to lift more",
        "a dreamlike state",
        "the point a lever turns on",
        "one full turn around"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0914",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"torque\" mean?",
      "choices": [
        "an arched ceiling",
        "the main castle tower",
        "too proud of yourself",
        "twisting force"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0915",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"velocity\" mean?",
      "choices": [
        "a trick to win",
        "speed in a direction",
        "one who tells what is coming",
        "a huge beast"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0916",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"acceleration\" mean?",
      "choices": [
        "seeing what is true",
        "getting faster",
        "big-hearted and forgiving",
        "plain and strict"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0917",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"deceleration\" mean?",
      "choices": [
        "the push of moving things",
        "a trap that catches",
        "huge like a giant",
        "getting slower"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0918",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"trajectory\" mean?",
      "choices": [
        "the top stone of an arch",
        "the path of a flying thing",
        "a stone beast on a roof",
        "rich and fancy"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0919",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"orbit\" mean?",
      "choices": [
        "a high fort wall",
        "tiny fast shaking",
        "the path around a planet",
        "sending data from far"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0920",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"revolution\" mean?",
      "choices": [
        "to hold with wonder",
        "to catch like in a net",
        "one full turn around",
        "to catch in a trap"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0921",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"rotation\" mean?",
      "choices": [
        "spinning around",
        "a wrong idea",
        "deep sleep from hurt",
        "tiny fast shaking"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0922",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"axis\" mean?",
      "choices": [
        "a push to start",
        "a huge unstoppable force",
        "huge like a giant",
        "the line things spin on"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0923",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"pivot\" mean?",
      "choices": [
        "the point things turn on",
        "what comes first",
        "a stone beast on a roof",
        "huge and important"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0924",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"hinge\" mean?",
      "choices": [
        "rich and fancy",
        "what a door swings on",
        "smart trickiness",
        "a huge unstoppable force"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0925",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"pendulum\" mean?",
      "choices": [
        "a water ditch around a fort",
        "a weight that swings",
        "what a door swings on",
        "trying to seem better"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0926",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"oscillation\" mean?",
      "choices": [
        "the point things turn on",
        "swinging back and forth",
        "a push to start",
        "to catch like in a net"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0927",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"vibration\" mean?",
      "choices": [
        "tiny fast shaking",
        "a bell tower",
        "smart trickiness",
        "showing off wealth"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0928",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"resonance\" mean?",
      "choices": [
        "the point things turn on",
        "plain and tough",
        "tricky smartness",
        "echoing together"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0929",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"echo\" mean?",
      "choices": [
        "tiny fast shaking",
        "food to catch with",
        "able to feel and think",
        "sound bouncing back"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0930",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"reverb\" mean?",
      "choices": [
        "echo in a room",
        "a wrong idea",
        "a fake move",
        "something that starts change"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0931",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"acoustics\" mean?",
      "choices": [
        "to hold attention",
        "a bell tower",
        "cool and fancy",
        "how sound acts in a room"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0932",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"sonar\" mean?",
      "choices": [
        "something that starts change",
        "a trick to win",
        "finding things with sound",
        "very rich and fancy"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0933",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"radar\" mean?",
      "choices": [
        "finding things with waves",
        "tricky smartness",
        "a sign of what is coming",
        "able to feel and think"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0934",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"telemetry\" mean?",
      "choices": [
        "sending data from far",
        "thinking only of yourself",
        "rubbing that slows things",
        "echo in a room"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0935",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"cybernetics\" mean?",
      "choices": [
        "a huge beast",
        "plain and tough",
        "machines that act alive",
        "a stone beast on a roof"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0936",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"robotics\" mean?",
      "choices": [
        "how sound acts in a room",
        "echoing together",
        "building robots",
        "able to feel and think"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0937",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"automaton\" mean?",
      "choices": [
        "plain and strict",
        "a machine that moves alone",
        "thinking only of yourself",
        "a low wall on top"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0938",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"android\" mean?",
      "choices": [
        "a church tower",
        "a robot like a person",
        "a dreamlike state",
        "plain and strict"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0939",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"cyborg\" mean?",
      "choices": [
        "part person, part machine",
        "the path around a planet",
        "a wrong idea",
        "seeing what is true"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0940",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"sentient\" mean?",
      "choices": [
        "able to feel and think",
        "mean and wishing harm",
        "a huge beast",
        "finding things with sound"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0941",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"sapience\" mean?",
      "choices": [
        "a gate that drops down",
        "deep wisdom",
        "food to catch with",
        "grip that moves things"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0942",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"sagacity\" mean?",
      "choices": [
        "to catch like in a net",
        "a gate that drops down",
        "wise judgment",
        "food to catch with"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0943",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"prudence\" mean?",
      "choices": [
        "a small tower",
        "grip that moves things",
        "a risky opening move",
        "careful wisdom"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0944",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"discernment\" mean?",
      "choices": [
        "a strong safe place",
        "a push to start",
        "seeing what is true",
        "a wall that holds up a wall"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0945",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"acumen\" mean?",
      "choices": [
        "what comes first",
        "seeing what is not there",
        "quick smart thinking",
        "rich and fancy"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0946",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"shrewdness\" mean?",
      "choices": [
        "fancy and rich",
        "smart trickiness",
        "the path around a planet",
        "the line things spin on"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0947",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"guile\" mean?",
      "choices": [
        "tricky smartness",
        "soft and fancy",
        "thinking only of yourself",
        "staying still or moving on"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0948",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"ruse\" mean?",
      "choices": [
        "a strong fort",
        "a trick plan",
        "finding things with waves",
        "echoing together"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0949",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"ploy\" mean?",
      "choices": [
        "a trick to win",
        "sending data from far",
        "a church tower",
        "a gate that drops down"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0950",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"stratagem\" mean?",
      "choices": [
        "a smart trick plan",
        "wise judgment",
        "part person, part machine",
        "finding things with waves"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0951",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"gambit\" mean?",
      "choices": [
        "the path around a planet",
        "a gate that drops down",
        "mean and wishing harm",
        "a risky opening move"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0952",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"feint\" mean?",
      "choices": [
        "a stone beast on a roof",
        "plain and tough",
        "a fake move",
        "smart trickiness"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0953",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"decoy\" mean?",
      "choices": [
        "big-hearted and forgiving",
        "one who runs ahead",
        "too proud of yourself",
        "a fake to draw away"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0954",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"lure\" mean?",
      "choices": [
        "bait to draw in",
        "using a tool to lift more",
        "a strong safe place",
        "a huge unstoppable force"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0955",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"bait\" mean?",
      "choices": [
        "food to catch with",
        "a strong fort",
        "the point things turn on",
        "to put in a trance"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0956",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"snare\" mean?",
      "choices": [
        "huge like the beast",
        "a trick of heat and light",
        "trying to seem better",
        "a trap that catches"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0957",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"entrap\" mean?",
      "choices": [
        "to catch in a trap",
        "building robots",
        "a smart trick plan",
        "where the bells hang"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0958",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"ensnare\" mean?",
      "choices": [
        "to catch like in a net",
        "one who tells what is coming",
        "a tall pointed tower",
        "to hold with wonder"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0959",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"captivate\" mean?",
      "choices": [
        "very rich and fancy",
        "a huge sea beast",
        "tiny fast shaking",
        "to hold attention"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0960",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"mesmerize\" mean?",
      "choices": [
        "to hold with wonder",
        "a huge beast",
        "a push to start",
        "a tall pointed tower"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0961",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"hypnotize\" mean?",
      "choices": [
        "something that fools the eye",
        "echoing together",
        "to put in a trance",
        "soft and fancy"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0962",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"trance\" mean?",
      "choices": [
        "a dreamlike state",
        "a false belief",
        "the line things spin on",
        "trying to seem better"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0963",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"stupor\" mean?",
      "choices": [
        "building robots",
        "very rich and fancy",
        "a dazed state",
        "the point things turn on"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0964",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"coma\" mean?",
      "choices": [
        "swinging back and forth",
        "deep sleep from hurt",
        "too proud of yourself",
        "plain and tough"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0965",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"delirium\" mean?",
      "choices": [
        "wild confused thoughts",
        "a wall that holds up a wall",
        "bait to draw in",
        "a wall with gaps for shooting"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0966",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"hallucination\" mean?",
      "choices": [
        "showing off wealth",
        "simple and not showy",
        "a false belief",
        "seeing what is not there"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0967",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"mirage\" mean?",
      "choices": [
        "a warning sign",
        "putting others first",
        "a trick of heat and light",
        "deep wisdom"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0968",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"illusion\" mean?",
      "choices": [
        "the path around a planet",
        "wild confused thoughts",
        "something that fools the eye",
        "a push to start"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0969",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"delusion\" mean?",
      "choices": [
        "cool and fancy",
        "a false belief",
        "twisting force",
        "a dazed state"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0970",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"fallacy\" mean?",
      "choices": [
        "part person, part machine",
        "careful wisdom",
        "what comes first",
        "a wrong idea"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0971",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"superstition\" mean?",
      "choices": [
        "grip that moves things",
        "staying still or moving on",
        "belief in magic luck",
        "to hold with wonder"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0972",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"omen\" mean?",
      "choices": [
        "huge like the beast",
        "a robot like a person",
        "to hold attention",
        "a sign of what is coming"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0973",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"portent\" mean?",
      "choices": [
        "a warning sign",
        "to hold attention",
        "huge like the beast",
        "a sign of good luck"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0974",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"harbinger\" mean?",
      "choices": [
        "too proud of yourself",
        "a wrong idea",
        "something that fools the eye",
        "one who tells what is coming"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0975",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"precursor\" mean?",
      "choices": [
        "showing off wealth",
        "plain and strict",
        "what comes first",
        "plain and tough"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0976",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"forerunner\" mean?",
      "choices": [
        "deep wisdom",
        "one who runs ahead",
        "a robot like a person",
        "a tall pointed tower"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0977",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"vanguard\" mean?",
      "choices": [
        "echo in a room",
        "a trap that catches",
        "kind and good",
        "the front group"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0978",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"rearguard\" mean?",
      "choices": [
        "to catch in a trap",
        "the back group",
        "finding things with waves",
        "one who tells what is coming"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0979",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"flank\" mean?",
      "choices": [
        "able to feel and think",
        "a dazed state",
        "a trick to win",
        "the side of an army"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0980",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"bastion\" mean?",
      "choices": [
        "a strong safe place",
        "loving yourself too much",
        "kind and good",
        "using a tool to lift more"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0981",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"citadel\" mean?",
      "choices": [
        "one full turn around",
        "something that starts change",
        "where the bells hang",
        "a strong fort"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0982",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"stronghold\" mean?",
      "choices": [
        "the path around a planet",
        "rubbing that slows things",
        "a safe fort",
        "a weight that swings"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0983",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"rampart\" mean?",
      "choices": [
        "a high fort wall",
        "big-hearted and forgiving",
        "staying still or moving on",
        "to put in a trance"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0984",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"parapet\" mean?",
      "choices": [
        "echoing together",
        "huge like a giant",
        "trying to seem better",
        "a low wall on top"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0985",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"battlement\" mean?",
      "choices": [
        "trying to seem better",
        "a gate that drops down",
        "simple and not showy",
        "a wall with gaps for shooting"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0986",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"moat\" mean?",
      "choices": [
        "simple and not showy",
        "deep wisdom",
        "a water ditch around a fort",
        "a huge beast"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0987",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"drawbridge\" mean?",
      "choices": [
        "a bridge that lifts up",
        "finding things with sound",
        "a robot like a person",
        "cool and fancy"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0988",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"portcullis\" mean?",
      "choices": [
        "plain and strict",
        "careful wisdom",
        "quick smart thinking",
        "a gate that drops down"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0989",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"keep\" mean?",
      "choices": [
        "a wrong idea",
        "a water ditch around a fort",
        "kind and good",
        "the strong tower of a castle"
      ],
      "answer": 3
    },
    {
      "qid": "rq-vocabulary-0990",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"donjon\" mean?",
      "choices": [
        "the main castle tower",
        "wise judgment",
        "a low wall on top",
        "quick smart thinking"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0991",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"turret\" mean?",
      "choices": [
        "smart trickiness",
        "a sign of what is coming",
        "a small tower",
        "the front group"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0992",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"spire\" mean?",
      "choices": [
        "the line things spin on",
        "a small tower",
        "a tall pointed tower",
        "seeing what is true"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0993",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"steeple\" mean?",
      "choices": [
        "a fake to draw away",
        "a church tower",
        "mean and wishing harm",
        "wise judgment"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0994",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"belfry\" mean?",
      "choices": [
        "where the bells hang",
        "a trick plan",
        "careful wisdom",
        "one who runs ahead"
      ],
      "answer": 0
    },
    {
      "qid": "rq-vocabulary-0995",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"campanile\" mean?",
      "choices": [
        "deep sleep from hurt",
        "a small tower",
        "a bell tower",
        "a false belief"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0996",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"gargoyle\" mean?",
      "choices": [
        "huge like a giant",
        "a stone beast on a roof",
        "spinning around",
        "echo in a room"
      ],
      "answer": 1
    },
    {
      "qid": "rq-vocabulary-0997",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"buttress\" mean?",
      "choices": [
        "a strong safe place",
        "tricky smartness",
        "a wall that holds up a wall",
        "to catch like in a net"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0998",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"keystone\" mean?",
      "choices": [
        "a stone beast on a roof",
        "cool and fancy",
        "the top stone of an arch",
        "soft and fancy"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-0999",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"arch\" mean?",
      "choices": [
        "simple and not showy",
        "quiet and not showy",
        "a curved top over a door",
        "a church tower"
      ],
      "answer": 2
    },
    {
      "qid": "rq-vocabulary-1000",
      "kind": "choice",
      "tier": 8,
      "prompt": "What does \"vault\" mean?",
      "choices": [
        "a gate that drops down",
        "an arched ceiling",
        "a huge unstoppable force",
        "too big and showy"
      ],
      "answer": 1
    }
  ];

  window.RQBank = window.RQBank || {};
  window.RQBank.vocabulary = ITEMS;
})();
