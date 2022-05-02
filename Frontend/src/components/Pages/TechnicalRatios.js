// Author: Sai Rahul Kodumuru (B00875628)

import React from 'react';
import '../Css/InstrumentDashboard.css';
import '../Css/Portfolio.css';
import { OverlayTrigger, Tooltip, Table } from 'react-bootstrap';

function TechnicalRatios({ companyOverview }) {
  return (
    <div className="col">
      <Table striped bordered className="tech-table">
        <tbody>
          <tr>
            <td style={{ backgroundColor: '#d8d8d8' }}>
              <p className="fs-6 fw-bold">
                P/E Ratio
                <span>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="button-tooltip-2">
                        The price-to-earnings ratio (P/E ratio) is the ratio for
                        valuing a company that measures its current share price
                        relative to its earnings per share (EPS).
                      </Tooltip>
                    }
                  >
                    <i role="button" className="fas fa-info-circle p-1"></i>
                  </OverlayTrigger>
                </span>
              </p>
              <p>{companyOverview['PERatio']}</p>
            </td>
            <td>
              <p className="fw-bold">
                PEG Ratio
                <span>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="button-tooltip-2">
                        The price/earnings to growth ratio (PEG ratio) is a
                        stock's price-to-earnings (P/E) ratio divided by the
                        growth rate of its earnings for a specified time period
                      </Tooltip>
                    }
                  >
                    <i role="button" className="fas fa-info-circle p-1"></i>
                  </OverlayTrigger>
                </span>
              </p>
              <p>{companyOverview['PEGRatio']}</p>
            </td>
            <td>
              <p className="fw-bold">
                Book Value
                <span>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="button-tooltip-2">
                        Book value is equal to the cost of carrying an asset on
                        a company's balance sheet, and firms calculate it
                        netting the asset against its accumulated depreciation
                      </Tooltip>
                    }
                  >
                    <i role="button" className="fas fa-info-circle p-1"></i>
                  </OverlayTrigger>
                </span>
              </p>
              <p>{companyOverview['BookValue']}</p>
            </td>
            <td>
              <p className="fw-bold">
                EPS
                <span>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="button-tooltip-2">
                        Earnings per share (EPS) is calculated as a company's
                        profit divided by the outstanding shares of its common
                        stock.
                      </Tooltip>
                    }
                  >
                    <i role="button" className="fas fa-info-circle p-1"></i>
                  </OverlayTrigger>
                </span>
              </p>
              <p>{companyOverview['EPS']}</p>
            </td>
            <td>
              <p className="fw-bold">
                P/B Ratio
                <span>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="button-tooltip-2">
                        Companies use the price-to-book ratio (P/B ratio) to
                        compare a firm's market capitalization to its book value
                      </Tooltip>
                    }
                  >
                    <i role="button" className="fas fa-info-circle p-1"></i>
                  </OverlayTrigger>
                </span>
              </p>
              <p>{companyOverview['PriceToBookRatio']}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p className="fw-bold">
                DPS{' '}
                <span>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="button-tooltip-2">
                        Dividend per share (DPS) is the sum of declared
                        dividends issued by a company for every ordinary share
                        outstanding
                      </Tooltip>
                    }
                  >
                    <i role="button" className="fas fa-info-circle p-1"></i>
                  </OverlayTrigger>
                </span>
              </p>
              <p>{companyOverview['DividendPerShare']}</p>
            </td>
            <td>
              <p className="fw-bold">
                Dividend Yield{' '}
                <span>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="button-tooltip-2">
                        The dividend yield, expressed as a percentage, is a
                        financial ratio (dividend/price) that shows how much a
                        company pays out in dividends each year relative to its
                        stock price.
                      </Tooltip>
                    }
                  >
                    <i role="button" className="fas fa-info-circle p-1"></i>
                  </OverlayTrigger>
                </span>
              </p>

              <p>{companyOverview['DividendYield']}</p>
            </td>
            <td>
              <p className="fw-bold">
                ROE
                <span>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="button-tooltip-2">
                        Return on equity (ROE) is a measure of financial
                        performance calculated by dividing net income by
                        shareholders' equity.
                      </Tooltip>
                    }
                  >
                    <i role="button" className="fas fa-info-circle p-1"></i>
                  </OverlayTrigger>
                </span>
              </p>
              <p>{companyOverview['ReturnOnEquityTTM']}</p>
            </td>
            <td>
              <p className="fw-bold">
                50 DMA
                <span>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="button-tooltip-2">
                        The 50-day moving average also called "50 DMA" is a
                        reliable technical indicator used by several investors
                        to analyze price trends. It's simply a security's
                        average closing price over the previous 50 days.
                      </Tooltip>
                    }
                  >
                    <i role="button" className="fas fa-info-circle p-1"></i>
                  </OverlayTrigger>
                </span>
              </p>
              <p>
                {companyOverview['50DayMovingAverage'] +
                  ' ' +
                  companyOverview['Currency']}
              </p>
            </td>
            <td>
              <p className="fw-bold">
                200 DMA
                <span>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="button-tooltip-2">
                        The 200-day moving average also called "200 DMA" is a
                        reliable technical indicator used by several investors
                        to analyze price trends. It's simply a security's
                        average closing price over the previous 200 days.
                      </Tooltip>
                    }
                  >
                    <i role="button" className="fas fa-info-circle p-1"></i>
                  </OverlayTrigger>
                </span>
              </p>
              <p>
                {companyOverview['200DayMovingAverage'] +
                  ' ' +
                  companyOverview['Currency']}
              </p>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default TechnicalRatios;
