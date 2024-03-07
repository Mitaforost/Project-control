// Documents.js
import React, { useState, useEffect } from 'react';
import { getDocuments, updateDocumentStatus, signDocument } from '../services/documentService';
import DocumentForm from './DocumentForm';
import DocumentCard from './DocumentCard';
import DocumentTable from './DocumentTable';

const Documents = () => {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const data = await getDocuments();
                setDocuments(data);
            } catch (error) {
                console.error('Error fetching documents:', error);
            }
        };

        fetchDocuments();
    }, []);

    const handleAddDocument = (newDocument) => {
        setDocuments([...documents, newDocument]);
    };

    const handleSignDocument = async (documentID) => {
        try {
            const signedDocument = await signDocument(documentID);
            // Обновите локальный стейт после успешного подписания
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
            // eslint-disable-next-line no-unused-vars
            const updatedDocument = await updateDocumentStatus(documentID, newStatus);
            setDocuments((prevDocuments) =>
                prevDocuments.map((doc) =>
                    doc.DocumentID === documentID ? { ...doc, Status: newStatus } : doc
                )
            );
        } catch (error) {
            console.error('Error changing document status:', error.message);
        }
    };

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
                            onChangeStatus={handleChangeStatus}
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
