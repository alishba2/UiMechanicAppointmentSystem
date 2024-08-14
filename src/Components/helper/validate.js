import toast from "react-hot-toast"
export async function usernameValidate(values){
    const errors=usernameVerify({},values);
    return errors;

}
export async function passwordValidate(values){
    const errors=passwordVerify({},values);
    return errors;
}
export async function resetPasswordValidation(values){
    const errors=passwordVerify({},values);
    if(values.password!==values.confirmpssword){
        errors.exist=toast.error("password not match");


}
return errors;
}
export async function registerValidation(values){
    const errors=usernameVerify([],values);
    passwordVerify(errors,values);
    emailVerify(errors,values);
    return errors;
}
export async function profileValidation(values){
    const errors=emailVerify([],values);
    
    return errors;
}


function passwordVerify(error={} ,values){
    const specialChars=/[\!\@\#\$\%\^\&\*\(\)_\+\-\=\/\[\]\{\}\;\'\"\|,\.\<\>\/\~]/
    if(!values.password){
        error.password=toast.error("password required");
    }else if(values.password.includes("")){
        error.password=toast.error('invalid password')
    }
    
else if(values.password.length<4){
    error.password=toast.error('invalid password')
}else if(specialChars.test(values.password)){
    error.password=toast.error('Password must have special characters')
}
    return error;

}
function usernameVerify(error={},values){
    if(!values.username){
        error.username=toast.error("username required");
    }else if(values.username.includes("")){
        error.username=toast.error('invalid username')
    }
    return error;
}
function emailVerify(error={},values){
    if(!values.email){
        error.email=toast.error("email required");
    }else if(values.email.includes("")){
        error.username=toast.error('wrong email')
    }
    return error;
}
