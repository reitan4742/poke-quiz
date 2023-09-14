import axios from "axios";
import React, { useEffect } from "react";
import Loading from "../components/Loading";
import { useDebounce } from "react-use";
// import Autocomplete from "react-autocomplete-input";

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
  const [isLoading, setIsLoading] = React.useState(true);
  const [quiz, setQuiz] = React.useState<Quiz>();
  const [value, setValue] = React.useState<string>("");
  const [img, setImg] = React.useState<string>();
  const [suggestions, setSuggestions] = React.useState<string[]>([]);
  const [allPoke, setAllPoke] = React.useState<string[]>([]);

  const URL = "http://127.0.0.1:8000";

  useEffect(() => {
    axios.get(`${URL}/quiz/`)
      .then((res) => {
        setQuiz(res.data);
        setImageToImg(res.data.shadow_img);
        setIsLoading(false);
      })
      .catch((e) => {
        console.error("ERROR",e);
        setIsLoading(false);
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
    const suggestions: string[] = [];
    const valueKana = hiraToKana(value);
    const reg = new RegExp(valueKana);
    if (value === "") {
      setSuggestions(suggestions);
    } else {
      for (let i = 0; i < allPoke.length; i++) {
        if(reg.test(allPoke[i])) {
          suggestions.push(allPoke[i]);
          if (suggestions.length > 7) {
            break;
          }
        }
        setSuggestions(suggestions);
      }
    }
  }, 500, [value]);

  const hiraToKana = (hira: string) => {
    return hira.replace(/[\u3042-\u3093]/g, m => String.fromCharCode(m.charCodeAt(0) + 96));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  // クリックをした際にiputに文字列を格納する
  const handleSelect = (element: Suggestion) => {
    setValue(element.suggestion);
  };

  const setImageToImg = (img: string | undefined) => [
    setImg(`data:image/png;base64,${img}`)
  ];

  const submit = () => {
    if (value === quiz?.name) {
      setImageToImg(quiz?.ans_img);
    } else {
      console.log("faild");
    }
  };

  return (
    <>
      <h1>Who&apos;s that pokemon!?</h1>
      { isLoading ? <Loading inverted={true} content=""/> : <img height="200px" width="200px" src={img} />}
      <p>{quiz?.name}</p>
      <input type="text" value={value} onChange={handleInputChange} />
      <ul>
        {suggestions.map((suggestion) => 
          <li key={suggestion} onClick={() => handleSelect({suggestion})} >{suggestion}</li>
        )}
      </ul>
      <button onClick={submit}>送信</button>
    </>
  );
}

export default Quiz;
