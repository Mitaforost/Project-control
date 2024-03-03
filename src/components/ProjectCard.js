import React, { useState } from 'react';
import Modal from './Modal';

const ProjectCard = ({ project, onEdit }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSave = (editedProject) => {
        // Handle saving the edited project (e.g., make an API call)
        console.log('Saving edited project:', editedProject);
        // For simplicity, we'll just log the edited project for now
        onEdit(editedProject);
    };

    return (
        <div className="projects-card">
            <h3 className="projects-card__title">{project.ProjectName}</h3>
            <p className="projects-card__subtitle">{project.ProjectDescription}</p>
            <button className="btn-primary" onClick={openModal}>
                Подробнее
            </button>

            {isModalOpen && (
                <Modal onClose={closeModal} project={project} onSave={handleSave} />
            )}
        </div>
    );
};

export default ProjectCard;
