import { useNavigate } from "react-router-dom";
import axios from 'axios'
const LogOut = () => {
    const navigate = useNavigate()
    const handleLogOut = () => {
        axios.post('http://localhost:8000/api/logout', {}, { withCredentials: true })
        .then(res => {
            localStorage.removeItem('userId');
            window.location.reload();
            
            navigate('/auth');
        })
        .catch(err => console.log(err));

    }
    return(
        <>
        <button style={{ backgroundColor: '#dc3545', color: '#fff', padding: '10px', borderRadius: '4px', border: 'none', cursor: 'pointer' }} onClick={handleLogOut}>Log out</button>
        </>
    )
}
export default LogOut