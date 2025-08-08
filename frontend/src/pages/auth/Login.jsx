import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/Input';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';
import { UserContext } from '../../context/UserContext';


function Login({setCurrentPage}){

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const {updateUser} = useContext(UserContext)
  const navigate = useNavigate()

  // Login Handle form
  const handleLogin = async(e) =>{
    e.preventDefault();

    if(!validateEmail(email)){
      setError("Please enter Valid email")
      return
    }

    if(!password){
      setError("Please enter Password")
      return
    }
    setError("")

    // Login API calls      // Remaining to be done
    // Add api call to login user
    try{
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{ email, password,});

      const {token} = response.data;

      if(token){
        localStorage.setItem("token",token);
        updateUser(response.data)
        navigate("/dashboard");
      }

      
    }catch(error){
      console.error("Login Error:", error);
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      }
      else{
        setError("Something went wrong! Please try again")
      }
    }

  }

  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
      <h3 className='text-lg font-semibold text-black' >Welcome Back</h3>
      <p className='text-xs text-slate-600 mt-[5px] mb-6'>
        Please enter your Details to login
      </p>

      <form onSubmit={handleLogin}>
        <Input 
        value={email}
        onChange={({target})=>{setEmail(target.value)}}
        label = "Email Address"
        placeholder='name@company.com'
        type='text'
        />

        <Input 
        value={password}
        onChange={({target})=>{setPassword(target.value)}}
        label = "Enter Password"
        placeholder='Minimum 8 Characters'
        type='password'
        />

        {error && <p className='text-red-700 text-xs pb-2.5'>{error}</p> }

        <button type='submit' className='btn-primary'>
          LOGIN
        </button>
        <p className='text-[13px] text-slate-800 mt-3'>
          Don't have account?{""}
          <button className='font-medium text-primary underline cursor-pointer' onClick={()=>{setCurrentPage("signup")}}>
            SIGNUP
          </button>
        </p>
      </form>
    </div>
  )
}

export default Login