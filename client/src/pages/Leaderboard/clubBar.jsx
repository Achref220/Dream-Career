import { Avatar, Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import style from './style.module.scss'
import useWindowSize from '../../components/windowSize';
const ClubBar = ({ rank, clubName, finalPoints, isWinner, image, bgColor }) => {
  const [points, setPoints] = useState(0);
  const { winwidth } = useWindowSize();

  const height = winwidth > 600 ? 375 - (rank - 1) * 50 : 280 - (rank - 1) * 50;
  const avatarSize = winwidth > 600 ? 130 : 92;

  useEffect(() => {
    let start = 0;
    const incrementPoints = setInterval(() => {
      start += 1;
      if (start <= finalPoints) {
        setPoints(start);
      } else {
        clearInterval(incrementPoints);
      }
    }, 50);
    return () => clearInterval(incrementPoints);
  }, [finalPoints]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-end"
      bgcolor={bgColor || (isWinner ? '#FFA500' : '#f0f0f0')}
      height={height}
      borderRadius="16px"
      boxShadow={isWinner ? '0 4px 20px rgba(0, 0, 0, 0.2)' : 'none'}
      position="relative"
      mb={2}
      className={style.clubbar}
    >
      <Avatar
        alt={clubName}
        src={image}
        className={style.avatorSize}
        sx={{
          width: avatarSize,
          height: avatarSize,
          position: 'absolute',
          top: -avatarSize / 2,
          left: '50%',
          transform: 'translateX(-50%)',
          border: `4px solid ${bgColor || (isWinner ? '#FFA500' : '#f0f0f0')}`,
        }}
      />

      {isWinner && (
        <Box
          position="absolute"
          top={-avatarSize / 2 - 24}
          left="40%"
          transform="translateX(-50%)"
        >
          <Typography variant="h6">👑</Typography>
        </Box>
      )}

      <Typography
        variant="h6"
        className={style.h6}
        sx={{
          textAlign: 'center',
          fontWeight: '500', // SemiBold  
          color: '#2E2E2E' // Hex color  
        }}
      >
        {clubName}
      </Typography>
      <Box mb={3} />
      <Typography
        variant="body1"
        sx={{
          textAlign: 'center',
          fontWeight: '500', // SemiBold  
          fontSize: '24px',
          color: '#2E2E2E' // Hex color  
        }}
      >
        {points} pts
      </Typography>

      <Box mb={3} />

      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width={winwidth > 600 ? 54 : 32}
        height={winwidth > 600 ? 54 : 32}
        borderRadius="50%"
        bgcolor="#e0f7fa"
        sx={{ border: '2px solid #000', position: 'absolute', bottom: winwidth > 600 ? -27 : -17, left: '50%', transform: 'translateX(-50%)' }}
      >
        <Typography variant="body2">{rank}°</Typography>
      </Box>
    </Box>
  );
};

export default ClubBar;