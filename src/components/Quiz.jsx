import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions, personalityTypes } from '../data/quizData';
import { ArrowRight } from 'lucide-react';

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState({
    selfExpansion: 0,
    placeResonance: 0,
    openness: 0,
    structuration: 0
  });
  const [selectedOptions, setSelectedOptions] = useState([]);
  const navigate = useNavigate();

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleOptionClick = (option) => {
    if (currentQuestion.multiSelect) {
      // Toggle selection
      const isSelected = selectedOptions.find(o => o.id === option.id);
      if (isSelected) {
        setSelectedOptions(selectedOptions.filter(o => o.id !== option.id));
      } else {
        if (selectedOptions.length < (currentQuestion.maxSelect || 1)) {
          setSelectedOptions([...selectedOptions, option]);
        }
      }
      return;
    }

    // Single select logic
    const newScores = calculateNewScores(scores, [option]);
    setScores(newScores);
    moveToNext(newScores);
  };

  const calculateNewScores = (currentScores, selectedOptionsList) => {
    const newScores = { ...currentScores };
    selectedOptionsList.forEach(option => {
      if (option.value) {
        const dimension = currentQuestion.dimension;
        if (option.value === 'high') {
          newScores[dimension] += 1;
        } else {
          newScores[dimension] -= 1;
        }
      } else if (option.impact) {
        Object.keys(option.impact).forEach(dim => {
          newScores[dim] += option.impact[dim];
        });
      }
    });
    return newScores;
  };

  const moveToNext = (finalScores) => {
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOptions([]);
      }, 300);
    } else {
      finishQuiz(finalScores);
    }
  };

  const handleNextClick = () => {
    const newScores = calculateNewScores(scores, selectedOptions);
    setScores(newScores);
    moveToNext(newScores);
  };

  const finishQuiz = (finalScores) => {
    const dimensions = ['selfExpansion', 'placeResonance', 'openness', 'structuration'];
    const resultKey = dimensions.map(dim => finalScores[dim] > 0 ? 'high' : 'low').join('-');
    const result = personalityTypes[resultKey] || personalityTypes['high-high-high-high'];

    navigate('/result', { state: { result } });
  };

  const getPhase = () => {
    if (currentQuestionIndex < 4) return "Phase 1 · Rational Orientation";
    if (currentQuestionIndex < 8) return "Phase 2 · Intuitive Projection";
    return "Phase 3 · Integrative & Situational";
  };

  return (
    <div className="quiz-container">
      <div className="quiz-progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="container quiz-content">
        <div className="quiz-card fade-in" key={currentQuestion.id}>
          <div className="quiz-header">
            <span className="phase-tag">{getPhase()}</span>
            <div className="question-number">
              {currentQuestionIndex + 1} / {questions.length}
            </div>
          </div>

          <h2 className="question-text">{currentQuestion.text}</h2>
          {currentQuestion.subtext && (
            <p className="question-subtext">{currentQuestion.subtext}</p>
          )}

          {currentQuestion.type === 'image' && (
            <div className="image-placeholders-grid">
              <div className="placeholder-item">
                <div className="media-placeholder">
                  <p>[Image A Placeholder]</p>
                </div>
                <span className="placeholder-label">Option A</span>
              </div>
              <div className="placeholder-item">
                <div className="media-placeholder">
                  <p>[Image B Placeholder]</p>
                </div>
                <span className="placeholder-label">Option B</span>
              </div>
            </div>
          )}

          <div className="options-grid">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedOptions.find(o => o.id === option.id || (o.text === option.text && !o.id));
              return (
                <button
                  key={index}
                  className={`option-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleOptionClick(option)}
                >
                  <div className="option-text">{option.text}</div>
                  {!currentQuestion.multiSelect && (
                    <div className="option-arrow">
                      <ArrowRight size={20} />
                    </div>
                  )}
                  {currentQuestion.multiSelect && isSelected && (
                    <div className="option-check">✓</div>
                  )}
                </button>
              );
            })}
          </div>

          {currentQuestion.multiSelect && (
            <div className="quiz-actions">
              <button
                className="btn-primary"
                disabled={selectedOptions.length === 0}
                onClick={handleNextClick}
              >
                Continue <ArrowRight size={20} style={{ marginLeft: '8px' }} />
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .quiz-container {
          min-height: 100vh;
          background-color: var(--color-bg-paper);
          padding-top: 80px; /* Header offset */
          display: flex;
          flex-direction: column;
        }

        .quiz-progress-bar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 6px;
          background-color: rgba(0,0,0,0.05);
          z-index: 100;
        }

        .progress-fill {
          height: 100%;
          background-color: var(--color-accent-terracotta);
          transition: width 0.5s ease;
        }

        .quiz-content {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-bottom: 40px;
        }

        .quiz-card {
          background: #fff;
          width: 100%;
          max-width: 700px;
          padding: 60px 40px;
          border-radius: var(--border-radius-lg);
          box-shadow: var(--shadow-card);
          text-align: center;
          border: 1px solid rgba(0,0,0,0.02);
        }

        .quiz-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }

        .phase-tag {
          background-color: var(--color-accent-teal);
          color: #fff;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .question-number {
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-text-secondary);
          font-size: 0.9rem;
          font-weight: 600;
        }

        .question-text {
          font-size: 2rem;
          margin-bottom: 16px;
          color: var(--color-text-primary);
        }

        .question-subtext {
          font-size: 1.1rem;
          color: var(--color-text-secondary);
          margin-bottom: 32px;
          font-style: italic;
        }

        .image-placeholders-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 32px;
        }

        .placeholder-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .placeholder-label {
          font-size: 0.8rem;
          color: var(--color-text-secondary);
          font-weight: 600;
          text-transform: uppercase;
        }

        .media-placeholder {
            background: #f8f8f8;
            border: 1px dashed #ddd;
            padding: 40px 20px;
            border-radius: 8px;
            color: #aaa;
            font-style: italic;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 120px;
        }

        .options-grid {
          display: grid;
          gap: 20px;
        }

        .option-card {
          display: flex;
          align-items: center;
          padding: 24px 32px;
          background-color: #fff;
          border: 2px solid rgba(74, 59, 50, 0.1);
          border-radius: var(--border-radius-md);
          text-align: left;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .option-card:hover {
          border-color: var(--color-accent-terracotta);
          background-color: rgba(192, 108, 84, 0.03);
          transform: translateY(-2px);
        }

        .option-card.selected {
          border-color: var(--color-accent-terracotta);
          background-color: rgba(192, 108, 84, 0.08);
          box-shadow: 0 0 0 1px var(--color-accent-terracotta);
        }

        .option-icon {
          font-size: 2rem;
          margin-right: 24px;
        }

        .option-text {
          flex: 1;
          font-size: 1.2rem;
          font-family: var(--font-body);
          color: var(--color-text-primary);
        }

        .option-arrow {
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.2s ease;
          color: var(--color-accent-terracotta);
        }

        .option-check {
          color: var(--color-accent-terracotta);
          font-weight: bold;
          font-size: 1.2rem;
        }

        .option-card:hover .option-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        .quiz-actions {
          margin-top: 40px;
          display: flex;
          justify-content: center;
        }

        .btn-primary:disabled {
          background-color: #ccc;
          cursor: not-allowed;
          box-shadow: none;
        }
      `}</style>
    </div>
  );
};

export default Quiz;
