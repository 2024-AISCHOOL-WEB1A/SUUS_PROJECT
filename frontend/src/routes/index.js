// backend/app.js (또는 index.js)
const express = require('express');
const indexRouter = require('../routes/index.js'); // 라우터 파일 불러오기

const app = express();

app.use(express.json()); // JSON 요청 본문을 파싱

// '/api' 프리픽스를 추가하여 indexRouter를 사용
app.use('/api', indexRouter);

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});

module.exports = app;
