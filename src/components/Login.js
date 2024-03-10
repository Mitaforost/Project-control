// Login.js
import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        try {
            const userData = await onLogin(username, password);

            if (userData) {
                // Обработка успешной авторизации, если необходимо
            } else {
                setErrorMessage('Invalid username or password');
            }
        } catch (error) {
            console.error('Error during login:', error.message);
            setErrorMessage('Invalid username or password');
        }
    };

    return (
        <section className="auth">
            <div className="container">
                <div className="auth__inner">
                    <h2 className="auth__title">Форма авторизации</h2>
                    <form className="auth__form" onSubmit={(e) => {
                        e.preventDefault(); // Предотвратить стандартное поведение отправки формы
                        handleLogin();
                    }}>
                        <label className="auth__label">
                            Имя пользователя:
                            <input
                                className="auth__input"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Введите ваше имя пользователя"
                            />
                        </label>
                        <label className="auth__label">
                            Пароль:
                            <div className="auth__password-wrapper">
                                <input
                                    className="auth__input"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Введите ваш пароль"
                                />
                                <button
                                    type="button"
                                    className="auth__password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? "Скрыть" : "Показать"}
                                </button>
                            </div>
                        </label>
                        <button className="btn-primary auth__btn" type="submit">
                            Войти
                        </button>
                        {errorMessage && (
                            <p className="auth__error-message">{errorMessage}</p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Login;