import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <Fragment>
            <nav className="navbar row">
                <div className="col-12 col-md-3">
                    <div className="navbar-brand">
                        <Link to="/">
                            <img src="/images/shopit_logo.png" alt="" />
                        </Link>
                    </div>
                </div>
                <div className="col-12 col-md-6 mt-2 mt-md-0">
                    <div className="input-group">
                        <input type="text"
                            className="form-control" 
                            name="search_field" 
                            id="search_field" 
                            placeholder="Enter product name ..."
                        />
                        <span className="input-group-btn">
                            <button 
                                className="btn btn-secondary" 
                                type="button"
                                id="search_btn"
                            >
                                <i className="fa fa-search" aria-hidden="true"></i>
                            </button>
                        </span>
                    </div>
                </div>
                <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                        <button id="login_btn" type="button" className="btn">Login</button>

                        <span id="cart" className="ml-3">Cart</span>
                        <span className="ml-1" id="cart_count">3</span>
                </div>
            </nav>
        </Fragment>
    )
}
