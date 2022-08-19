import {useEffect, useState} from 'react';
import './filme.css'
import {useParams, useNavigate} from 'react-router-dom';
import api from '../../services/api'

function Filme(){
  const {id} = useParams();
  const navigate = useNavigate();
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    async function loadFilme(){
      await api.get(`/movie/${id}`,{
        params:{
          api_key:'1728816a402a07893f04b1af16b895cd',
          language: "pt-BR",
        }
      })
        .then((response)=>{ //caso encontre o filme
          setFilme(response.data)
          setLoading(false)
        })
        .catch(()=>{
          navigate("/", {replace: true}) //caso nao encontre o filme
          return;
        })
    }

    loadFilme();

    return()=>{

    }
  }, [navigate, id])

  function salvarFilme(){
    const minhaLista = localStorage.getItem("@primeflix")
    let filmeSalvo = JSON.parse(minhaLista) || [];
    const hasFilme = filmeSalvo.some((filmeSalvo)=> filmeSalvo.id === filme.id)

      if(hasFilme){
        alert('esse filme ja esta na lista')
        return;
      } 
      filmeSalvo.push(filme);
      localStorage.setItem("@primeflix", JSON.stringify(filmeSalvo));
      alert('filme salvo com sucesso')
  }

  if(loading){
    return(
      <div className='filme-info'>
          <h1>carregando filmes</h1>
      </div>
    )
  }
  return(
    <div className='filme-info'>
        <h1>{filme.title}</h1>
        <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}></img>
        <h3>Sinopse</h3>
        <span>{filme.overview}</span>
        <strong>avaliação: {filme.vote_average}/10</strong>
        <div className='area-buttons'>
          <button onClick={salvarFilme}>Salvar</button>
          <button>
            <a target="blank" rel="external"  href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a>
          </button>
       </div>
    </div>
    
  )
}

export default Filme;