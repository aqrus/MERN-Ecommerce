import React, { Fragment, useEffect } from 'react';
import { Loader } from '../index';
import { MDBDataTable } from 'mdbreact';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../actions';
import { clearError } from '../../actions/orderActions';

export default function ListOrder() {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, orders } = useSelector(state => state.myOrders);

    useEffect(() => {
        dispatch(actions.myOrders());

        if (error) {
            alert.error(error);
            dispatch(clearError())
        }
    }, [dispatch, alert, error])

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Num of Items',
                    field: 'numOfItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                },
            ],
            rows: []
        }

        orders.forEach(order => {
            data.rows.push({
                id: order._id,
                numOfItems: order.orderItems.length,
                amount: `$${order.totalPrice}`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                    ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                    : <p style={{ color: 'red' }}>{order.orderStatus}</p>,
                actions:
                    <a href={`/order/${order._id}`} className="btn btn-primary">
                        <i className="fa fa-eye"></i>
                    </a>
            })
        })
        return data;
    }
    return (
        <Fragment>
            <h1 className="my-5">My Orders</h1>
            { loading ? <Loader /> : orders ? (
                <MDBDataTable
                    data={setOrders()}
                    className="px-3"
                    bordered
                    striped
                    hover
                />
            ) : <h5> Your's order is empty </h5>}
        </Fragment>
    )
}
