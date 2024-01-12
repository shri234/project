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
  day: string;
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
  const days = Math.floor(diffInSeconds / 86400);
  const hours = Math.floor((diffInSeconds % 86400) / 3600);
  const minutes = Math.floor((diffInSeconds % 3600) / 60);
  const seconds = diffInSeconds % 60;

  return {
    day: days.toString().padStart(2, "0"),
    hours: hours.toString().padStart(2, "0"),
    minutes: minutes.toString().padStart(2, "0"),
    seconds: seconds.toString().padStart(2, "0"),
  };
};

export const dailyCountdown = (): {
  day: string;
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
    day: "",
    hours: hours.toString().padStart(2, "0"),
    minutes: minutes.toString().padStart(2, "0"),
    seconds: seconds.toString().padStart(2, "0"),
  };
};

export const monthlyCountdown = (): {
  day: string;
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
  const days = Math.floor(diffInSeconds / 86400); // 1 day = 24 * 60 * 60 seconds
  const hours = Math.floor((diffInSeconds % 86400) / 3600);
  const minutes = Math.floor((diffInSeconds % 3600) / 60);
  const seconds = diffInSeconds % 60;

  return {
    day: days.toString().padStart(2, "0"),
    hours: hours.toString().padStart(2, "0"),
    minutes: minutes.toString().padStart(2, "0"),
    seconds: seconds.toString().padStart(2, "0"),
  };
};

export const spinResult = async (
  result: never[],
  setWinningTicket: Dispatch<SetStateAction<WinningTicketInterface[]>>,
  setTmpSpinner: Dispatch<SetStateAction<number | null>>
): Promise<void> => {
  for (let prevCount = 0; prevCount <= 3; prevCount++) {
    await new Promise((resolve) => {
      setTmpSpinner(result[prevCount]);
      setTimeout(resolve, 8000);
    });

    setWinningTicket((pre) =>
      pre.map((ticket, index) =>
        index === 0
          ? {
              ...ticket,
              [prevCount === 0
                ? "first"
                : prevCount === 1
                ? "second"
                : prevCount === 2
                ? "third"
                : "fourth"]: result[prevCount],
            }
          : ticket
      )
    );
  }
};

export const monthlySpinResult = async (
  result: never[],
  setMonthlyWinningTicket: Dispatch<SetStateAction<WinningTicketInterface[]>>,
  setTmpSpinner: Dispatch<SetStateAction<number | null>>
): Promise<void> => {
  for (let prevCount = 0; prevCount <= 11; prevCount++) {
    setTmpSpinner(result[prevCount]);

    await new Promise((resolve) => setTimeout(resolve, 8000));

    // Update winningTicket array
    setMonthlyWinningTicket((prevTickets) =>
      prevTickets.map((ticket, index) => {
        if (index === 0) {
          if (prevCount === 0) {
            return {
              ...ticket,
              first: result[prevCount],
            };
          } else if (prevCount === 1) {
            return {
              ...ticket,
              second: result[prevCount],
            };
          } else if (prevCount === 2) {
            return {
              ...ticket,
              third: result[prevCount],
            };
          } else if (prevCount === 3) {
            return {
              ...ticket,
              fourth: result[prevCount],
            };
          }
        } else if (index === 1) {
          if (prevCount === 4) {
            return {
              ...ticket,
              first: result[prevCount],
            };
          } else if (prevCount === 5) {
            return {
              ...ticket,
              second: result[prevCount],
            };
          } else if (prevCount === 6) {
            return {
              ...ticket,
              third: result[prevCount],
            };
          } else if (prevCount === 7) {
            return {
              ...ticket,
              fourth: result[prevCount],
            };
          }
        } else if (index === 2) {
          if (prevCount === 8) {
            return {
              ...ticket,
              first: result[prevCount],
            };
          } else if (prevCount === 9) {
            return {
              ...ticket,
              second: result[prevCount],
            };
          } else if (prevCount === 10) {
            return {
              ...ticket,
              third: result[prevCount],
            };
          } else if (prevCount === 11) {
            return {
              ...ticket,
              fourth: result[prevCount],
            };
          }
        }
        return ticket;
      })
    );
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
  if (now.getDay() === 5) {
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    if (currentHour === 18 && currentMinute >= 0 && currentMinute <= 59) {
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
  return true;
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

export const userCannotBuyTicket = (path: string) => {
  if (path === "daily") return "Cannot Buy a Ticket between 5pm to 6pm.";
  else if (path === "weekly") return "Cannot Buy a Ticket between 6pm to 7pm.";
  else if (path === "monthly") return "Cannot Buy a Ticket between 7pm to 8pm.";

  return "";
};

export function userCannotBuyDailyTicket() {
  const now = new Date();
  const currentHour = now.getHours();
  if (currentHour >= 17 && currentHour < 19) {
    return true;
  }
  return false;
}

export function userCannotBuyWeeklyTicket() {
  const now = new Date();
  if (now.getDay() === 5) {
    const currentHour = now.getHours();

    if (currentHour >= 18 && currentHour < 20) {
      return true;
    }
  }
  return false;
}

export function userCannotBuyMonthlyTicket() {
  const now = new Date();
  const lastDayOfMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0
  ).getDate();
  if (now.getDate() === lastDayOfMonth) {
    const currentHour = now.getHours();

    if (currentHour >= 19 && currentHour < 21) {
      return true;
    }
  }
  return false;
}
