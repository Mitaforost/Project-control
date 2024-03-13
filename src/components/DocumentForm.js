// DocumentForm.js
import React, { useState } from 'react';
import { createDocument } from '../services/documentService';

const DocumentForm = ({ onAddDocument }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleCreateDocument = async () => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('Access Denied. No token provided.');
                return;
            }

            console.log('Creating document with data:', { Title: title, Content: content });

            const newDocument = await createDocument({ Title: title, Content: content }, token);
            console.log('Create Document Response:', newDocument);

            onAddDocument(newDocument);
            // Очистка полей формы или другие действия, если нужно
            setTitle('');
            setContent('');
        } catch (error) {
            console.error('Error creating a new document:', error.message);
            // Обработка ошибки, например, вывод пользователю
        }
    };

    return (
        <div className="documents__create">
            <h2 className="documents__title">Создать документ</h2>
            <label className="documents__label">
                Заголовок:
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <label className="documents__label">
                Содержание:
                <textarea value={content} onChange={(e) => setContent(e.target.value)} />
            </label>
            <button className="btn-primary" onClick={handleCreateDocument}>Создать документ</button>
        </div>
    );
};

export default DocumentForm;
