import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import jsCookie from 'js-cookie'
import auth_types from '../redux/reducer/auth/type'

function AuthProvider({children}) {
    const [isAuthChecked, setIsAuthChecked] = useState(false)

    const dispatch = useDispatch()

    useEffect(()=>{

        const savedUserData = jsCookie.get("user_data")

        if (savedUserData) {
            const parsedUserData = JSON.parse(savedUserData)

            dispatch({
                type: auth_types.AUTH_LOGIN,
                payload: parsedUserData,
            })
        }
    
    
    setIsAuthChecked(true)
},[])

  if (!isAuthChecked) return <div> loading</div>;
  
    return children
  

}

export default AuthProvider