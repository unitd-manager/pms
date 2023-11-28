/* eslint-disable */
import React from 'react';
import { Row, Col, Form, FormGroup, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { HasAccess ,usePermify} from '@permify/react-role';
import ComponentCardV2 from './ComponentCardV2';

<<<<<<< HEAD
const ApiButton = ({ editData, navigate, backToList, module,deleteData }) => {
=======
const ApiButton = ({ editData,deleteData, navigate, applyChanges, backToList, module }) => {
>>>>>>> 89ce5f7922e5601d54fb6b309b851ed1b30542cc
  ApiButton.propTypes = {
    editData: PropTypes.func,
    deleteData: PropTypes.func,
    navigate: PropTypes.any,
    //applyChanges: PropTypes.func,
    backToList: PropTypes.func,
    deleteData: PropTypes.func,
    module: PropTypes.string,
  };
  const { isAuthorized, isLoading } = usePermify();

  
  const fetchData = async (type) => {
    // Pass roles and permissions accordingly
    // You can send empty array or null for first param to check permissions only
    if (await isAuthorized(null, `${module}-${type}`)) {
       return true
    }else{
      return false
    }
};

  return (
    <Form>
    <FormGroup>
      <ComponentCardV2>
          <Row>
            <Col >
         
              <HasAccess
                roles={null}
                permissions={`${module}-edit`}
                renderAuthFailed={<p></p>}
        >
                <Button
                  onClick={() => {
<<<<<<< HEAD
                    editData()
                      setTimeout(()=>{
                        backToList();
                      },1000)
=======
                    editData();
                    setTimeout(()=>{
                      navigate(`/${module}`);
                    },1000)
>>>>>>> 89ce5f7922e5601d54fb6b309b851ed1b30542cc
                    
                  }}
                  color="primary">
                  Save
                </Button>
              </HasAccess>
            </Col>
            <Col >
              <HasAccess
                roles={null}
                permissions={`${module}-edit`}
                renderAuthFailed={<p></p>}
              >
                <Button
                  onClick={() => {
                    editData();
                    //applyChanges();
                  }}
                  color="primary"
                >
                  Apply
                </Button>
              </HasAccess>
            </Col>
<<<<<<< HEAD
            <Col>
=======
            <Col className="d-flex" xl={3} sm={12}>
              {' '}
>>>>>>> 89ce5f7922e5601d54fb6b309b851ed1b30542cc
              <Button
                onClick={() => {
                  backToList();
                }}
                color="dark"
              >
                Back To List
              </Button>
            </Col>
            <Col>
              <HasAccess
                roles={null}
                permissions={`${module}-remove`}
                renderAuthFailed={<p></p>}
              >
                <Button color="danger" onClick={() => {deleteData();
<<<<<<< HEAD
                //  setTimeout(()=>{
                //   //backToList();
                // },1000)
                }}>
=======
                 setTimeout(()=>{
                  navigate(`/${module}`);
                },1000)}}>
>>>>>>> 89ce5f7922e5601d54fb6b309b851ed1b30542cc
                  Delete
                </Button>
              </HasAccess>
            </Col>
          </Row>
        </ComponentCardV2>
      </FormGroup>
    </Form>
  );
};

export default ApiButton;