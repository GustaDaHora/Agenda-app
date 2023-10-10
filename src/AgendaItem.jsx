import React from "react";

const AgendaItem = ({ time, title, description }) => {
  return (
    <div className="agenda-item">
      <div className="agenda-item-time">{time}</div>
      <div className="agenda-item-details">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default AgendaItem;
