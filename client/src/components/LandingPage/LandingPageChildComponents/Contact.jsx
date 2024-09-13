import React, { useState } from 'react';
import { Container, TextField, Button, InputAdornment } from "@mui/material";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineMail } from "react-icons/md";
import { LuBuilding2 } from "react-icons/lu";
import emailjs from 'emailjs-com';
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    from_name: '',  // from_name now matches the EmailJS template
    from_email: '', // from_email matches the template as well
    from_club: '',  // from_club for the club input
    message: '',    // message for the question field
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: formData.from_name,
      from_email: formData.from_email,
      from_club: formData.from_club,
      message: formData.message,
    };

    emailjs.send('service_7i3mlgq', 'template_8sf01d7', templateParams, 'user_cXrxoulOrzG3kAmHG1Txm')
      .then((result) => {
        toast.success(`Message sent successfully!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }, (error) => {
        console.log(error);
        toast.error(`An error occurred, please try again later.`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });

    setFormData({ from_name: '', from_email: '', from_club: '', message: '' });
  };

  return (
    <div id="contact" className="bg-[#00CDE1] md:pt-[120px] pt-[60px] pb-[40px]">
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
        <form onSubmit={sendEmail}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px] mb-[16px]">
            {/* Name Input */}
            <TextField
              fullWidth
              name="from_name"
              placeholder="Enter your full name"
              variant="outlined"
              className="text-inter rounded-[6px]"
              value={formData.from_name}
              onChange={handleChange}
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
              name="from_email"
              placeholder="Enter your email"
              variant="outlined"
              className="text-inter rounded-[6px]"
              value={formData.from_email}
              onChange={handleChange}
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
              name="from_club"
              placeholder="Enter your club"
              variant="outlined"
              className="text-inter rounded-[6px]"
              value={formData.from_club}
              onChange={handleChange}
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
            name="message"
            placeholder="Enter your question"
            variant="outlined"
            className="text-inter rounded-[6px]"
            multiline
            rows={4}
            value={formData.message}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img
                    src="/assets/message-circle-question.svg"
                    alt="crl"
                    width={24}
                    height={24}
                    className="mt-0 w-fit h-fit"
                  />
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
              type="submit"
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
