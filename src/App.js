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


function Modal({ isOpen, children, onClose }) {
    if (!isOpen) {
        return null;
    }

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            display: 'grid',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.3)'
        }}>
            <div style={{
                padding: 20,
                background: '#fff',
                borderRadius: '2px',
                display: 'inline-block',
                minHeight: '300px',
                margin: '1rem',
                position: 'relative',
                minWidth: '300px',
                boxShadow: '0 3px 7px rgba(0,0,0,0.3)',
                justifySelf: 'center'
            }}>
                {children}
                <hr />
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    )
}



function App() {
    const [numPlanes, setNumPlanes] = useState(3);
    const { data, randomPlanes, isLoading } = LoadPlanes(numPlanes);
    const [planeList, setPlaneList] = useState();
    const [viewedPlanes, setViewedPlanes] = useState([]);
    const [score, setScore] = useState(0);

    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('');

    
    useEffect(() => {
        setPlaneList(randomPlanes);
    }, [randomPlanes]);


    function handlePlaneClick(callsign){
        console.log(callsign)
        let tempPlaneList = [...planeList];
        if(viewedPlanes.includes(callsign)) {
            alert(`You Lose! You have clicked the same plane twice. SCORE: ${score}`);
            setViewedPlanes([]); // Reset the game
            let newScore = 0;

            // setModalContent("You Lose! You have clicked this plane before");
            // setShowModal(true);

            setScore(newScore);
            let newNumPlanes = 3;
            setNumPlanes(1); 
            setNumPlanes(newNumPlanes); // Start over with 3 planes
        
         
            } else {
        
            
            let tempViewedPlanes = [...viewedPlanes, callsign]
            setViewedPlanes(tempViewedPlanes)
            console.log(tempViewedPlanes)
            
            if (tempViewedPlanes.length === tempPlaneList.length){
                let newScore = score+1;
                setScore(newScore);
                let newNumPlanes = tempViewedPlanes.length + 2;
                setViewedPlanes([]); // Reset the game

                // setModalContent("You Win! You have remembered all the planes");
                // setShowModal(true);

                alert(`You Win this level! Now try with ${newNumPlanes} planes`);
                console.log(newNumPlanes);
                setNumPlanes(newNumPlanes); // Increase the number of planes for the next game
               
            } else {
                let newScore = score+1;
                setScore(newScore);
                setPlaneList(shuffleArray(tempPlaneList));
            }


            

        }
    }

    function handleModalClose() {
        setShowModal(false);
    }

    if (isLoading) {
        return <div className="loading">Loading...</div>;
    }


    return (
        <div className="App">
        <header className="App-header">
            <h1>Dont click on the same Plane twice!</h1> 
            <p>Score: {score}</p>
        </header>

           {/* <Modal isOpen={showModal} onClose={handleModalClose}>
                <h2>{modalContent}</h2>
            </Modal> */}

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