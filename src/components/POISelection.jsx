import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Plus, ArrowRight, MapPin } from 'lucide-react';

const POISelection = () => {
    // Mock POI Data based on "Soul Seeker"
    const initialPOIs = [
        { id: 1, name: "M50 Creative Park", type: "Art", image: "🎨", selected: true },
        { id: 2, name: "Wukang Mansion", type: "Architecture", image: "🏛️", selected: true },
        { id: 3, name: "Long Museum", type: "Art", image: "🖼️", selected: true },
        { id: 4, name: "Fuxing Park", type: "Nature", image: "🌳", selected: false },
        { id: 5, name: "1933 Old Millfun", type: "Architecture", image: "🏢", selected: true },
        { id: 6, name: "Propaganda Poster Art Centre", type: "History", image: "📜", selected: false },
    ];

    const [pois, setPois] = useState(initialPOIs);

    const togglePOI = (id) => {
        setPois(pois.map(poi =>
            poi.id === id ? { ...poi, selected: !poi.selected } : poi
        ));
    };

    const selectedCount = pois.filter(p => p.selected).length;

    return (
        <div className="poi-page">
            <div className="container">
                <div className="page-header text-center fade-in">
                    <h1>Curate Your Experience</h1>
                    <p>We've selected these spots based on your <strong>Soul Seeker</strong> profile.</p>
                    <p className="selection-count">{selectedCount} spots selected</p>
                </div>

                <div className="poi-grid fade-in" style={{ animationDelay: '0.2s' }}>
                    {pois.map(poi => (
                        <div
                            key={poi.id}
                            className={`poi-card ${poi.selected ? 'selected' : ''}`}
                            onClick={() => togglePOI(poi.id)}
                        >
                            <div className="poi-image-placeholder">
                                <span className="emoji">{poi.image}</span>
                                <div className="selection-indicator">
                                    {poi.selected ? <Check size={16} color="#fff" /> : <Plus size={16} color="var(--color-text-secondary)" />}
                                </div>
                            </div>
                            <div className="poi-info">
                                <span className="poi-type">{poi.type}</span>
                                <h3>{poi.name}</h3>
                            </div>
                        </div>
                    ))}
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

        .selection-count {
          margin-top: 16px;
          font-weight: 700;
          color: var(--color-accent-terracotta);
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
