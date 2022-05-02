// Author: Sai Rahul Kodumuru (B00875628)

import '../Css/InstrumentDashboard.css';
import '../Css/Portfolio.css';
import { Navigation } from './Navigation';
import CompanyDescription from './CompanyDescription';
import TechnicalIndicators from './TechnicalIndicators';
import TechnicalRatios from './TechnicalRatios';
import InstrumentPlot from './InstrumentPlot';
import {
  getInstrumentDailyData,
  getCompanyOverview,
  validateInstrumentSymbol,
} from '../../utils/apiCalls';
import { getWishlistById } from '../../utils/axiosCall';
import { Container, Col, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams, useNavigate, NavLink } from 'react-router-dom';

function InstrumentDashboard() {
  const [instrumentData, setInstrumentData] = useState({});
  const [companyOverview, setCompanyOverview] = useState({});
  const [companyMeta, setCompanyMeta] = useState({});
  const [wishlistName, setWishlistName] = useState('');
  const [userInstruments, setUserInstruments] = useState([]);
  const [isGraph, setGraph] = useState(false);
  const { id: wishListId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const res = await getWishlistById(wishListId);
      if (res.status === 201) {
        const instrumentString = res.data.Data[0]['Investments'];
        const instrumentArray = instrumentString.split(',');
        setUserInstruments(instrumentArray);
        setWishlistName(res.data.Data[0]['Name']);
      }
    }

    fetchData();
  }, [wishListId]);

  const getDailyData = async (text) => {
    try {
      setGraph(true);
      const [symbol, name] = text.split('-');
      if (symbol === '') {
        toast.error('Please enter a valid symbol', {
          theme: 'dark',
        });
        return;
      }

      // Get the Company Meta
      const companyMeta = await validateInstrumentSymbol(symbol);
      if (!companyMeta.status) {
        throw new Error(companyMeta.message);
      } else {
        setCompanyMeta(companyMeta['matchedItem']);
      }

      // Get the instrument data
      const response = await getInstrumentDailyData(symbol);
      if (!response.status) {
        throw new Error(response.message);
      } else {
        setInstrumentData(response['data']);
      }

      // Get the company overview for US stocks only
      if (!symbol.includes('.')) {
        const overViewResponse = await getCompanyOverview(symbol);
        setCompanyOverview(overViewResponse['data']);
      } else {
        setCompanyOverview({});
      }
    } catch (error) {
      toast.error('Something Went wrong....', { theme: 'dark' });
      navigate('/wishlist');
    }
  };

  function instrumentsAccordion() {
    if (userInstruments.length > 0) {
      return userInstruments.map((instrument, i) => (
        <div
          className="accordion-item fw-normal text-left p-2"
          id="wishlist-tab"
          key={i}
          onClick={() => getDailyData(instrument)}
          role="button"
        >
          <span className="text-capitalize text-muted">
            {instrument.split('-')[1]}{' '}
            <span className="text-capitalize fw-lighter">
              ({instrument.split('-')[0]})
            </span>
          </span>
        </div>
      ));
    }
  }

  const displayGraph = () => {
    if (isGraph) {
      return (
        <div className="col">
          <div className="row">
            <div className="col">
              <div>
                <p className="fw-bold fs-4 mb-0">{companyMeta['2. name']} </p>
                <p className="text-muted fs-p8 mt-o px-0">
                  {companyMeta['1. symbol']} | {companyMeta['4. region']} (
                  {companyMeta['8. currency']}) | {companyMeta['7. timezone']}
                </p>
              </div>
              <div className="border border-secondary rounded-2">
                <InstrumentPlot dailyData={instrumentData} />
              </div>
            </div>
          </div>

          {Object.keys(companyOverview).length > 1 ? (
            <>
              <div className="row mt-2 mb-1">
                <TechnicalIndicators
                  companyOverview={{
                    MarketCapitalization:
                      companyOverview['MarketCapitalization'],
                    Sector: companyOverview['Sector'],
                    Industry: companyOverview['Industry'],
                  }}
                />
              </div>
              <div className="row mt-2 mb-1">
                <TechnicalRatios companyOverview={companyOverview} />
              </div>

              <div className="row">
                <CompanyDescription
                  companyDescription={companyOverview['Description']}
                />
              </div>
            </>
          ) : null}
        </div>
      );
    } else {
      return (
        <Col className="d-flex justify-content-center">
          <Row>Click On the Instrument on left side to begin with....</Row>
        </Col>
      );
    }
  };

  return (
    <>
      <Navigation />
      <Container fluid className="pf-bg-container p-2 pf-container">
        <div className="row">
          <div id="myWishlist" className="col-md-3 mx-3 rounded-3">
            <div className="accordion accordion-flush border border-secondary rounded">
              <div className="accordion-item fs-5 fw-bolder text-left px-1 rounded">
                <NavLink
                  to="/wishlist"
                  style={{ fontWeight: 'normal', color: 'grey' }}
                >
                  {wishlistName}{' '}
                </NavLink>
              </div>
              {instrumentsAccordion()}
            </div>
          </div>
          {displayGraph()}
        </div>
      </Container>
    </>
  );
}

export default InstrumentDashboard;
