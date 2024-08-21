import { Avatar, Box, Skeleton } from "@mui/material";

const UserAvatar = ({ image, size = "60px", isLoading }) => {
  if (isLoading) {
    return (
      <Box width={size} height={size}>
        <Skeleton
          variant="circular"
          width={size}
          height={size}
          style={{ borderRadius: "50%" }}
        />
      </Box>
    );
  }

  return (
    <Box width={size} height={size}>
      <Avatar
        style={{
          objectFit: "cover",
          borderRadius: "50%",
          border: "solid blue",
          borderColor: "#14b3c1",
          width: size,
          height: size,
        }}
        src={typeof image === "string" ? image : "https://i.stack.imgur.com/l60Hf.png"} // Ensure image is a string
        alt="avatar"
      />
    </Box>
  );
};

export default UserAvatar;
