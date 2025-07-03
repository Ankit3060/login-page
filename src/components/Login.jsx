import React, { useState } from 'react';
import '../App.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordValid,setPasswordValid] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!(hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar)) {
      setPasswordError(<>Password must contain at least one uppercase,<br></br> lowercase, number, and special character.</>);
      setPasswordValid(false);
      return;
    }else{
      setPasswordError(<>You all set to login</>);
      setPasswordValid(true);
    }


    console.log('Email:', email);
    console.log('Password:', password);
    alert(`Your email is ${email} and your password is ${password}`);
  };

  return (
    <div className='bg-white rounded-2xl shadow-lg p-16 m-8 max-w-2xl mx-auto'>
      <h2 className='text-3xl text-black'>Welcome to AuXiVault!</h2>
      <p className='text-black'>Please Log-in to your account</p>
      <form onSubmit={handleSubmit}>

        <div>
          <input 
            placeholder='Email'
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className='text-black bg-white border-2 border-gray-300 rounded-lg p-2 mt-3 w-full' 
            maxLength={50}
          />
        </div>

        <div>
          <input 
            placeholder='Password'
            type="password" 
            value={password} 
            onChange={(e) =>{ setPassword(e.target.value); 
                      if(passwordError){setPasswordError(''); setPasswordValid(false)}}} 
            required 
            className={`text-black bg-white border-2  rounded-lg p-2 mt-2 w-full 
                          ${passwordError && !passwordValid ? 'border-red-300': 
                            passwordError && passwordValid ?'border-green-500':'border-gray-300'}`} 
            minLength={8}
            maxLength={20}
            
          />

            {passwordError?<p className={`text-sm ${passwordValid?'text-green-500':'text-red-500'}`}>{passwordError}</p>:null}         
        </div>

        <button 
           className='rounded-lg bg-blue-50 btn text-white p-2 mt-4 w-full'
           type="submit">
              Log In
        </button>
        
      </form>
    </div>
  );
}

export default Login;