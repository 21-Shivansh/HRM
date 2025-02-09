import React from 'react';
import './CustomTable.css';

function CustomTable({ columns, data }) {
  return (
    <div className="custom-table-container">
      <table className="custom-table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className={column.className}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex} className={column.className}>{row[column.accessor]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomTable;