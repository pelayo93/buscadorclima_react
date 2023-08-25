import { useState } from 'react'
import useCLima from '../hooks/useClima'
function Formulario () {
  const [alerta, setAlerta] = useState('')
  const { busqueda, datosBusqueda, consultarClima } = useCLima()
  const { ciudad, pais } = busqueda
  const hanfleSubmit = e => {
    e.preventDefault()
    if (Object.values(busqueda).includes('')) {
      setAlerta('Todos los campos son obligatorios')
      return
    }
    setAlerta('')
    consultarClima(busqueda)
  }
  return (
    <div className='contenedor'>
      {alerta && <p className='alerta'>{alerta}</p>}
      <form onSubmit={hanfleSubmit}>
        <div className='campo'>
          <label htmlFor='ciudad'>Ciudad</label>
          <input type='text' id='ciudad' name='ciudad' onChange={datosBusqueda} value={ciudad} />
        </div>
        <div className='campo'>
          <label htmlFor='pais'>País</label>
          <select name='pais' id='pais' onChange={datosBusqueda} value={pais}>
            <option value=''>-- Seleccione un País --</option>
            <option value='US'>Estados Unidos</option>
            <option value='MX'>México</option>
            <option value='AR'>Argentina</option>
            <option value='CO'>Colombia</option>
            <option value='VE'>Venezuela</option>
            <option value='CL'>Chile</option>
            <option value='CR'>Costa Rica</option>
            <option value='ES'>España</option>
            <option value='PE'>Perú</option>
          </select>
        </div>
        <input type='submit' value='consultar clima' />
      </form>
    </div>
  )
}

export default Formulario
