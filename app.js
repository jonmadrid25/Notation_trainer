const noteLetters = ["C", "D", "E", "F", "G", "A", "B"];
const staff = document.querySelector("#staff");
const answers = document.querySelector("#answers");
const promptEl = document.querySelector("#prompt");
const scoreEl = document.querySelector("#score");
const streakEl = document.querySelector("#streak");
const accuracyEl = document.querySelector("#accuracy");
const instrumentPresets = document.querySelector("#instrument-presets");
const practiceChoice = document.querySelector("#practice-choice");
const practiceNoteNames = document.querySelector("#practice-note-names");
const practiceScales = document.querySelector("#practice-scales");
const practiceKeySignatures = document.querySelector("#practice-key-signatures");
const practiceMicrophone = document.querySelector("#practice-microphone");
const welcomeActions = document.querySelector("#welcome-actions");
const welcomeBack = document.querySelector("#welcome-back");
const welcomeCopy = document.querySelector("#welcome-copy");
const scalePresets = document.querySelector("#scale-presets");
const noteNameToolbar = document.querySelector("#note-name-toolbar");
const noteToolbarTitle = document.querySelector("#note-toolbar-title");
const noteToolbarSubtitle = document.querySelector("#note-toolbar-subtitle");
const noteInstrumentSelect = document.querySelector("#note-instrument-select");
const noteClefSelect = document.querySelector("#note-clef-select");
const noteLowSelect = document.querySelector("#note-low-select");
const noteHighSelect = document.querySelector("#note-high-select");
const noteModeSelect = document.querySelector("#note-mode-select");
const microphoneNotationLabel = document.querySelector("#microphone-notation-label");
const microphoneNotationSelect = document.querySelector("#microphone-notation-select");
const scaleToolbar = document.querySelector("#scale-toolbar");
const scaleToolbarInstrument = document.querySelector("#scale-toolbar-instrument");
const scaleInstrumentSelect = document.querySelector("#scale-instrument-select");
const scaleClefLabel = document.querySelector("#scale-clef-label");
const scaleClefSelect = document.querySelector("#scale-clef-select");
const scaleSelect = document.querySelector("#scale-select");
const scaleNotationSelect = document.querySelector("#scale-notation-select");
const keySignatureToolbar = document.querySelector("#key-signature-toolbar");
const keySignatureOptions = document.querySelector("#key-signature-options");
const microphoneKeyOptions = document.querySelector("#microphone-key-options");
const keySignatureClefSelect = document.querySelector("#key-signature-clef-select");
const homeButton = document.querySelector("#home-button");
const autoNextToggle = document.querySelector("#auto-next");
const lowSelect = document.querySelector("#low-note");
const highSelect = document.querySelector("#high-note");
const bassPresetTenorToggle = document.querySelector("#bass-instruments-tenor-clef");
const reviewList = document.querySelector("#review-list");
const noteHelpersButton = document.querySelector("#note-helpers");
const nextNoteButton = document.querySelector("#next-note");
const showAnswerButton = document.querySelector("#show-answer");
const microphonePanel = document.querySelector("#microphone-panel");
const microphoneToggle = document.querySelector("#microphone-toggle");
const microphoneStatus = document.querySelector("#microphone-status");
const detectedNote = document.querySelector("#detected-note");
const detectedTuning = document.querySelector("#detected-tuning");
const settingsToggle = document.querySelector("#settings-toggle");
const settingsClose = document.querySelector("#settings-close");
const settingsPanel = document.querySelector("#settings-panel");
const settingsBackdrop = document.querySelector("#settings-backdrop");
const modeButtons = document.querySelectorAll("[data-mode]");
const clefButtons = document.querySelectorAll("[data-clef]");

const pitchClasses = [
  { names: [{ name: "C", octaveOffset: 0 }, { name: "B#", octaveOffset: -1 }], semitone: 0 },
  { names: [{ name: "C#", octaveOffset: 0 }, { name: "Db", octaveOffset: 0 }], semitone: 1 },
  { names: [{ name: "D", octaveOffset: 0 }], semitone: 2 },
  { names: [{ name: "D#", octaveOffset: 0 }, { name: "Eb", octaveOffset: 0 }], semitone: 3 },
  { names: [{ name: "E", octaveOffset: 0 }, { name: "Fb", octaveOffset: 0 }], semitone: 4 },
  { names: [{ name: "F", octaveOffset: 0 }, { name: "E#", octaveOffset: 0 }], semitone: 5 },
  { names: [{ name: "F#", octaveOffset: 0 }, { name: "Gb", octaveOffset: 0 }], semitone: 6 },
  { names: [{ name: "G", octaveOffset: 0 }], semitone: 7 },
  { names: [{ name: "G#", octaveOffset: 0 }, { name: "Ab", octaveOffset: 0 }], semitone: 8 },
  { names: [{ name: "A", octaveOffset: 0 }], semitone: 9 },
  { names: [{ name: "A#", octaveOffset: 0 }, { name: "Bb", octaveOffset: 0 }], semitone: 10 },
  { names: [{ name: "B", octaveOffset: 0 }, { name: "Cb", octaveOffset: 1 }], semitone: 11 }
];

const accidentalSymbols = {
  "#": "♯",
  b: "♭"
};

const answerGroups = [
  { key: "sharp", label: "Sharps", accidental: "#" },
  { key: "natural", label: "Naturals", accidental: "" },
  { key: "flat", label: "Flats", accidental: "b" }
];

const instrumentRanges = [
  { name: "Custom", low: "C3", high: "C5", clef: "treble", family: "Custom" },
  { name: "Bass Clarinet", low: "C3", high: "G6", clef: "treble", family: "Woodwind" },
  { name: "Bassoon", low: "Bb1", high: "Eb5", clef: "bass", family: "Woodwind" },
  { name: "Cello", low: "C2", high: "C6", clef: "bass", family: "Strings" },
  { name: "Chimes", low: "C4", high: "F5", clef: "treble", family: "Percussion" },
  { name: "Clarinet", low: "E3", high: "C7", clef: "treble", family: "Woodwind" },
  { name: "Contrabassoon", low: "Bb1", high: "Bb4", clef: "bass", family: "Woodwind" },
  { name: "Double Bass", low: "C2", high: "C5", clef: "bass", family: "Strings" },
  { name: "English Horn", low: "B3", high: "G6", clef: "treble", family: "Woodwind" },
  { name: "Euphonium / Baritone", low: "Bb1", high: "Bb4", clef: "bass", family: "Brass" },
  { name: "Flute", low: "C4", high: "D7", clef: "treble", family: "Woodwind" },
  { name: "Glockenspiel (Bells)", low: "G3", high: "C6", clef: "treble", family: "Percussion" },
  { name: "Guitar", low: "E3", high: "E6", clef: "treble", family: "Strings" },
  { name: "Harp", low: "C1", high: "F#7", clef: "treble", family: "Strings" },
  { name: "Horn", low: "F#2", high: "C6", clef: "treble", family: "Brass" },
  { name: "Marimba", low: "C2", high: "C7", clef: "treble", family: "Percussion" },
  { name: "Oboe", low: "Bb3", high: "A6", clef: "treble", family: "Woodwind" },
  { name: "Piano", low: "C1", high: "C8", clef: "treble", family: "Percussion" },
  { name: "Piccolo", low: "D4", high: "C7", clef: "treble", family: "Woodwind" },
  { name: "Saxophone", low: "Bb3", high: "G6", clef: "treble", family: "Woodwind" },
  { name: "Timpani", low: "D2", high: "C4", clef: "bass", family: "Percussion" },
  { name: "Trombone", low: "E2", high: "F5", clef: "bass", family: "Brass" },
  { name: "Trumpet", low: "F#3", high: "D6", clef: "treble", family: "Brass" },
  { name: "Tuba", low: "D1", high: "F4", clef: "bass", family: "Brass" },
  { name: "Vibraphone", low: "F3", high: "F6", clef: "treble", family: "Percussion" },
  { name: "Viola", low: "C3", high: "E6", clef: "alto", family: "Strings" },
  { name: "Violin", low: "G3", high: "A7", clef: "treble", family: "Strings" },
  { name: "Xylophone", low: "F3", high: "C7", clef: "treble", family: "Percussion" }
];

