import { Route, Routes } from "react-router-dom";
import Quiz from "./routes/Quiz";
import Home from "./routes/Home";
import Result from "./routes/Result";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App(): JSX.Element{

  return (
    <>
      <Header />
      <Routes>
        <Route path="/quiz/:id" element={<Quiz />}/>
        <Route path="/" element={<Home />}/>
        <Route path="/result" element={<Result />}/>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
