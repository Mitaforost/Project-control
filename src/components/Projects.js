import React, { useState, useEffect } from 'react';
import { getProjects } from '../services/documentService';

const Projects = ({ userAccessLevel  }) => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getProjects();
                console.log('Response:', response.data);
                setProjects(response.data);
            } catch (error) {
                console.error('Ошибка при получении проектов:', error.message);
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
        <div>
            {userAccessLevel && (
                <div>
                    <h2>Информация о роли пользователя</h2>
                    <p>{getReminderText()}</p>
                </div>
            )}
            <h2>Список проектов</h2>
            <ul>
                {projects.length > 0 ? (
                    projects.map((project) => (
                        <li key={project.ProjectID}>{project.ProjectName}</li>
                    ))
                ) : (
                    <p>Данные загружаются...</p>
                )}
            </ul>
        </div>
    );
};

export default Projects;
