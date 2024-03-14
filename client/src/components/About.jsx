import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
import LogOut from "./LogOut"
const About = (props) => {

    const navigate = useNavigate()

    const { userId } = props


    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: ""
    })

    const [form, setForm] = useState({
        user: userId,
        title: "",
        reviews: [{
            rating: 0,
            name: ""
        }]
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


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("CLICKEDDd")
        console.log(form)

        axios.post('http://localhost:8000/api/movies', {title: form.title, user: userId, reviews: form.reviews}, {withCredentials: true})
            .then(res => {
                console.log(res.data)
                navigate('/')
            })
            .catch(err => console.log(err))
    }

    const handleCancel = () => {
        navigate('/')
    }

    return (
        <>  
            <LogOut/>
            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-group">
                    <label>Movie title:</label>
                    <input type="text" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} />
                </div>
                <div className="form-group">
                    <label>Your name:</label>
                    <input type="text" value={user.firstName} disabled/>
                </div>
                <div className="form-group">
                    <label>Rating:</label>
                    <input type="number" value={form.reviews[0].rating} onChange={({ target: { value } }) => setForm(prevForm => ({...prevForm, reviews: [{ ...prevForm.reviews[0], rating: value }]}))}/>
                </div>
                <div className="form-group">
                    <label>Review:</label>
                    <input type="text" value={form.reviews[0].name} onChange={({ target: { value } }) => setForm(prevForm => ({...prevForm, reviews: [{ ...prevForm.reviews[0], name: value }]}))}/>
                </div>
                <button type="submit" className="submit-btn">Submit</button>
                <button type="button" onClick={handleCancel} className="cancel-btn">Cancel</button>
            </form>
            <Link to={'/'} className="home-link">Go to Home component</Link>
        </>
    )
}
export default About