import React from "react";
import PropTypes from "prop-types";
import { FaTrash } from "react-icons/fa";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

const TestCaseHeader = ({ prueba, index, isOpen, setIsOpen, eliminarPrueba }) => {
  return (
    <div
      className="test-header d-flex justify-content-between align-items-center"
      style={{ cursor: "pointer" }}
      onClick={() => setIsOpen(!isOpen)}
      role="button"              
      tabIndex={0}               
      onKeyDown={(e) => {        
        if (e.key === "Enter" || e.key === " ") {
          setIsOpen(!isOpen);
        }
      }}
    >
      <div className="test-title d-flex align-items-center gap-2">
        <span>Prueba {index + 1}</span>
        <span style={{ fontSize: "0.85rem", color: "#666" }}>
          ({prueba.nombreFuncion || "sin nombre"})
        </span>
      </div>

      <div className="d-flex align-items-center gap-3">
        <FaTrash
          className="icon-trash"
          role="button"           
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            eliminarPrueba(index);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.stopPropagation();
              eliminarPrueba(index);
            }
          }}
        />
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>
    </div>
  );
};

TestCaseHeader.propTypes = {
  prueba: PropTypes.shape({
    nombreFuncion: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  eliminarPrueba: PropTypes.func.isRequired,
};

export default TestCaseHeader;
