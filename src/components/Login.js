import React, {useState} from 'react';

const Login = ({onLogin}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await onLogin(username, password);
            console.log('Авторизация успешна:', response);
        } catch (error) {
            console.error('Ошибка входа:', error.message);
            setErrorMessage('Не верное имя или неверный пароль');
        }
    };

    return (
        <section className="auth">
            <div className="container">
                <div className="auth__inner">
                    <h2 className="auth__title">Форма авторизации</h2>
                    <form className="auth__form" onSubmit={handleLogin}>
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
