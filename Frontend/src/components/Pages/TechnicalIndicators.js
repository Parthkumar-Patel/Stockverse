// Author: Sai Rahul Kodumuru (B00875628)

import React from 'react';
import '../Css/InstrumentDashboard.css';

function TechnicalIndicators({ companyOverview }) {
  const companyMCap = new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'usd',
  }).format(companyOverview['MarketCapitalization']);
  return (
    <>
      <div className="col">
        <div className="card">
          <div className="card-header" style={{ backgroundColor: '#d8d8d8' }}>
            <p className="fs-6 fw-bold">Sector</p>
            <p className="text-capitalize card-text">
              {companyOverview['Sector'].toLocaleLowerCase()}
            </p>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card">
          <div className="card-header" style={{ backgroundColor: '#d8d8d8' }}>
            <p className="fs-6 fw-bold">Market Capitalization</p>
            <p className="text-capitalize card-text">{companyMCap}</p>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card">
          <div className="card-header" style={{ backgroundColor: '#d8d8d8' }}>
            <p className="fs-6 fw-bold">Industry</p>
            <p className="text-capitalize card-text fs-p8">
              {companyOverview['Industry'].toLocaleLowerCase()}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default TechnicalIndicators;
