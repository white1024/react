// components/MainContent.js
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import AddNote from './AddNote';

function MainContent({ currentPage }) {
  const { user, userData, setUserData, deleteUser } = useAuth();
  const [isLogin, setIsLogin] = React.useState(true);

  const handleDeleteUser = async () => {
    if (window.confirm('確定要刪除您的帳戶嗎？此操作不可逆。')) {
      try {
        await deleteUser();
        alert('帳戶已成功刪除');
      } catch (error) {
        alert(error.message || '刪除帳戶失敗');
      }
    }
  };

  if (!user) {
    return (
      <div>
        {isLogin ? <LoginForm /> : <RegisterForm />}
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? '註冊新帳號' : '返回登入'}
        </button>
      </div>
    );
  }

  const renderContent = () => {
    switch(currentPage) {
      case 'dashboard':
        return (
          <div>
            <h2>儀表板</h2>
            <h3>筆記</h3>
            <ul>
              {userData?.notes.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
            <h3>任務</h3>
            <ul>
              {userData?.tasks.map((task, index) => (
                <li key={index}>{task}</li>
              ))}
            </ul>
          </div>
        );
      case 'profile':
        return (
          <div>
            <h2>個人資料</h2>
            <button onClick={handleDeleteUser} style={{ backgroundColor: 'red', color: 'white' }}>
              刪除帳戶
            </button>
          </div>
        );
      case 'finance':
        return (
          <AddNote />
        )
      default:
        return <h2>歡迎使用個人紀錄系統</h2>;
    }
  };

  return (
    <main>
      {renderContent()}
    </main>
  );
}

export default MainContent;