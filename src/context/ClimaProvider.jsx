import { createContext, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

const climaContext = createContext()

function ClimaProvider ({ children }) {
  ClimaProvider.propTypes = {
    children: PropTypes.node
  }
  const [busqueda, setBusqueda] = useState({
    ciudad: '',
    pais: ''
  })
  const [resultado, setResultado] = useState({})
  const [cargando, setCargando] = useState(false)
  const [noResultado, setNoResultado] = useState(false)
  const datosBusqueda = e => {
    setBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value
    })
  }
  const consultarClima = async datos => {
    setCargando(true)
    setNoResultado(false)
    try {
      const { ciudad, pais } = datos
      const appId = import.meta.env.VITE_API_KEY
      const url = `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${appId}`
      const { data } = await axios(url)
      const { lat, lon } = data[0]
      const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`
      const { data: clima } = await axios(urlClima)
      setResultado(clima)
    } catch (error) {
      setNoResultado(true)
      setResultado({})
      console.error(error)
    } finally {
      setCargando(false)
      setNoResultado(true)
    }
  }
  return (
    <climaContext.Provider
      value={{
        busqueda,
        datosBusqueda,
        consultarClima,
        resultado,
        cargando,
        noResultado
      }}
    >
      {children}
    </climaContext.Provider>
  )
}

export {
  ClimaProvider
}

export default climaContext
