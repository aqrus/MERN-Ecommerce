import React from 'react';
import { Helmet } from 'react-helmet';

export default function MetaData(props) {

    const { title } = props;

    return (
        <Helmet>
            <title>{`${title}-ShopIT`}</title>
        </Helmet>
    )

}
