import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import api from '../../../constants/api';

const SysStatus = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/project/sys-status')
      .then(response => {
        if (response.data) {
          setData(response.data);   // ✅ no need to check for array
        }
      })
      .catch(err => console.error("Error fetching system status:", err));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="d-flex flex-row gap-5">
      {/* CPU */}
      <div className="p-4 shadow-lg rounded-2xl bg-white flex-grow-1">
        <h3 className="text-lg font-semibold">CPU Usage</h3>
        <CircularProgressbar
          value={parseFloat(data.cpuUsage)}
          text={`${data.cpuUsage}%`}
          styles={buildStyles({ pathColor: "#00b894", textColor: "#2d3436" })}
        />
      </div>

      {/* RAM */}
      <div className="p-4 shadow-lg rounded-2xl bg-white flex-grow-1">
        <h3 className="text-lg font-semibold">RAM Usage</h3>
        <CircularProgressbar
          value={parseFloat(data.ramUsage)}
          text={`${data.ramUsage}%`}
          styles={buildStyles({ pathColor: "#0984e3", textColor: "#2d3436" })}
        />
        <p>{data.ramUsed} GB / {data.ramTotal} GB</p>
      </div>

      {/* Disk */}
      <div className="p-4 shadow-lg rounded-2xl bg-white flex-grow-1">
        <h3 className="text-lg font-semibold">Disk Usage</h3>
        <CircularProgressbar
          value={parseFloat(data.diskUsage)}
          text={`${data.diskUsage}%`}
          styles={buildStyles({ pathColor: "#d63031", textColor: "#2d3436" })}
        />
        <p>{data.diskUsed} GB / {data.diskTotal} GB</p>
      </div>
    </div>
  );
};

export default SysStatus;
