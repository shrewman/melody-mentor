import { useEffect, useState } from "react";

type Song = {
  song_id: number;
  title: string;
  artist: string;
  duration_seconds: number;
  file_location: string;
};

export default function Songs() {
  const [songs, setSongs] = useState<Song[] | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/songs")
      .then((res) => {
        if (!res.ok) {
          alert("not ok");
          return;
        }
        return res.json();
      })
      .then((data) => {
        setSongs(data);
      })
      .catch((err) => {
        console.error("Error fetching songs: ", err);
      });
  }, []);

  return (
    <>
      <div>
        {songs?.map((song) => (
          <div key={song.song_id}>
            <div>{song.title}</div>
            <div>{song.artist}</div>
          </div>
        ))}
      </div>
    </>
  );
}
