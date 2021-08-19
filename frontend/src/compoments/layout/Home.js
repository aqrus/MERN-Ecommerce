import React, { useEffect } from 'react';
import MetaData from './MetaData';
import { BlockProduct, Loader } from './index';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import actions from '../../actions';

export default function Home() {

    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, products, error } = useSelector(state => state.products);

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
                        </>
                    )
            }
            </>
    )
}
