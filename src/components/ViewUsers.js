import React from "react";
import Card from "./Card";

const ViewUsers = ({ totalCount, users, errorNotFound, errorLimit }) => {
  return (
    <>
      {totalCount > 0 && (
        <div className="panel-info">
          <p>
            <span>{totalCount}</span>users found
          </p>
        </div>
      )}

      {!errorNotFound &&
        users.map((user) => {
          return <Card key={user.id} user={user} />;
        })}

      {errorLimit && <p className="warning">Rate limit exceeded</p>}
      {errorNotFound && <p className="warning">User not found :-(</p>}
    </>
  );
};

export default ViewUsers;
