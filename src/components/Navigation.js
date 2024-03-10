// Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ onLogout }) => {
    const handleLogout = () => {
        // Очистите токен из localStorage при выходе
        localStorage.removeItem('token');
        // Вызовите функцию onLogout, если она передана
        if (onLogout && typeof onLogout === 'function') {
            onLogout();
        }
    };

    return (
        <section className="navigation">
            <div className="container">
                <nav className="navigation__inner">
                    <ul className="navigation__list">
                        <li className="navigation__item">
                            <Link to="/">Главная</Link>
                        </li>
                        <li className="navigation__item">
                            <Link to="/projects">Проекты</Link>
                        </li>
                        <li className="navigation__item">
                            <Link to="/documents">Документы</Link>
                        </li>
                    </ul>
                    <button className="btn-primary" onClick={handleLogout}>
                        Выйти
                    </button>
                </nav>
            </div>
        </section>
    );
};

export default Navigation;
