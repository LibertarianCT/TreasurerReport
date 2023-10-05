import React from "react";
import PropTypes from "prop-types";
import { useCookies } from "react-cookie";

const ReportByMonth = (props) => {
  const [cookies, setCookie] = useCookies(["session"]);

  return `My token is ${cookies.access_token}`;
};

ReportByMonth.propTypes = {
  token: PropTypes.string,
};

export default ReportByMonth;
