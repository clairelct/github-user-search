import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [isLoading] = useState(false);
  const [users, setUsers] = useState();
  const [userInput, setUserInput] = useState("");
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
              setUsers(responseJson.items.slice(0, 8));
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
  }, [errorNotFound]);

  return isLoading ? (
    <p>wait a minute... ;-)</p>
  ) : (
    <>
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

      {users &&
        !errorNotFound &&
        users.map((user, index) => {
          return <p key={index}>{user.login}</p>;
        })}

      {errorLimit && <p className="warning">Rate limit exceeded</p>}
      {errorNotFound && <p className="warning">User not found</p>}
    </>
  );
}

export default App;
