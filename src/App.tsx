import { HashRouter, Route, Routes } from "react-router-dom";

import ExamPage from "./pages/ExamPage";
import HomePage from "./pages/HomePage";
import ReviewPage from "./pages/ReviewPage";
import SectionPage from "./pages/SectionPage";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/:sectionId' element={<SectionPage />} />
        <Route path='/:sectionId/review' element={<ReviewPage />} />
        <Route path='/:sectionId/exam' element={<ExamPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
