import React, { useState, useMemo } from "react";
import valenceImage from '/src/assets/images/valence_survey.png';
import arousalImage from '/src/assets/images/arousal_survey.png';

function StudyBReceiverScreen({ onNext, emotionData, setEmotionData, items = [], userId }) {

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

    // 전달받은 items를 pairMap과 결합하여 렌더용 리스트 생성
    const renderList = useMemo(() => {
        return items
            .map(({ id, text }) => ({ id, text, pair: pairMap[id] }))
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
                수신자 역할 gif 감정 평가
            </h2>
            <p style={{ fontSize: '16px', color: '#555' }}>
                당신이 해당 메시지의 수신자라고 가정해 주세요.
                <br /><br />
                상대방이 제시된 텍스트에 적절한 GIF를 직접 선택해 함께 전송했다고 가정했을 때,<br />
                수신자 입장에서 해당 GIF에서 느껴지는 감정의 특성을 세 가지 기준에 따라 평가해 주세요:
                <br /><br /><br />
                ** 텍스트와 GIF의 조합은 이미 상황에 적절하다고 전제되어 있으므로, 텍스트/GIF간의 어울림 여부는 평가 대상이 아닙니다
            </p>

            <div>
                {renderList.map(({ id, text, pair }) => (
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
                                    <div style={{ fontWeight: 600, marginBottom: '8px', textAlign: 'left' }}>Message: {text}</div>
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <img
                                            src={img}
                                            alt={alt}
                                            style={{ maxWidth: "100%", borderRadius: "8px", boxShadow: "0 2px 8px #ccc", marginBottom: "20px" }}
                                            onContextMenu={e => e.preventDefault()}
                                            onDragStart={e => e.preventDefault()}
                                        />
                                    </div>
                                    {[
                                        {
                                            key: `${alt}_valence`,
                                            image: valenceImage,
                                            question: [
                                                "1. 해당 gif가 표현하는 valence에 대해서 평가해주세요",
                                                "* 느껴지는 감정이 얼마나 유쾌한지 불쾌한지",
                                            ],
                                            options: [1, 2, 3, 4, 5, 6, 7],
                                            labels: ["매우 불쾌함", "매우 유쾌함"],
                                        },
                                        {
                                            key: `${alt}_arousal`,
                                            image: arousalImage,
                                            question: [
                                                "2. 해당 gif가 표현하는 arousal에 대해서 평가해주세요",
                                                "*  느껴지는 감정이 얼마나 차분한지, 혹은 얼마나 강렬하고 활발한지",
                                            ],
                                            options: [1, 2, 3, 4, 5, 6, 7],
                                            labels: ["매우 차분함", "매우 들뜸"],
                                        },
                                        {
                                            key: `${alt}_expression`,
                                            question: "3. 해당 gif가 당신의 감정을 잘 표현했다고 생각하십니까?",
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
                                                <div style={{ display: "flex", flexWrap: "wrap", gap: "2px", padding: "20px" }}>
                                                    <div style={{ marginTop: "26px" }}>{labels[0]}</div>
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
                                                                onChange={e => {
                                                                    const { name, value } = e.target;
                                                                    setFormData(prev => ({ ...prev, [name]: value }));
                                                                }}
                                                            />
                                                        </div>
                                                    ))}
                                                    <div style={{ marginTop: "26px" }}>{labels[1]}</div>
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
                위의 <strong>합성된 GIF들</strong>이 전반적으로 <strong>당신의 얼굴</strong>처럼 보인다고 느끼십니까?
            </label>
            <p style={{ color: "#666", margin: "6px 0 14px" }}>
                1 = 전혀 그렇지 않다 &nbsp;~&nbsp; 7 = 매우 그렇다
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center", paddingLeft: 8 }}>
                <span style={{ marginTop: 6 }}>전혀 그렇지 않다</span>
                {[1,2,3,4,5,6,7].map((n) => (
                <label key={n} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <span style={{ marginBottom: 4 }}>{n}</span>
                    <input
                    type="radio"
                    name="recv_overall_self_face"
                    value={String(n)}
                    checked={formData["recv_overall_self_face"] === String(n)}
                    onChange={handleChange}
                    />
                </label>
                ))}
                <span style={{ marginTop: 6 }}>매우 그렇다</span>
            </div>
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
