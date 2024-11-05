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
        gsap.registerPlugin(ScrollToPlugin);
    
        // 이미지 자동 확대 애니메이션
        gsap.to("img", {
            scale: 2,
            z: 350,
            transformOrigin: "center center",
            ease: "power1.inOut",
            duration: 2 // 애니메이션 지속 시간 조정
        });
    
        gsap.to(".overlay-img", {
            scale: 0.2,
            transformOrigin: "center center",
            ease: "power1.inOut",
            duration: 2 // 애니메이션 지속 시간 조정
        });
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
