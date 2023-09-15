// import React from "react";
import { useNavigate } from "react-router-dom";

function Quiz() {
  const navigate = useNavigate();

  const jump = () => {
    navigate("/quiz", { state: {
      problem_id: 1,
      correct_num: 0
      }});
  }

  return (
    <>
      <div className="mt-12">
        <button className="text-white" onClick={jump}>くいずへ</button>
      </div>
    </>
  );
}

export default Quiz;
