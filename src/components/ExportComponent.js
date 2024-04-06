import React from 'react';
import { CSVLink } from 'react-csv';
import * as XLSX from 'xlsx';
import PropTypes from 'prop-types';

const ExportComponent = ({ data }) => {
    ExportComponent.propTypes = {
        data:PropTypes.array
        //onSuccess:PropTypes.any
      };
  const csvData = {
    data,
    headers: ['Name', 'Age', 'Email'], // Sample headers
    filename: 'data.csv'
  };

  const excelData = data?.map(item => ({
    Name: item.name,
    Age: item.age,
    Email: item.email
  }));
  const excelFile = XLSX.utils.json_to_sheet(excelData||[]);
  const excelBuffer = XLSX.write(excelFile||[], { bookType: 'xlsx', type: 'buffer' });
  const excelBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });

  return (
    <div>
      <CSVLink {...csvData}>Export CSV</CSVLink>
      <a href={URL.createObjectURL(excelBlob)} download="data.xlsx">Export Excel</a>
    </div>
  );
};

export default ExportComponent;
