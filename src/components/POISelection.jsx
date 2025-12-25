import React, { useState, useMemo, useEffect } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { Check, Plus, ArrowRight, RefreshCw } from 'lucide-react';
import { getRankedPool } from '../utils/recommendationEngine';
import { generatePOIDescriptions } from '../utils/aiService';

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
  // Store AI-generated descriptions
  const [aiDescriptions, setAiDescriptions] = useState({});
  const [isLoadingAI, setIsLoadingAI] = useState(false);

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
    const nextPois = [...newRecs, ...selectedPois];

    setPois(nextPois);
    setSeenIds(prev => {
      const next = new Set(prev);
      newRecs.forEach(r => next.add(r.id));
      return next;
    });
  };

  // Fetch AI descriptions whenever the 'pois' list changes
  useEffect(() => {
    const fetchAIDescriptions = async () => {
      if (pois.length === 0) return;

      setIsLoadingAI(true);
      const descriptions = await generatePOIDescriptions(pois, result);
      if (descriptions) {
        setAiDescriptions(prev => ({ ...prev, ...descriptions }));
      }
      setIsLoadingAI(false);
    };

    fetchAIDescriptions();
  }, [pois, result]);

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

        <div className="poi-list fade-in" style={{ animationDelay: '0.2s' }}>
          {pois.map(poi => {
            const { label, emoji } = getContentTypeLabel(poi.content_type);
            // Placeholder description based on content type
            const getDescription = (poi) => {
              if (aiDescriptions[poi.name]) return aiDescriptions[poi.name];

              const descs = {
                'history_culture': 'Discover Shaghai’s rich heritage and timeless stories.',
                'art_design': 'Immerse yourself in local creativity and modern design.',
                'nature': 'A peaceful escape into Shanghai’s green spaces.',
                'urban_walk': 'Explore the city’s pulse through its unique streets.',
                'neighborhood': 'Experience the authentic daily life of local residents.',
                'night_scene': 'The city comes alive with vibrant light and energy.',
                'food_focus': 'A must-visit destination for culinary enthusiasts.',
                'market': 'Find hidden treasures in local bustling markets.',
                'general': 'A quintessential Shanghai landmark experience.'
              };
              return descs[poi.content_type] || 'A unique spot to experience the soul of Shanghai.';
            };

            return (
              <div
                key={poi.id}
                className={`poi-card-compact ${poi.selected ? 'selected' : ''}`}
                onClick={() => togglePOI(poi.id)}
              >
                <div className="poi-thumb">
                  <span className="emoji">{emoji}</span>
                </div>

                <div className="poi-content">
                  <div className="poi-main-info">
                    <h3>{poi.name}</h3>
                    {isLoadingAI && !aiDescriptions[poi.name] ? (
                      <div className="skeleton-line" />
                    ) : (
                      <p className="poi-description">
                        {getDescription(poi)}
                      </p>
                    )}
                  </div>
                  <div className="poi-meta">
                    <span className="poi-tag">{label}</span>
                    <span className="poi-district">{poi.district || 'Shanghai'}</span>
                  </div>
                </div>

                <div className="poi-action">
                  <div className="selection-indicator-compact">
                    {poi.selected ? <Check size={18} color="#fff" /> : <Plus size={18} color="var(--color-text-secondary)" />}
                  </div>
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

        .poi-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 60px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .poi-card-compact {
          background: #fff;
          border-radius: var(--border-radius-md);
          display: flex;
          align-items: center;
          padding: 16px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid var(--color-bg-paper);
          box-shadow: var(--shadow-soft);
          gap: 20px;
          position: relative;
        }

        .poi-card-compact:hover {
          transform: translateX(4px);
          box-shadow: var(--shadow-card);
          border-color: var(--color-accent-soft-gold);
        }

        .poi-card-compact.selected {
          background-color: #fff;
          border-left: 4px solid var(--color-accent-terracotta);
          box-shadow: 0 4px 15px rgba(192, 108, 84, 0.1);
        }

        .poi-thumb {
          width: 80px;
          height: 80px;
          background-color: var(--color-bg-paper);
          border-radius: var(--border-radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          overflow: hidden;
        }

        .poi-thumb .emoji {
          font-size: 2.5rem;
        }

        .poi-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-width: 0; /* Important for text truncation if needed */
        }

        .poi-main-info h3 {
          font-size: 1.25rem;
          margin-bottom: 4px;
          color: var(--color-text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .poi-description {
          font-size: 0.9rem;
          color: var(--color-text-secondary);
          margin-bottom: 12px;
          line-height: 1.4;
          transition: opacity 0.3s ease;
        }

        .skeleton-line {
          height: 0.9rem;
          width: 80%;
          background: linear-gradient(90deg, #f0f0f0 25%, #f8f8f8 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 4px;
          margin-bottom: 12px;
        }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .poi-meta {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .poi-tag {
          font-size: 0.75rem;
          padding: 2px 10px;
          background: var(--color-bg-paper);
          border-radius: 20px;
          color: var(--color-accent-teal);
          font-weight: 600;
          border: 1px solid rgba(44, 95, 102, 0.1);
        }

        .poi-district {
          font-size: 0.75rem;
          color: var(--color-text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .poi-action {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding-left: 16px;
          border-left: 1px solid var(--color-bg-paper);
        }

        .selection-indicator-compact {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid var(--color-bg-paper);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .poi-card-compact.selected .selection-indicator-compact {
          background-color: var(--color-accent-terracotta);
          border-color: var(--color-accent-terracotta);
        }

        .action-bar {
          text-align: center;
          position: sticky;
          bottom: 40px;
          z-index: 10;
        }

        @media (max-width: 600px) {
          .poi-card-compact {
            padding: 12px;
            gap: 12px;
          }
          .poi-thumb {
            width: 60px;
            height: 60px;
          }
          .poi-thumb .emoji {
            font-size: 1.8rem;
          }
          .poi-main-info h3 {
            font-size: 1.1rem;
          }
          .poi-description {
            font-size: 0.8rem;
          }
          .poi-action {
            padding-left: 8px;
          }
          .selection-indicator-compact {
            width: 30px;
            height: 30px;
          }
        }
      `}</style>
    </div>
  );
};

export default POISelection;
