import React, { useState } from 'react';

const ProjectForm = ({ onAddProject }) => {
    const [projectName, setProjectName] = useState('');

    const handleAddProject = () => {
        onAddProject({ name: projectName });
        setProjectName('');
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
