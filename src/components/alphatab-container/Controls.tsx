import { MutableRefObject, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClockRotateLeft,
  faDrum,
  faFolder,
  faHouse,
  faPause,
  faPersonRunning,
  faPlay,
  faRepeat,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

type Props = {
  api: MutableRefObject<any>;
  renderFile: (file: File) => void;
};

const Controls: React.FC<Props> = ({ api, renderFile }) => {
  const controlsBar = useRef(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMetronomeEnabled, setIsMetronomeEnabled] = useState(false);
  const [isCountInEnabled, setIsCountInEnabled] = useState(false);
  const [isLoopEnabled, setIsLoopEnabled] = useState(false);
  const [speed, setSpeed] = useState(1);

  const handlePlayPauseClick = () => {
    api.current.playPause();
    setIsPlaying(alphaTab.synth.PlayerState.Playing);
  };

  api.current?.playerStateChanged.on((e) => {
    setIsPlaying(e.state);
  });

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setSpeed(value);
    api.current.playbackSpeed = value;
  };

  const handleMetronomeClick = () => {
    setIsMetronomeEnabled(!isMetronomeEnabled);
    const currentVolume = api.current.metronomeVolume;
    api.current.metronomeVolume = Math.abs(currentVolume - 1);
  };

  const handleCountInClick = () => {
    setIsCountInEnabled(!isCountInEnabled);
    const currentVolume = api.current.countInVolume;
    api.current.countInVolume = Math.abs(currentVolume - 1);
  };

  const handleLoopClick = () => {
    setIsLoopEnabled((prevIsEnabled) => {
      const toggled = !prevIsEnabled;
      api.current.isLooping = toggled;
      return toggled;
    });
  };

  const handleZoomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    api.current.settings.display.scale = Number(e.target.value) / 100;
    api.current.updateSettings();
    api.current.render();
  };

  const handleLayoutChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const layout = e.target.value;
    if (layout === "horizontal") {
      api.current.settings.display.layoutMode = alphaTab.LayoutMode.Horizontal;
    } else if (layout === "page") {
      api.current.settings.display.layoutMode = alphaTab.LayoutMode.Page;
    }
    api.current.updateSettings();
    api.current.render();
  };

  const handleInputFileClick = () => {
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const selectedFile = e.target.files[0];
    renderFile(selectedFile);
  };

  return (
    <>
      <div
        ref={controlsBar}
        className="flex h-10 w-full items-center justify-between bg-surface0 p-3 text-text"
      >
        <div className="flex items-center justify-between">
          <a onClick={handlePlayPauseClick} className="my-auto h-5">
            {isPlaying ? (
              <FontAwesomeIcon icon={faPause} className="h-5 w-5" />
            ) : (
              <FontAwesomeIcon icon={faPlay} className="h-5 w-5" />
            )}
          </a>
          <a
            className={`ml-3 p-2 px-3 ${isCountInEnabled ? "bg-green text-surface0" : "text-text"}`}
            onClick={handleCountInClick}
          >
            <FontAwesomeIcon icon={faClockRotateLeft} />
          </a>
          <a
            className={`ml-1 p-2 px-3 ${isMetronomeEnabled ? "bg-green text-surface0" : "text-text"}`}
            onClick={handleMetronomeClick}
          >
            <FontAwesomeIcon icon={faDrum} />
          </a>
          <a
            className={`ml-1 p-2 px-3 ${isLoopEnabled ? "bg-green text-surface0" : "text-text"}`}
            onClick={handleLoopClick}
          >
            <FontAwesomeIcon icon={faRepeat} />
          </a>
          <div className="my-auto ml-5 flex h-5 items-center">
            <FontAwesomeIcon
              onClick={() => {
                setSpeed(1);
                api.current.playbackSpeed = 1;
              }}
              icon={faPersonRunning} className="my-auto h-5"
            />
            <input
              className="ml-1 w-40 bg-surface0 text-center"
              defaultValue={1}
              type="range"
              min={0.3}
              step={0.05}
              max={2}
              value={speed}
              onChange={handleSpeedChange}
            ></input>
            <span className="text-md mx-3 w-5 text-center font-bold">
              {speed}x
            </span>
          </div>
        </div>

        <div className="flex justify-between">
          <Link to="/">
            <FontAwesomeIcon icon={faHouse} className="h-4" />
          </Link>
          <div className="ml-5">
            <FontAwesomeIcon icon={faSearch} />
            <select
              className="ml-1 hidden bg-surface0 text-center md:inline"
              defaultValue={100}
              onChange={handleZoomChange}
            >
              <option value="75">75%</option>
              <option value="100" selected>100%</option>
              <option value="150">150%</option>
            </select>
          </div>
          <div>
            <select
              className="ml-1 hidden bg-surface0 text-center md:block"
              onChange={handleLayoutChange}
            >
              <option value="page">Page</option>
              <option value="horizontal">Horizontal</option>
            </select>
          </div>

          <a className="ml-5" onClick={handleInputFileClick}>
            <FontAwesomeIcon icon={faFolder} />
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </a>
        </div>
      </div>
    </>
  );
};

export default Controls;
