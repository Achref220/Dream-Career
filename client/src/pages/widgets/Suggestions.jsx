import React, { useEffect, useState } from "react";
import WidgetWrapper from "../../components/CustomStyledComponents/WidgetWrapper";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { SERVER_URL } from "../../service/config";
import { useSelector } from "react-redux";
import Following from "../../components/Following";
import { v4 as uuidv4 } from "uuid";
import FlexBetween from "../../components/CustomStyledComponents/FlexBetween";
import { Refresh } from "@mui/icons-material";

const Suggestions = ({ username }) => {
  const { palette } = useTheme();
  const [userSuggestions, setuserSuggestions] = useState([]);
  const token = useSelector((state) => state.token);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const fetchUsers = async (action) => {
    if (action === "refresh") setuserSuggestions([]);
    setLoading(true);
    try {
      const response = await fetch(
        `${SERVER_URL}u/${username}/suggestions?page=${page}&pageSize=6`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      if (data.users.length > 0) {
        setuserSuggestions((prevUsers) => [...prevUsers, ...data.users]);
        setHasMore(data.hasNextPage);
      } else {
        setHasMore(false);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users: ", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, token, username]);

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography
          color={palette.neutral.dark}
          variant="h5"
          fontWeight="500"
          sx={{ mb: "1.5rem" }}
        >
          Suggestions
        </Typography>
        <Box
          sx={{ mb: "1rem", cursor: "pointer" }}
          onClick={() => fetchUsers("refresh")}
        >
          <Tooltip title="Refresh list" arrow>
            <Refresh />
          </Tooltip>
        </Box>
      </FlexBetween>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {userSuggestions.map(
          ({ _id, username, occupation, profilePhotoUrl }) => (
            <Following
              isProfile={true}
              key={uuidv4()}
              followingId={_id}
              name={username}
              subtitle={occupation}
              userProfilePhotoUrl={
                profilePhotoUrl[0]?.url || "https://i.stack.imgur.com/l60Hf.png"
              }
            />
          )
        )}
        {hasMore && (
          <Button onClick={loadMore} disabled={loading}>
            {loading ? "Loading..." : "See More"}
          </Button>
        )}
      </Box>
    </WidgetWrapper>
  );
};

export default Suggestions;
