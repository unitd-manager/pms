import React, { useEffect, useState } from 'react';
import CommonTable from "../CommonTable";
import api from "../../constants/api";

const TenderSummary = () => {

  const [projectTask, setProjectTask] = useState();

  useEffect(() => {
    api.get('/projecttask/getAllCurrentTask').then((res) => {
      console.log("projecttask",res)
      setProjectTask(res.data.data);
    });
  }, []);

  const columns = [
    {
      name: "employee Name",
      selector: "first_name",
      grow: 0,
      wrap: true,
    },
    {
      name: "Start Date",
      selector: "start_date",
      grow: 0,
      width: "auto",
      button: true,
      sortable: false,
    },
    {
      name: "Task Title",
      selector: "task_title",
      grow: 0,
      width: "auto",
      wrap: true,
    },
    {
      name: "Status",
      selector: "status",
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: "Estimated Hours",
      selector: "estimated_hours",
      sortable: true,
      grow: 2,
      wrap: true,
    },
  ];

  return (
    <>
      <CommonTable title="Employee Task List">
          <thead>
            <tr>
              {columns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
          {projectTask &&
                projectTask.map((element) => {
                  return (
                    <tr key={element.employee_id}>
                      <td>{element.first_name}</td>
                      <td>{element.start_date}</td>
                      <td>{element.task_title}</td>
                      <td>{element.status}</td>
                      <td>{element.estimated_hours}</td>
                    </tr>
                  );
                })}
          </tbody>
      </CommonTable>
    </>
  );
}

export default TenderSummary;