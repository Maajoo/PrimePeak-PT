import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';

export default function Home() {

    const images = [
        "/slides/gym-picture-1.jpg",
        "/slides/gym-picture-2.jpg",
        "/slides/gym-picture-3.jpg",
        "/slides/gym-picture-4.jpg",
    ];

    return (
        <>
            <h1 style={{ fontFamily: "IBM Plex Sans", fontSize: 30,}}>Welcome to Prime Peak personal training!</h1>
            <div className="centertable">
                <div style={{ width: 1500 }}>
                    <Slide>
                        <div className="each-slide-effect">
                            <div style={{ 'backgroundImage': `url(${images[0]})`, height: 600, width: 1500 }}>
                            </div>
                        </div>
                        <div className="each-slide-effect">
                            <div style={{ 'backgroundImage': `url(${images[1]})`, height: 600, width: 1500 }}>
                            </div>
                        </div>
                        <div className="each-slide-effect">
                            <div style={{ 'backgroundImage': `url(${images[2]})`, height: 600, width: 1500 }}>
                            </div>
                        </div>
                        <div className="each-slide-effect">
                            <div style={{ 'backgroundImage': `url(${images[3]})`, height: 600, width: 1500 }}>
                            </div>
                        </div>
                    </Slide>
                </div>
            </div>
        </>
    );
}