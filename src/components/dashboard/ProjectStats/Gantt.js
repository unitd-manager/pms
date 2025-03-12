import React, { useEffect, useState } from 'react';
import { FormGroup, Label, Input, Form } from 'reactstrap';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import gantt from 'dhtmlx-gantt';
import api from '../../../constants/api';

const Gantt = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [milestones, setMilestones] = useState([]);

    // ✅ Correct Duration Calculation
    const calculateDuration = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end date
    };

    const fetchProjects = () => {
        api.get('/project/getProjectss')
            .then(response => {
                if (response.data && Array.isArray(response.data.data)) {
                    setProjects(response.data.data);
                }
            })
            .catch(error => {
                console.error('Error fetching projects:', error);
                setProjects([]);
            });
    };

    const fetchMilestones = (projectId) => {
        api.post('/project/getMilestones', { project_id: projectId })
            .then(response => {
                if (response.data && Array.isArray(response.data.data)) {
                    setMilestones(response.data.data);
                }
            })
            .catch(error => {
                console.error('Error fetching milestones:', error);
                setMilestones([]);
            });
    };

    const handleProjectChange = (e) => {
        const projectId = e.target.value;
        const project = projects.find(p => p.project_id.toString() === projectId);
        setSelectedProject(project);
        fetchMilestones(projectId);
    };

    useEffect(() => {
        gantt.init('gantt_here');
        gantt.config.readonly = true;

        if (selectedProject && milestones.length > 0) {
            const ganttData = milestones.map((milestone, index) => ({
                id: index + 1,
                text: milestone.milestone_title,
                start_date: new Date(milestone.milestone_start_date).toLocaleDateString('en-GB'), // ✅ Fixed Date Format
                end_date: new Date(milestone.milestone_end_date).toLocaleDateString('en-GB'),     // ✅ Fixed Date Format
                duration: calculateDuration(milestone.milestone_start_date, milestone.milestone_end_date), // ✅ Corrected Duration
                progress: selectedProject.per_completed / 100,
            }));
            gantt.clearAll();
            gantt.parse({ data: ganttData });
        }

        return () => {
            gantt.clearAll();
        };
    }, [selectedProject, milestones]);

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div>
            <h1 style={{ color: 'green', textAlign: 'center' }}>Project Gantt Chart</h1>

            <Form>
                <FormGroup>
                    <Label for="projectSelect">Select Project</Label>
                    <Input
                        type="select"
                        name="project_id"
                        id="projectSelect"
                        onChange={handleProjectChange}
                    >
                        <option value="">Select Project</option>
                        {projects.map((element) => (
                            <option key={element.project_id} value={element.project_id}>
                                {element.title}
                            </option>
                        ))}
                    </Input>
                </FormGroup>
            </Form>

            <div id="gantt_here" style={{ width: '90%', height: '600px', margin: 'auto' }}></div>

            {milestones.length > 0 && (
                <div style={{ width: '90%', margin: '20px auto' }}>
                    <h2 style={{ textAlign: 'center' }}>Milestones</h2>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Milestone Title</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Start Date</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px' }}>End Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {milestones.map(milestone => (
                                <tr key={milestone.project_milestone_id}>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{milestone.milestone_title}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                        {new Date(milestone.milestone_start_date).toLocaleDateString('en-GB')} {/* ✅ Fixed */}
                                    </td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                        {new Date(milestone.milestone_end_date).toLocaleDateString('en-GB')} {/* ✅ Fixed */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Gantt;
