import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Calendar, Users, DollarSign, Activity } from 'lucide-react';

const TripForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        days: 5,
        companions: 'Solo',
        budget: 'Mid',
        pace: 'Balanced'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate API call/processing
        console.log('Trip Details:', formData);
        navigate('/itinerary');
    };

    return (
        <div className="trip-form-page">
            <div className="container">
                <div className="form-card fade-in">
                    <div className="form-header text-center">
                        <h1>Trip Basics</h1>
                        <p>Let's finalize the details for your Shanghai adventure.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="journal-form">

                        <div className="form-group">
                            <label>
                                <Calendar size={20} /> How many days?
                            </label>
                            <div className="range-wrapper">
                                <input
                                    type="range"
                                    name="days"
                                    min="3"
                                    max="14"
                                    value={formData.days}
                                    onChange={handleChange}
                                    className="slider"
                                />
                                <span className="range-value">{formData.days} Days</span>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>
                                <Users size={20} /> Who are you with?
                            </label>
                            <div className="radio-group">
                                {['Solo', 'Couple', 'Friends', 'Family'].map(opt => (
                                    <label key={opt} className={`radio-chip ${formData.companions === opt ? 'active' : ''}`}>
                                        <input
                                            type="radio"
                                            name="companions"
                                            value={opt}
                                            checked={formData.companions === opt}
                                            onChange={handleChange}
                                        />
                                        {opt}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>
                                <DollarSign size={20} /> Budget Level
                            </label>
                            <div className="radio-group">
                                {['Low', 'Mid', 'High'].map(opt => (
                                    <label key={opt} className={`radio-chip ${formData.budget === opt ? 'active' : ''}`}>
                                        <input
                                            type="radio"
                                            name="budget"
                                            value={opt}
                                            checked={formData.budget === opt}
                                            onChange={handleChange}
                                        />
                                        {opt}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>
                                <Activity size={20} /> Pace Preference
                            </label>
                            <div className="radio-group">
                                {['Chill', 'Balanced', 'Packed'].map(opt => (
                                    <label key={opt} className={`radio-chip ${formData.pace === opt ? 'active' : ''}`}>
                                        <input
                                            type="radio"
                                            name="pace"
                                            value={opt}
                                            checked={formData.pace === opt}
                                            onChange={handleChange}
                                        />
                                        {opt}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn-primary">
                                Generate Itinerary <ArrowRight size={20} style={{ marginLeft: '8px' }} />
                            </button>
                        </div>

                    </form>
                </div>
            </div>

            <style>{`
        .trip-form-page {
          padding-top: 120px;
          padding-bottom: 80px;
          min-height: 100vh;
          background-color: var(--color-bg-paper);
          background-image: radial-gradient(var(--color-accent-soft-gold) 1px, transparent 1px);
          background-size: 20px 20px;
        }

        .form-card {
          background: #fff;
          max-width: 600px;
          margin: 0 auto;
          padding: 60px 40px;
          border-radius: 2px;
          box-shadow: var(--shadow-card);
          position: relative;
          /* Paper look */
        }

        .form-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: var(--color-accent-terracotta);
        }

        .form-header h1 {
          font-size: 2.5rem;
          margin-bottom: 16px;
        }

        .journal-form {
          margin-top: 40px;
        }

        .form-group {
          margin-bottom: 40px;
        }

        .form-group label {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-heading);
          font-size: 1.5rem;
          color: var(--color-text-primary);
          margin-bottom: 16px;
        }

        .range-wrapper {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .slider {
          flex: 1;
          -webkit-appearance: none;
          height: 4px;
          background: #ddd;
          border-radius: 2px;
          outline: none;
        }

        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--color-accent-terracotta);
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }

        .range-value {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          color: var(--color-accent-terracotta);
          font-weight: 700;
          min-width: 80px;
        }

        .radio-group {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .radio-chip {
          padding: 10px 24px;
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 1rem;
          position: relative;
        }

        .radio-chip input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
        }

        .radio-chip:hover {
          background-color: rgba(0,0,0,0.02);
        }

        .radio-chip.active {
          background-color: var(--color-text-primary);
          color: #fff;
          border-color: var(--color-text-primary);
        }

        .form-actions {
          text-align: center;
          margin-top: 60px;
        }
      `}</style>
        </div>
    );
};

export default TripForm;
