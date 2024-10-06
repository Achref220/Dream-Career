import StarIcon from '@mui/icons-material/Star';
import { Box } from '@mui/material';
import React, { useState } from 'react';

const RatingStar = () => {
  // State to store the currently selected rating
  const [selectedRating, setSelectedRating] = useState(0);

  // Function to handle click event and set the rating
  const handleRatingClick = (index) => {
    setSelectedRating(index + 1); // index + 1 because index starts from 0
  };

  return (
    <Box
      sx={{
        width: 320,
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {[...Array(5)].map((_, index) => (
        <StarIcon
          key={index}
          sx={{
            color: index < selectedRating ? '#FFD700' : '#E0E0E0', // Gold for selected stars, grey for unselected
            fontSize: 40, // Adjust size as needed
            cursor: 'pointer',
          }}
          onClick={() => handleRatingClick(index)} // Set rating on click
        />
      ))}
    </Box>
  );
};

export default RatingStar;
