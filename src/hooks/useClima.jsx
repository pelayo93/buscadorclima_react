import { useContext } from 'react'
import climaContext from '../context/ClimaProvider'

const useCLima = () => {
  return useContext(climaContext)
}

export default useCLima
