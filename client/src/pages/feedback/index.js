import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Container, IconButton, Rating, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import FeedBackOverview from './ovrview'; // Import the overview component
import style from './style.module.scss';
import riseUpLogo from '../../assets/images/rise-up-logo.png';

const FeedBack = () => {
    const [step, setStep] = useState(0); // Step state to track form progress
    const [responses, setResponses] = useState({
        question1: '',
        question2: '',
        question3: '',
        additionalComments: '',
    });
    const [questionRatings, setQuestionRatings] = useState({
        rating1: 0,
        rating2: 0,
        rating3: 0,
    });
    const [questionLabels, setQuestionLabels] = useState({
        label1: '',
        label2: '',
        label3: '',
    });

    const labels = ['Excellent', 'Good', 'Average', 'Poor', 'Very Poor'];

    // Calculate overall rating based on individual question ratings
    const overallRating = ((questionRatings.rating1 + questionRatings.rating2 + questionRatings.rating3) / 3).toFixed(1);

    const handleNext = () => {
        if (step === 3) {
            // Log the final data when the user clicks "Finish"
            console.log("Feedback Data:", {
                responses,
                ratings: questionRatings,
                labels: questionLabels,
                overallRating,
            });
        }
        setStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setStep((prevStep) => (prevStep > 0 ? prevStep - 1 : 0));
    };

    const handleResponseChange = (e) => {
        const { name, value } = e.target;
        setResponses((prevResponses) => ({ ...prevResponses, [name]: value }));
    };

    const handleRatingChange = (event, newValue, questionKey) => {
        setQuestionRatings((prevRatings) => ({ ...prevRatings, [questionKey]: newValue }));
    };

    const handleLabelChange = (label, labelKey) => {
        setQuestionLabels((prevLabels) => ({ ...prevLabels, [labelKey]: label }));
    };

    return step === 4 ? (
        <FeedBackOverview responses={{ ...responses, overallRating, ...questionLabels }} />
    ) : (
        <Container maxWidth="lg" style={{ paddingBottom: '2rem', position: 'relative' }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0',
                }}
            >
                <IconButton onClick={handleBack} disabled={step === 0}>
                    <ArrowBackIcon />
                </IconButton>
                <h1 className={style.title}>Feedback</h1>
                <IconButton>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Box className={style.mainBox}>
                {/* Left side: Information Box */}
                <Box className={style.leftBox}>
                    <img src={riseUpLogo} alt="Logo" style={{ width: '100px', marginBottom: '16px' }} />
                    <Typography variant="h5" sx={{ fontWeight: '700', fontSize: '36px', color: '#000000', mb: 1 }}>
                        RISEUP
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: '400', fontSize: '20px', color: '#737070' }}>
                        17 Nov
                    </Typography>
                    {/* Overall Rating */}
                    <Rating name="overall-rating" value={parseFloat(overallRating)} precision={0.1} readOnly sx={{ mb: 2 }} />
                    <Typography variant="h5" sx={{ fontWeight: '400', fontSize: '16px', color: '#737070' }}>
                        Average of: {overallRating}
                    </Typography>
                </Box>

                {/* Right side: Dynamic Form Content */}
                <Box className={style.rightBox}>
                    {step === 0 && (
                        <>
                            <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Roboto', fontSize: '32px', color: '#00CDE1' }}>
                                How would you rate the overall event experience?
                            </Typography>
                            <Rating
                                name="rating1"
                                value={questionRatings.rating1}
                                precision={0.5}
                                onChange={(event, newValue) => handleRatingChange(event, newValue, 'rating1')}
                                sx={{ mb: 2 }}
                            />
                            <Box display="flex" alignItems="center" gap={2} flexWrap="wrap" mb={2}>
                                {labels.map((label) => (
                                    <Button
                                        key={label}
                                        variant={questionLabels.label1 === label ? 'contained' : 'outlined'}
                                        onClick={() => handleLabelChange(label, 'label1')}
                                        sx={{
                                            borderRadius: '19px',
                                            borderColor: '#000000',
                                            color: questionLabels.label1 === label ? '#ffffff' : '#000000',
                                            backgroundColor: questionLabels.label1 === label ? '#00CDE1' : 'transparent',
                                        }}
                                    >
                                        {label}
                                    </Button>
                                ))}
                            </Box>
                            <TextField
                                name="question1"
                                label="What did you like the most about the event?"
                                value={responses.question1}
                                onChange={handleResponseChange}
                                multiline
                                rows={4}
                                fullWidth
                                sx={{ mb: 2 }}
                            />
                        </>
                    )}

                    {step === 1 && (
                        <>
                            <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Roboto', fontSize: '32px', color: '#00CDE1' }}>
                                How would you rate the content quality?
                            </Typography>
                            <Rating
                                name="rating2"
                                value={questionRatings.rating2}
                                precision={0.5}
                                onChange={(event, newValue) => handleRatingChange(event, newValue, 'rating2')}
                                sx={{ mb: 2 }}
                            />
                            <Box display="flex" alignItems="center" gap={2} flexWrap="wrap" mb={2}>
                                {labels.map((label) => (
                                    <Button
                                        key={label}
                                        variant={questionLabels.label2 === label ? 'contained' : 'outlined'}
                                        onClick={() => handleLabelChange(label, 'label2')}
                                        sx={{
                                            borderRadius: '19px',
                                            borderColor: '#000000',
                                            color: questionLabels.label2 === label ? '#ffffff' : '#000000',
                                            backgroundColor: questionLabels.label2 === label ? '#00CDE1' : 'transparent',
                                        }}
                                    >
                                        {label}
                                    </Button>
                                ))}
                            </Box>
                            <TextField
                                name="question2"
                                label="What could have been improved?"
                                value={responses.question2}
                                onChange={handleResponseChange}
                                multiline
                                rows={4}
                                fullWidth
                                sx={{ mb: 2 }}
                            />
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Roboto', fontSize: '32px', color: '#00CDE1' }}>
                                How would you rate the organization and logistics?
                            </Typography>
                            <Rating
                                name="rating3"
                                value={questionRatings.rating3}
                                precision={0.5}
                                onChange={(event, newValue) => handleRatingChange(event, newValue, 'rating3')}
                                sx={{ mb: 2 }}
                            />
                            <Box display="flex" alignItems="center" gap={2} flexWrap="wrap" mb={2}>
                                {labels.map((label) => (
                                    <Button
                                        key={label}
                                        variant={questionLabels.label3 === label ? 'contained' : 'outlined'}
                                        onClick={() => handleLabelChange(label, 'label3')}
                                        sx={{
                                            borderRadius: '19px',
                                            borderColor: '#000000',
                                            color: questionLabels.label3 === label ? '#ffffff' : '#000000',
                                            backgroundColor: questionLabels.label3 === label ? '#00CDE1' : 'transparent',
                                        }}
                                    >
                                        {label}
                                    </Button>
                                ))}
                            </Box>
                            <TextField
                                name="question3"
                                label="Any additional suggestions or comments?"
                                value={responses.question3}
                                onChange={handleResponseChange}
                                multiline
                                rows={4}
                                fullWidth
                                sx={{ mb: 2 }}
                            />
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <Typography variant="body1" sx={{ mb: 2, fontFamily: 'Roboto', fontSize: '18px', color: '#00272B' }}>
                                Final Comments or Suggestions?
                            </Typography>
                            <TextField
                                name="additionalComments"
                                label="Anything else you'd like to share?"
                                value={responses.additionalComments}
                                onChange={handleResponseChange}
                                multiline
                                rows={4}
                                fullWidth
                                sx={{ mb: 2 }}
                            />
                        </>
                    )}

                    {/* Navigation Buttons */}
                    <Box display="flex" justifyContent="space-between" mt={4}>
                        <Button
                            variant="outlined"
                            onClick={handleBack}
                            disabled={step === 0}
                            sx={{ display: step > 0 ? 'inline-flex' : 'none' }}
                        >
                            Previous
                        </Button>
                        <Button variant="contained" size="large" sx={{ backgroundColor: '#00BCD4', borderRadius: '20px' }} onClick={handleNext}>
                            {step === 3 ? 'Finish' : 'Next'}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default FeedBack;
