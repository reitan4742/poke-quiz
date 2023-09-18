import React from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

function Ressult() {
  const [result, setResult] = React.useState<number>();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    try {
        if (location.state.problem_id !== 11) {
            navigate("/");        
        }
        setResult(location.state.correct_num * 10);
    } catch (error) {
        navigate("/");
    }
  });

  const jump = () => {
    navigate("/quiz/1", { state: {
      problem_id: 1,
      correct_num: 0
    }});
  };

  return (
    <>
      <div className="mt-12 mx-12 flex justify-center">
        <div className="mt-24 w-full">
            <h1 className="text-logo text-center text-2xl mb-12">あなたの点数は、{result}点です。</h1>
            <div className="flex justify-center">
             <button className="text-darkblue text-2xl ml-2 w-44 h-12 bg-logo hover:bg-amber-400 font-bold rounded" onClick={jump}>もう一度挑戦</button>
            </div>
        </div>
      </div>
    </>
  );
}

export default Ressult;