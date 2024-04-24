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
import LeadStat3 from '../../components/dashboard/ProjectStats/LeadStat3';
import ProjectTitle from '../../components/dashboard/ProjectTitle';
import LeadCallStats from '../../components/dashboard/ProjectStats/LeadCallStats';
//import DonutDashboard from '../../components/dashboard/DonutChart';
import MultiChart from '../charts/MultiCharts';
//import IgniteChart from '../../components/IgniteChart';
//import Chartj from '../../components/chartj';
//import DonutChartWithOutsideLabels from '../../components/Donut/DonutChart';
//import Repie from '../../components/RechartDonut.js/Repie';
//import DonutChartWithLeaderLines from '../../components/DonutlineChart';
//import MainChart from '../charts/DonutChart';
// import StatusCards from '../../components/dashboard/StatusCards';

const Classic = () => {
  return (
    <>
      {/*********************Sales Overview ************************/}
     
       
      <Row>
        <Col md='12'>
         
          {/* <MainChart/> */}
          {/* <DonutDashboard/> */}
          <MultiChart/>
        </Col>
      </Row>
      <Row>
      <Col lg="12">
      <ProjectTitle/>
      <br />
      <LeadStats/>
      <br />
      <LeadStat2/>
      <br />
      <LeadCallStats />
      </Col>

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
      <br />
      <LeadStat3/>
      <br/>
      <LeadCallStats />
        </Col>
      </Row>
  
    </>
  );
};

export default Classic;