const instrumentFamilyOrder = ["Custom", "Brass", "Woodwind", "Strings", "Percussion"];

const scaleDefinitions = [
  {
    id: "bb-major",
    label: "Bb Major",
    noteIds: (octave) => [`Bb${octave}`, `C${octave + 1}`, `D${octave + 1}`, `Eb${octave + 1}`, `F${octave + 1}`, `G${octave + 1}`, `A${octave + 1}`, `Bb${octave + 1}`]
  },
  {
    id: "b-major",
    label: "B Major",
    noteIds: (octave) => [`B${octave}`, `C#${octave + 1}`, `D#${octave + 1}`, `E${octave + 1}`, `F#${octave + 1}`, `G#${octave + 1}`, `A#${octave + 1}`, `B${octave + 1}`]
  },
  {
    id: "c-major",
    label: "C Major",
    noteIds: (octave) => [`C${octave}`, `D${octave}`, `E${octave}`, `F${octave}`, `G${octave}`, `A${octave}`, `B${octave}`, `C${octave + 1}`]
  },
  {
    id: "db-major",
    label: "Db Major",
    noteIds: (octave) => [`Db${octave}`, `Eb${octave}`, `F${octave}`, `Gb${octave}`, `Ab${octave}`, `Bb${octave}`, `C${octave + 1}`, `Db${octave + 1}`]
  },
  {
    id: "d-major",
    label: "D Major",
    noteIds: (octave) => [`D${octave}`, `E${octave}`, `F#${octave}`, `G${octave}`, `A${octave}`, `B${octave}`, `C#${octave + 1}`, `D${octave + 1}`]
  },
  {
    id: "eb-major",
    label: "Eb Major",
    noteIds: (octave) => [`Eb${octave}`, `F${octave}`, `G${octave}`, `Ab${octave}`, `Bb${octave}`, `C${octave + 1}`, `D${octave + 1}`, `Eb${octave + 1}`]
  },
  {
    id: "e-major",
    label: "E Major",
    noteIds: (octave) => [`E${octave}`, `F#${octave}`, `G#${octave}`, `A${octave}`, `B${octave}`, `C#${octave + 1}`, `D#${octave + 1}`, `E${octave + 1}`]
  },
  {
    id: "f-major",
    label: "F Major",
    noteIds: (octave) => [`F${octave}`, `G${octave}`, `A${octave}`, `Bb${octave}`, `C${octave + 1}`, `D${octave + 1}`, `E${octave + 1}`, `F${octave + 1}`]
  },
  {
    id: "gb-major",
    label: "Gb Major",
    noteIds: (octave) => [`Gb${octave}`, `Ab${octave}`, `Bb${octave}`, `Cb${octave + 1}`, `Db${octave + 1}`, `Eb${octave + 1}`, `F${octave + 1}`, `Gb${octave + 1}`]
  },
  {
    id: "g-major",
    label: "G Major",
    noteIds: (octave) => [`G${octave}`, `A${octave}`, `B${octave}`, `C${octave + 1}`, `D${octave + 1}`, `E${octave + 1}`, `F#${octave + 1}`, `G${octave + 1}`]
  },
  {
    id: "ab-major",
    label: "Ab Major",
    noteIds: (octave) => [`Ab${octave}`, `Bb${octave}`, `C${octave + 1}`, `Db${octave + 1}`, `Eb${octave + 1}`, `F${octave + 1}`, `G${octave + 1}`, `Ab${octave + 1}`]
  },
  {
    id: "a-major",
    label: "A Major",
    noteIds: (octave) => [`A${octave}`, `B${octave}`, `C#${octave + 1}`, `D${octave + 1}`, `E${octave + 1}`, `F#${octave + 1}`, `G#${octave + 1}`, `A${octave + 1}`]
  },
  {
    id: "bb-chromatic",
    label: "Bb Chromatic",
    keySignatureLabel: "Bb Major",
    noteIds: (octave) => [`Bb${octave}`, `B${octave}`, `C${octave + 1}`, `Db${octave + 1}`, `D${octave + 1}`, `Eb${octave + 1}`, `E${octave + 1}`, `F${octave + 1}`, `Gb${octave + 1}`, `G${octave + 1}`, `Ab${octave + 1}`, `A${octave + 1}`, `Bb${octave + 1}`]
  }
];

const keySignatureDefinitions = [
  { label: "C Major", accidental: "", count: 0 },
  { label: "G Major", accidental: "#", count: 1 },
  { label: "D Major", accidental: "#", count: 2 },
  { label: "A Major", accidental: "#", count: 3 },
  { label: "E Major", accidental: "#", count: 4 },
  { label: "B Major", accidental: "#", count: 5 },
  { label: "Gb Major", accidental: "b", count: 6 },
  { label: "Db Major", accidental: "b", count: 5 },
  { label: "Ab Major", accidental: "b", count: 4 },
  { label: "Eb Major", accidental: "b", count: 3 },
  { label: "Bb Major", accidental: "b", count: 2 },
  { label: "F Major", accidental: "b", count: 1 }
];

const keySignatureAccidentalNotes = {
  treble: {
    "#": ["F5", "C5", "G5", "D5", "A4", "E5", "B4"],
    b: ["B4", "E5", "A4", "D5", "G4", "C5", "F4"]
  },
  bass: {
    "#": ["F3", "C3", "G3", "D3", "A2", "E3", "B2"],
    b: ["B2", "E3", "A2", "D3", "G2", "C3", "F2"]
  },
  alto: {
    "#": ["F4", "C4", "G4", "D4", "A3", "E4", "B3"],
    b: ["B3", "E4", "A3", "D4", "G3", "C4", "F3"]
  },
  tenor: {
    "#": ["F4", "C4", "G4", "D4", "A3", "E4", "B3"],
    b: ["B3", "E4", "A3", "D4", "G3", "C4", "F3"]
  }
};

const state = {
  current: null,
  keySignature: null,
  practiceMode: "notes",
  clef: "treble",
  customLowPitch: null,
  customHighPitch: null,
  scaleName: null,
  scaleNoteIds: null,
  scaleInstrumentIndex: null,
  scaleClef: null,
  scaleKeySignatureLabel: null,
  scaleNotationMode: "accidentals",
  currentScaleId: "bb-major",
  microphoneNotationMode: "accidentals",
  microphoneKeySignatureLabel: "C Major",
  microphoneSelectedKeySignatures: new Set(keySignatureDefinitions.map((key) => key.label)),
  selectedKeySignatures: new Set(keySignatureDefinitions.map((key) => key.label)),
  mode: "all",
  showHelpers: false,
  autoNext: false,
  answered: false,
  score: 0,
  streak: 0,
  attempts: 0,
  correct: 0,
  misses: new Map(),
  recent: []
};

let activeInstrumentIndex = 0;
let autoNextTimer = null;
let microphoneStream = null;
let microphoneContext = null;
let microphoneAnalyser = null;
let microphoneAnimationFrame = null;
let microphoneCorrectFrameCount = 0;

const staffGeometry = {
  topLineY: 100,
  lineGap: 22,
  noteX: 420,
  noteRx: 19,
  noteRy: 7.5,
  noteTilt: -20
};

const clefs = {
  treble: {
    name: "Treble",
    symbol: "&#119070;",
    symbolX: 92,
    symbolY: 207,
    symbolSize: 148,
    bottomLineNote: "E4"
  },
  alto: {
    name: "Alto",
    symbol: "&#119073;",
    symbolX: 98,
    symbolY: 187,
    symbolSize: 118,
    bottomLineNote: "F3"
  },
  tenor: {
    name: "Tenor",
    symbol: "&#119073;",
    symbolX: 98,
    symbolY: 165,
    symbolSize: 118,
    bottomLineNote: "D3"
  },
  bass: {
    name: "Bass",
    symbol: "&#119074;",
    symbolX: 104,
    symbolY: 184,
    symbolSize: 112,
    bottomLineNote: "G2"
  }
};

