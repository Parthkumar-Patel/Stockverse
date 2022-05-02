// Author: Sai Rahul Kodumuru (B00875628)
import React, { useEffect, useState } from 'react';
import { Navigation } from './Navigation';
import '../Css/Portfolio.css';
import {
  Row,
  Container,
  Col,
  Table,
  Form,
  Card,
  Button,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {
  getPortfolioData,
  getPortfolioDateMap,
  isAuthenticated,
} from '../../utils/apiCalls';

import { BsPencilSquare } from 'react-icons/bs';
import { toast } from 'react-toastify';
const Portfolio = () => {
  const { id: userId } = isAuthenticated();
  const [search, setSearch] = useState('');
  const [portfolioData, setPortfolioData] = useState([]);
  const [portfolioDateMap, setPortfolioDateMap] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPortfolioData(userId) {
      if (!isAuthenticated() || !userId) {
        toast.error('You are not logged in', {
          theme: 'dark',
        });
        navigate('/');
        return;
      }

      const response = await toast.promise(
        getPortfolioData(userId),
        {
          pending: 'Loading Data...🔵',
          success: 'Successfully loaded data 👌',
          error: 'Something went wrong 🤯',
        },
        { theme: 'dark' }
      );
      const mapResponse = await getPortfolioDateMap(userId);
      setPortfolioDateMap(mapResponse['data']['data']);
      setPortfolioData(response['data']['data']);
    }

    // Call the Async Function
    fetchPortfolioData(userId);
  }, [userId, navigate]);

  const renderPortfolioData = () => {
    if (portfolioData.length === 0) {
      return <></>;
    } else {
      return filterPortfolioData().map((portfolio, index) => {
        //determine if the investment is profit or loss
        if (portfolio !== null) {
          let textColor = 'text-success fw-bold';
          if (portfolio.currentValue < portfolio.investmentValue) {
            textColor = 'text-danger fw-bold';
          } else if (portfolio.currentValue === portfolio.investmentValue) {
            textColor = 'text-warning fw-bold';
          }

          return (
            <tr key={index} className="fs-6">
              <td>
                <span
                  role="button"
                  onClick={() => navigate(`/edit-portfolio/${portfolio._id}`)}
                >
                  <BsPencilSquare />
                </span>
              </td>
              <td>{portfolio.instrumentName}</td>
              <td>{portfolio.instrumentSymbol}</td>
              <td>{portfolio.instrumentType.toLowerCase()}</td>
              <td>{portfolio.instrumentRegion}</td>
              <td>{portfolio.buyQuantity}</td>
              <td>{portfolio.avgBuyPrice}</td>
              <td>
                {currencyFormatter(
                  portfolio.currency,
                  portfolio.investmentValue
                ).replace('-', '')}
              </td>
              <td>
                {currencyFormatter(
                  portfolio.currency,
                  portfolio.currentValue
                ).replace('-', '')}
              </td>

              <td className={textColor}>
                {currencyFormatter(
                  portfolio.currency,
                  portfolio.profitLoss
                ).replace('-', '')}
              </td>
            </tr>
          );
        }
      });
    }
  };

  const filterPortfolioData = () => {
    if (portfolioData.length > 0) {
      return portfolioData.filter((portfolio) => {
        if (portfolio !== null) {
          return (
            portfolio.instrumentName.toLowerCase().includes(search) ||
            portfolio.instrumentSymbol.toLowerCase().includes(search) ||
            portfolio.instrumentType.toLowerCase().includes(search) ||
            portfolio.instrumentRegion.toLowerCase().includes(search)
          );
        } else {
          return {};
        }
      });
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const showTable = () => {
    return (
      <div>
        <Table
          className="border border-secondary text-xsmall"
          responsive
          striped
          bordered
          hover
          size="sm"
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Symbol</th>
              <th>Type</th>
              <th>Region</th>
              <th>Buy Qty</th>
              <th>Buy Price</th>
              <th>Invested Value</th>
              <th>Current Value</th>
              <th>Profit/Loss</th>
            </tr>
          </thead>
          <tbody>{renderPortfolioData()}</tbody>
        </Table>
      </div>
    );
  };

  const showTodayCount = () => {
    return (
      <Card className="m-2 text-center" style={{ width: '18rem' }}>
        <Card.Header>Investments Made Today</Card.Header>
        <Card.Body>
          <Card.Title className="fs-1">
            {portfolioDateMap.today || 0}
          </Card.Title>
        </Card.Body>
      </Card>
    );
  };

  const showLast30DaysCount = () => {
    return (
      <Card className="m-2 text-center" style={{ width: '18rem' }}>
        <Card.Header>Investments in Last 30 Days</Card.Header>
        <Card.Body>
          <Card.Title className="fs-1">
            {portfolioDateMap.last30Days || 0}
          </Card.Title>
        </Card.Body>
      </Card>
    );
  };

  const showLast90DaysCount = () => {
    return (
      <Card className="m-2 text-center" style={{ width: '18rem' }}>
        <Card.Header>Investments in Last 90 Days</Card.Header>
        <Card.Body>
          <Card.Title className="fs-1">
            {portfolioDateMap.last90Days || 0}
          </Card.Title>
        </Card.Body>
      </Card>
    );
  };

  const currencyFormatter = (currency, value) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
      minimumFractionDigits: 2,
    });

    return formatter.format(value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    navigate('/add-portfolio/');
  };

  const displayFinalTable = () => {
    return (
      <>
        <Row className="p-3 searchBoxRow">
          <Col xs={6} className="">
            <Form.Group className="" controlId="formText">
              <Form.Control
                type="text"
                placeholder="    search"
                name="search"
                value={search}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col xs={3} className="">
            <Form.Group className="">
              <Button
                role="button"
                variant="outline-dark"
                type="button"
                className="mt-1"
                onClick={handleClick}
              >
                <i className="fas fa-plus-circle p-1"></i>
                New
              </Button>
            </Form.Group>
          </Col>
        </Row>

        <Row className="p-3">
          <Col xs={3} className="">
            {showTodayCount()}
            {showLast30DaysCount()}
            {showLast90DaysCount()}
          </Col>
          <Col className="mt-2">{showTable()}</Col>
        </Row>
      </>
    );
  };

  return (
    <>
      <Navigation />
      <Container className="pf-bg-container pf-container">
        {displayFinalTable()}
      </Container>
    </>
  );
};

export default Portfolio;
