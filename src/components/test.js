// import { useEffect } from "react";
import { useState } from "react";
export const Loading = () => {
  const [data, setData] = useState(false);

  //   useEffect(() => {
  //     setTimeout(setData(true), 5000);
  //   }, []);

  const makeTrue = () => {
    setData((data) => !data);
  };
  //   console.log(data);
  return (
    <>
      <div>{data ? "true" : "false"}</div>
      <button onClick={makeTrue}>toggle</button>
    </>
  );
};
