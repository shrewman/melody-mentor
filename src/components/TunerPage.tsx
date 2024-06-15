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
          audio: true,
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
      <div className="bg-surface0 rounded-xl p-3 mt-5 w-1/2 mx-auto">
        <div className="mx-auto w-2/3 text-center">
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
              <div className="mb-2 grid grid-cols-9 text-gray-600">
                <span className="mt-5 text-xl text-text">
                  {previousNote.slice(0, -1)}
                </span>
                <span className="text-4xl text-white col-span-7">
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
    </>
  );
};

export default TunerPage;
