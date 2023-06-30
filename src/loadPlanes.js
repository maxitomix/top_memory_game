import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import csvFile from './data/AirlineData.csv';



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





export function LoadPlanes(NUM_PLANES) {
  const [data, setData] = useState([]);
  const [randomPlanes, setRandomPlanes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const fetchImages = async () => {
    setIsLoading(true);
    const validPlanes = [];
    while (validPlanes.length < NUM_PLANES) {
      delay(1000)
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
      

      fetchImages();
      
    }
  }, [data, NUM_PLANES]);

 return { data, randomPlanes, isLoading };

}



