import React, { useState, useEffect } from 'react';

const Home = () => {
    const [dataStats, setDataStats] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDataStats = async () => {
            try {
                const response = await fetch('http://localhost:3001/alldata');

                if (!response.ok) {
                    throw new Error('Error fetching data stats');
                }

                const dataStats = await response.json();

                setDataStats(dataStats);
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
                ) : (
                    <div className="home__inner">
                        <h2 className="home__title">Статистика данных:</h2>
                        {Object.keys(dataStats).map((tableName, index) => (
                            <p className="home__item" key={index}>{`Всего ${tableName}: ${dataStats[tableName].rowCount}`}</p>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Home;
