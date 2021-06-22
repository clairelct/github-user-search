import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState();
  const [search, setSearch] = useState("");

  const handleOnChange = (event) => {
    //debounce
    //const search = event.target.value;
    setSearch(event.target.value);

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/search/users?q=${search}`
        );
        if (response.status === 200) {
          setUsers(response.data.items);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  };

  console.log("users : ", users);

  return isLoading ? (
    <p>wait a minute... ;-)</p>
  ) : (
    <>
      <h1>Github User Search</h1>
      <input
        type="search"
        id="user-search"
        name="user-search"
        value={search}
        onChange={handleOnChange}
      />

      {users &&
        users.map((user, index) => {
          return <p key={index}>{user.login}</p>;
        })}
    </>
  );
}

export default App;
