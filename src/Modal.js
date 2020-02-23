import React from 'react';

function Modal({show, Message}) {

    return (
            show && <div className="modalBox">
                {Message}
            </div>
    )
}

export default Modal;