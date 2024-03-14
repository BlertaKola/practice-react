import { useState, useEffect } from "react"
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom"
import './Review.css'

const Review = (props) => {

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: ""
    })

    const navigate = useNavigate()

    const {userId} = props

    const {id} = useParams()

    const [updated, setUpdated] = useState(false)

    const [form, setForm] = useState({
        movie: id,
        name: "",
        rating: "",
        user: userId
    })

    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/${userId}`, { withCredentials: true })
            .then(res => {
                console.log(res)
                setUser({
                    _id: res.data[0]._id,
                    firstName: res.data[0].firstName,
                    lastName: res.data[0].lastName,
                    email: res.data[0].email
                })
            })
            .catch(err => console.log(err))
    }, [userId])

    const [movie, setMovie] = useState({
        title:""
    })

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/movies/${id}`,{withCredentials: true})
            .then(res => {
                setMovie(res.data[0])
                setUpdated(!updated)
            })
            .catch(err => console.log(err))
    },[updated])


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(form)
        axios.post(`http://localhost:8000/api/movies/${id}`, form, {withCredentials: true})
            .then(res => {
                console.log(res.data)
                navigate('/')
            })
            .catch(err => console.log(err))
    }

    const handleCancel = () => {
        navigate('/')
    }


    return(
        <div className="review-container">
            <h1>{movie.movie ? movie.movie.title : ""}</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Your name:</label>
                    <input type="text" value={user.firstName} disabled />
                </div>
                <div className="form-group">
                    <label>Rating:</label>
                    <input type="number" value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} />
                </div>
                <div className="form-group">
                    <label>Review:</label>
                    <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="btn-container">
                    <button className="cancel-btn" type="button" onClick={handleCancel}>Cancel</button>
                    <button className="submit-btn" type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}
export default Review