import { FC, useState, useContext, useEffect, useMemo } from "react";
import { User } from "@alerta-ciudadana/entity";
import { createContext } from "@/utils";

import { database } from "@/firebase";

import Cookies from "universal-cookie";
import { useAuthContext } from "../auth";
import { usePagination } from "@/hooks";

const cookies = new Cookies();

interface UserContext {
  users: any[];
  updateUser: (values: { userId: string; user: any }) => Promise<void>;
}

const UserContext = createContext<UserContext>();

const UserProvider: FC = ({ children }) => {
  // const { isAuthenticated } = useAuthContext();
  const [users, setUsers] = useState<any>([]);
  const { pagination, changeNumberPerPage, nextPage, prevPage, goToFirstPage, goToLastPage } = usePagination({
    allItems: users,
    name: "emergency",
  });
  const districtId = useMemo(() => cookies.get("district_id"), []);
  const type = useMemo(() => cookies.get("type"), []);

  let firebasePath = `users/${districtId}`

  if(type == "arequipa"){
    firebasePath= `PNP/usuario`
  }

  function getUsers() {
    database.ref(firebasePath).on("value", (snapshot) => {
      let data = snapshot.val();
      if (data) {
        const users = Object.keys(data).map((key) => ({ ...data[key], uid: key }));
        setUsers(users);
      }
    });
  }

  async function updateUser({ user, userId }: { userId: string; user: User }) {
    await database.ref(`users/${districtId}/${userId}`).update(user);
  }

  useEffect(
    () => {
      /*  isAuthenticated &&  */ getUsers();
    },
    [
      /* isAuthenticated */
    ]
  );

  return <UserContext.Provider value={{ users, updateUser }}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);

export default UserProvider;
