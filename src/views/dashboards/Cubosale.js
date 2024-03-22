import { Row, Col } from 'reactstrap';
import Stats from '../../components/dashboard/StatsPms';
import StatsPmsDonut from '../../components/dashboard/StatsPmsDonut';
import ActualHour from '../../components/dashboard/ActualHour';
import PriorityStats from '../../components/dashboard/PriorityStats';
import MilestoneCompleted from '../../components/dashboard/MilestoneCompletedChart';
import AverageIssues from '../../components/dashboard/AverageIssues';
import LinkedinBarStats from '../../components/dashboard/LinkedinBarStats';
import TaskSummary from '../../components/dashboard/TenderSummary';
import LeadStats from '../../components/dashboard/ProjectStats/LeadStats';
import LeadStat2 from '../../components/dashboard/ProjectStats/LeadStat2';
import ProjectTitle from '../../components/dashboard/ProjectTitle';
// import StatusCards from '../../components/dashboard/StatusCards';

const Classic = () => {
  return (
    <>
      {/*********************Sales Overview ************************/}
      <Row>
      <Col lg="12">
      <ProjectTitle/>
      </Col>
     <br />
     {/* <Col lg="12">
     <StatusCards/>
     </Col> */}
     <br />
        <Col lg="12">
          <TaskSummary />

          <Row>
        <Col sm="4" lg="6" xl="6" xxl="6">
          <Stats />
        </Col>
        <Col sm="4" lg="10" xl="6" xxl="6">
          <StatsPmsDonut />
        </Col>
      </Row>
      <Row>
        <Col sm="4" lg="10" xl="6" xxl="6">
          <MilestoneCompleted />
        </Col>
        <Col sm="4" lg="10" xl="6" xxl="6">
          <AverageIssues />
        </Col>
      </Row>
      <br />
      <ActualHour />
      <br />
      <PriorityStats/>
      <br />
      <LinkedinBarStats />
      <br />
      <PriorityStats />
      <br />
      <LeadStats/>
      <br />
      <LeadStat2/>
<<<<<<< HEAD
      <br />
=======


>>>>>>> b3e515bb71398cbe2ee1c03588959632bbb8bca7
        </Col>
      </Row>
  
    </>
  );
};

export default Classic;
