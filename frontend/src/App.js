import './App.css';
import {
	Footer, Header, Home, DetailProduct,
	Login, Register, Profile, ProtectedRoute,
	UpdateProfile, UpdatePassword,
	ForgotPassword, NewPassword,
	Cart, Shipping, ConfirmOrder, Payment
} from './compoments';
import { BrowserRouter, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import store from './store';
import { loadUser } from './actions/userActions';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'

function App() {

	const [apiStripeKey, setApiStripeKey] = useState();
	useEffect(() => {
		store.dispatch(loadUser());

		async function getStripeAPiKey() {
			const { data } = await axios.get('/api/v1/payment/stripeapi');
			setApiStripeKey(data.stripeApiKey);
		}
		getStripeAPiKey();

	}, [])

	return (
		<BrowserRouter>
			<div className="App">
				<Header />
				<div className="container container-fluid">
					<Route path="/" exact component={Home}></Route>
					<Route path="/login" component={Login}></Route>
					<Route path="/cart" component={Cart}></Route>
					<Route path="/shipping" component={Shipping}></Route>
					<Route path="/order/confirm" component={ConfirmOrder}></Route>
					{
						apiStripeKey && <Elements stripe={loadStripe(apiStripeKey)} >
							<ProtectedRoute path="/order/payment" component={Payment} ></ProtectedRoute>
						</Elements>
					}
					<Route path="/password/forgot" component={ForgotPassword}></Route>
					<Route path="/password/reset/:token" component={NewPassword}></Route>
					<ProtectedRoute path="/me" component={Profile} exact ></ProtectedRoute>
					<ProtectedRoute path="/me/update" component={UpdateProfile} exact ></ProtectedRoute>
					<ProtectedRoute path="/password/update" component={UpdatePassword} exact ></ProtectedRoute>
					<Route path="/register" component={Register}></Route>
					<Route path="/search/:keyword" component={Home}></Route>
					<Route path="/product/:id" component={DetailProduct}></Route>
				</div>
				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;
