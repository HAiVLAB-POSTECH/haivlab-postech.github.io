import React, { useState } from "react";
import valenceImage from '/src/assets/images/valence_example.png';
import arousalImage from '/src/assets/images/arousal_example.png';

import bigsmile from '/src/assets/images/bigsmile.gif';
import littlesmile from '/src/assets/images/littlesmile.gif';
import bigsad from '/src/assets/images/bigsad.gif';
import littlesad from '/src/assets/images/littlesad.gif';
import smileex from '/src/assets/images/smileex.gif';
import cryex from '/src/assets/images/cryex.gif';

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

    // 레이아웃/스타일
    const pairWrap = {
        display: "flex",
        gap: "16px",
        alignItems: "flex-start",
        flexWrap: "wrap",
        marginTop: "10px",
    };
    const fig = {
        margin: 0,
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "8px",
        background: "#fff",
    };
    const imgStyle = {
        width: "220px",
        height: "auto",
        userSelect: "none",
        pointerEvents: "none",
        borderRadius: "6px",
        display: "block",
    };
    const caption = { marginTop: "6px", fontSize: "14px", color: "#555", textAlign: "center" };
    
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
                본 설문에서는 제시되는 각 메세지에 대해, 여러분이 느낀 감정의 <b>긍정/부정 정도</b>, <b>감정의 강도</b>, 그리고 <b>표현력</b>을 평가하게 됩니다.<br/>
                하나의 메세지를 보고, 여러분이 어떻게 느꼈는지를 세 가지 기준에 따라 응답해 주세요.
            </p>
            {/* <br/> */}

            {/* <h2 style={{ color: '#222', marginTop: '30px' }}>⚠️ Participation Restrictions</h2> */}
            <p style={{ fontSize: '16px', color: '#555', backgroundColor: '#f8f8f8', padding: '10px', borderRadius: '5px' }}>
                * 세 가지 감정 평가 기준에 대한 설명은 아래에 안내되어 있으니, 이를 참고해 주시기 바랍니다.
            </p>
            <br/>
            <h3>1. 감정의 긍정/부정 정도</h3>
            <p style={{ fontSize: '16px', color: '#555', backgroundColor: '#f0f8ff', padding: '10px', borderRadius: '5px', marginTop: '20px' }}>
            긍정적 감정일수록 점수가 <b>높고</b>⬆️, 부정적 감정일수록 점수가 <b>낮습니다⬇️.</b> <br/>
            gif와 함께 보낸 텍스트 메세지를 보고, <b>메시지가 드러내는 감정의 긍/부정성</b>에 대해서 평가해주시면 됩니다
            <span style = {{color: '#B60000', fontWeight: 'bold'}}><br/>
                ** 해당 메세지를 보고 내가 느끼는&#40;나에게 영향을 준&#41; 감정의 평가가 아닙니다.</span>
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
            /> <br/>
            <p style={{textAlign: 'left', fontSize: '16px', color: '#555' }}>
                <span style={{ textAlign: 'left', backgroundColor: '#f0f8ff', fontWeight: 'bold' }}>예시&#41;</span>
            </p>
            </div>

            {/* 질문 1: 긍정성(Valence)이 더 높은 쪽 */}
            <div style={{ marginTop: "8px" }}>
                <p style={{ fontSize: '16px', color: '#333', margin: 0 }}>
                <b>질문1&#41;</b> 이 메시지가 전달하는 감정은 <b>‘매우 부정적’↔‘매우 긍정적’</b> 사이에서 어디에 가깝습니까? 어떤 것이 점수가 <b>더 높습니까</b>?
                <span style = {{color: '#2F4B8F', fontWeight: 'bold'}}><br/>
                ** 7점의 감정에는 매우 기쁨, 환희, 흥분됨이 있을 수 있고, 5점정도의 감정에는 만족, 흥미로움 등이 있을 수 있습니다</span>                
                </p> 
                <div style={pairWrap} aria-labelledby="q1">
                <figure style={fig}>
                    <img
                    src={bigsmile}
                    alt="크게 웃는 표정"
                    style={imgStyle}
                    draggable={false}
                    onContextMenu={(e)=>e.preventDefault()}
                    onDragStart={(e)=>e.preventDefault()}
                    />
                </figure>
                <figure style={fig}>
                    <img
                    src={littlesmile}
                    alt="살짝 웃는 표정"
                    style={imgStyle}
                    draggable={false}
                    onContextMenu={(e)=>e.preventDefault()}
                    onDragStart={(e)=>e.preventDefault()}
                    />
                </figure>
                </div>
            </div>
            <br/>
            {/* 질문 2: 긍정성(Valence)이 더 낮은 쪽 */}
            <div style={{ marginTop: "16px" }}>
                <p style={{ fontSize: '16px', color: '#333', margin: 0 }}>
                <b>질문2&#41;</b> 이 메시지가 전달하는 감정은 <b>‘매우 부정적’↔‘매우 긍정적’</b> 사이에서 어디에 가깝습니까? 어떤 것이 점수가 <b>더 낮습니까</b>?
                <span style = {{color: '#2F4B8F', fontWeight: 'bold'}}><br/>
                ** 1점의 감정에는 절망, 혐오, 분노등이 있을 수 있고, 3점정도의 감정에는 실망, 불편함 등이 있을 수 있습니다</span>                
                </p>
                <div style={pairWrap} aria-labelledby="q2">
                <figure style={fig}>
                    <img
                    src={littlesad}
                    alt="약한 슬픔"
                    style={imgStyle}
                    draggable={false}
                    onContextMenu={(e)=>e.preventDefault()}
                    onDragStart={(e)=>e.preventDefault()}
                    />
                </figure>
                <figure style={fig}>
                    <img
                    src={bigsad}
                    alt="강한 슬픔"
                    style={imgStyle}
                    draggable={false}
                    onContextMenu={(e)=>e.preventDefault()}
                    onDragStart={(e)=>e.preventDefault()}
                    />
                </figure>
                </div>
            </div>
            <br/><br/><br/>
            <h3>2. 감정의 각성 수준</h3>
            <p style={{ fontSize: '16px', color: '#555', backgroundColor: '#f0f8ff', padding: '10px', borderRadius: '5px', marginTop: '20px' }}>
            격양된 감정일수록 점수가 <b>높고</b>⬆️, 차분한 감정일수록 점수가 <b>낮습니다⬇️.</b> <br/>
            gif와 함께 보낸 텍스트 메세지를 보고, <b>메시지가 드러내는 감정의 각성 수준</b>에 대해서 평가해주시면 됩니다
            <span style = {{color: '#B60000', fontWeight: 'bold'}}><br/>
                ** 해당 메세지를 보고 내가 느끼는&#40;나에게 영향을 준&#41; 감정의 평가가 아닙니다.</span>
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
            /><br/>
            <p style={{textAlign: 'left', fontSize: '16px', color: '#555' }}>
                <span style={{ textAlign: 'left', backgroundColor: '#f0f8ff', fontWeight: 'bold' }}>예시&#41;</span>
            </p>
            </div> 
            {/* 질문 1: 긍정성(Valence)이 더 높은 쪽 */}
            <div style={{ marginTop: "8px" }}>
                <p style={{ fontSize: '16px', color: '#333', margin: 0 }}>
                <b>질문1&#41;</b> 이 메시지가 전달하는 감정의 각성 수준은 <b>‘매우 차분함’↔‘매우 격앙됨’</b> 사이에서 어디에 가깝습니까? 어떤 것이 점수가 <b>더 높습니까</b>?
                <span style = {{color: '#2F4B8F', fontWeight: 'bold'}}><br/>
                ** 7점의 각성 정도에는 극도의 분노, 매우 행복이 있을 수 있고, 5점정도의 감정에는 초조함, 기대감 등이 있을 수 있습니다</span>                
                </p> 
                <div style={pairWrap} aria-labelledby="q1">
                <figure style={fig}>
                    <img
                    src={bigsmile}
                    alt="크게 웃는 표정"
                    style={imgStyle}
                    draggable={false}
                    onContextMenu={(e)=>e.preventDefault()}
                    onDragStart={(e)=>e.preventDefault()}
                    />
                </figure>
                <figure style={fig}>
                    <img
                    src={littlesmile}
                    alt="살짝 웃는 표정"
                    style={imgStyle}
                    draggable={false}
                    onContextMenu={(e)=>e.preventDefault()}
                    onDragStart={(e)=>e.preventDefault()}
                    />
                </figure>
                </div>
            </div>
            <br/>
            {/* 질문 2: 긍정성(Valence)이 더 낮은 쪽 */}
            <div style={{ marginTop: "16px" }}>
                <p style={{ fontSize: '16px', color: '#333', margin: 0 }}>
                <b>질문2&#41;</b> 이 메시지가 전달하는 감정의 각성 수준은 <b>‘매우 차분함’↔‘매우 격양됨’</b> 사이에서 어디에 가깝습니까? 어떤 것이 점수가 <b>더 낮습니까</b>?
                <span style = {{color: '#2F4B8F', fontWeight: 'bold'}}><br/>
                ** 1점의 각성 정도에는 졸림, 무기력, 평온함등이 있을 수 있고, 3점정도의 각성 정도에는 잔잔한 슬픔, 소소한 행복 등이 있을 수 있습니다</span>                
                </p>
                <div style={pairWrap} aria-labelledby="q2">
                <figure style={fig}>
                    <img
                    src={littlesad}
                    alt="약한 슬픔"
                    style={imgStyle}
                    draggable={false}
                    onContextMenu={(e)=>e.preventDefault()}
                    onDragStart={(e)=>e.preventDefault()}
                    />
                </figure>
                <figure style={fig}>
                    <img
                    src={bigsad}
                    alt="강한 슬픔"
                    style={imgStyle}
                    draggable={false}
                    onContextMenu={(e)=>e.preventDefault()}
                    onDragStart={(e)=>e.preventDefault()}
                    />
                </figure>
                </div>
            </div>
            <br/><br/><br/>
            <p style={{textAlign: 'left', fontSize: '16px', color: '#555' }}>
                <span style={{ textAlign: 'left', backgroundColor: '#B60000', color: '#ffffff', fontWeight: 'bold' }}>매우 주의해야 하는 상황&#41;</span>
            </p>

            {/* 매우 주의해야 하는 상황: GIF 왼쪽, 텍스트 오른쪽 */}
            <div style={pairWrap}>
                {/* 왼쪽: GIF 카드 (기존 fig/imgStyle 그대로 재사용) */}
                <figure style={fig}>
                    <img
                    src={smileex}            // 필요시 다른 예시 GIF로 교체 가능
                    alt="예시 GIF"
                    style={imgStyle}
                    draggable={false}
                    onContextMenu={(e)=>e.preventDefault()}
                    onDragStart={(e)=>e.preventDefault()}
                    />
                </figure>

                {/* 오른쪽: 안내 텍스트 박스 (fig 스타일 베이스로 확장) */}
                <div
                    style={{
                    ...fig,                 // 테두리/라운드/배경 동일 적용
                    flex: 1,
                    display: "grid",
                    rowGap: "10px",
                    alignContent: "start",
                    }}
                >
                {/* (O) 라인들 — 초록색 */}
                    <div style={{ color: "#1B8A5A", fontWeight: 600 }}>
                    ← 이 메시지는 <b>긍정적인 감정</b>을 전달하고 있어 <b>(O)</b>
                    </div>
                    <div style={{ color: "#1B8A5A", fontWeight: 600 }}>
                    ← 이 메시지는 <b>부정적인 감정</b>을 전달하고 있어 <b>(O)</b>
                    </div>


                    <div
                    style={{
                        backgroundColor: "#fff0f0",
                        border: "1px solid #f5c2c7",
                        borderRadius: "6px",
                        padding: "10px",
                    }}
                    >
                    ← 이 사람 표정이 불쾌해, 이 메시지를 보니까 <u>지금 내가</u> 부정적인 감정이 들어. 그래서 이건 부정성이야
                    <b style={{ color: "#B60000" }}> (X)</b>
                    <br />
                    <small style={{ color: "#B60000" }}>
                        ※ 평가 기준은 <b>내 기분</b>이 아니라 <b>메시지가 드러내는 감정</b>입니다.
                    </small>
                    </div>
                </div>
            </div>

            {/* 매우 주의해야 하는 상황: GIF 왼쪽, 텍스트 오른쪽 */}
            <div style={pairWrap}>
                {/* 왼쪽: GIF 카드 (기존 fig/imgStyle 그대로 재사용) */}
                <figure style={fig}>
                    <img
                    src={cryex}            // 필요시 다른 예시 GIF로 교체 가능
                    alt="예시 GIF"
                    style={imgStyle}
                    draggable={false}
                    onContextMenu={(e)=>e.preventDefault()}
                    onDragStart={(e)=>e.preventDefault()}
                    />
                </figure>

                {/* 오른쪽: 안내 텍스트 박스 (fig 스타일 베이스로 확장) */}
                <div
                    style={{
                    ...fig,                 // 테두리/라운드/배경 동일 적용
                    flex: 1,
                    display: "grid",
                    rowGap: "10px",
                    alignContent: "start",
                    }}
                >
                {/* (O) 라인들 — 초록색 */}
                    <div style={{ color: "#1B8A5A", fontWeight: 600 }}>
                    ← 이 메시지는 <b>긍정적인 감정</b>을 전달하고 있어 <b>(O)</b>
                    </div>
                    <div style={{ color: "#1B8A5A", fontWeight: 600 }}>
                    ← 이 메시지는 <b>부정적인 감정</b>을 전달하고 있어 <b>(O)</b>
                    </div>


                    <div
                    style={{
                        backgroundColor: "#fff0f0",
                        border: "1px solid #f5c2c7",
                        borderRadius: "6px",
                        padding: "10px",
                    }}
                    >
                    ← 이 사람 웃기게 생겼다, 이 메시지를 보니까 <u>지금 내가</u> 웃긴 감정이 들어. 그래서 이건 긍정성이야
                    <b style={{ color: "#B60000" }}> (X)</b>
                    <br />
                    <small style={{ color: "#B60000" }}>
                        ※ 평가 기준은 <b>내 기분</b>이 아니라 <b>메시지가 드러내는 감정</b>입니다.
                    </small>
                    </div>
                </div>
            </div>

            <br/><br/><br/>
   
    
            <h3>3. 감정 표현의 명확성</h3>
            <p style={{ fontSize: '16px', color: '#555', backgroundColor: '#f0f8ff', padding: '10px', borderRadius: '5px', marginTop: '20px' }}>
            감정 표현의 명확성은 얼마나 감정을 더 잘 표현하는지를 의미합니다. <br/>
            감정이 분명하게 드러날수록 점수가 <b>높고</b>⬆️, 잘 드러나지 않을수록 점수가 <b>낮습니다⬇️.</b> <br/>
            gif와 함께 보낸 텍스트 메세지를 보고, <b>메시지가 화자의 감정을 잘 드러내는지</b>에 대해서 평가해주시면 됩니다
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
