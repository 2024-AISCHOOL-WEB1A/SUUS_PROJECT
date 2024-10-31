import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const clientKey = 'test_ck_6bJXmgo28eD4KEO2LYYyrLAnGKWx'; // 실제 클라이언트 키

const Payment = () => {
    const [tossPayments, setTossPayments] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://js.tosspayments.com/v1/payment";
        script.async = true;

        script.onload = () => {
            const payments = window.TossPayments(clientKey);
            setTossPayments(payments);
        };

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const successUrl = `${window.location.origin}/success`;
    const failUrl = `${window.location.origin}/fail`;

    const handleBilling = (method) => {
        const requestJson = {
            customerKey: uuidv4(), // 고유한 customerKey 생성
            successUrl: successUrl,
            failUrl: failUrl
        };

        if (tossPayments) {
            tossPayments.requestBillingAuth(method, requestJson)
                .then(() => {
                    navigate("/success"); // 결제 성공 시 리디렉션
                })
                .catch((error) => {
                    if (error.code === "USER_CANCEL") {
                        alert('유저가 취소했습니다.');
                    } else {
                        alert(error.message);
                    }
                    navigate("/fail"); // 결제 실패 시 리디렉션
                });
        } else {
            alert("TossPayments가 아직 로드되지 않았습니다.");
        }
    };

    return (
        <div>
            <h1>결제하기</h1>
            <button onClick={() => handleBilling('카드')} className="button is-link">
                자동결제
            </button>
        </div>
    );
};

export default Payment;
