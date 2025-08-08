import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/Input';
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector';
import { validateEmail } from '../../utils/helper';
import { UserContext } from '../../context/UserContext';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';
import uploadImage from '../../utils/uploadImage';


function Signup({setCurrentPage}) {

  const[profilePic, setProfilePic] = useState(null)
  const[fullName, setFullName] = useState("")
  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")

  const[error, setError] = useState("")

  const {updateUser} = useContext(UserContext)
  const navigate = useNavigate()

  // Handle Signup form
  const handleSignUp = async(e) => {
    e.preventDefault();
    let profileImageUrl = ""

    if(!fullName){
      setError("Please enter full Name")
      return;
    }

    if(!validateEmail(email)){
      setError("Please enter a valid Email address")
      return;
    }

    if(!password){
      setError("Please enter Password")
      return;
    }

    setError("")

    // Signup API Call
    try{
      // Upload image if availabe
      if(profilePic){
        const imageUploadRes = await uploadImage(profilePic);
        profileImageUrl = imageUploadRes.imageUrl || "" ;
      }

    //   Add api call to register user               // remaining to be done
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
        name: fullName,
        email,
        password,
        assistantImageUrl
      })

      const {token} = response.data;

      if(token){
        localStorage.setItem("token",token);
        updateUser(response.data);
        navigate("/dashboard")
      }



    }catch(error){
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      }
      else{
        setError("Something went wrong! Please try again")
      }
    }
  };


  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
      <h3 className='text-lg font-semibold text-black'>Create an Account</h3>
      <p className='text-xs text-slate-600 mt-[5px] mb-6'>
        Join us today by entering your details
      </p>

      <form onSubmit={handleSignUp}>

        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

        <div className='grid grid-cols-1 md:grid-cols-1 gap-2'>
          <Input
        value={fullName}
        onChange={({target})=>{setFullName(target.value)}}
        label= "Full Name"
        placeholder="Demo Name"
        type = "text"
        />

        <Input
        value={email}
        onChange={({target})=>{setEmail(target.value)}}
        label= "Enter your Email"
        placeholder="sample@company.com"
        type = "text"
        />

        <Input
        value={password}
        onChange={({target})=>{setPassword(target.value)}}
        label= "Password"
        placeholder="Minimum 8 character"
        type = "password"
        />
        </div>

        {error && <p className='text-red-600 text-xs pb-2.5'>{error}</p> }

        <button className='btn-primary'>
          SIGNUP
        </button>

        <p className='text-[13px] text-slate-800 mt-3 '>
          Already a account?{" "}
          <button className='font-medium text-primary underline cursor-pointer' onClick={() =>{setCurrentPage("login")}}>
            LOGIN
          </button>
        </p>

      </form>


    </div>
  )
}

export default Signup