// State management service for persisting app state
class StateManager {
  constructor() {
    this.STORAGE_KEY = 'dune_landsraad_state';
    this.EXPORT_FILENAME = 'dune_landsraad_state.json';
  }

  // Save state to localStorage
  saveState(state) {
    try {
      const stateToSave = {
        houseSlots: state.houseSlots,
        personalContributions: state.personalContributions,
        visitedVendors: state.visitedVendors,
        lastSaved: new Date().toISOString()
      };
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(stateToSave));
      console.log('State saved to localStorage');
      return true;
    } catch (error) {
      console.error('Failed to save state to localStorage:', error);
      return false;
    }
  }

  // Load state from localStorage
  loadState() {
    try {
      const savedState = localStorage.getItem(this.STORAGE_KEY);
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        console.log('State loaded from localStorage');
        return {
          houseSlots: parsedState.houseSlots || Array(25).fill(null),
          personalContributions: parsedState.personalContributions || {},
          visitedVendors: parsedState.visitedVendors || {},
          lastSaved: parsedState.lastSaved
        };
      }
    } catch (error) {
      console.error('Failed to load state from localStorage:', error);
    }
    
    // Return default state if loading fails
    return {
      houseSlots: Array(25).fill(null),
      personalContributions: {},
      visitedVendors: {},
      lastSaved: null
    };
  }

  // Export state as JSON file
  exportState(state) {
    try {
      const stateToExport = {
        houseSlots: state.houseSlots,
        personalContributions: state.personalContributions,
        visitedVendors: state.visitedVendors,
        exportedAt: new Date().toISOString(),
        version: '1.0.0'
      };

      const dataStr = JSON.stringify(stateToExport, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      
      const link = document.createElement('a');
      link.href = URL.createObjectURL(dataBlob);
      link.download = this.EXPORT_FILENAME;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log('State exported to JSON file');
      return true;
    } catch (error) {
      console.error('Failed to export state:', error);
      return false;
    }
  }

  // Import state from JSON file
  importState(file, onSuccess, onError) {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        
        // Validate the imported data structure
        if (this.validateImportedState(importedData)) {
          const state = {
            houseSlots: importedData.houseSlots || Array(25).fill(null),
            personalContributions: importedData.personalContributions || {},
            visitedVendors: importedData.visitedVendors || {},
            lastSaved: new Date().toISOString()
          };
          
          // Save the imported state to localStorage
          this.saveState(state);
          onSuccess(state);
          console.log('State imported from JSON file');
        } else {
          onError('Invalid file format. Please select a valid Dune Landsraad state file.');
        }
      } catch (error) {
        console.error('Failed to parse imported file:', error);
        onError('Failed to parse the selected file. Please ensure it\'s a valid JSON file.');
      }
    };
    
    reader.onerror = () => {
      onError('Failed to read the selected file.');
    };
    
    reader.readAsText(file);
  }

  // Validate imported state structure
  validateImportedState(data) {
    return (
      data &&
      typeof data === 'object' &&
      Array.isArray(data.houseSlots) &&
      typeof data.personalContributions === 'object' &&
      typeof data.visitedVendors === 'object'
    );
  }

  // Clear all saved state
  clearState() {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      console.log('State cleared from localStorage');
      return true;
    } catch (error) {
      console.error('Failed to clear state:', error);
      return false;
    }
  }

  // Get storage info
  getStorageInfo() {
    try {
      const savedState = localStorage.getItem(this.STORAGE_KEY);
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        return {
          hasData: true,
          lastSaved: parsedState.lastSaved,
          size: savedState.length
        };
      }
      return { hasData: false, lastSaved: null, size: 0 };
    } catch (error) {
      console.error('Failed to get storage info:', error);
      return { hasData: false, lastSaved: null, size: 0 };
    }
  }
}

// Create and export a singleton instance
const stateManager = new StateManager();
export default stateManager;

