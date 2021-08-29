import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import actions from '../../actions';
import { Loader } from '../index'

export default function Login(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { loading, isAuthenticated, error } = useSelector(state => state.auth)

    const dispatch = useDispatch();
    const alert = useAlert();

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/'
    useEffect(() => {
        if (isAuthenticated) {
            props.history.push(redirect);
        }
        if (error) {
            return alert.error(error)
        }

    }, [alert, error, isAuthenticated, props.history, redirect])

    const submitLoginHandler = (e) => {
        e.preventDefault();
        dispatch(actions.userLogin(email, password))

    }

    return (
        <>
            {
                loading
                    ? <Loader></Loader>
                    : (
                        <div className="row wrapper">
                            <div className="col-10 col-lg-5">
                                <form className="shadow-lg" onSubmit={submitLoginHandler}>
                                    <div className="form-group">
                                        <label htmlFor="email_field">Email</label>
                                        <input
                                            name="email"
                                            type="email"
                                            id="email"
                                            className="form-control"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password_field">Password</label>
                                        <input
                                            name="password"
                                            type="password"
                                            id="password"
                                            className="form-control"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <Link to="/password/forgot" className="float-right mb-4">Forgot Password?</Link>

                                    <button
                                        id="login_button"
                                        type="submit"
                                        className="btn btn-block py-3"
                                    >
                                        LOGIN
                                    </button>

                                    <Link to="/register" className="float-right mt-3">New User?</Link>
                                </form>
                            </div>
                        </div>
                    )
            }
        </>
    )
}
