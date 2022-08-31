import s from './Modal.module.scss';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const modal = document.querySelector('#modal-root');

function Modal({ onClick, children }) {

  useEffect(() => {
    document.addEventListener('keydown', listenerKeyDown);
    return () => {
      document.removeEventListener('keydown', listenerKeyDown);
    };
  })

  const listenerKeyDown = e => {
    if (e.code === 'Escape') {
      onClick();
    }
  };

  const onClikCloseBackDrop = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      onClick();
    }
  };

  return createPortal(
    <div className={ s.bg } onClick={ onClikCloseBackDrop }>
      <div className={ s.modal }>{ children }</div>
    </div>,
    modal
  );
}
export default Modal;

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired
}
