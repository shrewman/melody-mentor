import { MutableRefObject, useRef } from "react";
import { Link } from "react-router-dom";

type Props = {
  api: MutableRefObject<any>;
  title: string;
};

const Controls: React.FC<Props> = ({ api, title }) => {
  const controlsBar = useRef(null);

  const handlePlayPauseClick = () => {
    api.current.playPause();
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    api.current.playbackSpeed = e.target.value;
  };

  const handleMetronomeClick = () => {
    const currentVolume = api.current.metronomeVolume;
    api.current.metronomeVolume = Math.abs(currentVolume - 1);
  };

  const handleCountInClick = () => {
    const currentVolume = api.current.countInVolume;
    api.current.countInVolume = Math.abs(currentVolume - 1);
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
        <div>
          <Link to="/">Home</Link>
          <button onClick={handlePlayPauseClick}>Play</button>
          <select defaultValue={1} onChange={handleSpeedChange}>
            <option value="0.5">0.5x</option>
            <option value="0.75">0.75x</option>
            <option value="1">
              1x
            </option>
            <option value="1.5">1.5x</option>
            <option value="2">2x</option>
          </select>
          <span>{title}</span>
        </div>
        <div>
          <button onClick={handleCountInClick}>count</button>
          <button onClick={handleMetronomeClick}>met</button>
          <button>loop</button>
          <select defaultValue={1} onChange={handleZoomChange}>
            <option value="0.75">75</option>
            <option value="1">100</option>
            <option value="1.5">150</option>
          </select>
          <select onChange={handleLayoutChange}>
            <option value="page">Page</option>
            <option value="horizontal">Horizontal</option>
          </select>
          <button>import</button>
        </div>
      </div>
    </>
  );
};

export default Controls;
