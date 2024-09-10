const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validarFormularioLogin = (form:{email:string, password:string, name?:string}) => {
    let message = ''

    console.log(form, form.name === null)
    if((form.name || form.name === '') &&  (!form.name || form.name && form.name.length < 3)){
        message = "Nome inválido";
    }

    if(form.password.length < 3){
        message="Senha deve conter no mínimo 4 caracteres"
    }

    if(!emailRegex.test(form.email)){
        message = "email inválido"
    }

    return message
}

const emailPass = (email:string):boolean => {
    let invalid = true;

    if(emailRegex.test(email)){
        invalid = false
    }

    return invalid;
}

export {validarFormularioLogin, emailPass}