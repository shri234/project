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
