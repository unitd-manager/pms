import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
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
  // State variables
  const [project, setProject] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userSearchData, setUserSearchData] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [status, setStatus] = useState('');

  console.log('project', project);

  // Fetch project data from API
  const getProject = () => {
    setLoading(true);
    api.get('/project/getProjects')
      .then((res) => {
        setProject(res.data.data);
        setUserSearchData(res.data.data);
        $('#example').DataTable({
          pagingType: 'full_numbers',
          pageLength: 20,
          processing: true,
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  // Search and filter function
  const handleSearch = () => {
    let newData = [...project];

    if (categoryName === 'general') {
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

  // Project table columns
  const columns = [
    {
      name: 'ID',
      selector: 'opportunity_id',
      grow: 0,
      wrap: true,
    },
    {
      name: 'Edit',
      selector: 'edit',
      cell: (row) => (
        <Link to={`/ProjectEdit/${row.project_id}?tab=1`}>
          <Icon.Edit2 />
        </Link>
      ),
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },
    {
      name: 'Code',
      selector: 'project_code',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Title',
      selector: 'title',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: 'Company',
      selector: 'company_name',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Contact',
      selector: 'contact_name',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'Category',
      selector: 'category',
      sortable: true,
      grow: 2,
      width: 'auto',
    },
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
      grow: 2,
      wrap: true,
    },
  ];

  return (
    <div className="MainDiv">
      <div className="pt-xs-25">
        <BreadCrumbs />
        <Card>
          <CardBody>
            <Row>
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
                    <option value="">Select</option>
                    <option value="Complete">Complete</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="On Hold">On Hold</option>
                    <option value="WIP">WIP</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="1" className="mt-3">
                <Button type="button" color="primary" className="shadow-none" onClick={handleSearch}>
                  Go
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Card>

        <CommonTable
          loading={loading}
          title="Project List"
          Button={
            <Link to="/ProjectDetails">
              <Button type="button" color="primary" className="shadow-none">
                Add New
              </Button>
            </Link>
          }
        >
          <thead>
            <tr>
              {columns.map((cell) => (
                <td key={cell.name}>{cell.name}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {userSearchData &&
              userSearchData
                .filter(element => 
                  status || categoryName ? element : ["WIP"].includes(element.status) && element.general !== 1
                )
                .map((element, i) => (
                  <tr key={element.project_id}>
                    <td>{i + 1}</td>
                    <td>
                      <Link to={`/ProjectEdit/${element.project_id}?tab=1`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.project_code}</td>
                    <td>{element.title}</td>
                    <td>{element.company_name}</td>
                    <td>{element.contact_name}</td>
                    <td>{element.category}</td>
                    <td>{element.status}</td>
                  </tr>
                ))}
          </tbody>
        </CommonTable>
      </div>
    </div>
  );
};

export default Project;
