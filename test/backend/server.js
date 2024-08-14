// backend/server.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = 'your_secret_key'; // 在實際應用中，這應該是一個環境變量

// 模擬用戶數據庫
const users = [];

app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // 檢查用戶是否已存在
    if (users.find(user => user.username === username)) {
      return res.status(400).json({ message: '用戶已存在' });
    }

    // 加密密碼
    const hashedPassword = await bcrypt.hash(password, 10);

    // 儲存用戶
    users.push({
      username,
      password: hashedPassword
    });

    res.status(201).json({ message: '用戶註冊成功' });
  } catch (error) {
    res.status(500).json({ message: '服務器錯誤' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 查找用戶
    const user = users.find(user => user.username === username);
    if (!user) {
      return res.status(400).json({ message: '用戶不存在' });
    }

    // 驗證密碼
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: '密碼錯誤' });
    }

    // 創建JWT
    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: '服務器錯誤' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`服務器運行在端口 ${PORT}`));