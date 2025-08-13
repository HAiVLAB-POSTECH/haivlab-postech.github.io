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
    'https://script.google.com/macros/s/AKfycbwBMYmbu39lvkhgB1kQY_teKuYWNeaVx90i7HU28eia-jviyv3AhGTcDLuPyS-HEjpV_g/exec';

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

  // Test A 세션 구성: userId % 4에 따라 { place, variant } 2개 세션 생성
  const sessions = useMemo(() => {
    const id = parseInt(userId, 10);
    if (!id || Number.isNaN(id)) {
      return [
        { place: '뉴욕', variant: 'orig' },
        { place: '파리', variant: 'orig' },
      ];
    }
    const mod = ((id - 1) % 4) + 1; // 1..4 반복
    switch (mod) {
      case 1: // 뉴욕(얼굴합성) -> 파리(원본)
        return [
          { place: '뉴욕', variant: 'swap' },
          { place: '파리', variant: 'orig' },
        ];
      case 2: // 뉴욕(원본) -> 파리(얼굴합성)
        return [
          { place: '뉴욕', variant: 'orig' },
          { place: '파리', variant: 'swap' },
        ];
      case 3: // 파리(얼굴합성) -> 뉴욕(원본)
        return [
          { place: '파리', variant: 'swap' },
          { place: '뉴욕', variant: 'orig' },
        ];
      case 4: // 파리(원본) -> 뉴욕(얼굴합성)
      default:
        return [
          { place: '파리', variant: 'orig' },
          { place: '뉴욕', variant: 'swap' },
        ];
    }
  }, [userId]);

  // Study B 메타데이터 로드
  const [stimuli, setStimuli] = useState(null);
  useEffect(() => {
    let isMounted = true;
    fetch('/survey/personal_meme_survey/study_b_stimuli.json')
      .then((res) => res.json())
      .then((data) => { if (isMounted) setStimuli(data); })
      .catch((err) => console.error('Failed to load stimuli json:', err));
    return () => { isMounted = false; };
  }, []);

  // 비시드 셔플(Fisher–Yates)
  function shuffle(array) {
    const result = array.slice();
    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  // userId 기반 세트 순서 + 비시드 셔플로 Study B 아이템 생성
  const studyBItems = useMemo(() => {
    const id = parseInt(userId, 10);
    if (!stimuli || !stimuli.sets || !id || Number.isNaN(id)) return [];

    // 요구 패턴: 1: ABDC, 2: BCAD, 3: CDBA, 4: DACB (4명 주기)
    // 구현: categories = [A,B,C,D], i=(id-1)%4
    // order = [i, i+1, i-1, i-2] mod 4
    const categories = ['A', 'B', 'C', 'D'];
    const i = (id - 1) % 4;
    const idxs = [i, (i + 1) % 4, (i + 3) % 4, (i + 2) % 4];
    const rotatedOrder = idxs.map((k) => categories[k]);

    console.log('[StudyB] userId=', id, 'i=', i, 'order=', rotatedOrder.join(''));

    const combined = [];
    for (const letter of rotatedOrder) {
      const items = stimuli.sets[letter] || [];
      const shuffled = shuffle(items); // 비시드 셔플
      combined.push(...shuffled.map((it) => ({ ...it, _set: letter })));
    }
    console.log('[StudyB] combined sets =', combined.map((x) => x._set).join(''));
    return combined; // [{id, text}, ...]
  }, [stimuli, userId]);

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
      // alert('Failed to send data.');
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
          place={sessions[freeChatIndex].place}
          variant={sessions[freeChatIndex].variant}
        />
      )}

      {screen === 'study_a_post_chat' && (
        <StudyAPostChatScreen
          onNext={changeScreen}
          freeChatData={freeChatData}
          setFreeChatData={setFreeChatData}
          place={sessions[freeChatIndex].place}
          variant={sessions[freeChatIndex].variant}
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
          items={studyBItems}
          userId={userId}
        />
      )}

      {screen === 'study_b_sender' && (
        <StudyBSenderScreen
          onNext={changeScreen}
          emotionData={emotionData}
          setEmotionData={setEmotionData}
          items={studyBItems}
          userId={userId}
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
