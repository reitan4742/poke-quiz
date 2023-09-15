import axios from "axios";
import React, { useEffect } from "react";
import { useDebounce } from "react-use";
import { useNavigate, useLocation } from "react-router-dom";

type Quiz = {
  id: number,
  name: string,
  ans_img: string,
  shadow_img: string
};

type Suggestion = {
  "suggestion": string
};

function Quiz() {
  const [quiz, setQuiz] = React.useState<Quiz>();
  const [value, setValue] = React.useState<string>("");
  const [img, setImg] = React.useState<string>();
  const [suggestions, setSuggestions] = React.useState<string[]>([]);
  const [allPoke, setAllPoke] = React.useState<string[]>([]);
  const [click, setClick] = React.useState<boolean>(true);
  const [disabled, setDisabled] = React.useState<boolean>(false);

  const URL = "http://127.0.0.1:8000";
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state === null) {
      navigate("/");
    }
    axios.get(`${URL}/quiz/`)
      .then((res) => {
        setQuiz(res.data);
        setImageToImg(res.data.shadow_img);
      })
      .catch((e) => {
        console.error("ERROR",e);
      });

    axios.get(`${URL}/all/`)
      .then((res) => {
        setAllPoke(res.data.result);
        // setSuggestions(res.data.result);
      })
      .catch((e) => {
        console.error("ERROR",e);
      });
  },[]);


  useDebounce(() => {
    // 絞り込みをして、setする
    if (click) {
      const suggestions: string[] = [];
      const valueKana = hiraToKana(value);
      const reg = new RegExp(valueKana);
      if (value === "") {
        setSuggestions(suggestions);
      } else {
        for (let i = 0; i < allPoke.length; i++) {
          if(reg.test(allPoke[i])) {
            suggestions.push(allPoke[i]);
          }
          setSuggestions(suggestions);
        }
      }
    } else {
      setClick(true);
    }
  }, 200, [value]);

  const hiraToKana = (hira: string) => {
    return hira.replace(/[\u3042-\u3093]/g, m => String.fromCharCode(m.charCodeAt(0) + 96));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setClick(true);
    setValue(event.target.value);
    setSuggestions([]);
  };

  // クリックをした際にiputに文字列を格納する
  const handleSelect = (element: Suggestion) => {
    setClick(false);
    setValue(element.suggestion);
    setSuggestions([]);
  };

  const setImageToImg = (img: string | undefined) => [
    setImg(`data:image/png;base64,${img}`)
  ];

  const submit = () => {
    if (value === quiz?.name) {
      setImageToImg(quiz?.ans_img);
      setDisabled(true);
    } else {
      console.log("faild");
    }
  };

  const jump = () => {
    // window.location.reload();
    navigate("/");
  };

  return (
    <>
      <div className="mx-12 mt-24 md:flex justify-row">
        <div className="w-full flex justify-center mb-4 md:mb-0">
          <div className="bg-sky-400 h-52 w-52 relative">
            <img src={img} width="202px" height="202px" alt="" />
            <div className="bg-slate-300 absolute top-52 w-52 h-2.5 border border-black"></div>
            <div className="bg-slate-300 absolute -top-2 left-0 w-52 h-2.5 border border-black"></div>
            <div className="bg-slate-300 absolute -left-2 top-0 w-2.5 h-52 border border-black"></div>
            <div className="bg-slate-300 absolute -right-2 top-0 w-2.5 h-52 border border-black"></div>
            <img src="../../public/ballLeft.png" className="absolute -top-6 -left-10" width="70px" height="70px"/>
            <img src="../../public/ballRight.png" className="absolute -top-6 -right-10" width="70px" height="70px"/>
            <img src="../../public/ballLeft.png" className="absolute -bottom-6 -left-10" width="70px" height="60px"/>
            <img src="../../public/ballRight.png" className="absolute -bottom-6 -right-10" width="70px" height="60px"/>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex justify-row w-full mt-12">
            <div className="w-1/6"></div>
            <div className="w-4/6 flex justify-center">
              <div>
                <input className="focus:border-2 border-logo outline-none w-full mb-2 h-8 text-2xl rounded" disabled={disabled} type="text" value={value} onChange={handleInputChange} autoComplete="off"/>
                <div className="w-full max-h-36 overflow-y-scroll">
                  <ul>
                    {suggestions.map((suggestion) => 
                      // <li className="bg- w-48" key={suggestion} onClick={() => handleSelect({suggestion})} >{suggestion}</li>
                      <li className="bg-white w-full h-8 text-2xl" key={suggestion}><button className="h-full hover:bg-slate-300 w-full text-left" onClick={() => handleSelect({suggestion})}>{suggestion}</button></li>
                      )}
                  </ul>
                </div>
              </div>
              <div>
                <button className="text-darkblue ml-2 w-16 h-8 bg-logo hover:bg-amber-400 font-bold rounded" disabled={disabled} onClick={submit}>解答</button>
              </div>
            </div>
          </div>
          <div className="w-full mt-12 flex justify-row">
            <div className="w-1/6"></div>
            <div className="flex justify-center w-4/6">
              <div className="w-full">
                <p hidden={!disabled} className="text-logo text-center text-3xl">It's {quiz?.name}!!!!!!!!</p>
              </div>
              <div>
                <button hidden={!disabled} className="text-darkblue ml-2 w-24 h-24 bg-logo hover:bg-amber-400 font-bold rounded" onClick={jump}>次の問題へ</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Quiz;
