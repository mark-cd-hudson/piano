import React, { FC } from 'react';
import './Staff.css';

import { Clef, NoteValue } from './Note';


type NoteDrawingProps = {
  // accidental?: Accidental,
  value: NoteValue,
  dotted: Boolean,
  lineWidth?: number,
  gap?: number,
}

const NoteDrawing: FC<NoteDrawingProps> = ({
  // accidental,
  value,
  dotted,
  lineWidth = 2,
  gap = 16
}) => {
  const widthScale = 1.6;
  const cx = gap / 2 * widthScale;
  const cy = gap / 2;

  const color = "black";

  if (value === NoteValue.Whole) {
    return (
      <div className="NoteDrawing" style={{top: -cy, left: -cx}}>
        <svg xmlns="http://www.w3.org/2000/svg" height={gap} width={gap * widthScale}>
          <ellipse cx={cx} cy={cy} rx={cx} ry={cy} style={{fill: color}} />
          <ellipse cx={cx} cy={cy} rx={cy * widthScale / 3} ry={cy * 0.8} transform={`rotate(-30, ${cx}, ${cy})`} style={{fill: "white"}} />
          {dotted && <ellipse cx={cx * 2.5} cy={cy} rx={lineWidth * widthScale} ry={lineWidth * widthScale} style={{fill: color}} />}
        </svg>
      </div>
    )
  }

  return (<></>);
}


export type StaffProps = {
  lineWidth?: number,
  gap?: number,
  noteNumber: number,
}


export const Staff: FC<StaffProps> = ({ lineWidth = 3, gap = 20, noteNumber}) => {
  
  const lines = [0, 1, 2, 3, 4];
  
  const clef: Clef = Clef.Treble;
  const width = gap * 20;
  const height = lineWidth * lines.length + gap * (lines.length - 1);

  const noteX = 10 * gap;

  const topOfStaffNoteNumber = 33;
  const bottomOfStaffNoteNumber = topOfStaffNoteNumber - 8;

  const topOfStaffNoteY = (lineWidth * 0.5);
  const bottomOfStaffNoteY = topOfStaffNoteY + ((topOfStaffNoteNumber - bottomOfStaffNoteNumber) * ( (lineWidth + gap) / 2));

  const noteY = topOfStaffNoteY + ((topOfStaffNoteNumber - noteNumber) * ( (lineWidth + gap) / 2));
  
  const numLowerLedgerLines = (bottomOfStaffNoteNumber - noteNumber > 0) ? Math.floor((bottomOfStaffNoteNumber - noteNumber) / 2) : 0;
  const numUpperLedgerLines =  (noteNumber - topOfStaffNoteNumber > 0) ? Math.floor((noteNumber - topOfStaffNoteNumber) / 2) : 0;

  return (
    <div className="Staff"
      style={{
        height: (lineWidth + gap) * (lines.length),
        width,
        marginTop: (gap + lineWidth) * 5,
        marginBottom: (gap + lineWidth) * 5
        }}>
      {/* Clef */}
      {clef === Clef.Treble && <img height={height + gap * 4 + lineWidth * 3} style={{top:-2 * gap - lineWidth}} src="/piano/assets/treble.svg" alt="treble clef" className="Clef"/>}

      <div style={{left: noteX, top: noteY}}>
        <NoteDrawing value={NoteValue.Whole} dotted={false} lineWidth={lineWidth} gap={gap}/>
      </div>

      {/* Staff lines */}
      <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
        {lines.map((line, i) => {
          return (
            <line x1="0" y1={lineWidth * (i + 0.5) + gap * i} x2={width} y2={lineWidth * (i + 0.5) + gap * i} stroke="black" strokeWidth={lineWidth} key={i}/>
          )
        })}
      </svg>

      {/* Lower Ledger lines */}
      {noteNumber < bottomOfStaffNoteNumber - 1 && 
        <svg name="LowerLedgerLines"
          style={{top: (lines.length * (lineWidth + gap))}}
          height={(lineWidth + gap) * (numLowerLedgerLines) + lineWidth}
          xmlns="http://www.w3.org/2000/svg">
          {Array.from({length: numLowerLedgerLines}).map((_, i) => {
            const y = i * (lineWidth + gap) + lineWidth/2;
            return (
              <line x1={noteX - gap} y1={y} x2={noteX + gap} y2={y} stroke="black" strokeWidth={lineWidth} key={i}/>
            )
          })}
        </svg>
      }

      {/* Upper Ledger lines */}
      {noteNumber > topOfStaffNoteNumber + 1 && 
        <svg name="UpperLedgerLines"
          style={{top: -(numUpperLedgerLines * (lineWidth + gap))}}
          height={(lineWidth + gap) * (numUpperLedgerLines) + lineWidth}
          xmlns="http://www.w3.org/2000/svg">
          {Array.from({length: numUpperLedgerLines}).map((_, i) => {
            const y = (i) * (lineWidth + gap) + lineWidth/2;
            return (
              <line x1={noteX - gap} y1={y} x2={noteX + gap} y2={y} stroke="black" strokeWidth={lineWidth} key={i}/>
            )
          })}
        </svg>
      }
      

    </div>
  )
}

export default Staff;

