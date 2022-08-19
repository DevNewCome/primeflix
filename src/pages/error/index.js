import {Link} from 'react-router-dom'
import './error.css'

function error(){
  return(
    <div className='error'>
      <h1>404</h1>
      <h2>Page not found</h2>
      <Link to="/">Veja todos os filmes</Link>
    </div>
  )
}

export default error;