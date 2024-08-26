import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import {IconButton} from '@mui/material';
import {useNavigate} from 'react-router-dom';



export default function AccountMenu({ username, profilePhotoUrl}) {
  const navigate = useNavigate();

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', width: "3rem" }}>
        <Tooltip title={username}>
          <IconButton
            onClick={() => navigate('/profilePage')}
            size="small"
            aria-haspopup="true"
          >
            <Avatar alt={username} src={profilePhotoUrl} sx={{ width: 40, height: 40 }}></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
    </>
  );
}
