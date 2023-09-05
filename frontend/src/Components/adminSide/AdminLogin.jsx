import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../../axios/axios'

const AdminLogin = () => {
 const[loginInfo,setLoginInfo]=useState({})
 const[errors,setErrors]=useState()
 const navigate=useNavigate()
 const handleChange=(e)=>{
 setLoginInfo({...loginInfo,[e.target.name]:e.target.value});
}

const handleSubmit=(e)=>{
  e.preventDefault();
  let err={}
  err=validation(loginInfo)
  if(Object.keys(err).length===0){
    console.log('valid items for admin-login');
    axios.post('/admin/adminlogin',loginInfo).then((response)=>{
      console.log(response.data,'response after admin login');
      if(response.data.status===false){
        err.admin=response.data.message
        setErrors(err);
      }else{
       console.log('admin loged');
        localStorage.setItem('adminjwt',response.data.accessToken);
        navigate('/admin/adminhome')
      }
    }).catch((err)=>{
      console.log(err);
    })
  }
  else{
    setErrors(err)
    console.log(errors,'errors have');
  }

}

const validation=(data)=>{
 console.log(data,'admindata');
  let err={}
 const email=data?.email;
 const password=data?.password
 const emailFormat=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

 if(!data){
  err.email='enter email'
 }else if(!email){
  err.email='enter email'
 }else if(!emailFormat){
  err.email='enter a valid email'
 }else if(!password){
err.password='enter the password'
 }
 return err
}



 
 
  return (
    <div className='flex justify-center items-center h-screen bg-gray-200'>
      <div className='flex flex-col bg-slate-100 shadow-md md:w-1/2  px-10 py-12 rounded-lg gap-3 items-center'>

        <img src="https://sales.webtel.in/images/Login-page-character1.png" alt="logo" className='w-40 max-auto mb-2 mt-2'/>
   <h1 className='font-bold text-xl text-[#464B87] opacity-1'>Login</h1>
   <p className="text-sm  opacity-80 text-[#464B87] text-center mb-2">welcome back 
   admin,<br/> please login to access your dashboard </p>

<form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
{errors?.admin&&<p className='text-sm m-3 text-red-500 text-center'>{errors?.admin}</p>}
<div>
<input type='email text-sm ' className='border border-black-200 rounded-lg w-full text-sm outline-none text-center px-2 py-2 focus:border-gray-300' placeholder='enter your email' name='email' value={loginInfo.email} onChange={handleChange} ></input>
{errors?.email &&<p className='text-sm m-3 text-red-500 text-center'>{errors?.email}</p>}
</div>
<div>
<input type='password' className='border border-black-200 rounded-lg w-full text-sm outline-none text-center px-2 py-2 focus:border-gray-300 mt-1 ' placeholder='enter your password' name='password' value={loginInfo.password} onChange={handleChange}></input>
{errors?.password &&<p className='text-sm m-3 text-red-500 text-center'>{errors?.password}</p>}
</div>  
<div>
  <button type='submit' className="bg-[#464B87] text-white py-2 rounded-xl mt-3 mb-2 shadow-lg hover:scale-105 duration-300 w-full opacity-98"> Login</button> 
</div>
</form>  
</div>
</div>
  )
}

export default AdminLogin