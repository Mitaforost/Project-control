// Documents.js
import React, { useState, useEffect } from 'react';
import { getDocuments, updateDocumentStatus, signDocument, getDocumentById } from '../services/documentService';
import DocumentForm from './DocumentForm';
import DocumentCard from './DocumentCard';
import DocumentTable from './DocumentTable';

const Documents = () => {
    const [documents, setDocuments] = useState([]);
    const [userAccessLevel, setUserAccessLevel] = useState(1);
    const [loading, setLoading] = useState(true);
    const [updatedDocuments, setUpdatedDocuments] = useState([]);
    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    console.error('Access Denied. No token provided.');
                    setLoading(false);
                    return;
                }

                const data = await getDocuments();

                setDocuments(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching documents:', error);
                setLoading(false);
            }
        };

        fetchDocuments();
    }, []);

    const handleAddDocument = (newDocument) => {
        setDocuments([...documents, newDocument]);
    };

    const handleSignDocument = async (documentID) => {
        try {
            const document = await getDocumentById(documentID);

            if (!document || !document.Status) {
                console.error('Document status not available:', document);
                return;
            }

            console.log('Document status before signing:', document.Status);

            if (document.Status === 'Signed') {
                console.log('Document is already signed.');
                return;
            }

            if (document.Status === 'Pending') {
                const signedDocument = await signDocument(documentID, 'Администратор');
                // handle the signed document or perform other actions
                console.log('Document signed successfully:', signedDocument);
            } else {
                console.error('Invalid document status for signing:', document.Status);
            }
        } catch (error) {
            console.error('Error signing document:', error.message);
            alert(error.message);
        }
    };

    const onChangeStatus = async (documentID, newStatus) => {
        try {
            console.log(`Document ${documentID} status changed to ${newStatus}`);

            // If the document is signed, fetch the updated document information
            if (newStatus === 'Signed') {
                const updatedDocument = await getDocumentById(documentID);
                setUpdatedDocuments((prevDocuments) =>
                    prevDocuments.map((doc) =>
                        doc.DocumentID === updatedDocument.DocumentID ? updatedDocument : doc
                    )
                );
            }
        } catch (error) {
            console.error('Error handling document status change:', error.message);
        }
    };
    const handleChangeStatus = async (documentID, newStatus) => {
        try {
            console.log(`Change status of document ${documentID} to ${newStatus}`);
            console.log('sentByUserID:', userAccessLevel);

            // Преобразуйте userAccessLevel в числовое значение
            const numericSentByUserID = parseInt(userAccessLevel, 10);

            if (isNaN(numericSentByUserID)) {
                throw new Error('Invalid sentByUserID. Must be a valid number.');
            }

            const updatedDocument = await updateDocumentStatus(documentID, newStatus, numericSentByUserID); // Добавлен параметр numericSentByUserID
            onChangeStatus(documentID, newStatus);

            setUpdatedDocuments((prevDocuments) =>
                prevDocuments.map((doc) =>
                    doc.DocumentID === updatedDocument.DocumentID ? updatedDocument : doc
                )
            );
        } catch (error) {
            console.error('Error changing document status:', error.message);
            alert(error.message);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
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
                            onSignDocument={(documentID) => handleSignDocument(documentID)} // Передаем ID документа
                            setUpdatedDocuments={setUpdatedDocuments}
                        />
                    ))}
                </div>
                <div>
                    <h2 className="documents__title">Таблица документов</h2>
                    <DocumentTable
                        documents={documents}
                        onSignDocument={handleSignDocument}
                        sentByUserID={userAccessLevel}
                        onChangeStatus={handleChangeStatus}
                        userAccessLevel={userAccessLevel}
                    />
                </div>
            </div>
        </section>
    );
};

export default Documents;
