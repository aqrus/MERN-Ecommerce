import './App.css';
import {
	Footer, Header, Home, DetailProduct,
	Login, Register, Profile, ProtectedRoute,
	UpdateProfile, UpdatePassword,
	ForgotPassword, NewPassword,
	Cart, Shipping, ConfirmOrder, Payment, OrderSuccess,
	ListOrder, DetailOrder,
	Dashboard, ProductsList, NewProduct, UpdateProduct, OrdersList, ProcessOrder,
	UsersList, UpdateUsers, ProductReviews
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
					<Route path="/orders/confirm" component={ConfirmOrder}></Route>
					{
						apiStripeKey && <Elements stripe={loadStripe(apiStripeKey)} >
							<ProtectedRoute path="/orders/payment" component={Payment} ></ProtectedRoute>
						</Elements>
					}
					<ProtectedRoute path="/orders/me" component={ListOrder} exact ></ProtectedRoute>
					<ProtectedRoute path="/orders/success" component={OrderSuccess} exact ></ProtectedRoute>
					<Route path="/password/forgot" component={ForgotPassword}></Route>
					<Route path="/password/reset/:token" component={NewPassword}></Route>
					<ProtectedRoute path="/me" component={Profile} exact ></ProtectedRoute>
					<ProtectedRoute path="/order/:id" component={DetailOrder} exact ></ProtectedRoute>
					<ProtectedRoute path="/me/update" component={UpdateProfile} exact ></ProtectedRoute>
					<ProtectedRoute path="/password/update" component={UpdatePassword} exact ></ProtectedRoute>
					<Route path="/register" component={Register}></Route>
					<Route path="/search/:keyword" component={Home}></Route>
					<Route path="/product/:id" component={DetailProduct}></Route>
				</div>

					<ProtectedRoute path="/dashboard" isAdmin={true} component={Dashboard} exact ></ProtectedRoute>
					<ProtectedRoute path="/admin/products" isAdmin={true} component={ProductsList} exact ></ProtectedRoute>
					<ProtectedRoute path="/admin/product" isAdmin={true} component={NewProduct} exact ></ProtectedRoute>
					<ProtectedRoute path="/admin/product/:id" isAdmin={true} component={UpdateProduct} ></ProtectedRoute>
					<ProtectedRoute path="/admin/orders" isAdmin={true} component={OrdersList} ></ProtectedRoute>
					<ProtectedRoute path="/admin/order/:id" isAdmin={true} component={ProcessOrder} ></ProtectedRoute>
					<ProtectedRoute path="/admin/users" isAdmin={true} component={UsersList} ></ProtectedRoute>
					<ProtectedRoute path="/admin/user/:id" isAdmin={true} component={UpdateUsers} ></ProtectedRoute>
					<ProtectedRoute path="/admin/reviews" isAdmin={true} component={ProductReviews} ></ProtectedRoute>
				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;
