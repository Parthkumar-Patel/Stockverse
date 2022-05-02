import React from 'react';
import StripeCheckoutButton from 'react-stripe-checkout';
import "../Css/Payment.css"
import {
    Button,
    Form,
} from "react-bootstrap";
import {
    makePayment,
    updateUserSubscription
} from '../../utils/apiCalls';

const stripe_publicKey = "pk_test_51KhmBKLyxaCK9H4ulqAVRo7eM4jsIk64WJ8iVnKUUMwQCOplmGfVzz18fZ7csy2Vv7RrbqpC5NlagD1uUQcqqYlc00KTtRVewT";

const PaymentForm = (props) => {
    const handleSubmit = async (token) => {
        let userId = props.userId;
        let response = await makePayment(userId, token);
        if (response.status) {
            if (typeof (props.callback) === "function") {
                updateUserSubscription();
                props.callback(response.data);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <StripeCheckoutButton
                stripeKey={stripe_publicKey}
                token={handleSubmit}
                amount={100}
                currency="cad"
            >
                <Form.Group className="d-flex justify-content-end mt-4">
                    <Button role="button" variant="outline-dark">
                        Make Payment
                    </Button>
                </Form.Group>
            </StripeCheckoutButton>
        </form >

    );
};

export default PaymentForm;