import React from 'react';
import './HouseDetails.css';
import { rewardTiers, nobleHouses } from '../data/nobleHouses';

const HouseDetails = ({ 
  house, 
  personalContribution, 
  onContributionChange, 
  onVendorVisited, 
  isVendorVisited,
  onQuestTypeChange,
  houseSlots // Add this prop to access all slots
}) => {
  const handleContributionInput = (e) => {
    const value = parseInt(e.target.value) || 0;
    onContributionChange(house.name, value);
  };

  const handleQuestTypeChange = (e) => {
    if (onQuestTypeChange) {
      onQuestTypeChange(house.slotIndex, e.target.value);
    }
  };

  const handleTierClick = (points) => {
    onContributionChange(house.name, points);
  };

  const getUnlockedRewards = () => {
    return rewardTiers.filter(tier => personalContribution >= tier.points);
  };

  const getNextTier = () => {
    return rewardTiers.find(tier => personalContribution < tier.points);
  };

  const progressToNextTier = () => {
    const nextTier = getNextTier();
    if (nextTier) {
      return ((personalContribution / nextTier.points) * 100).toFixed(1);
    }
    return 100;
  };

  return (
    <div className="house-details">
      <div className="house-header">
        <div className="house-title">
          <span className="house-symbol">{house.symbol}</span>
          <h2>{house.name}</h2>
        </div>
        <div className="house-quest-type-badge">
          {house.questType.toUpperCase()} QUESTS
        </div>
      </div>

      {/* Vendor Section - Moved to top */}
      <div className="vendor-section">
        <h3>Vendor Status</h3>
        <div className="vendor-controls">
          <button 
            className={`vendor-button ${isVendorVisited ? 'visited' : 'not-visited'}`}
            onClick={() => onVendorVisited(house.name)}
          >
            {isVendorVisited ? '🛒 Vendor Visited' : '🛒 Mark Vendor as Visited'}
          </button>
          <div className="vendor-note">
            {isVendorVisited 
              ? 'You have collected your rewards from this house vendor.'
              : 'Visit the house vendor in-game to collect your rewards.'
            }
          </div>
        </div>
      </div>

      <div className="quest-type-section">
        <h3>Quest Type</h3>
        <div className="quest-type-controls">
          <select
            value={house.questType}
            onChange={handleQuestTypeChange}
            className="quest-type-selector-large"
          >
            <option value="kill">Kill Quest</option>
            <option value="delivery">Collection Quest</option>
          </select>
          <div className="quest-type-description">
            {house.questType === 'kill' 
              ? 'Defeat enemies to earn contribution points'
              : 'Collect and deliver items to earn contribution points'
            }
          </div>
        </div>
      </div>

      <div className="contribution-section">
        <h3>Personal Contribution</h3>
        <div className="contribution-input">
          <input
            type="number"
            value={personalContribution}
            onChange={handleContributionInput}
            placeholder="Enter your contribution points"
            min="0"
          />
          <span className="points-label">points</span>
        </div>
        
        {getNextTier() && (
          <div className="progress-section">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progressToNextTier()}%` }}
              ></div>
            </div>
            <div className="progress-text">
              {personalContribution.toLocaleString()} / {getNextTier().points.toLocaleString()} points
            </div>
          </div>
        )}
      </div>

      <div className="rewards-section">
        <h3>House Rewards</h3>
        <div className="rewards-grid">
          {rewardTiers.map((tier, index) => {
            const isUnlocked = personalContribution >= tier.points;
            const isNextTier = personalContribution < tier.points && 
                              (index === 0 || personalContribution >= rewardTiers[index - 1].points);
            
            return (
              <div 
                key={tier.points} 
                className={`reward-tier ${isUnlocked ? 'unlocked' : ''} ${isNextTier ? 'next-tier' : ''}`}
              >
                <div 
                  className="tier-points clickable"
                  onClick={() => handleTierClick(tier.points)}
                  title={`Click to set contribution to ${tier.points.toLocaleString()} points`}
                >
                  {tier.points.toLocaleString()} <span className="click-hint">👆</span>
                </div>
                <div className="tier-rewards">
                  {tier.rewards.map((reward, rewardIndex) => (
                    <div key={rewardIndex} className="reward-item">
                      {reward}
                    </div>
                  ))}
                </div>
                <div className="tier-status">
                  {isUnlocked ? '✓ Unlocked' : isNextTier ? '🔒 Next Goal' : '🔒 Locked'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="house-info">
        <div className="info-item">
          <span className="info-label">Quest Type:</span>
          <span className="info-value">{house.questType}</span>
        </div>
        <div className="info-item">
          <span className="info-label">House Color:</span>
          <span className="info-value" style={{ color: house.color }}>● {house.color}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Slot Position:</span>
          <span className="info-value">#{house.slotIndex + 1}</span>
        </div>
      </div>
    </div>
  );
};

export default HouseDetails;
