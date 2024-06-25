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
      <div className="container m-5 mx-auto w-full max-w-[800px] rounded-xl bg-surface0 p-5">
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
      </div>
      <div className="container mx-auto m-5 w-full max-w-[800px] rounded-xl bg-surface0 p-5">
        <h2 className="text-center">Recordings</h2>
        {audioUrls.map((url) => (
          <div className="flex items-center">
            <audio src={url} controls className="mt-5 w-full" />
          </div>
        ))}
        {audioUrls.length === 0 && (
          <div className="mt-5 text-center">
            Record something to view here...
          </div>
        )}
      </div>
    </>
  );
}
