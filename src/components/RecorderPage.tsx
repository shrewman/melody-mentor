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
      <div className="m-5">
        <h1 className="mb-5 text-center">Recorder</h1>
        <h2 className="mb-5 text-center">
          Press the button to start recording
        </h2>
        <div className="flex justify-center">
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
        </div>
        <br />
        <div className="flex justify-center">
          {audioUrl && <audio src={audioUrl} controls className="w-1/2" />}
        </div>
      </div>
    </>
  );
}
