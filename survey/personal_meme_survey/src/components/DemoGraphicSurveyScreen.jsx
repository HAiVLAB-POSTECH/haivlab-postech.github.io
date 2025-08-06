import React, { useState } from "react";

function DemoGraphicSurveyScreen({ onNext, setDemoData, isFetchingImages }) {
    const [formData, setFormData] = useState({
        prolificId: "",
        age: "",
        gender: "",
        education: "",
        familiarity: "",
        newsReadingFrequency: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const isFormValid =
        formData.prolificId.trim() !== "" &&
        formData.age.trim() !== "" &&
        formData.gender !== "" &&
        formData.education !== "" &&
        formData.familiarity !== "" &&
        formData.newsReadingFrequency !== "";

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
                maxWidth: "800px",
                height: "100%",
                marginTop: "30px",
                fontFamily: "Arial, sans-serif",
                lineHeight: "1.6",
                textAlign: "left",
            }}
        >
            <h2 style={{ textAlign: "left", color: "#333", borderBottom: "2px solid #ddd", paddingBottom: "10px" }}>
                Demographic Survey
            </h2>

            {/* Prolific ID */}
            <div style={{ marginTop: "20px", color: "#555" }}>
                <label htmlFor="prolificId">a. What is your Prolific ID?</label>
                <br />
                <input
                    type="text"
                    id="prolificId"
                    name="prolificId"
                    value={formData.prolificId}
                    onChange={handleChange}
                    placeholder="Enter your Prolific ID"
                    style={{
                        width: "30%",
                        padding: "8px",
                        marginLeft: "20px",
                        marginTop: "5px",
                        boxSizing: "border-box",
                    }}
                />
            </div>

            {/* Age */}
            <div style={{ marginTop: "20px", color: "#555" }}>
                <label htmlFor="age">b. What is your age?</label>
                <br />
                <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Digits only"
                    style={{
                        width: "30%",
                        padding: "8px",
                        marginLeft: "20px",
                        marginTop: "5px",
                        boxSizing: "border-box",
                    }}
                />
            </div>

            {/* Gender */}
            <div style={{ marginTop: "20px", color: "#555" }}>
                <p>c. What is your gender?</p>
                {["Male", "Female", "Non-binary / Third gender", "Prefer not to say"].map((option) => (
                    <label key={option} style={labelStyle}>
                        <input
                            type="radio"
                            name="gender"
                            value={option}
                            checked={formData.gender === option}
                            onChange={handleChange}
                        />{" "}
                        {option}
                    </label>
                ))}
            </div>

            {/* Education */}
            <div style={{ marginTop: "20px", color: "#555" }}>
                <p>d. What is the highest degree or level of school you have completed?</p>
                {[
                    "Less than a high school diploma",
                    "High school graduate, diploma or the equivalent (e.g. GED)",
                    "Some college credit, no degree",
                    "Associate degree",
                    "Bachelor’s degree",
                    "Master’s degree",
                    "Professional degree",
                    "Doctorate degree",
                ].map((option) => (
                    <label key={option} style={labelStyle}>
                        <input
                            type="radio"
                            name="education"
                            value={option}
                            checked={formData.education === option}
                            onChange={handleChange}
                        />{" "}
                        {option}
                    </label>
                ))}
            </div>

            {/* Familiarity with Charts */}
            <div style={{ marginTop: "20px", color: "#555" }}>
                <p>e. How familiar are you with interpreting and using charts, graphs, or information graphics?</p>
                <div style={{ marginLeft: "20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", maxWidth: "400px", marginTop: "10px" }}>
                        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                            <label key={num} style={{ textAlign: "center" }}>
                                <input
                                    type="radio"
                                    name="familiarity"
                                    value={num}
                                    checked={formData.familiarity === String(num)}
                                    onChange={handleChange}
                                    style={{ display: "block", margin: "0 auto" }}
                                />
                                {num}
                            </label>
                        ))}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", maxWidth: "400px", marginTop: "5px" }}>
                        <span style={{ fontSize: "12px" }}>Not at all</span>
                        <span style={{ fontSize: "12px" }}>Extremely familiar</span>
                    </div>
                </div>
            </div>

            {/* Frequency of reading news */}
            <div style={{ marginTop: "20px", color: "#555" }}>
                <p>f. How often do you read the news articles?</p>
                {[
                    "Several times a day",
                    "Once a day",
                    "Several times a week",
                    "Once a week",
                    "Few times or once a month",
                    "Less than once a month",
                    "Never",
                ].map((option) => (
                    <label key={option} style={labelStyle}>
                        <input
                            type="radio"
                            name="newsReadingFrequency"
                            value={option}
                            checked={formData.newsReadingFrequency === option}
                            onChange={handleChange}
                        />{" "}
                        {option}
                    </label>
                ))}
            </div>

            {/* Next Button */}
            <div style={{ textAlign: "center", marginTop: "30px", marginBottom: "50px", paddingBottom: "50px" }}>
                <button
                    onClick={handleNext}
                    disabled={!isFormValid || isFetchingImages}
                >
                    {isFetchingImages ? "Please Wait..." : "Next"}
                </button>
            </div>
        </div>
    );
}

export default DemoGraphicSurveyScreen;
