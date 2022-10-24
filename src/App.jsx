import { useState, useEffect, useLayoutEffect } from 'react'

import Header from './components/Header'
import Modal from './components/Modal'
import ListadoGastos from './components/ListadoGastos';

import { generarId } from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'


function App() {

  // como el presupuesto aunque se defina en el componente nuevoPresupuesto, se va a usar en otros componentes,
  // se declara en el componente principal para q todos lo puedan usar.
  const [presupuesto, setPresupuesto] = useState( Number(localStorage.getItem('presupuesto')) ?? 0 );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false)
  const [gastos, setGastos] = useState([])
  const [gastoEditar, setGastoEditar] = useState({})

  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0) {
      // console.log("gasto editar");
      setModal(true);
      setTimeout(() => {
        setAnimarModal(true)
      }, 300)
    }
  },[gastoEditar])

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  },[presupuesto])

  const handleNuevoGasto = () => {
    // console.log("nuevo gasto");
    setModal(true);
    setGastoEditar({})
    setTimeout(() => {
      setAnimarModal(true)
    }, 300)
  }

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;

    if(presupuestoLS > 0) setIsValidPresupuesto(true)
  },[])

  const guardarGasto = (gasto) => {
    // console.log(gasto);
    // console.log(generarId());
    if(gasto.id) {
      // Actualizar gasto
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados);
      setGastoEditar({})
    } else {
      // Nuevo Gasto
      gasto.id = generarId();
      // console.log(`gasto.id => ${gasto.id}`);
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto ])
    }

    setAnimarModal(false)
    setTimeout(() => {
      setModal(false);
    }, 300)
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
    // filter nos trae todos los q no tengan esa id
    // console.log("gastosActualizados en eliminar gasto ", gastosActualizados);
    setGastos(gastosActualizados);

  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="icono nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>

      )}

      {modal &&
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
      />}


    </div>
  )
}

export default App
