import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ onLogout }) => {
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
                    <button className="btn-primary" onClick={onLogout}>Выйти</button>
                </nav>
            </div>
        </section>
    );
};

export default Navigation;
