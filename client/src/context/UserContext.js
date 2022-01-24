import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import domain from "../util/domain";

const UserContext = createContext();

function UserContextProvider(props) {
  const [user, setUser] = useState(undefined);

  async function getUser() {
    const userRes = await axios.get(`${domain}/auth/loggedIn`);
    setUser(userRes.data);
    
  }

  console.log(user)

  

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, getUser }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
export { UserContextProvider };
