import { useState, useEffect } from 'react'

import Header from './components/Header'
import Modal from './components/Modal'
import ListadoGastos from './components/ListadoGastos';

import { generarId } from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'


function App() {

  // como el presupuesto aunque se defina en el componente nuevoPresupuesto, se va a usar en otros componentes,
  // se declara en el componente principal para q todos lo puedan usar.
  const [presupuesto, setPresupuesto] = useState(0);
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

  const handleNuevoGasto = () => {
    // console.log("nuevo gasto");
    setModal(true);
    setGastoEditar({})
    setTimeout(() => {
      setAnimarModal(true)
    }, 300)
  }

  const guardarGasto = (gasto) => {
    // console.log(gasto);
    // console.log(generarId());
    if(gasto.id) {
      // Actualizar gasto
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados);
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
      />}


    </div>
  )
}

export default App