const rangeMinNote = "C1";
const rangeMaxNote = "C8";
const defaultLowNote = "C3";
const defaultHighNote = "C5";
const notes = buildNotes(rangeMinNote, rangeMaxNote);
const rangeOptions = buildRangeOptions(rangeMinNote, rangeMaxNote);
state.customLowPitch = pitchValue(defaultLowNote);
state.customHighPitch = pitchValue(defaultHighNote);

function parseNote(id) {
  const [, letter, accidental = "", octaveText] = id.match(/^([A-G])([#b]?)(\d)$/);
  return { letter, accidental, octave: Number(octaveText) };
}

function noteValue(id) {
  const note = parseNote(id);
  return note.octave * 7 + noteLetters.indexOf(note.letter);
}

function noteLetterForValue(value) {
  return noteLetters[((value % noteLetters.length) + noteLetters.length) % noteLetters.length];
}

function pitchValue(id) {
  const note = parseNote(id);
  const naturalSemitones = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  const accidentalOffsets = { "#": 1, b: -1, "": 0 };
  return note.octave * 12 + naturalSemitones[note.letter] + accidentalOffsets[note.accidental];
}

function formatNoteName(name) {
  return name.replace(/([A-G])([#b])?(\d?)/g, (match, letter, accidental, octave) => {
    return `${letter}${accidentalSymbols[accidental] || ""}${octave}`;
  });
}

function buildNotes(low, high) {
  const output = [];
  const lowValue = pitchValue(low);
  const highValue = pitchValue(high);

  for (let octave = parseNote(low).octave; octave <= parseNote(high).octave; octave += 1) {
    for (const pitchClass of pitchClasses) {
      const pitch = octave * 12 + pitchClass.semitone;
      if (pitch >= lowValue && pitch <= highValue) {
        const displayNames = pitchClass.names
          .map((spelling) => `${spelling.name}${octave + spelling.octaveOffset}`)
          .filter((name) => parseNote(name).octave >= 1 && parseNote(name).octave <= 8);

        pitchClass.names.forEach((spelling) => {
          const id = `${spelling.name}${octave + spelling.octaveOffset}`;
          const displayNote = parseNote(id);
          if (displayNote.octave < 1 || displayNote.octave > 8) return;

          output.push({
            id,
            letter: displayNote.letter,
            accidental: displayNote.accidental,
            octave,
            pitch,
            value: noteValue(id),
            baseLabel: pitchClass.names.map((item) => item.name).join("/"),
            baseDisplayLabel: pitchClass.names.map((item) => formatNoteName(item.name)).join("/"),
            octaveLabel: displayNames.join("/"),
            octaveDisplayLabel: displayNames.map(formatNoteName).join("/"),
            answerLabels: [...pitchClass.names.map((item) => item.name), ...displayNames],
            isNatural: displayNote.accidental === "",
            frequency: frequencyFor(id)
          });
        });
      }
    }
  }

  return output;
}

function buildRangeOptions(low, high) {
  const output = [];
  const lowValue = pitchValue(low);
  const highValue = pitchValue(high);

  for (let octave = parseNote(low).octave; octave <= parseNote(high).octave; octave += 1) {
    for (const pitchClass of pitchClasses) {
      const pitch = octave * 12 + pitchClass.semitone;
      if (pitch >= lowValue && pitch <= highValue) {
        const names = pitchClass.names
          .map((spelling) => `${spelling.name}${octave + spelling.octaveOffset}`)
          .filter((name) => parseNote(name).octave >= 1 && parseNote(name).octave <= 8);
        output.push({
          value: pitch,
          label: names.map(formatNoteName).join("/")
        });
      }
    }
  }

  return output;
}

function clampPitch(id) {
  const min = pitchValue(rangeMinNote);
  const max = pitchValue(rangeMaxNote);
  return Math.min(Math.max(pitchValue(id), min), max);
}

function activeInstrument() {
  return instrumentRanges[activeInstrumentIndex];
}

function rangeNotes() {
  const low = Number(lowSelect.value);
  const high = Number(highSelect.value);

  return notes.filter((note) => {
    if (state.scaleNoteIds && !state.scaleNoteIds.includes(note.id)) return false;
    return note.pitch >= low && note.pitch <= high;
  });
}

function frequencyFor(id) {
  const semitonesFromA4 = pitchValue(id) - pitchValue("A4");
  return 440 * 2 ** (semitonesFromA4 / 12);
}

function noteNameForPitch(pitch) {
  const match = notes.find((note) => note.pitch === pitch && note.accidental === "");
  if (match) return match.id;

  const sharpNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const octave = Math.floor(pitch / 12);
  return `${sharpNames[((pitch % 12) + 12) % 12]}${octave}`;
}

function noteY(note) {
  const bottomLineY = staffGeometry.topLineY + staffGeometry.lineGap * 4;
  const halfStep = staffGeometry.lineGap / 2;
  const bottomLineValue = noteValue(clefs[state.clef].bottomLineNote);
  return bottomLineY - (note.value - bottomLineValue) * halfStep;
}

function activePool() {
  const ranged = rangeNotes();
  if (state.mode !== "missed") return ranged;

  const missed = ranged.filter((note) => state.misses.has(note.id));
  return missed.length ? missed : ranged;
}

function cancelAutoNext() {
  if (!autoNextTimer) return;
  window.clearTimeout(autoNextTimer);
  autoNextTimer = null;
}

function scheduleAutoNext() {
  cancelAutoNext();
  if (!state.autoNext) return;

  autoNextTimer = window.setTimeout(() => {
    autoNextTimer = null;
    chooseNext();
  }, 1400);
}

function chooseNext() {
  cancelAutoNext();

  if (state.practiceMode === "key-signatures") {
    chooseNextKeySignature();
    return;
  }

  const pool = activePool();
  if (!pool.length) {
    state.current = null;
    promptEl.textContent = "Choose a range with available notes.";
    staff.innerHTML = "";
    answers.innerHTML = "";
    return;
  }

  const previous = state.current?.id;
  const candidates = pool.length > 1 ? pool.filter((note) => note.id !== previous) : pool;
  state.current = candidates[Math.floor(Math.random() * candidates.length)];
  chooseMicrophoneKeySignature();
  state.answered = false;
  promptEl.textContent = state.practiceMode === "microphone"
    ? `Play this ${clefs[state.clef].name.toLowerCase()} clef note.`
    : state.scaleName
      ? `${state.scaleName}: name this ${clefs[state.clef].name.toLowerCase()} clef note.`
      : `Name this ${clefs[state.clef].name.toLowerCase()} clef note.`;
  renderStaff();
  if (state.practiceMode === "microphone") {
    renderMicrophonePractice();
  } else {
    renderAnswers();
  }
}

function chooseMicrophoneKeySignature() {
  if (state.practiceMode !== "microphone" || state.microphoneNotationMode !== "key-signature") return;

  const previous = state.microphoneKeySignatureLabel;
  const selectedKeys = keySignatureDefinitions.filter((key) => state.microphoneSelectedKeySignatures.has(key.label));
  const candidates = selectedKeys.length > 1
    ? selectedKeys.filter((key) => key.label !== previous)
    : selectedKeys;
  state.microphoneKeySignatureLabel = candidates[Math.floor(Math.random() * candidates.length)].label;
}

function chooseNextKeySignature() {
  const previous = state.keySignature?.label;
  const selectedKeys = keySignatureDefinitions.filter((key) => state.selectedKeySignatures.has(key.label));
  const candidates = selectedKeys.length > 1
    ? selectedKeys.filter((item) => item.label !== previous)
    : selectedKeys;
  state.keySignature = candidates[Math.floor(Math.random() * candidates.length)];
  state.answered = false;
  promptEl.textContent = `Name this ${clefs[state.clef].name.toLowerCase()} clef key signature.`;
  renderKeySignatureStaff();
  renderKeySignatureAnswers();
}

function renderKeySignatureStaff() {
  const { topLineY, lineGap } = staffGeometry;
  const clef = clefs[state.clef];
  const viewTop = 0;
  const viewBottom = 310;
  const signatureMarks = keySignatureMarks(state.keySignature);

  staff.setAttribute("viewBox", `0 ${viewTop} 720 ${viewBottom - viewTop}`);
  staff.innerHTML = `
    <rect x="0" y="${viewTop}" width="720" height="${viewBottom - viewTop}" rx="0" fill="#fffdfa"></rect>
    <text x="${clef.symbolX}" y="${clef.symbolY}" font-size="${clef.symbolSize}" font-family="Georgia, 'Times New Roman', serif" fill="#18212f">${clef.symbol}</text>
    ${[0, 1, 2, 3, 4].map((line) => {
      const lineY = topLineY + line * lineGap;
      return `<line x1="150" y1="${lineY}" x2="640" y2="${lineY}" stroke="#18212f" stroke-width="2"></line>`;
    }).join("")}
    ${signatureMarks}
  `;
}

function keySignatureForLabel(label) {
  return keySignatureDefinitions.find((key) => key.label === label) || keySignatureDefinitions[0];
}

function keySignatureMarks(signature) {
  const accidental = signature.accidental;
  if (!accidental) return "";

  return keySignatureAccidentalNotes[state.clef][accidental].slice(0, signature.count).map((noteId, index) => {
    const y = noteY({ value: noteValue(noteId) });
    const x = 250 + index * 34;
    return `<text x="${x}" y="${y}" font-size="52" dominant-baseline="middle" font-family="Georgia, 'Times New Roman', serif" font-weight="700" fill="#18212f">${accidentalSymbols[accidental]}</text>`;
  }).join("");
}

function activeWrittenKeySignature() {
  if (state.practiceMode === "scales" && state.scaleNotationMode === "key-signature") {
    return keySignatureForLabel(state.scaleKeySignatureLabel);
  }

  if (state.practiceMode === "microphone" && state.microphoneNotationMode === "key-signature") {
    return keySignatureForLabel(state.microphoneKeySignatureLabel);
  }

  return null;
}

function accidentalCoveredByKeySignature(note) {
  const signature = activeWrittenKeySignature();
  if (!signature || !signature.accidental || note.accidental !== signature.accidental) return false;

  return keySignatureAltersLetter(signature, note.letter);
}

function keySignatureAltersLetter(signature, letter) {
  const accidentalOrder = signature.accidental === "#"
    ? ["F", "C", "G", "D", "A", "E", "B"]
    : ["B", "E", "A", "D", "G", "C", "F"];
  return accidentalOrder.slice(0, signature.count).includes(letter);
}

function writtenAccidentalForCurrentNote(note) {
  const signature = activeWrittenKeySignature();
  if (!signature || !signature.accidental) return note.accidental;
  if (note.accidental === signature.accidental && keySignatureAltersLetter(signature, note.letter)) return "";
  if (note.accidental === "" && keySignatureAltersLetter(signature, note.letter)) return "natural";
  return note.accidental;
}

function renderStaff() {
  const y = noteY(state.current);
  const { topLineY, lineGap, noteRx, noteRy, noteTilt } = staffGeometry;
  const clef = clefs[state.clef];
  const ledgerLines = ledgerYPositions(y);
  const bottomLineY = topLineY + lineGap * 4;
  const viewTop = Math.min(0, y - 70);
  const viewBottom = Math.max(310, bottomLineY + 70, y + 70);
  const activeSignature = activeWrittenKeySignature();
  const noteX = activeSignature?.count > 3 ? 500 : staffGeometry.noteX;
  const helperLabels = state.showHelpers ? staffHelperLabels(ledgerLines, noteX) : "";
  const signatureMarks = activeSignature ? keySignatureMarks(activeSignature) : "";
  const writtenAccidental = writtenAccidentalForCurrentNote(state.current);
  const accidental = writtenAccidental
    ? `<text x="${noteX - 64}" y="${y + 13}" font-size="44" font-family="Georgia, 'Times New Roman', serif" font-weight="700" fill="#18212f">${writtenAccidental === "natural" ? "&#9838;" : accidentalSymbols[writtenAccidental]}</text>`
    : "";

  staff.setAttribute("viewBox", `0 ${viewTop} 720 ${viewBottom - viewTop}`);
  staff.innerHTML = `
    <rect x="0" y="${viewTop}" width="720" height="${viewBottom - viewTop}" rx="0" fill="#fffdfa"></rect>
    <text x="${clef.symbolX}" y="${clef.symbolY}" font-size="${clef.symbolSize}" font-family="Georgia, 'Times New Roman', serif" fill="#18212f">${clef.symbol}</text>
    ${[0, 1, 2, 3, 4].map((line) => {
      const lineY = topLineY + line * lineGap;
      return `<line x1="150" y1="${lineY}" x2="640" y2="${lineY}" stroke="#18212f" stroke-width="2"></line>`;
    }).join("")}
    ${signatureMarks}
    ${ledgerLines.map((lineY) => `
      <line x1="${noteX - 34}" y1="${lineY}" x2="${noteX + 34}" y2="${lineY}" stroke="#18212f" stroke-width="2"></line>
    `).join("")}
    ${helperLabels}
    ${accidental}
    <ellipse cx="${noteX}" cy="${y}" rx="${noteRx}" ry="${noteRy}" transform="rotate(${noteTilt} ${noteX} ${y})" fill="#18212f"></ellipse>
  `;
}

function staffHelperLabels(ledgerLines, noteX = staffGeometry.noteX) {
  const { topLineY, lineGap } = staffGeometry;
  const bottomLineValue = noteValue(clefs[state.clef].bottomLineNote);
  const bottomLineY = topLineY + lineGap * 4;
  const lineLabels = [0, 1, 2, 3, 4].map((line) => {
    const y = topLineY + line * lineGap;
    const value = bottomLineValue + (4 - line) * 2;
    return `<text class="staff-helper-label line-helper" x="132" y="${y + 5}" text-anchor="middle">${noteLetterForValue(value)}</text>`;
  }).join("");
  const spaceLabels = [0, 1, 2, 3].map((space) => {
    const y = topLineY + lineGap / 2 + space * lineGap;
    const value = bottomLineValue + 7 - space * 2;
    return `<text class="staff-helper-label space-helper" x="658" y="${y + 5}" text-anchor="middle">${noteLetterForValue(value)}</text>`;
  }).join("");
  const ledgerLabels = ledgerLines.map((lineY) => {
    const value = bottomLineValue + ((bottomLineY - lineY) / lineGap) * 2;
    return `<text class="staff-helper-label ledger-helper" x="${noteX + 58}" y="${lineY + 5}" text-anchor="middle">${noteLetterForValue(value)}</text>`;
  }).join("");

  return `${lineLabels}${spaceLabels}${ledgerLabels}`;
}

function ledgerYPositions(y) {
  const { topLineY, lineGap } = staffGeometry;
  const bottomLineY = topLineY + lineGap * 4;
  const lines = [];

  if (y > bottomLineY) {
    for (let lineY = bottomLineY + lineGap; lineY <= y + 1; lineY += lineGap) {
      lines.push(lineY);
    }
  }

  if (y < topLineY) {
    for (let lineY = topLineY - lineGap; lineY >= y - 1; lineY -= lineGap) {
      lines.push(lineY);
    }
  }

  return lines;
}

function renderAnswers() {
  const labels = rangeNotes().map((note) => {
    const value = note.id.replace(/\d$/, "");
    return {
      value,
      display: formatNoteName(value),
      accidental: note.accidental,
      letter: note.letter,
      pitch: note.pitch
    };
  });
  const uniqueLabels = [...new Map(labels.map((label) => [label.value, label])).values()];

  answers.innerHTML = answerGroups.map((group) => {
    const groupLabels = uniqueLabels.filter((label) => label.accidental === group.accidental);
    if (!groupLabels.length) return "";
    const columnLabels = noteLetters.map((letter) => (
      groupLabels
        .filter((label) => label.letter === letter)
        .sort((a, b) => a.pitch - b.pitch)
    ));

    return `
      <section class="answer-row answer-row-${group.key}" aria-label="${group.label}">
        <span class="answer-row-label">${group.label}</span>
        <div class="answer-row-buttons">
          ${columnLabels.map((labelsForLetter) => {
            if (!labelsForLetter.length) {
              return `<span class="answer-placeholder" aria-hidden="true"></span>`;
            }

            return labelsForLetter.map((label) => (
              `<button type="button" data-answer="${label.value}" aria-label="Answer ${label.display}">${label.display}</button>`
            )).join("");
          }).join("")}
        </div>
      </section>
    `;
  }).join("");
}

function renderKeySignatureAnswers() {
  const selectedKeys = keySignatureDefinitions.filter((key) => state.selectedKeySignatures.has(key.label));
  answers.innerHTML = `
    <section class="key-answer-row" aria-label="Major key answers">
      ${selectedKeys.map((key) => (
        `<button type="button" data-key-answer="${key.label}" aria-label="Answer ${key.label}">${key.label}</button>`
      )).join("")}
    </section>
  `;
}

function renderKeySignatureOptions() {
  keySignatureOptions.innerHTML = keySignatureDefinitions.map((key) => `
    <label class="key-option">
      <input type="checkbox" value="${key.label}" ${state.selectedKeySignatures.has(key.label) ? "checked" : ""}>
      <span>${key.label}</span>
    </label>
  `).join("");
}

function renderMicrophoneKeyOptions() {
  microphoneKeyOptions.innerHTML = keySignatureDefinitions.map((key) => `
    <label class="key-option">
      <input type="checkbox" value="${key.label}" ${state.microphoneSelectedKeySignatures.has(key.label) ? "checked" : ""}>
      <span>${key.label}</span>
    </label>
  `).join("");
}

function renderMicrophonePractice() {
  answers.innerHTML = "";
  microphonePanel.hidden = false;
  renderMicrophoneKeyOptions();
  syncNoteNameToolbar();
  microphoneCorrectFrameCount = 0;
  detectedNote.textContent = "--";
  detectedTuning.textContent = microphoneAnalyser
    ? "Listening for the written note."
    : "Start the microphone, then play the written note.";
  microphoneStatus.textContent = microphoneAnalyser ? "Microphone is listening." : "Microphone is off.";
}

function setMicrophoneListening(listening) {
  microphoneToggle.textContent = listening ? "Stop microphone" : "Start microphone";
  microphoneToggle.classList.toggle("active", listening);
  microphoneStatus.textContent = listening ? "Microphone is listening." : "Microphone is off.";
}

async function startMicrophoneMonitoring() {
  if (microphoneAnalyser) {
    stopMicrophoneMonitoring();
    return;
  }

  if (!navigator.mediaDevices?.getUserMedia) {
    microphoneStatus.textContent = "Microphone practice needs a browser with audio input support.";
    return;
  }

  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      microphoneStatus.textContent = "Microphone practice needs a browser with audio analysis support.";
      return;
    }

    microphoneStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false
      }
    });
    microphoneContext = new AudioContextClass();
    const source = microphoneContext.createMediaStreamSource(microphoneStream);
    microphoneAnalyser = microphoneContext.createAnalyser();
    microphoneAnalyser.fftSize = 4096;
    source.connect(microphoneAnalyser);
    setMicrophoneListening(true);
    listenForPitch();
  } catch (error) {
    microphoneStatus.textContent = "Microphone permission was not granted.";
    detectedTuning.textContent = "Press Start microphone to try again.";
  }
}

