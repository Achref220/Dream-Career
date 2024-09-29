import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';

const ClubBox = ({ rank, clubName, points }) => (
    <Box
        display="flex"
        alignItems="center"
        gap='8px'
        // width={505}
        // height={84}
        // borderRadius="8px"
        mb={1}
        p={1}
    >
        <Box display="flex" alignItems="center" flexGrow={1} gap='16px'>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                width={36}
                height={36}
                borderRadius="50%"
                bgcolor="#BCF9FF"
            >
                <Typography variant="body1" sx={{ fontWeight: '600', fontSize: '18px', color: '#2E2E2E' }}>
                    {rank}
                </Typography>
            </Box>
            <Avatar
                alt={clubName}
                src="/path/to/image.jpg"
                sx={{ width: 60, height: 60 }}
            />
            <Typography
                variant="body1"
                style={{
                    flexGrow: 1,
                    fontWeight: 500,
                    fontSize: '24px',
                    color: '#2E2E2E',
                    lineHeight: 'auto',
                    textAlign: 'left',
                }}
            >
                {clubName}
            </Typography>
        </Box>
        <Typography variant="body1">{points} pts</Typography>
    </Box>
);

export default ClubBox;