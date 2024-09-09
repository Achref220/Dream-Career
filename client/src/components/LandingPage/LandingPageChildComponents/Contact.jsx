import { Container, TextField, Button, InputAdornment } from "@mui/material";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineMail } from "react-icons/md";
import { LuBuilding2 } from "react-icons/lu";

const Contact = () => {
  return (
    <div
      id="contact"
      className="bg-[#00CDE1] md:pt-[120px] pt-[60px] pb-[40px]"
    >
      <Container>
        {/* Heading Section */}
        <div className="mb-[16px]">
          <h1 className="lg:text-[48px] md:text-[40px] sm:text-[35px] text-[30px] md:leading-[57.6px] font-[800] text-white">
            Need information? Reach out to us
          </h1>
          <p className="text-white md:text-[20px] text-[18px] font-[400] md:leading-[24.2px] mt-[24px] text-inter">
            Would you like to know what we could do for you? Fill out the form
            and we’ll get back to you within 48 hours.
          </p>
        </div>

        {/* Form Section */}
        <form>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px] mb-[16px]">
            {/* Name Input */}
            <TextField
              fullWidth
              placeholder="Enter your full name"
              variant="outlined"
              className="text-inter rounded-[6px]"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AiOutlineUser className="text-blackish" size={24} />
                  </InputAdornment>
                ),
                sx: {
                  backgroundColor: "#fff",
                  color: "#000",
                  borderColor: "#2E2E2E40",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#2E2E2E40",
                  },
                  "&:hover fieldset": {
                    borderColor: "#2E2E2E",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#2E2E2E",
                  },
                },
              }}
            />

            {/* Email Input */}
            <TextField
              fullWidth
              placeholder="Enter your email"
              variant="outlined"
              className="text-inter rounded-[6px]"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdOutlineMail className="text-blackish" size={24} />
                  </InputAdornment>
                ),
                sx: {
                  backgroundColor: "#fff",
                  color: "#000",
                  borderColor: "#2E2E2E40",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#2E2E2E40",
                  },
                  "&:hover fieldset": {
                    borderColor: "#2E2E2E",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#2E2E2E",
                  },
                },
              }}
            />

            {/* Club Input */}
            <TextField
              fullWidth
              placeholder="Enter your club"
              variant="outlined"
              className="text-inter rounded-[6px]"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LuBuilding2 className="text-blackish" size={24} />
                  </InputAdornment>
                ),
                sx: {
                  backgroundColor: "#fff",
                  color: "#000",
                  borderColor: "#2E2E2E40",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#2E2E2E40",
                  },
                  "&:hover fieldset": {
                    borderColor: "#2E2E2E",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#2E2E2E",
                  },
                },
              }}
            />
          </div>
          {/* Question Input */}
          <TextField
            fullWidth
            placeholder="Enter your question"
            variant="outlined"
            className="text-inter rounded-[6px]"
            multiline
            rows={4}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" className="">
                  <img src="/assets/message-circle-question.svg" alt="crl" width={24} height={24} className="mt-0 w-fit h-fit"/>
                </InputAdornment>
              ),
              sx: {
                backgroundColor: "#fff",
                color: "#000",
                borderColor: "#2E2E2E40",
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#2E2E2E40",
                },
                "&:hover fieldset": {
                  borderColor: "#2E2E2E",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#2E2E2E",
                },
              },
            }}
          />

          {/* Submit Button */}
          <div className="mt-[16px]">
            <Button
              variant="contained"
              className="rounded-[12px] w-[125px] text-[16px] font-[500] leading-[21.78px] text-inter"
              sx={{
                backgroundColor: "#fff",
                paddingTop: "16px",
                paddingBottom: "16px",
                color: "#000",
                "&:hover": { backgroundColor: "#e0e0e0" },
              }}
            >
              Submit
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default Contact;
