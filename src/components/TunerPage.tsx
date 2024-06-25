import { useState, useEffect } from "react";
import noteFrequencyMap from "../utils/noteFrequencyMap";
import Navbar from "./Navbar";

type Note = keyof typeof noteFrequencyMap;

const TunerPage = () => {
  const [isTuning, setIsTuning] = useState(false);
  const [detectedFrequency, setDetectedFrequency] = useState(0);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [nearestNote, setNearestNote] = useState<Note>("C0");
  const [previousNote, setPreviousNote] = useState<Note>("B0");
  const [nextNote, setNextNote] = useState<Note>("C#0");
  const [tuningProgress, setTuningProgress] = useState(0);

  const notes = (Object.keys(noteFrequencyMap) as Note[]).sort(
    (a, b) => noteFrequencyMap[a] - noteFrequencyMap[b],
  );

  useEffect(() => {
    const audioContext = new AudioContext();
    const startListening = async () => {
      try {
        const micStream = await navigator.mediaDevices.getUserMedia({
          audio: {
            noiseSuppression: false,
            echoCancellation: false,
          },
        });
        setStream(micStream);
        const fftSize = 16384;
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = fftSize;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        const microphone = audioContext.createMediaStreamSource(micStream);
        microphone.connect(analyser);

        const updatePitch = () => {
          analyser.getByteFrequencyData(dataArray);
          const maxIndex = dataArray.reduce(
            (maxIndex, value, currentIndex, array) => {
              return value > array[maxIndex] ? currentIndex : maxIndex;
            },
            0,
          );
          const sampleRate = audioContext.sampleRate;
          const frequency = (maxIndex * sampleRate) / fftSize;
          setDetectedFrequency(frequency);
        };

        const intervalId = setInterval(updatePitch, 100);

        return () => {
          clearInterval(intervalId);
          micStream.getTracks().forEach((track) => track.stop());
        };
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    };

    if (isTuning) {
      startListening();
    } else {
      if (stream) {
        audioContext.close();
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
    }
  }, [isTuning]);

  useEffect(() => {
    let minDifference = Number.MAX_VALUE;
    let closestNote = "C" as Note;
    let closestFrequency = 0;

    for (const [note, frequency] of Object.entries(noteFrequencyMap)) {
      const difference = Math.abs(detectedFrequency - frequency);
      if (difference < minDifference) {
        minDifference = difference;
        closestNote = note as Note;
        closestFrequency = frequency;
      }
    }

    setNearestNote(closestNote);

    if (closestFrequency !== 0) {
      const noteIndex = notes.indexOf(closestNote);
      const previousIndex = (noteIndex - 1 + notes.length) % notes.length;
      const nextIndex = (noteIndex + 1) % notes.length;
      setPreviousNote(notes[previousIndex]);
      setNextNote(notes[nextIndex]);

      const previousFrequency = noteFrequencyMap[notes[previousIndex]];
      const nextFrequency = noteFrequencyMap[notes[nextIndex]];

      const progress =
        ((detectedFrequency - previousFrequency) /
          (nextFrequency - previousFrequency)) *
        100;
      setTuningProgress(progress);
    } else {
      setTuningProgress(0);
      setPreviousNote("B0");
      setNextNote("C#0");
    }
  }, [detectedFrequency, notes]);

  return (
    <>
      <Navbar />
      <div className="grid place-items-center gap-5">
        <div className="mt-5 w-full max-w-[800px] rounded-xl bg-surface0 p-3">
          <div className="mx-auto w-5/6 text-center">
            <button
              className="rounded bg-blue px-4 py-2 text-surface0"
              onClick={() => setIsTuning(!isTuning)}
            >
              {isTuning ? "Stop Tuning" : "Start Tuning"}
            </button>
            <p className="mt-5">
              Detected Frequency: {detectedFrequency.toFixed(2)} Hz
            </p>
            <div className="mt-3">
              <div className="relative pt-1">
                <div className="mb-2 grid grid-cols-9">
                  <span className="mt-5 text-xl text-text">
                    {previousNote.slice(0, -1)}
                  </span>
                  <span className="col-span-7 text-4xl text-white">
                    {nearestNote.slice(0, -1)}
                  </span>
                  <span className="mt-5 text-xl text-text">
                    {nextNote.slice(0, -1)}
                  </span>
                </div>
                <div className="mb-4 flex h-2 overflow-hidden rounded bg-surface2 text-xs">
                  <div
                    style={{ width: `${tuningProgress}%` }}
                    className="flex flex-col justify-center whitespace-nowrap bg-blue text-center"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-[800px] rounded-xl bg-surface0 p-3">
          <h2 className="text-center text-2xl font-bold">
            How to tune your instrument
          </h2>
          <div className="text-xl">
            <p className="mt-3">
              To tune your guitar, start by plucking the string you want to
              tune.
            </p>
            <p className="mt-3">
              The standard tuning for a six-string <b>guitar</b> from lowest to
              highest string is: <b>E, A, D, G, B, E</b>.
            </p>
            <p className="mt-3">
              For a <b>bass guitar</b>, the standard tuning for a four-string
              bass is: <b> E, A, D, G</b>.
            </p>
            <p className="mt-3">
              Use the tuner to find the detected frequency and adjust the tuning
              peg until the detected frequency matches the target frequency for
              the desired note.
            </p>
            <p className="mt-3">
              Standard tuning frequencies for each string are:
            </p>
            <ul className="mt-3 list-disc pl-5">
              <li>
                Guitar: E (82.41 Hz), A (110.00 Hz), D (146.83 Hz), G (196.00
                Hz), B (246.94 Hz), E (329.63 Hz)
              </li>
              <li>
                Bass: E (41.20 Hz), A (55.00 Hz), D (73.42 Hz), G (98.00 Hz)
              </li>
            </ul>
            <p className="mt-3">
              Keep tuning each string until all of them are in the correct
              pitch.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TunerPage;
