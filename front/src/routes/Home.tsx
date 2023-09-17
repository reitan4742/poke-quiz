// import React from "react";
import { useNavigate } from "react-router-dom";

function Quiz() {
  const navigate = useNavigate();

  const jump = () => {
    navigate("/quiz/1", { state: {
      problem_id: 1,
      correct_num: 0
    }});
  };

  return (
    <>
      <div className="mt-24 mx-12 flex justify-center">
        <button className="text-darkblue text-2xl ml-2 w-24 h-12 bg-logo hover:bg-amber-400 font-bold rounded" onClick={jump}>クイズへ</button>
      </div>
    </>
  );
}

export default Quiz;
