import nodemailer from 'nodemailer';
import { PrismaClient } from "@prisma/client";


export async function enviarEmail(email:string){
  
  const transporter = nodemailer.createTransport({
    // Configurações do Zoho
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: 'luizvilarinho@zohomail.com',
      pass: 'Batata.33',
    },
  });
    
      // Configurar o email a ser enviado
      const emailConfig = {
        from: 'luizvilarinho@gmail.com',
        to: email,
        subject: 'trainingtrack-solicitação de novas credenciais',
        html: gerarTemplate(email)
      };
    
      // Enviar o email
      await transporter.sendMail(emailConfig);
}

function gerarTemplate(email:string){
  let template = `<div>
    <h2>Olá ${email.split('@')[0]}</h2>
    <div>clique no link abaixo para cadastrar uma nova senha.</div>
    <br><br>
    <a href="${process.env.NOVA_SENHA_REDIRECT}?hash=${gerarHashCode(email)}">Nova senha</a>
  </div>`

  return template;
}

function gerarHashCode(texto:string){
  //logica para gerar o hash
  return encodemanager.encode(texto);
}

export const encodemanager = {
  encode:(str:string):string =>{
    if(!str) return ''

    return Buffer.from(str).toString('base64')
  },
  decode:(hash:string):string =>{
    if(!hash) return ''
    let dec = Buffer.from(hash,'base64').toString('utf8');
    console.log(dec)
    return dec
  }
}

function validarFormAlterarSenha(password:string):{error:string} | null{
 let isValid = null

 if(!password || password === 'null' || password === ''){
   isValid = {error:"a senha não pode ser nula"}
 }

 if(password.length > 8){
   isValid = {error:"a senha não pode ter mais de 8 caracteres"}
 }

 if(password.length < 3){
  isValid = {error:"a senha não pode ter menos de 3 caracteres"}
 }

 return isValid;
}
export async function fazerUpadteDaSenha(prisma: PrismaClient, data:{password:string, hash:string}){

  let passwordHasErrors:{error:string} | null = validarFormAlterarSenha(data.password);
  
  if(passwordHasErrors){ 
    return passwordHasErrors.error || '';
  }

  const result:any = await prisma.tb_user.update({
    where:{
      email:encodemanager.decode(data.hash)
    },
    data:{
      password:data.password
    }
  })

  result.success = true;
  result.mensagem = 'senha atualizada com sucesso';

  return result
}