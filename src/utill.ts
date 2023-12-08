import { Dispatch, SetStateAction } from "react";
import { WinningTicketInterface } from "./components/ticket/UserTicketBuy";

export const formattedDate = (value: string) => {
  return `${new Date(value).getFullYear()}-${
    new Date().getMonth() + 1
  }-${new Date().getDate()}`;
};

export enum STATUS {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

export const dialog_timeout = 3000;

export const handleLogout = async () => {
  sessionStorage.removeItem("is_logged");
  sessionStorage.removeItem("username");
  sessionStorage.removeItem("referralID");
  sessionStorage.removeItem("role");
  sessionStorage.removeItem("userId");
  sessionStorage.removeItem("email");
  sessionStorage.removeItem("agentId");
  sessionStorage.clear();
  // window.location.href = "/";
};

export const is5pmto6pm = (): boolean => {
  const now = new Date();
  if (now.getHours() >= 17 && now.getHours() < 24) return true;
  return false;
};

export const handleKeyPrevent = (
  e: React.ChangeEvent<HTMLInputElement>
): boolean => {
  if (
    e.target.value === "-" ||
    e.target.value === "+" ||
    e.target.value === "%" ||
    e.target.value === "/" ||
    e.target.value === "*"
  ) {
    e.preventDefault();
    return false;
  }
  return true;
};

export const numbers = [
  { id: 0, value: 0 },
  { id: 1, value: 1 },
  { id: 2, value: 2 },
  { id: 3, value: 3 },
  { id: 4, value: 4 },
  { id: 5, value: 5 },
  { id: 6, value: 6 },
  { id: 7, value: 7 },
  { id: 8, value: 8 },
  { id: 9, value: 9 },
];

export const weeklyCountdown = (): {
  hours: string;
  minutes: string;
  seconds: string;
} => {
  const now = new Date();
  const targetTime = new Date();

  // If it's already past 7 PM on Friday, set the target time to next Friday
  if (now.getDay() === 5 && now.getHours() >= 19) {
    targetTime.setDate(now.getDate() + 7 - now.getDay());
  } else {
    // Find the next Friday
    targetTime.setDate(now.getDate() + ((5 - now.getDay() + 7) % 7));
  }

  targetTime.setHours(19, 0, 0, 0);

  const diffInSeconds = Math.round(
    (targetTime.getTime() - now.getTime()) / 1000
  );
  const hours = Math.floor(diffInSeconds / 3600);
  const minutes = Math.floor((diffInSeconds % 3600) / 60);
  const seconds = diffInSeconds % 60;

  return {
    hours: hours.toString().padStart(2, "0"),
    minutes: minutes.toString().padStart(2, "0"),
    seconds: seconds.toString().padStart(2, "0"),
  };
};
export const dailyCountdown = (): {
  hours: string;
  minutes: string;
  seconds: string;
} => {
  const now = new Date();
  const targetTime = new Date();
  if (now.getHours() >= 18) {
    targetTime.setDate(now.getDate() + 1);
  }
  targetTime.setHours(18, 0, 0, 0);

  const diffInSeconds = Math.round(
    (targetTime.getTime() - now.getTime()) / 1000
  );
  const hours = Math.floor(diffInSeconds / 3600);
  const minutes = Math.floor((diffInSeconds % 3600) / 60);
  let seconds = diffInSeconds % 60;

  return {
    hours: hours.toString().padStart(2, "0"),
    minutes: minutes.toString().padStart(2, "0"),
    seconds: seconds.toString().padStart(2, "0"),
  };
};

export const monthlyCountdown = (): {
  hours: string;
  minutes: string;
  seconds: string;
} => {
  const now = new Date();
  const targetTime = new Date();

  targetTime.setMonth(now.getMonth() + 1, 0);
  targetTime.setHours(20, 0, 0, 0);

  const diffInSeconds = Math.round(
    (targetTime.getTime() - now.getTime()) / 1000
  );
  const hours = Math.floor(diffInSeconds / 3600);
  const minutes = Math.floor((diffInSeconds % 3600) / 60);
  const seconds = diffInSeconds % 60;

  return {
    hours: hours.toString().padStart(2, "0"),
    minutes: minutes.toString().padStart(2, "0"),
    seconds: seconds.toString().padStart(2, "0"),
  };
};
// export const spinnerTimeline = (
//   name: string,
//   setTimeLeft: Dispatch<
//     SetStateAction<{
//       hours: string;
//       minutes: string;
//       seconds: string;
//     }>
//   >
// ) => {
//   if (name === "Daily Spin") {
//     sessionStorage.setItem("timeline", "daily");
//     dailyCountdown();
//   } else if (name === "Weekly Spin") {
//     sessionStorage.setItem("timeline", "weekly");
//     weeklyCountdown();
//   } else {
//     sessionStorage.setItem("timeline", "monthly");
//     monthlyCountdown();
//   }
// };

export const handleSpinner = (
  name: string,
  result: never[],
  renderCount: number,
  setWinningTicket: Dispatch<SetStateAction<WinningTicketInterface[]>>,
  setRenderCount: Dispatch<SetStateAction<number>>,
  setTmpSpinner: Dispatch<SetStateAction<number>>
) => {
  if (name === "Daily Spin" && dailyTicketResultShowTime()) {
    if (dailyTicketResultShowTime()) {
      const intervalId = setInterval(() => {
        setRenderCount((prevCount) => {
          if (prevCount === 0) {
            setWinningTicket((pre) =>
              pre.map((ticket, index) =>
                index === 0 ? { ...ticket, first: result[0] } : ticket
              )
            );
          }
          if (prevCount === 1) {
            setWinningTicket((pre) =>
              pre.map((ticket, index) =>
                index === 0 ? { ...ticket, second: result[1] } : ticket
              )
            );
          }
          if (prevCount === 2) {
            setWinningTicket((pre) =>
              pre.map((ticket, index) =>
                index === 0 ? { ...ticket, third: result[2] } : ticket
              )
            );
          }
          if (prevCount === 3) {
            setWinningTicket((pre) =>
              pre.map((ticket, index) =>
                index === 0 ? { ...ticket, fourth: result[3] } : ticket
              )
            );
            clearInterval(intervalId);
            return prevCount;
          }
          return prevCount + 1;
        });
      }, 8000);

      setTmpSpinner(result[renderCount]);

      return () => clearInterval(intervalId);
    } else {
      setWinningTicket([
        {
          first: null,
          second: null,
          third: null,
          fourth: null,
        },
      ]);
    }
  } else if (name === "Weekly Spin" && weeklyTicketResultShowTime()) {
    if (weeklyTicketResultShowTime()) {
      const intervalId = setInterval(() => {
        setRenderCount((prevCount) => {
          if (prevCount === 0) {
            setWinningTicket((pre) =>
              pre.map((ticket, index) =>
                index === 0 ? { ...ticket, first: result[0] } : ticket
              )
            );
          }
          if (prevCount === 1) {
            setWinningTicket((pre) =>
              pre.map((ticket, index) =>
                index === 0 ? { ...ticket, second: result[1] } : ticket
              )
            );
          }
          if (prevCount === 2) {
            setWinningTicket((pre) =>
              pre.map((ticket, index) =>
                index === 0 ? { ...ticket, third: result[2] } : ticket
              )
            );
          }
          if (prevCount === 3) {
            setWinningTicket((pre) =>
              pre.map((ticket, index) =>
                index === 0 ? { ...ticket, fourth: result[3] } : ticket
              )
            );
            clearInterval(intervalId);
            return prevCount;
          }
          return prevCount + 1;
        });
      }, 8000);

      setTmpSpinner(result[renderCount]);

      return () => clearInterval(intervalId);
    } else {
      setWinningTicket([
        {
          first: null,
          second: null,
          third: null,
          fourth: null,
        },
      ]);
    }
    return true;
  } else if (name === "Monthly Spin" && monthlyResultShowTime()) {
    console.log("inside month");
    const intervalId = setInterval(() => {
      setRenderCount((prevCount) => {
        if (prevCount === 0) {
          setWinningTicket((pre) =>
            pre.map((ticket, index) =>
              index === 0 ? { ...ticket, first: result[0] } : ticket
            )
          );
        }
        if (prevCount === 1) {
          setWinningTicket((pre) =>
            pre.map((ticket, index) =>
              index === 0 ? { ...ticket, second: result[1] } : ticket
            )
          );
        }
        if (prevCount === 2) {
          setWinningTicket((pre) =>
            pre.map((ticket, index) =>
              index === 0 ? { ...ticket, third: result[2] } : ticket
            )
          );
        }
        if (prevCount === 3) {
          setWinningTicket((pre) =>
            pre.map((ticket, index) =>
              index === 0 ? { ...ticket, fourth: result[3] } : ticket
            )
          );
        }

        if (prevCount === 4) {
          setWinningTicket((pre) =>
            pre.map((ticket, index) =>
              index === 1 ? { ...ticket, first: result[4] } : ticket
            )
          );
        }
        if (prevCount === 5) {
          setWinningTicket((pre) =>
            pre.map((ticket, index) =>
              index === 1 ? { ...ticket, second: result[5] } : ticket
            )
          );
        }
        if (prevCount === 6) {
          setWinningTicket((pre) =>
            pre.map((ticket, index) =>
              index === 1 ? { ...ticket, third: result[6] } : ticket
            )
          );
        }
        if (prevCount === 7) {
          setWinningTicket((pre) =>
            pre.map((ticket, index) =>
              index === 1 ? { ...ticket, fourth: result[7] } : ticket
            )
          );
        }
        if (prevCount === 8) {
          setWinningTicket((pre) =>
            pre.map((ticket, index) =>
              index === 2 ? { ...ticket, first: result[8] } : ticket
            )
          );
        }
        if (prevCount === 9) {
          setWinningTicket((pre) =>
            pre.map((ticket, index) =>
              index === 2 ? { ...ticket, second: result[9] } : ticket
            )
          );
        }
        if (prevCount === 10) {
          setWinningTicket((pre) =>
            pre.map((ticket, index) =>
              index === 2 ? { ...ticket, third: result[10] } : ticket
            )
          );
        }
        if (prevCount === 11) {
          setWinningTicket((pre) =>
            pre.map((ticket, index) =>
              index === 2 ? { ...ticket, fourth: result[11] } : ticket
            )
          );
        }
        return prevCount + 1;
      });
    }, 8000);

    setTmpSpinner(result[renderCount]);

    return () => clearInterval(intervalId);
  } else {
    if (
      name === "Daily Spin" &&
      new Date().getHours() === 19 &&
      dailyTicketResultShowTime()
    )
      setWinningTicket([
        {
          first: null,
          second: null,
          third: null,
          fourth: null,
        },
      ]);
    else if (
      name === "Weekly Spin" &&
      new Date().getHours() === 20 &&
      isWeeklyPublishPossibleandUserCannotBuyTicket()
    )
      setWinningTicket([
        {
          first: null,
          second: null,
          third: null,
          fourth: null,
        },
      ]);
    else if (
      name === "Monthly Spin" &&
      new Date().getHours() === 21 &&
      renderCount === 12 &&
      isMonthlyPublishIsAvailableandUserCannotBuyTicket()
    )
      setWinningTicket([
        {
          first: null,
          second: null,
          third: null,
          fourth: null,
        },
      ]);
  }
};

export const isDailyPublishPossibleAndUserCannotBuyTicket = (): boolean => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  if (currentHour === 17 && currentMinute >= 0 && currentMinute <= 59) {
    return true;
  }
  return false;
};

