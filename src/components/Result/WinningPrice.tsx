import Box from "@mui/material/Box";
import React, { ChangeEventHandler, FC, useEffect, useState } from "react";
import {
  dailyPublishTicketRateIsAvailable,
  monthlyPublishTicketRateIsAvailable,
  weeklyPublishTicketRateIsAvailable,
} from "../../utill";
import { getWinningPriceRate } from "../../api/getWinningPriceRate";
import { publishPriceRate } from "../../api/publishPriceRate";

export const WinningPriceTicket: FC<{ path: string }> = ({ path }) => {
  const [price, setPrice] = useState({
    priceFirstDigit: "",
    priceSecondDigit: "",
    priceThirdDigit: "",
    priceFourthDigit: "",
  });

  const handlePath = () => {
    return path === "Daily"
      ? "daily"
      : path === "Weekly"
      ? "weekly"
      : "monthly";
  };

  const handlePriceRate = async () => {
    const body = {
      splitup:
        price.priceFirstDigit +
        price.priceSecondDigit +
        price.priceThirdDigit +
        price.priceFourthDigit,
    };
    await publishPriceRate(handlePath(), body)
      .then((res) => {
        if (res.status === 200) {
          window.alert("Success! Price rate splitup added");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    (async () => {
      await getWinningPriceRate(handlePath())
        .then((response) => {
          setPrice({
            priceFirstDigit: response.data.data.priceRate_splitup[0],
            priceSecondDigit: response.data.data.priceRate_splitup[1],
            priceThirdDigit: response.data.data.priceRate_splitup[2],
            priceFourthDigit: response.data.data.priceRate_splitup[3],
          });
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, []);
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          m: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: { xs: "start", sm: "center" },
            gap: "10px",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Box
            sx={{
              fontWeight: "bold",
              fontSize: "1.25rem",
              color: "#ab0a4a",
            }}
          >
            Price Rate:
          </Box>
          <Box component={"div"} sx={{ display: "flex", gap: "2px" }}>
            <WinningPriceDigit
              value={price.priceFirstDigit}
              index={1}
              onChange={(e) => {
                setPrice((prevPrice) => ({
                  ...prevPrice,
                  priceFirstDigit:
                    e.target.value.length <= 1 ? e.target.value : "",
                }));
              }}
            />
            <WinningPriceDigit
              value={price.priceSecondDigit}
              index={2}
              onChange={(e) => {
                setPrice((prevPrice) => ({
                  ...prevPrice,
                  priceSecondDigit:
                    e.target.value.length <= 1 ? e.target.value : "",
                }));
              }}
            />
            <WinningPriceDigit
              value={price.priceThirdDigit}
              index={3}
              onChange={(e) => {
                setPrice((prevPrice) => ({
                  ...prevPrice,
                  priceThirdDigit:
                    e.target.value.length <= 1 ? e.target.value : "",
                }));
              }}
            />
            <WinningPriceDigit
              value={price.priceFourthDigit}
              index={4}
              onChange={(e) => {
                setPrice((prevPrice) => ({
                  ...prevPrice,
                  priceFourthDigit:
                    e.target.value.length <= 1 ? e.target.value : "",
                }));
              }}
            />
          </Box>
          <Box
            onClick={() => {
              if (handlePath() === "daily") {
                dailyPublishTicketRateIsAvailable() && handlePriceRate();
              } else if (handlePath() === "weekly") {
                weeklyPublishTicketRateIsAvailable() && handlePriceRate();
              } else if (handlePath() === "monthly") {
                monthlyPublishTicketRateIsAvailable() && handlePriceRate();
              }
            }}
            sx={{
              display: { xs: "none", sm: "block" },
              p: 1.25,
              borderRadius: "5px",
              background:
                handlePath() === "daily" && dailyPublishTicketRateIsAvailable()
                  ? "#0bb329"
                  : handlePath() === "weekly" &&
                    weeklyPublishTicketRateIsAvailable()
                  ? "#0bb329"
                  : handlePath() === "monthly" &&
                    monthlyPublishTicketRateIsAvailable()
                  ? "#0bb329"
                  : "grey",
              cursor:
                handlePath() === "daily" && dailyPublishTicketRateIsAvailable()
                  ? "pointer"
                  : handlePath() === "weekly" &&
                    weeklyPublishTicketRateIsAvailable()
                  ? "pointer"
                  : handlePath() === "monthly" &&
                    monthlyPublishTicketRateIsAvailable()
                  ? "pointer"
                  : "no-drop",
              color: "#fff",
              fontWeight: 600,
            }}
          >
            Publish
          </Box>
        </Box>
      </Box>
      <Box
        component={"div"}
        sx={{
          display: { xs: "flex", sm: "none" },
          justifyContent: "end",
          mr: 2,
        }}
      >
        <Box
          sx={{
            p: 1.25,
            background: "#0bb329",
            borderRadius: "5px",
            color: "#fff",
            fontWeight: 600,
          }}
        >
          Publish
        </Box>
      </Box>
    </React.Fragment>
  );
};

export const WinningPriceDigit: FC<{
  index: number;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
}> = ({ index, value, onChange }) => {
  return (
    <Box
      component={"div"}
      sx={{
        borderRadius: "5px",
        boxShadow: `rgba(0, 0, 0, 0.35) 0px 5px 15px;`,
        p: 1,
      }}
    >
      <Box
        component={"div"}
        sx={{
          color: "#08285c",
          fontWeight: "700",
          my: "2px",
          whiteSpace: "nowrap",
          fontSize: "14px",
        }}
      >
        Level &nbsp; {index} :
      </Box>
      {/* <Divider sx={{ my: "2px", background: "#545b66" }} /> */}
      <input
        type="text"
        value={value}
        onChange={onChange}
        style={{ minWidth: "20px", maxWidth: "60px" }}
      />
    </Box>
  );
};
