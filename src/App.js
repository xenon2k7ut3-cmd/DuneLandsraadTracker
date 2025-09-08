import React, { useState, useEffect } from 'react';
import './App.css';
import HouseGrid from './components/HouseGrid';
import HouseDetails from './components/HouseDetails';
import TaskManager from './components/TaskManager';
import { nobleHouses } from './data/nobleHouses';
import confetti from 'canvas-confetti';
import stateManager from './services/stateManager';
import VendorSidebar from './components/VendorSidebar';

function App() {
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [houseSlots, setHouseSlots] = useState(Array(25).fill(null));
  const [personalContributions, setPersonalContributions] = useState({});
  const [visitedVendors, setVisitedVendors] = useState({});
  const [easterEggTriggered, setEasterEggTriggered] = useState(false);
  const [storageInfo, setStorageInfo] = useState({ hasData: false, lastSaved: null, size: 0 });

  // Load state from localStorage on component mount
  useEffect(() => {
    const savedState = stateManager.loadState();
    setHouseSlots(savedState.houseSlots);
    setPersonalContributions(savedState.personalContributions);
    setVisitedVendors(savedState.visitedVendors);
    setStorageInfo(stateManager.getStorageInfo());
  }, []);

  // Save state whenever it changes
  useEffect(() => {
    const currentState = {
      houseSlots,
      personalContributions,
      visitedVendors
    };
    stateManager.saveState(currentState);
    setStorageInfo(stateManager.getStorageInfo());
  }, [houseSlots, personalContributions, visitedVendors]);

  // Check for easter egg condition
  useEffect(() => {
    const checkEasterEgg = () => {
      const filledSlots = houseSlots.filter(slot => slot !== null);
      if (filledSlots.length === 25) {
        const allMaxTier = filledSlots.every(house => {
          const contribution = personalContributions[house.name] || 0;
          return contribution >= 14000;
        });
        
        if (allMaxTier && !easterEggTriggered) {
          triggerEasterEgg();
        }
      }
    };

    checkEasterEgg();
  }, [houseSlots, personalContributions, easterEggTriggered]);

  const triggerEasterEgg = () => {
    setEasterEggTriggered(true);
    
    // Confetti explosion
    confetti({
      particleCount: 200,
      spread: 180,
      origin: { y: 0.6 }
    });
    
    // Display GODLIKE message
    const godlikeDiv = document.createElement('div');
    godlikeDiv.className = 'godlike-message';
    godlikeDiv.textContent = 'GODLIKE';
    document.body.appendChild(godlikeDiv);
    
    // Remove message after animation
    setTimeout(() => {
      if (godlikeDiv.parentNode) {
        godlikeDiv.parentNode.removeChild(godlikeDiv);
      }
    }, 3000);
    
    // Play Unreal Tournament sound (using Web Audio API)
    playUnrealTournamentSound();
  };

  const playUnrealTournamentSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Unreal Tournament "Godlike" sound approximation
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.5);
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
      console.log('Audio playback not supported');
    }
  };

  const handleHouseSelect = (house, slotIndex) => {
    setSelectedHouse({ ...house, slotIndex });
  };

  const handleHouseSlotChange = (slotIndex, houseName) => {
    const newSlots = [...houseSlots];
    const house = nobleHouses.find(h => h.name === houseName);
    newSlots[slotIndex] = house || null;
    setHouseSlots(newSlots);
  };

  const handleQuestTypeChange = (slotIndex, questType) => {
    const newSlots = [...houseSlots];
    if (newSlots[slotIndex]) {
      newSlots[slotIndex] = { ...newSlots[slotIndex], questType };
      setHouseSlots(newSlots);
      
      // Update selected house if it's the same one
      if (selectedHouse && selectedHouse.slotIndex === slotIndex) {
        setSelectedHouse({ ...selectedHouse, questType });
      }
    }
  };

  const handleContributionChange = (houseName, points) => {
    setPersonalContributions(prev => ({
      ...prev,
      [houseName]: Math.max(0, points)
    }));
  };

  const handleVendorVisited = (houseName) => {
    setVisitedVendors(prev => ({
      ...prev,
      [houseName]: !prev[houseName]
    }));
  };

  const resetWeek = () => {
    // Reset to empty slots for new week
    setHouseSlots(Array(25).fill(null));
    setPersonalContributions({});
    setVisitedVendors({});
    setSelectedHouse(null);
    setEasterEggTriggered(false); // Reset easter egg for new week
    stateManager.clearState(); // Clear saved state
  };

  const exportState = () => {
    const currentState = {
      houseSlots,
      personalContributions,
      visitedVendors
    };
    stateManager.exportState(currentState);
  };

  const importState = (event) => {
    const file = event.target.files[0];
    if (file) {
      stateManager.importState(
        file,
        (importedState) => {
          setHouseSlots(importedState.houseSlots);
          setPersonalContributions(importedState.personalContributions);
          setVisitedVendors(importedState.visitedVendors);
          setSelectedHouse(null);
          setEasterEggTriggered(false);
          alert('State imported successfully!');
        },
        (error) => {
          alert(`Import failed: ${error}`);
        }
      );
    }
    // Reset the file input
    event.target.value = '';
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <div className="header-text">
            <h1>MOMENTUM LANDSRAAD</h1>
            <p>Track your progress across noble houses</p>
            {storageInfo.hasData && (
              <div className="storage-info">
                <small>
                  Last saved: {new Date(storageInfo.lastSaved).toLocaleString()} 
                  ({Math.round(storageInfo.size / 1024)}KB)
                </small>
              </div>
            )}
          </div>
          <div className="header-controls">
            <div className="file-controls">
              <button className="export-button" onClick={exportState} title="Export state to JSON file">
                📁 Export
              </button>
              <label className="import-button" title="Import state from JSON file">
                📂 Import
                <input
                  type="file"
                  accept=".json"
                  onChange={importState}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
            <button className="reset-button" onClick={resetWeek}>
              Reset Week
            </button>
          </div>
        </div>
      </header>
      
      <main className="app-main">
        <VendorSidebar selectedHouse={selectedHouse} />
        <div className="main-content">
          <TaskManager 
            selectedHouse={selectedHouse}
            onTaskSelect={(task) => {
              console.log('Selected task:', task);
              // You can add task selection logic here
            }}
          />
          
          <HouseGrid 
            houseSlots={houseSlots}
            onHouseSelect={handleHouseSelect}
            onHouseSlotChange={handleHouseSlotChange}
            onQuestTypeChange={handleQuestTypeChange}
            personalContributions={personalContributions}
            visitedVendors={visitedVendors}
          />
        </div>
        
        {selectedHouse && (
          <HouseDetails 
            house={selectedHouse}
            personalContribution={personalContributions[selectedHouse.name] || 0}
            onContributionChange={handleContributionChange}
            onVendorVisited={handleVendorVisited}
            isVendorVisited={visitedVendors[selectedHouse.name] || false}
            onQuestTypeChange={handleQuestTypeChange}
            houseSlots={houseSlots}
          />
        )}
      </main>
    </div>
  );
}

export default App;
