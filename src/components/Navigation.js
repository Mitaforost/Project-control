import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ onLogout }) => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Главная</Link>
                </li>
                <li>
                    <Link to="/projects">Проекты</Link>
                </li>
                <li>
                    <button onClick={onLogout}>Выйти</button>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
