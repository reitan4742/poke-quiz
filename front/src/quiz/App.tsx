import axios, { AxiosResponse } from "axios";
import React from "react";

type tmp = {
  "name": string
};

function App() {
  const [data, setData] = React.useState<tmp>();
  const [value, setValue] = React.useState<number>();
  const URL = "http://127.0.0.1:8000";

  const getData = (): void => {
    axios.get(`${URL}/${value}`)
      .then((res :AxiosResponse) => {
        setData(res.data)
      })
      .catch((e) => console.error("ERROR",e));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value))
  };

  return (
  <>
    <h1>hello world</h1>
    <input type="number" value={value} onChange={handleInputChange}/>
    {data ? <div>{data.name}</div> : <button onClick={getData}>データを取得</button>}
  </>
  )
}

export default App
