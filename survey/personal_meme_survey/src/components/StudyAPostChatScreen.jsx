import React, { useState, useEffect } from "react";
import intimacyImage from '/src/assets/images/intimacy.png';

function StudyAPostChatScreen({ onNext, freeChatData, setFreeChatData, place, variant }) {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const keys = Array.from({ length: 10 }, (_, i) => `${variant}_post_a${i + 1}_${place}`);
        const initialData = keys.reduce((acc, key) => {
            acc[key] = "";
            return acc;
        }, {});
        setFormData(initialData);
    }, [place]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // const isFormValid = true;
    const isFormValid = Object.values(formData).every((v) => v !== "");

    const emoji = place === '뉴욕' ? '🗽' : '🥐';

    // "Next" 버튼 클릭 시 App으로 폼 데이터 전달
    const handleNext = () => {
        if (!isFormValid) return;
        const updatedData = {
            ...freeChatData,
            ...formData, // 현재 입력값
        };

        setFreeChatData(updatedData);
        console.log("✅ FreeChatData updated:", updatedData);
        onNext(); 
    };

    const labelStyle = {
        display: "block",
        marginBottom: "5px",
        paddingLeft: "10px",
    };

    const variantLabel = variant === 'swap' ? '(얼굴합성)' : '(원본)';

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
                1차 실험 설문지 "{place}" (2/2) 경험 평가 <span style={{ color: '#666', fontSize: '0.9em', marginLeft: '6px' }}>{variantLabel}</span>
            </h2>

            <h2 style={{ textAlign: 'left', color: '#333', paddingBottom: '0px' }}>
                "{emoji} 단 하루로 완성하는 {place} 여행 설계 대화" 에 대한 경험 평가 
            </h2>
            <p style={{ fontSize: '16px', color: '#555', backgroundColor: '#f0f8ff', padding: '20px', borderRadius: '5px', marginTop: '20px' }}>
                여러분은 방금 친구와 함께 '단 하루로 완성하는 {place} 여정 설계" 주제로 여행 계획 대화를 나누었습니다.<br/>
                이 설문은 그 대화 경험을 바탕으로 당신이 느낀 인식, 감정, 참여 정도를 평가하기 위한 것입니다.
                <br/><br/>
                각 문항은 당신의 주관적인 경험에 기반하여 응답해 주세요.<br/>
                정답은 없으며, 당시 느낀 그대로 솔직하게 응답해 주시면 됩니다.
            </p>

            {/* Questions - A */}
            {[
                {
                    key: `${variant}_post_a1_${place}`,
                    question: "1. 나는 대화 내내 상대방이 바로 곁에 있는 듯 느꼈다",
                    options: [1, 2, 3, 4, 5, 6, 7],
                    labels: ["전혀 그렇지 않다", "매우 그렇다"],
                },
                {
                    key: `${variant}_post_a2_${place}`,
                    question: "2. 과제를 수행하는 동안 상대와 생각이 잘 통했다",
                    options: [1, 2, 3, 4, 5, 6, 7],
                    labels: ["전혀 그렇지 않다", "매우 그렇다"],
                },
                {
                    key: `${variant}_post_a3_${place}`,
                    question: "3. 내 개인적인 생각이나 감정을 드러내는 데 부담이 적었다",
                    options: [1, 2, 3, 4, 5, 6, 7],
                    labels: ["전혀 그렇지 않다", "매우 그렇다"],
                },
                {
                    key: `${variant}_post_a4_${place}`,
                    question: "4. 이번 대화에서 나는 나 자신에 대한 친밀하고 개인적인 정보를 자주 밝혔다",
                    options: [1, 2, 3, 4, 5, 6, 7],
                    labels: ["전혀 그렇지 않다", "매우 그렇다"],
                },
                {
                    key: `${variant}_post_a5_${place}`,
                    question: "5. 이번 대화에서 상대방은 자기 자신에 대해 친밀하고 개인적인 정보를 자주 밝혔다",
                    options: [1, 2, 3, 4, 5, 6, 7],
                    labels: ["전혀 그렇지 않다", "매우 그렇다"],
                },
                {
                    key: `${variant}_post_a6_${place}`,
                    question: "6. 나는 이 매체를 통해 내가 보여주고 싶은 모습을 원하는 대로 선택할 수 있었다",
                    options: [1, 2, 3, 4, 5, 6, 7],
                    labels: ["전혀 그렇지 않다", "매우 그렇다"],
                },
                {
                    key: `${variant}_post_a7_${place}`,
                    question: [
                        "7. 나는 이 매체를 통해 나를 표현하는 것이 부담스러웠다",
                    ],
                    options: [1, 2, 3, 4, 5, 6, 7],
                    labels: ["전혀 그렇지 않다", "매우 그렇다"],
                },
                {
                    key: `${variant}_post_a8_${place}`,
                    question: [
                        "8. 나는 대화에 깊이 몰입했다",
                    ],
                    options: [1, 2, 3, 4, 5, 6, 7],
                    labels: ["전혀 그렇지 않다", "매우 그렇다"],
                },
                {
                    key: `${variant}_post_a9_${place}`,
                    question: [
                        "9. 상대방과의 대화는 즐거웠다",
                    ],
                    options: [1, 2, 3, 4, 5, 6, 7],
                    labels: ["전혀 그렇지 않다", "매우 그렇다"],
                },
                {
                    key: `${variant}_post_a10_${place}`,
                    question: [
                        "10. 나는 이번 대화를 통해 상대방과 더 가까워졌다고 느낀다",
                    ],
                    options: [1, 2, 3, 4, 5, 6, 7],
                    labels: ["전혀 그렇지 않다", "매우 그렇다"],
                },
            ].map(({ key, question, image, options, labels}) => (
                <div style={{paddingTop: "20px"}} key={key}>
                    <div style={{ color: "#555", backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "5px" }}>
                        {image != null && (
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
                        <div style={{
                            display: "flex",
                            justifyContent: "center", // Center the group of buttons
                            alignItems: "flex-start",
                            padding: "10px 0"
                        }}>
                            {options.map((option) => {
                                const pointLabel = {
                                    1: labels[0],
                                    4: "보통",
                                    7: labels[1],
                                };

                                return (
                                    <div
                                        key={option}
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            textAlign: "center",
                                            width: "80px", // Adjust width for appropriate spacing
                                        }}
                                    >
                                        {/* Number (1, 2, 3...) */}
                                        <span style={{ marginBottom: "4px" }}>{option}</span>

                                        {/* Radio Button */}
                                        <input
                                            type="radio"
                                            name={key}
                                            value={option.toString()}
                                            checked={formData[key] === option.toString()}
                                            onChange={handleChange}
                                            style={{ margin: "4px 0" }}
                                        />

                                        {/* Conditional Label (at points 1, 4, 7) */}
                                        <span style={{
                                            fontSize: "14px",
                                            color: "#666",
                                            height: "2.5em",
                                            display: "flex",
                                            alignItems: "center",
                                            whiteSpace: "nowrap", // Prevents labels from wrapping
                                        }}>
                                            {pointLabel[option] || <>&nbsp;</>}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>                    
                    </div>
                </div>
            ))}


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

export default StudyAPostChatScreen;
