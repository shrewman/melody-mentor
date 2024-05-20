import Metronome from "./Metronome";
import Navbar from "./Navbar";

export default function RhythmPage() {
  return (
    <>
      <Navbar />
      <div className="m-5">
        <div>rhythm</div>
        <Metronome />
      </div>
    </>
  );
}
