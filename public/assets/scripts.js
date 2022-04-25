 var auxRenderCalendar = {
     wIteration : function (wArray, title){
         let diasTemplate = ``;
         
         for(let i = 0; i < wArray.length; i++){
            if(wArray[i] === 0){
                diasTemplate += `<div class="dia off" dia="${wArray[i]}"></div>`
            }else{
                diasTemplate += `<div class="dia" onclick="statusDayChangeHandler(${wArray[i]})" dia="${wArray[i]}"></div>`
            }

        }

        var diaTemplateW1 =  `<article>
             <div class="gr">
             <span>${title}</span> 
             <div class="dias-container">
                    ${diasTemplate}
                 <div>
             </div>
     
         </article>`;

         return diaTemplateW1;
    },
    diasArray: ()=>{
        var diasArray = {
            w1: [],
            w2: [],
            w3: [],
            w4:[],
            w5:[]
        };

        
        var primeirDiaDoMes = getWeekFirstDay();

        diasArray.w1 = primeirDiaDoMes === 0? new Array(6).fill(0) : new Array(parseFloat(primeirDiaDoMes) - 1).fill(0)
        var diasTotais = diasNoMes(parseFloat(mesSelect))

        for(let i = 1; i <= diasTotais; i++){
            if(diasArray.w1.length < 7){
                diasArray.w1.push(i)
            }else if (diasArray.w2.length < 7) {
                diasArray.w2.push(i)
            }else if(diasArray.w3.length < 7) {
                diasArray.w3.push(i)
            }else if(diasArray.w4.length < 7) {
                diasArray.w4.push(i)
            }else if(diasArray.w5.length < 7 ) {
                diasArray.w5.push(i)
            }
        }
        
        if(diasArray.w5.length < 7){
            do{
                diasArray.w5.push(0)
            }while(diasArray.w5.length < 7)
        }


        return diasArray
    }
}
//fim aux

function calendarRender(){

    document.querySelector(".w-container").innerHTML = ""  
    document.querySelector(".w-container").innerHTML = ""   
    document.querySelector(".w-container").innerHTML = ""  
    document.querySelector(".w-container").innerHTML = ""    
    document.querySelector(".w-container").innerHTML = ""  

    var dias = auxRenderCalendar.diasArray();
    console.log(dias)
    //w1
    let w1Template = auxRenderCalendar.wIteration(dias.w1, 'w1');
    let w2Template = auxRenderCalendar.wIteration(dias.w2, 'w2');
    let w3Template = auxRenderCalendar.wIteration(dias.w3, 'w3');
    let w4Template = auxRenderCalendar.wIteration(dias.w4, 'w4');
    let w5Template = auxRenderCalendar.wIteration(dias.w5, 'w5');



    document.querySelector(".w-container").innerHTML += w1Template  
    document.querySelector(".w-container").innerHTML += w2Template  
    document.querySelector(".w-container").innerHTML += w3Template  
    document.querySelector(".w-container").innerHTML += w4Template  
    document.querySelector(".w-container").innerHTML += w5Template  

}


function changeMonthHandler(){
    mesSelect = document.querySelector('#mes-select').value;
    calendarRender();
}

function statusDayChangeHandler(dia){
    var el = document.querySelector(`[dia='${dia}']`)

    
   if(el.classList.value.split(" ").includes('worked')){
       el.classList.remove('worked')
   }else{
    el.classList.add('worked');
   }
}

window.onload=()=>{
    console.log("systen init")
    var now = new Date();
    now = now.getMonth() + 1
    var mes = new String(now);
    
    if(mes.length < 2){
        mes = '0' + mes
    }

    document.querySelector('#mes-select').value = mes
    changeMonthHandler();

}