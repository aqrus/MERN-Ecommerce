import React, { useEffect } from 'react';
import MetaData from './MetaData';
import { BlockProduct, Loader } from './index';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import actions from '../../actions';
import ReactPaginate from 'react-paginate';

export default function Home() {

    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, products, pageCount, error } = useSelector(state => state.products);

    useEffect(() => {

        if(error) {
            return alert.error(error)
        }
        dispatch(actions.getProducts());
        
    }, [dispatch, error, alert])

    return (
            <>
            {   loading 
                    ? <Loader></Loader>
                    : (
                        <>
                        <MetaData title="Buy best products online"></MetaData>
                        <h1>Lasted Product</h1>
                        <div className="row">
                            {
                                products ? products.map(product => (
                                    <div key={product._id} className="col-xs-3 col-sm-3 col-md-3 col-lg-3 my-3">
                                        <BlockProduct product = {product} />
                                    </div>
                                )) : <div></div>
                            }
                        </div>
                        <div className="d-flex justify-content-around">
                            <ReactPaginate 
                                pageCount = {pageCount}
                                pageRangeDisplayed = { 3 }
                                marginPagesDisplayed = { 2 }
                                containerClassName = "pagination"
                                pageClassName = "page-item"
                                pageLinkClassName = "page-link"
                                activeClassName = "page-item active"
                                activeLinkClassName = "page-link"
                                previousClassName = "page-item"
                                nextClassName ="page-item"
                                previousLinkClassName = "page-link"
                                nextLinkClassName = "page-link"
                                disabledClassName ="disabled"
                            />
                        </div>
                        </>
                    )
            }
            </>
    )
}
