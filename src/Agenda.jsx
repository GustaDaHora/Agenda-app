import React, { useState, useEffect } from "react";
import AgendaItem from "./AgendaItem";

const AgendaPage = () => {
  const [formData, setFormData] = useState({
    time: "",
    title: "",
    description: "",
  });
  const [agendaData, setAgendaData] = useState([]);

  const saveToLocalStorage = (data) => {
    localStorage.setItem("agendaData", JSON.stringify(data));
  };

  const loadFromLocalStorage = () => {
    const savedData = localStorage.getItem("agendaData");
    if (savedData) {
      setAgendaData(JSON.parse(savedData));
    }
  };

  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newScheduleItem = {
      time: formData.time,
      title: formData.title,
      description: formData.description,
    };

    const updatedAgendaData = [...agendaData, newScheduleItem];
    setAgendaData(updatedAgendaData);

    saveToLocalStorage(updatedAgendaData);

    setFormData({
      time: "",
      title: "",
      description: "",
    });
  };

  // Function to delete a schedule item by index
  const deleteSchedule = (index) => {
    const updatedAgendaData = [...agendaData];
    updatedAgendaData.splice(index, 1);
    setAgendaData(updatedAgendaData);
    saveToLocalStorage(updatedAgendaData);
  };

  return (
    <div className="agenda-page">
      <h2>Agenda</h2>
      <div className="agenda-items">
        {Array.isArray(agendaData) && agendaData.length > 0 ? (
          agendaData.map((item, index) => (
            <div key={index} className="agenda-item">
              <button
                onClick={() => deleteSchedule(index)}
                className="delete-button"
              >
                Delete
              </button>
              <AgendaItem
                time={item.time}
                title={item.title}
                description={item.description}
              />
            </div>
          ))
        ) : (
          <p>No agenda items found.</p>
        )}
      </div>
      <h3>Schedule Something</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Time:
          <input
            type="date"
            name="time"
            value={formData.time}
            onChange={handleChange}
          />
        </label>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Schedule</button>
      </form>
    </div>
  );
};

export default AgendaPage;
