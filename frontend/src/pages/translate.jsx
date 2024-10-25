import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Link와 useNavigate 임포트
import '../css/translate.css';
import { TweenMax, Power4 } from 'gsap'; // GSAP 설치 확인
import Header from '../components/header'; // 헤더 임포트
import Pay from '../components/pay'; // 차트 컴포넌트 임포트

const animations = ['수어번역', '마이페이지', '이용량', '로그아웃'];

const Translate = () => {
    const [view, setView] = useState('수어번역');
    const [activeColor, setActiveColor] = useState(''); // 기본 색상 없음
    const [showPay, setShowPay] = useState(false); // Pay 컴포넌트 표시 여부
    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleAnimationClick = (animation, color) => {
        setView(animation);
        setActiveColor(color); // 활성화된 버튼 색상 변경

        // '이용량' 버튼 클릭 시 Pay 컴포넌트 표시 또는 숨기기
        if (animation === '이용량') {
            setShowPay((prev) => !prev); // Pay 컴포넌트 토글
        } else {
            setShowPay(false); // 다른 버튼 클릭 시 Pay 컴포넌트 숨기기
        }
    };

    return (
        <div id="app">
            <Header /> {/* 헤더 추가 */}
            <TransitionComponent view={view} />
            <Controls
                animations={animations}
                onAnimationClick={handleAnimationClick}
                activeView={view}
                activeColor={activeColor}
            />
            {showPay && <Pay />} {/* Pay 컴포넌트 표시 */}
        </div>
    );
};

const Controls = ({ animations, onAnimationClick, activeView }) => {
    const colors = [
        'var(--color1)',
        'var(--color2)',
        'var(--color3)',
        'var(--color4)',
        'var(--color5)'
    ];

    return (
        <ul className="controls">
            {animations.map((animation, index) => (
              <li
              key={animation}
              onClick={() => onAnimationClick(animation, colors[index])}
              className={animation === activeView ? 'active' : ''}
              style={{
                  backgroundColor: animation === activeView ? colors[index] : 'transparent',
                  color: animation === activeView ? '#fff' : '#000000', // 기본 색상을 검정색으로 설정
                  fontWeight: 'bold' // 모든 텍스트를 볼드체로 설정
              }}
          >
              {animation}
          </li>
            ))}
        </ul>
    );
};

const TransitionComponent = ({ view }) => {
    const enter = (el) => {
        TweenMax.fromTo(el, 1, {
            autoAlpha: 0,
            scale: 1.5,
        }, {
            autoAlpha: 1,
            scale: 1,
            transformOrigin: '50% 50%',
            ease: Power4.easeOut
        });
    };

    const leave = (el) => {
        TweenMax.fromTo(el, 1, {
            autoAlpha: 1,
            scale: 1,
        }, {
            autoAlpha: 0,
            scale: 0.8,
            ease: Power4.easeOut
        });
    };

    return (
        <div className={`page ${view}`} onMouseEnter={enter} onMouseLeave={leave}>
            <div className="center">
                {/* <h1 style={{ cursor: 'pointer' }}>{view}</h1> */}

            </div>
            <div>

            </div>
        </div>

    );
};

export default Translate;
