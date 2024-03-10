//App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Projects from './components/Projects';
import Home from './components/Home';
import Login from './components/Login';
import Documents from './components/Documents';

import './style/style.scss';

const App = () => {
    const [user, setUser] = useState(null);
    const [, setErrorMessage] = useState('');

    useEffect(() => {
        // Попытка извлечь данные пользователя из localStorage
        const storedToken = localStorage.getItem('token');

        if (storedToken) {
            // Если токен есть, устанавливаем его в состояние пользователя
            setUser({ token: storedToken });
        }
    }, []);

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
                localStorage.setItem('token', userData.token);
            } else {
                let errorData;
                try {
                    errorData = await response.json();
                } catch (error) {
                    // If parsing as JSON fails, use the response text as the error message
                    errorData = { message: response.statusText || 'Unknown error occurred' };
                }
                throw new Error(errorData.message || 'Неизвестная ошибка');
            }
        } catch (error) {
            console.error('Ошибка входа:', error.message);
            setErrorMessage(error.message || 'Что-то пошло не так');
        }
    };


    const handleLogout = () => {
        localStorage.removeItem('token');
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
