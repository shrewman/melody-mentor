import { useState, useEffect } from "react";
import noteFrequencyMap from "../utils/noteFrequencyMap.ts";

const Tuner = () => {
  const [isTuning, setIsTuning] = useState(false);
  const [detectedFrequency, setDetectedFrequency] = useState(0);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [nearestNote, setNearestNote] = useState<string | null>(null);

  useEffect(() => {
    const audioContext = new AudioContext();
    const startListening = async () => {
      try {
        const micStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setStream(micStream);
        // Bigger the number - more precise result and more time to compute
        // const fftSize = 8192;
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

  // TODO: find faster solution
  useEffect(() => {
    let minDifference = Number.MAX_VALUE;

    for (const [note, frequency] of Object.entries(noteFrequencyMap)) {
      const difference = Math.abs(detectedFrequency - frequency);
      if (difference < minDifference) {
        minDifference = difference;
        setNearestNote(note);
      }
    }

  }, [detectedFrequency]);

  // TODO: better interface, <progress> maybe? 
  return (
    <div>
      <button onClick={() => setIsTuning(!isTuning)}>
        {isTuning ? "Stop Tuning" : "Start Tuning"}
      </button>
      <p>Detected Frequency: {detectedFrequency} Hz</p>
      <p>Nearest Note: {nearestNote}</p>
    </div>
  );
};

export default Tuner;
