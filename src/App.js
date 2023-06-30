import { LoadPlanes } from './loadPlanes';
import './App.css'
import { useState, useEffect } from 'react';


function shuffleArray(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


function App() {
  const { data, randomPlanes, isLoading } = LoadPlanes();
  const [planeList, setPlaneList] = useState()
  
  useEffect(() => {
    setPlaneList(randomPlanes);
  }, [randomPlanes]);


    function handlePlaneClick(callsign){
        console.log(callsign)
        let tempPlaneList = [...planeList];
        setPlaneList(shuffleArray(tempPlaneList))
        
}





  if (isLoading) {
    return <div>Loading...</div>;
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1>Dont click on the same Plane twice!</h1>
      </header>
        <div className="container">
            {planeList.map((plane, index) => (
            
       
          <div key={plane.Callsign} onClick={() => handlePlaneClick(plane.Callsign)}>
            <img src={plane.url} alt="" />
          </div>
            
            ))}

        </div>
    </div>
  );

}

export default App;

//    <p key={plane.Callsign}>
//                 {JSON.stringify(plane, null, 2)}
//             </p> 