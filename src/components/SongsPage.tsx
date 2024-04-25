import { useEffect, useState } from "react";
import { Song as SongType } from "../types";
import Song from "./Song";

export default function SongsPage() {
  const [songs, setSongs] = useState<SongType[] | null>(null);
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

  return (
    <>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <div className="w-full  p-3">
          {songs?.map((song) => <Song song={song} />)}
        </div>
      )}
    </>
  );
}
