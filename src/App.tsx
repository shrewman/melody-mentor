import "./App.css";
import RecorderPage from "./components/RecorderPage";
import TunerPage from "./components/TunerPage";
import SongsPage from "./components/SongsPage";
import ProfilePage from "./components/ProfilePage";
import ExercisesPage from "./components/ExercisesPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import ScorePage from "./components/ScorePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/songs" element={<SongsPage />} />
          <Route path="/songs/:fileName" element={<ScorePage />} />
          <Route path="/recorder" element={<RecorderPage />} />
          <Route path="/tuner" element={<TunerPage />} />
          <Route path="/exercises" element={<ExercisesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
