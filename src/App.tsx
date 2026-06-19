import { HashRouter, Route, Routes } from "react-router-dom";

import ExamPage from "./pages/ExamPage";
import HomePage from "./pages/HomePage";
import ReviewPage from "./pages/ReviewPage";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/review' element={<ReviewPage />} />
        <Route path='/exam' element={<ExamPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
