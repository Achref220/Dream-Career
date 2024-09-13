import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, CircularProgress, Typography, Box } from '@mui/material';
import { toast } from 'react-toastify';
import { SERVER_URL } from '../../service/config';

const VerifyEmail = () => {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']); // Array of 6 boxes
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]); // Reference for the input elements
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    if (value.length === 1) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      // Move focus to the next input only if a digit was entered
      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleBackspace = (index, e) => {
    if (e.key === 'Backspace') {
      const newCode = [...verificationCode];
      newCode[index] = ''; // Clear the current input
      setVerificationCode(newCode);

      // Move focus to the previous input if it's not the first box
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    const code = verificationCode.join(''); // Combine the array of inputs into a single string

    try {
        console.log(code);
        console.log(localStorage.getItem('email'));
      const res = await fetch(SERVER_URL + "verify-email", {
        method: 'POST',
        body: JSON.stringify({ verificationCode: code, email: localStorage.getItem('email') }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Email verified successfully!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        navigate('/login'); // Navigate to login after successful verification
      } else {
        toast.error(data.message || 'Invalid or expired code!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } catch (error) {
      console.error('Verification error:', error);
      toast.error('Something went wrong!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#00CDE1',
      }}
    >
      <Box
        sx={{
          backgroundColor: '#fff',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          maxWidth: '400px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          sx={{
            color: '#333',
            marginBottom: '1rem',
          }}
        >
          Verify Your Email
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: '#666',
            marginBottom: '1.5rem',
          }}
        >
          Enter the 6-digit verification code we sent to your email.
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          {verificationCode.map((_, index) => (
            <TextField
              key={index}
              inputRef={(el) => (inputRefs.current[index] = el)} // Reference each input
              value={verificationCode[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleBackspace(index, e)}
              inputProps={{ maxLength: 1, style: { textAlign: 'center', fontSize: '24px' } }} // Center the text
              sx={{
                width: '50px',
                height: '50px',
                marginRight: index !== 5 ? '10px' : '0',
              }}
              variant="outlined"
            />
          ))}
        </Box>

        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          disabled={loading || verificationCode.includes('')}
          sx={{
            backgroundColor: '#00CDE1',
            color: '#fff',
            padding: '0.75rem',
            fontSize: '16px',
            '&:hover': {
              backgroundColor: '#00B0C5',
            },
          }}
        >
          {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Verify Email'}
        </Button>
      </Box>
    </Box>
  );
};

export default VerifyEmail;
