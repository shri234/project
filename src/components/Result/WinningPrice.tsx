import Box from "@mui/material/Box";
import React, { ChangeEventHandler, FC, useEffect, useState } from "react";
import {
  STATUS,
  dialog_timeout,
  isDailyPublishPossibleAndUserCannotBuyTicket,
  isWeeklyPublishPossibleandUserCannotBuyTicket,
} from "../../utill";
import { publishPriceRate } from "../../api/publishPriceRate";
import usePriceData from "../../swr/price_data";
import { CustomizedStatusDialogs } from "../custom-table/CustomDialog";

export const WinningPriceTicket: FC<{ path: string }> = ({ path }) => {
  const handlePath = () => {
    return path === "Daily"
      ? "daily"
      : path === "Weekly"
      ? "weekly"
      : "monthly";
  };
  const [price, setPrice] = useState({
    priceFirstDigit: "",
    priceSecondDigit: "",
    priceThirdDigit: "",
    priceFourthDigit: "",
  });
  const [status, setStatus] = useState(false);
  const [is_price_published, setIsPricePublished] = useState(false);
  const { price_data, pricedataIsLoading, pricedataRefetch } = usePriceData(
    handlePath()
  );

  const handlePriceRate = async () => {
    const body = {
      splitup: {
        first_digit: price.priceFirstDigit,
        second_digit: price.priceSecondDigit,
        third_digit: price.priceThirdDigit,
        fourth_digit: price.priceFourthDigit,
      },
    };
    await publishPriceRate(handlePath(), body)
      .then(() => {
        setStatus(true);
        setTimeout(() => {
          setStatus(false);
        }, dialog_timeout);
        setIsPricePublished(true);
      })
      .catch((error) => {
        console.log(error);
        setIsPricePublished(false);
      });
  };

  useEffect(() => {
    pricedataRefetch().then((res) => {
      if (res?.data?.priceRate_splitup) {
        setPrice({
          priceFirstDigit: res.data.priceRate_splitup[0].first_digit,
          priceSecondDigit: res.data.priceRate_splitup[0].second_digit,
          priceThirdDigit: res.data.priceRate_splitup[0].third_digit,
          priceFourthDigit: res.data.priceRate_splitup[0].fourth_digit,
        });
        setIsPricePublished(true);
      }
    });
  }, [price_data, pricedataIsLoading]);

  return (
    <React.Fragment>
      {status && (
        <CustomizedStatusDialogs
          setOpenStatusDlg={setStatus}
          description="Published Successfully"
          status={STATUS.SUCCESS}
        />
      )}
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
                  priceFirstDigit: e.target.value,
                }));
              }}
            />
            <WinningPriceDigit
              value={price.priceSecondDigit}
              index={2}
              onChange={(e) => {
                setPrice((prevPrice) => ({
                  ...prevPrice,
                  priceSecondDigit: e.target.value,
                }));
              }}
            />
            <WinningPriceDigit
              value={price.priceThirdDigit}
              index={3}
              onChange={(e) => {
                setPrice((prevPrice) => ({
                  ...prevPrice,
                  priceThirdDigit: e.target.value,
                }));
              }}
            />
            <WinningPriceDigit
              value={price.priceFourthDigit}
              index={4}
              onChange={(e) => {
                setPrice((prevPrice) => ({
                  ...prevPrice,
                  priceFourthDigit: e.target.value,
                }));
              }}
            />
          </Box>
          <Box
            onClick={() => {
              if (
                handlePath() === "daily" &&
                !is_price_published &&
                isDailyPublishPossibleAndUserCannotBuyTicket()
              ) {
                handlePriceRate();
              } else if (
                handlePath() === "weekly" &&
                !is_price_published &&
                isWeeklyPublishPossibleandUserCannotBuyTicket()
              ) {
                handlePriceRate();
              }
            }}
            sx={{
              display: { xs: "none", sm: "block" },
              p: 1.25,
              borderRadius: "5px",
              background:
                handlePath() === "daily" &&
                !is_price_published &&
                isDailyPublishPossibleAndUserCannotBuyTicket()
                  ? "#0bb329"
                  : handlePath() === "weekly" &&
                    !is_price_published &&
                    isWeeklyPublishPossibleandUserCannotBuyTicket()
                  ? "#0bb329"
                  : "grey",
              cursor:
                handlePath() === "daily" &&
                !is_price_published &&
                isDailyPublishPossibleAndUserCannotBuyTicket()
                  ? "pointer"
                  : handlePath() === "weekly" &&
                    !is_price_published &&
                    isWeeklyPublishPossibleandUserCannotBuyTicket()
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
          onClick={() => {
            if (
              handlePath() === "daily" &&
              !is_price_published &&
              isDailyPublishPossibleAndUserCannotBuyTicket()
            ) {
              handlePriceRate();
            } else if (
              handlePath() === "weekly" &&
              !is_price_published &&
              isWeeklyPublishPossibleandUserCannotBuyTicket()
            ) {
              handlePriceRate();
            }
          }}
          sx={{
            p: 1.25,
            background:
              handlePath() === "daily" &&
              !is_price_published &&
              isDailyPublishPossibleAndUserCannotBuyTicket()
                ? "#0bb329"
                : handlePath() === "weekly" &&
                  !is_price_published &&
                  isWeeklyPublishPossibleandUserCannotBuyTicket()
                ? "#0bb329"
                : "grey",
            cursor:
              handlePath() === "daily" &&
              !is_price_published &&
              isDailyPublishPossibleAndUserCannotBuyTicket()
                ? "pointer"
                : handlePath() === "weekly" &&
                  !is_price_published &&
                  isWeeklyPublishPossibleandUserCannotBuyTicket()
                ? "pointer"
                : "no-drop",

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
        // style={{ width: "10px" }}
      />
    </Box>
  );
};
