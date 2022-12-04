import { useEffect, useState } from "react";
import api from "../api";
import Swal from "sweetalert2";

const Premios = () => {
  const [form, setForm] = useState({
    nombre: "",
    fecha: "",
    id_deportistas: "",
  });

  const [awards, setAwards] = useState([]);
  const [players, setPlayers] = useState([]);

  const getAllAwards = async () => {
    const response = await api.post("/award/getAwards", {});
    setAwards(response.data);
  };

  useEffect(() => {
    getAllPlayers();
    getAllAwards();
    //eslint-disable-next-line
  }, []);

  const getAllPlayers = async () => {
    const response = await api.post("/player/getPlayers", {});
    setPlayers(response.data);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.nombre.trim() && `${form.vp_deporte}`.trim()) {
      if (form.idEditar) {
        const { data } = await api.put(`/award/${form.idEditar}`, form);

        if (data.estado === 1) {
          getAllPlayers();
          Swal.fire({
            text: "Premio actualizado correctamente",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
          clear();
        } else {
          Swal.fire({
            text: "Hubo un error actualizando al premio",
            icon: "error",
          });
        }
      } else {
        const { data } = await api.post("/award/", form);
        if (data.estado === 1) {
          getAllPlayers();

          Swal.fire({
            text: "Premio creado correctamente",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });

          clear();
        } else {
          Swal.fire({
            text: "Hubo un error creando al premio",
            icon: "error",
          });
        }
      }
    } else {
      Swal.fire({
        text: "Deben llenarse los campos nombre y deporte para poder crear un premio",
        icon: "error",
      });
    }
  };

  const convertDate = (date) => {
    function padTo2Digits(num) {
      return num.toString().padStart(2, "0");
    }
    const [year, month, day] = date.split("-");
    const result = [padTo2Digits(month), padTo2Digits(day), year].join("/");
    return result;
  };
  const handleDelete = async (id) => {
    try {
      await api.delete(`/award/${id}`);
      getAllPlayers();
      Swal.fire({
        text: "Premio eliminado correctamente",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (e) {
      Swal.fire({
        text: "Ocurrió un error al eliminar al premio",
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
    if (e) {
      e.preventDefault();
    }
    setForm({ nombre: "", vp_deporte: "" });
  };

  return (
    <div className="row">
      <div className="col-md-12 text-center">
        <h3>Premios</h3>
      </div>
      <div className="col-md-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>
              Nombre<span style={{ color: "red" }}>*</span>
            </label>
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleInput}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label>
              Fecha de entrega del premio<span style={{ color: "red" }}>*</span>
            </label>
            <input
              name="fecha"
              value={form.fecha}
              type="date"
              onChange={handleInput}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label>
              Deportista <span style={{ color: "red" }}>*</span>
            </label>
            <select
              className="form-control"
              name="id_deportistas"
              value={form.id_deportistas}
              onChange={handleInput}
            >
              <option value="">Por favor, seleccione una opción</option>
              {players.map((e, index) => (
                <option key={`player${index}`} value={e.id}>
                  {e.nombre}
                </option>
              ))}
            </select>
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
              <th scope="col">Nombre del deportista</th>
              <th scope="col">Fecha de entrega del premio</th>
              <th scope="col">Editar</th>
              <th scope="col">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {awards.map((row, index) => (
              <tr key={`row${index}`}>
                <td>{row.nombre}</td>
                <td>{row.deportista.nombre}</td>
                <td>{convertDate(row.fecha)}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={(e) => {
                      setForm({
                        ...form,
                        idEditar: row.id,
                        nombre: row.nombre,
                        id_deportistas: row.id_deportistas,
                        fecha: row.fecha
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
  );
};

export default Premios;
