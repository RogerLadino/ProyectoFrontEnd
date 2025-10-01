import React from "react";
import { FaTrash } from "react-icons/fa";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

const TestCaseHeader = ({ prueba, index, isOpen, setIsOpen, eliminarPrueba }) => {
  return (
    <div
      className="test-header d-flex justify-content-between align-items-center"
      style={{ cursor: "pointer" }}
      onClick={() => setIsOpen(!isOpen)}
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
          onClick={(e) => {
            e.stopPropagation();
            eliminarPrueba(index);
          }}
        />
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>
    </div>
  );
};

export default TestCaseHeader;
