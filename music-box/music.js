let audio = new (window.AudioContext || window.webkitAudioContext)();

// with decay
function createOscillator(freq, note_duration) {
  let attack = 10;
  let decay = note_duration * 2;
  let gain = audio.createGain();
  let osc = audio.createOscillator();

  osc.frequency.value = freq;
  osc.type = 'triangle';

  gain.connect(audio.destination);
  gain.gain.setValueAtTime(0, audio.currentTime);
  gain.gain.linearRampToValueAtTime(1, audio.currentTime + attack/1000);
  gain.gain.linearRampToValueAtTime(0, audio.currentTime + decay/1000);
  osc.connect(gain);

  osc.start();

  setTimeout(function() {
    osc.stop();
    osc.disconnect(gain);
    gain.disconnect(audio.destination);
  }, decay);
}

// without attack & decay
// function createOscillator(freq, note_duration) {
//   let attack = 10;
//   let decay = note_duration;
//   let osc = audio.createOscillator();
// 
//   osc.frequency.value = freq;
//   osc.type = 'square';
//   osc.connect(audio.destination);
//   osc.start();
// 
//   setTimeout(function() {
//     osc.stop();
//     osc.disconnect(audio.destination);
//   }, decay);
// }

let NOTES = {
  c0: 16.35,
  d0: 18.35,
  e0: 20.60,
  f0: 21.83,
  g0: 24.50,
  a0: 27.50,
  b0: 30.87,
  c1: 32.70,
  d1: 36.71,
  e1: 41.20,
  f1: 43.65,
  g1: 49.00,
  a1: 55.00,
  b1: 61.74,
  c2: 65.41,
  d2: 73.42,
  e2: 82.41,
  f2: 87.31,
  g2: 98.00,
  a2: 110.00,
  b2: 123.47,
  c3: 130.81,
  d3: 146.83,
  e3: 164.81,
  f3: 174.61,
  g3: 196.00,
  a3: 220.00,
  b3: 246.94,
  c4: 261.63,
  d4: 293.66,
  e4: 329.63,
  f4: 349.23,
  g4: 392.00,
  a4: 440.00,
  b4: 493.88,
  c5: 523.25,
  d5: 587.33,
  e5: 659.25,
  f5: 698.46,
  g5: 783.99,
  a5: 880.00,
  b5: 987.77,
  c6: 1046.50,
  d6: 1174.66,
  e6: 1318.51,
  f6: 1396.91,
  g6: 1567.98,
  a6: 1760.00,
  b6: 1975.53,
  c7: 2093.00,
  d7: 2349.32,
  e7: 2637.02,
  f7: 2793.83,
  g7: 3135.96,
  a7: 3520.00,
  b7: 3951.07,
  c8: 4186.01,
  d8: 4698.63,
  e8: 5274.04,
  f8: 5587.65,
  g8: 6271.93,
  a8: 7040.00,
  b8: 7902.13
}

// let song_str = `
// g5 - - g5 [c5 a5] - - - g5 - - - c6 - - - [g4 b5]
// - - - - - - -
// g5 - - g5 [g4 a5] - - - g5 - - - d6 - - - [c5 c6]
// - - - - - - -
// g5 - - g5 [c5 g6] - - - e6 - - - c6 - - - [f5 b5]
// - - - a5 - - -
// a5 - - b5 [d5 c6] - - - c6 - - - a5 - - - [g4 d6]
// - - - - - - -
// g5 - - g5 [c5 a5] - - - g5 - - - c6 - - - [g4 b5]
// - - - - - - -
// g5 - - g5 [g4 a5] - - - g5 - - - d6 - - - [c5 c6]
// - - - - - - -
// g5 - - g5 [c5 g6] - - - e6 - - - c6 - - - [f5 b5]
// - - - a5 - - -
// f6 - - f6 [g4 e6] - - - c6 - - - d6 - - - [c5 c6]
// `;
let song_str = `
[e4 e5] - - - [a4 a5] - - - - - - - [b4 b5] - - - - - [c5 c6] [d5 d6] [c5 c6] - - - - - - - 
[e4 e5] - - - [e4 e5] - [a4 a5] - - - - - [b4 b5] - [c5 c6] - [e4 e5] - [c5 c6] [b4 b5]
[e5 e6] [d5 d6] - - - - - - - - - - -
[e4 e5] - - - [a4 a5] - - - - - [b4 b5] - [c5 c6] - - [e4 e5] [e5 e6] - - [c5 c6] a5
- - - - - - - [a4 a5] - - - [c5 c6] [b4 b5] [a4 a5] [e5 e6] - - - - [c5 c6] [a4 a5] - [d4 d5]
- [e4 e5] - - - [e4 e5] - - [e4 e5] [a4 a5]
`;

let song = parseSongStr(song_str);

function parseSongStr(song_str) {
  let arr = song_str.toLowerCase().trim().split(/\s+/);
  let song_final = [];
  let chord = [];
  let collecting_chord = false;
  for (let s of arr) {
    if (s[0] == '[') {
      collecting_chord = true;
    }

    let note = s.replace(/[\[\]]/, '');
    if (collecting_chord) {
      chord.push(note);
    } else {
      song_final.push([note]);
    }

    if (s[s.length-1] == ']') {
      collecting_chord = false;
      song_final.push(chord);
      chord = [];
    }
  }
  return song_final;
}

let lowest_key_index = keyIndex(song_str, Math.min);
let highest_key_index = keyIndex(song_str, Math.max);
let KEYS = Object.keys(NOTES).slice(
  lowest_key_index, highest_key_index+1
);

function keyIndex(song_str, func) {
  song_str = song_str.toLowerCase();
  while (song_str.indexOf('[') != -1 || song_str.indexOf(']') != -1) {
    song_str = song_str.replace(/[\[\]]/, '');
  }
  let song = song_str.trim().split(' ');
  let result = func.apply(this,
    song.map(function(k) {
      return Object.keys(NOTES).indexOf(k);
    }).filter(function(n) {
      return n >= 0;
    })
  );
  return result;
}
