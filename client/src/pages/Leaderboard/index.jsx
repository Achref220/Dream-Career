import { Box, Container, Divider } from '@mui/material';
import React from 'react';
import ClubBar from './clubBar';
import ClubBox from './clubBox';
import style from './style.module.scss'
import Navbar from '../../components/navbar';

const Leaderbord = () => {
    return (
      <>
      <Navbar />
        <Container maxWidth="lg" style={{ paddingBottom: '2rem', position: 'relative' }}>
            <h1 className={style.title}>Leaderboard</h1>
            <div className={style.bgMobile}>
                {/* <img src={bgM} /> */}
            </div>
            <Box
                border="1px solid #D6D6D9"
                p={2}
                bgcolor="#EAFDFF"
                borderRadius='16px'
                boxShadow="0px 0px 32px -8px #0000001F"
                className={style.mainBox}
            >
                <Box
                    className={style.leftBox}
                >
                    <Box className={style.inner} display="flex" flexDirection="row" alignItems="flex-end" justifyContent="center">
                        <ClubBar rank={2} clubName="Club 2" finalPoints={38} image="/assets/images/club1.png" bgColor="#B4B2B3" />
                        <ClubBar rank={1} clubName="Club 1" finalPoints={39} isWinner image="/assets/images/club2.png" />
                        <ClubBar rank={3} clubName="Club 3" finalPoints={37} image="/assets/images/club3.png" bgColor="#A0621C" />
                    </Box>
                    <img src="/assets/images/bg-clubBar-d.png" className={style.bgImage} alt='bgimg'/>
                </Box>

                <Box
                    className={style.rightBox}
                >
                    <div className={style.inner}>


                        {/* Right Box Content */}
                        {[...Array(6)].map((_, index) => (
                            <React.Fragment key={index}>
                                <ClubBox
                                    rank={index + 4} // Using direct index + 4 for rank
                                    clubName={`Club ${index + 4}`}
                                    points={`${(index + 4) * 10}`}
                                />
                                {index < 5 && (
                                    <Divider
                                        sx={{ borderColor: '#D6D6D9', width: '100%', mx: 'auto', my: 1 }} // Centered with reduced width
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </Box>
            </Box>
        </Container>
      </>
        
    );
};

export default Leaderbord;