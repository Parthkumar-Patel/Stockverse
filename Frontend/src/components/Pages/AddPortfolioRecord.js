// Author: Sai Rahul Kodumuru (B00875628)
import React, { useState } from 'react';
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Spinner,
} from 'react-bootstrap';
import { Navigation } from './Navigation';
import '../Css/Portfolio.css';
import {
  validateInstrumentSymbol,
  validateInstrumentCrypto,
  addPortfolioRecord,
  isAuthenticated,
} from '../../utils/apiCalls';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function AddPortfolioRecord() {
  const { id: userId } = isAuthenticated();
  const [portfolioData, setPortfolioData] = useState({
    instrumentName: '',
    instrumentSymbol: '',
    instrumentType: 'Equity',
    instrumentRegion: '',
    currency: '',
    buyQuantity: 0,
    avgBuyPrice: 0,
    remarks: 'NA',
    error: { status: false, message: '' },
    isLoading: false,
  });

  const {
    instrumentName,
    instrumentSymbol,
    buyQuantity,
    avgBuyPrice,
    remarks,
    isLoading,
  } = portfolioData;

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPortfolioData({ ...portfolioData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated() || !userId) {
      toast.error('You are not logged in', {
        theme: 'dark',
      });
      navigate('/');
      return;
    }

    // Start Loading
    setPortfolioData({ ...portfolioData, isLoading: true });

    // check if the quantity and price are positive numbers
    if (buyQuantity <= 0 || avgBuyPrice <= 0) {
      setPortfolioData({
        ...portfolioData,
        error: {
          status: true,
          isLoading: false,
          message:
            'Please enter positive numbers for Quantity and Buy Price fields',
        },
      });
      return;
    }

    let nw;
    if (portfolioData.instrumentType.toLowerCase() === 'Equity'.toLowerCase()) {
      nw = await validateInstrumentSymbol(instrumentSymbol.toUpperCase());
    } else {
      nw = await validateInstrumentCrypto(instrumentSymbol.toUpperCase());
    }

    if (nw.status) {
      const newPortfolioData = {
        ...portfolioData,
        instrumentRegion: nw.matchedItem['instrumentRegion'],
        currency: nw.matchedItem['currency'],
      };

      setPortfolioData(newPortfolioData);

      // Add it to the mongoDB!
      const addResult = await addPortfolioRecord(newPortfolioData, userId);
      if (addResult.status) {
        toast.success('Successfully added the record', {
          theme: 'dark',
        });
        navigate('/portfolio');
      } else {
        setPortfolioData({
          ...portfolioData,
          error: { status: true, message: addResult.message },
        });
      }
    } else {
      setPortfolioData({
        ...portfolioData,
        instrumentSymbol: '',
        error: {
          status: true,
          message: 'Invalid instrument Symbol...please check it',
        },
      });
    }
  };

  const displayForm = () => {
    return (
      <Form className="d-flex justify-content" onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Instrument Name</Form.Label>
              <Form.Control
                type="text"
                className="fw-normal"
                size="sm"
                placeholder="Ex: IBM"
                required
                onChange={handleChange}
                name="instrumentName"
                value={instrumentName}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Instrument Type</Form.Label>
              <Form.Select
                className="mb-3 fw-normal"
                size="md"
                aria-label="Default select example"
                name="instrumentType"
                onChange={handleChange}
                defaultValue="Equity"
              >
                <option value="Equity">Equity</option>
                <option value="Crypto">Crypto</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Instrument Symbol</Form.Label>
              <Form.Control
                type="text"
                className="fw-normal"
                size="sm"
                placeholder="Ex: IBM.USA (or) BTC.USD"
                required
                onChange={handleChange}
                name="instrumentSymbol"
                value={instrumentSymbol}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Remarks</Form.Label>
              <Form.Control
                type="text"
                className="fw-normal"
                size="sm"
                min="1"
                placeholder="Ex: short term buy"
                onChange={handleChange}
                name="remarks"
                value={remarks}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Buy Quantity</Form.Label>
              <Form.Control
                type="number"
                className="fw-normal"
                size="sm"
                placeholder="Ex:100"
                min="1"
                required
                onChange={handleChange}
                name="buyQuantity"
                value={buyQuantity}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Average Buy Price</Form.Label>
              <Form.Control
                type="number"
                step="any"
                className="fw-normal"
                size="sm"
                min="1"
                placeholder="Ex:1220"
                required
                onChange={handleChange}
                name="avgBuyPrice"
                value={avgBuyPrice}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="d-flex justify-content-center mt-4">
          <Button role="button" variant="outline-dark" type="submit">
            {!isLoading ? (
              <></>
            ) : (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden={isLoading}
              />
            )}
            Add
          </Button>
        </Form.Group>
      </Form>
    );
  };

  const handleClose = () => {
    setPortfolioData({
      ...portfolioData,
      error: { status: false, message: '' },
    });
  };

  const displayErrorMessage = () => {
    if (portfolioData.error.status) {
      return (
        <div className="d-flex justify-content-center">
          <Alert size="sm" variant="danger" dismissible onClose={handleClose}>
            {portfolioData.error.message}
          </Alert>
        </div>
      );
    }
  };

  return (
    <>
      <Navigation />

      <Container className="pf-bg-container p-2 pf-container">
        {displayErrorMessage()}
        <h3 className="text-center mb-5">
          {' '}
          Make a new entry to your portfolio
        </h3>
        {displayForm()}
      </Container>
    </>
  );
}

export default AddPortfolioRecord;
