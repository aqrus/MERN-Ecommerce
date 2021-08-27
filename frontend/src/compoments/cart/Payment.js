import React, { useEffect } from 'react';
import CheckoutSteps from './CheckoutSteps';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'
import axios from 'axios';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../../actions/orderActions';
import actions from '../../actions';

export default function Payment(props) {

    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth);
    const { cartItems, shippingInfo, orderInfo } = useSelector(state => state.cart);
    const { error } = useSelector(state => state.newOrder)
    const options = {
        style : {
            base: {
                fontSize: '16px'
            },
            invalid: {
                color: '#9e2146'
            }
        }
    }
    const order = {
        ...orderInfo,
        orderItems: cartItems,
        shippingInfo
    }

    useEffect(() => {

        if(error) {
            alert.error(error);
            dispatch(clearError())
        }
        
    }, [alert, dispatch, error])

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        document.querySelector('#pay_btn').disable = true;
        let res;
        try {

            const config = {
                headers: {
                    'Content-type': 'application/json'
                }
            }

            res = await axios.post('/api/v1/payment/process', paymentData, config);
            const clientSecrect = res.data.client_Secret;

            if(!stripe || !elements) {
                return;
            }

            const result = await stripe.confirmCardPayment(clientSecrect, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email
                    }
                }
            })

            if(result.error) {

                alert.error(result.error.message);
                document.querySelector('#pay_btn').disable = false;

            } else {

                if(result.paymentIntent.status === 'succeeded') {

                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }

                    dispatch(actions.createOrder(order));
                    props.history.push('/orders/success');

                    localStorage.removeItem('cartItems');
                    localStorage.removeItem('shippingInfo');
                    localStorage.removeItem('orderInfo');

                    dispatch(actions.resetCart())

                } else {
                    alert.error('there is some issue while payment processing');
                }

            }
            
        } catch (error) {
            document.querySelector('#pay_btn').disable = false;
            alert.error(error)
        }
    }
    return (
        <>
            <CheckoutSteps shipping confirmOrder payment />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-4">Card Info</h1>
                        <div className="form-group">
                            <label htmlFor="card_num_field">Card Number</label>
                            <CardNumberElement
                                type="text"
                                id="card_num_field"
                                className="form-control"
                                options={options}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="card_exp_field">Card Expiry</label>
                            <CardExpiryElement
                                type="text"
                                id="card_exp_field"
                                className="form-control"
                                options={options}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="card_cvc_field">Card CVC</label>
                            <CardCvcElement
                                type="text"
                                id="card_cvc_field"
                                className="form-control"
                                options={options}
                            />
                        </div>


                        <button
                            id="pay_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            Pay {` - ${orderInfo && orderInfo.totalPrice}`}
                        </button>

                    </form>
                </div>
            </div>

        </>
    )
}
