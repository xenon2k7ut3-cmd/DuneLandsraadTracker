import React, { useState } from 'react';
import './TaskManager.css';
import { getAllTasks, getTasksByType, searchTasks } from '../data/landsraadTasks';

const TaskManager = ({ selectedHouse, onTaskSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [showTaskManager, setShowTaskManager] = useState(false);

  const getFilteredTasks = () => {
    let tasks = selectedType === 'all' ? getAllTasks() : getTasksByType(selectedType);
    
    if (searchQuery) {
      tasks = searchTasks(searchQuery);
    }
    
    return tasks;
  };

  const handleTaskClick = (task) => {
    if (onTaskSelect) {
      onTaskSelect(task);
    }
  };

  const getTaskTypeColor = (type) => {
    switch (type) {
      case 'crafted': return '#4a7c59';
      case 'raw': return '#7c4a4a';
      case 'kill': return '#7c7c4a';
      case 'vehicle': return '#4a4a7c';
      default: return '#666';
    }
  };

  const getTaskTypeIcon = (type) => {
    switch (type) {
      case 'crafted': return '🔨';
      case 'raw': return '📦';
      case 'kill': return '⚔️';
      case 'vehicle': return '🚗';
      default: return '📋';
    }
  };

  const tasks = getFilteredTasks();

  return (
    <div className="task-manager">
      <button 
        className="task-manager-toggle"
        onClick={() => setShowTaskManager(!showTaskManager)}
      >
        {showTaskManager ? '📋 Hide Tasks' : '📋 Show Tasks'}
      </button>

      {showTaskManager && (
        <div className="task-manager-panel">
          <div className="task-manager-header">
            <h3>Landsraad Tasks</h3>
            <p>Select a task to add to {selectedHouse?.name || 'your house'}</p>
          </div>

          <div className="task-filters">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="task-search-input"
              />
            </div>

            <div className="type-filters">
              <button
                className={`type-filter ${selectedType === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedType('all')}
              >
                All Tasks
              </button>
              <button
                className={`type-filter ${selectedType === 'crafted' ? 'active' : ''}`}
                onClick={() => setSelectedType('crafted')}
              >
                🔨 Crafted
              </button>
              <button
                className={`type-filter ${selectedType === 'raw' ? 'active' : ''}`}
                onClick={() => setSelectedType('raw')}
              >
                📦 Raw Materials
              </button>
              <button
                className={`type-filter ${selectedType === 'kill' ? 'active' : ''}`}
                onClick={() => setSelectedType('kill')}
              >
                ⚔️ Kill Tasks
              </button>
              <button
                className={`type-filter ${selectedType === 'vehicle' ? 'active' : ''}`}
                onClick={() => setSelectedType('vehicle')}
              >
                🚗 Vehicles
              </button>
            </div>
          </div>

          <div className="tasks-list">
            {tasks.length === 0 ? (
              <div className="no-tasks">
                No tasks found matching your criteria.
              </div>
            ) : (
              tasks.map((task, index) => (
                <div
                  key={`${task.type}-${index}`}
                  className="task-item"
                  onClick={() => handleTaskClick(task)}
                  style={{ borderLeftColor: getTaskTypeColor(task.type) }}
                >
                  <div className="task-header">
                    <span className="task-icon">{getTaskTypeIcon(task.type)}</span>
                    <span className="task-name">{task.name}</span>
                    <span className="task-points">{task.points} pts</span>
                  </div>
                  
                  <div className="task-details">
                    <div className="task-quantity">
                      Quantity: {task.quantity.toLocaleString()}
                    </div>
                    
                    {task.requirements && (
                      <div className="task-requirements">
                        <strong>Requirements:</strong>
                        <div className="requirements-list">
                          {Object.entries(task.requirements).map(([item, amount]) => (
                            <div key={item} className="requirement-item">
                              {item}: {amount.toLocaleString()}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="task-manager-footer">
            <small>
              Data sourced from <a href="https://www.method.gg/dune-awakening/landsraad/tasks" target="_blank" rel="noopener noreferrer">Method.gg</a>
            </small>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManager;

