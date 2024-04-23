import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Button,Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import { Link } from 'react-router-dom';
import readXlsxFile from 'read-excel-file';
import { ToastContainer } from 'react-toastify';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';
import Flag from '../../components/Flag';
import message from '../../components/Message';

const Clients = () => {
  //Const Variables
  const [clients, setClients] = useState(null);
  const [loading, setLoading] = useState(false)


  // get Clients
  const getClients = () => {
    api.get('/clients/getClients').then((res) => {
      setClients(res.data.data);
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

    // TRIGGER TO IMPORT EXCEL SHEET
    const importExcel = () => {
      $('#import_excel').trigger('click');
    }
  
    // UPLOAD FILE ON THER SERVER
    const uploadOnServer = (arr) => {
        api.post('/lead/import/excel', {data: JSON.stringify(arr)})
        .then(() => {
          message('File uploaded successfully', 'success');
          $('#upload_file').val(null);
        })
        .catch(() => {
          message('Failed to upload.', 'error');
        });
    }
  
    // PROCESSING AND FORMATTING THE DATA
    const processData = (rows) => {
      const arr = [];
      rows.shift();
  
      console.log(rows[0]);
      for ( let x = 0; x < rows.length; x++ ) {
        arr.push(
          {
            CompanyName: rows[x][0],
          Phone: rows[x][1],
          Mobile: rows[x][2],
          Email: rows[x][3],
            // SourceofLead: rows[x][1],
            // LeadStatus: rows[x][2],
            // Address: rows[x][3],
            // Country: rows[x][4],
            // PostalCode: rows[x][5],
            // Email: rows[x][6],
            // PhoneNo: rows[x][7],
            // LeadDate: rows[x][8],
            
          }
        )
      }
  
      uploadOnServer(arr);
    }
  
  
    // IMPORTING EXCEL FILE
    const importExcelFile = (e) => {
      console.log(e.target.id)
      message('test1', 'success');
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          readXlsxFile(e.target.files[0])
            .then((rows) => {
              processData(rows);
              message('Uploading File On The Server', 'info');
            })
            .finally(() => {
              $('#upload_file').val(null);
            }).catch(
              err => console.log('Error Found:', err)
            );
        }
      };
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
      }
    }; 
  // update publish
  const updateFlag = (obj) => {
    obj.flag = !obj.flag;
    api
      .post('/clients/update-flag', obj)
      .then(() => {
        getClients();
        message('Flag updated successfully', 'success');
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  useEffect(() => {
  
    getClients();
  }, []);
  //  stucture of client list view
  const columns = [
    {
      name: 'id',
      selector: 'company_id',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
      name: 'Edit',
      selector: 'edit',
      cell: () => <Icon.Edit2 />,
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },
    {
      name: 'Flag',
      selector: 'flag',
      cell: () => <Icon.Flag />,
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },
    {
      name: 'Name',
      selector: 'company_name',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Email',
      selector: 'email',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Phone',
      selector: 'phone',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
  ];

  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />
        {/* ClientDetailsn Add Button */}
        <ToastContainer></ToastContainer>
        <CommonTable
        loading={loading}
          title="Client List"
          Button={
            <Link to="/ClientDetails">
              <Button color="primary" className="shadow-none">
                Add New
              </Button>
            </Link>
          }
        >
            <Col md="4">
            {/* <Link to=""> */}
            <Button color="primary" className="shadow-none mr-2" onClick={() => importExcel()}>
                Import
              </Button>
            {/* </Link> */}
            <input type='file' style={{display: 'none'}} id="import_excel" onChange={importExcelFile} />
            </Col>
          <thead>
            <tr>
              {columns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {clients &&
              clients.map((element, i) => {
                return (
                  <tr key={element.company_id}>
                    <td>{i + 1}</td>
                    <td>
                      <Link to={`/ClientEdit/${element.company_id}`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>
                      <span
                        onClick={() => {
                          updateFlag(element);
                        }}
                      >
                        <Flag value={element.flag ? 1 : 0} />
                      </span>
                    </td>
                    <td>{element.company_name}</td>
                    <td>{element.email}</td>
                    <td>{element.status}</td>
                    <td>{element.phone}</td>
                  </tr>
                );
              })}
          </tbody>
        </CommonTable>

      </div>
    </div>
  );
};

export default Clients;
