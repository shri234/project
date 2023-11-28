export const isAuthenticated = (role: string) => {
  if (
    sessionStorage.getItem("is_logged") === "true" &&
    sessionStorage.getItem("role")?.toLowerCase() === role.toLowerCase()
  ) {
    return true;
  } else {
    window.location.href = "/login-page";
    return (window.location.href = "/login-page");
  }
};
