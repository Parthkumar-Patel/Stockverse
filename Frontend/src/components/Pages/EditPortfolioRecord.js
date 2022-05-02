// Author: Sai Rahul Kodumuru (B00875628)
import React, { useState, useEffect } from 'react';
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { Navigation } from './Navigation';
import '../Css/Portfolio.css';
import {
  getPortfolioDataById,
  deletePortfolioRecord,
  editPortfolioRecord,
  isAuthenticated,
} from '../../utils/apiCalls';
import getSymbolFromCurrency from 'currency-symbol-map';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

function EditPortfolioRecord() {
  const { id: userId } = isAuthenticated();

  const { id: recordId } = useParams();
  const [portfolioData, setPortfolioData] = useState({
    instrumentName: '',
    instrumentSymbol: '',
    instrumentType: '',
    instrumentRegion: '',
    currency: '',
    buyQuantity: 0,
    avgBuyPrice: 0,
    remarks: 'NA',
    error: { status: false, message: '' },
  });

  const {
    instrumentName,
    instrumentSymbol,
    buyQuantity,
    avgBuyPrice,
    remarks,
    currency,
  } = portfolioData;

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPortfolioData(userId) {
      const response = await toast.promise(
        getPortfolioDataById(userId, recordId),
        {
          pending: 'Loading Data...',
          success: 'Successfully loaded data 👌',
          error: 'Something went wrong 🤯',
        },
        {
          theme: 'dark',
        }
      );
      const newData = response['data'];
      setPortfolioData({ ...portfolioData, ...newData });
    }

    // Call the Async Function
    fetchPortfolioData(userId);
  }, [recordId]);

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

    const newPortfolioData = {
      ...portfolioData,
      error: { status: false, message: '' },
    };

    setPortfolioData(newPortfolioData);

    // Add it to the mongoDB!
    const addResult = await editPortfolioRecord(
      newPortfolioData,
      userId,
      recordId
    );
    if (addResult.status) {
      toast.success('Successfully edited the record', {
        theme: 'dark',
      });
      navigate('/portfolio');
    } else {
      setPortfolioData({
        ...portfolioData,
        error: { status: true, message: addResult.message },
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
              <OverlayTrigger
                overlay={
                  <Tooltip id="tooltip-disabled tooltip-right">
                    Type can't be modified once added
                  </Tooltip>
                }
              >
                <span>
                  <Form.Select
                    className="mb-3 fw-normal disabled-input-text"
                    size="md"
                    aria-label="Default select example"
                    name="instrumentType"
                    onChange={handleChange}
                    disabled
                  >
                    <option value="Equity">Equity</option>
                    <option value="Crypto">Crypto</option>
                  </Form.Select>
                </span>
              </OverlayTrigger>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          {/* Instrument Symbol */}
          <Col>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Instrument Symbol</Form.Label>
              <OverlayTrigger
                overlay={
                  <Tooltip id="tooltip-disabled tooltip-right">
                    Symbol Cannot be modified once added
                  </Tooltip>
                }
              >
                <span>
                  <Form.Control
                    type="text"
                    className="fw-normal disabled-input-text"
                    size="sm"
                    placeholder="Ex: IBM.USA (or) BTC.USD"
                    onChange={handleChange}
                    name="instrumentSymbol"
                    value={instrumentSymbol}
                    disabled={true}
                  />
                </span>
              </OverlayTrigger>
            </Form.Group>
          </Col>

          {/* Remarks */}
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
              <Form.Label>
                Average Buy Price ({getSymbolFromCurrency(currency) + ' '}
                {currency} )
              </Form.Label>
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

        <div className="d-flex justify-content-center mt-4">
          <Form.Group className="m-2">
            <Button role="button" variant="outline-dark" type="submit">
              Edit
            </Button>
          </Form.Group>
          <Form.Group className="m-2">
            <Button
              role="button"
              variant="outline-danger"
              type="button"
              onClick={handleDeleteRecord}
            >
              Delete
            </Button>
          </Form.Group>
        </div>
      </Form>
    );
  };

  const handleDeleteRecord = async () => {
    const { data } = await toast.promise(
      deletePortfolioRecord(userId, recordId),
      {
        pending: 'Deleting...',
        success: 'Successfully deleted the record',
        error: 'Error in deleting the record',
      },
      { theme: 'dark' }
    );

    if (data.success) {
      navigate('/portfolio');
    } else {
      toast.error('Failed to delete the record', {
        theme: 'dark',
      });
      setPortfolioData({
        ...portfolioData,
        error: { status: true, message: data.message },
      });
    }
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
      <Container fluid className="pf-bg-container p-2 pf-container">
        {displayErrorMessage()}
        <h3 className="text-center mb-5">Make changes to your portfolio</h3>
        {displayForm()}
        <p className="text-muted fst-italic fs-6">
          Last Updated at: {portfolioData.updatedAt}
        </p>
      </Container>
    </>
  );
}

export default EditPortfolioRecord;
