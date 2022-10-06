import CerrarBtn from '../img/cerrar.svg';

const Modal = ({setModal, animarModal, setAnimarModal}) => {
  const ocultarModal = () => {
    // console.log('ocultando...');
    setAnimarModal(false)
    setTimeout(() => {
      setModal(false);
    }, 300)
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
      <form className={`formulario ${animarModal ? "animar" : 'cerrar'}`}>
        <legend>Nuevo Gasto</legend>

        <div className="campo">
          <label htmlFor="nombre">Nombre Gasto</label>
          <input
            type="text"
            placeholder='Agrega el Nombre del Gasto'
            name=""
            id="nombre"
          />
        </div>

        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            type="number"
            placeholder='Agrega la Cantidad del Gasto: ej.200'
            name=""
            id="cantidad"
          />
        </div>

        <div className="campo">
          <label htmlFor="categoria">Categoria</label>
          <select
            id="categoria"
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
          value="Agregar Gasto"
        />
      </form>
    </div>
  );
};

export default Modal;