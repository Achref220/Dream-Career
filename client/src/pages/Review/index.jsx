import { Box,  Button,  CircularProgress, Container,  Rating } from '@mui/material';
import React, { useState, useEffect } from 'react';
import style from './style.module.scss'
import riseUpLogo from '../../assets/images/rise-up-logo.png'
import Masonry from '@mui/lab/Masonry';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import itemImage from '../../assets/images/item.png'
import WidgetWrapper from '../../components/CustomStyledComponents/WidgetWrapper';
import Navbar from '../../components/navbar';
import FeedBack from '../feedback';

function Review() {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const isLg = useMediaQuery(theme.breakpoints.up('lg'));
    const [loading, setLoading] = useState(true);
    const [stepper, setStepper] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const getColumns = () => {
        if (isXs) return 1; // 1 column on extra small devices
        if (isSm) return 2; // 2 columns on small devices
        if (isMd) return 3; // 3 columns on medium devices
        if (isLg) return 4; // 4 columns on large devices
        return 4; // Default for large devices
    };
    const handleReview = () => {
        setStepper(true)
    }
    const itemData = [
        {
            img: itemImage,
            title: 'Fern',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur ipsam nisi cupiditate corporis iusto vero! Quidem unde nobis, error dignissimos molesti.'
        },
        {
            img: itemImage,
            title: 'Snacks',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur ipsam nisi cupiditate corporis iusto vero! Quidem unde nobis, error dignissimos molesti.'
        },
        {
            img: itemImage,
            title: 'Mushrooms',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur ipsam nisi cupiditate corporis iusto vero! Quidem unde nobis, error dignissimos molesti.'

        },
        {
            img: itemImage,
            title: 'Tower',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur ipsam nisi cupiditate corporis iusto vero! Quidem unde nobis, error dignissimos molesti.'

        },
        {
            img: itemImage,
            title: 'Sea star',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur ipsam nisi cupiditate corporis iusto vero! Quidem unde nobis, error dignissimos molesti.'

        },
        {
            img: itemImage,
            title: 'Honey',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur ipsam nisi cupiditate corporis iusto vero! Quidem unde nobis, error dignissimos molesti.'

        },
        {
            img: itemImage,
            title: 'Basketball',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur ipsam nisi cupiditate corporis iusto vero! Quidem unde nobis, error dignissimos molesti.'

        },
        {
            img: itemImage,
            title: 'Breakfast',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur ipsam nisi cupiditate corporis iusto vero! Quidem unde nobis, error dignissimos molesti.'

        },
        {
            img: itemImage,
            title: 'Tree',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur ipsam nisi cupiditate corporis iusto vero! Quidem unde nobis, error dignissimos molesti.'

        },
        {
            img: itemImage,
            title: 'Burger',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur ipsam nisi cupiditate corporis iusto vero! Quidem unde nobis, error dignissimos molesti.'

        },
        {
            img: itemImage,
            title: 'Camera',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur ipsam nisi cupiditate corporis iusto vero! Quidem unde nobis, error dignissimos molesti.'

        },
        {
            img: itemImage,
            title: 'Coffee',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur ipsam nisi cupiditate corporis iusto vero! Quidem unde nobis, error dignissimos molesti.'

        },
        {
            img: itemImage,
            title: 'Camping Car',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur ipsam nisi cupiditate corporis iusto vero! Quidem unde nobis, error dignissimos molesti.'

        },
        {
            img: itemImage,
            title: 'Hats',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur ipsam nisi cupiditate corporis iusto vero! Quidem unde nobis, error dignissimos molesti.'

        },
        {
            img: itemImage,
            title: 'Tomato basil',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur ipsam nisi cupiditate corporis iusto vero! Quidem unde nobis, error dignissimos molesti.'

        },
        {
            img: itemImage,
            title: 'Mountain',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur ipsam nisi cupiditate corporis iusto vero! Quidem unde nobis, error dignissimos molesti.'

        },
        {
            img: itemImage,
            title: 'Bike',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur ipsam nisi cupiditate corporis iusto vero! Quidem unde nobis, error dignissimos molesti.'

        },
    ];
    return (
        <>
        <Navbar />
        {!stepper ? (
            <Container maxWidth="xl" style={{ paddingBottom: '2rem', paddingTop: '2rem', position: 'relative' }} className={style.feedbackOverview}>
            <WidgetWrapper  className={style.topHeader} style={{display: "flex", justifyContent: "space-between"}}>
                <div style={{display: "flex", flexDirection: "row", gap: "30px"}}>
                <Box className={style.left}>
                    <img
                        src={riseUpLogo}
                        alt="Logo"
                        style={{
                            width: '120px',
                            marginBottom: '16px'
                        }}
                    />

                    {/* Typography for the title */}
                </Box>
                <Box className={style.inner} style={{display: "flex", flexDirection: "column", marginTop: "6px"}}>
                    <p className={style.titletext} style={{fontSize:"29px"}}><b>RISEUP - youth association</b></p>
                    <Box className={style.inner} style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                        <Rating
                            name="simple-controlled"
                            value={5}
                            size='large'
                            readOnly
                        />
                        <p><b>4.9</b> (65 Reviews)</p>
                    </Box>
                </Box></div>

                <Box className={style.inner}>
                    <p className={style.titletext} style={{fontSize:"20px"}}><b>Upcoming Event</b> Event on 17 Nov</p><br />
                    <Button variant="contained" size="large" sx={{ backgroundColor: '#00BCD4', borderRadius: '5px', color: "#ffff" }} onClick={handleReview}>
                            Add Review
                    </Button>
                </Box>
            </WidgetWrapper>
            <div className={style.masonaryBox}>
                {
                    loading ?
                        <CircularProgress />
                        : (
                            <Masonry columns={getColumns()} spacing={2}>
                                {itemData.map((item, index) => (
                                    <div key={index}
                                        style={{
                                            height: index % 2 === 0 ? 430 : 350
                                        }}
                                        className={style.masonaryItem}
                                    >
                                        <div className={style.img}>
                                            <img
                                                src={item.img}
                                                alt={item.title}
                                                loading="lazy" />
                                        </div>
                                        <p>{item.title}</p>
                                        <Rating
                                            name="simple-controlled"
                                            value={5}
                                        />
                                        <p className={`${index % 2 === 0 ? style.nodesc : style.desc}`}>{item.description}</p>
                                    </div>
                                ))}
                            </Masonry>
                        )
                }
            </div>
        </Container>
        ): <FeedBack />}
        </>
        
    );
}

export default Review