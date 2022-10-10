import { useState } from 'react'

import Header from './components/Header'
import Modal from './components/Modal'
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

  const handleNuevoGasto = () => {
    // console.log("nuevo gasto");
    setModal(true);
    setTimeout(() => {
      setAnimarModal(true)
    }, 300)
  }

  const guardarGasto = (gasto) => {
    console.log(gasto);
    console.log(generarId());
    gasto.id = generarId();
    console.log(`gasto.id => ${gasto.id}`);
    setGastos([...gastos, gasto ])

    setAnimarModal(false)
    setTimeout(() => {
      setModal(false);
    }, 300)
  }

  return (
    <div>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {isValidPresupuesto && (
        <div className="nuevo-gasto">
          <img
            src={IconoNuevoGasto}
            alt="icono nuevo gasto"
            onClick={handleNuevoGasto}
          />
        </div>
      )}

      {modal &&
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
      />}


    </div>
  )
}

export default App
