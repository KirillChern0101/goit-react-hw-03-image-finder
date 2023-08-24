import css from './Modal.module.css';
import propTypes from 'prop-types';

export const Modal = ({ src, alt, handleClose }) => {
  const checkBeforeClose = e => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div className={css.Overlay} onClick={checkBeforeClose}>
      <div className={css.Modal}>
        <img src={src} alt={alt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  src: propTypes.string.isRequired,
  alt: propTypes.string.isRequired,
  handleClose: propTypes.func.isRequired,
};
