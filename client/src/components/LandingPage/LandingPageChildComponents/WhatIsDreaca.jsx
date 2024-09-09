import * as React from "react";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";

const WhatIsDreaca = () => {
  return (
    <section
      id="about"
      className="bg-primaryColor text-left text-white md:py-[160px] py-[70px]"
    >
      <Container>
        <Typography
          variant="h4"
          component="h2"
          sx={{ marginBottom: "10px", fontWeight: "800" }}
          className="lg:text-[40px] md:text-[35px] text-[28px] lg:leading-[57.6px]"
        >
          What is Dreaca?
        </Typography>
        <Typography
          variant="body1"
          component="p"
          sx={{ marginBottom: "20px", fontWeight: "500" }}
          className="lg:text-[30px] md:text-[24px] text-[18px] text-inter lg:leading-[48.41px]"
        >
          Dreaca is a comprehensive platform for youth associations.
        </Typography>
        <Typography
          variant="body1"
          component="p"
          sx={{ marginBottom: "20px", fontWeight: "500" }}
          className="lg:text-[30px] md:text-[24px] text-[18px] text-inter lg:leading-[48.41px]"
        >
          Manage activities, showcase achievements, track progress, and connect
          with sponsors all in one place.
        </Typography>
        <Typography
          variant="body1"
          component="p"
          sx={{ fontWeight: "500" }}
          className="lg:text-[30px] md:text-[24px] text-[18px] text-inter lg:leading-[48.41px]"
        >
          Dreaca is a social platform for youth clubs, designed to enhance
          management and visibility. It features event calendars, dedicated club
          spaces, and tools for member interaction. With a ranking system and
          real-time performance stats, Dreaca helps clubs showcase achievements
          and connect with sponsors for easier funding and support.
        </Typography>
      </Container>
    </section>
  );
};

export default WhatIsDreaca;
