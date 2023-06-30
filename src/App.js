import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import csvFile from './data/AirlineData.csv';

const NUM_PLANES = 3

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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
      result.add(candidate); 
    }
  }

  return [...result];
}



async function fetchPlane(registration) {
  const url = `https://api.planespotters.net/pub/photos/reg/${registration}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.photos && data.photos.length > 0) {
      return data.photos[0].thumbnail_large.src;
    }

    return null;
  } catch (error) {
    console.log('There was an error!', error);
    return null;
  }
}



function App() {
  const [data, setData] = useState([]);
  const [randomPlanes, setRandomPlanes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    Papa.parse(csvFile, {
      download: true,
      header: true,
      complete: function(parsedData) {
        setData(parsedData.data);
        
      }
    });
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const fetchImages = async () => {
        const validPlanes = [];
        while (validPlanes.length < NUM_PLANES) {
          await delay(1000);
          const [candidate] = getRandomElements(data, 1);
          const imageUrl = await fetchPlane(candidate.Registration);
    
          if (imageUrl) {
            validPlanes.push({...candidate, url: imageUrl});
          }
    
          if (validPlanes.length >= NUM_PLANES) {
            break;
          }
        }
        setRandomPlanes(validPlanes);
        setIsLoading(false);
      }
      fetchImages();
      
    }
  }, [data]);



  if (isLoading) {
    return <div>Loading...</div>;
  }




  return (
    <div className="App">
      <header className="App-header">

        {randomPlanes.map((plane, index) => (
          <>
          <p key={plane.Callsign}>
            {JSON.stringify(plane, null, 2)}
          </p>
          <img src={plane.url} alt="" />
          
          </>
        ))}

      </header>
    </div>
  );
}



export default App;
