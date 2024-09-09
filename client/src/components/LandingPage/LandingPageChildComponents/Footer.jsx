import { Container, Typography, IconButton, Box } from "@mui/material";
import { FaFacebook } from "react-icons/fa";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { MdOutlineMail } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-[#2E2E2E] py-[40px]">
      <Container>
        <div className="flex sm:flex-row flex-col sm:gap-0 gap-[40px] justify-between items-center">
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img width={95} height={95} src="/assets/logo.svg" alt="logo"/>
          </Box>

          {/* Links */}
          <div className="flex space-x-8">
            <Typography
              className="text-white cursor-pointer hover:underline font-[500] text-[16px] leading-[19.36px] text-inter"
              variant="body1"
            >
              About Us
            </Typography>
            <Typography
              className="text-white cursor-pointer hover:underline font-[500] text-[16px] leading-[19.36px] text-inter"
              variant="body1"
            >
              Contact
            </Typography>
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-[16px] sm:items-start items-center">
            <Typography className="text-white font-[500] text-[16px] leading-[19.36px] text-inter">
              Socials
            </Typography>
            <div className="flex gap-[20px]">
              <IconButton>
                <FaFacebook className="text-[18px] text-[#C5C5C5]" />
              </IconButton>
              <IconButton>
                <InstagramIcon className="text-[18px] text-[#C5C5C5]" />
              </IconButton>
              <IconButton>
                <LinkedInIcon className="text-[18px] text-[#C5C5C5]" />
              </IconButton>
              <IconButton>
                <MdOutlineMail className="text-[18px] text-[#C5C5C5]" />
              </IconButton>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-[32px] border-[#D6D6D9]" />

        {/* Copyright */}
        <div className="flex justify-center">
          <Typography className="text-white font-[500] text-[16px] leading-[19.36px] text-inter">
            © Dreaca. All rights reserved 2024
          </Typography>
        </div>
      </Container>
    </footer>
  );
}
