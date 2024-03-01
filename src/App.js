import React, { useState } from 'react';
import Projects from './components/Projects';
import Login from './components/Login';

const App = () => {
    const [user, setUser] = useState(null);

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
            } else {
                throw new Error('Не найдено');
            }
        } catch (error) {
            console.error('Ошибка входа:', error.message);
            throw error;
        }
    };

    return (
        <div>
            {user ? (
                <div>
                    <h1>Ваше приложение</h1>
                    <Projects userAccessLevel={user.accessLevel} />
                </div>
            ) : (
                <Login onLogin={handleLogin} />
            )}
        </div>
    );
};

export default App;
