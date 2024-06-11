import { Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function ExercisesPage() {
  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-[800px]">
        <Link to="/exercises/note-picker">
          <div className="m-5 bg-surface0 p-5 transition hover:bg-surface1">
            <h1 className="bold mb-3 text-center text-2xl text-blue">
              Random Note Picker
            </h1>
            <p className="text-text text-justify">
              Tool designed to help guitarists practice identifying and
              memorizing notes on the fretboard. It generates random notes
              across the fretboard, allowing to test knowledge and improve
              familiarity with the instrument's layout.
            </p>
          </div>
        </Link>
      </div>
      <div className="mx-auto max-w-[800px]">
        <Link to="/exercises/ear-training">
          <div className="m-5 bg-surface0 p-5 transition hover:bg-surface1">
            <h1 className="bold mb-3 text-center text-2xl text-blue">
              Ear Training
            </h1>
            <p className="text-text text-justify">
              This exercise is designed to help improve ability to identify
              musical notes by ear. First the random note is displayed on the
              screen and the corresponding sound is played. Then, another note
              is played, user tries to guess the second note based on what they
              heard.
            </p>
          </div>
        </Link>
      </div>

      {/* !!! HIDDEN !!! */}
      <div className="mx-auto max-w-[800px] hidden">
        <Link to="/exercises/rhythm">
          <div className="m-5 bg-surface0 p-5 transition hover:bg-surface1">
            <h1 className="bold mb-3 text-center text-2xl text-blue">
              Rhytm Exercise
            </h1>
            <p className="text-text text-justify">
              Practice your timing with our adjustable online metronome. Set the
              tempo and play along to improve your rhythm accuracy. Follow along
              with visual rhythm patterns and click or play in time to match the
              beat. Get real-time feedback to enhance your timing skills.
            </p>
          </div>
        </Link>
      </div>
    </>
  );
}
