import { Link } from "react-router-dom";
import { Song as SongType } from "../types";
import ComplexityBar from "./ComplexityBar";

type Props = {
  song: SongType;
};

const Song: React.FC<Props> = ({ song }) => {
  const convertDuration = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    const fmin = String(min).padStart(2, "0");
    const fsec = String(sec).padStart(2, "0");
    return `${fmin}:${fsec}`;
  };

  return (
    <Link to={"/songs/" + song.file_name}>
      <div className="mx-auto mb-4 flex max-w-[800px] justify-between rounded-xl bg-surface0 p-3">
        <div>
          <h1 className="mb-3 font-bold">{song.title}</h1>
          <h2 className="mb-3">{song.artist_name}</h2>
          <p>{convertDuration(song.duration_seconds)}</p>
        </div>
        <ComplexityBar complexity={song.complexity} />
      </div>
    </Link>
  );
};

export default Song;
