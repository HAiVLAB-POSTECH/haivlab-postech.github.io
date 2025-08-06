import './App.css';
import React, { useState, useEffect, useMemo } from 'react';
import InitialScreen from './components/InitialScreen';
import StudyAFreeChatScreen from './components/StudyAFreeChatScreen';
import StudyAPostChatScreen from './components/StudyAPostChatScreen';
import StudyBEmotionRatingScreen from './components/StudyBEmotionRatingScreen';
import StudyBReceiverScreen from './components/StudyBReceiverScreen';
import StudyBSenderScreen from './components/StudyBSenderScreen';

function App() {

  // 화면 전환 Main Study
  const [screen, setScreen] = useState('initial');  
  // initial, study_a_free_chat, study_a_post_chat, study_b_emotion_rating, study_b_receiver, study_b_sender, end  -- start는 제외

  // 데모 설문 데이터 (DemoGraphicSurveyScreen에서 입력한 내용)
  const [demoData, setDemoData] = useState(null);

  // 어노테이션 데이터
  const [annotationData, setAnnotationData] = useState([]);

  // 이미지
  const [imagesToAnnotate, setImagesToAnnotate] = useState([]);
  const [imagesForExamples, setImagesForExamples] = useState([]);

  const [isSending, setIsSending] = useState(false);
  const [userId, setUserId] = useState('');
  const [knownPeriod, setKnownPeriod] = useState('');

  // 6개 이미지 정보 서버로부터 받기
  const [sixImages, setSixImages] = useState(null);
  const [error, setError] = useState(null);
  const [isFetchingImages, setIsFetchingImages] = useState(false);

  // 실제 실험용 이미지
  const images = import.meta.glob('/src/assets/images/*.{png,jpg,jpeg,svg}', {
    eager: true,
  });
  // 튜토리얼용 예시 이미지
  const exampleImages = import.meta.glob('/src/assets/examples/*.{png,jpg,jpeg,svg}', {
    eager: true,
  });

  const imageMap = Object.keys(images).reduce((acc, key) => {
    const parts = key.split('/');
    const filename = parts[parts.length - 1]; // 예: "1.20240217_WOT430_1.png"
    const baseName = filename.substring(0, filename.lastIndexOf('.')); // 예: "1.20240217_WOT430_1"
    acc[baseName] = images[key].default;
    return acc;
  }, {});

  const wholeImages = Object.values(images).map((module) => module.default);

  // 튜토리얼 예시 이미지를 파일명으로 정렬
  const sortedExampleImages = Object.keys(exampleImages)
    .sort()
    .map((key) => exampleImages[key].default);

  const getShuffledImages = (whole) => {
    return [...whole].sort(() => Math.random() - 0.5); // 배열을 무작위로 섞음
  }

  // 서버로부터 6개 이미지 정보 받기
  async function fetchSixImages() {
    try {
      setIsFetchingImages(true);  
      const response = await fetch(WEB_APP_URL_MAIN_STUDY, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        // 서버에서 POST 요청 구분 가능하게 request type 지정
        body: JSON.stringify({
          requestType: "getSixImages"
        })
      });

      const data = await response.json();

      if (data.status === 'success') {
        // data.images에는 [{ imageName, type }, ...] 형식으로 6개(혹은 그 이하)의 이미지 정보가 있음
        setSixImages(data.images);
        console.log('Fetched images:', data);
      } else if (data.status === 'done') {
        setError("더 이상 보여줄 이미지가 없습니다.");
      } else if (data.error) {
        setError(data.error);
      } else {
        setError("알 수 없는 에러가 발생했습니다.");
      }
    } catch (err) {
      console.error('Error fetching images:', err);
      setError("서버 요청 에러");
    } finally {
      setIsFetchingImages(false);
    }
  }

  useEffect(() => {
    if (wholeImages.length > 0) {
      setImagesToAnnotate(getShuffledImages(wholeImages)); // 무작위 섞은 이미지 배열 설정
    }
    setImagesForExamples(sortedExampleImages);

    if (screen === 'demographic_survey') {
      fetchSixImages();
    }
    
  }, [screen]);

  // const IMAGE_BASE_URL = '/personal_meme_survey/src/assets/images/';
  const IMAGE_BASE_URL = import.meta.env.BASE_URL + 'assets/';
  const mainStudyImages = useMemo(() => {
    if (sixImages && Array.isArray(sixImages) && sixImages.length > 0) {
      const list = sixImages
        .map((img) => {
          // 서버의 sixImages의 imageName은 확장자 없이 전달된다고 가정합니다.
          // imageMap에서 실제 URL을 lookup합니다.
          // return imageMap[img.imageName] || '';
          return imageMap[img.imageName + '_' +  img.type] || '';
          // 나중에 필요시, img.imageName + img.type + ".png" 등으로 수정할 수 있습니다.
        })
        .filter((url) => url !== '');
      return list.sort(() => Math.random() - 0.5);
    }
    // sixImages가 없으면 기본 이미지 배열(imagesToAnnotate)을 사용
    return imagesToAnnotate;
  }, [sixImages, imagesToAnnotate]);

  // 구글 Apps Script URL
  const WEB_APP_URL =
    'https://script.google.com/macros/s/AKfycbyN50ItId7fBzUh9o3dmdePHUikxQOlT_qHZJiAKz14uUfpQnHCag0PGtInV65v8ODq/exec';

  const WEB_APP_URL_MAIN_STUDY =
    'https://script.google.com/macros/s/AKfycbzpRzIdfdmr-uah5K6FFAn6Pi-C3dsDB6KB-16bxk7IlykmyznQmWjbEckAQJBYGqUA/exec';

  // 화면 전환
  const startTestA = () => {
    window.scrollTo(0, 0);
    if (screen === 'initial') {
      setScreen('study_a_free_chat');
    }
  };
  const startTestB = () => {
    window.scrollTo(0, 0);
    if (screen === 'initial') {
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
      setScreen('study_a_free_chat');
      setFreeChatIndex(0);
    } else if (screen === 'study_a_free_chat') {
      setScreen('study_a_post_chat');
    } else if (screen === 'study_a_post_chat') {
      if (freeChatIndex === 0) {
        // 첫 번째 free chat 후 두 번째로 이동
        setFreeChatIndex(1);
        setScreen('study_a_free_chat');
      } else {
        // 두 번째 free chat 후 initial screen으로 이동
        setScreen('initial');
      }
    } else if (screen === 'study_b_emotion_rating') {
      setScreen('study_b_receiver');
    } else if (screen === 'study_b_receiver') {
      setScreen('study_b_sender');
    } else if (screen === 'study_b_sender') {
      setScreen('end');
    }
  };

  // 어노테이션 종료 시 구글 시트 전송
  const handleFinish = async (finalData) => {
    setIsSending(true);

    const browserInfo = {
      userAgent: navigator.userAgent,
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
    };

    finalData = {
      demoData,
      browserInfo,
      ...finalData
    };

    const formBody = new URLSearchParams();
    // 실제로는 userId, demoData, annotationData를 각각 따로 append해도 되지만
    // 한 번에 객체 전체를 JSON으로 stringify해서 전송해도 문제없음
    console.log('demoData:', demoData);

    formBody.append('userId', demoData.prolificId);
    formBody.append('annotationData', JSON.stringify(finalData));

    try {
      const response = await fetch(WEB_APP_URL, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: formBody.toString(),
      });

      const result = await response.json();
      console.log('Google Script response:', result);

      setIsSending(false);
      setScreen('end');
    } catch (err) {
      console.error('Error sending data to Google Sheets:', err);
      alert('Failed to send data.');
      setIsSending(false);
    }
  };


  const handleFinishMainStudy = async (finalData) => {
    setIsSending(true);

    const browserInfo = {
      userAgent: navigator.userAgent,
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
    };

    finalData = {
      requestType: "updateImageCounts",
      demoData,
      browserInfo,
      sixImages,
      ...finalData,
    };

    const formBody = new URLSearchParams();
    // 실제로는 userId, demoData, annotationData를 각각 따로 append해도 되지만
    // 한 번에 객체 전체를 JSON으로 stringify해서 전송해도 문제없음
    console.log('demoData:', demoData);

    formBody.append('userId', demoData.prolificId);
    formBody.append('annotationData', JSON.stringify(finalData));

    const dataToSend = {
      requestType: "updateImageCounts",
      userId: demoData.prolificId,                // ⬅️ 따로 추출
      annotationData: finalData,                  // ⬅️ 실제 실험 결과
      demoData,                                   // 추가 정보
      browserInfo,                                // 브라우저 정보
      sixImages,                                  // 어떤 이미지 썼는지 (감소 대상)
    };

    try {
      const response = await fetch(WEB_APP_URL_MAIN_STUDY, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        // body: formBody.toString(),
        body: JSON.stringify(dataToSend),
      });
      

      const result = await response.json();

      // 응답의 status가 success가 아니면 에러를 발생시킵니다.
      if (result.status !== 'success') {
        throw new Error(result.message || '서버에서 에러가 발생했습니다.');
      }
      
      console.log('Google Script response:', result);

      setIsSending(false);
      setScreen('end');
    } catch (err) {
      console.error('Error sending data to Google Sheets:', err);
      alert('Failed to send data.');
      setIsSending(false);
    }
  }

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
          setDemoData={setDemoData}
          place={placeOrder[freeChatIndex]}
        />
      )}

      {screen === 'study_a_post_chat' && (
        <StudyAPostChatScreen
          onNext={changeScreen}
          setDemoData={setDemoData}
          place={placeOrder[freeChatIndex]}
        />
      )}

      {screen === 'study_b_emotion_rating' && (
        <StudyBEmotionRatingScreen
          onNext={changeScreen}
          setDemoData={setDemoData}
        />
      )}

      {screen === 'study_b_receiver' && (
        <StudyBReceiverScreen
          onNext={changeScreen}
          setDemoData={setDemoData}
        />
      )}

      {screen === 'study_b_sender' && (
        <StudyBSenderScreen
          onNext={changeScreen}
          setDemoData={setDemoData}
        />
      )}

      {/* {screen === 'annotate' && (
        <>
          {isSending && (
            <div style={{ textAlign: 'center', margin: '0 auto 20px' }}>
              <p>Sending Data Now...</p>
              <progress />
            </div>
          )}

          {!isSending && (
            <AnnotateScreen
              images={imagesToAnnotate}
              onFinish={handleFinish}
              annotationData={annotationData}
              setAnnotationData={setAnnotationData}
            />
          )}
        </>
      )} */}

      {screen === 'end' && <EndScreen />}
    </div>
  );
}

export default App;
