import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'reactstrap';
import ComponentCardV2 from '../ComponentCardV2';
// import DeleteButton from '../DeleteButton';

function ProductEditButtons({ editProductData, navigate }) {
  ProductEditButtons.propTypes = {
    editProductData: PropTypes.any,
    navigate: PropTypes.any,
    // id: PropTypes.string,
  };
  return (
    <div>
      <ComponentCardV2>
        <Row>
          <Col>
            <Button
              color="primary"
              className="shadow-none"
              onClick={() => {
                editProductData();
                navigate('/Product');
              }}
            >
              Save
            </Button>
          </Col>
          <Col>
            <Button
              color="primary"
              className="shadow-none"
              onClick={() => {
                editProductData();
              }}
            >
              Apply
            </Button>
          </Col>
         
          <Col>
            <Button
              className="shadow-none"
              color="dark"
              onClick={() => {
                navigate('/Product');
                console.log('back to list');
              }}
            >
              Back to List
            </Button>
          </Col>
        
        </Row>
      </ComponentCardV2>
    </div>
  );
}

export default ProductEditButtons;
