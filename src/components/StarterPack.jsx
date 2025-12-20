import React from 'react';
import { Smartphone, CreditCard, Shield, MessageCircle } from 'lucide-react';

const StarterPack = () => {
    const cards = [
        {
            title: "Payment",
            icon: <CreditCard size={32} />,
            content: "Link your Visa/Mastercard to Alipay or WeChat Pay. Cash is rarely used.",
            color: "#1677FF" // Alipay blue-ish
        },
        {
            title: "Connectivity",
            icon: <Smartphone size={32} />,
            content: "Get an eSIM (e.g., Nomad, Airalo) before arrival. VPN is essential if roaming.",
            color: "#52C41A"
        },
        {
            title: "Apps",
            icon: <MessageCircle size={32} />,
            content: "Download WeChat for communication and Amap (Gaode) for navigation.",
            color: "#07C160" // WeChat green
        },
        {
            title: "Safety",
            icon: <Shield size={32} />,
            content: "Shanghai is extremely safe. Emergency numbers: 110 (Police), 120 (Ambulance).",
            color: "#FAAD14"
        }
    ];

    return (
        <div className="starter-pack-page">
            <div className="container">
                <div className="page-header text-center fade-in">
                    <h1>China Starter Pack</h1>
                    <p>Essential tools for a smooth landing.</p>
                </div>

                <div className="pack-grid">
                    {cards.map((card, index) => (
                        <div key={index} className="info-card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="card-icon" style={{ color: card.color }}>
                                {card.icon}
                            </div>
                            <h3>{card.title}</h3>
                            <p>{card.content}</p>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        .starter-pack-page {
          padding-top: 120px;
          padding-bottom: 80px;
          min-height: 100vh;
        }

        .pack-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          margin-top: 60px;
        }

        .info-card {
          background: #fff;
          padding: 40px 30px;
          border-radius: var(--border-radius-lg);
          box-shadow: var(--shadow-soft);
          text-align: center;
          transition: transform 0.3s ease;
        }

        .info-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-card);
        }

        .card-icon {
          margin-bottom: 24px;
        }

        .info-card h3 {
          font-size: 1.5rem;
          margin-bottom: 16px;
        }

        .info-card p {
          color: var(--color-text-secondary);
        }
      `}</style>
        </div>
    );
};

export default StarterPack;
