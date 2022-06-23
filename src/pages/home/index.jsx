import { Button, Center, Flex, Link } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import auth_types from "../../redux/reducer/auth/type";
import jsCookie from 'js-cookie'

export default function home(){
    
    const dispatch = useDispatch()

    const logoutHandler = () => {
        jsCookie.remove("userData")

        dispatch({
            type: auth_types.AUTH_LOGOUT
        })
    }

    const userSelector = useSelector((state)=>{
        return state.auth
    })

    return(
        <Flex>
            <Center>
                <Link href="/auth/login"> 
                    <Button onClick={logoutHandler}>
                        LOGOUT BRUDDA {userSelector.username}
                    </Button>
                </Link>
            </Center>
        </Flex>

    )

}