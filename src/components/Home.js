// Home.js
import React from 'react';

const Home = ({ user }) => {
    return (
        <div>
            <h2>Домашняя страница</h2>
            {user && (
                <div>
                    <p>Привет, {user.firstName} {user.lastName}!</p>
                    <p>Вы вошли как {user.roleName}.</p>
                    <p>Общее количество проектов: {user.totalProjects}</p>
                    <p>Общее количество задач: {user.totalTasks}</p>
                    {/* Добавьте другие статистические данные по желанию */}
                </div>
            )}
        </div>
    );
};

export default Home;
