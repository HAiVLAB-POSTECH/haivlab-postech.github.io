import React, { useState, useMemo } from "react";
import valenceImage from '/src/assets/images/valence_survey.png';
import arousalImage from '/src/assets/images/arousal_survey.png';

function StudyBReceiverScreen({ onNext, emotionData, setEmotionData, items = [], userId, isYourFace, setIsYourFace }) {

    // formData keys are dynamic, based on images/questions from server
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // 이미지 로드: gif + webp 모두
    const allImages = import.meta.glob('/src/assets/**/**.{gif,webp}', {
        eager: true,
        import: 'default',
        query: '?url',
    });

    // 파일명에서 id 및 role 매핑: _o, _1, _2
    function parseImage(path) {
        const filename = path.split('/').pop() || '';
        // 예: angry_o.gif, angry_1.gif, angry_2.gif, disgusted_o.webp
        const match = filename.match(/^(.*)_(o|1|2)\.(gif|webp)$/);
        if (!match) return null;
        const base = match[1];
        const role = match[2];
        return { id: base, role, url: allImages[path] };
    }

    // id별 {o,1,2} 매핑
    const pairMap = useMemo(() => {
        const acc = {};
        for (const [path, url] of Object.entries(allImages)) {
            const parsed = parseImage(path);
            if (!parsed) continue;
            const { id, role } = parsed;
            if (!acc[id]) acc[id] = {};
            acc[id][role] = url;
        }
        return acc; // { angry: {o,1,2}, ... }
    }, []);

    const isOdd = Number.parseInt(userId, 10) % 2 === 1;
    const rightRole = isOdd ? '2' : '1'; // 수신자: 홀수→_2, 짝수→_1

    // 전달받은 items를 pairMap과 결합하여 렌더용 리스트 생성 (세트 레터 보존)
    const renderList = useMemo(() => {
        return items
            .map((item) => ({ ...item, pair: pairMap[item.id] }))
            .filter(({ pair }) => pair && pair.o && pair[rightRole]);
    }, [items, pairMap, rightRole]);

    const questionKeysFromItems = renderList.flatMap((item) => {
        const roles = ['o', rightRole];
        return roles.flatMap((r) => (
            [
                `recv_${item.id}_${r}_valence`,
                `recv_${item.id}_${r}_arousal`,
                `recv_${item.id}_${r}_expression`,
            ]
        ));
    });

    const questionKeys = [...questionKeysFromItems, "recv_overall_self_face"];

    const isFormValid = questionKeys.every((key) => formData[key] && formData[key] !== "");

    // 스타일: 채팅풍선(좌측)
    const nameLabel = { fontSize: 14, color: "#8E8E93", marginBottom: 6 };
    const chatRow = { display: "flex", alignItems: "flex-start"}; // 좌측 버블
    // iMessage 수신 버블
    const iosBubble = {
        position: "relative",
        background: "#ECEEF1",
        border: "none",
        borderRadius: 20,
        padding: 12,
        color: "#111",
        lineHeight: 1.45,
        marginBottom: 8, 
        display: "inline-block",             // ✅ 내용만큼만
        maxWidth: "min(100%, 560px)",        // ✅ 최대 폭 제한
    };
    const iosTail = {
        position: "absolute",
        left: -6,
        bottom: 10,
        width: 12,
        height: 12,
        background: "#ECEEF1",
        transform: "rotate(45deg)",
        borderBottomRightRadius: 12,
    };



    // "Next" 버튼 클릭 시 App으로 폼 데이터 전달
    const handleNext = () => {
        if (!isFormValid) return;
        const updatedData = {
            ...emotionData,
            ...formData, // 현재 입력값
        };

        setEmotionData(updatedData);
        onNext(); 
    };

    return (
        <div
            style={{
                width: "1200px",
                height: "100%",
                marginTop: "30px",
                fontFamily: "Arial, sans-serif",
                lineHeight: "1.6",
                textAlign: "left",
            }}
        >
            <h2 style={{ textAlign: 'left', color: '#333', borderBottom: '2px solid #ddd', paddingBottom: '10px' }}>
                gif 감정평가 설문지 (2/3)
            </h2>
            <h2 style={{ textAlign: 'left', color: '#333', paddingBottom: '0px' }}>
                <span style={{ backgroundColor: '#ffe066'}}>수신자 역할</span> gif 감정 평가
            </h2>
            <p style={{ fontSize: '16px', color: '#555' }}>
                당신이 해당 메시지의 <span style = {{backgroundColor: '#ffe066', color: '#B60000', fontWeight: 'bold'}}>수신자</span>라고 가정해 주세요.
                <br /><br />
                상대방이 <b>제시된 텍스트에 적절한 GIF를 직접 선택해 함께 전송했다고 가정했을 때</b>,<br />
                <span style = {{backgroundColor: '#ffe066', color: '#B60000', fontWeight: 'bold'}}>수신자 입장</span>에서 해당 GIF에서 느껴지는 감정의 특성을 세 가지 기준에 따라 평가해 주세요:
                <br /><br /><br />
                <span style = {{color: '#B60000', fontWeight: 'bold'}}>** 텍스트와 GIF의 조합은 이미 상황에 적절하다고 전제되어 있으므로, 텍스트/GIF간의 어울림 여부는 평가 대상이 아닙니다</span>
            </p>

            <div>
                {renderList.map(({ id, text, pair, _set }) => (
                    <div key={id} style={{ marginBottom: "40px", borderTop: "1px solid #ddd", paddingBottom: "20px" }}>
                        <div style={{ margin: "30px 0", padding: "20px", background: "#f5f5f5", borderRadius: "8px" }}>
                            <label style={{ fontWeight: "bold", fontSize: "16px", marginBottom: "10px", display: "block" }}>
                                아래 gif에 대해 이전에 접한 경험이 있습니까? (복수 선택 가능)
                            </label>
                            {[ 
                                { key: "known_level_1", label: "출처를 알고 있다" },
                                { key: "known_level_2", label: "이전에 직접 사용한 적이 있다" },
                                { key: "known_level_3", label: "다른 사람이 사용하는 것을 본 적이 있다" },
                                { key: "known_level_4", label: "전혀 본 적 없다" },
                            ].map(({ key, label }) => (
                                <label key={key} style={{ display: "block", marginBottom: "8px", paddingLeft: "20px" }}>
                                    <input
                                        type="checkbox"
                                        name={`recv_experience_${id}_${key}`}
                                        checked={!!formData[`recv_experience_${id}_${key}`]}
                                        onChange={e => {
                                            const { name, checked } = e.target;
                                            setFormData(prev => ({ ...prev, [name]: checked }));
                                        }}
                                        style={{ marginRight: "8px" }}
                                    />
                                    {label}
                                </label>
                            ))}
                        </div>
                        <div style={{ display: "flex", gap: "40px", justifyContent: "center", alignItems: "flex-start", margin: "30px 0" }}>
                            {[
                                { img: pair.o, alt: `recv_${id}_o`, label: '원본(o)' },
                                { img: pair[rightRole], alt: `recv_${id}_${rightRole}`, label: `상대(${rightRole})` }
                            ].map(({ img, alt, label }) => (
                                <div key={alt} style={{ flex: 1, background: "#fafafa", borderRadius: "10px", boxShadow: "0 2px 8px #eee", padding: "10px", margin: "0 10px" }}>
                                    <div key={alt} style={{ flex: 1, padding: "0 10px" }}>
                                        {/* 상단 작은 라벨 (이름 톤) */}
                                        <div style={nameLabel}>
                                            &nbsp;&nbsp;상대방의 메시지
                                            <span style={{ color: '#9aa0a6', marginLeft: 8 }}>(Set: {_set})</span>
                                        </div>

                                        {/* iOS 말풍선: 텍스트 위, GIF 아래 (원본 크기 유지) */}
                                        <div style={chatRow}>
                                            <div style={iosBubble}>
                                            <div style={iosTail} />
                                            <div>{text}</div>
                                        </div>
                                    </div>
                                        <img
                                            src={img}
                                            alt={alt}
                                            // 원본(자연) 크기 유지: width 미지정, 필요시 넘치지 않게만 막고 싶으면 maxWidth: "100%" 추가
                                            style={{ display: "block", height: "auto", borderRadius: 12, maxWidth: 'min(100%, 360px)' }}
                                            onContextMenu={(e) => e.preventDefault()}
                                            onDragStart={(e) => e.preventDefault()}
                                        />                                    
                                </div>
                                    {[
                                        {
                                            key: `${alt}_valence`,
                                            image: valenceImage,
                                            question: [
                                                <> 1. 해당 메시지가 전달하는 <span style = {{color: '#2F4B8F', fontWeight: 'bold'}}>상대방의 감정</span>은 <strong>‘매우 부정적’↔‘매우 긍정적’</strong><br/> 
                                                사이에서 어디에 가깝습니까?</>
                                            ],
                                            options: [1, 2, 3, 4, 5, 6, 7],
                                            labels: ["매우 부정적", "매우 긍정적"],
                                        },
                                        {
                                            key: `${alt}_arousal`,
                                            image: arousalImage,
                                            question: [
                                                <> 2. 해당 메시지가 전달하는 <span style = {{color: '#2F4B8F', fontWeight: 'bold'}}>상대방의 감정 각성 수준</span>은 <br/> 
                                                <strong>‘매우 차분함’↔‘매우 격앙됨’</strong> 사이에서 어디에 가깝습니까?</>
                                            ],
                                            options: [1, 2, 3, 4, 5, 6, 7],
                                            labels: ["매우 차분함", "매우 격앙됨"],
                                        },
                                        {
                                            key: `${alt}_expression`,
                                            question: <> 3. 해당 메시지가 <span style = {{color: '#2F4B8F', fontWeight: 'bold'}}>상대방의 실제 감정</span>을 <b>더 풍부하게 표현한다고</b> 생각하십니까?</>,
                                            options: [1, 2, 3, 4, 5, 6, 7],
                                            labels: ["전혀 그렇지 않다", "매우 그렇다"],
                                        },
                                    ].map(({ key, question, image, options, labels }) => (
                                        <div style={{ paddingTop: "10px" }} key={key}>
                                            <div style={{ color: "#555", backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "5px" }}>
                                                {image != null && (
                                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                                        <img
                                                            src={image}
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
                                                )}
                                                <p>
                                                    {Array.isArray(question)
                                                        ? question.map((line, idx) => (
                                                            <React.Fragment key={idx}>
                                                                {line}
                                                                <br />
                                                            </React.Fragment>
                                                        ))
                                                        : question}
                                                </p>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "10px 0" }}>
                                                {options.map((option) => {
                                                    // 라벨을 정의합니다. 1, 4, 7에 해당하는 라벨을 설정합니다.
                                                    const pointLabel = {
                                                        1: labels[0], // "매우 불쾌함" 또는 "매우 차분함"
                                                        4: "보통",
                                                        7: labels[1], // "매우 유쾌함" 또는 "매우 들뜸"
                                                    };

                                                    return (
                                                        <div
                                                            key={option}
                                                            style={{
                                                                display: "flex",
                                                                flexDirection: "column",
                                                                alignItems: "center",
                                                                // flex: 1을 주어 각 항목이 동일한 공간을 차지하게 합니다.
                                                                flex: 1, 
                                                                textAlign: "center"
                                                            }}
                                                        >
                                                            {/* 1. 숫자 (1, 2, 3...) */}
                                                            <span style={{ marginBottom: "4px" }}>{option}</span>

                                                            {/* 2. 라디오 버튼 */}
                                                            <input
                                                                type="radio"
                                                                name={key}
                                                                value={option.toString()}
                                                                checked={formData[key] === option.toString()}
                                                                onChange={handleChange}
                                                                style={{ margin: "4px 0" }} // 위아래 간격 추가
                                                            />

                                                            {/* 3. 조건부 라벨 (1, 4, 7 아래에만 표시) */}
                                                            <span style={{ 
                                                                fontSize: "14px", 
                                                                color: "#666", 
                                                                height: "2.5em", // 라벨 영역 높이를 고정하여 정렬 유지
                                                                display: "flex",
                                                                alignItems: "center"
                                                            }}>
                                                                {/* pointLabel 객체에 해당 option 키가 있으면 라벨을 표시합니다. */}
                                                                {pointLabel[option] || <>&nbsp;</>}
                                                            </span>
                                                        </div>
                                                    );
                                                })}
                                            </div>                                           
                                         </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ margin: "30px 0", padding: "20px", background: "#f5f5f5", borderRadius: "8px" }}>
                <label style={{ fontWeight: "bold", fontSize: "16px", marginBottom: "10px", display: "block" }}>
                    위의 <strong>합성된 GIF들</strong>이 전반적으로 <strong>상대의 얼굴</strong>로 인지된다고 느끼십니까?
                </label>

                {(() => {
                    const key = "recv_overall_self_face"; // This name is used in both files
                    const options = [1, 2, 3, 4, 5, 6, 7];
                    const labels = ["전혀 그렇지 않다", "매우 그렇다"];
                    
                    const pointLabel = {
                        1: labels[0],
                        4: "보통",
                        7: labels[1],
                    };

                    return (
                        <div style={{ 
                            display: "flex", 
                            justifyContent: "center", // Center the group
                            alignItems: "flex-start", 
                            padding: "10px 0" 
                        }}>
                            {options.map((option) => (
                                <div
                                    key={option}
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        textAlign: "center",
                                        width: "80px", // Set fixed width for compact spacing
                                    }}
                                >
                                    {/* Number */}
                                    <span style={{ marginBottom: "4px" }}>{option}</span>

                                    {/* Radio Button */}
                                    <input
                                        type="radio"
                                        name={key}
                                        value={option.toString()}
                                        checked={formData[key] === option.toString()}
                                        onChange={(e) => {
                                            handleChange(e);             
                                            setIsYourFace(e.target.value); 
                                        }}
                                        style={{ margin: "4px 0" }}
                                    />

                                    {/* Conditional Label */}
                                    <span style={{ 
                                        fontSize: "14px", 
                                        color: "#666", 
                                        height: "2.5em",
                                        display: "flex",
                                        alignItems: "center",
                                        whiteSpace: "nowrap",
                                    }}>
                                        {pointLabel[option] || <>&nbsp;</>}
                                    </span>
                                </div>
                            ))}
                        </div>
                    );
                })()}
            </div>            
            {/* Next Button */}
            <div style={{ textAlign: "center", marginTop: "30px", marginBottom: "50px", paddingBottom: "50px" }}>
                <button
                    onClick={handleNext}
                    disabled={!isFormValid}
                >
                    다음
                </button>
            </div>
        </div>
    );
}

export default StudyBReceiverScreen;
