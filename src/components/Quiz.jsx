import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions, personalityTypes } from '../data/quizData';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState({
    soulSeeker: 0,
    pleasureSeeker: 0,
    connector: 0,
    wanderer: 0,
    explorer: 0,
    comfortKeeper: 0,
    architect: 0,
    flowWalker: 0
  });
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [history, setHistory] = useState([]); // Stack of { scores, selectedOptions }
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
    const newHistory = [...history, { scores, selectedOptions: [option] }];
    setHistory(newHistory);
    setScores(newScores);
    moveToNext(newScores, newHistory);
  };

  const calculateNewScores = (currentScores, selectedOptionsList) => {
    const newScores = { ...currentScores };
    const weight = currentQuestion.weight || 1.0;

    selectedOptionsList.forEach(option => {
      if (option.impact) {
        Object.keys(option.impact).forEach(side => {
          newScores[side] += (option.impact[side] * weight);
        });
      }
    });
    return newScores;
  };

  const moveToNext = (finalScores, finalHistory) => {
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOptions([]);
      }, 300);
    } else {
      finishQuiz(finalScores, finalHistory);
    }
  };

  const handleNextClick = () => {
    const newScores = calculateNewScores(scores, selectedOptions);
    const newHistory = [...history, { scores, selectedOptions }];
    setHistory(newHistory);
    setScores(newScores);
    moveToNext(newScores, newHistory);
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0 && history.length > 0) {
      const prevStep = history[history.length - 1];
      const newHistory = history.slice(0, -1);

      setScores(prevStep.scores);
      // For multi-select, we might want to keep the selection, 
      // but for single select it's better to reset or show what was picked.
      // Let's restore the selection.
      setSelectedOptions(prevStep.selectedOptions);
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setHistory(newHistory);
    }
  };

  const finishQuiz = (finalScores, finalHistory) => {
    // 1. Determine the winning side for each dimension
    const getWinner = (sideA, sideB, dimension) => {
      if (finalScores[sideA] > finalScores[sideB]) return sideA;
      if (finalScores[sideB] > finalScores[sideA]) return sideB;

      // Tie-breaking logic: Q9 > Q5–Q8 > Q1–Q4 > Q10/Q11/Q12
      // We check the history to see which side was picked in higher-weight questions
      const tieBreakOrder = [9, 5, 6, 7, 8, 1, 2, 3, 4, 10, 11, 12];

      for (const qId of tieBreakOrder) {
        const step = finalHistory.find((h, idx) => questions[idx].id === qId);
        if (step) {
          const pickedInStep = step.selectedOptions.some(opt => opt.impact && opt.impact[sideA]);
          if (pickedInStep) return sideA;
          const pickedBInStep = step.selectedOptions.some(opt => opt.impact && opt.impact[sideB]);
          if (pickedBInStep) return sideB;
        }
      }

      // Final default: Phase 2 (image) choice for that dimension
      const phase2Map = {
        selfExpansion: 5,
        placeResonance: 6,
        openness: 7,
        structuration: 8
      };
      const p2Step = finalHistory.find((h, idx) => questions[idx].id === phase2Map[dimension]);
      if (p2Step) {
        const pickedA = p2Step.selectedOptions.some(opt => opt.impact && opt.impact[sideA]);
        return pickedA ? sideA : sideB;
      }

      return sideA; // Absolute fallback
    };

    const winners = {
      selfExpansion: getWinner('soulSeeker', 'pleasureSeeker', 'selfExpansion'),
      placeResonance: getWinner('connector', 'wanderer', 'placeResonance'),
      openness: getWinner('explorer', 'comfortKeeper', 'openness'),
      structuration: getWinner('architect', 'flowWalker', 'structuration')
    };

    // 2. Map winners to result key
    // Mapping table from doc:
    // High Self-Expansion (Soul Seeker)
    // Soul Seeker + Connector + Explorer + Architect → Soul Pilgrim
    // Soul Seeker + Connector + Explorer + Flow Walker → Wandering Poet
    // Soul Seeker + Wanderer + Comfort Keeper + Architect → Inner Guardian
    // Soul Seeker + Wanderer + Explorer + Flow Walker → Dream Walker
    // Soul Seeker + Connector + Comfort Keeper + Architect → Silent Philosopher
    // Soul Seeker + Connector + Comfort Keeper + Flow Walker → Mindful Artisan
    // Soul Seeker + Wanderer + Explorer + Architect → Insight Scholar
    // Soul Seeker + Wanderer + Comfort Keeper + Flow Walker → Spirit Nomad

    // Low Self-Expansion (Pleasure Seeker)
    // Pleasure Seeker + Connector + Explorer + Flow Walker → Festival Mover
    // Pleasure Seeker + Connector + Explorer + Architect → Urban Adventurer
    // Pleasure Seeker + Connector + Comfort Keeper + Architect → Heritage Keeper
    // Pleasure Seeker + Connector + Comfort Keeper + Flow Walker → Serene Bonvivant
    // Pleasure Seeker + Wanderer + Explorer + Architect → Solo Observer
    // Pleasure Seeker + Wanderer + Explorer + Flow Walker → Gentle Drifter
    // Pleasure Seeker + Wanderer + Comfort Keeper + Flow Walker → Calm Drifter
    // Pleasure Seeker + Wanderer + Comfort Keeper + Architect → Classic Planner

    const mapping = {
      'soulSeeker-connector-explorer-architect': 'Soul Pilgrim',
      'soulSeeker-connector-explorer-flowWalker': 'Wandering Poet',
      'soulSeeker-wanderer-comfortKeeper-architect': 'Inner Guardian',
      'soulSeeker-wanderer-explorer-flowWalker': 'Dream Walker',
      'soulSeeker-connector-comfortKeeper-architect': 'Silent Philosopher',
      'soulSeeker-connector-comfortKeeper-flowWalker': 'Mindful Artisan',
      'soulSeeker-wanderer-explorer-architect': 'Insight Scholar',
      'soulSeeker-wanderer-comfortKeeper-flowWalker': 'Spirit Nomad',
      'pleasureSeeker-connector-explorer-flowWalker': 'Festival Mover',
      'pleasureSeeker-connector-explorer-architect': 'Urban Adventurer',
      'pleasureSeeker-connector-comfortKeeper-architect': 'Heritage Keeper',
      'pleasureSeeker-connector-comfortKeeper-flowWalker': 'Serene Bonvivant',
      'pleasureSeeker-wanderer-explorer-architect': 'Solo Observer',
      'pleasureSeeker-wanderer-explorer-flowWalker': 'Gentle Drifter',
      'pleasureSeeker-wanderer-comfortKeeper-flowWalker': 'Calm Drifter',
      'pleasureSeeker-wanderer-comfortKeeper-architect': 'Classic Planner'
    };

    const resultKey = `${winners.selfExpansion}-${winners.placeResonance}-${winners.openness}-${winners.structuration}`;
    const archetype = mapping[resultKey];

    // Find the personality type object by name
    const result = Object.values(personalityTypes).find(type => type.name === archetype) || personalityTypes['high-high-high-high'];

    navigate('/result', { state: { result, scores: finalScores, winners } });
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
            <div className="header-left">
              {currentQuestionIndex > 0 && (
                <button className="back-button" onClick={handleBack}>
                  <ArrowLeft size={20} /> <span>Back</span>
                </button>
              )}
            </div>
            <div className="header-right">
              <span className="phase-tag">{getPhase()}</span>
              <div className="question-number">
                {currentQuestionIndex + 1} / {questions.length}
              </div>
            </div>
          </div>

          <h2 className="question-text">{currentQuestion.text}</h2>
          {currentQuestion.subtext && (
            <p className="question-subtext">{currentQuestion.subtext}</p>
          )}

          <div className="options-grid">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedOptions.find(o => o.id === option.id);
              return (
                <button
                  key={index}
                  className={`option-card ${currentQuestion.type === 'image' ? 'image-option' : ''} ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleOptionClick(option)}
                >
                  {currentQuestion.type === 'image' && (
                    <div className="option-image-wrapper">
                      <div className="media-placeholder">
                        <p>[Image {option.id} Placeholder]</p>
                      </div>
                    </div>
                  )}
                  <div className="option-content">
                    <div className="option-text">{option.text}</div>
                    {!currentQuestion.multiSelect && currentQuestion.type !== 'image' && (
                      <div className="option-arrow">
                        <ArrowRight size={20} />
                      </div>
                    )}
                    {currentQuestion.multiSelect && isSelected && (
                      <div className="option-check">✓</div>
                    )}
                  </div>
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
          min-height: 40px;
        }

        .header-left {
          display: flex;
          align-items: center;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .back-button {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          color: var(--color-text-secondary);
          cursor: pointer;
          font-family: var(--font-body);
          font-size: 0.9rem;
          padding: 8px 0;
          transition: color 0.2s ease;
        }

        .back-button:hover {
          color: var(--color-accent-terracotta);
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
          grid-template-columns: 1fr;
        }

        .quiz-card:has(.image-option) .options-grid {
          grid-template-columns: 1fr 1fr;
        }

        @media (max-width: 600px) {
          .quiz-card:has(.image-option) .options-grid {
            grid-template-columns: 1fr;
          }
        }

        .option-card {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          padding: 0;
          background-color: #fff;
          border: 2px solid rgba(74, 59, 50, 0.1);
          border-radius: var(--border-radius-md);
          text-align: left;
          transition: all 0.2s ease;
          cursor: pointer;
          overflow: hidden;
        }

        .option-card:not(.image-option) {
          flex-direction: row;
          align-items: center;
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

        .option-image-wrapper {
          width: 100%;
          aspect-ratio: 16 / 9;
        }

        .option-image-wrapper .media-placeholder {
          height: 100%;
          margin-bottom: 0;
          border-radius: 0;
          border: none;
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }

        .option-content {
          padding: 24px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex: 1;
          width: 100%;
        }

        .option-text {
          flex: 1;
          font-size: 1.1rem;
          font-family: var(--font-body);
          color: var(--color-text-primary);
          line-height: 1.4;
        }

        .option-check {
          color: var(--color-accent-terracotta);
          font-weight: bold;
          font-size: 1.2rem;
          margin-left: 12px;
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
