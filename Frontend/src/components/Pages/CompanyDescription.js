import React from 'react';
// IBM Data has been collected from the Alphavantage API : https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo
function CompanyDescription({ companyDescription }) {
  return (
    <div className="col">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title fw-bold">Company Description</h5>
          <p className="card-text text-muted text-left">{companyDescription}</p>
        </div>
      </div>
    </div>
  );
}

export default CompanyDescription;
