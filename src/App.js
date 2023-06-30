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
    const [numPlanes, setNumPlanes] = useState(3);
    const { data, randomPlanes, isLoading } = LoadPlanes(numPlanes);
    const [planeList, setPlaneList] = useState();
    const [viewedPlanes, setViewedPlanes] = useState([]);
    const [score, setScore] = useState(0);

    
    useEffect(() => {
        setPlaneList(randomPlanes);
    }, [randomPlanes]);


    function handlePlaneClick(callsign){
        console.log(callsign)
        let tempPlaneList = [...planeList];
        if(viewedPlanes.includes(callsign)) {
            alert("You Lose! You have clicked this plane before");
            setViewedPlanes([]); // Reset the game
            setNumPlanes(3); // Start over with 3 planes
         
            } else {
        
            
            let tempViewedPlanes = [...viewedPlanes, callsign]
            setViewedPlanes(tempViewedPlanes)
            console.log(tempViewedPlanes)
            
            if (tempViewedPlanes.length === tempPlaneList.length){
                let newScore = score+1;
                setScore(newScore);
                let newNumPlanes = tempViewedPlanes.length + 1;
                setViewedPlanes([]); // Reset the game
                alert("You Win this level! You have remembered all the planes");
                console.log(newNumPlanes);
                setNumPlanes(newNumPlanes); // Increase the number of planes for the next game
                
            
               
            } else {
                let newScore = score+1;
                setScore(newScore);
                setPlaneList(shuffleArray(tempPlaneList));
            }


            

        }
    }



    if (isLoading) {
        return <div>Loading...</div>;
    }


    return (
        <div className="App">
        <header className="App-header">
            <h1>Dont click on the same Plane twice!</h1> 
            <p>Score: {score}</p>
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