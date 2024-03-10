//Home.js
import React, { useState, useEffect } from 'react';

const Home = () => {
    const [dataStats, setDataStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDataStats = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log('Current token:', token);

                if (!token) {
                    console.error('Access Denied. No token provided.');
                    setLoading(false);
                    return;
                }

                const response = await fetch('http://localhost:3001/alldata', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                console.log('Request headers:', response.headers);

                if (!response.ok) {
                    if (response.status === 401) {
                        console.error('Unauthorized. Redirect to login or handle accordingly.');
                    } else {
                        const errorMessage = await response.text(); // Get error message from the response
                        console.error('Error fetching data stats:', errorMessage);
                    }
                    setLoading(false);
                    return;
                }

                const fetchedDataStats = await response.json();

                setDataStats(fetchedDataStats);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data stats:', error.message);
                setLoading(false);
            }
        };


        fetchDataStats();
    }, []);

    return (
        <section className="home">
            <div className="container">
                {loading ? (
                    <p>Загрузка данных...</p>
                ) : dataStats && dataStats.Projects ? (
                    <div className="home__inner">
                        <div className="home__stats">
                            <h2 className="home__title">Общая статистика:</h2>
                            <p className="home__item">Всего проектов: {dataStats['Projects'].rowCount}</p>
                            <p className="home__item">Всего сотрудников: {dataStats['Employees'].rowCount}</p>
                        </div>
                        <div className="home__stats">
                            <h2 className="home__title">Статистика данных:</h2>
                            {Object.keys(dataStats).map((tableName, index) => (
                                <p className="home__item"
                                   key={index}>{`Всего ${tableName}: ${dataStats[tableName].rowCount}`}</p>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p>No data available or unauthorized access.</p>
                )}
            </div>
        </section>
    );
};

export default Home;
