import React, { useState } from 'react';
import '../css/card.css'; // 올바른 경로 확인 필요

function CreditCardForm() {
  const [cardNumber, setCardNumber] = useState('');
  const [cardMonth, setCardMonth] = useState('');
  const [cardYear, setCardYear] = useState('');
  const [residentFront, setResidentFront] = useState('');
  const [residentBack, setResidentBack] = useState('');
  const [isCardNumberFocused, setIsCardNumberFocused] = useState(false);

  const cardBackground = '/imgs/카드.png'; // public 폴더에 저장된 이미지 경로 설정

  const handleCardNumberChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 16) {
      setCardNumber(value);
    }
  };

  const handleCardMonthChange = (e) => {
    if (e.target.value.length <= 2 && /^\d*$/.test(e.target.value)) {
      setCardMonth(e.target.value);
    }
  };

  const handleCardYearChange = (e) => {
    if (e.target.value.length <= 4 && /^\d*$/.test(e.target.value)) {
      setCardYear(e.target.value);
    }
  };

  const handleResidentFrontChange = (e) => {
    setResidentFront(e.target.value);
  };

  const handleResidentBackChange = (e) => {
    if (e.target.value.length <= 1) {
      setResidentBack(e.target.value);
    }
  };

  return (
    <div className="wrapper2">
      <div className="card-form">
        <div className="card-item" style={{ backgroundImage: `url(${cardBackground})` }}>
          <div className="card-item__side -front">
            <div className="card-item__wrapper">
              <div className={`card-number-container ${isCardNumberFocused ? 'focused' : ''}`}>
                <div className="card-item__number">
                  {cardNumber ? cardNumber : '#### #### #### ####'}
                </div>
              </div>
              <div className="card-item__date">
                <span>{cardMonth ? cardMonth : 'MM'}</span> / <span>{cardYear ? cardYear : 'YY'}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="card-form__inner">
          <div className="card-input">
            <label className="card-input__label">Card Number</label>
            <input
              type="text"
              className="card-input__input"
              value={cardNumber}
              onFocus={() => setIsCardNumberFocused(true)}
              onBlur={() => setIsCardNumberFocused(false)}
              onChange={handleCardNumberChange}
              placeholder="Card Number"
              maxLength="16"
            />
          </div>
          <div className="card-form__row">
            <div className="card-form__col">
              <label className="card-input__label">Expiration Month</label>
              <input
                type="text"
                className="card-input__input"
                value={cardMonth}
                onChange={handleCardMonthChange}
                placeholder="MM"
                maxLength="2"
              />
            </div>
            <div className="card-form__col">
              <label className="card-input__label">Expiration Year</label>
              <input
                type="text"
                className="card-input__input"
                value={cardYear}
                onChange={handleCardYearChange}
                placeholder="YY"
                maxLength="2"
              />
            </div>
          </div>
          <div className="card-input">
            <label className="card-input__label">주민등록번호</label>
            <div className="resident-number-wrapper" style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="text"
                className="card-input__input resident-number-front"
                value={residentFront}
                onChange={handleResidentFrontChange}
                placeholder="앞 7자리"
                maxLength="7"
                style={{ marginRight: '5px' }}
              />
              <span>-</span>
              <input
                type="text"
                className="card-input__input resident-number-back"
                value={residentBack}
                onChange={handleResidentBackChange}
                placeholder=""
                maxLength="1"
                style={{ width: '30px', marginLeft: '5px' }}
              />
              <span className="masked-back">******</span>
            </div>
          </div>
          <button className="card-form__button">Submit</button>
        </div>
      </div>
    </div>
  );
}

export default CreditCardForm;
