import React, { useState } from "react";
import * as Tone from "tone";
import Navbar from "./Navbar";

const notes = [
  "C4",
  "C#4",
  "D4",
  "D#4",
  "E4",
  "F4",
  "F#4",
  "G4",
  "G#4",
  "A4",
  "A#4",
  "B4",
];

const getRandomNote = () => notes[Math.floor(Math.random() * notes.length)];

const EarTrainingPage: React.FC = () => {
  const [firstNote, setFirstNote] = useState<string>(getRandomNote);
  const [secondNote, setSecondNote] = useState<string>(getRandomNote);
  const [message, setMessage] = useState<string>("Guess the note");
  const [isDisabled, setIsDisabled] = useState(false);

  const handleNewGame = () => {
    setIsDisabled(true);
    const newNote = getRandomNote();
    setFirstNote(newNote);
    let newGuessNote = getRandomNote();
    while (newGuessNote === newNote) {
      newGuessNote = getRandomNote();
    }
    setSecondNote(newGuessNote);
    setMessage("Guess the second note");

    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(newNote, "1s");

    setTimeout(() => {
      synth.triggerAttackRelease(newGuessNote, "1s");
      setTimeout(() => {
        setIsDisabled(false);
      }, 1000);
    }, 2000);
  };

  const handleGuess = (note: string) => {
    if (note === secondNote) {
      setMessage("Correct!");
    } else {
      setMessage("Try Again!");
    }
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(note, "1s");
  };

  const handleReplayNotes = () => {
    setIsDisabled(true);
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(firstNote, "1s");
    setTimeout(() => {
      synth.triggerAttackRelease(secondNote, "1s");
      setTimeout(() => {
        setIsDisabled(false);
      }, 1000);
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <div className="conatiner mx-auto max-w-[800px] ">
        <div className="mx-auto flex flex-col m-5 items-center justify-center rounded-xl bg-surface0">
          <div className="my-3 m-5 h-8 text-xl font-bold text-text">{message}</div>
          <div className="text-2xl font-bold text-text">
            First Note: {firstNote.slice(0, -1)}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {notes.map((note) => (
              <button
                key={note}
                className={`m-1 rounded px-4 py-2 text-xl font-bold text-surface1 ${isDisabled ? "bg-surface2" : "bg-blue"}`}
                disabled={isDisabled}
                onClick={() => handleGuess(note)}
              >
                {note.slice(0, -1)}
              </button>
            ))}
          </div>
          <div className="my-3 grid gap-5 p-2 md:grid-cols-2">
            <button
              className={`p-2 font-bold text-surface1 ${isDisabled ? "bg-surface2" : "bg-lavender"}`}
              onClick={handleNewGame}
              disabled={isDisabled}
            >
              New Game
            </button>
            <button
              className={`p-2 font-bold text-surface1 ${isDisabled ? "bg-surface2" : "bg-green"}`}
              onClick={handleReplayNotes}
              disabled={isDisabled}
            >
              Replay Notes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EarTrainingPage;
