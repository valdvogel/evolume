import React from 'react';
import Modal from 'react-modal';

const ModalPage = (props) => {




    return (
        <Modal
            isOpen={!!props.selectedOption}
            contentLabel='Mensagem'
            onRequestClose={props.handleSelectedOption}
            closeTimeoutMS={200}
            className="modal"
        >
            <h3 className="moda__title">Mensagem</h3>
            {props.selectedOption && <p className="moda__body">{props.selectedOption}</p>}
            <button className="buttonModal" onClick={props.handleSelectedOption}>
                Fechar</button>
        </Modal>

    );
}

export default ModalPage;