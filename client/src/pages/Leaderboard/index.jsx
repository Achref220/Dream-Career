import React from "react";
import Navbar from "../../components/navbar";
import { Box, Typography } from "@mui/material";

const Leaderboard = () => {
  let clubs = [
    {
      clubName: "club1",
      ClubPoints: "1260",
    },
    {
      clubName: "club2",
      ClubPoints: "900",
    },
    {
      clubName: "club3",
      ClubPoints: "800",
    },
    {
      clubName: "club4",
      ClubPoints: "600",
    },
    {
      clubName: "club5",
      ClubPoints: "202",
    },
  ];
  return (
    <>
      <Navbar />
      <div
        style={{
          position: "relative",
          backgroundColor: "#fff",
          width: "100%",
          height: "861px",
          overflow: "hidden",
          textAlign: "left",
          fontSize: "16px",
          color: "#00cde1",
          fontFamily: "'Fira Sans'",
        }}
      >
        <Typography
        fontWeight="bold"
        textAlign="center"
        paddingTop="1rem"
        fontSize="clamp(1rem, 2rem, 2.25rem)"
        color={"primary"}
        sx={{
          "&:hover": {
            color: "grey",
            cursor: "pointer",
          },
        }}
      >
        Clubs Leaderboard
      </Typography>
        <div
          style={{
            position: "absolute",
            bottom: "0px",
            left: "calc(50% - 699px)",
            width: "1398px",
            height: "741px",
            overflow: "hidden",
            textAlign: "center",
            fontSize: "34px",
            color: "#fff",
            fontFamily: "'Plus Jakarta Sans'",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-16.4px",
              left: "526px",
              width: "341px",
              height: "579.4px",
              fontSize: "48px",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "73.4px",
                left: "34px",
                borderRadius: "138.5px",
                backgroundColor: "#ffca28",
                width: "277px",
                height: "506px",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "70.9px",
                left: "66.9px",
                borderRadius: "50%",
                backgroundColor: "#322144",
                border: "7px solid #ffca28",
                boxSizing: "border-box",
                width: "210.9px",
                height: "210.9px",
              }}
            />
            {/* <img
            style={{
              position: "absolute",
              top: "107.2px",
              left: "103.1px",
              width: "138.4px",
              height: "138.4px",
            }}
            alt=""
            src="/profile.svg"
          /> */}
            <b
              style={{
                position: "absolute",
                top: "298.4px",
                left: "0px",
                lineHeight: "150%",
                display: "inline-block",
                width: "341px",
                height: "56px",
              }}
            >
              Club 1
            </b>
            <div
              style={{
                position: "absolute",
                top: "238.4px",
                left: "142px",
                borderRadius: "50%",
                backgroundColor: "#ffca28",
                boxShadow: "0px 4px 13px 4px rgba(0, 0, 0, 0.25)",
                width: "59px",
                height: "59px",
              }}
            />
            <b
              style={{
                position: "absolute",
                top: "calc(50% - 58.3px)",
                left: "calc(50% - 9.5px)",
                lineHeight: "150%",
                display: "inline-block",
                width: "21px",
                height: "54px",
                textShadow: "0px 0px 13px rgba(0, 0, 0, 0.25)",
              }}
            >
              1
            </b>
            {/* <img
            style={{
              position: "absolute",
              top: "16.4px",
              left: "182.6px",
              width: "156.5px",
              height: "140.1px",
              overflow: "hidden",
            }}
            alt=""
            src="/crown.svg"
          /> */}
          </div>
          <div
            style={{
              position: "absolute",
              top: "153.5px",
              left: "858.4px",
              width: "139.2px",
              height: "139.2px",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-6.5px",
                left: "-21.4px",
                borderRadius: "100px",
                backgroundColor: "#00cde1",
                width: "184px",
                height: "383px",
              }}
            />
            <b
              style={{
                position: "absolute",
                top: "167.5px",
                left: "-50.4px",
                lineHeight: "150%",
                display: "inline-block",
                width: "240px",
                height: "60px",
              }}
            >
              Club 3
            </b>
            <img
              style={{
                position: "absolute",
                top: "-7px",
                left: "-7px",
                borderRadius: "50%",
                width: "153.2px",
                height: "153.2px",
                objectFit: "cover",
              }}
              alt=""
              src="/ellipse-57@2x.png"
            />
            <div
              style={{
                position: "absolute",
                top: "60.5px",
                left: "42.1px",
                width: "41px",
                height: "41px",
                fontSize: "35px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "51px",
                  left: "9px",
                  borderRadius: "50%",
                  backgroundColor: "#00cde1",
                  boxShadow: "0px 4px 13px 4px rgba(0, 0, 0, 0.25)",
                  width: "49px",
                  height: "49px",
                }}
              />
              <b
                style={{
                  position: "absolute",
                  top: "calc(50% + 29.5px)",
                  left: "calc(50% + 3.5px)",
                  lineHeight: "150%",
                  display: "inline-block",
                  width: "18px",
                  height: "41px",
                  textShadow: "0px 0px 13px rgba(0, 0, 0, 0.25)",
                }}
              >
                3
              </b>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              top: "117px",
              left: "359px",
              width: "201px",
              height: "420px",
              overflow: "hidden",
              fontSize: "35px",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "0px",
                left: "0px",
                borderRadius: "100.5px",
                backgroundColor: "#089f20",
                width: "201px",
                height: "420px",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "6px",
                left: "25px",
                width: "152px",
                height: "151px",
              }}
            >
              {/* <img
              style={{
                position: "absolute",
                top: "-6px",
                left: "-7px",
                borderRadius: "50%",
                width: "166px",
                height: "164px",
                objectFit: "cover",
              }}
              alt=""
              src="/ellipse-571@2x.png"
            /> */}
              <div
                style={{
                  position: "absolute",
                  top: "71px",
                  left: "44px",
                  width: "44.8px",
                  height: "44.8px",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "59px",
                    left: "11px",
                    borderRadius: "50%",
                    backgroundColor: "#089f20",
                    boxShadow: "0px 4px 13px 4px rgba(0, 0, 0, 0.25)",
                    width: "49px",
                    height: "48px",
                  }}
                />
                <b
                  style={{
                    position: "absolute",
                    top: "calc(50% + 30.6px)",
                    left: "calc(50% + 4.6px)",
                    lineHeight: "150%",
                    display: "inline-block",
                    width: "18px",
                    height: "41px",
                    textShadow: "0px 0px 13px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  2
                </b>
              </div>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              top: "309px",
              left: "calc(50% - 320px)",
              width: "157px",
              height: "51px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <b
              style={{
                position: "relative",
                lineHeight: "150%",
                display: "inline-block",
                width: "206px",
              }}
            >
              Club 2
            </b>
          </div>
          <div
            style={{
              position: "relative",
              top: "370px",
              left: "0px",
              borderRadius: "32px 32px 0px 0px",
              backgroundColor: "#d9f7fa",
              width: "1398px",
              height: "487px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {clubs.map((cl, index) => (
              <Box
                key={index}
                sx={{
                  width: "90%",
                  color: "black",
                  marginBottom: "10px",
                  borderRadius: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor:
                    index === 0
                      ? "#FFFF00"
                      : index === 1
                      ? "green" 
                      : index === 2
                      ? "#14b3c1"
                      : "#ffff",
                }}
              >
                <span style={{ marginLeft: "10px" }}>{cl.clubName}</span>
                <span style={{ marginRight: "10px" }}>{cl.ClubPoints}</span>
              </Box>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
