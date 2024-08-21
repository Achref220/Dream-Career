import { Typography, useTheme, IconButton, useMediaQuery, Box } from "@mui/material";
import FlexBetween from "../../components/CustomStyledComponents/FlexBetween";
import WidgetWrapper from "../../components/CustomStyledComponents/WidgetWrapper";
import InfoIcon from "@mui/icons-material/Info";

const ad = {
  url: "/assets/image_1.png",
  name: "{clubName}",
  points: "{clubPoints}",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
};

const AdWidget = () => {
  const { palette } = useTheme();
  const { dark, main, medium } = palette;

  // Use media queries to determine the screen size
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Event of the week
        </Typography>
        <FlexBetween>
          <IconButton>
            <InfoIcon />
          </IconButton>
        </FlexBetween>
      </FlexBetween>

      <Box
        component="img"
        src={ad.url}
        alt="advert"
        sx={{
          width: "100%",
          borderRadius: "0.75rem",
          margin: "0.75rem 0",
          height: isSmallScreen ? "100px" : "150px", // Adjust image height based on screen size
          objectFit: "cover", // Ensure the image covers the entire box without distortion
        }}
      />

      <FlexBetween
        sx={{
          flexDirection: isSmallScreen ? "column" : "row", // Stack elements on small screens
          alignItems: isSmallScreen ? "flex-start" : "center",
        }}
      >
        <Typography color={main} variant={isSmallScreen ? "h6" : "body1"}>
          {ad.name}
        </Typography>
        <Typography color={medium} variant={isSmallScreen ? "body2" : "body1"}>
          {ad.points}
        </Typography>
      </FlexBetween>

      <Typography
        color={medium}
        m="0.5rem 0"
        textAlign={isSmallScreen ? "center" : "left"}
        variant={isSmallScreen ? "body2" : "body1"}
      >
        {ad.text}
      </Typography>
    </WidgetWrapper>
  );
};

export default AdWidget;
