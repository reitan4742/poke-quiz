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

  const URL = "http://127.0.0.1:8000";

 useEffect(() => {
  axios.get(`${URL}/quiz/`)
    .then((res) => {
      setQuiz(res.data);
      setImageToImg(res.data.shadow_img)
      setIsLoading(false);
    })
    .catch((e) => {
      console.error("ERROR",e);
      setIsLoading(false);
    });
  axios.get(`${URL}/all/`)
    .then((res) => {
      setSuggestions(res.data.result);
    })
    .catch((e) => {
      console.error("ERROR",e);
    });
 },[]);
 
 useDebounce(() => {
  // 絞り込みをして、setする
 }, 500, [value]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSelect = (element: Suggestion) => {
    setValue(element.suggestion)
  };

  const setImageToImg = (img: string | undefined) => [
    setImg(`data:image/png;base64,${img}`)
  ]

  const submit = () => {
    if (value === quiz?.name) {
      setImageToImg(quiz?.ans_img)
    } else {
      console.log("faild")
    }
  }

  return (
  <>
    <h1>Who's that pokemon!?</h1>
    { isLoading ? <Loading /> : <img height="200px" width="200px" src={img} />}
    <p>{quiz?.name}</p>
    <input type="text" value={value} onChange={handleInputChange} />
    <ul>
      {suggestions.map((suggestion) => 
      <li key={suggestion} onClick={() => handleSelect({suggestion})} >{suggestion}</li>
      )}
    </ul>
    <button onClick={submit}>送信</button>
  </>
  )
}

export default Quiz