function stopMicrophoneMonitoring() {
  if (microphoneAnimationFrame) {
    cancelAnimationFrame(microphoneAnimationFrame);
    microphoneAnimationFrame = null;
  }

  microphoneStream?.getTracks().forEach((track) => track.stop());
  microphoneStream = null;
  microphoneAnalyser = null;
  microphoneContext?.close();
  microphoneContext = null;
  microphoneCorrectFrameCount = 0;
  setMicrophoneListening(false);
}

function listenForPitch() {
  if (!microphoneAnalyser || !microphoneContext) return;

  const buffer = new Float32Array(microphoneAnalyser.fftSize);
  microphoneAnalyser.getFloatTimeDomainData(buffer);
  const frequency = detectPitch(buffer, microphoneContext.sampleRate);

  if (frequency) {
    evaluatePlayedFrequency(frequency);
  } else if (!state.answered) {
    microphoneCorrectFrameCount = 0;
    detectedNote.textContent = "--";
    detectedTuning.textContent = "Listening for a steady pitch.";
  }

  microphoneAnimationFrame = requestAnimationFrame(listenForPitch);
}

function detectPitch(buffer, sampleRate) {
  let rms = 0;
  for (const sample of buffer) {
    rms += sample * sample;
  }
  rms = Math.sqrt(rms / buffer.length);
  if (rms < 0.012) return null;

  let bestOffset = -1;
  let bestCorrelation = 0;
  const minOffset = Math.floor(sampleRate / 1100);
  const maxOffset = Math.floor(sampleRate / 50);

  for (let offset = minOffset; offset <= maxOffset; offset += 1) {
    let correlation = 0;
    for (let index = 0; index < buffer.length - offset; index += 1) {
      correlation += buffer[index] * buffer[index + offset];
    }
    correlation /= buffer.length - offset;

    if (correlation > bestCorrelation) {
      bestCorrelation = correlation;
      bestOffset = offset;
    }
  }

  if (bestCorrelation < 0.002 || bestOffset < 0) return null;
  return sampleRate / bestOffset;
}

