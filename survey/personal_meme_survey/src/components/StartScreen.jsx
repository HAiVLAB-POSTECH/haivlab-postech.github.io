import React from 'react';

function StartScreen({ onStart, userId, setUserId }) {
  // userId와 setUserId는 App.jsx에서 useState로 관리한다고 가정합니다.
  // 예: const [userId, setUserId] = useState('');

  // 입력 변경 시 App.jsx의 userId state를 업데이트
  const handleChange = (e) => {
    setUserId(e.target.value);
  };

  // ID 입력란이 비어있으면 버튼 비활성화
  const isButtonDisabled = !userId.trim();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Drawing Bounding Box in Graph</h1>
      <p style={{ margin: '20px 0', fontSize: '16px', color: '#555' }}>
        - Draw a Bounding Box around the area catches your attention by mouse dragging<br />
        - You should draw a Box to move for the next graph image<br />
        - If you drew the box incorrectly, you can redraw it to overwrite the previous one
      </p>
      <h2>What is your Prolific ID?</h2>
      {/* ID 입력받는 Text Input */}
      <input
        type="text"
        value={userId}
        onChange={handleChange}
        placeholder="Enter your Prolific ID"
        style={{ padding: '8px', fontSize: '14px', marginBottom: '10px' }}
      />
      
      <button disabled={isButtonDisabled} onClick={onStart} style={{ marginLeft: '12px' }}>
        Start
      </button>
    </div>
  );
}

export default StartScreen;
