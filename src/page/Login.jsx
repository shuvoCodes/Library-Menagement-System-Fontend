import { useContext, useState } from "react";
import { baseurl } from "../services/BaseURL";
import { AuthContext } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router";


const Login = () => {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [invalid,setInvalid] = useState(false);
    const {setAuthor} = useContext(AuthContext)

    const navigate = useNavigate();

    const handelLogin= async() =>{
        try{
            const formdata = new URLSearchParams()
            formdata.append('username',username);
            formdata.append('password' ,password)
            const res = await fetch(`${baseurl}/login`,{
                method: "POST",
                headers: {'Content-type' : 'application/x-www-form-urlencoded'},
                body: formdata
            })
            const data = await res.json()
            // console.log(data);

            const accessToken = data?.access_token

            localStorage.setItem('lm-token', accessToken)

            const userRes = await fetch(`${baseurl}/user`,{
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            const userData = await userRes.json();
            setAuthor(userData)

            if(userData.detail=== "User Not Found."){
                setInvalid(true);
            }
            else{
                navigate('/');
            }
        }
        catch (error){
            console.log(error)
        }
    }

    return (

        <div class="flex h-screen items-center justify-center">
            <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-5">
                <h1 class="font-bold text-2xl ">Login</h1>

                <label class="label">Username</label>
                <input value={username} onChange={(e)=> setUsername(e.target.value)} type="text" class="input" placeholder="Username" />

                <label class="label">Password</label>
                <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" class="input" placeholder="Password" />
                <Link to={'/registration'}>Don't Have an Account?</Link>
                <p className={invalid ? "block text-red-700" : "hidden"}>Invalid user</p>
                <button onClick={()=> handelLogin()} class="btn btn-neutral mt-4">Login</button>
            </fieldset>
        </div>


    );
};

export default Login;