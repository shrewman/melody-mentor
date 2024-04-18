import { useState } from "react";
import { AudioRecorder } from "react-audio-voice-recorder";

export default function Recorder() {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const addAudioElement = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    setAudioUrl(url);
  };

  return (
    <>
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
