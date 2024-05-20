import React, { useState, useEffect } from "react";
import * as Tone from "tone";

const Metronome: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(60);

  useEffect(() => {
    const click = new Tone.Player(
      "https://tonejs.github.io/audio/drum-samples/CR78/tom2.mp3",
    ).toDestination();

    if (isPlaying) {
      Tone.getTransport().scheduleRepeat(
        (time) => {
          click.start(time);
        },
        `${60 / bpm}`,
      );
      Tone.getTransport().start();
    } else {
      Tone.getTransport().stop();
      Tone.getTransport().cancel();
    }

    return () => {
      Tone.getTransport().cancel();
    };
  }, [isPlaying, bpm]);

  const handleStartStop = () => {
    setIsPlaying(!isPlaying);
  };

  const handleBpmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBpm(Number(event.target.value));
    Tone.getTransport().bpm.value = Number(event.target.value);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-5">Metronome</h1>
      <div>
        <label>BPM: </label>
        <input
          className="w-20 rounded-sm bg-surface1 p-1"
          type="number"
          value={bpm}
          onChange={handleBpmChange}
          min="1"
          max="480"
        />
      </div>
      <button onClick={handleStartStop} className="w-20">
        {isPlaying ? "Stop" : "Start"}
      </button>
    </div>
  );
};

export default Metronome;
