import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!(hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar)) {
      setPasswordError(<>Password must contain at least one uppercase,<br></br> lowercase, number, and special character.</>);
      return;
    }else{
      setPasswordError('');
    }


    console.log('Email:', email);
    console.log('Password:', password);
    alert(`Your email is ${email} and your password is ${password}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[rgb(214, 228, 239)">
      <div className='bg-white rounded-2xl shadow-xl p-16 m-8 max-w-2xl mx-auto'>
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
              onChange={(e) => {
                const value = e.target.value;
                setPassword(value);

                const hasUpperCase = /[A-Z]/.test(value);
                const hasLowerCase = /[a-z]/.test(value);
                const hasNumber = /\d/.test(value);
                const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

                if (!(hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar)) {
                  setPasswordError(<>Password must contain at least one uppercase,<br></br> lowercase, number, and special character.</>);
                  return;
                } else {
                  setPasswordError('');
                }
              }} 
              required 
              className={`text-black bg-white border-2 rounded-lg p-2 mt-2 w-full 
                          ${passwordError ? 'border-red-300' : 'border-gray-300'}`} 
              minLength={8}
              maxLength={20}
            />
              {passwordError && (
                <p className="text-sm text-red-500 mt-1">{passwordError}</p>
              )}
          </div>

          <button 
             className='rounded-lg bg-blue-50 btn text-white p-2 mt-4 w-full'
             type="submit">
                Log In
          </button>
          
        </form>
      </div>
    </div>
  );
}

export default Login;