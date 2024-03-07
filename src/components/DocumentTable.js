// DocumentTable.js
import React from 'react';
import { signDocument } from '../services/documentService';

const DocumentTable = ({ documents, onSignDocument, onChangeStatus }) => {
    const handleSignDocument = async (documentID) => {
        try {
            const signedDocument = await signDocument(documentID);
            onSignDocument(signedDocument);
        } catch (error) {
            console.error('Error signing document:', error.message);
        }
    };
    const handleChangeStatus = async (documentID, newStatus) => {
        try {
            // Ваш метод для изменения статуса
            // Может потребоваться обновить API на сервере
            // Например: await changeDocumentStatus(documentID, newStatus);
            // Обновите ваш сервис и серверный маршрут соответственно
            console.log(`Change status of document ${documentID} to ${newStatus}`);
            onChangeStatus(documentID, newStatus);
        } catch (error) {
            console.error('Error changing document status:', error.message);
        }
    };

    return (
        <table>
            <thead>
            <tr>
                <th>Title</th>
                <th>Content</th>
                <th>Date Created</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {documents.map((document) => (
                <tr key={document.DocumentID}>
                    <td>{document.Title}</td>
                    <td>{document.Content}</td>
                    <td>{document.DateCreated}</td>
                    <td>{document.Status}</td>
                    <td>
                        {document.Status === 'Draft' && (
                            <div className="documents__control">
                                <button className="btn-primary documents__btn" onClick={() => handleSignDocument(document.DocumentID)}>Sign</button>
                                <button className="btn-primary documents__btn" onClick={() => handleChangeStatus(document.DocumentID, 'Pending')}>
                                    Изменить статус
                                </button>
                            </div>
                        )}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default DocumentTable;
