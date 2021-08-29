import React from 'react';
import { Link } from 'react-router-dom';

export default function BlockProduct(props) {
    
    const { product } = props;

    return (
        
        <div className="card">
            <img className="card-img-top mx-auto"
                src={ product.images[0].url}
                alt={ product.name } />
            <div className="card-body d-flex flex-column">
                <h4 className="card-title">
                    <Link to={`/product/${ product._id }`}> { product.name }</Link>
                </h4>
                <div className="ratings mt-auto">
                    <div className="rating-outer">
                        <div className="rating-inner" style={{ width:`${ product.ratings / 5 * 100}%` }}></div>
                    </div>
                    <span id="no_of_reviews">(5 reviews)</span>
                </div>
                <p className="card-text">{ product.price }</p>
                <Link to={`/product/${ product._id }`}>
                    <button id="view_btn"
                        className="btn btn-block"
                        type="button"> Views Details
                    </button>
                </Link>
            </div>
        </div>
    )
}
