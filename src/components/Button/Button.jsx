import PropTypes from "prop-types"
import s from './Button.module.scss';

function Button({ onClickAdd }) {
  return (
    <button className={ s.button } type="button" onClick={ onClickAdd }>
      Do you want more, Sweet?
    </button>
  );
}

Button.propTypes = {
  onClickAdd: PropTypes.func
}

export default Button;
