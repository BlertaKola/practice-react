import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios'
import './Reviews.css'
const Reviews = (props) => {

    const {userId} = props

    const {id} = useParams()

    const [reviews, setReviews] = useState([])


    const [updated, setUpdated] = useState(false)


    const [title, setTitle] = useState('')


    useEffect(()=>{
        axios.get(`http://localhost:8000/api/movies/${id}`, {withCredentials: true})
            .then(res => {
                setReviews(res.data)
                setUpdated(!updated)
            })  
            .catch(err => console.log(err))
    }, [updated])





    return(
        <>
        <table>
            <thead>
                <tr>
                    <th>Reviewer</th>
                    <th>Rating</th>
                    <th>Review</th>
                </tr>
            </thead>
            <tbody>
                {reviews.map((review, index)=>{
                    return(
                        <tr key={index}>
                            <td>{review.user ? review.user.firstName : ""}</td>
                            <td>{review.rating}</td>
                            <td>{review.name}</td>
                            {userId && ( // Show delete button only if user is logged in
                                <td>
                                    {userId === review.user._id && (
                                        <button className="red-button" onClick={() => handleDeleteReview(review._id)}>Delete</button>
                                    )}
                                </td>
                            )}
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </>
    )
}
export default Reviews