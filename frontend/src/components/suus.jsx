import React, { useState } from 'react';
import '../css/suus.css'; // 스타일을 적용하기 위한 CSS 파일

const Translate = () => {
  const [menuActive, setMenuActive] = useState(false); // 메뉴 활성화 상태 관리
  const [menuHiding, setMenuHiding] = useState(false); // 메뉴가 숨기는 중인지 관리
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달창 상태 관리

  // 모달창 열기/닫기
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <img src='/imgs/주석.png' alt='주석'></img>
      {/* 버튼 클릭 시 메뉴 상태 토글 */}
      <button className={`round ${menuActive ? 'active' : ''}`} onClick={openModal}>
      <span className="button-text">Start</span>
      </button>

      {/* 모달 창 */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            {/* 상단 부분 */}
            <div className="modal-header">
              <h2> Hand Sign Translator</h2>
              <span className="close" onClick={closeModal}>&times;</span>
              
            </div>
            {/* 하단 부분 */}
            <div className="modal-body">
              <p>This is the lower body content of the modal.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Translate;
