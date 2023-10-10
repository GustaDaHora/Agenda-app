import React, { useState, useEffect } from "react";
import AgendaItem from "./AgendaItem";

const AgendaPage = () => {
  const [formData, setFormData] = useState({
    time: "",
    title: "",
    description: "",
  });
  const [agendaData, setAgendaData] = useState([]);

  // Function to save data to localStorage
  const saveToLocalStorage = (data) => {
    localStorage.setItem("agendaData", JSON.stringify(data));
  };

  // Function to load data from localStorage
  const loadFromLocalStorage = () => {
    const savedData = localStorage.getItem("agendaData");
    if (savedData) {
      setAgendaData(JSON.parse(savedData));
    }
  };

  useEffect(() => {
    // Load data from localStorage when the component mounts
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

    // Create a new schedule item
    const newScheduleItem = {
      time: formData.time,
      title: formData.title,
      description: formData.description,
    };

    // Update the agendaData state with the new item
    const updatedAgendaData = [...agendaData, newScheduleItem];
    setAgendaData(updatedAgendaData);

    // Save the updated data to localStorage
    saveToLocalStorage(updatedAgendaData);

    // Clear the form
    setFormData({
      time: "",
      title: "",
      description: "",
    });
  };

  return (
    <div className="agenda-page">
      <h2>Agenda</h2>
      <div className="agenda-items">
        {Array.isArray(agendaData) && agendaData.length > 0 ? (
          agendaData.map((item, index) => (
            <AgendaItem
              key={index}
              time={item.time}
              title={item.title}
              description={item.description}
            />
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