function evaluatePlayedFrequency(frequency) {
  if (!state.current || state.practiceMode !== "microphone") return;

  const detectedPitch = Math.round(pitchValue("A4") + 12 * Math.log2(frequency / 440));
  const expectedPitch = state.current.pitch;
  const expectedFrequency = frequencyFor(state.current.id);
  const cents = Math.round(1200 * Math.log2(frequency / expectedFrequency));
  const detectedName = noteNameForPitch(detectedPitch);
  const correct = detectedPitch === expectedPitch && Math.abs(cents) <= 50;

  detectedNote.textContent = formatNoteName(detectedName);

  if (correct) {
    microphoneCorrectFrameCount += 1;
    detectedTuning.textContent = "Correct note.";
  } else {
    microphoneCorrectFrameCount = 0;
    detectedTuning.textContent = `${Math.abs(cents)} cents ${cents > 0 ? "sharp" : "flat"} from the written note.`;
  }

  if (correct && microphoneCorrectFrameCount >= 8 && !state.answered) {
    checkMicrophoneAnswer();
  }
}

function checkMicrophoneAnswer() {
  if (state.answered) return;

  state.answered = true;
  state.attempts += 1;
  state.score += 10 + Math.min(state.streak, 5);
  state.streak += 1;
  state.correct += 1;
  promptEl.textContent = `${formatNoteName(state.current.id)} is correct.`;
  state.recent.unshift({ id: state.current.id, correct: true });
  state.recent = state.recent.slice(0, 12);
  renderStats();
  renderReview();
  scheduleAutoNext();
}

function answerValue(note) {
  return note.id.replace(/\d$/, "");
}

function checkKeySignatureAnswer(label) {
  if (state.answered) return;

  state.answered = true;
  state.attempts += 1;
  const expected = state.keySignature.label;
  const correct = label === expected;

  if (correct) {
    state.score += 10 + Math.min(state.streak, 5);
    state.streak += 1;
    state.correct += 1;
    promptEl.textContent = `${expected} is correct.`;
  } else {
    state.streak = 0;
    promptEl.textContent = `That key signature is ${expected}.`;
  }

  [...answers.querySelectorAll("button")].forEach((button) => {
    const value = button.dataset.keyAnswer;
    button.classList.toggle("correct", value === expected);
    button.classList.toggle("incorrect", value === label && !correct);
  });

  renderStats();
  scheduleAutoNext();
}

