import { useEffect, useState } from "react";
import { Song } from "../types";
import ComplexityBar from "./ComplexityBar";

export default function Songs() {
  const [songs, setSongs] = useState<Song[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/songs")
      .then((res) => {
        if (!res.ok) {
          alert("not ok");
          return;
        }
        return res.json();
      })
      .then((data) => {
        setSongs(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching songs: ", err);
      });
  }, []);

  const convertDuration = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    const fmin = String(min).padStart(2, "0");
    const fsec = String(sec).padStart(2, "0");
    return `${fmin}:${fsec}`;
  };

  return (
    <>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <div className="w-full  p-3">
          {songs?.map((song) => (
            <div
              key={song.song_id}
              className="mb-4 flex justify-between border-4 border-surface1 bg-surface0 p-3"
            >
              <div>
                <h1 className="mb-3 font-bold">{song.title}</h1>
                <h2 className="mb-3">{song.artist}</h2>
                <p>{convertDuration(song.duration_seconds)}</p>
              </div>
              <ComplexityBar complexity={song.complexity} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
