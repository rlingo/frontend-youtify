import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles.css'
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/sections/Header';
import InputField from '../components/sections/InputField';
import Modal from '../components/sections/Modal';
import { validEmail, validPassword } from '../components/Regex';
import React, { useRef, useState, useEffect } from 'react';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../api/axios';

const REGISTER_URL = '/api/register';

const Register = () => {
    const navigate = useNavigate();
    const userInputRef = useRef();
    const errRef = useRef();
    const checkboxRef = useRef();

    const [loading, setLoading] = useState(false);

    const [emailInput, setEmailInput] = useState('');
    const [validEmailInput, setValidEmailInput] = useState(false);
    const [emailInputFocus, setEmailInputFocus] = useState(false);

    const [passwordInput, setPasswordInput] = useState('');
    const [validPasswordInput, setValidPasswordInput] = useState(false);
    const [passwordInputFocus, setPasswordInputFocus] = useState(false);

    const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
    const [confirmPasswordMatched, setConfirmPasswordMatched] = useState(false);
    const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [checkboxChecked, setCheckboxChecked] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(false);
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);

    useEffect(() => {
        if (userInputRef.current) {
            userInputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        const result = validEmail.test(emailInput);
        setValidEmailInput(result);
    }, [emailInput]);

    useEffect(() => {
        const result = validPassword.test(passwordInput);
        setValidPasswordInput(result);
        const matched = passwordInput === confirmPasswordInput;
        setConfirmPasswordMatched(matched);
    }, [passwordInput, confirmPasswordInput]);

    useEffect(() => {
        setErrMsg('');
    }, [emailInput, passwordInput, confirmPasswordInput])

    const handleLinkClick = (type) => {
        if (type === 'terms') {
            setShowTermsModal(true);
        } else if (type === 'privacy') {
            setShowPrivacyModal(true);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const v1 = validEmail.test(emailInput);
        const v2 = validPassword.test(passwordInput);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ email: emailInput, password: passwordInput }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });
            navigate('/login');
        } catch (err) {
            if (!err?.response) {
                console.log(err)
                toast.error('No Server Response');
            } else if (err.response?.status === 500) {
                toast.error('Email already taken');
            } else {
                toast.error('Registration failed.');
            }
            errRef.current.focus();
        } finally {
            setLoading(false); // Stop loading, whether request succeeds or fails
        }
    }

    return (
        <div className='vh-100 text-white c-bg'>
            <Header />
            <div className='login template d-flex vh-100 justify-content-center align-items-center'>
                <div className='form-container'>
                    <h1 className='text-center t-font mb-2'>Sign up to your music journey</h1>

                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live='assertive'>
                        {errMsg}
                    </p>

                    <form onSubmit={handleSubmit}>
                        <InputField
                            validVar={validEmailInput}
                            varInput={emailInput}
                            label='Email'
                            type='email'
                            placeholder='Enter your email'
                            autoComp='off'
                            inputId='email'
                            userRef={userInputRef}
                            onChange={(e) => setEmailInput(e.target.value)}
                            required
                            validVarInput={validEmailInput ? "false" : "true"}
                            uid="emailnote"
                            setFocusOn={() => setEmailInputFocus(true)}
                            setFocusOff={() => setEmailInputFocus(false)}
                        />

                        <p
                            id='emaildnote'
                            className={emailInputFocus && emailInput && !validEmailInput ? "instructions" : "offscreen"}
                        >
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Email Address must be valid.
                        </p>

                        <InputField
                            validVar={validPasswordInput}
                            varInput={passwordInput}
                            label='Password'
                            type='password'
                            placeholder='Enter your password'
                            inputId='password'
                            onChange={(e) => setPasswordInput(e.target.value)}
                            required
                            validVarInput={validPasswordInput ? "false" : "true"}
                            uid='pwdnote'
                            setFocusOn={() => setPasswordInputFocus(true)}
                            setFocusOff={() => setPasswordInputFocus(false)}

                        />

                        <p id='pwdnote' className={passwordInputFocus && !validPasswordInput ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters. <br />
                            Must include uppercase or lowercase letters, and a number. <br />
                        </p>



                        <InputField
                            validVar={confirmPasswordMatched}
                            varInput={confirmPasswordInput}
                            label='Confirm Password'
                            type='password'
                            placeholder='Confirm your password'
                            inputId='confirmpw'
                            onChange={(e) => setConfirmPasswordInput(e.target.value)}
                            required
                            validVarInput={confirmPasswordMatched ? "false" : "true"}
                            uid='confirmpwnote'
                            setFocusOn={() => setConfirmPasswordFocus(true)}
                            setFocusOff={() => setConfirmPasswordFocus(false)}
                        />

                        <p id='confirmpwnote' className={confirmPasswordFocus && !confirmPasswordMatched ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Both passwords must match.
                        </p>


                        <div className='d-flex flex-row w-100 justify-content-center align-items-center p-2'>
                            <div className="checkbox-container">
                                <input
                                    type="checkbox"
                                    id="custom-checkbox"
                                    ref={checkboxRef}
                                    checked={checkboxChecked}
                                    onChange={() => setCheckboxChecked(!checkboxChecked)}
                                    required
                                />
                                <label htmlFor="custom-checkbox"></label>
                            </div>
                            <label className='ms-2'>
                                I agree to the <span className='link-color' onClick={() => handleLinkClick('terms')}>Youtify Terms and Condition of use </span>
                                and
                                <span className='link-color' onClick={() => handleLinkClick('privacy')}> Privacy Policy</span>
                            </label>
                        </div>

                        <div className='d-flex w-100 justify-content-center w-100%'>
                            <button
                                // disabled={!validEmailInput || !validPasswordInput || !confirmPasswordMatched || !checkboxChecked ? true : false}
                                disabled={!validEmailInput || !validPasswordInput || !confirmPasswordMatched || !checkboxChecked || loading}
                                className='btn btn-color rounded-pill mb-2 mt-4 w-50'
                            >
                                {loading ? 'Signing Up...' : 'Sign Up'}
                            </button>
                        </div>

                        <div className='d-flex flex-column justify-content-center align-items-center'>
                            <p className='text-center mt-2'>
                                Already have an account?
                            </p>
                            <Link to="/login" className='ms-2 link-color'>Sign in now</Link>
                        </div>
                    </form>
                    <Modal show={showTermsModal} onClose={() => setShowTermsModal(false)}>
                        <h2>Terms and Conditions</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae tempus quam pellentesque nec nam aliquam sem. Fermentum odio eu feugiat pretium nibh. Libero enim sed faucibus turpis. Iaculis nunc sed augue lacus viverra. Sed nisi lacus sed viverra tellus in. Lorem donec massa sapien faucibus et molestie ac. Augue neque gravida in fermentum et sollicitudin ac. Vel turpis nunc eget lorem dolor. Viverra mauris in aliquam sem fringilla ut morbi tincidunt. Pharetra massa massa ultricies mi quis. Pulvinar proin gravida hendrerit lectus a. Pulvinar mattis nunc sed blandit libero. Malesuada fames ac turpis egestas integer eget aliquet. Risus nullam eget felis eget nunc lobortis mattis. Blandit massa enim nec dui nunc mattis enim ut tellus. Imperdiet dui accumsan sit amet nulla facilisi morbi. Vitae congue mauris rhoncus aenean vel elit. Congue quisque egestas diam in arcu. In metus vulputate eu scelerisque felis imperdiet proin fermentum.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae tempus quam pellentesque nec nam aliquam sem. Fermentum odio eu feugiat pretium nibh. Libero enim sed faucibus turpis. Iaculis nunc sed augue lacus viverra. Sed nisi lacus sed viverra tellus in. Lorem donec massa sapien faucibus et molestie ac. Augue neque gravida in fermentum et sollicitudin ac. Vel turpis nunc eget lorem dolor. Viverra mauris in aliquam sem fringilla ut morbi tincidunt. Pharetra massa massa ultricies mi quis. Pulvinar proin gravida hendrerit lectus a. Pulvinar mattis nunc sed blandit libero. Malesuada fames ac turpis egestas integer eget aliquet. Risus nullam eget felis eget nunc lobortis mattis. Blandit massa enim nec dui nunc mattis enim ut tellus. Imperdiet dui accumsan sit amet nulla facilisi morbi. Vitae congue mauris rhoncus aenean vel elit. Congue quisque egestas diam in arcu. In metus vulputate eu scelerisque felis imperdiet proin fermentum.</p>
                    </Modal>

                    <Modal show={showPrivacyModal} onClose={() => setShowPrivacyModal(false)}>
                        <h2>Privacy Policy</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae tempus quam pellentesque nec nam aliquam sem. Fermentum odio eu feugiat pretium nibh. Libero enim sed faucibus turpis. Iaculis nunc sed augue lacus viverra. Sed nisi lacus sed viverra tellus in. Lorem donec massa sapien faucibus et molestie ac. Augue neque gravida in fermentum et sollicitudin ac. Vel turpis nunc eget lorem dolor. Viverra mauris in aliquam sem fringilla ut morbi tincidunt. Pharetra massa massa ultricies mi quis. Pulvinar proin gravida hendrerit lectus a. Pulvinar mattis nunc sed blandit libero. Malesuada fames ac turpis egestas integer eget aliquet. Risus nullam eget felis eget nunc lobortis mattis. Blandit massa enim nec dui nunc mattis enim ut tellus. Imperdiet dui accumsan sit amet nulla facilisi morbi. Vitae congue mauris rhoncus aenean vel elit. Congue quisque egestas diam in arcu. In metus vulputate eu scelerisque felis imperdiet proin fermentum.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae tempus quam pellentesque nec nam aliquam sem. Fermentum odio eu feugiat pretium nibh. Libero enim sed faucibus turpis. Iaculis nunc sed augue lacus viverra. Sed nisi lacus sed viverra tellus in. Lorem donec massa sapien faucibus et molestie ac. Augue neque gravida in fermentum et sollicitudin ac. Vel turpis nunc eget lorem dolor. Viverra mauris in aliquam sem fringilla ut morbi tincidunt. Pharetra massa massa ultricies mi quis. Pulvinar proin gravida hendrerit lectus a. Pulvinar mattis nunc sed blandit libero. Malesuada fames ac turpis egestas integer eget aliquet. Risus nullam eget felis eget nunc lobortis mattis. Blandit massa enim nec dui nunc mattis enim ut tellus. Imperdiet dui accumsan sit amet nulla facilisi morbi. Vitae congue mauris rhoncus aenean vel elit. Congue quisque egestas diam in arcu. In metus vulputate eu scelerisque felis imperdiet proin fermentum.</p>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default Register