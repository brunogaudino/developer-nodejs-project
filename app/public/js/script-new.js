window.onload = function(){

    var pacientes = document.querySelectorAll(".paciente");
    var tabela = document.querySelector("#tabela-pacientes") || false;
    var campoFiltro = document.querySelector("#filtrar-tabela");
    var botaoBuscaPaciente = document.querySelector("#buscar-pacientes");
    var botaoAddPaciente = document.querySelector("#adicionar-paciente");
    var botaoUpdatePaciente = document.querySelector("#update-paciente");
    var clickEditPatient = document.querySelector(".info-editar");
    var clickDeletePatient = document.querySelectorAll(".info-delete");
  
    document.querySelector('main').classList.add('fadeIn');

    var Patience = (function(){

        return{
            
        }
    });//Patience

    var Validation = (function(){
        
        return{

        }
    });//Validation

}//end window.onload