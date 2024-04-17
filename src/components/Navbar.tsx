import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed left-0 top-0 w-full bg-surface0 p-5">
      <ul className="flex justify-center">
        <li>
          <Link className="p-5 hover:bg-surface1" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="p-5 hover:bg-surface1" to="/recorder">
            Recorder
          </Link>
        </li>
        <li>
          <Link className="p-5 hover:bg-surface1" to="/songs">
            Songs
          </Link>
        </li>
        <li>
          <Link className="p-5 hover:bg-surface1" to="/exercises">
            Exercises
          </Link>
        </li>
        <li>
          <Link className="p-5 hover:bg-surface1" to="/tuner">
            Tuner
          </Link>
        </li>
        <li>
          <Link className="p-5 hover:bg-surface1" to="/profile">
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
}
