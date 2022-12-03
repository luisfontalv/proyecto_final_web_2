import { useEffect, useState } from "react";
import api from "../api";
import Swal from "sweetalert2";

const Equipos = () => {
  const [form, setForm] = useState({
    nombre: "",
    vp_deporte: "",
  });
  const [teams, setTeams] = useState([]);
  const [sports, setSports] = useState([]);

  useEffect(() => {
    getAllTeams();
    getSports();
    //eslint-disable-next-line
  }, []);

  const getAllTeams = async () => {
    const response = await api.post("/team/getTeams", {});
    setTeams(response.data);
  };

  const getSports = async () => {
    const response = await api.post("/parameter/getParameters", { id: 1 });
    setSports(response.data[0].valoresParametro);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.nombre.trim() && `${form.vp_deporte}`.trim()) {
      if (form.idEditar) {
        const { data } = await api.put(`/team/${form.idEditar}`, form);

        if (data.estado === 1) {
          getAllTeams();
          Swal.fire({
            text: "Equipo actualizado correctamente",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
          clear()
        } else {
          Swal.fire({
            text: "Hubo un error actualizando al equipo",
            icon: "error",
          });
        }
      } else {
        const { data } = await api.post("/team/", form);
        if (data.estado === 1) {
          getAllTeams();

          Swal.fire({
            text: "Equipo creado correctamente",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });

          clear();
        } else {
          Swal.fire({
            text: "Hubo un error creando al equipo",
            icon: "error",
          });
        }
      }
    } else {
      Swal.fire({
        text: "Deben llenarse los campos nombre y deporte para poder crear un equipo",
        icon: "error",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/team/${id}`);
      getAllTeams();
      Swal.fire({
        text: "Equipo eliminado correctamente",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (e) {
      Swal.fire({
        text: "Ocurrió un error al eliminar al equipo",
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
        <h3>Equipos</h3>
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
              <th scope="col">Editar</th>
              <th scope="col">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((row, index) => (
              <tr key={`row${index}`}>
                <td>{row.nombre}</td>
                <td>{row.vp_deporte}</td>
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

export default Equipos;
