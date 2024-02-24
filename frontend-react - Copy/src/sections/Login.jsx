import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/sections/Header';
import InputField from '../components/sections/InputField';
import 'react-toastify/dist/ReactToastify.css';
import { useRef, useState, useEffect } from 'react';
import axios from '../api/axios';
import { toast } from 'react-toastify';

const LOGIN_URL = '/api/login';

function Login() {
  const navigate = useNavigate();
  const userInputRef = useRef();
  const errRef = useRef();

  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (userInputRef.current) {
      userInputRef.current.focus();
    }
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [emailInput, passwordInput])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(LOGIN_URL,
        JSON.stringify({ email: emailInput, password: passwordInput }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        });
      navigate('/');
    } catch (err) {
      if (!err?.response) {
        console.log(err)
        toast.error('No Server Response');
      } else {
        toast.error('Email not registered.');
      }
      errRef.current.focus();
    }
  }

  return (
    <div className='vh-100 text-white c-bg'>
      {/* Ensure ToastContainer is rendered at the top level */}

      <Header />
      <div className='login template d-flex vh-100 justify-content-center align-items-center'>
        <div className='form-container'>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live='assertive'>
            {errMsg}
          </p>
          <form onSubmit={handleSubmit}>
            <h1 className='text-center t-font mb-3'>Log in to Youtify</h1>
            <InputField
              label='Email'
              type='email'
              inputId='email'
              ref={userInputRef}
              autoComp='off'
              required
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder='Enter Email'
            />
            <InputField
              label='Password'
              type='password'
              inputId='password'
              required
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder='Enter Password'
            />
            <div className='d-flex w-100 justify-content-center w-100%'>
              <button className='btn btn-color rounded-pill mb-2 mt-4 w-50'>Log In</button>
            </div>
            <div className='d-flex flex-column justify-content-center align-items-center'>
              <p className='text-center mt-2'>Do not have an account yet?</p>
              <Link to="/signup" className='ms-2 link-color'>Sign up now</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
