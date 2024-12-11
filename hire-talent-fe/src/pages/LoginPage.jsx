// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { Form, useNavigate } from 'react-router-dom';
// import { login } from '../features/Login/loginSlice';

// const LoginPage = () => {

//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const dispatach = useDispatch();
//     const navigate = useNavigate();

//     const validateForm = () => {
//         const newErrors = {};
//         if (!email) newErrors.email = 'Email is required';
//         else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
//         if (!password) newErrors.password = 'Password is required';
//         return newErrors;
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const formErrors = validateForm();

//         if (Object.keys(formErrors).length > 0) {
//             setErrors(formErrors);
//         } else {
//             dispatach(login({ email, password }));
//             navigate('/dashboard')
//         }

//     }

//     return (
//         <div>

//             <Form onSubmit={handleSubmit}>
//                 <div>
//                     <label >Email:</label>
//                     <input type='email' name='email' onChange={(e) => setEmail(e.target.value)}></input>
//                     {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}

//                 </div>
//                 <div>
//                     <label>Password</label>
//                     <input type='password' name='password' onChange={(e) => setPassword(e.target.value)}></input>
//                     {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}

//                 </div>
//                 <div>
//                     <button type='submit' >Login</button>
//                 </div>
//             </Form>
//         </div>
//     )
// }

// export default LoginPage;