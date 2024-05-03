import { MutableRefObject, useRef } from "react";
import { Link } from "react-router-dom";

type Props = {
  api: MutableRefObject<any>;
};

const Controls: React.FC<Props> = ({ api }) => {
  const controlsBar = useRef(null);

  const handlePlayPauseClick = () => {
    api.current.playPause();
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    api.current.playbackSpeed = e.target.value;
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
          <select onChange={handleSpeedChange}>
            <option value="0.5">0.5x</option>
            <option value="0.75">0.75x</option>
            <option defaultValue={1} value="1">
              1x
            </option>
            <option value="1.5">1.5x</option>
            <option value="2">2x</option>
          </select>
        </div>
        <div>
          <select name="zoom" id="zoom">
            <option value="75">75</option>
            <option value="100">100</option>
            <option value="150">150</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Controls;
