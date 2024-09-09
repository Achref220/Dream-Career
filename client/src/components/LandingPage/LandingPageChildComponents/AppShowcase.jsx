import { Grid, Container, Typography, Box, Button } from "@mui/material";

export default function AppShowcase() {
  return (
    <div className="bg-[#E9F5FF] md:py-[120px] py-[50px]">
      <Container>
        {/* Grid container for mobile images and descriptions */}
        <Grid container spacing={{ xs: 4, md: 2 }} justifyContent="center">
          {/* Row 1 */}
          <Grid item xs={12} md={6} className="overflow-hidden">
            <Box className="relative flex flex-col gap-[50px] bg-white rounded-[24px] sm:px-[45px] px-[20px] pt-[45px] h-full w-full">
              <Typography
                sx={{
                  fontSize: {
                    xs: "16px", // font size for extra small screens
                    sm: "18px", // font size for small screens
                    md: "16px", // font size for medium screens and up
                  },
                }}
                className="font-[400] text-center leading-[24.2px] text-inter flex-grow"
              >
                Share your campus life to feel its full pulse on Dreaca
              </Typography>
              <div className="w-full max-h-[493.92px]">
                <img
                  src="/assets/share-mobiles.svg" // Replace with your image path
                  alt="Mobile App 1"
                  className="w-full h-auto mt-auto"
                />
              </div>
            </Box>
          </Grid>

          <Grid item xs={12} md={6} className="overflow-hidden">
            <Box className="flex flex-col gap-[43px] text-center bg-white rounded-[24px] sm:px-[45px] px-[20px] pt-[45px] h-full w-full">
              <Typography
                sx={{
                  fontSize: {
                    xs: "16px", // font size for extra small screens
                    sm: "18px", // font size for small screens
                    md: "16px", // font size for medium screens and up
                  },
                }}
                className="font-[400] leading-[24.2px] text-inter"
              >
                Climb the ranks! Post events, earn points, and lead your club to
                glory
              </Typography>
              <div className="max-h-[591.1px] w-full">
                <img
                  src="/assets/climb-mobiles.svg" // Replace with your image path
                  alt="Mobile App 1"
                  className="w-full h-auto mt-auto"
                />
              </div>
            </Box>
          </Grid>

          <Grid item xs={12} md={4.5} className="overflow-hidden">
            <Box className="flex flex-col text-center gap-[29px] bg-white rounded-[24px] sm:px-[30px] px-[20px] pt-[30px] h-full w-full">
              <Typography
                sx={{
                  fontSize: {
                    xs: "16px", // font size for extra small screens
                    sm: "18px", // font size for small screens
                    md: "16px", // font size for medium screens and up
                  },
                }}
                className="font-[400] leading-[24.2px] mb-[29px] text-inter"
              >
                Track your subsidiaries with stats
              </Typography>
              <div className="max-h-[520.82px] mt-auto">
                <img
                  src="/assets/track-mobiles.svg"
                  alt="Mobile App 3"
                  className="w-full h-full mt-auto"
                />
              </div>
            </Box>
          </Grid>

          {/* Row 2 */}
          <Grid
            container
            item
            xs={12}
            md={3}
            spacing={2}
            justifyContent="center"
          >
            <Grid item xs={12} md={12} className="overflow-hidden">
              <Box className="text-center bg-white rounded-[24px] overflow-hidden pt-[30px] h-full w-full">
                <Typography
                  sx={{
                    fontSize: {
                      xs: "16px", // font size for extra small screens
                      sm: "18px", // font size for small screens
                      md: "16px", // font size for medium screens and up
                    },
                  }}
                  className="font-[400] leading-[24.2px] mb-[20px] px-[16px] text-inter"
                >
                  Post your updates and let your story shine
                </Typography>
                <div className="flex gap-[10px] w-full">
                  <div className="w-[60%]">
                    <img
                      src="/assets/post-img1.png"
                      alt="Mobile App 4"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-[40%]">
                    <img
                      src="/assets/post-img2.png"
                      alt="Mobile App 4"
                      className="w-full h-full object-cover rounded-tl-lg overflow-hidden"
                    />
                  </div>
                </div>
              </Box>
            </Grid>
            <Grid item xs={12} md={12} className="overflow-hidden">
              <Box className="text-center bg-white rounded-[24px] pt-[30px] pb-[27px] h-full w-full">
                <Typography className="font-[400] text-[14px] px-[16px] leading-[24.2px] mb-[16px] text-inter">
                  Share your feedback and shape future events
                </Typography>
                <Button
                  sx={{
                    fontSize: {
                      xs: "16px", // font size for extra small screens
                      sm: "18px", // font size for small screens
                      md: "16px", // font size for medium screens and up
                    },
                  }}
                  className="leading-[29.5px] px-[16px] font-[600] text-[#00CDE1] mb-[9px]"
                >
                  Send your Feedback
                </Button>
                <img
                  src="/assets/stars.svg"
                  alt="Mobile App 6"
                  className="w-full sm:max-h-[65px] max-h-[40px] pe-[10px]"
                />
              </Box>
            </Grid>
          </Grid>

          <Grid item xs={12} md={4.5} className="overflow-hidden">
            <Box className="flex flex-col gap-[29px] text-center bg-white rounded-[24px] sm:px-[30px] px-[20px] pt-[30px] h-full w-full">
              <Typography className="font-[400] leading-[24.2px] flex-grow">
                Chat on campus, connect, spark random conversations
              </Typography>
              <div className="w-full">
                <img
                  src="/assets/chat-mobiles.svg"
                  alt="Mobile App 3"
                  className="w-full h-auto mt-auto"
                />
              </div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
