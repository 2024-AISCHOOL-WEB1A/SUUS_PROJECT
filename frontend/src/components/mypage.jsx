import React, { useState, useEffect } from 'react';
import '../css/mypage.css';
import Pay from './pay'; 
import Person from '../components/person';

const Dashboard = () => {
    // 초기 렌더링 시 localStorage에서 저장된 프로필 이미지를 불러옴
    const [profileImage, setProfileImage] = useState(() => {
        return localStorage.getItem('profileImage') || './imgs/Group 73.png';
    });
    const [activeButton, setActiveButton] = useState('이용량');

    const handleButtonClick = (button) => {
        setActiveButton(button);
        console.log(`${button} 버튼이 클릭되었습니다`);
    };

    const handleImageChange = (imageUrl) => {
        setProfileImage(imageUrl); // 프로필 이미지를 업데이트
        localStorage.setItem('profileImage', imageUrl); // 변경된 이미지를 localStorage에 저장
    };

    const renderCardContent = () => {
        switch (activeButton) {
            case '이용량':
                return <Pay />;
            case '결제정보':
                return <div>결제 정보를 여기에 표시합니다.</div>;
            case '회원정보':
                return <Person onImageChange={handleImageChange} />; // AccountSetting에 이미지 변경 함수 전달
            default:
                return <div>내용이 없습니다.</div>;
        }
    };

    return (
        <div className="dashboard-wrapper">
            <aside className="sidebar">
                <div className="profile">
                    <img src={profileImage} alt="Profile" className="profile-pic" />
                    <h3>Varlam Mukt</h3>
                </div>
                <button 
                    className={`upgrade-btn ${activeButton === '이용량' ? 'active' : ''}`}
                    onClick={() => handleButtonClick('이용량')}
                >
                    이용량
                </button>
                <button 
                    className={`upgrade-btn ${activeButton === '결제정보' ? 'active' : ''}`}
                    onClick={() => handleButtonClick('결제정보')}
                >
                    결제정보
                </button>
                <button 
                    className={`upgrade-btn ${activeButton === '회원정보' ? 'active' : ''}`}
                    onClick={() => handleButtonClick('회원정보')}
                >
                    회원정보
                </button>
            </aside>

            <main className="content">
                <header className="content-header">
                    <h1>Hello, 정부24</h1>
                    <p>Good day to learn!</p>
                </header>
                
                <div className="card">
                   {renderCardContent()}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
