import React from 'react';

function InitialScreen({ onStart, userId, setUserId }) {
  // 입력 변경 시 App.jsx의 userId state를 업데이트
  const handleChange = (e) => {
    setUserId(e.target.value);
  };

  // ID 입력란이 비어있으면 버튼 비활성화
  const isButtonDisabled = !userId.trim();

  return (
    <div
      style={{
        maxWidth: '800px',
        height: '100%',
        marginTop: '30px',
        fontFamily: 'Arial, sans-serif',
        lineHeight: '1.6',
        textAlign: 'left',
        // backgroundColor: '#f0f8ff',
      }}
    >
      <h1 style={{ textAlign: 'left', color: '#333', borderBottom: '2px solid #ddd', paddingBottom: '10px' }}>
        📢 설문지
      </h1>

      {/* <h3 style={{ color: '#333', marginTop: '20px' }}>✅ Device Requirement:</h3>
      <ul style={{ paddingLeft: '20px', color: '#555' }}>
        <li>You must use a desktop or laptop computer.</li>
        <li>Smartphones, tablets, and other mobile devices are <strong>NOT</strong> allowed.</li>
        <li>We will collect your device type (e.g., product name, operating system, screen size).</li>
        <li>Unauthorized devices will not receive compensation.</li>
        <li>Screen size must be fixed during the survey. Do not resize the window, zoom in or out, or change your screen settings while participating.</li>
      </ul>

      <h3 style={{ color: '#333', marginTop: '20px' }}>✅ Response Requirement:</h3>
      <p style={{ fontSize: '16px', color: '#555', backgroundColor: '#f8f8f8', padding: '10px', borderRadius: '5px' }}>
        Your open-ended response must be at least <strong>50 characters</strong> long.
      </p>

      <h2 style={{ color: '#222', marginTop: '30px', borderBottom: '2px solid #ddd', paddingBottom: '10px' }}>
        ⚠️ CAUTION: Rules & Compensation Policy
      </h2>

      <h3 style={{ color: '#c00', marginTop: '20px' }}>🚫 Prohibited Actions:</h3>
      <ul style={{ paddingLeft: '20px', color: '#555' }}>
        <li>Using the <strong>Back</strong> or <strong>Refresh</strong> buttons in your browser.</li>
        <li>Opening a new tab or window.</li>
        <li>Using an unauthorized device (e.g., smartphone, tablet).</li>
        <li>Resizing your screen or changing display settings during the survey.</li>
        <li>Quitting the survey before completing all tasks. (If you exit early, your responses will not be collected, and you will not receive compensation.)</li>
      </ul> */}

      {/* <h3 style={{ color: '#228B22', marginTop: '20px' }}>💰 Compensation Policy</h3>

      <h4 style={{ color: '#d9534f' }}>🔴 No Compensation if:</h4>
      <ul style={{ paddingLeft: '20px', color: '#555' }}>
        <li>You violate any prohibited actions listed above.</li>
      </ul>

      <h4 style={{ color: '#f0ad4e' }}>🟠 Partial / Prorated Compensation if:</h4>
      <ul style={{ paddingLeft: '20px', color: '#555' }}>
        <li>You remain idle for too long.</li>
        <li>Your response contains non-English characters.</li>
        <li>You submit inappropriate responses (e.g., random characters, irrelevant text).</li>
      </ul>

      <h4 style={{ color: '#5cb85c' }}>🟢 Full Compensation if:</h4>
      <ul style={{ paddingLeft: '20px', color: '#555' }}>
        <li>You complete all tasks without violating any rules above.</li>
      </ul> */}

      <p style={{ fontSize: '16px', color: '#555', backgroundColor: '#f0f8ff', padding: '10px', borderRadius: '5px', marginTop: '20px' }}>
        By continuing, you confirm that you have read and agree to the participation and compensation policies.
      </p>
      
      <h2>실험자 번호를 입력하세요</h2>
      {/* ID 입력받는 Text Input */}
      <input
        type="text"
        value={userId}
        onChange={handleChange}
        placeholder="실험자 번호를 입력하세요"
        style={{ padding: '8px', fontSize: '14px', marginBottom: '10px' }}
      />

      <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '50px', paddingBottom: '50px' }}>
        <button disabled={isButtonDisabled} onClick={onStart}>
          입력 및 테스트 시작
        </button>
      </div>
    </div>
  );
}

export default InitialScreen;
