import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AgendaItem from "./AgendaItem";

const Container = styled.div`
  height: 100vh;

  overflow: hidden;

  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header"
    "section"
    "footer";

  form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50, -50%);
    margin: -25px 0 0 -25px;
    background-color: blue;
    display: flex;
    flex-direction: column;
  }

  header {
    grid-area: header;
    background-color: #333;
    color: white;
    width: 100%;
    display: flex;
    gap: 2rem;
    padding: 0 1rem;
  }

  section {
    box-shadow: 0px 1px inset black;
    width: 100%;
    grid-area: section;
    background-color: #333;
    padding: 1rem;
    word-wrap: break-word;
  }

  footer {
    grid-area: footer;
    width: 100%;
    background-color: #333;
    color: white;
  }
`;

const AgendaPage = () => {
  const [formData, setFormData] = useState({
    time: "",
    title: "",
    description: "",
  });
  const [agendaData, setAgendaData] = useState([]);
  const [showForm, setShowForm] = useState(false);

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
    toggleForm();
  };

  // Function to delete a schedule item by index
  const deleteSchedule = (index) => {
    const updatedAgendaData = [...agendaData];
    updatedAgendaData.splice(index, 1);
    setAgendaData(updatedAgendaData);
    saveToLocalStorage(updatedAgendaData);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <Container className="agenda-page">
      <header>
        {" "}
        <h2>Agenda</h2>
        <button onClick={toggleForm}>Nova Nota!</button>
      </header>
      <section>
        {" "}
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
      </section>
      {showForm && (
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
      )}
      <footer>Footer</footer>
    </Container>
  );
};

export default AgendaPage;
