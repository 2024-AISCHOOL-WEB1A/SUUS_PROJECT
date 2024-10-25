import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/main.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Header from '../components/header'; // 헤더 임포트

const Main = () => {
    const navigate = useNavigate();

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".wrapper",
                start: "top top",
                end: "+=300%",
                pin: true,
                scrub: 0.5, // 스크럽 속도 조정
                markers: false // 마커를 숨김
            }
        })
        .to("img", {
            scale: 2,
            z: 350,
            transformOrigin: "center center",
            ease: "power1.inOut"
        });

        return () => {
            tl.kill();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const handleArrowClick = () => {
        console.log("Arrow clicked!");
        navigate('/login');
    };

    return (
        <div>
            <div className="wrapper">
                <div className="content">
                    <Header />
                    <section className="section hero">
                        <div className='overlay-img'>
                            <img src="./imgs/2650149.png" alt="" />
                        </div>
                        <div className="arrow-container" onClick={handleArrowClick}>
                            <img src={process.env.PUBLIC_URL + "/imgs/down.png"} alt="" className="arrow-icon" />
                        </div>
                    </section>
                    <div className="image-container">
                        <img src="/imgs/마지막.png" alt="image" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;
