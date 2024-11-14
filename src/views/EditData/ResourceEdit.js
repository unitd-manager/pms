import React, { useEffect, useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import ComponentCard from '../../components/ComponentCard';
import ComponentCardV2 from '../../components/ComponentCardV2';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import api from '../../constants/api';
import message from '../../components/Message';

const ContentUpdate = () => {
  // All state variables
  const [contentDetails, setContentDetails] = useState();
  const [description, setDescription] = useState('');
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });

  // Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();

console.log('resourceid',id);
  //Setting data in contentDetails
  const handleInputs = (e) => {
    setContentDetails({ ...contentDetails, [e.target.name]: e.target.value });
  };
  //setting data in Description Modal contentDetails
  const handleDataEditor = (e, type) => {
    setContentDetails({
      ...contentDetails,
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
  // Get content data By content id
  const getResourceById = () => {
    api
      .post('/content/getResourceById', { resource_id: id })
      .then((res) => {
        setContentDetails(res.data.data);
        convertHtmlToDraft(res.data.data.description);
      })
      .catch(() => {
        message('Content Data Not Found', 'info');
      });
  };
  //Edit Content
  const editContentData = () => {
    console.log(contentDetails);
    if (
      contentDetails.content_title !== '' &&
      contentDetails.sub_category_id !== '' &&
      contentDetails.published !== ''
    ) {
      api
        .post('/content/editResource', contentDetails)
        .then(() => {
          message('Record edited successfully', 'success');
          navigate('/Resource');
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };


  //Attachments
  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
    console.log('inside DataForAttachment');
  };

  useEffect(() => {
    getResourceById();
  }, [id]);

  return (
    <>
      <BreadCrumbs heading={contentDetails && contentDetails.title} />
      <Form>
        <FormGroup>
          <ComponentCardV2>
        
            <Row>
              <Col>
                <Button
                  color="primary"
                  onClick={() => {
                    editContentData();
                  }}
                >
                  Save
                </Button>
              </Col>
              <Col>
                <Button
                  color="secondary"
                  onClick={() => {
                    editContentData();
                  }}
                >
                  Apply
                </Button>
              </Col>
              <Col></Col>

              <Col>
                <Button
                  color="danger"
                  onClick={() => {
                    navigate('/Resource');
                    console.log('back to list');
                  }}
                >
                  Back to List
                </Button>
              </Col>
            </Row>
          </ComponentCardV2>
          {/* Content Details Form */}
          <ComponentCard title="Resource details">
            <ToastContainer></ToastContainer>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label> Title </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={contentDetails && contentDetails.title}
                    name="title"
                  />
                </FormGroup>
              </Col>
           
            </Row>
          </ComponentCard>
          {/* Content Details Form */}
          <ComponentCard title="Content details">
            <Row>             
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
            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>
      {/* Picture and Attachments Form */}
      <Form>
        <FormGroup>
      
          <ComponentCard title="Attachments">
            <Row>
              <Col xs="12" md="3" className="mb-3">
                <Button
                  color="primary"
                  onClick={() => {
                    dataForAttachment();
                    setAttachmentModal(true);
                  }}
                >
                  Add
                </Button>
              </Col>
            </Row>
            <AttachmentModalV2
              moduleId={id}
              roomName="Resource"
              altTagData="Resource Data"
              desc="Resource Data"
              modelType={attachmentData.modelType}
              attachmentModal={attachmentModal}
              setAttachmentModal={setAttachmentModal}
            />
            <ViewFileComponentV2 moduleId={id} roomName="Resource" />
          </ComponentCard>
        </FormGroup>
      </Form>

      <br />
    </>
  );
};
export default ContentUpdate;
