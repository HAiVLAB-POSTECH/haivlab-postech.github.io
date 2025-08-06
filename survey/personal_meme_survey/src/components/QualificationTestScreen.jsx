import React, { useState, useEffect } from 'react';
import testImage from '/src/assets/test_image.png';

const statements = {
  s0: {
    statement: "The value increased from 1940 to 1980.",
    isTrue: false
  },
  s1: {
    statement: "The value reached its maximum in 1960.",
    isTrue: true
  },
  s2: {
    statement: "The value in 1900 was 5.",
    isTrue: true
  },
  s3: {
    statement: "The value in 2000 is smaller than the value in 1900",
    isTrue: true
  },
  s4: {
    statement: "The value drop between 1960 and 1980 is smaller than the value drop between 1980 and 2000.",
    isTrue: false
  },
  s5: {
    statement: "The highest value ever reached was 13.",
    isTrue: true
  },
  s6: {
    statement: "The lowest value ever reached was 5.",
    isTrue: false
  },
  s7: {
    statement: "The value started decreasing in 1940.",
    isTrue: false
  },
  s8: {
    statement: "The steepest decrease was between 1960 and 1980.",
    isTrue: true
  },
  s9: {
    statement: "The increment in value between 1940 and 1960 is 4.",
    isTrue: false
  },
  s10: {
    statement: "The steepest increase was between 1920 and 1940",
    isTrue: true
  },
  s11: {
    statement: "The value in 1980 was equal to the value in 1900.",
    isTrue: false
  },
  s12: {
    statement: "The value reached its minimum in 2000.",
    isTrue: true
  },
  s13: {
    statement: "The values shown in the chart are between 1 and 13.",
    isTrue: true
  },
  s14: {
    statement: "The chart shows values observed between 1900 and 2000.",
    isTrue: true
  }
};

function getRandomStatements(obj, count) {
  const keys = Object.keys(obj);
  const shuffled = keys.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function QualificationTestScreen({ onNext }) {
  const [quizStatements, setQuizStatements] = useState([]);
  // 사용자가 체크한 항목들을 관리 (문항 id를 key로)
  const [answers, setAnswers] = useState({});
  // 정답이 아닐 경우 사용을 차단하기 위한 상태
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    const randomKeys = getRandomStatements(statements, 5);
    const randomStatements = randomKeys.map(key => ({
      id: key,
      ...statements[key]
    }));
    setQuizStatements(randomStatements);
  }, []);

  const handleCheckboxChange = (id) => {
    setAnswers(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleNext = () => {
    // 각 문항에 대해 사용자의 선택이 실제 정답과 일치하는지 평가
    const allCorrect = quizStatements.every(
      q => (answers[q.id] || false) === q.isTrue
    );
    if (allCorrect) {
      onNext();
    } else {
      setAccessDenied(true);
    }
  };

  if (accessDenied) {
    return (
      <div
        style={{
          textAlign: 'center',
          marginTop: '50px',
          //   color: 'red',
          fontFamily: 'Arial, sans-serif'
        }}
      >
        <h1>Sorry, you cannot participate in this survey.</h1>
        <p>Unfortunately, you did not pass the qualification test, so you are not eligible to continue.</p>
        <p>
          We appreciate your interest and hope you can participate in future studies.
          Thank you for your understanding.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '30px auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        lineHeight: '1.6',
        // color: '#555',
        // background: '#f9f9f9',
        // borderRadius: '10px',
        // boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
      }}
    >
      <h2
        style={{
          textAlign: 'left',
          color: '#333',
          borderBottom: '2px solid #ddd',
          paddingBottom: '10px',
          marginBottom: '20px'
        }}
      >
        Qualification Test
      </h2>

      <p style={{ marginBottom: '20px', textAlign: 'left' }}>
        Select all statements that are true (there can be 0-5, inclusive):
      </p>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img
          src={testImage}
          alt="Test"
          style={{
            maxWidth: '600px',
            width: '100%',
            userSelect: 'none',
            pointerEvents: 'none',
            border: '1px solid #ddd',
            borderRadius: '8px'
          }}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
        />
      </div>

      <div style={{ marginLeft: '20px', marginTop: '10px' }}>
        <form>
          {quizStatements.map(item => (
            <div key={item.id} style={{ marginBottom: '15px' }}>
              <label style={{ fontSize: '16px', display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  checked={answers[item.id] || false}
                  onChange={() => handleCheckboxChange(item.id)}
                  style={{ marginRight: '10px' }}
                />
                {item.statement}
              </label>
            </div>
          ))}
        </form>
      </div>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button
          onClick={handleNext}
        //   style={{
        //     padding: '12px 30px',
        //     fontSize: '18px',
        //     background: '#28a745',
        //     color: '#fff',
        //     border: 'none',
        //     borderRadius: '5px',
        //     cursor: 'pointer'
        //   }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default QualificationTestScreen;
