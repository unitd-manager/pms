import { Row, Col } from 'reactstrap';
import SalesOverview from '../../components/dashboard/classicDashboard/SalesOverview';
import EmailCampaign from '../../components/dashboard/classicDashboard/EmailCampaign';
import ActiveVisitors from '../../components/dashboard/classicDashboard/ActiveVisitors';
import Stats from '../../components/dashboard/classicDashboard/Stats';
import ProjectTable from '../../components/dashboard/classicDashboard/ProjectTable';
import RecentComments from '../../components/dashboard/classicDashboard/RecentComments';
import Chat from '../../components/dashboard/classicDashboard/Chat';
import MainChart from '../charts/DonutChart';

const Classic = () => {
  return (
    <>
      {/*********************Sales Overview ************************/}
      <Row>
        <Col md='6'>
          <MainChart/>
        </Col>
      </Row>
      <Row>
        <Col lg="12">
          <SalesOverview />
        </Col>
      </Row>
      {/*********************Email & Visitor ************************/}
      <Row>
        <Col lg="8" sm="12">
          <EmailCampaign />
        </Col>
        <Col lg="4" sm="12">
          <ActiveVisitors />
        </Col>
      </Row>
      {/********************* Three Column stats ************************/}
      <Stats />
      {/*********************Project Table ************************/}
      <Row>
        <Col lg="12">
          <ProjectTable />
        </Col>
      </Row>
      {/*********************Chat & comment ************************/}
      <Row>
        <Col lg="6" sm="12">
          <RecentComments />
        </Col>
        <Col lg="6" sm="12">
          <Chat />
        </Col>
      </Row>
    </>
  );
};

export default Classic;
