import React, { useState, useEffect } from 'react';
import { Card, CardBody, Row, Col } from 'reactstrap';
import api from '../../constants/api';

const StatusCards = () => {
  const [projectStats, setProjectStats] = useState([]);

  // Get the project statistics
  const getStats = () => {
    api.get('stats/ProjectTitleCards')
      .then((res) => {
        setProjectStats(res.data.data);
      })
      .catch((error) => {
        console.log('Error fetching project statistics:', error);
      });
  };

  useEffect(() => {
    getStats();
  }, []);

 

  return (
    <Row>
      {projectStats.map((project) => (
       <Col sm="12" lg="3">
       {/*--------------------------------------------------------------------------------*/}
       {/* Card-3                                                                         */}
       {/*--------------------------------------------------------------------------------*/}
       <Card className="bg-primary text-dark-white">
         <CardBody>
           <div className="d-flex align-items-center">
             <div>
               <h6 className="font-12 mb-3">In Progress</h6>
               <h4 className="mt-4 fw-bolder mb-0"> {project.in_progress_task_count}</h4>
               
             </div>
      
           </div>
         </CardBody>
       </Card>
     </Col>
      ))}
        {projectStats.map((project) => (
       <Col sm="12" lg="3">
       {/*--------------------------------------------------------------------------------*/}
       {/* Card-3                                                                         */}
       {/*--------------------------------------------------------------------------------*/}
       <Card className="bg-secondary text-dark-white">
         <CardBody>
           <div className="d-flex align-items-center">
             <div>
               <h6 className="font-12 mb-3">Completed</h6>
               <h4 className="mt-4 fw-bolder mb-0"> {project.completed}</h4>
               
             </div>
      
           </div>
         </CardBody>
       </Card>
     </Col>
      ))}
       {projectStats.map((project) => (
       <Col sm="12" lg="3">
       {/*--------------------------------------------------------------------------------*/}
       {/* Card-3                                                                         */}
       {/*--------------------------------------------------------------------------------*/}
       <Card className="bg-success text-dark-white">
         <CardBody>
           <div className="d-flex align-items-center">
             <div>
               <h6 className="font-12 mb-3">On Hold</h6>
               <h4 className="mt-4 fw-bolder mb-0"> {project.on_hold}</h4>
               
             </div>
      
           </div>
         </CardBody>
       </Card>
     </Col>
      ))}
      {projectStats.map((project) => (
       <Col sm="12" lg="3">
       {/*--------------------------------------------------------------------------------*/}
       {/* Card-3                                                                         */}
       {/*--------------------------------------------------------------------------------*/}
       <Card className="bg-danger text-dark-white">
         <CardBody>
           <div className="d-flex align-items-center">
             <div>
               <h6 className="font-12 mb-3">Not Started</h6>
               <h4 className="mt-4 fw-bolder mb-0"> {project.not_started_task}</h4>
               
             </div>
      
           </div>
         </CardBody>
       </Card>
     </Col>
      ))}
    </Row>
  );
};

export default StatusCards;
