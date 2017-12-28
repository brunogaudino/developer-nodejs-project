window.onload = function(){

var pacientes = document.querySelectorAll(".paciente");
var tabela = document.querySelector("#tabela-pacientes");
var campoFiltro = document.querySelector("#filtrar-tabela");
var botaoBuscaPaciente = document.querySelector("#buscar-pacientes");
var botaoAddPaciente = document.querySelector("#adicionar-paciente");

  tabela.addEventListener("dblclick", function(event){
    nutritionSystem.removePatience(event);
  });

  campoFiltro.addEventListener("input", function(){
    nutritionSystem.filterPatience(this);
  });

  botaoBuscaPaciente.addEventListener("click", function(event){
    //console.log("Buscando Pacientes!");
    nutritionSystem.searchPatience();
  });

  botaoAddPaciente.addEventListener("click", function(event) {
      event.preventDefault();
      registerPatience.main(
        document.querySelector("#form-adiciona"),
        registerPatience.obtemPacienteDoFormulario(document.querySelector("#form-adiciona")),
        montaTr(registerPatience.obtemPacienteDoFormulario(document.querySelector("#form-adiciona"))),
        validaPaciente(registerPatience.obtemPacienteDoFormulario(document.querySelector("#form-adiciona")))
      );
  });

  validationDataPatience.valid(pacientes);

};// end - window.onload

var nutritionSystem = (function(){

  return{

    searchPatience: function(){

      var xhr = new XMLHttpRequest();
      xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientes");
      xhr.addEventListener("load", function(){
        var erroAjax = document.querySelector("#erro-ajax");
        if (xhr.status == 200) {
          var resposta = xhr.responseText;
          var pacientes = JSON.parse(resposta);
          pacientes.forEach(function(paciente) {
              registerPatience.adicionaPacienteNaTabela(paciente);
          });
        } else {
          erroAjax.classList.remove("invisivel");
        }
      });
      xhr.send();

    },

    filterPatience: function(item){
      if ( item.value.length > 0) {
        for( var i = 0; i < pacientes.length; i++){
          var paciente = pacientes[i];
          var tdNome = paciente.querySelector(".info-nome");
          var nome = paciente.textContent;
          var expressao = new RegExp(item.value, "i");
          if (!expressao.test(nome)) {
              paciente.classList.add("invisivel");
          } else {
              paciente.classList.remove("invisivel");
          }
        }
      } else {
        for (var i = 0; i < pacientes.length; i++) {
          var paciente = pacientes[i];
          paciente.classList.remove("invisivel");
        }
      }
    },

    removePatience: function(event){
        event.target.parentNode.classList.add("fadeOut");
        setTimeout(function(){
            event.target.parentNode.remove();
        }, 500);
    }

  } // end - return

})(); // end - nutritionSystem

var validationDataPatience = (function(){

  return{

    valid: function(pacientes){

      for(var i = 0; i < pacientes.length; i++){

        var paciente = pacientes[i];

        var tdPeso = paciente.querySelector(".info-peso");
        var peso = tdPeso.textContent;

        var tdAltura = paciente.querySelector(".info-altura");
        var altura = tdAltura.textContent;

        var tdImc = paciente.querySelector(".info-imc");

        var pesoEhValido = validationDataPatience.validaPeso(peso);
        var alturaEhValida = validationDataPatience.validaAltura(altura);

        if (!pesoEhValido) {
          console.log("Peso inválido!");
          pesoEhValido = false;
          tdImc.textContent = "Peso inválido!";
          paciente.classList.add("paciente-invalido");
        }

        if (!alturaEhValida) {
          console.log("Altura inválida!");
          alturaEhValida = false;
          tdImc.textContent = "Altura inválida!";
          paciente.classList.add("paciente-invalido");
        }

        if (alturaEhValida && pesoEhValido) {
          var imc = validationDataPatience.calculaImc(peso,altura);
          tdImc.textContent = imc;
        }

      }//end - for

    },

    validaPeso: function(peso){
      if (peso >= 0 && peso < 1000) {
        return true;
      }else {
        return false;
      }
    },

    validaAltura: function(altura){
      if (altura >= 0 && altura <= 3.0) {
        return true;
      }else {
        return false;
      }
    },

    calculaImc: function(peso, altura){
      var imc = 0;
      imc = peso / (altura * altura);
      return imc.toFixed(2);
    }

  }//end - return

})();


var registerPatience = (function(){
  return{
    main: function(form, paciente, pacienteTr, erros){

      if (erros.length > 0) {
        registerPatience.exibeMensagensDeErro(erros);
        return;
      }
      // chamando a nova função adicionaPacienteNaTabela
      registerPatience.adicionaPacienteNaTabela(paciente);
      form.reset();
      var mensagensErro = document.querySelector("#mensagem-de-erro");
      mensagensErro.innerHTML = "";

    },
    adicionaPacienteNaTabela: function(paciente) {
        var pacienteTr = montaTr(paciente);
        var tabela = document.querySelector("#tabela-pacientes");
        tabela.appendChild(pacienteTr);
    },

    exibeMensagensDeErro: function(erros){

      var ul = document.querySelector("#mensagem-de-erro");
      ul.innerHTML = "";

      erros.forEach(function(erro){
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
      });

    },

    obtemPacienteDoFormulario: function(form){
        var paciente = {
            nome : form.nome.value,
            peso : form.peso.value,
            altura : form.altura.value,
            gordura : form.gordura.value,
            imc : validationDataPatience.calculaImc(form.peso.value, form.altura.value)
        }
        return paciente;
    }

  }//end - return

})();
