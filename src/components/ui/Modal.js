import React from "react";

/*
props:
- type
- modalTitle
- modalMessage
- btnText
- btnAction
- btnIcon
 */
const Modal = props => {
    return (
        <div>
            <button
                type="button"
                className={`btn btn-sm btn-${props.type}`}
                data-toggle="modal"
                data-target="#exampleModalCenter"
            >
                {props.btnText}
            </button>

            <div
                className="modal fade"
                id="exampleModalCenter"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
            >
                <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="modal-title"
                                id="exampleModalCenterTitle"
                            >
                                {props.modalTitle}
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>{props.modalMessage}</p>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className={`btn btn-${props.type}`}
                                data-dismiss="modal"
                                onClick={props.btnAction}
                            >
                                {props.btnText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
