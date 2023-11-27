export const formattedDate = (value: string) => {
  return `${new Date(value).getFullYear()}-${
    new Date().getMonth() + 1
  }-${new Date().getDate()}`;
};

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
