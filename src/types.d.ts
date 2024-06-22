export type Complexity = "VERY EASY" | "EASY" | "MEDIUM" | "HARD" | "VERY HARD";
export type Song = {
  song_id: number;
  title: string;
  artist_name: string;
  duration_seconds: number;
  complexity: Complexity;
  file_name: string;
};

