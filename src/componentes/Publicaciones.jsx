import { useEffect, useState } from "react";
import {
  obtenerPublicaciones,
  crearPublicacion,
  actualizarPublicacion,
  eliminarPublicacion,
} from "../servicios/publicaciones";

import "./Publicaciones.css";

function Publicaciones() {
  const [lista, setLista] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");

  const [publicacionEditando, setPublicacionEditando] = useState(null);

  useEffect(() => {
    cargarPublicaciones();
  }, []);

  async function cargarPublicaciones() {
    setCargando(true);

    const { data, error } = await obtenerPublicaciones();

    if (error) {
      alert(error.message);
      setCargando(false);
      return;
    }

    setLista(data);
    setCargando(false);
  }

  function iniciarEdicion(publicacion) {
    setPublicacionEditando(publicacion.id);
    setTitulo(publicacion.titulo);
    setContenido(publicacion.contenido);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function cancelarEdicion() {
    setPublicacionEditando(null);
    setTitulo("");
    setContenido("");
  }

  async function handleGuardar(e) {
    e.preventDefault();

    let error;

    if (publicacionEditando) {
      const respuesta = await actualizarPublicacion(
        publicacionEditando,
        {
          titulo,
          contenido,
        }
      );

      error = respuesta.error;
    } else {
      const respuesta = await crearPublicacion({
        titulo,
        contenido,
      });

      error = respuesta.error;
    }

    if (error) {
      alert(error.message);
      return;
    }

    setTitulo("");
    setContenido("");
    setPublicacionEditando(null);

    await cargarPublicaciones();
  }

  async function handleEliminar(id) {
    const confirmar = window.confirm(
      "¿Estás seguro de que querés borrar esta publicación?"
    );

    if (!confirmar) {
      return;
    }

    const { error } = await eliminarPublicacion(id);

    if (error) {
      alert(error.message);
      return;
    }

    await cargarPublicaciones();
  }

  if (cargando) {
    return <p>Cargando publicaciones...</p>;
  }

  return (
    <div className="pagina">

      <div className="franja"></div>

      <main className="contenedor">

        <h1 className="titulo-principal">
          Gestión de Publicaciones
        </h1>

        <section className="tarjeta-formulario">

          <h2>
            {publicacionEditando
              ? "Editar publicación"
              : "Crear publicación"}
          </h2>

          <form onSubmit={handleGuardar}>

            <div className="grupo-formulario">
              <label>Título</label>

              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
              />
            </div>

            <div className="grupo-formulario">
              <label>Contenido</label>

              <textarea
                value={contenido}
                onChange={(e) => setContenido(e.target.value)}
                required
              />
            </div>

            <div className="botones-formulario">

              <button
                className="boton boton-principal"
                type="submit"
              >
                {publicacionEditando
                  ? "Guardar cambios"
                  : "Crear publicación"}
              </button>

              {publicacionEditando && (
                <button
                  className="boton boton-cancelar"
                  type="button"
                  onClick={cancelarEdicion}
                >
                  Cancelar
                </button>
              )}

            </div>

          </form>

        </section>

        <h2 className="titulo-listado">
          Publicaciones recientes
        </h2>

        {lista.length === 0 ? (

          <p className="sin-publicaciones">
            Todavía no hay publicaciones.
          </p>

        ) : (

          <div className="lista-publicaciones">

            {lista.map((publicacion) => (

              <article
                className="publicacion"
                key={publicacion.id}
              >

                <h3>{publicacion.titulo}</h3>

                <p className="contenido-publicacion">
                  {publicacion.contenido}
                </p>

                <p className="fecha">
                  Publicado el{" "}
                  {new Date(
                    publicacion.creado_en
                  ).toLocaleDateString("es-AR")}
                </p>

                <div className="acciones">

                  <button
                    className="boton boton-editar"
                    onClick={() =>
                      iniciarEdicion(publicacion)
                    }
                  >
                    Editar
                  </button>

                  <button
                    className="boton boton-borrar"
                    onClick={() =>
                      handleEliminar(publicacion.id)
                    }
                  >
                    Borrar
                  </button>

                </div>

              </article>

            ))}

          </div>

        )}

      </main>
    </div>
  );
}

export default Publicaciones;