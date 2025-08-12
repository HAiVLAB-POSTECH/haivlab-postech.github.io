import React, { useState, useEffect } from "react";
import intimacyImage from '/src/assets/images/intimacy.png';

function StudyAPostChatScreen({ onNext, freeChatData, setFreeChatData, place, variant }) {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const keys = Array.from({ length: 16 }, (_, i) => `post_a${i + 1}_${place}`);
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
                "🗽 단 하루로 완성하는 {place} 여행 설계 대화" 에 대한 경험 평가 
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
                    key: `post_a1_${place}`,
                    question: "1. 과제를 수행하는 동안, 상대와 생각이 잘 통했다",
                    options: [1, 2, 3, 4, 5, 6, 7],
                    labels: ["전혀 그렇지 않다", "매우 그렇다"],
                },
                {
                    key: `post_a2_${place}`,
                    question: "2. 나와 상대는 함께 잘 협업 했다고 느낀다",
                    options: [1, 2, 3, 4, 5, 6, 7],
                    labels: ["전혀 그렇지 않다", "매우 그렇다"],
                },
                {
                    key: `post_a3_${place}`,
                    question: "3. 이 상호작용에 몰입했다고 생각한다",
                    options: [1, 2, 3, 4, 5, 6, 7],
                    labels: ["전혀 그렇지 않다", "매우 그렇다"],
                },
                {
                    key: `post_a4_${place}`,
                    question: "4. 나는 대화 내내 상대가 내 곁에 있는 듯 느꼈다",
                    options: [1, 2, 3, 4, 5, 6, 7],
                    labels: ["전혀 그렇지 않다", "매우 그렇다"],
                },
                {
                    key: `post_a5_${place}`,
                    question: "5. 나는 상대에게 집중해서 주의를 기울였다",
                    options: [1, 2, 3, 4, 5, 6, 7],
                    labels: ["전혀 그렇지 않다", "매우 그렇다"],
                },
                {
                    key: `post_a6_${place}`,
                    question: "6. 상대도 나에게 집중하고 있다고 느꼈다",
                    options: [1, 2, 3, 4, 5, 6, 7],
                    labels: ["전혀 그렇지 않다", "매우 그렇다"],
                },
                {
                    key: `post_a7_${place}`,
                    question: [
                        "7. 당신이 커뮤니케이션에서 사용한 매체(gif)는 얼마나 사교적으로 느껴졌나요?",
                        "*각 항목의 양 끝에 제시된 두 표현 사이에서, 당신의 느낌에 가장 가까운 위치에 체크 해주세요",
                        "** '사교적'이란 이 매체를 통해 자연스럽게 대화를 나누거나 친밀감을 형성할 수 있다고 느끼는지와 관련된 평가 입니다."
                    ],
                    options: [1, 2, 3, 4, 5, 6, 7],
                    labels: ["매우 비사교적 (Unsociable)", "매우 사교적 (Sociable)"],
                },
                {
                    key: `post_a8_${place}`,
                    question: [
                        "8. 당신이 커뮤니케이션에서 사용한 매체(gif)는 감정이나 반응에 얼마나 민감하게 느껴졌나요?",
                        "*각 항목의 양 끝에 제시된 두 표현 사이에서, 당신의 느낌에 가장 가까운 위치에 체크 해주세요",
                        "** '민감함'이란 이 매체를 통해 상대방의 감정이나 반응을 잘 파악하고 교감할 수 있었다고 느끼는지와 관련된 평가입니다."
                    ],
                    options: [1, 2, 3, 4, 5, 6, 7],
                    labels: ["매우 둔감함 (Insensitive)", "매우 민감함 (Sensitive)"],
                },
                {
                    key: `post_a9_${place}`,
                    question: [
                        "9. 당신이 커뮤니케이션에서 사용한 매체(gif)는 얼마나 따뜻한 느낌을 주었나요?",
                        "*각 항목의 양 끝에 제시된 두 표현 사이에서, 당신의 느낌에 가장 가까운 위치에 체크 해주세요",
                        "** '따뜻함'이란 이 매체가 인간적인 온기나 정서적 편안함을 전달했다고 느끼는지와 관련된 평가입니다."
                    ],
                    options: [1, 2, 3, 4, 5, 6, 7],
                    labels: ["매우 차가움 (Cold)", "매우 따뜻함 (Warm)"],
                },
                {
                    key: `post_a10_${place}`,
                    question: [
                        "10. 당신이 커뮤니케이션에서 사용한 매체(gif)는 얼마나 개인적인 느낌을 주었나요?",
                        "*각 항목의 양 끝에 제시된 두 표현 사이에서, 당신의 느낌에 가장 가까운 위치에 체크 해주세요",
                        "** '개인적'이란 이 매체가 사적인 이야기나 진솔한 감정 표현을 나누기에 적절하다고 느끼는지와 관련된 평가입니다."
                    ],
                    options: [1, 2, 3, 4, 5, 6, 7],
                    labels: ["매우 차가움 (Cold)", "매우 따뜻함 (Warm)"],
                },
                {
                    key: `post_a11_${place}`,
                    image: intimacyImage,
                    question: [
                        "11. 이번 상호작용을 통해 당신과 상대방 사이에 얼마나 친밀감이 형성되었다고 느끼십니까?",
                        "* [그림]을 보고 당신의 느낌과 가장 가까운 정도를 선택해 주세요"
                    ],
                    options: [1, 2, 3, 4, 5, 6, 7],
                    labels: ["", ""],
                },
                {
                    key: `post_a12_${place}`,
                    question: "12. 나는 상호작용 중에 개인적인 정보를 많이 공유했다",
                    options: [1, 2, 3, 4, 5, 6, 7],
                    labels: ["전혀 그렇지 않다", "매우 그렇다"],
                },
                {
                    key: `post_a13_${place}`,
                    question: "13. 나는 내 감정이나 생각을 솔직하게 표현했다",
                    options: [1, 2, 3, 4, 5, 6, 7],
                    labels: ["전혀 그렇지 않다", "매우 그렇다"],
                },
                {
                    key: `post_a14_${place}`,
                    question: "14. 나는 이 상호작용에서 내밀한(사적인) 내용을 포함한 이야기를 했다",
                    options: [1, 2, 3, 4, 5, 6, 7],
                    labels: ["전혀 그렇지 않다", "매우 그렇다"],
                },
                {
                    key: `post_a15_${place}`,
                    question: "15. 이 상호작용은 즐거웠다",
                    options: [1, 2, 3, 4, 5, 6, 7],
                    labels: ["전혀 그렇지 않다", "매우 그렇다"],
                },
                {
                    key: `post_a16_${place}`,
                    question: "16. 이번 상호작용 전반에 만족한다",
                    options: [1, 2, 3, 4, 5, 6, 7],
                    labels: ["전혀 그렇지 않다", "매우 그렇다"],
                }
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
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", padding: "20px" }}>
                            <div style={{marginTop: "26px"}}>{labels[0]}</div>
                            {options.map((option) => (
                                <div
                                    key={option}
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        marginRight: "16px",
                                        whiteSpace: "nowrap",
                                        fontWeight: 400,
                                    }}
                                >
                                    <span style={{ marginBottom: "4px" }}>{option}</span>
                                    <input
                                        type="radio"
                                        name={key}
                                        value={option.toString()}
                                        checked={formData[key] === option.toString()}
                                        onChange={handleChange}
                                    />
                                </div>
                            ))}
                            <div style={{marginTop: "26px"}}>{labels[1]}</div>
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
