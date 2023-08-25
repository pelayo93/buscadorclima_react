import Formulario from './Formulario'
import Resultado from './Resultado'
import useCLima from '../hooks/useClima'
import Spinner from './Spinner'

function AppClima () {
  const { resultado, cargando, noResultado } = useCLima()
  return (
    <>
      <main className='dos-columnas'>
        <Formulario />
        {/* Optional ? para evitar posibles errores tratar de usarlo en obejtos  */}
        {cargando ? <Spinner /> : resultado?.name ? <Resultado /> : noResultado ? <p>Error en La busqueda</p> : null}
      </main>
    </>
  )
}

export default AppClima