function checkAnswer(label) {
  if (state.practiceMode === "key-signatures") {
    checkKeySignatureAnswer(label);
    return;
  }

  if (state.answered) return;

  state.answered = true;
  state.attempts += 1;
  const expected = answerValue(state.current);
  const correct = label === expected;

  if (correct) {
    state.score += 10 + Math.min(state.streak, 5);
    state.streak += 1;
    state.correct += 1;
    promptEl.textContent = `${formatNoteName(state.current.id)} is correct.`;
  } else {
    state.streak = 0;
    const miss = state.misses.get(state.current.id) || { note: state.current, count: 0 };
    miss.count += 1;
    state.misses.set(state.current.id, miss);
    promptEl.textContent = `That note is ${formatNoteName(state.current.id)}.`;
  }

  state.recent.unshift({ id: state.current.id, correct });
  state.recent = state.recent.slice(0, 12);

  [...answers.querySelectorAll("button")].forEach((button) => {
    const value = button.dataset.answer;
    button.classList.toggle("correct", value === expected);
    button.classList.toggle("incorrect", value === label && !correct);
  });

  renderStats();
  renderReview();
  scheduleAutoNext();
}

function renderStats() {
  scoreEl.textContent = state.score;
  streakEl.textContent = state.streak;
  accuracyEl.textContent = state.attempts ? `${Math.round((state.correct / state.attempts) * 100)}%` : "0%";
}

function renderReview() {
  const misses = [...state.misses.values()].sort((a, b) => b.count - a.count);
  if (!misses.length) {
    reviewList.innerHTML = `<div class="empty-state">Missed notes will collect here.</div>`;
    return;
  }

  reviewList.innerHTML = misses.map(({ note, count }) => `
    <div class="review-item">
      <strong>${note.id}</strong>
      <span>${count} ${count === 1 ? "miss" : "misses"}</span>
    </div>
  `).join("");
}

function populateRangeControls() {
  renderScalePresets();
  populateNoteNameToolbar();
  renderInstrumentPresets();

  const options = rangeOptions.map((note) => `<option value="${note.value}">${note.label}</option>`).join("");
  lowSelect.innerHTML = options;
  highSelect.innerHTML = options;
  noteLowSelect.innerHTML = options;
  noteHighSelect.innerHTML = options;
  lowSelect.value = pitchValue(defaultLowNote);
  highSelect.value = pitchValue(defaultHighNote);
  noteLowSelect.value = lowSelect.value;
  noteHighSelect.value = highSelect.value;
}

function populateNoteNameToolbar() {
  noteInstrumentSelect.innerHTML = instrumentRanges.map((instrument, index) => `
    <option value="${index}">${instrument.name}</option>
  `).join("");
}

function syncNoteNameToolbar() {
  noteInstrumentSelect.value = String(activeInstrumentIndex);
  noteClefSelect.value = state.clef;
  noteLowSelect.value = lowSelect.value;
  noteHighSelect.value = highSelect.value;
  noteModeSelect.value = state.mode;
  microphoneNotationSelect.value = state.microphoneNotationMode;
  const microphoneMode = state.practiceMode === "microphone";
  microphoneNotationLabel.hidden = !microphoneMode;
  microphoneNotationSelect.hidden = !microphoneMode;
  microphoneKeyOptions.hidden = !microphoneMode || state.microphoneNotationMode !== "key-signature";
}

function scaleForInstrument(instrument, definition) {
  const low = pitchValue(instrument.low);
  const high = pitchValue(instrument.high);
  const preferredOctave = instrument.name === "Bassoon" || instrument.clef === "bass" ? 2 : 3;
  const octaveCandidates = [preferredOctave, preferredOctave + 1, preferredOctave - 1, preferredOctave + 2, preferredOctave - 2, 1, 2, 3, 4, 5, 6];
  const uniqueOctaves = [...new Set(octaveCandidates)].filter((octave) => octave >= 1 && octave <= 7);

  for (const octave of uniqueOctaves) {
    const noteIds = definition.noteIds(octave);
    const scaleLow = pitchValue(noteIds[0]);
    const scaleHigh = pitchValue(noteIds[noteIds.length - 1]);
    if (scaleLow >= low && scaleHigh <= high) {
      return {
        id: definition.id,
        label: definition.label,
        keySignatureLabel: definition.keySignatureLabel || definition.label,
        low: noteIds[0],
        high: noteIds[noteIds.length - 1],
        noteIds
      };
    }
  }

  return null;
}

function availableScalesForInstrument(instrument) {
  return scaleDefinitions
    .map((definition) => scaleForInstrument(instrument, definition))
    .filter(Boolean);
}

function renderScalePresets() {
  scalePresets.innerHTML = scaleInstrumentOptions().map(({ instrument, index }) => `
    <button type="button" class="scale-launch-button" data-scale-instrument-index="${index}">
      <span>${instrument.name}</span>
      <small>${clefs[instrument.clef].name} clef</small>
    </button>
  `).join("");
}

function scaleInstrumentOptions() {
  return instrumentRanges
    .map((instrument, index) => ({ instrument, index, scales: availableScalesForInstrument(instrument) }))
    .filter((item) => item.instrument.name !== "Custom" && item.scales.length);
}

function renderScaleInstrumentMenu() {
  scaleInstrumentSelect.innerHTML = scaleInstrumentOptions().map(({ instrument, index }) => `
    <option value="${index}">${instrument.name}</option>
  `).join("");
}

function renderScaleClefMenu(instrument) {
  const bassClefInstrument = instrument.clef === "bass";
  scaleClefLabel.hidden = !bassClefInstrument;
  scaleClefSelect.hidden = !bassClefInstrument;

  if (!bassClefInstrument) {
    scaleClefSelect.innerHTML = "";
    return instrument.clef;
  }

  scaleClefSelect.innerHTML = `
    <option value="bass">Bass</option>
    <option value="tenor">Tenor</option>
  `;

  const selectedClef = ["bass", "tenor"].includes(state.scaleClef) ? state.scaleClef : "bass";
  scaleClefSelect.value = selectedClef;
  return selectedClef;
}

function renderScaleMenu(scales) {
  scaleSelect.innerHTML = scales.map((scale) => `
    <option value="${scale.id}">${scale.label} (${formatNoteName(scale.low)}-${formatNoteName(scale.high)})</option>
  `).join("");
}

function renderInstrumentPresets() {
  instrumentPresets.innerHTML = instrumentFamilyOrder.map((family) => {
    const instruments = instrumentRanges
      .map((instrument, index) => ({ instrument, index }))
      .filter((item) => item.instrument.family === family);
    if (!instruments.length) return "";

    return `
      <section class="preset-family" aria-label="${family}">
        <h3>${family}</h3>
        <div class="preset-family-grid">
          ${instruments.map(({ instrument, index }) => {
            const rangeText = instrument.name === "Custom"
              ? "Manual"
              : `${formatNoteName(instrument.low)}-${formatNoteName(instrument.high)}`;
            const activeClass = index === activeInstrumentIndex ? " active" : "";
            const clef = clefs[clefForInstrument(instrument)].name;
            return `
              <button type="button" class="preset-button${activeClass}" data-instrument-index="${index}" title="${rangeText}, ${clef} clef">
                <span>${instrument.name}</span>
                <small>${rangeText} · ${clef}</small>
              </button>
            `;
          }).join("")}
        </div>
      </section>
    `;
  }).join("");
  setActiveInstrument(activeInstrumentIndex);
}

function setActiveInstrument(index) {
  activeInstrumentIndex = index;
  instrumentPresets.querySelectorAll("[data-instrument-index]").forEach((button) => {
    button.classList.toggle("active", button.dataset.instrumentIndex === String(index));
  });
}

