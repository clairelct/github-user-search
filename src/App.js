import React, { useState, useEffect } from "react";
import "./App.css";
import ViewEmpty from "./components/ViewEmpty";
import ViewUsers from "./components/ViewUsers";
import Card from "./components/Card";
import Logo from "./components/Logo";
const REACT_APP_GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

function App() {
  const [users, setUsers] = useState();
  const [userInput, setUserInput] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [errorLimit, setErrorLimit] = useState(false);
  const [errorNotFound, setErrorNotFound] = useState(false);

  // FETCH DATA
  useEffect(() => {
    if (userInput.length > 1) {
      // Use debounce to minimize rate limit issues
      const timeout = setTimeout(() => {
        fetch(`https://api.github.com/search/users?q=${userInput}`, {
          headers: {
            authorization: `token ${REACT_APP_GITHUB_TOKEN}`,
          },
        })
          .then((response) => {
            // Handle errors
            // Assuming code 403 might be 'rate limit' issue
            if (response.ok) {
              return response.json();
            } else {
              if (response.status === 403) {
                setErrorLimit(true);
              }
            }
          })
          .then((responseJson) => {
            // Access the data
            //console.log("responseJson : ", responseJson);
            if (responseJson && responseJson.total_count !== 0) {
              setUsers(responseJson.items.slice(0, 12));
              setTotalCount(responseJson.total_count);
            } else {
              setErrorNotFound(true);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }, 300);

      return () => clearTimeout(timeout);
    }
    // Reset data if input is empty
    if (userInput.length <= 1) {
      setUsers([]);
      setTotalCount(0);
    }
  }, [userInput]);

  // REMOVE ERROR MESSAGES after 3.5s
  useEffect(() => {
    setTimeout(() => {
      setErrorLimit(false);
    }, 3500);
  }, [errorLimit]);

  useEffect(() => {
    setTimeout(() => {
      setErrorNotFound(false);
    }, 3500);
    setTotalCount(0);
  }, [errorNotFound]);

  return (
    <main>
      <div className="container">
        <header>
          <Logo />
          <h1>Github User Search</h1>
          <input
            type="search"
            id="user-search"
            name="user-search"
            value={userInput}
            onChange={(event) => {
              setUserInput(event.target.value);
              setErrorLimit(false);
            }}
          />
        </header>

        <section>
          {users && users.length > 0 ? (
            <ViewUsers
              totalCount={totalCount}
              users={users}
              errorNotFound={errorNotFound}
              errorLimit={errorLimit}
            />
          ) : (
            <ViewEmpty />
          )}
        </section>
        <footer>Claire Leconte - for FULLL</footer>
      </div>
    </main>
  );
}

export default App;
