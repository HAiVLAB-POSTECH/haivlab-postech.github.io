import React from 'react';

function EndScreen({ sendData }) {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>테스트가 종료 되었습니다.</h2>
      <div style={{ textAlign: "center", marginTop: "30px", marginBottom: "50px", paddingBottom: "50px" }}>
          <button
              onClick={sendData}
          >
          데이터 전송 및 초기 화면으로 돌아가기
          </button>
      </div>
    </div>
  );
}

export default EndScreen;
