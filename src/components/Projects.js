// components/Projects.js
import React, { useState, useEffect } from 'react';
import { getProjects } from '../services/documentService';
import ProjectCard from './ProjectCard';

const Projects = ({ userAccessLevel }) => {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, status, error } = await getProjects();

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
                                <ProjectCard project={project} />
                            </li>
                        ))
                    ) : (
                        <p className="projects__message">Данные загружаются...</p>
                    )}
                </ul>
            </div>
        </section>
    );
};

export default Projects;
