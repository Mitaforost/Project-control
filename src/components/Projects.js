// components/Projects.js
import React, {useState, useEffect} from 'react';
import {getProjects, editProject, createProject, deleteProject} from '../services/documentService';
import ProjectCard from './ProjectCard';
import Modal from './Modal';

const Projects = ({userAccessLevel}) => {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchData = async () => {
        try {
            const {data, status, error} = await getProjects();

            if (status !== 200) {
                setError(`Network response was not ok. Status: ${status}`);
                console.error('Full server response:', error);
                return;
            }

            setProjects(data);
            setError(null);
        } catch (error) {
            console.error('Error fetching projects:', error.message);
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const getReminderText = () => {
        if (userAccessLevel) {
            switch (userAccessLevel) {
                case 1:
                    return 'Вы вошли как администратор. У вас есть полный доступ ко всем функциям приложения.';
                case 2:
                    return 'Вы вошли как менеджер. Вы можете читать, записывать и обновлять данные.';
                case 3:
                    return 'Вы вошли как пользователь. У вас есть только чтение данных.';
                default:
                    return '';
            }
        }
        return '';
    };

    const handleAddProject = async (newProject) => {
        try {
            const createdProject = await createProject(newProject);
            setProjects([...projects, createdProject]);
            setIsModalOpen(false);
            setError(null);
        } catch (error) {
            console.error('Error creating a new project:', error.message);
            setError(error.message);
        }
    };


    const handleEditProject = async (editedProject) => {
        try {
            const {data, status, error} = await editProject(editedProject);

            if (status !== 200) {
                setError(`Failed to edit the project. Status: ${status}`);
                console.error('Full server response:', error);
                return;
            }

            // Обновляем projects с отредактированным проектом
            setProjects((prevProjects) => {
                const updatedProjects = prevProjects.map((project) =>
                    project.ProjectID === editedProject.ProjectID ? data : project
                );
                return updatedProjects;
            });

            setError(null);
        } catch (error) {
            console.error('Error editing the project:', error.message);
            setError(error.message);
        }
    };
    const handleDeleteProject = async (projectId) => {
        console.log('Deleting project with ID:', projectId);

        try {
            await deleteProject(projectId);

            // После успешного удаления обновляем проекты
            fetchData();
        } catch (error) {
            console.error('Error deleting the project:', error.message);
            setError(error.message);
        }
    };

    return (
        <section className="projects">
            <div className="container">
                {error && (
                    <div className="projects__info">
                        <h2 className="projects__title">Ошибка</h2>
                        <p className="projects__subtitle">{error}</p>
                    </div>
                )}
                {userAccessLevel && (
                    <div className="projects__info">
                        <h2 className="projects__title">Информация о роли пользователя</h2>
                        <p className="projects__subtitle">{getReminderText()}</p>
                    </div>
                )}
                <h2 className="projects__title">Список проектов</h2>
                <ul className="projects__list">
                    {projects.length > 0 ? (
                        projects.map((project) => (
                            <li className="projects__item" key={project.ProjectID}>
                                <ProjectCard project={project} onEdit={handleEditProject}/>
                            </li>
                        ))
                    ) : (
                        <p className="projects__message">Данные загружаются...</p>
                    )}
                </ul>
                <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
                    Добавить новый проект
                </button>
                {isModalOpen && (
                    <Modal onClose={() => setIsModalOpen(false)} onSave={handleAddProject}
                           onDelete={handleDeleteProject} onUpdateProjects={fetchData}/>
                )}
            </div>
        </section>
    );
};

export default Projects;
