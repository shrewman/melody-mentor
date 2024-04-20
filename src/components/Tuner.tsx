import React, { useState, useEffect } from "react";

const Tuner = () => {
  const [isTuning, setIsTuning] = useState(false);
  const [detectedFrequency, setDetectedFrequency] = useState(0);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const audioContext = new AudioContext();
    const startListening = async () => {
      try {
        const micStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setStream(micStream);
        const fftSize = 2048;
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

  return (
    <div>
      <button onClick={() => setIsTuning(!isTuning)}>
        {isTuning ? "Stop Tuning" : "Start Tuning"}
      </button>
      <p>Detected Frequency: {detectedFrequency} Hz</p>
    </div>
  );
};

export default Tuner;
