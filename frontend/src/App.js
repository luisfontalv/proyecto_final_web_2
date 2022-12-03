import "./App.css";
import { useEffect, useState } from "react";
import api from "./api";
import Swal from "sweetalert2";

function App() {
  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
  });
  const [clients, setClients] = useState([]);

  useEffect(() => {
    getAllClients();
    //eslint-disable-next-line
  }, []);

  const getAllClients = async () => {
    const response = await api.post("/clients/getClients", {});
    setClients(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let creationObject = {
      name: form.nombre,
      lastname: form.apellidos,
    };
    if (form.nombre.trim() && form.apellidos.trim()) {
      if (form.idEditar) {
        await api.put(`/clients/${form.idEditar}`, creationObject);
        getAllClients();
        Swal.fire({
          text: "Cliente actualizado correctamente",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });

        setForm({
          nombre: "",
          apellidos: "",
        });
      } else {
        await api.post("/clients/", creationObject);
        getAllClients();
        Swal.fire({
          text: "Cliente creado correctamente",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });

        setForm({
          nombre: "",
          apellidos: "",
        });
      }
    } else {
      Swal.fire({
        text: "Deben llenarse los campos nombre y apellidos para poder crear un cliente",
        icon: "error",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/clients/${id}`);
      getAllClients();
      Swal.fire({
        text: "Cliente eliminado correctamente",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (e) {
      Swal.fire({
        text: "Ocurrió un error al eliminar al cliente",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const clear = (e) => {
    e.preventDefault();
    setForm({ nombre: "", apellidos: "" });
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Nombre</label>
                <input
                  name="nombre"
                  value={form.nombre}
                  onChange={handleInput}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label>Apellidos</label>
                <input
                  name="apellidos"
                  value={form.apellidos}
                  onChange={handleInput}
                  className="form-control"
                />
              </div>

              <button type="submit" className="btn btn-primary">
                {form.idEditar ? "Editar" : "Crear"}
              </button>
              <button type="button" onClick={clear} className="btn btn-dark">
                Limpiar
              </button>
            </form>
          </div>
          <div className="col-md-6">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellidos</th>
                  <th scope="col">Editar</th>
                  <th scope="col">Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((row, index) => (
                  <tr key={`row${index}`}>
                    <td>{row.name}</td>
                    <td>{row.lastname}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={(e) => {
                          setForm({
                            ...form,
                            idEditar: row.id,
                            nombre: row.name,
                            apellidos: row.lastname,
                          });
                        }}
                      >
                        Editar
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-warning"
                        onClick={(e) => {
                          handleDelete(row.id);
                        }}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
