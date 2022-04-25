var mesSelect = '01';
var anoVigente = '2022'

function getWeekFirstDay(){
    var mesNumber = mesSelect;
    var diaDaSemana = new Date(`${mesNumber}/01/${anoVigente}`);
    diaDaSemana = diaDaSemana.getDay();

    return diaDaSemana
}

function has31Days(mes){
    var mesNumber = mesSelect;
    var numeroMes = new Date(`${mesNumber}/31/${anoVigente}`);
    numeroMes = numeroMes.getMonth();

    if(numeroMes === parseFloat(mesNumber) - 1){
        return true
    }else{
        return false
    }
}

//teste
//getWeekFirstDay('abril')
// var diasArray = {};
//         var primeirDiaDoMes = getWeekFirstDay('abril');

//         diasArray.w1 = new Array(parseFloat(primeirDiaDoMes)).fill(0)

//         console.log(diasArray.w1)

//console.log(has31Days('abril'))

function diasNoMes(mes) {
    var ano = anoVigente;
    var data = new Date(ano, mes, 0); 
    
    return data.getDate()
}

