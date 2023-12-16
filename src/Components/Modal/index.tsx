import React from 'react';
import './index.css';

interface Props {
    children?: React.ReactNode;
    title?: string,
    close: Function,
    visible: boolean,
    width?: string
}

const Modal: React.FC<Props> = (props) => {

    return (
        <div className={"dialog-modal"}>
            {
                props.visible &&
                <div className={"all"} onClick={() => { !props.title && props.close(false) }}>
                    <div className={"content"} style={{ width: props.width || '600px' }}>
                        {
                            props.title &&
                            <div className={"header"}>
                                <div className="title">{props.title}</div>
                                <button className={"buttonClose"} onClick={() => props.close(false)}>X</button>
                            </div>
                        }
                        <div className={"body"}>
                            {props.children}
                        </div>

                    </div>
                </div>
            }
        </div>
    );
};

export default Modal;