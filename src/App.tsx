import "./App.css";
import RecorderPage from "./components/RecorderPage";
import Navbar from "./components/Navbar";
import TunerPage from "./components/TunerPage";
import SongsPage from "./components/SongsPage";
import ProfilePage from "./components/ProfilePage";
import ExercisesPage from "./components/ExercisesPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Tab from "./components/Tab";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="pt-12">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/songs" element={<SongsPage />} />
            <Route path="/songs/:fileName" element={<Tab />} />
            <Route path="/recorder" element={<RecorderPage />} />
            <Route path="/tuner" element={<TunerPage />} />
            <Route path="/exercises" element={<ExercisesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
