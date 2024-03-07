// DocumentCard.js
import React from 'react';

const DocumentCard = ({ document, onChangeStatus }) => {
    const handleStatusChange = async (newStatus) => {
        try {
            await onChangeStatus(document.DocumentID, newStatus);
        } catch (error) {
            console.error('Error changing document status:', error.message);
        }
    };
    const handleUpdateStatus = async () => {
        // Предполагаем, что document.DocumentID и newStatus определены где-то выше
        const newStatus = 'НовыйСтатус'; // Замените на необходимый статус
        await onChangeStatus(document.DocumentID, newStatus);
    };

    return (
        <div className="documents__card">
            <h3 className="documents__title">{document.Title}</h3>
            <p className="documents__status">Status: {document.Status}</p>
            <p className="documents__text">{document.Content}</p>
            {document.Status === 'Draft' && (
                <button className="btn-primary documents__btn" onClick={() => handleStatusChange('Pending')}>Отправить на рассмотрение</button>
            )}
            <button className="btn-primary" onClick={handleUpdateStatus}>Обновить статус</button>
        </div>
    );
};

export default DocumentCard;
