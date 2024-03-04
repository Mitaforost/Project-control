import React, { useState, useEffect } from 'react';

const Modal = ({ onClose, project, onSave, onDelete, onUpdateProjects}) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [editedProject, setEditedProject] = useState({ ...project });

    useEffect(() => {
        if (project) {
            setEditedProject({ ...project });
        }
    }, [project]);

    const handleEditClick = () => {
        setIsEditMode(true);
    };

    const handleSaveClick = () => {
        if (editedProject) {
            onSave(editedProject);
            setIsEditMode(false);
        }
    };

    const handleDeleteClick = () => {
        console.log('Deleting project with ID:', editedProject.ProjectID);
        if (onDelete && typeof onDelete === 'function') {
            onDelete(editedProject.ProjectID);
        }
        setIsEditMode(false);

        // Вызываем функцию обновления проектов
        if (onUpdateProjects && typeof onUpdateProjects === 'function') {
            onUpdateProjects();
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProject((prevProject) => ({
            ...prevProject,
            [name]: value,
        }));
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <button className="btn-primary close-button" onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="20" height="20">
                        <path fill="currentColor" d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"/>
                    </svg>
                </button>
                <h2 className="modal__title">{isEditMode ? 'Редактирование проекта' : 'Просмотр проекта'}</h2>
                <div className="modal__content">
                    <label className="modal__label" htmlFor="projectName">Название проекта:</label>
                    <input
                        className="modal__text"
                        type="text"
                        id="projectName"
                        name="ProjectName"
                        value={editedProject.ProjectName}
                        onChange={handleInputChange}
                        disabled={!isEditMode}
                    />
                    <label className="modal__label" htmlFor="projectDescription">Описание проекта:</label>
                    <textarea
                        className="modal__text"
                        id="projectDescription"
                        name="ProjectDescription"
                        value={editedProject.ProjectDescription}
                        onChange={handleInputChange}
                        disabled={!isEditMode}
                    />
                </div>
                {isEditMode ? (
                    <div>
                        <button className="btn-primary" onClick={handleSaveClick}>
                            Сохранить изменения
                        </button>
                        <button className="btn-primary" onClick={() => setIsEditMode(false)}>
                            Отмена
                        </button>
                        <button className="btn-primary" onClick={handleDeleteClick}>
                            Удалить проект
                        </button>
                    </div>
                ) : (
                    <button className="btn-primary" onClick={handleEditClick}>
                        Редактировать проект
                    </button>
                )}
            </div>
        </div>
    );
};

export default Modal;
