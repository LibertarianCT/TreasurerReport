import React from "react";
import PropTypes from "prop-types";

const ReportByMonth = (props) => {
  return `My token is ${props.access_token}`;
};

ReportByMonth.propTypes = {
  token: PropTypes.string,
};

export default ReportByMonth;
