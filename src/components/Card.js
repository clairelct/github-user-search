import React from "react";

const Card = ({ user }) => {
  return (
    <div className="card-container">
      {/* Left column */}
      <div className="col-avatar">
        <img src={user.avatar_url} alt={`Avatar de ${user.login}`} />
      </div>

      {/* Right column */}
      <div className="col-content">
        <p className="user-login">{user.login}</p>
        <a className="button" href={user.html_url} target="_blank">
          See Github profile
        </a>
      </div>
    </div>
  );
};

export default Card;
