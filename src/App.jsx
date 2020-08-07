import React from 'react';
import './App.scss';

function App() {
  return (
    <div className="content">
      <div className="table">
        <div className="table__header">
          <div className="table__header-item">
            Figures
          </div>
          <div className="table__header-item">
            Canvas
          </div>
        </div>
        <div className="table__body">
          <div className="table__body-item"></div>
          <div className="table__body-item"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