function applyInstrument(index, targetMode = "notes") {
  cancelAutoNext();
  if (targetMode !== "microphone") stopMicrophoneMonitoring();
  const instrument = instrumentRanges[index];
  setActiveInstrument(index);
  state.practiceMode = targetMode;
  state.keySignature = null;
  state.scaleName = null;
  state.scaleNoteIds = null;
  state.scaleKeySignatureLabel = null;
  state.scaleInstrumentIndex = null;
  state.scaleClef = null;
  noteNameToolbar.hidden = false;
  scaleToolbar.hidden = true;
  keySignatureToolbar.hidden = true;
  keySignatureOptions.hidden = true;
  microphoneKeyOptions.hidden = targetMode !== "microphone" || state.microphoneNotationMode !== "key-signature";
  microphonePanel.hidden = targetMode !== "microphone";
  noteToolbarTitle.textContent = targetMode === "microphone" ? "Play Written Notes" : "Note Names";
  noteToolbarSubtitle.textContent = targetMode === "microphone" ? "Microphone practice" : "Full range practice";
  document.body.classList.remove("scale-practice", "key-signature-practice", "microphone-practice");
  document.body.classList.add("note-name-practice");
  if (targetMode === "microphone") document.body.classList.add("microphone-practice");

  if (instrument.name === "Custom") {
    lowSelect.value = String(state.customLowPitch);
    highSelect.value = String(state.customHighPitch);
  } else {
    lowSelect.value = String(clampPitch(instrument.low));
    highSelect.value = String(clampPitch(instrument.high));
    setClef(clefForInstrument(instrument));
  }

  syncNoteNameToolbar();
  nextNoteButton.textContent = "Next note";
  chooseNext();
}

function applyScalePreset(index, requestedScaleId = state.currentScaleId) {
  cancelAutoNext();
  stopMicrophoneMonitoring();
  const instrument = instrumentRanges[index];
  const scales = availableScalesForInstrument(instrument);
  const scale = scales.find((item) => item.id === requestedScaleId) || scales[0];
  if (!scale) return;

  setActiveInstrument(index);
  state.practiceMode = "scales";
  state.keySignature = null;
  state.scaleInstrumentIndex = index;
  state.currentScaleId = scale.id;
  state.scaleName = `${instrument.name} ${scale.label}`;
  state.scaleNoteIds = scale.noteIds;
  state.scaleKeySignatureLabel = scale.keySignatureLabel;
  noteNameToolbar.hidden = true;
  scaleToolbar.hidden = false;
  keySignatureToolbar.hidden = true;
  keySignatureOptions.hidden = true;
  microphoneKeyOptions.hidden = true;
  microphonePanel.hidden = true;
  document.body.classList.add("scale-practice");
  document.body.classList.remove("key-signature-practice", "microphone-practice");
  document.body.classList.remove("note-name-practice");
  scaleToolbarInstrument.textContent = instrument.name;
  renderScaleInstrumentMenu();
  scaleInstrumentSelect.value = String(index);
  state.scaleClef = renderScaleClefMenu(instrument);
  setClef(state.scaleClef);
  renderScaleMenu(scales);
  scaleSelect.value = scale.id;
  scaleNotationSelect.value = state.scaleNotationMode;
  lowSelect.value = String(pitchValue(scale.low));
  highSelect.value = String(pitchValue(scale.high));
  dismissWelcome();
  nextNoteButton.textContent = "Next note";
  chooseNext();
}

function clefForInstrument(instrument) {
  if (instrument.clef === "bass" && bassPresetTenorToggle.checked) {
    return "tenor";
  }

  return instrument.clef;
}

function setClef(clef) {
  state.clef = clef;
  clefButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.clef === clef);
  });
}

function setSettingsOpen(open) {
  document.body.classList.toggle("settings-open", open);
  settingsToggle.setAttribute("aria-expanded", String(open));
  settingsPanel.setAttribute("aria-hidden", String(!open));
  settingsBackdrop.hidden = !open;
}

function showWelcomeChoice() {
  welcomeCopy.textContent = "Choose what you want to practice.";
  practiceChoice.hidden = false;
  scalePresets.hidden = true;
  welcomeActions.hidden = true;
}

function returnHome() {
  cancelAutoNext();
  stopMicrophoneMonitoring();
  state.practiceMode = "notes";
  state.keySignature = null;
  state.scaleName = null;
  state.scaleNoteIds = null;
  state.scaleKeySignatureLabel = null;
  state.scaleInstrumentIndex = null;
  state.scaleClef = null;
  noteNameToolbar.hidden = false;
  scaleToolbar.hidden = true;
  keySignatureToolbar.hidden = true;
  keySignatureOptions.hidden = true;
  microphoneKeyOptions.hidden = true;
  microphonePanel.hidden = true;
  noteToolbarTitle.textContent = "Note Names";
  noteToolbarSubtitle.textContent = "Full range practice";
  setSettingsOpen(false);
  document.body.classList.remove("scale-practice", "key-signature-practice", "microphone-practice");
  document.body.classList.add("note-name-practice");
  document.body.classList.remove("welcome-dismissed");
  nextNoteButton.textContent = "Next note";
  showWelcomeChoice();
}

function startKeySignaturePractice() {
  cancelAutoNext();
  stopMicrophoneMonitoring();
  state.practiceMode = "key-signatures";
  state.keySignature = null;
  state.scaleName = null;
  state.scaleNoteIds = null;
  state.scaleKeySignatureLabel = null;
  state.scaleInstrumentIndex = null;
  state.scaleClef = null;
  noteNameToolbar.hidden = true;
  scaleToolbar.hidden = true;
  keySignatureToolbar.hidden = false;
  keySignatureOptions.hidden = false;
  microphoneKeyOptions.hidden = true;
  microphonePanel.hidden = true;
  renderKeySignatureOptions();
  setClef(keySignatureClefSelect.value);
  setSettingsOpen(false);
  document.body.classList.remove("scale-practice", "microphone-practice");
  document.body.classList.add("key-signature-practice");
  document.body.classList.remove("note-name-practice");
  dismissWelcome();
  nextNoteButton.textContent = "Next key signature";
  chooseNext();
}

function showScaleChoice() {
  stopMicrophoneMonitoring();
  welcomeCopy.textContent = "Choose an instrument, then pick a scale on the practice page.";
  practiceChoice.hidden = true;
  scalePresets.hidden = false;
  welcomeActions.hidden = false;
}

function startMicrophonePractice() {
  cancelAutoNext();
  applyInstrument(activeInstrumentIndex, "microphone");
  dismissWelcome();
}

function dismissWelcome() {
  document.body.classList.add("welcome-dismissed");
}

function toggleNoteHelpers() {
  state.showHelpers = !state.showHelpers;
  noteHelpersButton.classList.toggle("active", state.showHelpers);
  noteHelpersButton.setAttribute("aria-pressed", String(state.showHelpers));
  renderStaff();
}

answers.addEventListener("click", (event) => {
  const keyButton = event.target.closest("button[data-key-answer]");
  if (keyButton) {
    checkKeySignatureAnswer(keyButton.dataset.keyAnswer);
    return;
  }

  const button = event.target.closest("button[data-answer]");
  if (button) checkAnswer(button.dataset.answer);
});

nextNoteButton.addEventListener("click", chooseNext);
showAnswerButton.addEventListener("click", () => {
  if (!state.answered) checkAnswer("");
});
noteHelpersButton.addEventListener("click", toggleNoteHelpers);
homeButton.addEventListener("click", returnHome);
microphoneToggle.addEventListener("click", startMicrophoneMonitoring);
autoNextToggle.addEventListener("change", () => {
  state.autoNext = autoNextToggle.checked;
  if (!state.autoNext) cancelAutoNext();
});
settingsToggle.addEventListener("click", () => setSettingsOpen(true));
settingsClose.addEventListener("click", () => setSettingsOpen(false));
settingsBackdrop.addEventListener("click", () => setSettingsOpen(false));
practiceNoteNames.addEventListener("click", () => {
  cancelAutoNext();
  stopMicrophoneMonitoring();
  state.practiceMode = "notes";
  state.keySignature = null;
  state.scaleName = null;
  state.scaleNoteIds = null;
  state.scaleKeySignatureLabel = null;
  state.scaleInstrumentIndex = null;
  state.scaleClef = null;
  noteNameToolbar.hidden = false;
  scaleToolbar.hidden = true;
  keySignatureToolbar.hidden = true;
  keySignatureOptions.hidden = true;
  microphoneKeyOptions.hidden = true;
  microphonePanel.hidden = true;
  noteToolbarTitle.textContent = "Note Names";
  noteToolbarSubtitle.textContent = "Full range practice";
  document.body.classList.remove("scale-practice", "key-signature-practice", "microphone-practice");
  document.body.classList.add("note-name-practice");
  nextNoteButton.textContent = "Next note";
  syncNoteNameToolbar();
  dismissWelcome();
});
practiceScales.addEventListener("click", showScaleChoice);
practiceKeySignatures.addEventListener("click", startKeySignaturePractice);
practiceMicrophone.addEventListener("click", startMicrophonePractice);
welcomeBack.addEventListener("click", showWelcomeChoice);
document.querySelector("#reset-session").addEventListener("click", () => {
  state.score = 0;
  state.streak = 0;
  state.attempts = 0;
  state.correct = 0;
  state.misses.clear();
  state.recent = [];
  renderStats();
  renderReview();
  chooseNext();
});

