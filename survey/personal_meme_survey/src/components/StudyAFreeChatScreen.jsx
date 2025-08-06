import React, { useState } from "react";

function StudyAFreeChatScreen({ onNext,  setDemoData}) {
    const [formData, setFormData] = useState({
        knownPeriod: "",
        a1: "",
        a2: "",
        a3: "",
        a4: "",
        a5: "",
        a6: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const isFormValid =
        formData.knownPeriod !== "" &&
        formData.a1.trim() !== "" &&
        formData.a2.trim() !== "" &&
        formData.a3 !== "" &&
        formData.a4 !== "" &&
        formData.a5 !== "" &&
        formData.a6 !== "";

    // "Next" 버튼 클릭 시 App으로 폼 데이터 전달
    const handleNext = () => {
        if (!isFormValid) return;
        // App.jsx에서 만들어둔 demoData에 이 값이 저장됨
        setDemoData(formData);
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
                1차 실험 설문지 (1/2) 자유 대화
            </h2>
            <p style={{ fontSize: '16px', color: '#555', backgroundColor: '#f0f8ff', padding: '20px', borderRadius: '5px', marginTop: '20px' }}>
                여러분은 두 번의 대화를 경험하게 됩니다. <br/>
                각 대화에서는 주어진 주제에 따라 친구와 <b>질문과 답변을 주고받으며 자유롭게 대화</b>하게 됩니다.
                <br/><br/>
                대화는 <b>사전에 배포된 자료를 참고</b>하여 대화를 이어나가 주시길 바랍니다.
                대화 중에는 제공된 GIF 이미지 세트를 자유롭게 활용할 수 있으며,<br/>
                대화의 흐름 속에서 원활한 실험 진행을 위해 <b>각 세션에서 GIF를 최소 3번 이상 활용</b>해 주시면,
                대화가 더욱 풍부해질 수 있습니다!
                <br/><br/>
                주어진 목표를 바탕으로 자연스럽게 대화를 이어가 주세요.<br/>
                대화가 끝난 후에는, 해당 경험을 바탕으로 <b>당신의 주관적인 인식과 느낌에 대한 설문</b>에 응답해 주시기 바랍니다.</p>
            {/* <br/> */}

            {/* Known period */}
            <div style={{ marginTop: "20px", color: "#555" }}>
                <p>상대방과 알고 지낸 기간은 얼마나 되었나요?</p>
                {[
                    "6개월 미만",
                    "6개월 이상 1년 미만",
                    "1년 이상 2년 미만",
                    "2년 이상 5년 미만",
                    "5년 이상"
                ].map((option) => (
                    <label key={option} style={labelStyle}>
                        <input
                            type="radio"
                            name="knownPeriod"
                            value={option}
                            checked={formData.knownPeriod === option}
                            onChange={handleChange}
                        />{" "}
                        {option}
                    </label>
                ))}
            </div>


            <h2 style={{ textAlign: 'left', color: '#333', borderBottom: '2px solid #ddd', paddingBottom: '10px' }}>
                🗽 단 하루로 완성하는 뉴욕 여행 설계
            </h2>
            <p style={{ fontSize: '16px', color: '#555', backgroundColor: '#f0f8ff', padding: '20px', borderRadius: '5px', marginTop: '20px' }}>
                당신과 친구에게 <b>단 하루뿐인 뉴욕 여행</b>이 주어졌습니다.
                <br/><br/>
                이번 대화에서는 <b>'뉴욕 여행 가이드' 자료</b>를 기반으로, 여행지에서 할 수 있는 <b>관광지/액티비티/식사를 추천하고,</b><br/>
                서로의 <b>취향과 관심사</b>를 바탕으로 <b>어떤 장소와 활동이 좋을지 자유롭게 이야기해보세요.</b>
                <br/><br/>    
                대화의 목표는 다음 세 가지 조건을 만족하며 <b>여행 일정을 함께 구성하는 것</b>입니다:
                <br/><br/>
                1. 실제 본인의 경험이나 관심사를 기반으로 장소나 활동을 제안할 것
                <br/>
                2. 친구와 함께 서로 의견을 주고받으며 관광지/액티비티/식사를 결정할 것 (각각 1개씩)
                <br/>
                3. 선택이 확정되면, 해당 설문지에 관광지/액티비티/식사 별 최종 결정 내용과 함께
                위에서 논의한 선택 이유와 구체적 계획을 입력 해주세요
                <br/><br/>
                대화 중에는 제공된 GIF를 최소 세 번 이상 사용해 감정이나 상황을 생생하게 표현해 주세요
                <br/><br/>

                ⏱️ 대화 시간은 최대 30분이며, 그 안에서 자유롭게 계획을 완성해 주세요.
            </p>
            {/* <br/> */}


            {/* Q1 */}
            <div style={{ marginTop: "20px", color: "#555" }}>
                <label htmlFor="a1">1. [관광지 계획] 상대방과 함께 갈 관광지는 무엇인가요?</label>
                <br />
                <input
                    type="text"
                    id="a1"
                    name="a1"
                    value={formData.a1}
                    onChange={handleChange}
                    style={{
                        width: "30%",
                        padding: "8px",
                        marginLeft: "20px",
                        marginTop: "5px",
                        boxSizing: "border-box",
                    }}
                />
            </div>

            {/* Q2 */}
            <div style={{ marginTop: "20px", color: "#555" }}>
                <label htmlFor="a2">2. [관광지 계획] 해당 관광지를 선택한 이유는 무엇인가요?
                (*자신의 관심사, 경험, 친구와의 상의 등을 바탕으로 작성)</label>
                <br />
                <input
                    type="text"
                    id="a2"
                    name="a2"
                    value={formData.a2}
                    onChange={handleChange}
                    style={{
                        width: "30%",
                        padding: "8px",
                        marginLeft: "20px",
                        marginTop: "5px",
                        boxSizing: "border-box",
                    }}
                />
            </div>

            {/* Q3 */}
            <div style={{ marginTop: "20px", color: "#555" }}>
                <label htmlFor="a3">3. [액티비티 계획]  상대방과 함께 할 액티비티는 무엇인가요?</label>
                <br />
                <input
                    type="text"
                    id="a3"
                    name="a3"
                    value={formData.a3}
                    onChange={handleChange}
                    style={{
                        width: "30%",
                        padding: "8px",
                        marginLeft: "20px",
                        marginTop: "5px",
                        boxSizing: "border-box",
                    }}
                />
            </div>

            {/* Q4 */}
            <div style={{ marginTop: "20px", color: "#555" }}>
                <label htmlFor="a4">4. [액티비티 계획] 해당 액티비티를 선택한 이유는 무엇인가요?
                (*자신의 관심사, 경험, 친구와의 상의 등을 바탕으로 작성)</label>
                <br />
                <input
                    type="text"
                    id="a4"
                    name="a4"
                    value={formData.a4}
                    onChange={handleChange}
                    style={{
                        width: "30%",
                        padding: "8px",
                        marginLeft: "20px",
                        marginTop: "5px",
                        boxSizing: "border-box",
                    }}
                />
            </div>

            {/* Q5 */}
            <div style={{ marginTop: "20px", color: "#555" }}>
                <label htmlFor="a3">5. [식사 계획] 상대방과 함께 할 식사 장소와 메뉴는 무엇인가요?</label>
                <br />
                <input
                    type="text"
                    id="a5"
                    name="a5"
                    value={formData.a5}
                    onChange={handleChange}
                    style={{
                        width: "30%",
                        padding: "8px",
                        marginLeft: "20px",
                        marginTop: "5px",
                        boxSizing: "border-box",
                    }}
                />
            </div>

            {/* Q5 */}
            <div style={{ marginTop: "20px", color: "#555" }}>
                <label htmlFor="a6">6. [식사 계획] 해당 식사 장소와 메뉴를 선택한 이유는 무엇인가요?
(*자신의 관심사, 경험, 친구와의 상의 등을 바탕으로 작성)</label>
                <br />
                <input
                    type="text"
                    id="a6"
                    name="a6"
                    value={formData.a6}
                    onChange={handleChange}
                    style={{
                        width: "30%",
                        padding: "8px",
                        marginLeft: "20px",
                        marginTop: "5px",
                        boxSizing: "border-box",
                    }}
                />
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

export default StudyAFreeChatScreen;
