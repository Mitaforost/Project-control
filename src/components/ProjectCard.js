import React, { useState } from 'react';
import Modal from './Modal'; // Предполагается, что у вас есть компонент модального окна

const ProjectCard = ({ project }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="projects-card">
            <h3 className="projects-card__title">{project.ProjectName}</h3>
            <p className="projects-card__subtitle">{project.ProjectDescription}</p>
            <button className="btn-primary" onClick={openModal}>Подробнее</button>

            {isModalOpen && (
                <Modal onClose={closeModal}>
                    <h2 className="projects__title">{project.ProjectName}</h2>
                    <p className="projects-card__subtitle">{project.ProjectDescription}</p>
                </Modal>
            )}
        </div>
    );
};

export default ProjectCard;
