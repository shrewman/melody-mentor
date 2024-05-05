import { MutableRefObject, useEffect, useRef, useState } from "react";
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
};

const Controls: React.FC<Props> = ({ api }) => {
  const controlsBar = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMetronomeEnabled, setIsMetronomeEnabled] = useState(false);
  const [isCountInEnabled, setIsCountInEnabled] = useState(false);
  const [isLoopEnabled, setIsLoopEnabled] = useState(false);

  const handlePlayPauseClick = () => {
    setIsPlaying(!isPlaying);
    api.current.playPause();
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    api.current.playbackSpeed = e.target.value;
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
    setIsLoopEnabled(!isLoopEnabled);
  };

  const handleZoomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    api.current.settings.display.scale = e.target.value;
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
          <div className="my-auto ml-5 flex h-5 items-center">
            <FontAwesomeIcon icon={faPersonRunning} className="my-auto h-5" />
            <select
              className="ml-1 w-16 bg-surface0 text-center"
              defaultValue={1}
              onChange={handleSpeedChange}
            >
              <option value="0.5">0.5x</option>
              <option value="0.75">0.75x</option>
              <option value="1">1x</option>
              <option value="1.5">1.5x</option>
              <option value="2">2x</option>
            </select>
          </div>
          <a className="ml-5" onClick={handleCountInClick}>
            <FontAwesomeIcon
              icon={faClockRotateLeft}
              className={`${isCountInEnabled ? "text-green" : "text-text"}`}
            />
          </a>
          <a className="ml-5" onClick={handleMetronomeClick}>
            <FontAwesomeIcon
              icon={faDrum}
              className={`${isMetronomeEnabled ? "text-green" : "text-text"}`}
            />
          </a>
          <a className="ml-5" onClick={handleLoopClick}>
            <FontAwesomeIcon
              icon={faRepeat}
              className={`${isLoopEnabled ? "text-green" : "text-text"}`}
            />
          </a>
        </div>

        <div className="flex justify-between">
          <Link to="/">
            <FontAwesomeIcon icon={faHouse} className="h-4" />
          </Link>
          <div className="ml-5">
            <FontAwesomeIcon icon={faSearch} />
            <select
              className="ml-1 bg-surface0 text-center"
              defaultValue={1}
              onChange={handleZoomChange}
            >
              <option value="0.75">75%</option>
              <option value="1">100%</option>
              <option value="1.5">150%</option>
            </select>
          </div>
          <div>
            <select
              className="ml-1 bg-surface0 text-center"
              onChange={handleLayoutChange}
            >
              <option value="page">Page</option>
              <option value="horizontal">Horizontal</option>
            </select>
          </div>

          <a className="ml-5" onClick={handleMetronomeClick}>
            <FontAwesomeIcon icon={faFolder} />
          </a>
        </div>
      </div>
    </>
  );
};

export default Controls;
