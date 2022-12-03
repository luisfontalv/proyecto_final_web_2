import { useEffect, useState } from "react";
import api from "../api";
import Swal from "sweetalert2";

const Jugadores = () => {
  const [form, setForm] = useState({
    nombre: "",
    vp_deporte: "",
    vp_genero: "",
    fecha_nacimiento: "",
  });

  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [sports, setSports] = useState([]);
  const [genders, setGenders] = useState([]);

  const getAllTeams = async () => {
    const response = await api.post("/team/getTeams", {});
    setTeams(response.data);
  };

  useEffect(() => {
    getAllPlayers();
    getAllTeams();
    getParameters();
    //eslint-disable-next-line
  }, []);

  const getAllPlayers = async () => {
    const response = await api.post("/player/getPlayers", {});
    setPlayers(response.data);
  };

  const getParameters = async () => {
    const response = await api.post("/parameter/getParameters", { id: [1, 2] });
    setSports(response.data[0].valoresParametro);
    setGenders(response.data[1].valoresParametro);
  };

  const transformFunction = (array, value) => {
    return array.filter((e) => e.id === value)[0]?.valor_parametro || "No tiene";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.nombre.trim() && `${form.vp_deporte}`.trim()) {
      if (form.idEditar) {
        const { data } = await api.put(`/player/${form.idEditar}`, form);

        if (data.estado === 1) {
          getAllPlayers();
          Swal.fire({
            text: "Jugador actualizado correctamente",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
          clear();
        } else {
          Swal.fire({
            text: "Hubo un error actualizando al jugador",
            icon: "error",
          });
        }
      } else {
        const { data } = await api.post("/player/", form);
        if (data.estado === 1) {
          getAllPlayers();

          Swal.fire({
            text: "Jugador creado correctamente",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });

          clear();
        } else {
          Swal.fire({
            text: "Hubo un error creando al jugador",
            icon: "error",
          });
        }
      }
    } else {
      Swal.fire({
        text: "Deben llenarse los campos nombre y deporte para poder crear un jugador",
        icon: "error",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/player/${id}`);
      getAllPlayers();
      Swal.fire({
        text: "Jugador eliminado correctamente",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (e) {
      Swal.fire({
        text: "Ocurrió un error al eliminar al jugador",
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
        <h3>Jugadores</h3>
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
              Fecha de nacimiento<span style={{ color: "red" }}>*</span>
            </label>
            <input
              name="fecha_nacimiento"
              value={form.fecha_nacimiento}
              type="date"
              onChange={handleInput}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label>
              Deporte <span style={{ color: "red" }}>*</span>
            </label>
            <select
              className="form-control"
              name="vp_deporte"
              value={form.vp_deporte}
              onChange={handleInput}
            >
              <option value="">Por favor, seleccione una opción</option>
              {sports.map((e, index) => (
                <option key={`sport${index}`} value={e.id}>
                  {e.valor_parametro}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label>
              Género <span style={{ color: "red" }}>*</span>
            </label>
            <select
              className="form-control"
              name="vp_genero"
              value={form.vp_genero}
              onChange={handleInput}
            >
              <option value="">Por favor, seleccione una opción</option>
              {genders.map((e, index) => (
                <option key={`gender${index}`} value={e.id}>
                  {e.valor_parametro}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label>
              Equipo <span style={{ color: "red" }}>*</span>
            </label>
            <select
              className="form-control"
              name="id_equipos"
              value={form.vp_genero}
              onChange={handleInput}
            >
              <option value="">Por favor, seleccione una opción</option>
              {teams.map((e, index) => (
                <option key={`team${index}`} value={e.id}>
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
              <th scope="col">Deporte</th>
              <th scope="col">Género</th>
              <th scope="col">Equipo</th>
              <th scope="col">Editar</th>
              <th scope="col">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {players.map((row, index) => (
              <tr key={`row${index}`}>
                <td>{row.nombre}</td>
                <td>{transformFunction(sports,row.vp_deporte)}</td>
                <td>{transformFunction(genders,row.vp_genero)}</td>
                <td>{row.equipo.nombre}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={(e) => {
                      setForm({
                        ...form,
                        idEditar: row.id,
                        nombre: row.nombre,
                        vp_deporte: row.vp_deporte,
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

export default Jugadores;
