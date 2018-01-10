window.onload = function(){

  var pacientes = document.querySelectorAll(".paciente");
  var tabela = document.querySelector("#tabela-pacientes") || false;
  var campoFiltro = document.querySelector("#filtrar-tabela");
  var botaoBuscaPaciente = document.querySelector("#buscar-pacientes");
  var botaoAddPaciente = document.querySelector("#adicionar-paciente");
  var clickEditPatient = document.querySelector(".info-editar");
  var clickDeletePatient = document.querySelector(".info-delete");

  if (tabela.childElementCount == 0) {
    document.querySelector("table").classList.add("invisivel");
    document.querySelector("#filtro").classList.add("invisivel");
  }else{
    document.querySelector("table").classList.remove("invisivel");
    document.querySelector("#filtro").classList.remove("invisivel");
  }

  if(tabela){
    tabela.addEventListener("click", function(event){
      itemClicado = event.target.parentNode.classList;
      //console.log( event.target.node );
      actionsSystem.removePatience(event);
    });
  }
  campoFiltro.addEventListener("input", function(){
    actionsSystem.filterPatience(this);
  });

  //console.log("Buscando Pacientes!");

  botaoAddPaciente.addEventListener("click", function(event) {
      event.preventDefault();
      registerPatience.main(
        document.querySelector("form#form-adiciona"),
        registerPatience.obtemPacienteDoFormulario(document.querySelector("#form-adiciona")),
        actionsSystem.montaTr(registerPatience.obtemPacienteDoFormulario(document.querySelector("#form-adiciona"))),
        validationData.validaPaciente(registerPatience.obtemPacienteDoFormulario(document.querySelector("#form-adiciona")))
      );
  });

  validationData.valid(pacientes);

};// end - window.onload

var actionsSystem = (function(){

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
      //Captura os pacientes atuais
      var pacientes = document.querySelectorAll(".paciente");

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
        //event.preventDefault();
        //event.target.parentNode.classList.add("fadeOut");
        // setTimeout(function(){
        //     event.target.parentNode.remove();
        // }, 500);
    },

    montaTr: function(paciente){
        //cria a tr e a td
        var pacienteTr = document.createElement("tr");
        pacienteTr.classList.add('paciente');
        pacienteTr.appendChild(actionsSystem.montaTd(paciente.nome, "info-nome"));
        pacienteTr.appendChild(actionsSystem.montaTd(paciente.peso, "info-peso"));
        pacienteTr.appendChild(actionsSystem.montaTd(paciente.altura, "info-altura"));
        pacienteTr.appendChild(actionsSystem.montaTd(paciente.gordura, "info-gordura"));
        pacienteTr.appendChild(actionsSystem.montaTd(paciente.imc, "info-imc"));
        pacienteTr.appendChild(actionsSystem.montaTd("Editar", "info-editar"));
        pacienteTr.appendChild(actionsSystem.montaTd("X", "info-delete"));
    
        return pacienteTr;
    },

    montaTd: function(dado,classe){
      var td = document.createElement("td");
      td.textContent = dado;
      td.classList.add(classe);
      return td;
    }

  } // end - return

})(); // end - actionsSystem

var validationData = (function(){

  return{

    valid: function(pacientes){

      for(var i = 0; i < pacientes.length; i++){

        var paciente = pacientes[i];

        var tdPeso = paciente.querySelector(".info-peso");
        var peso = tdPeso.textContent;

        var tdAltura = paciente.querySelector(".info-altura");
        var altura = tdAltura.textContent;

        var tdImc = paciente.querySelector(".info-imc");

        var pesoEhValido = validationData.validaPeso(peso);
        var alturaEhValida = validationData.validaAltura(altura);

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
          var imc = validationData.calculaImc(peso,altura);
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
    },

    validaPaciente: function(paciente){
      
        var erro = [];
      
        if (paciente.nome.length == 0) {
          erro.push("O nome não pode ser em branco!")
        }
      
        if(!validationData.validaPeso(paciente.peso)){
          erro.push("Peso é inválido!");
        }
      
        if(!validationData.validaAltura(paciente.altura)){
          erro.push("Altura é inválida!");
        }
      
        if(paciente.gordura.length == 0){
          erro.push("A gordura não pode ser em branco!");
        }
      
        if (paciente.peso.length == 0) {
          erro.push("O peso não pode ser em branco!");
        }
      
        if (paciente.altura.length == 0) {
          erro.push("A altura não pode ser em branco!");
        }
      
        return erro;
      
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
      //console.log(paciente);
      //chamando a nova função adicionaPacienteNaTabela
      registerPatience.adicionaPacienteNaTabela(paciente);
      form.submit();
      form.reset();
      var mensagensErro = document.querySelector("#mensagem-de-erro");
      mensagensErro.innerHTML = "";

    },

    adicionaPacienteNaTabela: function(paciente) {
        var pacienteTr = actionsSystem.montaTr(paciente);
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
            imc : validationData.calculaImc(form.peso.value, form.altura.value)
        }
        return paciente;
    }

  }//end - return

})();
