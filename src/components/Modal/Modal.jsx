import { Component } from 'react';
import { createPortal } from 'react-dom'; //метод из react.dom. Будем рендерить разметку комп.Modal
import PropTypes from 'prop-types';
import { Overlay, Modal } from 'components/Modal/Modal.styled';

// корневой портал, ссылка на него. Там будет рендериться разметка компонента Modal
const modalRoot = document.querySelector('#modal-root');

class Modl extends Component {

  componentDidMount() {
  // вешаем слушателя события на window для закрытия Модального окна по наж на ESC сначала(1я стадия монтирования)
    window.addEventListener('keydown', this.handleKeydown);
    // console.log('Modal componentDidMount ');
}

  componentWillUnmount() {
  // размонтирование и очишение кода после его использования
    // слушатель события снимается с window при наж на ESC(при закрытии окна)
    window.removeEventListener('keydown', this.handleKeydown);
}

  // метод закрытия на ESC
  handleKeydown = e => {
    if (e.code === 'Escape') {
      console.log('Click on ESC, need to close modal');
      // при наж на ESC нужно вызвать метод, чтобы окно закрылось. Для закрытия окна выз.метод toggleModal
    //   ToggleModal = () => {
    //   this.setState(({ showModal }) => ({
    //       showModal: !showModal,
    //     }))
    // }; 
      
      //  кидаем в модалку, как props, чтобы закрыть при нажатии на ESC
      this.props.onClose();
    }
  }
  
  // метод закрытия модалки при наж. на backdrop
  handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  }

  // возвращаем результат вызова createPortal из react-dom. В него будем рендерить разметку комп.Modal 
  // сначала передаем разметку модал.окна, затем ссылку на корневой елемент в index.html
render() {
  return createPortal(
    <Overlay onClick={this.handleOverlayClick}>
      <Modal>
        {this.props.children}
      </Modal>
    </Overlay>,
    modalRoot,
  );
}
}

Modl.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modl;


