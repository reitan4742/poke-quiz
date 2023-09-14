import { Route, Routes } from "react-router-dom";
import Quiz from "./routes/quiz";
import "./App.css";

function App(): JSX.Element{

  return (
    <>
      <Routes>
        <Route path="/quiz" element={<Quiz />}/>
      </Routes>
    </>
  );
}

export default App;
