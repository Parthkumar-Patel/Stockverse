import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { Navigation } from './Navigation';
import "../Css/Payment.css"
import {
    Row,
    Container,
    Col,
    Card
} from "react-bootstrap";
import {
    getPaymentById
} from '../../utils/apiCalls';

const PaymentDetails = () => {
    const { userId, transactionId } = useParams();
    const [transactionDetails, setTransactionDetails] = useState(null);

    useEffect(async () => {
        let transaction = await getPaymentById(userId, transactionId);
        setTransactionDetails(transaction?.[0]);
    }, [userId, transactionId])

    return (
        <>
            <Navigation />
            <Container className="pay-bg-container pay-container">
                <Row>
                    <Col className="d-flex justify-content-start mt-4">
                        <h3>Payment Details</h3>
                    </Col>
                </Row>
                {transactionDetails && <Row className="p-3">
                    <Card className="d-flex justify-content-end" style={{ width: '24rem' }}>
                        <Card.Body>
                            <dl className="row">
                                <dt className="col-sm-3">ID</dt>
                                <dd className="col-sm-9">{transactionDetails?.transactionId}</dd>

                                <dt className="col-sm-3">Card</dt>
                                <dd className="col-sm-9">{"*****" + transactionDetails?.details?.card?.last4}</dd>

                                <dt className="col-sm-3">Type</dt>
                                <dd className="col-sm-9">{transactionDetails?.details?.card?.brand}</dd>

                                <dt className="col-sm-3">Status</dt>
                                <dd className="col-sm-9">{transactionDetails?.status}</dd>

                                <dt className="col-sm-3">Date</dt>
                                <dd className="col-sm-9">{transactionDetails?.createdDate ? new Date(transactionDetails?.createdDate * 1000).toLocaleDateString() : '-'}</dd>
                            </dl>
                        </Card.Body>
                    </Card>
                </Row>}
            </Container>
        </>
    )
};


export default PaymentDetails;