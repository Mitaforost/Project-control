import React, { useState } from 'react';
import Modal from './Modal';
import {deleteProject} from "../services/documentService";

const ProjectCard = ({ project, onEdit }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const handleSave = (editedFields) => {
        onEdit({ ...project, ...editedFields });
        setIsModalOpen(false);
    };
    const handleDelete = async (projectId) => {
        try {
            await deleteProject(projectId);
            console.log('Project deleted successfully:', projectId);
        } catch (error) {
            console.error('Error deleting project:', error.message);
        }
    };


    return (
        <div className="projects-card">
            <h3 className="projects-card__title">{project.ProjectName}</h3>
            <p className="projects-card__subtitle">{project.ProjectDescription}</p>
            <button className="btn-primary" onClick={openModal}>
                Подробнее
            </button>

            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)} project={project} onSave={handleSave} onDelete={handleDelete} />
            )}
        </div>
    );
};

export default ProjectCard;
