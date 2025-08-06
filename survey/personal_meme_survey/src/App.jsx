import './App.css';
import React, { useState, useEffect, useMemo } from 'react';
import InitialScreen from './components/InitialScreen';
import EndScreen from './components/EndScreen';
import StudyAFreeChatScreen from './components/StudyAFreeChatScreen';
import StudyAPostChatScreen from './components/StudyAPostChatScreen';
import StudyBEmotionRatingScreen from './components/StudyBEmotionRatingScreen';
import StudyBReceiverScreen from './components/StudyBReceiverScreen';
import StudyBSenderScreen from './components/StudyBSenderScreen';

function App() {

  // 화면 전환 Main Study
  const [screen, setScreen] = useState('initial');  
  // initial, study_a_free_chat, study_a_post_chat, study_b_emotion_rating, study_b_receiver, study_b_sender, end  -- start는 제외

  // 테스트 A 자유 채팅 데이터
  const [freeChatData, setFreeChatData] = useState(null);

  // 테스트 B 감정 평가 데이터
  const [emotionData, setEmotionData] = useState(null);

  // 참여자 정보
  const [userId, setUserId] = useState('');
  const [knownPeriod, setKnownPeriod] = useState('');

  const [isSending, setIsSending] = useState(false);

  // 구글 Apps Script URL
  const WEB_APP_URL =
    'https://script.google.com/macros/s/AKfycbxG_-wOO0gB9Su1trS3KGpVlfmV2gG2oPyqQzOvR7gZ8MC9SXbICgvtJ0eXT50TZXU4fA/exec';

  // 화면 전환
  const startTestA = () => {
    window.scrollTo(0, 0);
    setFreeChatIndex(0);
    if (screen === 'initial') {
      setFreeChatData({});   // 초기화
      setEmotionData({});    // 초기화
      setScreen('study_a_free_chat');
    }
  };
  const startTestB = () => {
    window.scrollTo(0, 0);
    if (screen === 'initial') {
      setFreeChatData({});   // 초기화
      setEmotionData({});    // 초기화
      setScreen('study_b_emotion_rating');
    }
  };

  // place 순서 관리: userId가 짝수면 [뉴욕, 파리], 홀수면 [파리, 뉴욕]
  const placeOrder = useMemo(() => {
    if (!userId) return ['뉴욕', '파리'];
    const lastChar = userId.slice(-1);
    if (!isNaN(lastChar)) {
      return parseInt(lastChar) % 2 === 0 ? ['뉴욕', '파리'] : ['파리', '뉴욕'];
    }
    return ['뉴욕', '파리'];
  }, [userId]);

  // study_a_free_chat의 진행 횟수 관리
  const [freeChatIndex, setFreeChatIndex] = useState(0);

  // 화면 전환 함수 수정
  const changeScreen = () => {
    window.scrollTo(0, 0);

    if (screen === 'initial') {
      setFreeChatIndex(0);
      setScreen('study_a_free_chat');
    } else if (screen === 'study_a_free_chat') {
      setScreen('study_a_post_chat');
    } else if (screen === 'study_a_post_chat') {
      if (freeChatIndex === 0) {
        // 첫 번째 free chat 후 두 번째로 이동
        setFreeChatIndex(1);
        setScreen('study_a_free_chat');
      } else {
        // 두 번째 free chat 후 end screen으로 이동
        setScreen('end');
      }
    } else if (screen === 'study_b_emotion_rating') {
      setScreen('study_b_receiver');
    } else if (screen === 'study_b_receiver') {
      setScreen('study_b_sender');
    } else if (screen === 'study_b_sender') {
      setScreen('end');
    } else if (screen === 'end') {
      setScreen('initial');
    }
  };

  // 테스트 종료 시 구글 시트 전송
  const sendData = async (finalData) => {
    setIsSending(true);

    const browserInfo = {
      userAgent: navigator.userAgent,
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
    };

    const formBody = new URLSearchParams();
    // 실제로는 userId, freeChatData, annotationData를 각각 따로 append해도 되지만
    // 한 번에 객체 전체를 JSON으로 stringify해서 전송해도 문제없음
    console.log('userId:', userId);
    console.log('knownPeriod:', knownPeriod);
    console.log('freeChatData:', freeChatData);
    console.log('emotionData:', emotionData);

    formBody.append('userId', userId);
    formBody.append('knownPeriod', knownPeriod);
    formBody.append('freeChatData', JSON.stringify(freeChatData));
    formBody.append('emotionData', JSON.stringify(emotionData));

    try {
      const response = await fetch(WEB_APP_URL, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: formBody.toString(),
      });

      const text = await response.text();
      console.log('Google Script response text:', text);
      const result = JSON.parse(text);  // 수동으로 파싱
      console.log('Google Script response:', result);

      setIsSending(false);
      setScreen('initial'); // 데이터 전송 후 초기 화면으로 돌아감

    } catch (err) {
      if (err instanceof TypeError) {
        console.error("Likely a CORS or network error:", err.message);
      } else {
        console.error("Unknown error:", err);
      }
      alert('Failed to send data.');
      setIsSending(false);
      setScreen('initial');
    }
  };

  return (
    <div className="app-container">
      {screen === 'initial' && (
        <InitialScreen
          onStartA={startTestA}
          onStartB={startTestB}
          userId={userId}
          setUserId={setUserId}
          knownPeriod={knownPeriod}
          setKnownPeriod={setKnownPeriod}
        />
      )}

      {screen === 'study_a_free_chat' && (
        <StudyAFreeChatScreen
          onNext={changeScreen}
          freeChatData={freeChatData}
          setFreeChatData={setFreeChatData}
          place={placeOrder[freeChatIndex]}
        />
      )}

      {screen === 'study_a_post_chat' && (
        <StudyAPostChatScreen
          onNext={changeScreen}
          freeChatData={freeChatData}
          setFreeChatData={setFreeChatData}
          place={placeOrder[freeChatIndex]}
        />
      )}

      {screen === 'study_b_emotion_rating' && (
        <StudyBEmotionRatingScreen
          onNext={changeScreen}
        />
      )}

      {screen === 'study_b_receiver' && (
        <StudyBReceiverScreen
          onNext={changeScreen}
          emotionData={emotionData}
          setEmotionData={setEmotionData}
        />
      )}

      {screen === 'study_b_sender' && (
        <StudyBSenderScreen
          onNext={changeScreen}
          emotionData={emotionData}
          setEmotionData={setEmotionData}
        />
      )}

      {screen === 'end' && (
        <div style={{ textAlign: 'center', margin: '0 auto 20px' }}>
          {isSending ? (
            <>
              <p>Sending Data Now...</p>
              <progress />
            </>
          ) : (
            <EndScreen sendData={sendData} />
          )}
        </div>
      )}

    </div>
  );
}

export default App;
