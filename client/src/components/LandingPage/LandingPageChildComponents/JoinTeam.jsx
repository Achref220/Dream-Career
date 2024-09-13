import { Button, Container, Typography } from "@mui/material";
import React from "react";

const JoinTeam = () => {
  return (
    <section className="relative">
      <img
        className="absolute w-full h-full object-cover z-[1]"
        src="/assets/join-team-bg.png"
        alt="join-team"
        width="1920"
        height="1080"
      />
      <Container>
        <div className="py-[73px] items-center flex-wrap gap-[30px] text-white flex justify-between relative z-[2]">
          <div>
            <Typography
              variant="h4"
              component="h2"
              sx={{ fontWeight: "800" }}
              className="md:text-[40px] text-[35px] md:leading-[57.6px]"
            >
              Dream Career
            </Typography>
            <Typography
              variant="body1"
              component="p"
              sx={{ marginTop: "8px", fontWeight: "500" }}
              className="md:text-[20px] text-[18px] md:leading-[24.2px] text-inter"
            >
              Career for the people who seek spark
            </Typography>
          </div>
          <Button
            variant="contained"
            className="rounded-[12px] w-[186px] text-[16px] font-[500] leading-[21.78px] text-inter"
            sx={{
              backgroundColor: "#fff",
              paddingTop: "16px",
              paddingBottom: "16px",
              color: "#000",
              "&:hover": { backgroundColor: "#e0e0e0" },
            }}
          >
            Join Our Team
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default JoinTeam;
