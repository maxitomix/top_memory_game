import { LoadPlanes } from './loadPlanes';
import './App.css'
import { useState, useEffect } from 'react';

function App() {
  const { data, randomPlanes, isLoading } = LoadPlanes();
  const [planeList, setPlaneList] = useState()
  
  useEffect(() => {
    setPlaneList(randomPlanes);
  }, [randomPlanes]);


function handlePlaneClick(callsign){
    console.log(callsign)
    
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