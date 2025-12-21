import React, { useState, useMemo, useEffect } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { Check, Plus, ArrowRight, RefreshCw } from 'lucide-react';
import { getRankedPool } from '../utils/recommendationEngine';

const POISelection = () => {
  const location = useLocation();
  const { result, scores } = location.state || {};

  // If no scores, redirect back to quiz
  if (!scores) {
    return <Navigate to="/quiz" replace />;
  }

  // Get the full ranked pool once
  const fullPool = useMemo(() => getRankedPool(scores), [scores]);

  // State for currently displayed POIs
  const [pois, setPois] = useState([]);
  // Track which POIs have been "seen" (to avoid immediate repeats if possible)
  const [seenIds, setSeenIds] = useState(new Set());

  // Initial load
  useEffect(() => {
    const initial = fullPool.slice(0, 10).map(p => ({ ...p, selected: true }));
    setPois(initial);
    setSeenIds(new Set(initial.map(p => p.id)));
  }, [fullPool]);

  const getNewRecs = () => {
    const selectedPois = pois.filter(p => p.selected);
    const neededCount = 10 - selectedPois.length;

    if (neededCount <= 0) return; // Already have 10 selected

    // Find candidates: not currently in selectedPois and not in seenIds
    let candidates = fullPool.filter(p =>
      !selectedPois.find(sp => sp.id === p.id) &&
      !seenIds.has(p.id)
    );

    // If we ran out of unseen candidates, reset seenIds (except for currently displayed)
    if (candidates.length < neededCount) {
      const currentlyDisplayedIds = new Set(pois.map(p => p.id));
      setSeenIds(currentlyDisplayedIds);
      candidates = fullPool.filter(p => !currentlyDisplayedIds.has(p.id));
    }

    const newRecs = candidates.slice(0, neededCount).map(p => ({ ...p, selected: false }));
    const nextPois = [...selectedPois, ...newRecs];

    setPois(nextPois);
    setSeenIds(prev => {
      const next = new Set(prev);
      newRecs.forEach(r => next.add(r.id));
      return next;
    });
  };

  const togglePOI = (id) => {
    setPois(pois.map(poi =>
      poi.id === id ? { ...poi, selected: !poi.selected } : poi
    ));
  };

  const selectedCount = pois.filter(p => p.selected).length;

  const getContentTypeLabel = (type) => {
    const mapping = {
      'history_culture': { label: 'History & Culture', emoji: '📜' },
      'art_design': { label: 'Art & Design', emoji: '🎨' },
      'nature': { label: 'Nature & Parks', emoji: '🌳' },
      'urban_walk': { label: 'Urban Walk', emoji: '🚶' },
      'neighborhood': { label: 'Local Life', emoji: '🏘️' },
      'night_scene': { label: 'Nightlife', emoji: '🌃' },
      'food_focus': { label: 'Foodie Spot', emoji: '🍜' },
      'market': { label: 'Market', emoji: '🛍️' },
      'general': { label: 'Sightseeing', emoji: '📸' }
    };
    return mapping[type] || { label: 'Experience', emoji: '📍' };
  };

  return (
    <div className="poi-page">
      <div className="container">
        <div className="page-header text-center fade-in">
          <h1>Curate Your Experience</h1>
          <p>We've selected these spots based on your <strong>{result.name}</strong> profile.</p>
          <div className="header-actions">
            <p className="selection-count">{selectedCount} spots selected</p>
            <button className="btn-secondary btn-small" onClick={getNewRecs}>
              <RefreshCw size={16} style={{ marginRight: '8px' }} /> Give me some new recs
            </button>
          </div>
        </div>

        <div className="poi-grid fade-in" style={{ animationDelay: '0.2s' }}>
          {pois.map(poi => {
            const { label, emoji } = getContentTypeLabel(poi.content_type);
            return (
              <div
                key={poi.id}
                className={`poi-card ${poi.selected ? 'selected' : ''}`}
                onClick={() => togglePOI(poi.id)}
              >
                <div className="poi-image-placeholder">
                  <span className="emoji">{emoji}</span>
                  <div className="selection-indicator">
                    {poi.selected ? <Check size={16} color="#fff" /> : <Plus size={16} color="var(--color-text-secondary)" />}
                  </div>
                  <div className="match-badge">{Math.round((poi.matchScore / 28) * 100)}% Match</div>
                </div>
                <div className="poi-info">
                  <span className="poi-type">{label} • {poi.district || 'Shanghai'}</span>
                  <h3>{poi.name}</h3>
                </div>
              </div>
            );
          })}
        </div>

        <div className="action-bar fade-in" style={{ animationDelay: '0.4s' }}>
          <Link to="/trip-basics" className="btn-primary">
            Confirm Selection <ArrowRight size={20} style={{ marginLeft: '8px' }} />
          </Link>
        </div>
      </div>

      <style>{`
        .poi-page {
          padding-top: 120px;
          padding-bottom: 80px;
          min-height: 100vh;
        }

        .page-header {
          margin-bottom: 60px;
        }

        .page-header h1 {
          font-size: 3rem;
          margin-bottom: 16px;
          color: var(--color-text-primary);
        }

        .header-actions {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          margin-top: 16px;
        }

        .selection-count {
          font-weight: 700;
          color: var(--color-accent-terracotta);
          margin: 0;
        }

        .btn-small {
          padding: 8px 16px;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          background: #fff;
          border: 1px solid var(--color-border);
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-small:hover {
          background: var(--color-bg-paper);
          border-color: var(--color-accent-teal);
          color: var(--color-accent-teal);
        }

        .poi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 30px;
          margin-bottom: 60px;
        }

        .poi-card {
          background: #fff;
          border-radius: var(--border-radius-md);
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
          box-shadow: var(--shadow-soft);
          position: relative;
        }

        .poi-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-card);
        }

        .poi-card.selected {
          border-color: var(--color-accent-terracotta);
        }

        .poi-image-placeholder {
          height: 180px;
          background-color: var(--color-bg-paper);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .emoji {
          font-size: 4rem;
        }

        .selection-indicator {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: all 0.2s ease;
        }

        .poi-card.selected .selection-indicator {
          background-color: var(--color-accent-terracotta);
        }

        .match-badge {
          position: absolute;
          bottom: 12px;
          left: 12px;
          background: rgba(255,255,255,0.9);
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--color-accent-teal);
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .poi-info {
          padding: 20px;
        }

        .poi-type {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-text-secondary);
          display: block;
          margin-bottom: 8px;
        }

        .poi-card h3 {
          font-size: 1.25rem;
          margin: 0;
        }

        .action-bar {
          text-align: center;
          position: sticky;
          bottom: 40px;
          z-index: 10;
        }
      `}</style>
    </div>
  );
};

export default POISelection;
