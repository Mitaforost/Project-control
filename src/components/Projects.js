import React, { useState, useEffect } from 'react';
import { getProjects, addProject } from '../services/documentService';

const Projects = ({ userAccessLevel }) => {
    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getProjects(currentPage);
                console.log('Response:', response.data);
                setProjects(response.data);
            } catch (error) {
                console.error('Ошибка при получении проектов:', error.message);
            }
        };

        fetchData();
    }, [currentPage]);

    const onPageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleAddProject = async (newProject) => {
        try {
            await addProject(newProject);
            // Мы не обновляем state напрямую, так как это повлечет за собой дополнительный запрос на сервер
            // Вместо этого, мы просто увеличиваем текущую страницу, что приведет к повторному запросу с обновленными данными
            setCurrentPage((prevPage) => prevPage + 1);
        } catch (error) {
            console.error('Ошибка при добавлении проекта:', error.message);
        }
    };

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
