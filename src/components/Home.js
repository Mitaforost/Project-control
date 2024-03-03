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
        <div>
            {loading ? (
                <p>Загрузка данных...</p>
            ) : (
                <div>
                    <h2>Статистика данных</h2>
                    {Object.keys(dataStats).map((tableName, index) => (
                        <p key={index}>{`Всего ${tableName}: ${dataStats[tableName].length}`}</p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
