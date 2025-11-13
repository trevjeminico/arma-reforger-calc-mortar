import React from "react";

function ApiTest() {
  const handleApiCall = async () => {
    const urls = [
      "https://api.zippopotam.us/us/90024",
      "https://api.coindesk.com/v1/bpi/currentprice.json",
      "https://www.boredapi.com/api/activity",
      "https://api.agify.io?name=meelad",
      "https://api.genderize.io?name=luc",
      "https://api.nationalize.io?name=nathaniel",
      "https://datausa.io/api/data?drilldowns=Nation&measures=Population",
      "https://dog.ceo/api/breeds/image/random",
      "https://api.ipify.org?format=json",
      "https://official-joke-api.appspot.com/random_joke",
      "https://api.zippopotam.us/us/",
    ];

    try {
      const fetchData = urls.map((url) => {
        return fetch(url).then((r) => {
          return r.json();
        });
      });

      const api = await Promise.allSettled(fetchData).then((r) => {
        return r;
      });

      let successRes = 0;
      let failedRes = 0;
      api.map((res) => {
        if (res.status === "fulfilled") {
          successRes++;
        } else {
          failedRes++;
        }
      });

      console.log(successRes);
      console.log(failedRes);
    } catch (error) {}
  };
  return (
    <>
      <button onClick={() => handleApiCall()}>Text</button>
    </>
  );
}

export default ApiTest;
