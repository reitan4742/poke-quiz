import { Route, Routes } from "react-router-dom";
import Quiz from "./routes/Quiz";
import "./App.css";
import Footer from "./components/Footer"
import Header from "./components/Header";

function App(): JSX.Element{

  return (
    <>
      <Header />
        <Routes>
          <Route path="/quiz" element={<Quiz />}/>
        </Routes>
      <Footer />
    </>
  );
}

export default App;
