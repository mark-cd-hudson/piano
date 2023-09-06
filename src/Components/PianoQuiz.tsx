import React, { FC, useEffect, useState } from 'react';
import './PianoQuiz.css';
import { SettingsSidebarProps } from './SettingsSidebar';
import Staff from './Staff';

import { Note, NoteLetter } from './Note';
import { sampleWithGaussianPeakNoReplacement, shuffle } from './choiceSampler';

const noteLetters = [NoteLetter.A, NoteLetter.B, NoteLetter.C, NoteLetter.D, NoteLetter.E, NoteLetter.F, NoteLetter.G]

// Function to select N choices of notes given a correct note
// One of the choices is the correct note but its position is randomized
// The other choices are random notes but the proability distribution is skewed to notes close to the correct note
const getChoices = (notes: Note[], correctNote: Note, n: number): Note[] => {
  const choices: Note[] = [correctNote];
  const noteIndex = notes.findIndex(note => note.noteNumber === correctNote.noteNumber);
  const sampledNotes = sampleWithGaussianPeakNoReplacement(notes, n, noteIndex).filter(({noteNumber}) => noteNumber !== correctNote.noteNumber).slice(0, n - 1);

  // Push sampled notes to choices
  sampledNotes.forEach(note => choices.push(note));

  // shuffle choices
  return shuffle(choices);
}


type MultipleChoiceProps = {
  choices: Note[],
  answer: Note,
  completePass: () => void,
  completeFail: () => void,

  tryAgainOnFail: boolean,
}

const MultipleChoice: FC<MultipleChoiceProps> = ({ choices, answer, completeFail, completePass, tryAgainOnFail }) => {

  const [success, setSuccess] = useState<boolean | null>(null);
  const [selected, setSelected] = useState<Note | null>(null);

  const reset = () => {
    setSuccess(null);
    setSelected(null);
  }

  const handleAnswer = (choice: Note) => {
    setSelected(choice);
    if (choice.noteNumber === answer.noteNumber) {
      setSuccess(true);
      setTimeout(() => {
        completePass();
        reset();
      }, 1000);
    } else {
      setSuccess(false);
      setTimeout(() => {
        completeFail();
        reset();
      }, 1000);
    }
  }

  return (
    <div className="PianoQuiz-multiple-choice">
      {choices.map((choice, i) => {
        const choiceSelected = selected && choice.noteNumber === selected.noteNumber;
        const successFailClass = choiceSelected ? (selected.noteNumber === answer.noteNumber ? "success" : "fail") : "";
        return (
          <div key={`mc=${i}`}className={`PianoQuiz-choice ${successFailClass}`} onClick={() => handleAnswer(choice)}>
            {NoteLetter[choice.letter]}<sub>{choice.octave}</sub>
          </div>
        )
        })}
    </div>
  )
}

type PianoQuizProps = {
  useTimer: boolean,
  tryAgainOnFail: boolean,
  timeInView?: number,
}

export const PianoQuiz: FC<PianoQuizProps>  = ({ useTimer, timeInView = 1000, tryAgainOnFail }) => {
  const notes: Note[] = Array.from({length: 52}, (_, i) => {
    const letter = noteLetters[i % 7];
    // const accidental = i % 12;
    const noteNumber = i;
    return {
      letter,
      octave: Math.floor(i / 7) + 1,
      // accidental,
      noteNumber,
    };
  }).filter(({ noteNumber }) => noteNumber >= 18 && noteNumber <= 37);

  const [hideStaff, setHideStaff] = useState<boolean>(false);

  const [note, setNote] = useState<Note>(notes[0]);

  const [choices, setChoices] = useState<Note[]>(getChoices(notes, note, 4));

  const handleHidingStaff = () => {
    setHideStaff(false)
    if (useTimer) {
      setTimeout(() => {
        setHideStaff(true);
      }, timeInView);
    }
  }

  useEffect(() => {
    setChoices(getChoices(notes, note, 4));
    handleHidingStaff();
  }, [note]);

  const newQuiz = () => {
    setHideStaff(false);
    const newIndex = Math.floor(Math.random() * notes.length);
    setNote(notes[newIndex]);
  }

  const handleCompletePass = () => {
    newQuiz();
  }

  const handleCompleteFail = () => {
    if (tryAgainOnFail) {
      setChoices(getChoices(notes, note, 4));

      handleHidingStaff();
    } else {
      newQuiz();
    }
  }

  return (
    <div className="PianoQuiz">
      <h1><span style={{color: "#bbbbff"}}>No</span><span style={{color: "#eebbee"}}>te</span><span style={{color: "#ffbbbb"}}>st</span></h1>
      
      <div className="StaffContainer" style={hideStaff ? {opacity: "0"} : {}}>
        <Staff noteNumber={note.noteNumber}/>
      </div>

      {/* Multiple Choice */}
      <MultipleChoice choices={choices} answer={note} completePass={handleCompletePass} completeFail={handleCompleteFail} tryAgainOnFail={tryAgainOnFail} />

    </div>
  )
}

export default PianoQuiz;

