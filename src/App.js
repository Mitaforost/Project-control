import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Projects from './components/Projects';
import Home from './components/Home';
import Login from './components/Login';
import Documents from './components/Documents';

import './style/style.scss';

const App = () => {
    // Attempt to parse the user data from localStorage
    let storedUser;
    try {
        storedUser = JSON.parse(localStorage.getItem('user')) || null;
    } catch (error) {
        // Handle the error, you might want to clear the invalid data from localStorage
        console.error('Error parsing user data from localStorage:', error.message);
        localStorage.removeItem('user');
        storedUser = null;
    }

    const [user, setUser] = useState(storedUser);
    const [, setErrorMessage] = useState('');

    const handleLogin = async (username, password) => {
        try {
            const response = await fetch('http://localhost:3001/auth/login', {
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
                const errorData = await response.json();
                throw new Error(errorData.message || 'Неизвестная ошибка');
            }
        } catch (error) {
            console.error('Ошибка входа:', error.message);
            setErrorMessage(error.message || 'Что-то пошло не так');
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
                        <Route path="/documents" element={<Documents />} />
                    </Routes>
                </div>
            ) : (
                <Login onLogin={handleLogin} setErrorMessage={setErrorMessage} />
            )}
        </Router>
    );
};

export default App;
