// import React from 'react'
// import { useState } from 'react';
// const InputField = ({ label, type, name, value, onChange, required, minLength, maxLength,placeholder ,width}) => {
//     const [error, setError] = useState("");
 
//     const validate = (val) => {
//         if (required && !val) {
//             setError(`${placeholder} is required`);
//             return;
//         }
 
//         switch (type) {
//             case "email":
//                 const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//                 if (!emailPattern.test(val)) {
//                     setError("Invalid email address");
//                     return;
//                 }
//                 break;
 
//             case "password":
//                 if (val.length < 6) {
//                     setError("Password must be at least 6 characters long");
//                     return;
//                 }
//                 break;
 
//             case "text":
//                 if (minLength && val.length < minLength) {
//                     setError(`${placeholder} Must be at least ${minLength} characters`);
//                     return;
//                 }
//                 if (maxLength && val.length > maxLength) {
//                     setError(`${placeholder} Must be at most ${maxLength} characters`);
//                     return;
//                 }
//                 break;
 
//             case "number":
//                 if (isNaN(val)) {
//                     setError("Must be a valid number");
//                     return;
//                 }
//                 break;
 
//             default:
//                 break;
//         }
 
//         setError("");
//     };
 
//     return (
//         <div style={{ marginBottom: "10px" }}>
//             {/* <label>{label}:</label> */}
//             <input
//                 type={type}
//                 name={name}
//                 value={value}
//                 placeholder={placeholder}
//                 onChange={(e) => {
//                     onChange(e);
//                     validate(e.target.value);
//                 }}
//                 required={required}
//                 style={{
//                     display: "block",
//                     padding: "8px",
//                     width:width|| "100%",
//                     border: error ? "3px solid red" : "",
//                     borderRadius: "8px",
//                     marginBottom: "5px",
//                     textAlign:"center"
//                 }}
//             />
//             {error && <span style={{ color: "red", fontSize: "12px" }}>{error}</span>}
//         </div>
//     );
// };
 
// export default InputField;

import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  required,
  minLength,
  maxLength,
  placeholder,
  width,
}) => {
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validate = (val) => {
    if (required && !val) {
      setError(`${placeholder} is required`);
      return;
    }

    switch (type) {
      case 'email':
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(val)) {
          setError('Invalid email address');
          return;
        }
        break;
      case 'password':
        if (val.length < 6) {
          setError('Password must be at least 6 characters long');
          return;
        }
        break;
      case 'text':
        if (minLength && val.length < minLength) {
          setError(`${placeholder} must be at least ${minLength} characters`);
          return;
        }
        if (maxLength && val.length > maxLength) {
          setError(`${placeholder} must be at most ${maxLength} characters`);
          return;
        }
        break;
      case 'number':
        if (isNaN(val)) {
          setError('Must be a valid number');
          return;
        }
        break;
      default:
        break;
    }

    setError('');
  };

  const isPasswordField = type === 'password';

  return (
    <div style={{ marginBottom: '12px', width: width || '100%' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          border: error ? '3px solid red' : '1px solid black',
          borderRadius: '8px',
          padding: '0 12px',
          height: '44px',
          background: 'transparent',
        }}
      >
        <input
          type={isPasswordField && showPassword ? 'text' : type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            onChange(e);
            validate(e.target.value);
          }}
          required={required}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            fontSize: '16px',
            textAlign: 'center',
            background: 'transparent',
          }}
        />
        {isPasswordField && value && (
  <span
    onClick={() => setShowPassword(!showPassword)}
    style={{ cursor: 'pointer', fontSize: '18px', color: '#555' }}
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </span>
)}
      </div>
      {error && <span style={{ color: 'red', fontSize: '12px' }}>{error}</span>}
    </div>
  );
};

export default InputField;
