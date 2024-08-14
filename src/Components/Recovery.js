
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import avatar from '../assets/profile.jpeg'

import styles from '../styles/Username.css'
import { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { usernameValidate } from '../helper/validate'
export default function Username() {
    
    const formik=useFormik({
        initialStatus:{
            Username:''
        },
        validate:usernameValidate,
        validateOnBlur:false,
        validateOnChange:false,
        onSubmit:async values=>
        {
            console.log(values)
        }
    })
   
  return (
    <div className='container mx-auto'>
        <Toaster position='top-center' reverseOrder={false}>

        </Toaster>
        <div className='flex justify-center items-center h-screen'>
            <div className={styles.glass} >
                <div className='tittle flex flex-col items-center'>
                    <h4 className='text-5xl font-bold'>
                        hello again!
                    </h4>
                    <span className='py-4 text-xl w-2/3 text-center text-gray-5'>Explore more connecting with us</span>
               
                </div>
                <form className="py-1" onSubmit={formik.handleSubmit}>
                    <div className="profile flex justify-center py-4">
                        <img src={avatar} className={styles.profile_img}alt="avatar"/>

                        </div>
                        <div className="text-box flex flex-col items-center gap-6 border-2 border-black rounded">
                            <input {...formik.getFieldProps('username')} className={styles.textbox}    type="text" placeholder="username"/>
                          <button    type="submit">Register</button>
                        </div>
                        <div className="text-container py-4">
                            <span className="text-gray-500">Not a member <Link  className="text-red-500" to="/register">Register Now</Link></span>
                        </div>
                </form>
                </div>
    
        </div>
     


    </div>
  )
}
