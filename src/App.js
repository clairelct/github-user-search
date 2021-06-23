import React, { useState, useEffect } from "react";
import "./App.css";
import ViewEmpty from "./components/ViewEmpty";
import ViewUsers from "./components/ViewUsers";
import Card from "./components/Card";
import Logo from "./components/Logo";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState();
  const [userInput, setUserInput] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [errorLimit, setErrorLimit] = useState(false);
  const [errorNotFound, setErrorNotFound] = useState(false);

  useEffect(() => {
    if (userInput.length > 1) {
      // https://stackoverflow.com/questions/38235715/fetch-reject-promise-and-catch-the-error-if-status-is-not-ok
      // https://blog.webdevsimplified.com/2020-10/react-debounce/

      const timeout = setTimeout(() => {
        fetch(`https://api.github.com/search/users?q=${userInput}`, {
          headers: {
            authorization: "token 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",
          },
        })
          .then((response) => {
            // Handle errors (403)
            // Assuming code 403 might be rate limit issue
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
            console.log("responseJson : ", responseJson);
            if (responseJson && responseJson.total_count !== 0) {
              setUsers(responseJson.items.slice(0, 12));
              setTotalCount(responseJson.total_count);
              setIsLoading(false);
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

    if (userInput.length <= 1) {
      setUsers([]);
      setTotalCount(0);
    }
  }, [userInput]);

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
