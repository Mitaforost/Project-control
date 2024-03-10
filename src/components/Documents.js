import React, { useState, useEffect } from 'react';
import { getDocuments, updateDocumentStatus, signDocument } from '../services/documentService';
import DocumentForm from './DocumentForm';
import DocumentCard from './DocumentCard';
import DocumentTable from './DocumentTable';

const Documents = () => {
    const [documents, setDocuments] = useState([]);
    const [userAccessLevel] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    console.error('Access Denied. No token provided.');
                    setLoading(false);
                    return;
                }

                const data = await getDocuments(); // Исправление: Используем функцию getDocuments вместо fetch

                setDocuments(data);
                setLoading(false); // Исправление: Устанавливаем loading в false после получения данных
            } catch (error) {
                console.error('Error fetching documents:', error);
                setLoading(false); // Исправление: Устанавливаем loading в false при ошибке
            }
        };

        fetchDocuments();
    }, []);

    const handleAddDocument = (newDocument) => {
        setDocuments([...documents, newDocument]);
    };

    const handleSignDocument = async (documentID) => {
        try {
            const signedDocument = await signDocument(documentID, userAccessLevel);
            setDocuments((prevDocuments) =>
                prevDocuments.map((doc) =>
                    doc.DocumentID === signedDocument.DocumentID ? signedDocument : doc
                )
            );
            // Дополнительные действия, если необходимо
        } catch (error) {
            console.error('Error signing document:', error.message);
        }
    };

    const handleChangeStatus = async (documentID, newStatus) => {
        try {
            const updatedDocument = await updateDocumentStatus(documentID, newStatus, userAccessLevel);
            setDocuments((prevDocuments) =>
                prevDocuments.map((doc) =>
                    doc.DocumentID === updatedDocument.DocumentID ? updatedDocument : doc
                )
            );
            // Дополнительные действия, если необходимо
        } catch (error) {
            console.error('Error changing document status:', error.message);
        }
    };

    if (loading) {
        return <p>Loading...</p>; // Исправление: Добавлено отображение загрузки
    }

    return (
        <section className="documents">
            <div className="container">
                <h1 className="documents__title">Документы</h1>
                <DocumentForm onAddDocument={handleAddDocument} />
                <h2 className="documents__title">Карты документов</h2>
                <div className="documents__cards">
                    {documents.map((document) => (
                        <DocumentCard
                            key={document.DocumentID}
                            document={document}
                            onChangeStatus={(documentID, newStatus) => handleChangeStatus(documentID, newStatus, userAccessLevel)}
                            onSignDocument={(documentID) => handleSignDocument(documentID, userAccessLevel)}
                        />
                    ))}
                </div>
                <div>
                    <h2 className="documents__title">Таблица документов</h2>
                    <DocumentTable documents={documents} onSignDocument={handleSignDocument} />
                </div>
            </div>
        </section>
    );
};

export default Documents;
