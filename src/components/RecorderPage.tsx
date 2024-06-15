import { useState } from "react";
import { AudioRecorder } from "react-audio-voice-recorder";
import Navbar from "./Navbar";

export default function RecorderPage() {
  const [audioUrls, setAudioUrls] = useState<string[]>([]);

  const addAudioElement = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    setAudioUrls([...audioUrls, url]);
  };

  return (
    <>
      <Navbar />
      <div className="m-5 rounded-xl bg-surface0 p-5">
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
      </div>
      <div className="mx-auto w-1/2 justify-center rounded-xl bg-surface0 p-5">
        <h2 className="text-center">Recordings</h2>
        {audioUrls.map((url) => (
          <div className="flex items-center">
            <audio src={url} controls className="mt-5 w-full color-text" />
          </div>
        ))}
      </div>
    </>
  );
}
