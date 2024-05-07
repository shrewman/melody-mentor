import { Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function ExercisesPage() {
  return (
    <>
      <Navbar />
      <Link to="/exercises/note-picker">
        <div className="m-5 bg-surface0 p-5 transition hover:bg-surface1">
          <h1 className="bold mb-3 text-center text-2xl text-blue">
            Random Note Picker
          </h1>
          <p className="text-text">
            Tool designed to help guitarists practice identifying and memorizing
            notes on the fretboard. It generated random notes across the
            fretboard, allowing to test knowledge and improve familiarity with
            the instrument's layout.
          </p>
        </div>
      </Link>
    </>
  );
}
