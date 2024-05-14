import React, { useState, useEffect } from "react";
import Program from "./components/program";
import Formular from "./components/formular";
import { Route, Routes, NavLink, useNavigate } from "react-router-dom";
import "../src/App.css";
import Lipsa from "./components/lipsa";
import { Container, Nav, Navbar } from "react-bootstrap";

export default function App() {
  const [lista, setLista] = useState([]);
  const [edit, setEdit] = useState({
    id: 0,
    ora: "",
    titlu: "",
    loc: "",
    descriere: "",
    imageName: "",
  });

  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:5050/")
      .then((rezultat) => rezultat.json())
      .then((data) => setLista(data))

  }, []);

  const stergActiv = (id) => {
    const config = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    };
    fetch(`http://localhost:5050/sterg/${id}`, config)
      .then((resp) => resp.json())
      .then((data) => {
        setLista(data);
      });
  };

  const adaugaActiv = (act) => {
    const config = {
      method: "POST",
      body: JSON.stringify(act),
      headers: {
        "Content-type": "application/json",
      },
    };
    fetch("http://localhost:5050/adaug", config) // Ruta catre server, diferita pentru fiecare aplicatie in CodeSandbox
      .then((resp) => resp.json())
      .then((data) => {
        setLista(data);
      });
    navigate("/")
  };

  const editeazaActiv = (id) => {
    var obiect = lista.find((item) => item.id === id);
    if (obiect) {
      setEdit({
        id: obiect.id,
        ora: obiect.ora,
        titlu: obiect.titlu,
        loc: obiect.loc,
        descriere: obiect.descriere,
      });
      navigate("/components/formular");
    }
  };

  const editActiv = (elm) => {
    const config = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(elm),
    };

    //Corectez in baza de date
    fetch("http://localhost:5050/editez", config)
      .then((resp) => resp.json())
      .then((data) => {
        setLista(data);
        navigate("/");
      });

    //Golesc obiectul "edit" din "state"

    setEdit({
      id: 0,
      ora: "",
      titlu: "",
      loc: "",
      descriere: "",
    });
  };

  const stil = {
    container: { maxWidth: "700px" },
    h2: { textAlign: "center" },
  };

  return (
    <Container style={stil.container}>
      <Navbar bg="primary" variant="dark" expand="sm" className="p-2">
        <Navbar.Brand href="/">MYFIRSTAPP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">

            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "inactive")}
            >
              Program
            </NavLink>
            <NavLink
              to="components/formular"
              className={({ isActive }) => (isActive ? "active" : "inactive")}
            >
              Formular
            </NavLink>
            {/* <>
              Search:
              <input value={""} onChange={""} type="search" />
            </> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={<Program activitati={lista} sterge={stergActiv} editeaza={editeazaActiv} />}
        />
        <Route
          path="components/formular"
          element={<Formular transmit={adaugaActiv} obedit={edit} editez={editActiv} />}
        />
        <Route path="*" element={<Lipsa />} />
      </Routes>
    </Container>
  );
};
