import React from "react";
import PropTypes from "prop-types";

export default function Alert({ alert }) {
  return (
    <div className={`alert alert-${alert.category} mt-2`} role="alert">
      {alert.message}
    </div>
  );
}

Alert.propTypes = {
  alert: PropTypes.shape({
    id: PropTypes.string,
    category: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
  }).isRequired
};
