import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { MutableRefObject, useRef, useState } from "react";

type Props = {
  api: MutableRefObject<any>;
  tracks: any;
};

const Tracks: React.FC<Props> = ({ api, tracks }) => {
  const tracksBar = useRef(null);

  const [isMute, setIsMute] = useState<boolean[]>(
    new Array(tracks.length).fill(false),
  );
  const [isSolo, setIsSolo] = useState<boolean[]>(
    new Array(tracks.length).fill(false),
  );
  const [volumes, setVolumes] = useState<number[]>(
    new Array(tracks.length).fill(1),
  );

  const renderTrack = (track) => {
    api.current.renderTracks([track]);
  };

  const handleVolumeChange = (
    track: any,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const index = track.index;
    const volume = Number(e.target.value);
    api.current.changeTrackVolume([track], volume);

    const newVolumes = [...volumes];
    newVolumes[index] = volume;
    setVolumes(newVolumes);
  };

  const handleMuteClick = (track, e: React.MouseEvent) => {
    e.stopPropagation();
    const index = track.index;
    const current = isMute[index];
    const newMutes = [...isMute];
    newMutes[index] = !newMutes[index];
    setIsMute(newMutes);
    api.current.changeTrackMute([track], !current);
  };

  const handleSoloClick = (track, e: React.MouseEvent) => {
    e.stopPropagation();
    const index = track.index;
    const current = isSolo[index];
    const newSolos = new Array(tracks.length).fill(false);
    newSolos[index] = !current;
    setIsSolo(newSolos);
    api.current.changeTrackSolo(tracks, false);
    api.current.changeTrackSolo([track], !current);
  };

  return (
    <>
      <div
        ref={tracksBar}
        className="absolute bottom-0 top-0 z-[1001] w-16 bg-surface0 transition-all hover:w-80"
      >
        <div className="mr-1 flex flex-col">
          {tracks?.map((track, index) => (
            <div
              key={index}
              onClick={() => renderTrack(track)}
              className="flex items-center overflow-hidden py-1 transition hover:bg-surface2"
            >
              <FontAwesomeIcon className="h-9 p-3" icon={faMusic} />
              <div className="w-32">
                <div className="text-sm overflow-hidden truncate mb-1">
                  {track.name}
                </div>
                <input
                  min={0}
                  max={2}
                  step={0.1}
                  value={volumes[index]}
                  onChange={(e) => handleVolumeChange(track, e)}
                  onClick={(e) => e.stopPropagation()}
                  type="range"
                  className="block accent-blue mt-1"
                />
              </div>
              <div className="ml-3 flex">
                <button
                  onClick={(e) => handleMuteClick(track, e)}
                  className={`m-1 w-12 rounded-none border-none p-0 text-sm ${isMute[index] ? "bg-red" : "bg-surface1"}`}
                >
                  mute
                </button>
                <button
                  onClick={(e) => handleSoloClick(track, e)}
                  className={`m-1 w-12 rounded-none border-none p-0 text-sm ${isSolo[index] ? "bg-green" : "bg-surface1"}`}
                >
                  solo
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Tracks;
