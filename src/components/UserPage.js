import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import UserForm from './UserForm';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

export default class UserFormPage extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: true
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    this.subtitle.style.color = 'FFFFFF';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <div>
        <section id="main" className="cadastro-wrapper">
          <div className="inner">
            <header className="align-center">
              <h2>Cadastro</h2>
            </header>
              <div className="w3l-main">
                <div className="w3l-from">
                  <UserForm />
                </div>
              </div>
            </div>
        </section>
      </div>
    );
  }
}



