import { useState } from "react";
import { AudioRecorder } from "react-audio-voice-recorder";
import Navbar from "./Navbar";

export default function RecorderPage() {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const addAudioElement = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    setAudioUrl(url);
  };

  return (
    <>
      <Navbar />
      <AudioRecorder
        onRecordingComplete={addAudioElement}
        audioTrackConstraints={{
          noiseSuppression: false,
          echoCancellation: false,
        }}
        downloadOnSavePress={false}
        downloadFileExtension="webm"
        showVisualizer={true}
      />
      <br />
      {audioUrl && <audio src={audioUrl} controls />}
    </>
  );
}
