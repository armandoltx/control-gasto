import { useState } from 'react'

import Header from './components/Header'


function App() {

  // como el presupuesto aunque se defina en el componente nuevoPresupuesto, se va a usar en otros componentes,
  // se declara en el componente principal para q todos lo puedan usar.
  const [presupuesto, setPresupuesto] = useState(0);

  return (
    <div>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
      />
    </div>
  )
}

export default App
