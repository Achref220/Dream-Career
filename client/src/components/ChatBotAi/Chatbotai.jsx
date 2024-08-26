import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import {SERVER_URL} from "../../service/config";
import {useSelector} from "react-redux";
import WidgetWrapper from "../CustomStyledComponents/WidgetWrapper";
import LockIcon from '@mui/icons-material/Lock';

const Chatbotai = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state) => state.token);

  const isLocked = true; // This state controls whether the chat is locked or not.

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
  
    const userMessage = { role: "user", content: inputMessage };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputMessage("");
    setIsLoading(true);
  
    try {
      const response = await fetch(SERVER_URL + `p/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add Authorization if needed
        },
        body: JSON.stringify({ messages: updatedMessages }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch AI response");
      }
  
      const data = await response.json();
      const aiMessage = data.choices[0].message;
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <WidgetWrapper sx={{ margin: '2rem auto', padding: '2rem', position: 'relative' }}>
      {/* Blurred Entire Widget */}
      <Box
        sx={{
          filter: isLocked ? 'blur(0.5px)' : 'none',
          pointerEvents: isLocked ? 'none' : 'auto',
          opacity: isLocked ? 0.9 : 1, // Optional: reduce opacity for better effect
        }}
      >
        <Typography variant="h4" gutterBottom>
          Dreaca-AI Chat (Beta)
        </Typography>

        <Box sx={{ marginBottom: '1rem' }}>
          {messages.map((message, index) => (
            <Box key={index} sx={{ marginBottom: '0.5rem' }}>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: message.role === 'user' ? 'bold' : 'normal',
                  color: message.role === 'user' ? '#1976d2' : '#000',
                }}
              >
                {message.role === 'user' ? 'You: ' : 'AI: '}
                {message.content}
              </Typography>
            </Box>
          ))}
        </Box>

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message here..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          disabled={isLoading}
          sx={{ marginBottom: '1rem' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </Button>
      </Box>

      {/* Locked Overlay */}
      {isLocked && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.7)', // Slight white background
            zIndex: 10,
          }}
        >
          <LockIcon sx={{ fontSize: 60, color: '#1976d2' }} />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default Chatbotai;
