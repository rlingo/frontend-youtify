// InputField.jsx
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

function InputField({ label, autoComp, type, placeholder, inputId, varInput , userRef, onChange, validVar, uid, setFocusOn, setFocusOff, validVarInput}) {
  return (
    <div className='d-flex flex-column mb-2'>
      <label htmlFor={label}>
        {label}
        <span className={validVar && varInput ? "valid" : "hide"}>
          <FontAwesomeIcon icon={faCheck}/>
        </span>
        <span className={validVar || !varInput ? "hide" : "invalid"}>
          <FontAwesomeIcon icon={faTimes}/>
        </span>
      </label>
      <input 
        type={type} 
        id = {inputId}
        ref={userRef}
        autoComplete={autoComp}
        placeholder={placeholder}
        onChange={onChange}
        aria-invalid={validVarInput}
        aria-describedby={uid}
        className='form-control p-2 rounded-pill i-bg'
        onFocus={setFocusOn}
        onBlur={setFocusOff}
      />
    </div>
  );
}

InputField.propTypes = {
  autoComp: PropTypes.string,
  varInput: PropTypes.string,
  validVar: PropTypes.bool,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  inputId: PropTypes.string,
  userRef: PropTypes.any,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  validVarInput: PropTypes.string,
  uid: PropTypes.string,
  setFocusOn: PropTypes.func,
  setFocusOff: PropTypes.func,
};

export default InputField;
