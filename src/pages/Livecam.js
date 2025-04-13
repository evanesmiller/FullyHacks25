import DroneControlPanel from '../components/DroneControl';
import Navbar from '../components/Navbar';
import Starfield from '../components/Starfield';
import DroneControl from '../components/DroneControl';

function Livecam(){
    return (
        <>
            <div style={{display: "block", width: "100%"}}>
                <Navbar />
            </div>
            <Starfield />
            <DroneControl />
        </>
    );
}

export default Livecam;