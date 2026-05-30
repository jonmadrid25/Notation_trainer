const noteLetters = ["C", "D", "E", "F", "G", "A", "B"];
const staff = document.querySelector("#staff");
const answers = document.querySelector("#answers");
const promptEl = document.querySelector("#prompt");
const scoreEl = document.querySelector("#score");
const streakEl = document.querySelector("#streak");
const accuracyEl = document.querySelector("#accuracy");
const levelTitle = document.querySelector("#level-title");
const levelDescription = document.querySelector("#level-description");
const levelProgressBar = document.querySelector("#level-progress-bar");
const levelProgressText = document.querySelector("#level-progress-text");
const levelButtons = document.querySelector("#level-buttons");
const instrumentPresets = document.querySelector("#instrument-presets");
const lowSelect = document.querySelector("#low-note");
const highSelect = document.querySelector("#high-note");
const bassPresetTenorToggle = document.querySelector("#bass-instruments-tenor-clef");
const reviewList = document.querySelector("#review-list");
const noteHelpersButton = document.querySelector("#note-helpers");
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
  { name: "Cello", low: "C2", high: "C6", clef: "tenor", family: "Strings" },
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

const state = {
  current: null,
  clef: "treble",
  levelIndex: 0,
  levelMode: true,
  customLowPitch: null,
  customHighPitch: null,
  levelProgressByPreset: new Map(),
  completedLevelsByPreset: new Map(),
  mode: "all",
  showHelpers: false,
  answered: false,
  score: 0,
  streak: 0,
  attempts: 0,
  correct: 0,
  misses: new Map(),
  recent: []
};

let activeInstrumentIndex = 0;

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

function activePresetKey() {
  const instrument = activeInstrument();
  if (instrument.name !== "Custom") return `${instrument.name}-${clefForInstrument(instrument)}`;

  return `Custom-${state.customLowPitch}-${state.customHighPitch}-${state.clef}`;
}

function activeLevelProgress() {
  const key = activePresetKey();
  if (!state.levelProgressByPreset.has(key)) {
    state.levelProgressByPreset.set(key, Array(10).fill(0));
  }

  return state.levelProgressByPreset.get(key);
}

function activeCompletedLevels() {
  const key = activePresetKey();
  if (!state.completedLevelsByPreset.has(key)) {
    state.completedLevelsByPreset.set(key, new Set());
  }

  return state.completedLevelsByPreset.get(key);
}

function levelSourceRange() {
  const instrument = activeInstrument();
  if (instrument.name === "Custom") {
    return {
      name: "Custom",
      lowPitch: state.customLowPitch,
      highPitch: state.customHighPitch,
      clef: state.clef
    };
  }

  return {
    name: instrument.name,
    lowPitch: clampPitch(instrument.low),
    highPitch: clampPitch(instrument.high),
    clef: clefForInstrument(instrument)
  };
}

function activeLevels() {
  const source = levelSourceRange();
  const lowPitch = Math.min(source.lowPitch, source.highPitch);
  const highPitch = Math.max(source.lowPitch, source.highPitch);
  const span = Math.max(1, highPitch - lowPitch);
  const steps = [
    { label: "First notes", portion: 0.18, accidentals: [""], target: 6 },
    { label: "Lower range", portion: 0.28, accidentals: [""], target: 8 },
    { label: "Middle range", portion: 0.42, accidentals: [""], target: 8 },
    { label: "Upper range", portion: 0.60, accidentals: [""], target: 10 },
    { label: "Full naturals", portion: 1, accidentals: [""], target: 10 },
    { label: "First accidentals", portion: 0.35, accidentals: ["", "#", "b"], target: 10 },
    { label: "Lower accidentals", portion: 0.50, accidentals: ["", "#", "b"], target: 12 },
    { label: "Middle accidentals", portion: 0.70, accidentals: ["", "#", "b"], target: 12 },
    { label: "Full accidentals", portion: 1, accidentals: ["", "#", "b"], target: 14 },
    { label: "Master challenge", portion: 1, accidentals: ["", "#", "b"], target: 15 }
  ];

  return steps.map((step, index) => {
    const levelHighPitch = index === steps.length - 1
      ? highPitch
      : Math.min(highPitch, Math.round(lowPitch + span * step.portion));

    return {
      name: `Level ${index + 1}`,
      description: `${source.name}: ${step.label}`,
      lowPitch,
      highPitch: Math.max(lowPitch, levelHighPitch),
      clefs: [source.clef],
      accidentals: step.accidentals,
      target: step.target
    };
  });
}

function frequencyFor(id) {
  const semitonesFromA4 = pitchValue(id) - pitchValue("A4");
  return 440 * 2 ** (semitonesFromA4 / 12);
}

