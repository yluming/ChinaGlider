import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';

const Result = () => {
  const location = useLocation();
  const result = location.state?.result;

  // If no result is passed, redirect to quiz
  if (!result) {
    return <Navigate to="/quiz" replace />;
  }

  return (
    <div className="result-page">
      <div className="container result-content">
        <div className="result-header text-center fade-in">
          <p className="pre-title">Travel Soul Spectrum Result</p>
          <h1 className="result-title">{result.name}</h1>
          <h2 className="result-subtitle">{result.title}</h2>
        </div>

        <div className="result-card fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="result-illustration">
            <div className="illustration-placeholder">
              <Star size={64} color="#fff" />
            </div>
            <div className="archetype-tag">Archetype</div>
          </div>

          <div className="result-details">
            <blockquote className="result-quote">"{result.quote}"</blockquote>
            <p className="result-description">{result.description}</p>

            <div className="spectrum-breakdown">
              <h3>Your Spectrum Breakdown</h3>
              <div className="spectrum-grid">
                <div className="spectrum-item">
                  <span className="dim-label">Self-Expansion</span>
                  <div className="dim-bar"><div className="dim-fill" style={{ width: '75%' }}></div></div>
                </div>
                <div className="spectrum-item">
                  <span className="dim-label">Place Resonance</span>
                  <div className="dim-bar"><div className="dim-fill" style={{ width: '60%' }}></div></div>
                </div>
                <div className="spectrum-item">
                  <span className="dim-label">Openness</span>
                  <div className="dim-bar"><div className="dim-fill" style={{ width: '85%' }}></div></div>
                </div>
                <div className="spectrum-item">
                  <span className="dim-label">Structuration</span>
                  <div className="dim-bar"><div className="dim-fill" style={{ width: '40%' }}></div></div>
                </div>
              </div>
            </div>

            <div className="recommendation-box">
              <h3>Recommended Experience</h3>
              <p>{result.recommendation}</p>
            </div>

            <div className="action-area">
              <p className="next-step-hint">We've curated a list of spots just for you.</p>
              <Link to="/poi-selection" className="btn-primary">
                Explore Your Experience Pool <ArrowRight size={20} style={{ marginLeft: '8px' }} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .result-page {
          min-height: 100vh;
          padding-top: 100px;
          padding-bottom: 60px;
          background-color: var(--color-bg-paper);
        }

        .pre-title {
          font-family: var(--font-body);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--color-text-secondary);
          margin-bottom: 16px;
        }

        .result-title {
          font-size: 4rem;
          color: var(--color-accent-terracotta);
          margin-bottom: 8px;
        }

        .result-subtitle {
            font-size: 2rem;
            color: var(--color-text-primary);
            margin-bottom: 40px;
            font-weight: 400;
        }

        .result-card {
          background: #fff;
          border-radius: var(--border-radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-card);
          max-width: 900px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        .result-illustration {
          background-color: var(--color-text-primary);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          position: relative;
        }

        .archetype-tag {
          position: absolute;
          bottom: 20px;
          background: rgba(255,255,255,0.1);
          padding: 4px 12px;
          border-radius: 4px;
          color: #fff;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
        }

        .illustration-placeholder {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .result-details {
          padding: 60px 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .result-quote {
            font-size: 1.5rem;
            font-style: italic;
            color: var(--color-accent-terracotta);
            margin-bottom: 24px;
            font-family: var(--font-heading);
        }

        .result-description {
          font-size: 1.1rem;
          margin-bottom: 32px;
          color: var(--color-text-primary);
          line-height: 1.6;
        }

        .spectrum-breakdown {
            margin-bottom: 32px;
        }

        .spectrum-breakdown h3 {
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin-bottom: 16px;
            color: var(--color-text-secondary);
        }

        .spectrum-grid {
            display: grid;
            gap: 12px;
        }

        .spectrum-item {
            display: flex;
            align-items: center;
            gap: 16px;
        }

        .dim-label {
            width: 140px;
            font-size: 0.85rem;
            color: var(--color-text-primary);
        }

        .dim-bar {
            flex: 1;
            height: 6px;
            background: rgba(0,0,0,0.05);
            border-radius: 3px;
            overflow: hidden;
        }

        .dim-fill {
            height: 100%;
            background: var(--color-accent-teal);
            border-radius: 3px;
        }

        .recommendation-box {
            background: rgba(192, 108, 84, 0.05);
            padding: 24px;
            border-radius: 8px;
            margin-bottom: 32px;
            border-left: 4px solid var(--color-accent-terracotta);
        }

        .recommendation-box h3 {
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin-bottom: 8px;
            color: var(--color-text-secondary);
        }

        .next-step-hint {
          font-size: 0.9rem;
          color: var(--color-text-secondary);
          margin-bottom: 16px;
        }

        @media (max-width: 768px) {
          .result-card {
            grid-template-columns: 1fr;
          }
          .result-illustration {
            min-height: 250px;
          }
        }
      `}</style>
    </div>
  );
};

export default Result;
