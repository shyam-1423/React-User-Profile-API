// components/UserCard.jsx
import React, { useEffect, useRef } from 'react';
import { 
  Mail, 
  Phone, 
  Globe, 
  Instagram, 
  MessageCircle,
  MapPin,
  Star,
  MoreHorizontal
} from 'lucide-react';
import '../styles/userCard.scss';

const UserCard = ({ user, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Staggered entrance animation
    const timer = setTimeout(() => {
      card.classList.add('animate-in');
    }, index * 100);

    return () => clearTimeout(timer);
  }, [index]);

  const handleConnect = () => {
    alert(`Connecting with ${user.name}...`);
  };

  const handleMessage = () => {
    alert(`Messaging ${user.name}...`);
  };

  const handleMore = () => {
    alert(`More options for ${user.name}...`);
  };

  const getGradientClass = (index) => {
    const gradients = ['gradient-1', 'gradient-2', 'gradient-3', 'gradient-4'];
    return gradients[index % gradients.length];
  };

  return (
    <div className="col-12 col-md-6 col-lg-4 mb-4">
      <div ref={cardRef} className="user-card">
        {/* Header with background */}
        <div className={`user-card__header ${getGradientClass(index)}`}>
          <div className="background-pattern" />
        </div>

        {/* Profile Image */}
        <div className="user-card__avatar">
          <div className="avatar-container">
            <img
              src={user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&size=96&background=random`}
              alt={user?.name || "Profile"}
              className="avatar-image"
            />
          </div>
        </div>

        {/* Card Body */}
        <div className="user-card__body">
          {/* Name and Title */}
          <div className="user-card__info">
            <h5 className="user-name">
              {user?.name || "Unknown User"}
            </h5>
            <p className="user-title">
              {user?.title || user?.company || "Professional"}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="user-card__actions">
            <button 
              className="btn btn-primary btn-connect"
              onClick={handleConnect}
            >
              <Star size={14} />
              <span>Connect</span>
            </button>
            <button 
              className="btn btn-outline-primary btn-message"
              onClick={handleMessage}
            >
              <MessageCircle size={14} />
              <span>Message</span>
            </button>
            <button 
              className="btn btn-outline-secondary btn-more"
              onClick={handleMore}
            >
              <MoreHorizontal size={14} />
            </button>
          </div>

          {/* Contact Information */}
          <div className="user-card__contact">
            {user?.phone && (
              <div className="contact-item">
                <Phone size={14} className="contact-icon" />
                <span className="contact-text">{user.phone}</span>
              </div>
            )}
            
            {user?.email && (
              <div className="contact-item">
                <Mail size={14} className="contact-icon" />
                <span className="contact-text">{user.email}</span>
              </div>
            )}
            
            {user?.website && (
              <div className="contact-item">
                <Globe size={14} className="contact-icon" />
                <span className="contact-text">{user.website}</span>
              </div>
            )}
            
            {user?.address && (
              <div className="contact-item">
                <MapPin size={14} className="contact-icon" />
                <span className="contact-text">{user.address}</span>
              </div>
            )}
            
            {user?.instagram && (
              <div className="contact-item">
                <Instagram size={14} className="contact-icon" />
                <span className="contact-text">{user.instagram}</span>
              </div>
            )}
          </div>

          {/* Hobbies */}
          {user?.hobbies && user.hobbies.length > 0 && (
            <div className="user-card__hobbies">
              <small className="hobbies-label">Interests:</small>
              <div className="hobbies-list">
                {user.hobbies.slice(0, 4).map((hobby, i) => (
                  <span key={i} className="hobby-badge">
                    {hobby}
                  </span>
                ))}
                {user.hobbies.length > 4 && (
                  <span className="hobby-badge more-badge">
                    +{user.hobbies.length - 4} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;