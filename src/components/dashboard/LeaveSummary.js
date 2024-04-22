import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Button, Input, FormGroup } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import CommonTable from '../CommonTable';
import message from '../Message';
import api from '../../constants/api';

const TradingSummary = () => {
  const [report, setReport] = useState();
  const [userSearchData, setUserSearchData] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [selectedYear, setSelectedYear] = useState('');

  //get lineitems
  const getInvoices = () => {
    api
      .get('/leave/getDashboardLeave')
      .then((res) => {
        setUserSearchData(res.data.data);
        setReport(res.data.data);
      })
      .catch(() => {
        message('Invoices not found', 'error');
      });
  };

  const handlePeriod = (e) => {
    setSelectedMonth(e.target.value);
  };

  const [months] = useState([
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ]);

  const generateMonthOptions = () => {
    return months.map((month) => (
      <option key={month} value={month}>
        {month}
      </option>
    ));
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, index) => currentYear - index);
  
    // Include the current year in the list with a unique key
    years.push(currentYear);
  
    return years.map((year) => (
      <option key={`year_${year}`} value={year}>
        {year}
      </option>
    ));
  };

  const handleSearch = () => {
    const newData = report.filter((el) => {
      const selectedMonthIndex = months.indexOf(selectedMonth) + 1;
  
      const fromDate = new Date(el.from_date);
      const toDate = new Date(el.to_date);
  
      const fromYear = fromDate.getFullYear();
      const fromMonth = fromDate.getMonth() + 1;
  
      const toYear = toDate.getFullYear();
      const toMonth = toDate.getMonth() + 1;
  
      const dateMatches =
        (fromMonth === selectedMonthIndex && fromYear.toString() === selectedYear) ||
        (toMonth === selectedMonthIndex && toYear.toString() === selectedYear);
  
      return dateMatches;
    });
  
    setUserSearchData(newData);
  };
  
  const [page, setPage] = useState(0);
  const employeesPerPage = 20;
  const numberOfEmployeesVistited = page * employeesPerPage;
  const displayEmployees = userSearchData.slice(
    numberOfEmployeesVistited,
    numberOfEmployeesVistited + employeesPerPage,
  );
  const totalPages = Math.ceil(userSearchData.length / employeesPerPage);

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  useEffect(() => {
    getInvoices();
  
  }, []);

  const columns = [
    {
      name: 'S.No',
      selector: '',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
      name: 'Staff Name',
      selector: 'employee_name',
      grow: 0,
      wrap: true,
    },
    {
      name: 'Permission',
      selector: 'permission_count',
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },
    {
      name: 'Leave',
      selector: 'other_leave_count',
      grow: 0,
      width: 'auto',
      wrap: true,
    },
    
   
   
  ];

  return (
    <>
      <Card>
        <CardBody>
          <Row>
          <Col className="xs-fullWidth">
        <FormGroup>
          <Input
            type="select"
         
            onChange={(e) => handlePeriod(e)}
          >
            {generateMonthOptions()}
          </Input>
        </FormGroup>
      </Col>
      <Col className="xs-fullWidth">
        <FormGroup>
          <Input
            type="select"
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">Select Year</option>
            {generateYearOptions()}
          </Input>
        </FormGroup>
      </Col>
            <Col md="1">
              <FormGroup>
                <Button color="primary" className="shadow-none" onClick={() => handleSearch()}>
                  Go
                </Button>
              </FormGroup>
            </Col>
          </Row>
        </CardBody>

        <CommonTable title="Enquiry Summary">
          <thead>
            <tr>
              {columns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {displayEmployees &&
              displayEmployees.map((el, i) => {
                return (
                  <tr >
                    <td>{i + 1}</td>
                    {/*
                      {el.invoice_due_date ? moment(el.invoice_due_date).format('DD-MM-YYYY') : ''}
                    </td> */}
                    <td>{el.employee_name}</td>
                    <td>{el.permission_count}</td>
                    <td>{el.other_leave_count}</td>
            
                  </tr>
                );
              })}
          </tbody>
        </CommonTable>
        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          pageCount={totalPages}
          onPageChange={changePage}
          containerClassName="navigationButtons"
          previousLinkClassName="previousButton"
          nextLinkClassName="nextButton"
          disabledClassName="navigationDisabled"
          activeClassName="navigationActive"
        />
      </Card>
    </>
  );
};

export default TradingSummary;
