import React, { useEffect, useState } from 'react';
import { BlockProduct, Loader, MetaData } from '../index';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import actions from '../../actions';
import ReactPaginate from 'react-paginate';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

export default function Home(props) {
    
    const [curentPage, setCurentPage] = useState(1);
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState([1,1000]);
    const [ratings, setRatings] = useState(0);
    
    const dispatch = useDispatch();
    const alert = useAlert();
    
    const { loading, products, totalPages, error } = useSelector(state => state.products);
    const keyword = props.match.params.keyword || "";

    const categoris = [
        'Electronics',
        'Cameras',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        "Books",
        'Clothes/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home'
    ]
    useEffect(() => {

        if(error) {
            return alert.error(error)
        }
        dispatch(actions.getProducts({ curentPage, keyword, price, category, ratings }));
        
    }, [dispatch, error, alert, curentPage, keyword, price, category, ratings])

    function setCurentPageNo( number ) {
        setCurentPage( number.selected + 1 );
    }
    return (
            <>
            {   loading 
                    ? <Loader></Loader>
                    : (
                        <>
                        <MetaData title="Buy best products online"></MetaData>
                        <h1>Lasted Product</h1>
                        <div className="row">
                            { keyword 
                                ? (
                                    <>
                                    <div className="col-6 col-md-3 mt-5 mb-3" >
                                        <div className="px-5">
                                            <Range
                                                mark = {{
                                                    1: `$1`,
                                                    1000: `$1000`
                                                }}
                                                min = { 1 }
                                                max = { 1000 }
                                                defaultValue = { [1,1000] }
                                                tipFormatter = { value => `$${value}` }
                                                tipProps = {{
                                                    placement: "top",
                                                    visible: true
                                                }}
                                                value = { price }
                                                onChange = { (price) => setPrice(price) }
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <h4 className="mb-3" onClick={() => setCategory("")}>
                                                Categoris
                                            </h4>
                                            <ul className="pl-0">
                                                {
                                                    categoris.map(category => (
                                                        <li style={{
                                                                cursor: 'pointer',
                                                                listStyle: 'none'
                                                            }}
                                                        key = {category}
                                                        onClick={() => setCategory(category)}
                                                        >
                                                            {category}
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                            <ul className="pl-0">
                                                {
                                                    [1,2,3,4,5].map(star => (
                                                        <li style={{
                                                                cursor: 'pointer',
                                                                listStyle: 'none'
                                                            }}
                                                        key = {star}
                                                        onClick={() => setRatings(star)}
                                                        >
                                                            <div className="rating-outer">
                                                                <div className="rating-inner"
                                                                    style={{
                                                                        width: `${star * 20}%`
                                                                    }}
                                                                ></div>
                                                            </div>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-9">
                                        <div className="row">
                                        {
                                            products ? products.map(product => (
                                                <div key={product._id} className="col-6 col-md-4">
                                                    <BlockProduct product = {product} />
                                                </div>
                                            )) : <div></div> 
                                        }
                                        </div>
                                    </div>
                                   </>
                                )
                                : 
                                    products ? products.map(product => (
                                        <div key={product._id} className="col-xs-3 col-sm-3 col-md-3 col-lg-3 my-3">
                                            <BlockProduct product = {product} />
                                        </div>
                                    )) : <div></div> 
                            }
                        </div>
                        <div className="d-flex justify-content-around">
                            <ReactPaginate 
                                pageCount = { totalPages }
                                pageRangeDisplayed = { 3 }
                                marginPagesDisplayed = { 2 }
                                onPageChange = { setCurentPageNo }
                                forcePage = { curentPage - 1 }
                                containerClassName = "pagination"
                                pageClassName = "page-item"
                                pageLinkClassName = "page-link"
                                activeClassName = "active"
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
