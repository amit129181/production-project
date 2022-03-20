import React,{ useEffect } from 'react'
import Api from '../../utils/Api'
import User from '../../utils/User'

function Dashboard() {
    const [user, setUser] = React.useState({})
    useEffect(() => {
        const user = User()
        if(user.token){
            Api.get('/users/profile').then(res => {
                setUser(res.data)
            }).catch(err => {})
        }
        
    }, [])
    
  return (
    <div className='container'>
        <h1>Dashboard</h1>
        <p>Welcome {user?.name}</p>
        <p>Donor : {user?.isAdmin ? "NO":"YES"}</p>
    </div>
  )
}

export default Dashboard