[lowSelect, highSelect].forEach((select) => {
  select.addEventListener("change", () => {
    cancelAutoNext();
    stopMicrophoneMonitoring();
    setActiveInstrument(0);
    state.practiceMode = "notes";
    state.keySignature = null;
    state.scaleName = null;
    state.scaleNoteIds = null;
    state.scaleKeySignatureLabel = null;
    state.scaleInstrumentIndex = null;
    state.scaleClef = null;
    noteNameToolbar.hidden = false;
    scaleToolbar.hidden = true;
    keySignatureToolbar.hidden = true;
    keySignatureOptions.hidden = true;
    microphoneKeyOptions.hidden = true;
    microphonePanel.hidden = true;
    noteToolbarTitle.textContent = "Note Names";
    noteToolbarSubtitle.textContent = "Full range practice";
    document.body.classList.remove("scale-practice", "key-signature-practice", "microphone-practice");
    document.body.classList.add("note-name-practice");
    nextNoteButton.textContent = "Next note";
    if (Number(lowSelect.value) > Number(highSelect.value)) {
      const swap = lowSelect.value;
      lowSelect.value = highSelect.value;
      highSelect.value = swap;
    }
    state.customLowPitch = Number(lowSelect.value);
    state.customHighPitch = Number(highSelect.value);
    syncNoteNameToolbar();
    chooseNext();
  });
});

noteInstrumentSelect.addEventListener("change", () => {
  const targetMode = state.practiceMode === "microphone" ? "microphone" : "notes";
  applyInstrument(Number(noteInstrumentSelect.value), targetMode);
});

noteClefSelect.addEventListener("change", () => {
  cancelAutoNext();
  setClef(noteClefSelect.value);
  syncNoteNameToolbar();
  chooseNext();
});

[noteLowSelect, noteHighSelect].forEach((select) => {
  select.addEventListener("change", () => {
    const targetMode = state.practiceMode === "microphone" ? "microphone" : "notes";
    lowSelect.value = noteLowSelect.value;
    highSelect.value = noteHighSelect.value;
    if (targetMode === "microphone") {
      cancelAutoNext();
      setActiveInstrument(0);
      document.body.classList.add("microphone-practice");
      if (Number(lowSelect.value) > Number(highSelect.value)) {
        const swap = lowSelect.value;
        lowSelect.value = highSelect.value;
        highSelect.value = swap;
      }
      state.customLowPitch = Number(lowSelect.value);
      state.customHighPitch = Number(highSelect.value);
      syncNoteNameToolbar();
      chooseNext();
      return;
    }
    lowSelect.dispatchEvent(new Event("change"));
  });
});

noteModeSelect.addEventListener("change", () => {
  cancelAutoNext();
  state.mode = noteModeSelect.value;
  modeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.mode === state.mode);
  });
  syncNoteNameToolbar();
  chooseNext();
});

microphoneNotationSelect.addEventListener("change", () => {
  cancelAutoNext();
  state.microphoneNotationMode = microphoneNotationSelect.value;
  if (state.microphoneNotationMode === "key-signature") {
    renderMicrophoneKeyOptions();
  }
  syncNoteNameToolbar();
  chooseNext();
});

microphoneKeyOptions.addEventListener("change", (event) => {
  const checkbox = event.target.closest("input[type='checkbox']");
  if (!checkbox) return;

  cancelAutoNext();
  if (checkbox.checked) {
    state.microphoneSelectedKeySignatures.add(checkbox.value);
  } else if (state.microphoneSelectedKeySignatures.size > 1) {
    state.microphoneSelectedKeySignatures.delete(checkbox.value);
  } else {
    checkbox.checked = true;
    return;
  }

  renderMicrophoneKeyOptions();
  syncNoteNameToolbar();
  if (state.practiceMode === "microphone" && state.microphoneNotationMode === "key-signature") {
    chooseNext();
  }
});

scaleSelect.addEventListener("change", () => {
  if (state.scaleInstrumentIndex === null) return;
  cancelAutoNext();
  applyScalePreset(state.scaleInstrumentIndex, scaleSelect.value);
});

scaleNotationSelect.addEventListener("change", () => {
  cancelAutoNext();
  state.scaleNotationMode = scaleNotationSelect.value;
  chooseNext();
});

scaleInstrumentSelect.addEventListener("change", () => {
  cancelAutoNext();
  state.scaleClef = null;
  applyScalePreset(Number(scaleInstrumentSelect.value), scaleSelect.value);
});

scaleClefSelect.addEventListener("change", () => {
  cancelAutoNext();
  state.scaleClef = scaleClefSelect.value;
  setClef(state.scaleClef);
  chooseNext();
});

keySignatureClefSelect.addEventListener("change", () => {
  cancelAutoNext();
  setClef(keySignatureClefSelect.value);
  if (state.practiceMode === "key-signatures") {
    state.answered = false;
    promptEl.textContent = `Name this ${clefs[state.clef].name.toLowerCase()} clef key signature.`;
    renderKeySignatureStaff();
    renderKeySignatureAnswers();
  }
});

keySignatureOptions.addEventListener("change", (event) => {
  const checkbox = event.target.closest("input[type='checkbox']");
  if (!checkbox) return;

  cancelAutoNext();
  if (checkbox.checked) {
    state.selectedKeySignatures.add(checkbox.value);
  } else if (state.selectedKeySignatures.size > 1) {
    state.selectedKeySignatures.delete(checkbox.value);
  } else {
    checkbox.checked = true;
    return;
  }

  renderKeySignatureOptions();
  if (state.practiceMode === "key-signatures") {
    chooseNext();
  }
});

scalePresets.addEventListener("click", (event) => {
  const button = event.target.closest("[data-scale-instrument-index]");
  if (!button) return;

  applyScalePreset(Number(button.dataset.scaleInstrumentIndex));
});

instrumentPresets.addEventListener("click", (event) => {
  const button = event.target.closest("[data-instrument-index]");
  if (!button) return;

  const index = Number(button.dataset.instrumentIndex);
  dismissWelcome();
  applyInstrument(index);
});

bassPresetTenorToggle.addEventListener("change", () => {
  cancelAutoNext();
  renderInstrumentPresets();
  const instrument = instrumentRanges[activeInstrumentIndex];
  if (instrument.clef === "bass") {
    setClef(clefForInstrument(instrument));
    chooseNext();
  }
});

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    cancelAutoNext();
    modeButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    state.mode = button.dataset.mode;
    chooseNext();
  });
});

clefButtons.forEach((button) => {
  button.addEventListener("click", () => {
    cancelAutoNext();
    setClef(button.dataset.clef);
    chooseNext();
  });
});

document.addEventListener("keydown", (event) => {
  if (state.practiceMode === "microphone") {
    if (event.key === "Enter") {
      chooseNext();
    }
    if (event.key === "Escape") {
      setSettingsOpen(false);
    }
    return;
  }

  if (state.practiceMode === "key-signatures") {
    if (event.key === "Enter") {
      chooseNext();
    }
    if (event.key === "Escape") {
      setSettingsOpen(false);
    }
    return;
  }

  const key = event.key.toUpperCase();
  if (noteLetters.includes(key)) {
    checkAnswer(key);
  }
  if (event.key === "Enter") {
    chooseNext();
  }
  if (event.key === "Escape") {
    setSettingsOpen(false);
  }
});

populateRangeControls();
showWelcomeChoice();
renderStats();
renderReview();
applyInstrument(0);