function noteY(note) {
  const bottomLineY = staffGeometry.topLineY + staffGeometry.lineGap * 4;
  const halfStep = staffGeometry.lineGap / 2;
  const bottomLineValue = noteValue(clefs[state.clef].bottomLineNote);
  return bottomLineY - (note.value - bottomLineValue) * halfStep;
}

function rangeNotes() {
  const low = Number(lowSelect.value);
  const high = Number(highSelect.value);
  const level = activeLevels()[state.levelIndex];
  return notes.filter((note) => {
    const inRange = note.pitch >= low && note.pitch <= high;
    const allowedAccidental = !state.levelMode || level.accidentals.includes(note.accidental);
    return inRange && allowedAccidental;
  });
}

function activePool() {
  const ranged = rangeNotes();
  if (state.mode !== "missed") return ranged;

  const missed = ranged.filter((note) => state.misses.has(note.id));
  return missed.length ? missed : ranged;
}

function chooseNext() {
  if (state.levelMode) {
    const level = activeLevels()[state.levelIndex];
    if (level.clefs.length > 1) {
      setClef(level.clefs[Math.floor(Math.random() * level.clefs.length)]);
    }
  }

  const pool = activePool();
  const previous = state.current?.id;
  const candidates = pool.length > 1 ? pool.filter((note) => note.id !== previous) : pool;
  state.current = candidates[Math.floor(Math.random() * candidates.length)];
  state.answered = false;
  promptEl.textContent = `Name this ${clefs[state.clef].name.toLowerCase()} clef note.`;
  renderStaff();
  renderAnswers();
}

function renderStaff() {
  const y = noteY(state.current);
  const { topLineY, lineGap, noteX, noteRx, noteRy, noteTilt } = staffGeometry;
  const clef = clefs[state.clef];
  const ledgerLines = ledgerYPositions(y);
  const bottomLineY = topLineY + lineGap * 4;
  const helperLabels = state.showHelpers ? staffHelperLabels() : "";
  const viewTop = Math.min(0, y - 70);
  const viewBottom = Math.max(310, bottomLineY + 70, y + 70);
  const accidental = state.current.accidental
    ? `<text x="${noteX - 64}" y="${y + 13}" font-size="44" font-family="Georgia, 'Times New Roman', serif" font-weight="700" fill="#18212f">${accidentalSymbols[state.current.accidental]}</text>`
    : "";

  staff.setAttribute("viewBox", `0 ${viewTop} 720 ${viewBottom - viewTop}`);
  staff.innerHTML = `
    <rect x="0" y="${viewTop}" width="720" height="${viewBottom - viewTop}" rx="0" fill="#fffdfa"></rect>
    <text x="${clef.symbolX}" y="${clef.symbolY}" font-size="${clef.symbolSize}" font-family="Georgia, 'Times New Roman', serif" fill="#18212f">${clef.symbol}</text>
    ${[0, 1, 2, 3, 4].map((line) => {
      const lineY = topLineY + line * lineGap;
      return `<line x1="150" y1="${lineY}" x2="640" y2="${lineY}" stroke="#18212f" stroke-width="2"></line>`;
    }).join("")}
    ${ledgerLines.map((lineY) => `
      <line x1="${noteX - 34}" y1="${lineY}" x2="${noteX + 34}" y2="${lineY}" stroke="#18212f" stroke-width="2"></line>
    `).join("")}
    ${helperLabels}
    ${accidental}
    <ellipse cx="${noteX}" cy="${y}" rx="${noteRx}" ry="${noteRy}" transform="rotate(${noteTilt} ${noteX} ${y})" fill="#18212f"></ellipse>
  `;
}

