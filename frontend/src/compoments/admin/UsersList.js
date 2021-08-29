import { MDBDataTable } from 'mdbreact';
import React, { Fragment } from 'react';
import { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../../actions/userActions';
import { Loader } from '../index';
import Sidebar from './Sidebar';
import actions from '../../actions';
import { Link } from 'react-router-dom';
import { USER_DELETE_RESET } from '../../constant/userConnstants';

export default function UsersList(props) {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, users } = useSelector(state => state.allUsers);
    const { isDeleted } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(actions.allUsers());

        if (error) {
            alert.error(error);
            dispatch(clearError())
        }

        if (isDeleted) {
            alert.success('User deleted successfully');
            props.history.push('/admin/users');
            dispatch({ type: USER_DELETE_RESET })
        }

    }, [dispatch, alert, error, isDeleted, props.history])

    const deleteUserHandler = (id) => {
        dispatch(actions.deleteUser(id))
    }

    const setUsers = () => {
        const data = {
            columns: [
                {
                    label: 'User ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Role',
                    field: 'role',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        users.forEach(user => {
            data.rows.push({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,

                actions: <Fragment>
                    <Link to={`/admin/user/${user._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteUserHandler(user._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }
    return (
        <Fragment>
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>

            <div className="col-12 col-md-10">
                <Fragment>
                    <h1 className="my-5">All Users</h1>

                    {loading ? <Loader /> : (
                        <MDBDataTable
                            data={setUsers()}
                            className="px-3"
                            bordered
                            striped
                            hover
                        />
                    )}

                </Fragment>
            </div>
        </div>

    </Fragment>
    )
}
