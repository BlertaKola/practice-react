import { Link } from "react-router-dom";
import LogOut from "./LogOut";
import { useEffect, useState } from "react";
import axios from 'axios';
import './Home.css'; // Import CSS file for styling

const Home = (props) => {
    const {userId} = props;
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    const [movies, setMovies] = useState([]);

    const [updated, setUpdated] = useState(false);

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/users/${userId}`, {withCredentials: true})
            .then(res => {
                setUser({
                    firstName: res.data[0].firstName,
                    lastName: res.data[0].lastName,
                    email: res.data[0].email
                });
            })
            .catch(err => console.log(err));
    },[userId]);

    useEffect(()=>{
        axios.get('http://localhost:8000/api/movies',{withCredentials: true})
            .then(res => {
                setMovies(res.data);
                setUpdated(!updated);
            })
            .catch(err => console.log(err));
    },[updated]);

    const average = (array) => {
        let sum = 0;
        for(let i=0; i< array.length; i++){
            sum = sum + parseInt(array[i].rating);
        }
        const avg = sum / array.length;
        return avg.toFixed(1); 
    };

    return(
        <>
        <LogOut></LogOut>
        <h1 className="page-title">Movie List</h1>

        <table className="movie-table">
            <thead>
                <tr>
                    <th>Movie Title</th>
                    <th>Avg Rating</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {movies.map((movie, index)=>{
                    return(
                        <tr key={index}>
                            <td>{movie.title}</td>
                            <td>{average(movie.reviews)}</td>
                            <td>
                                <div className="action-buttons">
                                    <button className="read-review-button"> <Link to={`/movies/${movie._id}/reviews`}>Read Reviews</Link> </button>
                                    <button className="write-review-button"><Link to={`/movies/${movie._id}/reviews/new`}>Write Review</Link></button>
                                </div>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        

        <Link to={'/movies/new'} className="add-movie-link"> Add a New Movie </Link>
        
        </>
    )
}
export default Home;
