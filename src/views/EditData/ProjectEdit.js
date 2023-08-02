import React, { useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, TabContent, TabPane, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import DuctingCostModal from '../../components/ProjectModal/DuctingCostModal';
import message from '../../components/Message';
import api from '../../constants/api';
import ProjectTask from '../smartconTables/ProjectTask';
import CostingSummary from '../../components/projectTabContent/CostingSummary';
import ProjectTimeSheet from '../smartconTables/ProjectTimesheet';
import ProjectTeam from '../smartconTables/ProjectTeam';
import ProjectMilestones from '../../components/ProjectMilestones';
import ProjectMilestoneEdit from '../../components/ProjectMilestoneEdit';
import ProjectTaskEdit from '../../components/ProjectTaskEdit';
import ProjectTimeSheetEdit from '../../components/ProjectTImeSheetEdit';
import ProjectTeamEdit from '../../components/ProjectTeamEdit';
import Tab from '../../components/ProjectTabs/Tab';
import Stats from '../../components/dashboard/StatsPms';
import ComponentCardV2 from '../../components/ComponentCardV2';
import CalendarApp from '../apps/calendar/CalendarApp';
import ActualHour from '../../components/dashboard/ActualHour';
import AverageIssues from '../../components/dashboard/AverageIssues';

const ProjectEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const applyChanges = () => {};
  const backToList = () => {
    navigate('/Project');
  };

  const [projectDetail, setProjectDetail] = useState();
  const [contactData, setContactDatas] = useState();
  const [getCostingSummary, setGetCostingSummary] = useState();
  const [editTaskEditModals, setEditTaskEditModals] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  const [addDuctingCostModal, setAddDuctingCostModal] = useState(false);
  const [addContactModals, setAddContactModals] = useState(false);
  const [gTotal, setGtotal] = useState(0);
  const [gTotal1, setGtotal1] = useState(0);
  const [gTotal2, setGtotal2] = useState(0);
  const [gTotal3, setGtotal3] = useState(0);
  const [gTotal4, setGtotal4] = useState(0);
  const [gTotal5, setGtotal5] = useState(0);
  const [types, setTypes] = useState(0);
  const [milestone, setMilestone] = useState();
  const [taskById, setTaskById] = useState();
  const [contactDatas, setContactData] = useState();
  const [editTaskEditModal, setEditTaskEditModal] = useState(false);
  const [addContactModal, setAddContactModal] = useState(false);
  const [timeSheetById, setTimeSheetById] = useState();
  const [contactDatass, setContactDatass] = useState();
  const [editTimeSheetModal, setEditTimeSheetEditModal] = useState(false);
  const [addContactModalss, setAddContactModalss] = useState(false);
  const [teamById, setTeamById] = useState();
  const [contactDataTeam, setContactDataTeam] = useState();
  const [editTeamModal, setEditTeamEditModal] = useState(false);
  const [addContactModalTeam, setAddContactModalTeam] = useState(false);


  // Start for tab refresh navigation
  const tabs = [
    { id: '1', name: 'Analytics' },
    { id: '2', name: 'Costing Summary' },
    { id: '3', name: 'Milestones' },
    { id: '4', name: 'Team' },
    { id: '5', name: 'Task' },
    { id: '6', name: 'Timesheet' },
    { id: '7', name: 'Calender' },

  ];
  const toggle = (tab) => {
    setActiveTab(tab);
  };
  // End for tab refresh navigation
  const [chargesdetails, setChargesDetails] = useState();

  const addContactToggles = () => {
    setAddContactModals(!addContactModals);
  };
  const addContactToggle = () => {
    setAddContactModal(!addContactModal);
  };
  const addContactToggless = () => {
    setAddContactModalss(!addContactModalss);
  };
  const addContactToggleTeam = () => {
    setAddContactModalTeam(!addContactModalTeam);
  };

 


  // Fetch Costing Summary
  const getCostingbySummary = () => {
    api
      .post('/projecttabcostingsummary/getTabCostingSummaryById', { project_id: id })
      .then((res) => {
        setGetCostingSummary(res.data.data);
      })
      .catch(() => {});
  };

  //Api call for getting Vehicle Fuel Data By ID
  const getTransportChargesById = () => {
    api
      .post('/projecttabcostingsummary/getCostingSummaryChargesById', {
        project_id: id,
        title: 'Transport Charges',
      })
      .then((res) => {
        setChargesDetails(res.data.data);

        let grandTotal = 0;

        res.data.data.forEach((elem) => {
          grandTotal += elem.amount;
        });
        setGtotal(grandTotal);
      })
      .catch(() => {
        message('Costing Summary Data Not Found', 'info');
      });
  };

  const getLabourChargesById = () => {
    api
      .post('/projecttabcostingsummary/getCostingSummaryChargesById', {
        project_id: id,
        title: 'Total Labour Charges',
      })
      .then((res) => {
        setChargesDetails(res.data.data);
        console.log(chargesdetails);
        let grandTotal1 = 0;
        res.data.data.forEach((elem) => {
          grandTotal1 += elem.amount;
        });

        setGtotal1(grandTotal1);
      })
      .catch(() => {
        message('Costing Summary Data Not Found', 'info');
      });
  };
  const getSalesmanCommissionById = () => {
    api
      .post('/projecttabcostingsummary/getCostingSummaryChargesById', {
        project_id: id,
        title: 'Salesman Commission',
      })
      .then((res) => {
        console.log('getCostingSummaryChargesById', res);
        setChargesDetails(res.data.data);
        let grandTotal2 = 0;
        res.data.data.forEach((elem) => {
          grandTotal2 += elem.amount;
        });

        setGtotal2(grandTotal2);
      })
      .catch(() => {
        message('Costing Summary Data Not Found', 'info');
      });
  };

  const getFinancesChargesById = () => {
    api
      .post('/projecttabcostingsummary/getCostingSummaryChargesById', {
        project_id: id,
        title: 'Finance Charges',
      })
      .then((res) => {
        setChargesDetails(res.data.data);
        let grandTotal3 = 0;

        res.data.data.forEach((elem) => {
          grandTotal3 += elem.amount;
        });

        setGtotal3(grandTotal3);
      })
      .catch(() => {
        message('Costing Summary Data Not Found', 'info');
      });
  };

  const getOfficeOverheadsById = () => {
    api
      .post('/projecttabcostingsummary/getCostingSummaryChargesById', {
        project_id: id,
        title: 'Office Overheads',
      })
      .then((res) => {
        setChargesDetails(res.data.data);
        setTypes(types);
        let grandTotal4 = 0;
        res.data.data.forEach((elem) => {
          grandTotal4 += elem.amount;
        });

        setGtotal4(grandTotal4);
      })
      .catch(() => {
        message('Costing Summary Data Not Found', 'info');
      });
  };
  const getOtherChargesById = () => {
    api
      .post('/projecttabcostingsummary/getCostingSummaryChargesById', {
        project_id: id,
        title: 'Other Charges',
      })
      .then((res) => {
        setChargesDetails(res.data.data);
        let grandTotal5 = 0;

        res.data.data.forEach((elem) => {
          grandTotal5 += elem.amount;
        });

        setGtotal5(grandTotal5);
      })
      .catch(() => {
        message('Costing Summary Data Not Found', 'info');
      });
  };

   // Get Project By Id

   const getProjectById = () => {
    api
      .post('/project/getProjectsByIDs', { project_id: id })
      .then((res) => {
        setProjectDetail(res.data.data[0]);
      })
      .catch(() => {
        message('Project not found', 'info');
      });
  };
  // Edit Project

  const handleInputs = (e) => {
    setProjectDetail({ ...projectDetail, [e.target.name]: e.target.value });
  };

  const UpdateData = () => {
    api
      .post('/project/edit-Project', projectDetail)
      .then(() => {
        message('Record editted successfully', 'success');
        getProjectById();
      })
      .catch(() => {});
  };
  //Getting data from milestone
  const getMilestone = () => {
    api
      .post('/milestone/getMilestoneProjectById', { project_id: id })
      .then((res) => {
        setMilestone(res.data.data);
      })
      .catch(() => {});
  };
  //Getting data from milestone
  const getTaskById = () => {
    api
      .post('/projecttask/getProjectTaskById', { project_id: id })
      .then((res) => {
        setTaskById(res.data.data);
      })
      .catch(() => {});
  };
  //Getting data from milestone
  const getTimeSheetById = () => {
    api
      .post('/projecttimesheet/getTimeSheetProjectById', { project_id: id })
      .then((res) => {
        setTimeSheetById(res.data.data);
      })
      .catch(() => {});
  };

  //Getting data from milestone
  const getTeamById = () => {
    api
      .post('/projectteam/getTeamProjectById', { project_id: id })
      .then((res) => {
        setTeamById(res.data.data);
      })
      .catch(() => {});
  };


  useEffect(() => {
    getCostingbySummary();
    getOtherChargesById();
    getProjectById();
    getTransportChargesById();
    getSalesmanCommissionById();
    getFinancesChargesById();
    getOfficeOverheadsById();
    getLabourChargesById();
    getMilestone();
    getTaskById();
    getTimeSheetById();
    getTeamById();
  }, [id]);

  return (
    <>
      <BreadCrumbs />
      <Form>
    <FormGroup>
      <ComponentCardV2>
        <Row>
          <Col>
            <Button className='shadow-none'
              color="primary"
              onClick={() => {
                UpdateData();
                navigate('/Project');
              }}
            >
              Save
            </Button>
          </Col>
          <Col>
            <Button className='shadow-none'
              color="primary"
              onClick={() => {
                UpdateData();
                applyChanges();
              }}
            >
              Apply
            </Button>
          </Col>

         
          <Col>
            <Button className='shadow-none'
              color="dark"
              onClick={() => {
                backToList();
              }}
            >
              Back to List
            </Button>
          </Col>
        </Row>
      </ComponentCardV2>
    </FormGroup>
  </Form>
      <Form>
        <FormGroup>
          <ComponentCard
            title={`Project Details | Code: ${projectDetail && projectDetail.project_code} | 
            Category : ${projectDetail && projectDetail.category} | 
            Company :  ${projectDetail && projectDetail.company_name}  | 
            Status : ${projectDetail && projectDetail.status} `}
          >
            <Row>
            <Col md="3">
                <FormGroup>
                  <Label>
                    Title<span className="required">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="title"
                    value={projectDetail && projectDetail.title}
                    onChange={handleInputs}
                  />
                  </FormGroup>
                  </Col>

              <Col md="3">
                <FormGroup>
                  <Label>
                    Category <span className="required"> *</span>{' '}
                  </Label>
                  <Input
                    type="select"
                    name="category"
                    defaultValue={projectDetail && projectDetail.category}
                    onChange={handleInputs}
                  >
                    <option value="">Please Select</option>
                    <option value="Project">Project</option>
                    <option defaultValue="selected" value="Maintenance">
                      Maintenance
                    </option>
                    <option value="Tenancy Project">Tenancy Project</option>
                    <option value="Tenancy Work">Tenancy Work</option>
                  </Input>
                </FormGroup>
              </Col>

              <Col md="3">
                <FormGroup>
                  <Label>Status </Label>
                  <Input
                    type="select"
                    name="status"
                    defaultValue={projectDetail && projectDetail.status}
                    onChange={handleInputs}
                  >
                    <option value="">Please Select</option>
                    <option defaultValue="selected" value="WIP">
                      WIP
                    </option>
                    <option value="Billable">Billable</option>
                    <option value="Billed">Billed</option>
                    <option value="Complete">Complete</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Latest">Latest</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Company</Label>
                  <Input
                    type="text"
                    name="company_name"
                    defaultValue={projectDetail && projectDetail.company_name}
                    onChange={handleInputs}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>Contact</Label>
                  <Input
                    type="select"
                    name="contact_id"
                    defaultValue={projectDetail && projectDetail.contact_id}
                    onChange={handleInputs}
                  >
                    <option value="">Please Select</option>
                  </Input>
                </FormGroup>
              </Col>

              <Col md="3">
                <FormGroup>
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    name="start_date"
                    defaultValue={projectDetail && projectDetail.start_date}
                    onChange={handleInputs}
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Estimated Finish Date</Label>
                  <Input
                    type="date"
                    name="estimated_finish_date"
                    defaultValue={projectDetail && projectDetail.estimated_finish_date}
                    onChange={handleInputs}
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Description</Label>
                  <Input
                    type="text"
                    name="description"
                    defaultValue={projectDetail && projectDetail.description}
                    onChange={handleInputs}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>Project Manager</Label>
                  <Input
                    type="select"
                    name="project_manager_id"
                    defaultValue={projectDetail && projectDetail.project_manager_id}
                    onChange={handleInputs}
                  >
                    <option defaultValue="selected">Please Select</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>
      <ComponentCard title="More Details">
        <ToastContainer></ToastContainer>
        <DuctingCostModal
          addDuctingCostModal={addDuctingCostModal}
          setAddDuctingCostModal={setAddDuctingCostModal}
        />

        <Tab toggle={toggle} tabs={tabs} />
        {/* Tab 1 */}
        <TabContent className="p-4" activeTab={activeTab}>
          <TabPane tabId="1">
             <Stats
             id={id}></Stats>
             <ActualHour/>
             <AverageIssues/>
          </TabPane>
          {/* Tab 2 */}
          <TabPane tabId="2">
            <CostingSummary
              getCostingSummary={getCostingSummary}
              gTotal={gTotal}
              gTotal1={gTotal1}
              gTotal2={gTotal2}
              gTotal3={gTotal3}
              gTotal4={gTotal4}
              gTotal5={gTotal5}
              getCostingbySummary={getCostingbySummary}
            ></CostingSummary>
          </TabPane>
          {/* Tab 3 Materials Purchased */}
          <TabPane tabId="3">
            <ProjectMilestones
              setContactDatas={setContactDatas}
              id={id}
              addContactToggles={addContactToggles}
              addContactModals={addContactModals}
              setEditTaskEditModals={setEditTaskEditModals}
              milestone={milestone}
              getMilestone={getMilestone}
            ></ProjectMilestones>
            <ProjectMilestoneEdit
            getMilestone={getMilestone}
              contactData={contactData}
              editTaskEditModals={editTaskEditModals}
              setEditTaskEditModals={setEditTaskEditModals}
            ></ProjectMilestoneEdit>
          </TabPane>
          {/* Tab 4 */}
          <TabPane tabId="4">
            <ProjectTeam
              setContactDataTeam={setContactDataTeam}
              id={id}
              teamById={teamById}
              addContactToggleTeam={addContactToggleTeam}
              addContactModalTeam={addContactModalTeam}
              setEditTeamEditModal={setEditTeamEditModal}
              getTeamById={getTeamById}
            />
            <ProjectTeamEdit
            getTeamById={getTeamById}
              contactDataTeam={contactDataTeam}
              editTeamModal={editTeamModal}
              setEditTeamEditModal={setEditTeamEditModal}
            />
          </TabPane>
          {/* Tab 5 */}
          <TabPane tabId="5">
            <ProjectTask
              setContactData={setContactData}
              id={id}
              getTaskById={getTaskById}
              taskById={taskById}
              addContactToggle={addContactToggle}
              addContactModal={addContactModal}
              setEditTaskEditModal={setEditTaskEditModal}
            ></ProjectTask>
            <ProjectTaskEdit
              getTaskById={getTaskById}
              contactDatas={contactDatas}
              editTaskEditModal={editTaskEditModal}
              setEditTaskEditModal={setEditTaskEditModal}
            ></ProjectTaskEdit>
          </TabPane>
          {/* Start Tab Content 6  Delivery Order */}
          <TabPane tabId="6">
            <ProjectTimeSheet
              setContactDatass={setContactDatass}
              id={id}
              timeSheetById={timeSheetById}
              addContactToggless={addContactToggless}
              addContactModalss={addContactModalss}
              setEditTimeSheetEditModal={setEditTimeSheetEditModal}
              getTimeSheetById={getTimeSheetById}
            />
            <ProjectTimeSheetEdit
              contactDatass={contactDatass}
              editTimeSheetModal={editTimeSheetModal}
              setEditTimeSheetEditModal={setEditTimeSheetEditModal}
              getTimeSheetById={getTimeSheetById}
            ></ProjectTimeSheetEdit>
          </TabPane>
          <TabPane tabId="7">
            <CalendarApp/>
          </TabPane>
        </TabContent>
      </ComponentCard>
    </>
  );
};

export default ProjectEdit;
