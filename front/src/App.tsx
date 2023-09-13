import { Route, Routes } from "react-router-dom";
import Quiz from "./routes/quiz";

function App() {

  return (
  <>
    <h1>hello world</h1>
    <Routes>
      <Route path="/quiz" element={<Quiz />}/>
    </Routes>
  </>
  )
}

export default App
