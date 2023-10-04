const novaSenhaIsValid = (form: {password: string, secondPassword: string} ): {error:string } | null => {
    let validade = null;
    
    if(form.password !== form.secondPassword){
        validade = {error:"Senhas não conferem"}
    }

    if(form.password.length < 3 || form.password.length > 8){
        validade = {error:"Senha deve conter no mínimo 3 caracteres eno máximo 8"}
    }

    return validade;
}

export {novaSenhaIsValid}