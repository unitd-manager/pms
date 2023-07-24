import React, { useEffect, useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import * as Icon from 'react-feather';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import ComponentCardV2 from '../../components/ComponentCardV2';
import message from '../../components/Message';
import api from '../../constants/api';
import DeleteButton from '../../components/DeleteButton';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';


const MilestoneEdit = () => {
  //All state variable
  const [milestone, setMilestoneEdit] = useState();
  const [projectdetails, setProjectDetails] = useState();
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  const [roomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState();
  const [description, setDescription] = useState('');


  //navigation and parameters
  const { id } = useParams();
  const navigate = useNavigate();

  const applyChanges = () => {};
  const backToList = () => {
    navigate('/MilestoneList');
  };
  //milestone data in milestone
  const handleInputs = (e) => {
    setMilestoneEdit({ ...milestone, [e.target.name]: e.target.value });
  };

  // data in Description Modal
  const handleDataEditor = (e, type) => {
    setMilestoneEdit({
      ...milestone,
      [type]: draftToHtml(convertToRaw(e.getCurrentContent())),
    });
  };

  //Description Modal
  const convertHtmlToDraft = (existingQuoteformal) => {
    const contentBlock = htmlToDraft(existingQuoteformal && existingQuoteformal);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      setDescription(editorState);
    }
  };
  const getMilestoneById = () => {
    api.post('/milestone/getMilestonById', { project_milestone_id: id }).then((res) => {
      const milestoneData = res.data.data[0];
      setMilestoneEdit(milestoneData);
      if (milestoneData.description) {
        convertHtmlToDraft(milestoneData.description);
      }
    });
  };  

  //Api call for getting project name dropdown
  const getProjectname = () => {
    api
      .get('/projecttask/getProjectTitle')
      .then((res) => {
        setProjectDetails(res.data.data);
        console.log(res.data.data[0]);
      })
      .catch(() => {
        message('Company not found', 'info');
      });
  };

  //Update milestone
  const editMilestone = () => {
    api
      .post('/milestone/editMilestone', milestone)
      .then(() => {
        message('Record editted successfully', 'success');
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };
  //attachments
  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
    console.log('inside DataForAttachment');
  };

  useEffect(() => {
    getMilestoneById();
    getProjectname();
  }, [id]);

  return (
    <>
      <BreadCrumbs />
      <Form>
        <FormGroup>
          <ToastContainer></ToastContainer>
          <ComponentCardV2>
            <Row>
              <Col>
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    editMilestone();
                    navigate('/MilestoneList');
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
                    editMilestone();
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
                  columnname="project_milestone_id"
                  tablename="project_milestone"
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
            </Row>
          </ComponentCardV2>
        </FormGroup>
      </Form>
      {/* milestone Details */}
      <Form>
        <FormGroup>
          <ComponentCard title="Milestone Details">
            {' '}
            <ToastContainer></ToastContainer>
            <div>
              <BreadCrumbs />

              <ComponentCard title="milestone">
                <Form>
                  <Row>
                    <Col md="3">
                      <FormGroup>
                        <Label>Title</Label>
                        <Input
                          type="text"
                          onChange={handleInputs}
                          value={milestone && milestone.milestone_title}
                          name="milestone_title"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <Label>Project Name</Label>
                        <Input
                          type="select"
                          onChange={handleInputs}
                          value={milestone && milestone.project_id}
                          name="project_id"
                        >
                          <option defaultValue="selected">Please Select</option>
                          {projectdetails &&
                            projectdetails.map((e) => {
                              return (
                                <option key={e.project_id} value={e.project_id}>
                                  {e.title}
                                </option>
                              );
                            })}
                        </Input>
                      </FormGroup>
                    </Col>

                    <Col md="3">
                      <FormGroup>
                        <Label>From Date</Label>
                        <Input
                          type="date"
                          onChange={handleInputs}
                          value={moment(milestone && milestone.from_date).format('YYYY-MM-DD')}
                          name="from_date"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <Label>To Date</Label>
                        <Input
                          type="date"
                          onChange={handleInputs}
                          value={milestone && moment(milestone.to_date).format('YYYY-MM-DD')}
                          name="to_date"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <Label>Actual Completed Date</Label>
                        <Input
                          type="date"
                          onChange={handleInputs}
                          value={milestone && moment(milestone.actual_completed_date).format('YYYY-MM-DD')}
                          name="actual_completed_date"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <Label>Status</Label>
                        <Input
                          type="select"
                          onChange={handleInputs}
                          value={milestone && milestone.status}
                          name="status"
                          >
                          {' '}
                          <option value="" selected="selected">
                            Please Select
                          </option>
                          <option value="Pending">Pending</option>
                          <option value="InProgress">InProgress</option>
                          <option value="Completed">Completed</option>
                          <option value="OnHold">OnHold</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </ComponentCard>
 {/* Description form */}
 <ComponentCard title="Description">
                <Editor
                  editorState={description}
                  wrapperClassName="demo-wrapper mb-0"
                  editorClassName="demo-editor border mb-4 edi-height"
                  onEditorStateChange={(e) => {
                    handleDataEditor(e, 'description');
                    setDescription(e);
                  }}
                />
              </ComponentCard>
              <Form>
                <FormGroup>
                  <ComponentCard title="Attachments">
                    <Row>
                      <Col xs="12" md="3" className="mb-3">
                        <Button
                          className="shadow-none"
                          color="primary"
                          onClick={() => {
                            setRoomName('Milestone');
                            setFileTypes(['JPG', 'PNG', 'GIF', 'PDF']);
                            dataForAttachment();
                            setAttachmentModal(true);
                          }}
                        >
                          <Icon.File className="rounded-circle" width="20" />
                        </Button>
                      </Col>
                    </Row>
                    <AttachmentModalV2
                      moduleId={id}
                      roomName={roomName}
                      fileTypes={fileTypes}
                      altTagData="MilsestoneRelated Data"
                      recordType="RelatedPicture"
                      desc="MilestoneRelated Data"
                      modelType={attachmentData.modelType}
                      attachmentModal={attachmentModal}
                      setAttachmentModal={setAttachmentModal}
                    />
                    <ViewFileComponentV2
                      moduleId={id}
                      roomName="MilestoneList"
                      recordType="RelatedPicture"
                    />
                  </ComponentCard>
                </FormGroup>
              </Form>
            </div>
          </ComponentCard>
        </FormGroup>
      </Form>
    </>
  );
};

export default MilestoneEdit;
