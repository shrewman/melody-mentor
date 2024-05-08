import { useMemo, useState } from "react";
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
  const randomNotes = useMemo(() => getRandomNotes(noteCount), [noteCount])

  return (
    <>
      <Navbar />
      <div className="m-5 grid grid-cols-5 gap-5 text-center">
        <div className="col-span-3 rounded-xl bg-surface0 p-5">
          <p className="text-4xl">{randomNotes.join(" ")}</p>
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
              }}
            />
          </div>
          <button
            onClick={() => setNoteCount(noteCount)}
            className="mx-auto block rounded-sm border-none bg-blue w-1/2"
          >
            Randomize
          </button>
        </div>
      </div>
    </>
  );
}
