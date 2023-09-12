import axios, { AxiosResponse } from "axios";
import React from "react";

type tmp = {
  "message": string
};

function App() {
  const [data, setData] = React.useState<tmp>();
  const URL = "http://127.0.0.1:8000";

  const getData = (): void => {
    axios.get(URL)
      .then((res :AxiosResponse) => {
        setData(res.data)
      })
      .catch((e) => console.error("ERROR",e));
  };

  return (
  <>
    <h1>hello world</h1>
    {data ? <div>{data.message}</div> : <button onClick={getData}>データを取得</button>}
  </>
  )
}

export default App
