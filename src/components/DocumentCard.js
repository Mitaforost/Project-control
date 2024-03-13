import React from 'react';
import { signDocument, getDocumentById } from '../services/documentService';

const DocumentCard = ({ document, onChangeStatus, onSignDocument, setUpdatedDocuments }) => {
    const handleStatusChange = async (newStatus) => {
        try {
            await onChangeStatus(document.DocumentID, newStatus);
        } catch (error) {
            console.error('Error changing document status:', error.message);
        }
    };

    const handleSignClick = async () => {
        try {
            const documentID = document.DocumentID;
            const document = await getDocumentById(documentID);

            if (!document || !document.Status) {
                console.error('Document status not available:', document);
                return;
            }

            console.log('Document status before signing:', document.Status);

            const signedDocument = await signDocument(documentID, 'Администратор');

            // Update the document status in the parent component
            onChangeStatus(documentID, 'Signed');

            setUpdatedDocuments((prevDocuments) =>
                prevDocuments.map((document) =>
                    document.DocumentID === signedDocument.DocumentID ? signedDocument : document
                )
            );
        } catch (error) {
            console.error('Error signing document:', error.message);
        }
    };

    return (
        <div className="documents__card">
            <h3 className="documents__title">{document.Title}</h3>
            <p className="documents__status">Status: {document.Status}</p>
            <p className="documents__text">{document.Content}</p>
            {document.Status === 'Draft' && (
                <button
                    className="btn-primary documents__btn"
                    onClick={() => handleStatusChange('Pending')}
                >
                    Отправить на рассмотрение
                </button>
            )}
            {document.Status === 'Pending' && (
                <div>
                    {!document.Action && (
                        <button
                            className="btn-primary documents__btn"
                            onClick={handleSignClick}
                        >
                            Подписать
                        </button>
                    )}
                    {document.Action && (
                        <div className="documents__action">
                            <p>{document.Action}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DocumentCard;
