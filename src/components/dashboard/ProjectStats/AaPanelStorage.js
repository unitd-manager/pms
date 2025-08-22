import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardBody, CardTitle, Row, Col, Progress } from "reactstrap";

const AaPanelStorage = () => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    // Fetch system status from PMS backend
    axios.get("/project/aapanel-status")
      .then(res => setStatus(res.data))
      .catch(() => setStatus(null));
  }, []);

  if (!status) {
    return (
      <Card>
        <CardBody>
          <CardTitle tag="h5">aaPanel System Status</CardTitle>
          <p>Loading system status...</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">aaPanel System Status</CardTitle>
        <Row>
          <Col md="3">
            <h6>Load Status</h6>
            <Progress value={status.load.one * 10} color="success">
              {status.load.one}
            </Progress>
          </Col>
          <Col md="3">
            <h6>CPU Usage</h6>
            <Progress value={status.cpu} color="info">
              {status.cpu}%
            </Progress>
          </Col>
          <Col md="3">
            <h6>RAM Usage</h6>
            <Progress value={(status.memRealUsed / status.memTotal) * 100} color="warning">
              {Math.round((status.memRealUsed / status.memTotal) * 100)}%
            </Progress>
            <small>{status.memRealUsed} / {status.memTotal} MB</small>
          </Col>
          <Col md="3">
            <h6>Disk Usage</h6>
            <Progress value={(status.disk.used / status.disk.total) * 100} color="danger">
              {Math.round((status.disk.used / status.disk.total) * 100)}%
            </Progress>
            <small>{status.disk.used} / {status.disk.total} GB</small>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default AaPanelStorage;
