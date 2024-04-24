import "./App.css";
import Recorder from "./components/Recorder";
import Navbar from "./components/Navbar";
import Tuner from "./components/Tuner";
import Songs from "./components/Songs";
import Profile from "./components/Profile";
import Exercises from "./components/Exercises";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="p-8"></div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/songs" element={<Songs />} />
          <Route path="/recorder" element={<Recorder />} />
          <Route path="/tuner" element={<Tuner />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
