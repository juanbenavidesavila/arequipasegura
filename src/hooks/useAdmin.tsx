import Cookies from "universal-cookie";

const cookies = new Cookies();

export const useAdmin = () => {
  const hasSuperAdmin = cookies.get("hasSuperAdmin") === "true";

  return { hasSuperAdmin };
};
