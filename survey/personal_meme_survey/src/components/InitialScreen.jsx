import React from 'react';

function InitialScreen({ onStartA, onStartB, userId, setUserId, knownPeriod, setKnownPeriod }) {
  const isButtonDisabled =
      userId.trim() == "" || knownPeriod == "";

  // 입력 변경 시 App.jsx의 userId state를 업데이트
  const handleChange = (e) => {
    // 숫자만 허용
    const onlyDigits = e.target.value.replace(/\D/g, '');
    setUserId(onlyDigits);
  };

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

      {/* ... (rest of the commented-out code) ... */}

      <p style={{ fontSize: '16px', color: '#555', backgroundColor: '#f0f8ff', padding: '10px', borderRadius: '5px', marginTop: '20px' }}>
        By continuing, you confirm that you have read and agree to the participation and compensation policies.
      </p>
      
      <h2>실험자 번호를 입력하세요</h2>
      {/* ID 입력받는 Text Input */}
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={userId}
        onChange={handleChange}
        placeholder="실험자 번호를 입력하세요"
        style={{ padding: '8px', fontSize: '14px', marginBottom: '10px' }}
      />

      {/* Known period */}
      <div style={{ marginTop: "20px", color: "#555" }}>
          <p>Q. 상대방과 알고 지낸 기간은 얼마나 되었나요?</p>
          {[
              "6개월 미만",
              "6개월 이상 1년 미만",
              "1년 이상 2년 미만",
              "2년 이상 5년 미만",
              "5년 이상"
          ].map((option) => (
              <div key={option} style={{ marginBottom: "8px" }}>
                <label>
                    <input
                        type="radio"
                        name="knownPeriod"
                        value={option}
                        checked={knownPeriod === option}
                        onChange={() => setKnownPeriod(option)}
                    />{" "}
                    {option}
                </label>
              </div>
          ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px', paddingBottom: '50px' }}>
        <button
          disabled={isButtonDisabled}
          onClick={onStartA}
          style={{
            fontSize: '18px',
            padding: '14px 32px',
            margin: '0 10px',
            border: '2px solid #007bff',
            borderRadius: '8px',
            backgroundColor: isButtonDisabled ? '#e0e0e0' : '#007bff',
            color: isButtonDisabled ? '#888' : '#fff',
            cursor: isButtonDisabled ? 'not-allowed' : 'pointer',
            transition: 'background 0.2s, color 0.2s',
          }}
        >
          테스트 A - 자유 대화 시작
        </button>
        <button
          disabled={isButtonDisabled}
          onClick={onStartB}
          style={{
            fontSize: '18px',
            padding: '14px 32px',
            margin: '0 10px',
            border: '2px solid #28a745',
            borderRadius: '8px',
            backgroundColor: isButtonDisabled ? '#e0e0e0' : '#28a745',
            color: isButtonDisabled ? '#888' : '#fff',
            cursor: isButtonDisabled ? 'not-allowed' : 'pointer',
            transition: 'background 0.2s, color 0.2s',
          }}
        >
          테스트 B - 감정 평가 시작
        </button>
      </div>
    </div>
  );
}

export default InitialScreen;
