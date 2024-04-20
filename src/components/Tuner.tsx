import React, { useState, useEffect } from "react";

const Tuner = () => {
  const [isTuning, setIsTuning] = useState(false);
  const [detectedFrequency, setDetectedFrequency] = useState(0);
  const [stream, setStream] = useState<MediaStream | null>(null);


  useEffect(() => {
    console.log("mount")
    const audioContext = new AudioContext();
    const startListening = async () => {
      try {
        const micStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setStream(micStream);
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(micStream);
        microphone.connect(analyser);

        const updatePitch = () => {
          const bufferLength = analyser.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);
          analyser.getByteTimeDomainData(dataArray);

          // Perform frequency analysis and update detectedFrequency state
          // You can use FFT algorithms to perform this analysis
        };

        const intervalId = setInterval(updatePitch, 1000);

        return () => {
          console.log("umount");
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
