import { useState } from "react";
import Navbar from "./Navbar";

export default function RandomNotePickerPage() {
  const getRandomNotes = (length: number | "") => {
    if (length === "") return [];
    const notes = [
      "A",
      "A#",
      "B",
      "C",
      "C#",
      "D",
      "D#",
      "E",
      "F",
      "F#",
      "G",
      "G#",
    ];

    const uniqueNotes = [];
    let chosenIndeces: number[] = [];

    while (uniqueNotes.length < length) {
      const r = Math.floor(Math.random() * notes.length);
      if (!chosenIndeces.includes(r)) {
        uniqueNotes.push(notes[r]);
        chosenIndeces.push(r);
        if (chosenIndeces.length === notes.length) {
          chosenIndeces = [];
        }
      }
    }
    return uniqueNotes;
  };

  const [noteCount, setNoteCount] = useState<number | "">(3);
  const [randomNotes, setRandomNotes] = useState<string[]>(getRandomNotes(3));

  return (
    <>
      <Navbar />
      <div className="m-5 grid grid-cols-5 gap-5 text-center">
        <div className="col-span-3 rounded-xl bg-surface0 p-5">
          <p className="text-4xl">{randomNotes.map((note) => note + " ")}</p>
        </div>
        <div className="col-span-2">
          <div>
            <span>Note count: </span>
            <input
              className="w-20 rounded-sm bg-surface1 p-1"
              type="number"
              value={noteCount}
              onChange={(e) => {
                const val = e.target.value === "" ? "" : Number(e.target.value);
                if (val !== "" && (val > 100 || val < 1)) return;
                setNoteCount(val);
                setRandomNotes(getRandomNotes(val));
              }}
            />
          </div>
          <button
            onClick={() => setRandomNotes(getRandomNotes(noteCount))}
            className="mx-auto block w-1/2 rounded-sm border-none bg-blue"
          >
            Randomize
          </button>
        </div>
      </div>
    </>
  );
}
