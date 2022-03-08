import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import Form from '../pages/Form';

const PUBLIC_KEY = 'pk_test_51K6Xk2KjCCkwu1MGYp58bDoJw6GjjRFiEAfjx9TMZVLa0PKB8AGuUbSKuVS2hmrwkyEYYTaI9kJzz6L4IKOWbQOD00igmmoFnP';

const StripeTestPromise = loadStripe(PUBLIC_KEY);

const StripeContainer = () => {
    return (
        <Elements stripe={StripeTestPromise}>
            <Form />
        </Elements>
    );
};

export default StripeContainer;