import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Success = () => {
    const [billingData, setBillingData] = useState(null);
    const location = useLocation();

    useEffect(() => {
        // URL에서 쿼리 파라미터 추출
        const params = new URLSearchParams(location.search);
        const authKey = params.get('authKey');
        const customerKey = params.get('customerKey');
    
        if (authKey && customerKey) {
            // 서버에 POST 요청을 보내 billingData를 가져옴
            fetch('/api/success', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ authKey, customerKey })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setBillingData(data))
            .catch(error => console.error('Error fetching billing data:', error));
        } else {
            console.error('Missing authKey or customerKey in URL');
        }
    }, [location.search]);
    
    return (
        <div>
            <h1>결제 성공</h1>
            {billingData ? (
                <div>
                    <p><strong>Billing Key:</strong> {billingData.billingKey}</p>
                    <p><strong>Customer Key:</strong> {billingData.customerKey}</p>
                    <p><strong>Card Type:</strong> {billingData.card.cardType}</p>
                    <p><strong>Card Number:</strong> {billingData.card.number}</p>
                </div>
            ) : (
                <p>빌링 데이터를 불러오는 중...</p>
            )}
        </div>
    );
};

export default Success;
