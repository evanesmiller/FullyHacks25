import earthVideo from '../assets/earth.mp4';
import { FaChevronDown } from 'react-icons/fa';
import Navbar from './Navbar';

function Header(){
    return (
        <header>
            <div style={{width: "100%", height: "100vh", position: "relative"}}>
                <video style={{width: "100%", height: "100%"}} autoPlay muted loop>
                    <source src={earthVideo} type="video/mp4"/>
                </video>
                <div style={{

                }}>
                    <Navbar />
                </div>
                <div style={{
                        position: 'absolute',
                        bottom: '30px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        color: 'white',
                        fontSize: '3rem',
                        cursor: 'pointer',
                    }}>
                    <FaChevronDown />
                </div>
            </div>
        </header>
    );
}

export default Header;