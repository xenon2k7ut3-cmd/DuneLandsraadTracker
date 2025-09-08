import React, { useState } from 'react';
import './HouseGrid.css';
import { nobleHouses } from '../data/nobleHouses';

const HouseGrid = ({ 
  houseSlots, 
  onHouseSelect, 
  onHouseSlotChange, 
  onQuestTypeChange,
  personalContributions,
  visitedVendors 
}) => {
  const [editingSlot, setEditingSlot] = useState(null);

  const handleSlotClick = (slotIndex, house) => {
    if (house) {
      onHouseSelect(house, slotIndex);
    }
  };

  const handleSlotDoubleClick = (slotIndex) => {
    setEditingSlot(slotIndex);
  };

  const handleHouseChange = (slotIndex, houseName) => {
    onHouseSlotChange(slotIndex, houseName);
    setEditingSlot(null);
  };

  const handleQuestTypeChange = (slotIndex, questType) => {
    onQuestTypeChange(slotIndex, questType);
  };

  // Get available houses for dropdown (exclude already selected ones)
  const getAvailableHouses = (currentSlotIndex) => {
    const selectedHouses = houseSlots
      .map((house, index) => ({ house, index }))
      .filter(({ house, index }) => house && index !== currentSlotIndex)
      .map(({ house }) => house.name);

    return nobleHouses
      .filter(house => !selectedHouses.includes(house.name))
      .sort((a, b) => a.name.localeCompare(b.name));
  };

  const renderSlot = (slotIndex) => {
    const house = houseSlots[slotIndex];
    const contribution = house ? personalContributions[house.name] || 0 : 0;
    const isVisited = house ? visitedVendors[house.name] || false : false;

    if (editingSlot === slotIndex) {
      const availableHouses = getAvailableHouses(slotIndex);
      
      return (
        <div className="house-slot editing">
          <select 
            value={house ? house.name : ''} 
            onChange={(e) => handleHouseChange(slotIndex, e.target.value)}
            autoFocus
          >
            <option value="">Empty Slot</option>
            {availableHouses.map(h => (
              <option key={h.name} value={h.name}>{h.name}</option>
            ))}
            {/* Show current house if it exists (allows changing to empty) */}
            {house && (
              <option value={house.name}>{house.name} (current)</option>
            )}
          </select>
        </div>
      );
    }

    if (!house) {
      return (
        <div 
          className="house-slot empty"
          onClick={() => handleSlotDoubleClick(slotIndex)}
        >
          <span>Empty</span>
        </div>
      );
    }

    const isClaimed = contribution >= 14000;
    const isHighTier = contribution >= 7000;
    const isMidTier = contribution >= 3500;
    const isLowTier = contribution >= 700;

    return (
      <div 
        className={`house-slot ${isClaimed ? 'claimed' : ''} ${isHighTier ? 'high-tier' : ''} ${isMidTier ? 'mid-tier' : ''} ${isLowTier ? 'low-tier' : ''} ${isVisited ? 'vendor-visited' : ''}`}
        onClick={() => handleSlotClick(slotIndex, house)}
        onDoubleClick={() => handleSlotDoubleClick(slotIndex)}
        style={{ borderColor: house.color }}
      >
        <div className="house-symbol">{house.symbol}</div>
        <div className="house-name">{house.name}</div>
        
        {/* Quest Type Selector */}
        <div className="quest-type-selector">
          <select
            value={house.questType}
            onChange={(e) => handleQuestTypeChange(slotIndex, e.target.value)}
            onClick={(e) => e.stopPropagation()}
            className="quest-type-dropdown"
          >
            <option value="kill">Kill Quest</option>
            <option value="delivery">Collection Quest</option>
          </select>
        </div>
        
        {contribution > 0 && (
          <div className="contribution-display">
            {contribution.toLocaleString()}
          </div>
        )}
        {isClaimed && (
          <div className="claimed-icon">✓</div>
        )}
        {isVisited && (
          <div className="visited-icon">✓</div>
        )}
      </div>
    );
  };

  return (
    <div className="house-grid-container">
      <p className="grid-instructions">
        Set up your week: Click any empty slot to assign a house, then click to view details. 
        Green = claimed, Orange = high tier, Yellow = mid tier, Blue = low tier
      </p>
      <div className="house-grid">
        {Array(25).fill(null).map((_, index) => (
          <div key={index} className="grid-slot">
            {renderSlot(index)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HouseGrid;
