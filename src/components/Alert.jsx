import React from "react";

export default function Alert({ alert }) {
  return (
    <div className={`alert alert-${alert.category} mt-2`} role="alert">
      {alert.message}
    </div>
  );
}
