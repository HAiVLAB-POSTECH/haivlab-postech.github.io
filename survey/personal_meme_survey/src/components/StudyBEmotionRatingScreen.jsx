import React, { useState } from "react";
import valenceImage from '/src/assets/images/valence_example.png';
import arousalImage from '/src/assets/images/arousal_example.png';

function StudyBEmotionRatingScreen({ onNext }) {
   
    // "Next" 버튼 클릭 시 App으로 폼 데이터 전달
    const handleNext = () => {
        onNext(); 
    };

    const labelStyle = {
        display: "block",
        marginBottom: "5px",
        paddingLeft: "10px",
    };

    return (
        <div
            style={{
                width: "1000px",
                height: "100%",
                marginTop: "30px",
                fontFamily: "Arial, sans-serif",
                lineHeight: "1.6",
                textAlign: "left",
            }}
        >

            <h2 style={{ textAlign: 'left', color: '#333', borderBottom: '2px solid #ddd', paddingBottom: '10px' }}>
                gif 감정평가 설문지 (1/3) 튜토리얼
            </h2>
            <p style={{ fontSize: '16px', color: '#555' }}>
                본 설문에서는 제시되는 각 GIF 이미지에 대해, 여러분이 느낀 감정의 긍정/부정 정도, 감정의 강도, 그리고 표현력을 평가하게 됩니다.
                하나의 GIF를 보고, 여러분이 어떻게 느꼈는지를 세 가지 기준에 따라 응답해 주세요.
            </p>
            {/* <br/> */}

            {/* <h2 style={{ color: '#222', marginTop: '30px' }}>⚠️ Participation Restrictions</h2> */}
            <p style={{ fontSize: '16px', color: '#555', backgroundColor: '#f8f8f8', padding: '10px', borderRadius: '5px' }}>
                * Valence, Arousal, Expressiveness라는 세 가지 감정 평가 기준에 대한 설명은 아래에 안내되어 있으니, 이를 참고해 주시기 바랍니다.
            </p>
            
            <h3>1. Valence (쾌감 정도)</h3>
            <p style={{ fontSize: '16px', color: '#555', backgroundColor: '#f0f8ff', padding: '10px', borderRadius: '5px', marginTop: '20px' }}>
            Valence란 감정의 긍정/부정 정도를 의미하며, 느껴지는 감정이 얼마나 유쾌한지 불쾌한지에 해당합니다. 
            긍정적 감정일수록 점수가 높고, 부정적 감정일수록 점수가 낮습니다.
            </p>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <img
                src={valenceImage}
                alt="Valence Example"
                style={{
                maxWidth: '600px',
                width: '100%',
                userSelect: 'none',
                pointerEvents: 'none',
                borderRadius: '8px'
                }}
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
            />
            </div>
    
            <h3>2. Arousal (자극 강도)</h3>
            <p style={{ fontSize: '16px', color: '#555', backgroundColor: '#f0f8ff', padding: '10px', borderRadius: '5px', marginTop: '20px' }}>
            Arousal이란 감정의 각성 정도 또는 자극의 강도를 의미합니다.
            느껴지는 감정이 얼마나 차분한지, 혹은 얼마나 강렬하고 활발한지에 해당합니다.
            감정이 더 격렬하고 에너지가 높을수록 점수가 높고, 조용하고 안정된 감정일수록 점수가 낮습니다.  
            </p>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <img
                src={arousalImage}
                alt="Arousal Example"
                style={{
                maxWidth: '600px',
                width: '100%',
                userSelect: 'none',
                pointerEvents: 'none',
                borderRadius: '8px'
                }}
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
            />
            </div>
    
    
            <h3>3. Expressiveness (감정 표현의 명확성)</h3>
            <p style={{ fontSize: '16px', color: '#555', backgroundColor: '#f0f8ff', padding: '10px', borderRadius: '5px', marginTop: '20px' }}>
            Expressiveness란 감정이 표정이나 행동을 통해 얼마나 분명하게 드러나는지를 의미합니다.
            감정 표현이 풍부하고 명확할수록 점수가 높고, 감정이 잘 드러나지 않거나 표현이 모호할수록 점수가 낮습니다.  
            </p>

            
            {/* Next Button */}
            <div style={{ textAlign: "center", marginTop: "30px", marginBottom: "50px", paddingBottom: "50px" }}>
                <button
                    onClick={handleNext}
                >
                다음
                </button>
            </div>
        </div>
    );
}

export default StudyBEmotionRatingScreen;
