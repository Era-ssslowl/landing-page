import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import FileUploader from "./pages/fileUploader";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/upload" element={<FileUploader/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
