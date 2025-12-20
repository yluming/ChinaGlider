import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Coffee, Sun, Moon, ArrowRight } from 'lucide-react';

const Itinerary = () => {
    // Mock Itinerary Data
    const itinerary = [
        {
            day: 1,
            title: "Art & Soul",
            vibe: "Creative & Introspective",
            events: [
                { time: "Morning", title: "M50 Creative Park", desc: "Explore contemporary art in converted warehouses.", type: "Art", icon: <Sun size={18} /> },
                { time: "Afternoon", title: "Cafe on West Bund", desc: "Coffee with a view of the Huangpu River.", type: "Relax", icon: <Coffee size={18} /> },
                { time: "Evening", title: "Jazz at Lincoln Center", desc: "Live music in an intimate setting.", type: "Music", icon: <Moon size={18} /> },
            ]
        },
        {
            day: 2,
            title: "History Whispers",
            vibe: "Nostalgic & Deep",
            events: [
                { time: "Morning", title: "Wukang Mansion", desc: "Walk through the French Concession's iconic architecture.", type: "History", icon: <Sun size={18} /> },
                { time: "Afternoon", title: "Propaganda Poster Art Centre", desc: "A hidden basement museum with unique history.", type: "History", icon: <Coffee size={18} /> },
                { time: "Evening", title: "Old Jesse Restaurant", desc: "Authentic Shanghainese dinner.", type: "Food", icon: <Moon size={18} /> },
            ]
        }
    ];

    return (
        <div className="itinerary-page">
            <div className="container">
                <div className="page-header text-center fade-in">
                    <p className="pre-title">Your Personalized Journey</p>
                    <h1>Shanghai: The Soul Seeker's Path</h1>
                </div>

                <div className="timeline-container">
                    {itinerary.map((day, index) => (
                        <div key={day.day} className="day-section fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                            <div className="day-header">
                                <div className="day-marker">Day {day.day}</div>
                                <div className="day-info">
                                    <h2>{day.title}</h2>
                                    <span className="day-vibe">{day.vibe}</span>
                                </div>
                            </div>

                            <div className="events-list">
                                {day.events.map((event, i) => (
                                    <div key={i} className="event-card">
                                        <div className="event-time-icon">
                                            {event.icon}
                                            <span className="time-label">{event.time}</span>
                                        </div>
                                        <div className="event-content">
                                            <h3>{event.title}</h3>
                                            <p>{event.desc}</p>
                                            <span className="event-type">{event.type}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="action-area text-center fade-in" style={{ animationDelay: '0.6s' }}>
                    <Link to="/starter-pack" className="btn-primary">
                        View Starter Pack <ArrowRight size={20} style={{ marginLeft: '8px' }} />
                    </Link>
                </div>
            </div>

            <style>{`
        .itinerary-page {
          padding-top: 120px;
          padding-bottom: 80px;
          min-height: 100vh;
        }

        .timeline-container {
          max-width: 800px;
          margin: 60px auto;
          position: relative;
        }

        /* Vertical Line */
        .timeline-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 40px;
          height: 100%;
          width: 2px;
          background-color: rgba(74, 59, 50, 0.1);
        }

        .day-section {
          margin-bottom: 60px;
          position: relative;
        }

        .day-header {
          display: flex;
          align-items: center;
          margin-bottom: 30px;
        }

        .day-marker {
          width: 80px;
          height: 80px;
          background-color: var(--color-text-primary);
          color: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 700;
          z-index: 2;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        .day-info {
          margin-left: 24px;
        }

        .day-info h2 {
          font-size: 2rem;
          margin-bottom: 4px;
        }

        .day-vibe {
          font-family: var(--font-body);
          color: var(--color-accent-terracotta);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 0.85rem;
        }

        .events-list {
          margin-left: 40px; /* Align with line */
          padding-left: 40px;
        }

        .event-card {
          background: #fff;
          padding: 24px;
          border-radius: var(--border-radius-md);
          box-shadow: var(--shadow-soft);
          margin-bottom: 20px;
          display: flex;
          gap: 20px;
          transition: transform 0.2s ease;
          border-left: 4px solid var(--color-accent-gold);
        }

        .event-card:hover {
          transform: translateX(5px);
        }

        .event-time-icon {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: var(--color-text-secondary);
          min-width: 60px;
          padding-right: 20px;
          border-right: 1px solid rgba(0,0,0,0.05);
        }

        .time-label {
          font-size: 0.75rem;
          margin-top: 4px;
          text-transform: uppercase;
        }

        .event-content h3 {
          font-size: 1.25rem;
          margin-bottom: 8px;
        }

        .event-content p {
          color: var(--color-text-secondary);
          font-size: 0.95rem;
          margin-bottom: 12px;
        }

        .event-type {
          display: inline-block;
          background-color: rgba(0,0,0,0.03);
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 0.8rem;
          color: var(--color-text-secondary);
        }

        @media (max-width: 768px) {
          .timeline-container::before {
            left: 20px;
          }
          .day-marker {
            width: 40px;
            height: 40px;
            font-size: 0.9rem;
          }
          .events-list {
            margin-left: 20px;
            padding-left: 20px;
          }
        }
      `}</style>
        </div>
    );
};

export default Itinerary;
