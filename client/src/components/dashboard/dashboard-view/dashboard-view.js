import React from 'react';
import DashboardView1 from './dashboard-display-1';
import DashboardView2 from './dashboard-display-2';
import DashboardView3 from './dashboard-display-3';
import DashboardView4 from './dashboard-display-4';
import './style.css';

function DashboardView() {
  return (
    <>
      <div className="box-flex">
        <div className="display">
          <DashboardView1 />
        </div>
        <div className="display">
          <DashboardView2 />
        </div>
      </div>
      <div className="box-flex">
        <div className="display">
          <DashboardView3 />
        </div>
        <div className="display">
          <DashboardView4 />
        </div>
      </div>
    </>
  );
}

export default DashboardView;