export const dailyTicketResultShowTime = (): boolean => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  if (currentHour === 18 && currentMinute >= 0 && currentMinute <= 59) {
    return true;
  }
  return false;
};

export function isWeeklyPublishPossibleandUserCannotBuyTicket(): boolean {
  const now = new Date();
  if (now.getDay()) {
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    if (currentHour === 18 && currentMinute >= 0 && currentMinute <= 59) {
      return true;
    }
  }
  return false;
}

export function weeklyTicketResultShowTime(): boolean {
  const now = new Date();
  if (now.getDay() === 5) {
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    if (currentHour === 19 && currentMinute >= 0 && currentMinute <= 59) {
      return true;
    }
  }
  return false;
}

export function isMonthlyPublishIsAvailableandUserCannotBuyTicket(): boolean {
  const now = new Date();
  const lastDayOfMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0
  ).getDate();
  if (now.getDate() === lastDayOfMonth) {
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    if (currentHour === 19 && currentMinute >= 0 && currentMinute <= 59) {
      return true;
    }
  }
  return false;
}

export function monthlyResultShowTime(): boolean {
  const now = new Date();
  const lastDayOfMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0
  ).getDate();
  if (now.getDate() === lastDayOfMonth) {
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    if (currentHour === 20 && currentMinute >= 0 && currentMinute <= 59) {
      return true;
    }
  }
  return false;
}
