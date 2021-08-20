import React, { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../MetaData';
import actions from '../../../actions'
import { Loader } from '../index';
import { Carousel } from 'react-bootstrap';
export default function DetailProduct(props) {

    const { loading, product, error } = useSelector(state => state.product);

    const alert = useAlert();
    const dispatch = useDispatch();

    useEffect(() => {

        if (error) {
            return alert.error(error)
        }
        dispatch(actions.getProductDetails(props.match.params.id))

    }, [dispatch, props.match.params.id, error, alert])

    return (
        <>
            {
                loading ? <Loader />
                    : (
                        <>
                            <MetaData title={product.name} />
                            <div className="row f-flex justify-content-around">
                                <div className="col-12 col-lg-5 img-fluid" id="product_image">
                                    <Carousel pause="hover">
                                        {product.images && product.images.map(image => (
                                            <Carousel.Item key={image.public_id}>
                                                <img className="d-block w-100" src={image.url} alt={product.title} />
                                            </Carousel.Item>
                                        ))}
                                    </Carousel>
                                </div>
                                <div className="col-12 col-lg-5 mt-5">
                                    <h1>{product.name}</h1>
                                    <br />
                                    <p>Product#: {product._id} </p>
                                    <hr />
                                    <div className="rating-outer">
                                        <div className="rating-inner" style = {{ width: `${(product.ratings / 5) * 100}%` }}>
                                        </div>
                                    </div>
                                    <span id="no_of_reviews">{ product.numOfReviews }</span>
                                    <hr />
                                    <p id="product_price"></p>
                                    <div className="stockCounter d-inline">
                                        <span className="btn btn-danger minus">-</span>

                                        <input type="number" className="form-control count d-inline" value='0' readOnly />

                                        <span className="btn btn-primary plus">+</span>
                                    </div>
                                    <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4" >Add to Cart</button>
                                    <p>Status: <span id="stock_status" className={product.stock > 0 ? 'greenColor' : 'redColor'} >{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>

                                    <hr />

                                    <h4 className="mt-2">Description:</h4>
                                    <p>{product.description}</p>
                                    <hr />
                                    <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>
                                    <hr />
                                </div>
                            </div>
                        </>
                    )
            }
        </>
    )
}