function staffHelperLabels() {
  const { topLineY, lineGap } = staffGeometry;
  const bottomLineValue = noteValue(clefs[state.clef].bottomLineNote);
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

  return `${lineLabels}${spaceLabels}`;
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

function answerValue(note) {
  return note.baseLabel;
}

function checkAnswer(label) {
  if (state.answered) return;

  state.answered = true;
  state.attempts += 1;
  const expected = answerValue(state.current);
  const correct = label === expected || state.current.answerLabels.includes(label);

  if (correct) {
    state.score += 10 + Math.min(state.streak, 5);
    state.streak += 1;
    state.correct += 1;
    const completedLevel = updateLevelProgress();
    promptEl.textContent = completedLevel
      ? `${activeLevels()[state.levelIndex].name} complete.`
      : `${state.current.octaveDisplayLabel} is correct.`;
  } else {
    state.streak = 0;
    const miss = state.misses.get(state.current.id) || { note: state.current, count: 0 };
    miss.count += 1;
    state.misses.set(state.current.id, miss);
    promptEl.textContent = `That note is ${state.current.octaveDisplayLabel}.`;
  }

  state.recent.unshift({ id: state.current.id, correct });
  state.recent = state.recent.slice(0, 12);

  [...answers.querySelectorAll("button")].forEach((button) => {
    const value = button.dataset.answer;
    button.classList.toggle("correct", value === expected || state.current.answerLabels.includes(value));
    button.classList.toggle("incorrect", value === label && !correct);
  });

  renderStats();
  renderLevels();
  renderReview();
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

function renderLevels() {
  const levels = activeLevels();
  const level = levels[state.levelIndex];
  const progress = activeLevelProgress()[state.levelIndex];
  const completedLevels = activeCompletedLevels();
  const percent = Math.min(100, Math.round((progress / level.target) * 100));

  levelTitle.textContent = state.levelMode ? `${level.name} of 10` : "Free practice";
  levelDescription.textContent = state.levelMode ? level.description : "Choose a level to start a challenge";
  levelProgressBar.style.width = state.levelMode ? `${percent}%` : "0%";
  levelProgressText.textContent = state.levelMode
    ? (completedLevels.has(state.levelIndex) ? "Level complete" : `${progress}/${level.target} correct`)
    : "No level progress";

  levelButtons.innerHTML = levels.map((item, index) => {
    const isActive = state.levelMode && index === state.levelIndex;
    const isComplete = completedLevels.has(index);
    return `
      <button type="button" class="${isActive ? "active" : ""} ${isComplete ? "complete" : ""}" data-level-index="${index}" title="${item.description}">
        ${index + 1}
      </button>
    `;
  }).join("");
}

function updateLevelProgress() {
  if (!state.levelMode) return false;

  const level = activeLevels()[state.levelIndex];
  const progress = activeLevelProgress();
  const completedLevels = activeCompletedLevels();
  const wasComplete = completedLevels.has(state.levelIndex);
  progress[state.levelIndex] = Math.min(level.target, progress[state.levelIndex] + 1);

  if (progress[state.levelIndex] >= level.target) {
    completedLevels.add(state.levelIndex);
    return !wasComplete;
  }

  return false;
}

function applyLevel(index) {
  const level = activeLevels()[index];
  state.levelIndex = index;
  state.levelMode = true;
  lowSelect.value = String(level.lowPitch);
  highSelect.value = String(level.highPitch);
  setClef(level.clefs[0]);
  renderLevels();
  chooseNext();
}

function populateRangeControls() {
  renderInstrumentPresets();

  const options = rangeOptions.map((note) => `<option value="${note.value}">${note.label}</option>`).join("");
  lowSelect.innerHTML = options;
  highSelect.innerHTML = options;
  lowSelect.value = pitchValue(defaultLowNote);
  highSelect.value = pitchValue(defaultHighNote);
  renderLevels();
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

function toggleNoteHelpers() {
  state.showHelpers = !state.showHelpers;
  noteHelpersButton.classList.toggle("active", state.showHelpers);
  noteHelpersButton.setAttribute("aria-pressed", String(state.showHelpers));
  renderStaff();
}

answers.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-answer]");
  if (button) checkAnswer(button.dataset.answer);
});

document.querySelector("#next-note").addEventListener("click", chooseNext);
document.querySelector("#show-answer").addEventListener("click", () => {
  if (!state.answered) checkAnswer("");
});
noteHelpersButton.addEventListener("click", toggleNoteHelpers);
settingsToggle.addEventListener("click", () => setSettingsOpen(true));
settingsClose.addEventListener("click", () => setSettingsOpen(false));
settingsBackdrop.addEventListener("click", () => setSettingsOpen(false));
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
    state.levelMode = false;
    setActiveInstrument(0);
    if (Number(lowSelect.value) > Number(highSelect.value)) {
      const swap = lowSelect.value;
      lowSelect.value = highSelect.value;
      highSelect.value = swap;
    }
    state.customLowPitch = Number(lowSelect.value);
    state.customHighPitch = Number(highSelect.value);
    renderLevels();
    chooseNext();
  });
});

instrumentPresets.addEventListener("click", (event) => {
  const button = event.target.closest("[data-instrument-index]");
  if (!button) return;

  const index = Number(button.dataset.instrumentIndex);
  const instrument = instrumentRanges[index];
  setActiveInstrument(index);
  if (instrument.name !== "Custom") {
    setClef(clefForInstrument(instrument));
  }
  applyLevel(0);
});

levelButtons.addEventListener("click", (event) => {
  const button = event.target.closest("[data-level-index]");
  if (!button) return;

  applyLevel(Number(button.dataset.levelIndex));
});

bassPresetTenorToggle.addEventListener("change", () => {
  renderInstrumentPresets();
  const instrument = instrumentRanges[activeInstrumentIndex];
  if (instrument.clef === "bass") {
    setClef(clefForInstrument(instrument));
    chooseNext();
  }
});

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modeButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    state.mode = button.dataset.mode;
    chooseNext();
  });
});

clefButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setClef(button.dataset.clef);
    chooseNext();
  });
});

document.addEventListener("keydown", (event) => {
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
renderStats();
renderReview();
applyLevel(0);
