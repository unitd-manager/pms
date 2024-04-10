import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
// import moment from 'moment';
// import { Button } from 'reactstrap';
import { Button, Card, CardBody, Col, FormGroup, Input, Label, Row } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import { Link } from 'react-router-dom';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';

const Project = () => {
  //state variable
  const [project,setProject] = useState(null);
  const [loading, setLoading] = useState(false)

  const [userSearchData, setUserSearchData] = useState('');
   const [categoryName, setCategoryName] = useState('');
    const [status, setStatus] = useState('');

console.log('project',project)
  //getting Project data in db
  const getProject = () => {
    api.get('/project/getProjects').then((res) => {
      setProject(res.data.data);
      setUserSearchData(res.data.data);
      $('#example').DataTable({
        pagingType: 'full_numbers',
        pageLength: 20,
        processing: true,
        dom: 'Bfrtip',
        buttons: [ {
          extend: 'print',
          text: "Print",
          className:"shadow-none btn btn-primary",
      }],
      });
      setLoading(false)
    }).catch(()=>{
      setLoading(false)
    });
  };


  const handleSearch = () => {
    let newData = project;
  
    // // Apply date filter
    // newData = newData.filter(x =>
    //   endDate && startDate
    //     ? x.start_date <= (endDate === '' ? x.start_date : endDate) &&
    //       x.start_date >= (startDate === '' ? x.start_date : startDate)
    //     : startDate
    //     ? x.start_date === (startDate === '' ? x.start_date : startDate)
    //     : x.start_date === (endDate === '' ? x.start_date : endDate)
    // );
  
    // Apply general filter
    if (categoryName === "general") {
      newData = newData.filter(x => x.general === 1);
  }
  if (status !== '') {
    newData = newData.filter(x => x.status === status);
  }
  
    setUserSearchData(newData);
  };
  

  useEffect(() => {
    getProject();
  }, []);

  //  stucture of Project list view
  const columns = [
    {
      name: "id",
      selector: "opportunity_id",
      grow:0,
      wrap: true,
    },
    {
        name: 'Edit',
        selector: "edit",
        cell: () => <Icon.Edit2 />,
        grow:0,
        width:'auto',
        button:true,
        sortable:false,
    },
   
    {
      name: "Code",
      selector: "project_code",
      sortable: true,
      grow:0,
      wrap: true
    },
    {
      name: "Title",
      selector: "title",
      sortable: true,
      grow:2,
      wrap: true
    },
    {
      name: "company",
      selector: "company_name",
      sortable: true,
      grow:0,
    },
    {
        name: "contact",
        selector: "contact_name",
        sortable: true,
        width:'auto',
        grow:3,
        // cell: d => <span>{d.closing.join(", ")}</span>
      },
      {
        name: "Category",
        selector: "category",
        sortable: true,
        grow:2,
        width:'auto',
      },
      {
        name: "Status",
        selector: "status",
        sortable: true,
        grow:2,
        wrap: true,
      },
  ]
  
  return (
    <div className="MainDiv">
      <div className="pt-xs-25">
        <BreadCrumbs />
        <Card>
        <CardBody>
          <Row>
            {/* <Col>
              <FormGroup>
                <Label>Start Date</Label>
                <Input
                  type="date"
                  name="startDate"
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>End Date</Label>
                <Input type="date" name="endDate" onChange={(e) => setEndDate(e.target.value)} />
              </FormGroup>
            </Col> */}
            <Col md="3">
                                <FormGroup>
                                    <Label>Search General</Label>
                                    <Input
                                        type="select"
                                        value={categoryName}
                                        onChange={(e) => setCategoryName(e.target.value)}
                                    >
                                        <option value="">Select</option>
                                        <option value="general">General</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md="2">
                <FormGroup>
                  <Label>Select Status</Label>
                  <Input
                    type="select"
                    name="status"
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    {' '}
                    <option value="">Select</option>
                    <option value="Complete">Complete</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="On Hold">On Hold</option>
                    <option value="WIP">WIP</option>
                  </Input>
                </FormGroup>
              </Col>
                            
           
            <Col md="1" className="mt-3">
              <Button color="primary" className="shadow-none" onClick={() => handleSearch()}>Go</Button>
            </Col>
          </Row>
        </CardBody>
      </Card>


        <CommonTable
        
        loading={loading}
          title="Project List"
          Button={
            <Link to="/BookingDetails">
              <Button color="primary" className="shadow-none">
                Add New
              </Button>
            </Link>
          }
        >
          <thead>
            <tr>
              {columns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
          {userSearchData &&
           userSearchData
          .filter(element => status ?element:["WIP"].includes(element.status))
          .map((element, i) => {
          return(
        <tr key={element.project_id}>
        <td>{i + 1}</td>
        <td><Link to={`/ProjectEdit/${element.project_id}?tab=1`}><Icon.Edit2 /></Link></td>
                <td>{element.project_code}</td>
                <td>{element.title}</td>
                <td>{element.company_name}</td>
                <td>{element.contact_name}</td>
                <td>{element.category}</td>
                <td>{element.status}</td>
                </tr>    
                 )
                })}

          </tbody>
        </CommonTable>
      </div>
    </div>
  );
};

export default Project;
