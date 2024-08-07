import React, { useEffect, useState } from 'react';
import { Form, FormGroup, TabContent,
  TabPane,
  // NavItem,
  // NavLink,
  // Nav 
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
//import * as Icon from 'react-feather';
import { useNavigate, useParams } from 'react-router-dom';
// import * as Icon from 'react-feather';
// import Swal from 'sweetalert2';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import ComponentCardV2 from '../../components/ComponentCardV2';
import message from '../../components/Message';
import api from '../../constants/api';
import ApiButton from '../../components/ApiButton';
import Tab from '../../components/ProjectTabs/Tab';
import LeadMainDetails from '../../components/LeadTable/LeadMainDetails';
import ViewNote from '../../components/Tender/ViewNote';
import AddNote from '../../components/Tender/AddNote';


const LeadEdit = () => {
  //All state variable
  const [lead, setLeadEdit] = useState();
  const [projectdetails, setProjectDetails] = useState();
  const [companydetails, setCompanyDetails] = useState();
  const [allCountries, setallCountries] = useState();
  const [sourceLinked, setSourceLinked] = useState();
  const [activeTab, setActiveTab] = useState('1');
  const [potentialType, setPotentialType] = useState();
  const [valuelist, setValuelist] = useState();

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

  const getLeadById = () => {
    api.post('/lead/getLeadById', { lead_id: id }).then((res) => {
      const leadData = res.data.data[0];
      setLeadEdit(leadData);
    });
  };


  // Start for tab refresh navigation  #Renuka 1-06-23  
  const tabs =  [
  
    {id:'1',name:'Add notes'},
  ];

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
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
  const getValuelist = () => {
    api
      .get('/lead/getValueList')
      .then((res) => {
        setValuelist(res.data.data);
      })
      .catch(() => {
        message('valuelist not found', 'info');
      });
  };
  const getSourceType = () => {
    api.get('/lead/getSourceTypeFromValueList', sourceLinked).then((res) => {
      setSourceLinked(res.data.data);
    });
  };

  const getPotentialType = () => {
    api.get('/lead/getPotentialTypeFromValueList', potentialType).then((res) => {
      setPotentialType(res.data.data);
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

  useEffect(() => {
    getLeadById();
    getProjectname();
    getCompanyname();
    getAllCountries();
    getSourceType();
    getPotentialType();
    getValuelist();
  }, [id]);

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
              <LeadMainDetails
                handleInputs={handleInputs}
                lead={lead}
                projectdetails={projectdetails}
                companydetails={companydetails}
                allCountries={allCountries}
                sourceLinked={sourceLinked}
                potentialType={potentialType}
                valuelist={valuelist}
              ></LeadMainDetails>
            </div>
           {/* <Nav tabs>
            <NavItem>
              <NavLink
                className={activeTab === '1' ? 'active' : ''}
                onClick={() => {
                  toggle('1');
                }}
              >
                Working hours
              </NavLink>
            </NavItem>
            </Nav>
             <TabContent className="p-4" activeTab={activeTab}>
            <TabPane tabId="1">
            <ComponentCard title="Add a note">
        <AddNote recordId={id} roomName="LeadInfo" />
        <ViewNote recordId={id} roomName="LeadInfo" />
      </ComponentCard>
            </TabPane>
            </TabContent> */}

          </ComponentCard>
        </FormGroup>
      </Form>
      {/* ADD NOTE */}
      <ComponentCard title="More Details">
        <ToastContainer></ToastContainer>
        {/* Nav Tab */}
       
         {/* Nav Tab */}
         <Tab toggle={toggle} tabs={tabs} />
        <TabContent className="p-4" activeTab={activeTab}>
          <TabPane tabId="1">
            <ComponentCard title="Add a note">
              <AddNote recordId={id} roomName="LeadEdit" />
              <ViewNote recordId={id} roomName="LeadEdit" />
            </ComponentCard>
          </TabPane>
        </TabContent>
      </ComponentCard>
    </>
  );
};

export default LeadEdit;
