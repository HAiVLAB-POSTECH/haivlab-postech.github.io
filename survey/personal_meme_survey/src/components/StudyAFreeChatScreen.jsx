import React, { useState } from "react";

function StudyAFreeChatScreen({ onNext, freeChatData, setFreeChatData, place, variant, userId }) { // place, variant 추가
    const [formData, setFormData] = useState({
        [`pre_a1_${place}`]: "",
        [`pre_a2_${place}`]: "",
        [`pre_a3_${place}`]: "",
        [`pre_a4_${place}`]: "",
        [`pre_a5_${place}`]: "",
        [`pre_a6_${place}`]: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const isFormValid = Object.values(formData).every((v) => v !== "");

    // "Next" 버튼 클릭 시 App으로 폼 데이터 전달
    const handleNext = () => {
        if (!isFormValid) return;
        const updatedData = {
            ...freeChatData,
            ...formData, // 현재 입력값
        };

        setFreeChatData(updatedData);
        onNext(); 
    };

    const GuideBanner = ({ href, label }) => (
        <div
        style={{
            marginTop: "26px",
            marginBottom: "10px",
            padding: "10px 12px",
            backgroundColor: "rgba(217, 217, 217, 0.2)",
            border: "1px solid rgba(217, 217, 217, 0.5)",
            borderRadius: "6px",
            color: "#444",
            fontSize: "14px",
        }}
        >
        <b>정보는 여기서 확인하세요 &gt; </b>
        <a href={href} target="_blank" rel="noopener noreferrer">
            {label}
        </a>
        </div>
    );

    const labelStyle = {
        display: "block",
        marginBottom: "5px",
        paddingLeft: "10px",
    };

    const variantLabel = variant === 'swap' ? '(얼굴합성)' : '(원본)';

    const username = variant === 'swap' ? 'p' : 'o';
    const roomname = variant === 'swap' ? 'personalized' : 'original';

    const emoji = place === '뉴욕' ? '🗽' : '🥐';

    const sightGuide = place === '뉴욕' ? 'https://harvest-wool-819.notion.site/2501f2c49ce080cbabd4fabe6b777efe?source=copy_link' :
                                'https://harvest-wool-819.notion.site/2501f2c49ce0801ca928f43fe0fac9f4?source=copy_link';
    const accomoGuide = place === '뉴욕' ? 'https://harvest-wool-819.notion.site/2501f2c49ce080519d0ffdf39083aea7?source=copy_link' :
                                'https://harvest-wool-819.notion.site/2501f2c49ce080f78a4ce6ab3b723e49?source=copy_link';
    const foodGuide = place === '뉴욕' ? 'https://harvest-wool-819.notion.site/2501f2c49ce08025a0c1fc94307d9d5f?source=copy_link' :
                                'https://harvest-wool-819.notion.site/2501f2c49ce080559bcde35e6c6de4e6?source=copy_link';


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
                1차 실험 설문지 "{place}" (1/2) 자유 대화 <span style={{ color: '#666', fontSize: '0.9em', marginLeft: '6px' }}>{variantLabel}</span>
            </h2>
            <p style={{ fontSize: '16px', color: '#555', backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '5px' }}>
                첫번째 실험으로, 특정 주제에 따라 자유대화를 진행합니다. <br/>
                각 대화에서는 주어진 주제에 따라 친구와 <b>질문과 답변을 주고받으며 자유롭게 대화</b>하게 됩니다.
                <br/><br/>
                대화는 <b>설문지에 존재하는 자료를 참고</b>하여 대화를 이어나가 주시길 바랍니다.
                대화 중에는 제공된 GIF 이미지 세트를 자유롭게 활용할 수 있으며,<br/>
                대화의 흐름 속에서 원활한 실험 진행을 위해 <b>각 세션에서 GIF를 최소 3번 이상 활용</b>해 주시면,
                대화가 더욱 풍부해질 수 있습니다!
                <br/><br/>
                주어진 목표를 바탕으로 자연스럽게 대화를 이어가 주세요.<br/>
                대화가 끝난 후에는, 해당 경험을 바탕으로 <b>당신의 주관적인 인식과 느낌에 대한 설문</b>에 응답해 주시기 바랍니다. <br/>

                실험 내용 확인이 되었다면, 다음 순서로 실험을 준비해 주세요 😊 
                <br/><br/>
                1. 다음 <a
                        href="http://chlee.postech.ac.kr:8065/login?id=np5nrxhfsjypt8cptqsyay4mwr&md=link&sbr=fa"
                        target="_blank"
                        rel="noopener noreferrer"
                        >링크</a>
                    에 들어가 창을 띄우고, 명시된 Username과 password를 쳐주세요 <br/>
                &nbsp;&nbsp;&nbsp;Username : subject{userId}{username}<br/>
                &nbsp;&nbsp;&nbsp;Password : subject{userId}{username}<br/>
                2. 로그인을 했다면, 왼쪽 사이드바에서 채팅방 이름에 <b>'{roomname}'</b>이 붙은 방으로 들어가 주세요<br/>
                3. 이제 <b>채팅 전용 사이트(방금 연 사이트)와</b>, <b>현재 설문용 사이트</b>를 양쪽에 세팅해 놓고 대화할 준비를 해주세요<br/>
                4. 대화 준비가 되었다면, 방금 들어온 채팅방에  <b>'준비 되었습니다'</b>를 쳐주세요 🥳
            </p>
            <br/><br/>
                <h2 style={{ textAlign: 'left', color: '#333', borderBottom: '2px solid #ddd', paddingBottom: '10px' }}>
                    {emoji} 단 하루로 완성하는 <span style={{ backgroundColor: '#ffe066', fontWeight: 'bold' }}>{place}</span> 여행 설계
                </h2>
                <p style={{ fontSize: '16px', color: '#555', backgroundColor: '#f0f8ff', padding: '20px', borderRadius: '5px', marginTop: '20px' }}>
                    당신과 친구에게 <b>단 하루뿐인 <span style={{ backgroundColor: '#ffe066', fontWeight: 'bold' }}>{place}</span> 여행</b>이 주어졌습니다.
                    <br/><br/>
                    이번 대화에서는 <b>'<span style={{ backgroundColor: '#ffe066', fontWeight: 'bold' }}>{place}</span> 여행 가이드' 자료</b>를 기반으로, 여행지에서 할 수 있는 <b>관광지/숙소/식사를 추천하고,</b><br/>
                    서로의 <b>취향과 관심사</b>를 바탕으로 <b>어떤 장소와 활동이 좋을지 자유롭게 이야기해보세요.</b>
                    <br/><br/>    
                    대화의 목표는 다음 세 가지 조건을 만족하며 <b>여행 일정을 함께 구성하는 것</b>입니다:
                    <br/><br/>
                    1. 실제 본인의 경험이나 관심사를 기반으로 장소나 활동을 제안할 것
                    <br/>
                    2. 친구와 함께 <b>서로 의견을 주고받으며</b> 관광지/숙소/먹을거리를 결정할 것 (각각 1개씩)
                    <br/>
                    3. 선택이 확정되면, 해당 설문지에 관광지/숙소/먹을거리 별 <b>최종 결정 내용과 함께
                    위에서 논의한 선택 이유</b>를 입력 해주세요. <br/>
                    &nbsp;&nbsp;&nbsp;둘다 동일한 내용을 적으시면 됩니다. <br/>
                    ** 대화 가이드 용이므로, 부담없이 적으시면 됩니다
                    <br/><br/>
                    대화 중에는 <span style = {{color: '#B60000', fontWeight: 'bold'}}>제공된 GIF를 최소 세 번 이상</span> 사용해 감정이나 상황을 생생하게 표현해 주세요
                    <br/><br/>

                    ⏱️ <span style = {{color: '#B60000', fontWeight: 'bold'}}>대화 시간은 최대 20분이며</span>, 그 안에서 자유롭게 계획을 완성해 주세요.
                </p>
                {[
                    {
                        key: `pre_a1_${place}`,
                        label: "1. [관광지 계획] 상대방과 함께 갈 관광지는 무엇인가요?",
                    },
                    {
                        key: `pre_a2_${place}`,
                        label: "2. [관광지 계획] 해당 관광지를 선택한 이유는 무엇인가요? (*자신의 관심사, 경험, 친구와의 상의 등을 바탕으로 작성)",
                    },
                    {
                        key: `pre_a3_${place}`,
                        label: "3. [숙소 계획]  상대방과 함께 묵을 숙소는 어디인가요?",
                    },
                    {
                        key: `pre_a4_${place}`,
                        label: "4. [숙소 계획] 해당 숙소를 선택한 이유는 무엇인가요? (*자신의 관심사, 경험, 친구와의 상의 등을 바탕으로 작성)",
                    },
                    {
                        key: `pre_a5_${place}`,
                        label: "5. [식사 계획] 상대방과 함께 할 식사 장소와 메뉴는 무엇인가요?",
                    },
                    {
                        key: `pre_a6_${place}`,
                        label: "6. [식사 계획] 해당 식사 장소와 메뉴를 선택한 이유는 무엇인가요? (*자신의 관심사, 경험, 친구와의 상의 등을 바탕으로 작성)",
                    },
                ].map(({ key, label }, idx) => (
                    <React.Fragment key={key}>
                        {/* 카테고리 구간마다 정보 링크 배너 삽입 */}
                        {key === `pre_a1_${place}` && <GuideBanner href={sightGuide} label={`${place} 관광지 정보`} />}
                        {key === `pre_a3_${place}` && <GuideBanner href={accomoGuide} label={`${place} 숙소 정보`} />}
                        {key === `pre_a5_${place}` && <GuideBanner href={foodGuide} label={`${place} 식사 정보`} />}

                        <div style={{ marginTop: "8px", color: "#555" }}>
                            <label htmlFor={key} style={labelStyle}>
                            {label}
                            </label>
                            <br />
                            <input
                            type="text"
                            id={key}
                            name={key}
                            value={formData[key]}
                            onChange={handleChange}
                            style={{
                                width: "30%",
                                padding: "8px",
                                marginLeft: "20px",
                                boxSizing: "border-box",
                            }}
                            />
                        </div>
                    </React.Fragment>                
            ))}

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

export default StudyAFreeChatScreen;
