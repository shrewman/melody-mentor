import { useState } from "react";
import Navbar from "./Navbar";
import Fretboard from "./Fretboard";

type NotesState = {
  [key: string]: boolean;
};

export default function RandomNotePickerPage() {
  const [notes, setNotes] = useState<NotesState>({
    C: true,
    D: true,
    E: true,
    F: true,
    G: true,
    A: true,
    B: true,
    "C#": false,
    Db: false,
    "D#": false,
    Eb: false,
    "F#": false,
    Gb: false,
    "G#": false,
    Ab: false,
    "A#": false,
    Bb: false,
  });

  const handleCheckboxChange = (note: string) => {
    setNotes({
      ...notes,
      [note]: !notes[note],
    });
  };

  const getRandomNotes = (length: number | "") => {
    if (length === "") return [];

    const fromNotes = Object.keys(notes).filter((note) => notes[note]);

    const uniqueNotes: string[] = [];
    let chosenIndeces: number[] = [];

    while (uniqueNotes.length < length) {
      const r = Math.floor(Math.random() * fromNotes.length);
      if (!chosenIndeces.includes(r)) {
        uniqueNotes.push(fromNotes[r]);
        chosenIndeces.push(r);
        if (chosenIndeces.length === fromNotes.length) {
          chosenIndeces = [];
        }
      }
    }
    return uniqueNotes;
  };

  const [noteCount, setNoteCount] = useState<number | "">(5);
  const [randomNotes, setRandomNotes] = useState<string[]>(getRandomNotes(5));
  const [isFretboardVisible, setIsFretboardVisible] = useState(false);

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
                setRandomNotes(getRandomNotes(val));
              }}
            />
          </div>
          <button
            onClick={() => setRandomNotes(getRandomNotes(noteCount))}
            className="mx-auto block w-1/2 rounded-sm bg-blue text-surface0"
          >
            Randomize
          </button>
        </div>
      </div>
      <div className="m-5 rounded-xl bg-surface0 py-5">
        <h1 className="flex justify-center">Options</h1>
        <div className="m-5 rounded-xl bg-surface0 py-5">
          <div className="mt-5 flex justify-center">
            {["C", "D", "E", "F", "G", "A", "B"].map((note) => (
              <div className="flex w-20" key={note}>
                <div className="w-5">{note}</div>
                <input
                  type="checkbox"
                  className="ml-1"
                  checked={notes[note]}
                  onChange={() => handleCheckboxChange(note)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <div className="mr-16 flex justify-center gap-5">
            {[
              ["C#", "Db"],
              ["D#", "Eb"],
            ].map((group) => (
              <div key={group[0]}>
                {group.map((note) => (
                  <div className="flex w-20" key={note}>
                    <div className="w-5">{note}</div>
                    <input
                      type="checkbox"
                      className="ml-1"
                      checked={notes[note]}
                      onChange={() => handleCheckboxChange(note)}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-5">
            {[
              ["F#", "Gb"],
              ["G#", "Ab"],
              ["A#", "Bb"],
            ].map((group) => (
              <div key={group[0]}>
                {group.map((note) => (
                  <div className="flex w-20" key={note}>
                    <div className="w-5">{note}</div>
                    <input
                      type="checkbox"
                      className="ml-1"
                      checked={notes[note]}
                      onChange={() => handleCheckboxChange(note)}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="w-36 mt-5"
            onClick={() => setIsFretboardVisible(!isFretboardVisible)}
          >
            {isFretboardVisible ? "Hide fretboard" : "Show fretboard"}
          </button>
        </div>
      </div>
      {isFretboardVisible && <Fretboard />}
    </>
  );
}
