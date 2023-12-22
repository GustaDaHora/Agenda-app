import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AgendaItem from "./AgendaItem";

const Container = styled.div`
  word-wrap: break-word;
  color: #fff;

  header {
    background-color: #333;
    text-align: center;

    > button {
      font-size: 1rem;
      background-color: #fff;
      color: #333;
      padding: 1rem;
      border-radius: 15px 15px 0 0;
      border: 2px solid black;

      &:hover {
        opacity: 80%;
        cursor: pointer;
      }
    }
  }

  button {
    font-size: 1rem;
    background-color: #fff;
    color: #333;
    padding: 0.5rem 1rem;
    margin: 1rem;
    border-radius: 15px;
    border: 2px solid black;

    &:hover {
      opacity: 80%;
      cursor: pointer;
    }
  }

  form {
    position: fixed;
    background-color: #0a0a0a;
    top: 55%;
    left: 50%;
    width: 23%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    place-items: center;
    font-size: 1.5rem;
    padding: 2rem;
    border-radius: 15px 15px 0 0;
    border: 2px solid black;
    > label {
      display: flex;
      flex-direction: column;
      place-items: center;
      padding: 0.5rem 2rem;
      margin: 0 2rem;
    }
    input {
      padding: 0.5rem;
      &:hover {
        opacity: 80%;
        cursor: pointer;
      }
    }
    textarea {
      padding: 0.5rem 1rem;
      &:hover {
        opacity: 80%;
        cursor: pointer;
      }
    }
  }

  main {
    padding: 2rem;
    min-height: 66.7vh;
    background-color: #333;
    box-shadow: 0 2px 2px inset #0a0a0a;

    > div {
      > div {
        border-bottom: 3px dashed black;
      }
    }

    .delete-button {
      font-size: 1rem;
      background-color: #fff;
      color: #ce2d00;
      padding: 0.5rem 0.8rem;
      border-radius: 10px;
      border: 2px solid black;
      margin-bottom: 1rem;
      &:hover {
        opacity: 80%;
        cursor: pointer;
      }
    }
  }

  footer {
    background-color: #333;
    box-shadow: 0 2px 2px inset #0a0a0a;
    text-align: center;
    padding: 10px;
  }

  @media (max-width: 900px) {
    header {
      padding: 0;
      > button {
        font-size: 0.8rem;
        padding: 0.5rem;
        border-radius: 5px 5px 0 0;
      }
    }
    form {
      width: 40%;
      font-size: 1.2rem;
      padding: 0.5rem;
      border-radius: 5px;
      border: 2px solid black;
      > label {
        display: flex;
        flex-direction: column;
        place-items: center;
        padding: 0 1rem;
        margin: 0 1rem;
      }
      > button {
        font-size: 1rem;
        padding: 0.5rem 1rem;
        margin: 0.5rem;
        border-radius: 5px;
        &:hover {
          opacity: 80%;
          cursor: pointer;
        }
      }
      input {
        padding: 0.5rem;
        &:hover {
          opacity: 80%;
          cursor: pointer;
        }
      }
      textarea {
        padding: 0.5rem 1rem;
        &:hover {
          opacity: 80%;
          cursor: pointer;
        }
      }
    }
    main {
      min-height: 73.6vh;
    }

    footer {
      padding: 5px;
    }
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
  const [editIndex, setEditIndex] = useState(null);

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

    let updatedAgendaData;
    if (editIndex !== null) {
      // If editIndex is not null, it means we are editing an existing schedule
      updatedAgendaData = [...agendaData];
      updatedAgendaData[editIndex] = newScheduleItem;
    } else {
      // If editIndex is null, it means we are adding a new schedule
      updatedAgendaData = [...agendaData, newScheduleItem];
    }

    setAgendaData(updatedAgendaData);
    saveToLocalStorage(updatedAgendaData);

    setFormData({
      time: "",
      title: "",
      description: "",
    });

    setEditIndex(null);
    toggleForm();
  };

  const editSchedule = (index) => {
    setEditIndex(index);
    const selectedSchedule = agendaData[index];
    setFormData({
      time: selectedSchedule.time,
      title: selectedSchedule.title,
      description: selectedSchedule.description,
    });
    setShowForm(true);
  };

  const deleteSchedule = (index) => {
    if (confirm("Deseja deletar essa nota?")) {
      const updatedAgendaData = [...agendaData];
      updatedAgendaData.splice(index, 1);
      setAgendaData(updatedAgendaData);
      saveToLocalStorage(updatedAgendaData);
    } else {
      return;
    }
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
      <main>
        {" "}
        <div className="agenda-items">
          {Array.isArray(agendaData) && agendaData.length > 0 ? (
            agendaData.map((item, index) => (
              <div key={index} className="agenda-item">
                <AgendaItem
                  time={item.time}
                  title={item.title}
                  description={item.description}
                />
                <button
                  onClick={() => deleteSchedule(index)}
                  className="delete-button"
                >
                  Deletar
                </button>
                <button onClick={() => editSchedule(index)}>Edit</button>
              </div>
            ))
          ) : (
            <p>Nenhuma nota ainda.</p>
          )}
        </div>
      </main>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <label>
            Data:
            <input
              type="date"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Título:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Descrição:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
          </label>
          <button type="submit">Agendar</button>
        </form>
      )}
      <footer>
        <p>Feito por Gustavo da Hora &copy; 2023 </p>
      </footer>
    </Container>
  );
};

export default AgendaPage;
