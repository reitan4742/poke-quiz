import axios from "axios";
import React, { useEffect } from "react";
import Loading from "../components/Loading";

type Quiz = {
  id: number,
  name: string,
  ans_img: string,
  shadow_img: string
};

function Quiz() {
  const [quiz, setQuiz] = React.useState<Quiz>();
  const [value, setValue] = React.useState<string>();
  const [isLoading, setIsLoading] = React.useState(true);
  const URL = "http://127.0.0.1:8000";

 useEffect(() => {
  axios.get(`${URL}/quiz/`)
    .then((res) => {
      setQuiz(res.data);
      setIsLoading(false);
    })
    .catch((e) => {
      console.error("ERROR",e);
      setIsLoading(false);
    });
 },[])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const submit = () => {
    if (value === quiz?.name) {
      console.log("omg")
    } else {
      console.log("faild")
    }
  }

  return (
  <>
    <h1>Who's that pokemon!?</h1>
    { isLoading ? <Loading /> : <img height="200px" width="200px" src={"data:image/png;base64,"+quiz?.shadow_img} />}
    <p>{quiz?.name}</p>
    <input type="text" value={value} onChange={handleInputChange}/>
    <button onClick={submit}>送信</button>
  </>
  )
}

export default Quiz
