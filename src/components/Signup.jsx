import React, { useState } from 'react';

function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
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
    } else {
      setPasswordError('');
    }

    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Email:', email);
    console.log('Phone Number:', phoneNumber);
    console.log('Gender:', gender);
    console.log('Password:', password);
    alert(`Account created successfully! Welcome ${firstName} ${lastName}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[rgb(214, 228, 239)]">
      <div className='bg-white rounded-2xl shadow-xl p-16 m-8 max-w-2xl mx-auto'>
        <h2 className='text-3xl text-black'>Join AuXiVault!</h2>
        <p className='text-black'>Create your account to get started</p>
        <form onSubmit={handleSubmit}>

          <div className='flex gap-4'>
            <div className='flex-1'>
              <input 
                placeholder='First Name'
                type="text" 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
                required 
                className='text-black bg-white border-2 border-gray-300 rounded-lg p-2 mt-3 w-full' 
                maxLength={30}
              />
            </div>
            <div className='flex-1'>
              <input 
                placeholder='Last Name'
                type="text" 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)} 
                required 
                className='text-black bg-white border-2 border-gray-300 rounded-lg p-2 mt-3 w-full' 
                maxLength={30}
              />
            </div>
          </div>

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
              placeholder='Phone Number'
              type="tel" 
              value={phoneNumber} 
              onChange={(e) => setPhoneNumber(e.target.value)} 
              required 
              className='text-black bg-white border-2 border-gray-300 rounded-lg p-2 mt-3 w-full' 
              maxLength={15}
            />
          </div>

          <div>
            <select 
              value={gender} 
              onChange={(e) => setGender(e.target.value)} 
              required 
              className='text-black bg-white border-2 border-gray-300 rounded-lg p-2 mt-3 w-full'
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <input 
              placeholder='Password'
              type="password" 
              value={password} 
              onChange={(e) => { 
                setPassword(e.target.value); 
                
                const hasUpperCase = /[A-Z]/.test(password);
                const hasLowerCase = /[a-z]/.test(password);
                const hasNumber = /\d/.test(password);
                const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

                if (!(hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar)) {
                setPasswordError(<>Password must contain at least one uppercase,<br></br> lowercase, number, and special character.</>);
                return;
                } else {
                setPasswordError('');
                }
              }} 
              required 
              className={`text-black bg-white border-2 rounded-lg p-2 mt-3 w-full 
                            ${passwordError ? 'border-red-300':'border-gray-300'}`} 
              minLength={8}
              maxLength={20}
            />
            {passwordError ? <p className={`text-sm text-red-500`}>{passwordError}</p> : null}         
          </div>

          <button 
             className='rounded-lg bg-blue-50 btn text-white p-2 mt-4 w-full'
             type="submit">
                Sign Up
          </button>
          
        </form>
      </div>
    </div>
  );
}

export default Signup;