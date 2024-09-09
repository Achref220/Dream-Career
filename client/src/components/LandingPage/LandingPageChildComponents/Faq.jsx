"use client";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

export default function Faq() {
  // State to keep track of which accordion is expanded
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="bg-white md:py-[120px] py-[60px]">
      <Container>
        {/* Title */}
        <Typography
          variant="h4"
          className="lg:text-[40px] md:text-[35px] text-[28px] font-[800] text-blackish mb-[24px]"
        >
          Most frequent questions
        </Typography>

        {/* Accordion 1 */}
        <Accordion
          className="shadow-none p-0"
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          sx={{
            borderColor: "#2E2E2E",
            borderBottom: expanded === "panel1" ? "none" : "1px solid #2E2E2E", // Remove border when expanded
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className="p-0"
          >
            <Typography className="text-blackish font-[400] md:text-[24px] text-[18px]">
              What is Dreaca?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className="text-blackish font-[400] md:text-[22px] text-[16px]">
              Dreaca is an AI socializing app designed to help you connect and
              engage with others through clubs and activities.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Accordion 2 */}
        <Accordion
          className="shadow-none"
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
          sx={{
            borderColor: "#2E2E2E",
            borderBottom: expanded === "panel2" ? "none" : "1px solid #2E2E2E",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            className="p-0"
          >
            <Typography className="text-blackish font-[400] md:text-[24px] text-[18px] ">
              Is it safe and secure?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className="text-blackish font-[400] md:text-[22px] text-[16px]">
              Yes, Dreaca ensures the highest standards of security and privacy
              for its users.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Accordion 3 */}
        <Accordion
          className="shadow-none"
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
          sx={{
            borderColor: "#2E2E2E",
            borderBottom: expanded === "panel3" ? "none" : "1px solid #2E2E2E",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
            className="p-0"
          >
            <Typography className="text-blackish font-[400] md:text-[24px] text-[18px]">
              How do you rank clubs?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className="text-blackish font-[400] md:text-[22px] text-[16px]">
              Clubs are ranked based on user activity, engagement, and overall
              performance.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Accordion 4 */}
        <Accordion
          className="shadow-none"
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
          sx={{
            borderColor: "#2E2E2E",
            borderBottom: expanded === "panel4" ? "none" : "1px solid #2E2E2E",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4a-content"
            id="panel4a-header"
            className="p-0"
          >
            <Typography className="text-blackish font-[400] md:text-[24px] text-[18px]">
              Are you affiliated with a club?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className="text-blackish font-[400] md:text-[22px] text-[16px]">
              Dreaca is not affiliated with any specific club. It offers a
              platform for users to create and manage their own clubs.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Container>
    </div>
  );
}
