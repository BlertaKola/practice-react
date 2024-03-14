import { useEffect, useState } from "react"
import axios from 'axios'
import { Link } from "react-router-dom"
import Home from '../components/Home'

const Main = (props) => {
    const {userId} = props
    const [movies, setMovies] = useState([])
    const [updated, setUpdated] = useState(false)

    useEffect(()=>{
        axios.get('http://localhost:8000/api/movies')
            .then(res => {
                console.log(res.data)
                setUpdated(true)
            })
            .catch(err => console.log(err))
    },[])
    const removeFromDom =(id) => {
        setMovies(movies.filter(movie => movie._id !== id))
    }

    
    return(
        <>
            <h1>Movie List</h1>
            <Link to="/movies/new">Add a new movie</Link>

            {updated && <Home userId={userId} movies={movies} removeFromDom={removeFromDom}></Home>}
        </>
    )
}
export default Main