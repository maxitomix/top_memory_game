import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import csvFile from './data/AirlineData.csv';

const NUM_PLANES = 1



const fetchPlane = (registration) => {
   
  const planeRegistration = registration;

  const url = `https://api.planespotters.net/pub/photos/reg/${planeRegistration}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();   // This returns a promise
    })
    .then(data => {
      if (data.photos && data.photos.length === 0) {
        console.log('Empty object returned');
      return false;
      }
      console.log(data);
      console.log(data.photos[0].thumbnail_large.src);
      return data.photos[0].thumbnail_large.src
    })
    .catch(error => console.log('There was an error!', error));
}





function App() {
  const [data, setData] = useState([]);
  const [RandomPlanes, setRandomPlanes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Papa.parse(csvFile, {
      download: true,
      header: true,
      complete: (parsedData) => {
        setData(parsedData.data);
        const randomPlanes = getRandomElements(parsedData.data, NUM_PLANES);
        setRandomPlanes(randomPlanes);
        setIsLoading(false);
      }
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }


  function getRandomElements(arr, n) {
    let result = new Set();
    let registrations = new Set();
    let callsignPrefixes = new Set();
  
    while(result.size < n && arr.length > result.size) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      const candidate = arr[randomIndex];
  
      const registration = candidate.Registration;
      const callsignPrefix = candidate.Callsign.slice(0, 2);
  
      if (!registrations.has(registration) && !callsignPrefixes.has(callsignPrefix)) {
        registrations.add(registration);
        callsignPrefixes.add(callsignPrefix);

        // if (fetchPlane(registration)){
        //   candidate.push(url:fetchPlane(registration))
          result.add(candidate);
        // }
      }
    }
  
    return [...result];
  }


  return (
    <div className="App">
      <header className="App-header">

        {RandomPlanes.map((plane, index) => (
          <>
          <p key={index}>
            {JSON.stringify(plane, null, 2)}
          </p>
          <button onClick={fetchPlane}>Fetch Planes</button>
          </>
        ))}

      </header>
    </div>
  );
}



export default App;
