import { Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto m-5 rounded-xl bg-surface0 p-5 text-center">
        <h1 className="text-4xl font-bold text-text">
          Welcome to Melody Mentor!
        </h1>
        <h2 className="mt-4 text-2xl font-bold text-text">
          Melody Mentor is your ultimate tool for mastering guitar skills.
        </h2>
        <p className="mt-4 text-xl text-text">
          Our web application offers a range of features including tuner,
          recorder of your own music, accessing a library of songs and
          exercises.
        </p>
        <p className="mt-4 text-xl text-text">
          Start your musical journey with us!
        </p>
      </div>
      <div className="grid container mx-auto grid-cols-1 gap-8 rounded-xl bg-surface0 p-5 md:grid-cols-5">
        <Link
          to="/recorder"
          className="rounded-lg bg-blue p-6 text-center text-surface0 shadow-md shadow-base transition duration-300 hover:bg-sapphire md:col-span-2"
        >
          <h2 className="mb-2 text-3xl font-bold">Recorder</h2>
          <p className="text-xl">
            Record your guitar sessions to listen back and analyze your playing.
          </p>
        </Link>
        <Link
          to="/songs"
          className="rounded-lg bg-green p-6 text-center text-surface0 shadow-md shadow-base transition duration-300 hover:bg-teal md:col-span-3"
        >
          <h2 className="mb-2 text-3xl font-bold">Songs</h2>
          <p className="text-xl">
            Access a library of songs to practice using our notation player,
            equipped with a wide range of functionalities.
          </p>
        </Link>
        <Link
          to="/exercises"
          className="rounded-lg bg-peach p-6 text-center text-surface0 shadow-md shadow-base transition duration-300 hover:bg-yellow md:col-span-3"
        >
          <h2 className="mb-2 text-3xl font-bold">Exercises</h2>
          <p className="text-xl">
            Improve your instrument knowledge and note recognition with our
            targeted guitar exercises.
          </p>
        </Link>
        <Link
          to="/tuner"
          className="rounded-lg bg-red p-6 text-center text-surface0 shadow-md shadow-base transition duration-300 hover:bg-maroon md:col-span-2"
        >
          <h2 className="mb-2 text-3xl font-bold">Tuner</h2>
          <p className="text-xl">
            Tune your guitar accurately with our advanced tuner tool.
          </p>
        </Link>
      </div>
    </>
  );
}
