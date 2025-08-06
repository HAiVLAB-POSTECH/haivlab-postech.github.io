import React, { useState, useEffect } from 'react';

function MainStudyScreen({
  images,
  onFinish,
  annotationData,
  setAnnotationData,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [keyInsights, setKeyInsights] = useState('');
  const [graphQuestions, setGraphQuestions] = useState('');
  const [imgSize, setImgSize] = useState({ width: 'auto', height: 'auto' });

  // 이미지가 바뀔 때마다 image_up_timestamp 업데이트
  useEffect(() => {
    if (!images || !images[currentIndex]) return;
    const currentImgSrc = images[currentIndex];
    const now = Date.now();
    setAnnotationData((prev) => {
      const exist = prev.find((anno) => anno.imgSrc === currentImgSrc);
      if (exist && !exist.image_up_timestamp) {
        return prev.map((anno) => {
          if (anno.imgSrc === currentImgSrc) {
            return { ...anno, image_up_timestamp: now };
          }
          return anno;
        });
      } else if (!exist) {
        return [
          ...prev,
          {
            imgSrc: currentImgSrc,
            keyInsights: '',
            graphQuestions: '',
            image_up_timestamp: now,
          },
        ];
      }
      return prev;
    });
  }, [currentIndex, images, setAnnotationData]);

  // Next 버튼 클릭 시 두 텍스트 입력 데이터를 annotationData에 저장
  const handleNextImage = () => {
    window.scrollTo(0, 0);
    const currentImgSrc = images[currentIndex];
    const now = Date.now();
    const newAnnotationData = (() => {
      const cloned = [...annotationData];
      const index = cloned.findIndex((anno) => anno.imgSrc === currentImgSrc);
      if (index !== -1) {
        cloned[index] = {
          ...cloned[index],
          keyInsights,
          graphQuestions,
          next_button_timestamp: now,
        };
      } else {
        cloned.push({
          imgSrc: currentImgSrc,
          keyInsights,
          graphQuestions,
          next_button_timestamp: now,
        });
      }
      return cloned;
    })();
    setAnnotationData(newAnnotationData);
    setKeyInsights('');
    setGraphQuestions('');
    if (currentIndex === images.length - 1) {
      onFinish(newAnnotationData);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const currentImgSrc = images[currentIndex];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '30px',
        fontFamily: 'Arial, sans-serif',
        color: '#555',
      }}
    >
      {/* 상단 텍스트 영역 (이미지 바로 위) */}
      <div
        style={{
          textAlign: 'left',
          marginBottom: '10px',
          width: imgSize.width,
          // width: '100%',
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
        }}
      >
        {/* <p style={{ margin: 0, fontWeight: 'bold' }}>Training Session</p> */}
        <p style={{ margin: 0, fontWeight: 'bold' }}>Look at the chart and answer the following questions ({currentIndex + 1} / {images.length})</p>
      </div>

      {/* 이미지 영역 (원본 크기로 표시) */}
      <div style={{ marginBottom: '20px' }}>
        <img
          src={currentImgSrc}
          alt={`img-${currentIndex}`}
          style={{
            width: imgSize.width,
            height: imgSize.height,
            userSelect: 'none',
            pointerEvents: 'none',
            border: "1px solid black", borderRadius: "8px" 
          }}
          onLoad={(e) => setImgSize({
            width: e.target.naturalWidth,
            height: e.target.naturalHeight,
          })}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
        />
      </div>
      
      {/* showing text */}
      <div
        style={{
          textAlign: 'left',
          marginBottom: '10px',
          width: imgSize.width,
          // width: '100%',
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
        }}
      >
        <p style={{ margin: 0, fontStyle: 'italic', fontWeight:'bold'}}>Please write at least 50 characters for each answer.</p>
      </div>
      

      {/* 텍스트 입력 영역 1 */}
      <div style={{ width: imgSize.width, marginBottom: '20px', textAlign: 'left' }}>
        <label
          htmlFor="keyInsights"
          style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}
        >
          What key insights do you take away from this graph?
        </label>
        <textarea
          id="keyInsights"
          style={{
            width: '100%',
            height: '100px',
            fontSize: '14px',
            padding: '8px',
            resize: 'none',
            boxSizing: 'border-box',
          }}
          value={keyInsights}
          onChange={(e) => setKeyInsights(e.target.value)}
        />
      </div>

      {/* 텍스트 입력 영역 2 */}
      <div style={{ width: imgSize.width, marginBottom: '20px', textAlign: 'left' }}>
        <label
          htmlFor="graphQuestions"
          style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}
        >
          What questions can this graph help answer?
        </label>
        <textarea
          id="graphQuestions"
          style={{
            width: '100%',
            height: '100px',
            fontSize: '14px',
            padding: '8px',
            resize: 'none',
            boxSizing: 'border-box',
          }}
          value={graphQuestions}
          onChange={(e) => setGraphQuestions(e.target.value)}
        />
      </div>

      {/* Next / Finish 버튼 */}
      <button
        style={{
          padding: '12px 24px',
          fontSize: currentIndex === images.length - 1 ? '18px' : '16px',
          fontWeight: 'bold',
          backgroundColor: currentIndex === images.length - 1 ? '#28a745' : '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: keyInsights === '' || graphQuestions === '' ? 'not-allowed' : 'pointer',
          opacity: keyInsights === '' || graphQuestions === '' ? 0.5 : 1,
          transition: 'background-color 0.3s ease, transform 0.2s ease',
          marginBottom: '30px',
        }}
        onClick={handleNextImage}
        disabled={keyInsights === '' || graphQuestions === ''}
        onMouseEnter={(e) => {
          if (currentIndex === images.length - 1) {
            e.target.style.backgroundColor = '#218838';
          } else {
            e.target.style.backgroundColor = '#5a6268';
          }
        }}
        onMouseLeave={(e) => {
          if (currentIndex === images.length - 1) {
            e.target.style.backgroundColor = '#28a745';
          } else {
            e.target.style.backgroundColor = '#6c757d';
          }
        }}
      >
        {currentIndex === images.length - 1 ? 'Finish' : 'Next'}
      </button>
    </div>
  );
}

export default MainStudyScreen;
