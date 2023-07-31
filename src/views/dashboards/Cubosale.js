import { Row, Col } from 'reactstrap';
import Stats from '../../components/dashboard/StatsPms';
import StatsPmsDonut from '../../components/dashboard/StatsPmsDonut';
import ActualHour from '../../components/dashboard/ActualHour';
import AverageIssues from '../../components/dashboard/AverageIssues';

// import SalesOverview from '../../components/dashboard/classicDashboard/ProjectOverview';
// import TenderSummaryCard from '../../components/dashboard/TenderSummaryCard';
// import ProjectSummaryChart from '../../components/dashboard/ProjectSummaryChart';
// import TenderSummary from '../../components/dashboard/TenderSummary';
// import InvoiceSummary from '../../components/dashboard/InvoiceSummary';
// import InvoiceSummaryChart from '../../components/dashboard/InvoiceSummaryChart';
// import EmployeeSummary from '../../components/dashboard/ecommerceDashboard/EmployeeSummary';
// import PasspotExpirySummary from '../../components/dashboard/PasspotExpirySummary';
// import WorkpermitExpirySummary from '../../components/dashboard/WorkpermitExpirySummary';

const Classic = () => {
  return (
    <>
      {/*********************Sales Overview ************************/}
      <Row>
        <Col lg="12">
          {/* <TenderSummaryCard />
          <ProjectSummaryChart/>
          <TenderSummary />
          <InvoiceSummary/>
          <InvoiceSummaryChart/>
          <EmployeeSummary/>
          <PasspotExpirySummary />
          <WorkpermitExpirySummary/> */}
          {/* <SalesOverview /> */}
          <Stats/>
          <StatsPmsDonut></StatsPmsDonut>
          <ActualHour/>
          <AverageIssues/>
        </Col>
      </Row>
      {/*********************Email & Visitor ************************/}
      {/* <Row>
        <Col lg="8" sm="12">
          <EmailCampaign />
        </Col>
        <Col lg="4" sm="12">
          <ActiveVisitors />
        </Col>
      </Row>
      
      <Stats />
     
      <Row>
        <Col lg="12">
          <ProjectTable />
        </Col>
      </Row>
     
      <Row>
        <Col lg="6" sm="12">
          <RecentComments />
        </Col>
        <Col lg="6" sm="12">
          <Chat />
        </Col>
      </Row> */}
    </>
  );
};

export default Classic;
