import React, { useState } from 'react';
import { addProject } from '../services/documentService';
const ProjectForm = ({ onAddProject, onPageChange }) => {
    const [projectName, setProjectName] = useState('');

    const handleAddProject = async () => {
        const newProject = { name: projectName };
        await addProject(newProject);
        onAddProject(newProject);
        setProjectName('');
        onPageChange(1); // Переходим на первую страницу после добавления проекта
    };

    return (
        <div>
            <h2>Add Project</h2>
            <input
                type="text"
                placeholder="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
            />
            <button onClick={handleAddProject}>Add Project</button>
        </div>
    );
};

export default ProjectForm;
