import React, { useEffect, useState } from 'react';
import { Row, Col, Form, FormGroup, Button,TabPane,TabContent,Table } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
//import * as Icon from 'react-feather';
import { useNavigate, useParams } from 'react-router-dom';
import * as Icon from 'react-feather';
import Swal from 'sweetalert2';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import ComponentCardV2 from '../../components/ComponentCardV2';
import message from '../../components/Message';
import api from '../../constants/api';
//import DeleteButton from '../../components/DeleteButton';
// import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
// import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import ApiButton from '../../components/ApiButton';
import LeadMainDetails from '../../components/LeadTable/LeadMainDetails';
import Tab from '../../components/ProjectTabs/Tab';
import AddNote from '../../components/Tender/AddNote';
import ViewNote from '../../components/Tender/ViewNote';
import EditLineItemModal from '../../components/LeadTable/EditLineItemModal';
import CommunicationLineItem from '../../components/LeadTable/CommunicationLineItem';
import EditFollowupItemModal from '../../components/LeadTable/EditFollowupItemModal';
import FollowupLineItem from '../../components/LeadTable/FollowupLineItem';


const LeadEdit = () => {
  //All state variable
  const [lead, setLeadEdit] = useState();
  const [projectdetails, setProjectDetails] = useState();
  const [companydetails, setCompanyDetails] = useState();
  const [allCountries, setallCountries] = useState();
  const [lineItem, setLineItem] = useState();
  const [followupItem, setFollowupItem] = useState();
  const [addLineItemModal, setAddLineItemModal] = useState(false);
  const [addFollowupItemModal, setAddFollowupItemModal] = useState(false);
  const [editLineModelItem, setEditLineModelItem] = useState(null);
  const [editLineModal, setEditLineModal] = useState(false);
  const [editFollowupModelItem, setEditFollowupModelItem] = useState(null);
  const [editFollowupModal, setEditFollowupModal] = useState(false);
  const [sourceLinked, setSourceLinked] = useState()
  // const [attachmentModal, setAttachmentModal] = useState(false);
  // const [attachmentData, setDataForAttachment] = useState({
  //   modelType: '',
  // });
  // const [roomName, setRoomName] = useState('');
  // const [fileTypes, setFileTypes] = useState();
  const [activeTab, setActiveTab] = useState('1');
  //const [description, setDescription] = useState('');


  //navigation and parameters
  const { id } = useParams();
  const navigate = useNavigate();

  const applyChanges = () => {};
  const backToList = () => {
    navigate('/Lead');
  };
  //milestone data in milestone
  const handleInputs = (e) => {
    setLeadEdit({ ...lead, [e.target.name]: e.target.value });
  };

  const addQuoteItemsToggle = () => {
    setAddLineItemModal(!addLineItemModal);
  };
  const addFollowupItemsToggle = () => {
    setAddFollowupItemModal(!addFollowupItemModal);
  };

  const tabs = [
    { id: '1', name: 'Add Notes' },
    { id: '2', name: 'History of communications' },
    { id: '3', name: 'Follow-up Tasks' },
    { id: '4', name: 'Tele Calling' },
    { id: '5', name: 'Attachment' },
  ];

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  


  const getLeadById = () => {
    api.post('/lead/getLeadById', { lead_id: id }).then((res) => {
      const leadData = res.data.data[0];
      setLeadEdit(leadData);
      
    });
  };  

  //Api call for getting project name dropdown
  const getProjectname = () => {
    api
      .get('/lead/getEmployeeName')
      .then((res) => {
        setProjectDetails(res.data.data);
        console.log(res.data.data[0]);
      })
      .catch(() => {
        message('Company not found', 'info');
      });
  };

  const getCompanyname = () => {
    api
      .get('/lead/getCompanyName')
      .then((res) => {
        setCompanyDetails(res.data.data);
        console.log(res.data.data[0]);
      })
      .catch(() => {
        message('Company not found', 'info');
      });
  };

  const getAllCountries = () => {
    api
      .get('/lead/getCountry')
      .then((res) => {
        setallCountries(res.data.data);
      })
      .catch(() => {
        //message('Country Data Not Found', 'info');
      });
  };

  const getSourceType = () => {
    api.get('/lead/getSourceTypeFromValueList', sourceLinked).then((res) => {
      setSourceLinked(res.data.data);
    });
  };

  //Update milestone
  const editLead = () => {
    api
      .post('/lead/editLead', lead)
      .then(() => {
        message('Record editted successfully', 'success');
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };
  //attachments
  // const dataForAttachment = () => {
  //   setDataForAttachment({
  //     modelType: 'attachment',
  //   });
  //   console.log('inside DataForAttachment');
  // };

  const getLineItem = () => {
    api.post('/lead/getCommunicationItemById', { lead_id: id }).then((res) => {
      setLineItem(res.data.data);
      //setAddLineItemModal(true);
    });
  };


  const getFollowupItem = () => {
    api.post('/lead/getFollowupItemById', { lead_id: id }).then((res) => {
      setFollowupItem(res.data.data);
      //setAddLineItemModal(true);
    });
  };


  useEffect(() => {
    getLeadById();
    getProjectname();
    getCompanyname();
    getAllCountries();
    getLineItem();
    getFollowupItem();
    getSourceType();
  }, [id]);

  const columns1 = [
    {
      name: '#',
    },
   
    {
      name: 'Interaction Date',
    },
    {
      name: 'Interaction Type',
    },
    {
      name: 'Subject',
    },
    {
      name: 'Description',
    },
    {
      name: 'Status',
    },
    {
      name: 'Result',
    },
 
    {
      name: 'Priority ',
    },
    {
      name: 'Duration ',
    },
    {
      name: 'Action ',
    },
  ];

  const columns2 = [
    {
      name: '#',
    },
   
    {
      name: 'Task Description',
    },
    {
      name: 'Due Date',
    },
    {
      name: 'Assigned To',
    },
    
    {
      name: 'Priority',
    },
    {
      name: 'Status',
    },
 
    
    {
      name: 'Action ',
    },
  ];

  const deleteRecord = (deleteID) => {
    Swal.fire({
      title: `Are you sure? ${deleteID}`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        api.post('/lead/deleteCommunicationItem', { history_of_communication_id: deleteID }).then(() => {
          Swal.fire('Deleted!', 'Your Line Items has been deleted.', 'success');
          window.location.reload();
        });
      }
    });
  };

  const deleteFollowupRecord = (deleteFollowup) => {
    Swal.fire({
      title: `Are you sure? ${deleteFollowup}`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        api.post('/lead/deleteFollowupItem', { followup_tasks_id : deleteFollowup }).then(() => {
          Swal.fire('Deleted!', 'Your Line Items has been deleted.', 'success');
          window.location.reload();
        });
      }
    });
  };

  return (
    <>
      <BreadCrumbs />
      <Form>
        <FormGroup>
          <ToastContainer></ToastContainer>
          <ComponentCardV2>
          <ApiButton
        editData={editLead}
        navigate={navigate}
        applyChanges={applyChanges}
        backToList={backToList}
        module="Lead"
      ></ApiButton>
            {/* <Row>
              <Col>
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    editLead();
                    navigate('/Lead');
                  }}
                >
                  Save
                </Button>
              </Col>
              <Col>
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    editLead();
                    applyChanges();
                  }}
                >
                  Apply
                </Button>
              </Col>
              <Col>
                <Button
                  type="submit"
                  className="btn btn-dark shadow-none"
                  onClick={(e) => {
                    if (window.confirm('Are you sure you want to cancel? ')) {
                      navigate('/MilestoneList');
                    } else {
                      e.preventDefault();
                    }
                  }}
                >
                  Cancel
                </Button>
              </Col>
              <Col>
                <DeleteButton
                  id={id}
                  columnname="lead_id"
                  tablename="lead"
                ></DeleteButton>
              </Col>
              <Col>
                <Button
                  className="shadow-none"
                  color="dark"
                  onClick={() => {
                    backToList();
                  }}
                >
                  Back to List
                </Button>
              </Col>
            </Row> */}
          </ComponentCardV2>
        </FormGroup>
      </Form>
      {/* milestone Details */}
      <Form>
        <FormGroup>
          <ComponentCard title="Lead Details" creationModificationDate={lead}>
            {' '}
            <ToastContainer></ToastContainer>
            <div>
              <BreadCrumbs />

              <LeadMainDetails
          handleInputs={handleInputs}
          lead={lead}
          projectdetails={projectdetails}
          companydetails={companydetails}
          allCountries={allCountries}
          sourceLinked={sourceLinked}
          setSourceLinked={setSourceLinked}
        ></LeadMainDetails>
        <ComponentCard title="More Details">
        <ToastContainer></ToastContainer>

        <Tab toggle={toggle} tabs={tabs} />
        <TabContent className="p-4" activeTab={activeTab}>
          <TabPane tabId="1">
            <br />
            <AddNote recordId={id} roomName="AccountEdit" />
            <ViewNote recordId={id} roomName="AccountEdit" />
            
          </TabPane>
          <TabPane tabId="2" eventkey="Communication History">
          <Row>
              <Col md="6">
                <Button
                  className="shadow-none"
                  color="primary"
                  to=""
                  onClick={addQuoteItemsToggle.bind(null)}
                >
                  Add
                </Button>
              </Col>
            </Row>
            <br />
            <Row>
              <div className="container">
                <Table id="example" className="display border border-secondary rounded">
                  <thead>
                    <tr>
                      {columns1.map((cell) => {
                        return <td key={cell.name}>{cell.name}</td>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {lineItem &&
                      lineItem.map((e, index) => {
                        return (
                          <tr key={e.lead_id}>
                            <td>{index + 1}</td>
                            <td data-label="Interaction Date">{e.communication_date}</td>
                            <td data-label="Interaction Type">{e.communication_type}</td>
                            <td data-label="Subject">{e.topic}</td>
                            <td data-label="Description">{e.description}</td>
                            <td data-label="Status">{e.status}</td>
                            <td data-label="Result">{e.result}</td>
                            <td data-label="Priority">{e.priority}</td>
                            <td data-label="Duration">{e.duration}</td>
                            <td data-label="Actions">
                              <span
                                className="addline"
                                onClick={() => {
                                  setEditLineModelItem(e);
                                  setEditLineModal(true);
                                }}
                              >
                                <Icon.Edit2 />
                              </span>
                              <span
                                className="addline"
                                onClick={() => {
                                  deleteRecord(e.history_of_communication_id);
                                }}
                              >
                                <Icon.Trash2 />
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </div>
            </Row>
            {/* End View Line Item Modal */}
            <EditLineItemModal
              editLineModal={editLineModal}
              setEditLineModal={setEditLineModal}
              FetchLineItemData={editLineModelItem}
              getLineItem={getLineItem}
              
            ></EditLineItemModal>
            {addLineItemModal && (
              <CommunicationLineItem
                setLeadEdit={setLeadEdit}
                addLineItemModal={addLineItemModal}
                setAddLineItemModal={setAddLineItemModal}
                handleInputs={handleInputs}
                communicationLine={id}
              ></CommunicationLineItem>
            )}
          </TabPane>
          <TabPane tabId="3" eventkey="Followup">
          <Row>
              <Col md="6">
                <Button
                  className="shadow-none"
                  color="primary"
                  to=""
                  onClick={addFollowupItemsToggle.bind(null)}
                >
                  Add Followup Task
                </Button>
              </Col>
            </Row>
            <br />
            <Row>
              <div className="container">
                <Table id="example" className="display border border-secondary rounded">
                  <thead>
                    <tr>
                      {columns2.map((cell) => {
                        return <td key={cell.name}>{cell.name}</td>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {followupItem &&
                      followupItem.map((e, index) => {
                        return (
                          <tr key={e.lead_id}>
                            <td>{index + 1}</td>
                            <td data-label="Task Description">{e.description}</td>
                            <td data-label="Due Date">{e.due_date}</td>
                            <td data-label="Assigned To">{e.employee_id}</td>
                            <td data-label="Priority">{e.priority}</td>
                            <td data-label="Status">{e.status}</td>
                            
                            <td data-label="Actions">
                              <span
                                className="addline"
                                onClick={() => {
                                  setEditFollowupModelItem(e);
                                  setEditFollowupModal(true);
                                }}
                              >
                                <Icon.Edit2 />
                              </span>
                              <span
                                className="addline"
                                onClick={() => {
                                  deleteFollowupRecord(e.followup_tasks_id);
                                }}
                              >
                                <Icon.Trash2 />
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </div>
            </Row>
            {/* End View Line Item Modal */}
            <EditFollowupItemModal
              editFollowupModal={editFollowupModal}
              setEditFollowupModal={setEditFollowupModal}
              FetchFollowupItemData={editFollowupModelItem}
              getFollowupItem={getFollowupItem}
              projectdetails={projectdetails}
              
            ></EditFollowupItemModal>
            {addFollowupItemModal && (
              <FollowupLineItem
                setLeadEdit={setLeadEdit}
                addFollowupItemModal={addFollowupItemModal}
                setAddFollowupItemModal={setAddFollowupItemModal}
                handleInputs={handleInputs}
                FollowupLine={id}
                projectdetails={projectdetails}
              ></FollowupLineItem>
            )}
          </TabPane>
          <TabPane tabId="4">
            
          </TabPane>

          <TabPane tabId="5">
            
          </TabPane>
        </TabContent>
      </ComponentCard>
              
            </div>
          </ComponentCard>
        </FormGroup>
      </Form>
    </>
  );
};

export default LeadEdit;
