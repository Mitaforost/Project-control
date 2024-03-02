// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Projects from './components/Projects';
import Home from './components/Home';
import Login from './components/Login';

import './style/style.scss';

const App = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const [user, setUser] = useState(storedUser || null);

    const handleLogin = async (username, password) => {
        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
            } else {
                throw new Error('Не найдено');
            }
        } catch (error) {
            console.error('Ошибка входа:', error.message);
            throw error;
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <Router>
            {user ? (
                <div>
                    <Navigation onLogout={handleLogout} />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/projects" element={<Projects userAccessLevel={user.accessLevel} />} />
                    </Routes>
                </div>
            ) : (
                <Login onLogin={handleLogin} />
            )}
        </Router>
    );
};

export default App;
