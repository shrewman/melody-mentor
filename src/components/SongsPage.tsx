import { Song as SongType } from "../types";
import Song from "./Song";
import Navbar from "./Navbar";
import { useQuery } from "@tanstack/react-query";

export default function SongsPage() {
  const fetchSongs = async () => {
    const res = await fetch("http://localhost:3000/api/v1/songs");
    if (!res.ok) {
      throw new Error("Failed to fetch songs");
    }
    return res.json();
  };

  const { data, isLoading } = useQuery({
    queryKey: ["songs"],
    queryFn: fetchSongs,
  });

  return (
    <>
      <Navbar />
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <div className="w-full p-5">
          {data?.map((song: SongType) => (
            <Song key={song.song_id} song={song} />
          ))}
        </div>
      )}
    </>
  );
}
