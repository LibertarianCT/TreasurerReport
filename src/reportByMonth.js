import React from 'react';
import PropTypes from 'prop-types';

const reportByMonth = (props) => {

    return (<div>My token is {props.token}</div>)

}

reportByMonth.propTypes = {
    token: PropTypes.string
}

export default reportByMonth;