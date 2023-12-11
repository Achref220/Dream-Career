import { Typography, useTheme, IconButton } from "@mui/material";
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

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Post of the week
        </Typography>
        <FlexBetween>
          <IconButton>
            <InfoIcon />
          </IconButton>
        </FlexBetween>
      </FlexBetween>
      <img
        width="100%"
        alt="advert"
        src={ad.url}
        style={{
          borderRadius: "0.75rem",
          margin: "0.75rem 0",
          height: "150px",
        }}
      />
      <FlexBetween>
        <Typography color={main}>{ad.name}</Typography>
        <Typography color={medium}>{ad.points}</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        {ad.text}
      </Typography>
    </WidgetWrapper>
  );
};

export default AdWidget;
