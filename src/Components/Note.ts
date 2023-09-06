export enum Clef {
  Treble,
  Bass,
  // Alto,
  // Tenor,
}
export enum Accidental {
  Sharp,
  Flat,
  Natural,
}

export enum NoteValue {
  Whole,
  Half,
  Quarter,
  Eighth,
  Sixteenth,
  ThirtySecond,
  SixtyFourth,
}


export enum NoteLetter {
  A,
  B,
  C,
  D,
  E,
  F,
  G,
}

export type Note = {
  letter: NoteLetter,
  octave: number,
  // accidental?: Accidental,
  noteNumber: number,
}
