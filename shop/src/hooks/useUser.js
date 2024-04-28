import { Services } from "../Services/Services";
import { User } from "../schemas/User";
import {useDispatch , useSelector} from 'react-redux';
import {useEffect} from 'react';
import * as UserReducer from '../reducers/userReducers';
import * as UsersReducer from '../reducers/usersReducers';
export const useUser = () => {

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token);
        if (token) {
            Services.User.getMe(token)
                .then((user) => {
                    if (!user) {
                        localStorage.removeItem('token');
                        return;
                    }
                    dispatch({type: UserReducer.ACTION_TYPES.LOGIN, data: user});
                })
                .catch(() => {
                    localStorage.removeItem('token');
                });
        }
        getAllUsers();
    }, []);

    const login = async (email, password) => {
        const user = await Services.User.login(email, password);
        if (!user) return false;
        dispatch({type: UserReducer.ACTION_TYPES.LOGIN, data: user});
        return true;  
    }

    const signup = async (user) => {
        const newUser = await Services.User.register(user);
        if (!newUser) return false;
        dispatch({type: UserReducer.ACTION_TYPES.LOGIN, data: newUser});
        return true;
    }

    const logout = () => {
        dispatch({type: UserReducer.ACTION_TYPES.LOGOUT});
        localStorage.removeItem('token');
    }

    const getAllUsers = async () => {
        const users= await Services.User.getAll();
        dispatch({type: UsersReducer.ACTION_TYPES.ALL_USERS, data: users});
    }

    return {user, login, signup, logout};
}