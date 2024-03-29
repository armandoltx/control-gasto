import { useState, useEffect } from 'react';
import Mensaje from './Mensaje';
import CerrarBtn from '../img/cerrar.svg';

const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar}) => {
  const [mensaje, setMensaje] = useState('')
  const [nombre, setNombre] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [categoria, setCategoria] = useState('')
  const [fecha, setFecha] = useState('')
  const [id, setId] = useState('')

  useEffect(() => {
    if( Object.keys(gastoEditar).length > 0 ) {
      setNombre(gastoEditar.nombre)
      setCantidad(gastoEditar.cantidad)
      setCategoria(gastoEditar.categoria)
      setId(gastoEditar.id)
      setFecha(gastoEditar.fecha)
    }
  }, []);


  const ocultarModal = () => {
    // console.log('ocultando...');
    setAnimarModal(false)
    setGastoEditar({})
    setTimeout(() => {
      setModal(false);
    }, 300)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('enviando formulario');
    if([ nombre, cantidad, categoria ].includes('')) {
      // console.log('Validnado campos vacios');
      setMensaje('Todos los campos son obligatorios.');
      setTimeout(() => {
        setMensaje('');
      }, 2000)
      return;
    }

    guardarGasto({nombre, cantidad, categoria, id, fecha});
  }

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img
          src={CerrarBtn}
          alt="cerrar modal"
          onClick={ocultarModal}
        />
      </div>
      <form
        className={`formulario ${animarModal ? "animar" : 'cerrar'}`}
        onSubmit={handleSubmit}
      >
        <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

        <div className="campo">
          <label htmlFor="nombre">Nombre Gasto</label>
          <input
            type="text"
            placeholder='Agrega el Nombre del Gasto'
            name=""
            id="nombre"
            value={nombre}
            onChange={ e => setNombre(e.target.value) }
          />
        </div>

        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            type="number"
            placeholder='Agrega la Cantidad del Gasto: ej.200'
            name=""
            id="cantidad"
            value={cantidad}
            onChange={ e => setCantidad(Number(e.target.value)) }
          />
        </div>

        <div className="campo">
          <label htmlFor="categoria">Categoria</label>
          <select
            id="categoria"
            value={categoria}
            onChange={ e => setCategoria(e.target.value) }
          >
              <option value="">-- Seleccione --</option>
              <option value="ahorro">Ahorro</option>
              <option value="comida">Comida</option>
              <option value="casa">Casa</option>
              <option value="ocio">Ocio</option>
              <option value="salud">Salud</option>
              <option value="suscripciones">Suscripciones</option>
          </select>
        </div>
        <input
          type="submit"
          value={gastoEditar.nombre ? 'Guardar Cambios' : "Agregar Gasto"}
        />
      </form>
    </div>
  );
};

export default Modal;