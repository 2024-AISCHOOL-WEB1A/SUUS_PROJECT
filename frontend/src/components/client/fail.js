import React from 'react';
import { useLocation } from 'react-router-dom';

const Fail = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const message = params.get('message') || '결제에 실패했습니다.';
    const code = params.get('code');

    return (
        <div>
            <h1>결제 실패</h1>
            <p>실패 코드: {code}</p>
            <p>메시지: {message}</p>
        </div>
    );
};

export default Fail;
