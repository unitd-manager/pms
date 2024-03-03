import { Row, Col } from 'reactstrap';
import Stats from '../../components/dashboard/StatsPms';
import StatsPmsDonut from '../../components/dashboard/StatsPmsDonut';
import ActualHour from '../../components/dashboard/ActualHour';
import PriorityStats from '../../components/dashboard/PriorityStats';
import MilestoneCompleted from '../../components/dashboard/MilestoneCompletedChart';
import AverageIssues from '../../components/dashboard/AverageIssues';
import LinkedinBarStats from '../../components/dashboard/LinkedinBarStats';



// import SalesOverview from '../../components/dashboard/classicDashboard/ProjectOverview';
// import TenderSummaryCard from '../../components/dashboard/TenderSummaryCard';
// import ProjectSummaryChart from '../../components/dashboard/ProjectSummaryChart';
import TaskSummary from '../../components/dashboard/TenderSummary';
import LeadStats from '../../components/dashboard/ProjectStats/LeadStats';
import LeadStat2 from '../../components/dashboard/ProjectStats/LeadStat2';

const Classic = () => {
  return (
    <>
      {/*********************Sales Overview ************************/}
      <Row>
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
      <PriorityStats />
      <br />
      <LeadStats/>
      <br />
      <LeadStat2/>
        </Col>
      </Row>
      {/*********************Email & Visitor ************************/}
  
    </>
  );
};

export default Classic;
