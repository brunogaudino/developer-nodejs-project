window.onload = function(){

    var patients = document.querySelectorAll(".paciente");
    var table = document.querySelector("#tabela-pacientes") || false;
    var filterFild = document.querySelector("#filtrar-tabela");
    var btnAddPatient = document.querySelector("#adicionar-paciente");
    var clickDeletePatient = document.querySelectorAll(".info-delete");
    var btnUpdatePatient = document.querySelector("#update-paciente");
    // var btnSearchPatiente = document.querySelector("#buscar-pacientes");
    // var clickEditPatient = document.querySelector(".info-editar");
  
    document.querySelector('main').classList.add('fadeIn');

    if(table){
        if (table.childElementCount == 0) {
            document.querySelector("table").classList.add("invisivel");
            document.querySelector("#filter").classList.add("invisivel");
        }else{
            document.querySelector("table").classList.remove("invisivel");
            document.querySelector("#filter").classList.remove("invisivel");
        };

        filterFild.addEventListener("input", function(){
            Patient.filter(this);
        });
    };

    if(btnAddPatient){
        btnAddPatient.addEventListener("click", function(event) {
          event.preventDefault();
          Validation.main(
            document.querySelector("form#form-adiciona"),
            Patient.dataForm(document.querySelector("#form-adiciona")),
            Patient.mountTr(Patient.dataForm(document.querySelector("#form-adiciona"))),
            Validation.validPatiente(Patient.dataForm(document.querySelector("#form-adiciona")))
          );
        }); 
    };

    if(btnUpdatePatient) {
        btnUpdatePatient.addEventListener("click", function(event){
            event.preventDefault();
            Validation.main(
                document.querySelector("form#form-atualiza"),
                Patient.dataForm(document.querySelector("#form-atualiza")),
                Patient.mountTr(Patient.dataForm(document.querySelector("#form-atualiza"))),
                Validation.validPatiente(Patient.dataForm(document.querySelector("#form-atualiza")))
            );
        });
    }

    for(var i = 0; i < clickDeletePatient.length; i++){
        clickDeletePatient[i].addEventListener("click", function(event){
            Patient.removeFromTable(event);
        });
    };

    Validation.validForm(patients);
    
}//end window.onload

var Patient = (function(){

    return{

        dataForm: function(form){
            var patient = {
                nome : form.nome.value,
                peso : form.peso.value,
                altura : form.altura.value,
                gordura : form.gordura.value,
                imc : Validation.calcBmi(form.peso.value, form.altura.value)
                // endereco : [{
                //   cep : form.cep.value,
                //   lat: form.latitude.value,
                //   long: form.longitude.value
                // }]
            }
            return patient;
        },

        filter: function(item){
            var patients = document.querySelectorAll(".paciente");
      
            if ( item.value.length > 0) {
              for( var i = 0; i < patients.length; i++){
                var patient = patients[i];
                //var tdName = patient.querySelector(".info-nome");
                var name = patient.textContent;
                var expression = new RegExp(item.value, "i");
                if (!expression.test(name)) {
                    patient.classList.add("invisivel");
                } else {
                    patient.classList.remove("invisivel");
                }
              }
            } else {
              for (var i = 0; i < patients.length; i++) {
                    var patient = patients[i];
                    patient.classList.remove("invisivel"); 
                }

            }
        },
        //removePatient
        removeFromTable: function(event){
            event.preventDefault();
            event.path[2].classList.add("fadeOut");
            setTimeout(function(){
              event.path[2].remove();        
            }, 200);
            setTimeout(function(){
              window.location.href = event.target.href;
            }, 700);
        },

        //mont table
        mountTr: function(patient){
            //cria a tr e a td
            var patientTr = document.createElement("tr");
            patientTr.classList.add('patient');
            patientTr.appendChild(Patient.mountTd(patient.nome, "info-nome"));
            patientTr.appendChild(Patient.mountTd(patient.peso, "info-peso"));
            patientTr.appendChild(Patient.mountTd(patient.altura, "info-altura"));
            patientTr.appendChild(Patient.mountTd(patient.gordura, "info-gordura"));
            patientTr.appendChild(Patient.mountTd(patient.imc, "info-imc"));
            patientTr.appendChild(Patient.mountTd("Editar", "info-editar"));
            patientTr.appendChild(Patient.mountTd("X", "info-delete"));
        
            return patientTr;
        },

        mountTd: function(dataName,className){
            var td = document.createElement("td");
            td.textContent = dataName;
            td.classList.add(className);
            return td;
        },

    }//return

})();//Patient

var Validation = (function(){
    
    return{

        main: function(form, patient, patientTr, errorsForm){

            if (errorsForm.length > 0) {
                Validation.showMessageErrors(errorsForm);
                return;
            };
            //chamando a nova função adicionaPacienteNaTabela
            //registerPatient.adicionaPacienteNaTabela(paciente);
            form.submit();
            setTimeout(function(){
                form.reset();
            }, 500);

            var messageErrors = document.querySelector("#mensagem-de-erro");
            messageErrors.innerHTML = "";

        },

        validForm: function(patients){

            for(var i = 0; i < patients.length; i++){
      
              var patient = patients[i];
              var tdWeight = patient.querySelector(".info-peso");     
              var tdHeight = patient.querySelector(".info-altura");
              var weight = tdWeight.textContent;
              var height = tdHeight.textContent;
              var tdBmi = patient.querySelector(".info-imc");
      
              var weightIsValid = Validation.validWeight(weight);
              var heightIsValid = Validation.validHeight(height);
      
              if (!weightIsValid) {
                weightIsValid = false;
                tdBmi.textContent = "Peso inválido!";
                patient.classList.add("paciente-invalido");
              }
      
              if (!heightIsValid) {
                heightIsValid = false;
                tdBmi.textContent = "Altura inválida!";
                patient.classList.add("paciente-invalido");
              }
      
              if (heightIsValid && weightIsValid) {
                var bmi = Validation.calcBmi(weight,height);
                tdBmi.textContent = bmi;
              }

            }//end - for

        },

        validWeight: function(weight){
            if (weight >= 0 && weight < 1000) {
                return true;
            }else{
                return false;
            }
        },

        validHeight: function(height){
            if (height >= 0 && height <= 3.0) {
                return true;
            }else {
                return false;
            }
        }, 

        calcBmi: function(weight, height){
            var bmi = 0;
            bmi = weight / (height * height);
            return bmi.toFixed(2);
        },

        validPatiente: function(patient){

            var error = [];
          
            if (patient.nome.length == 0) {
              error.push("O nome não pode ser em branco!")
            }
          
            if(!Validation.validWeight(patient.peso)){
              error.push("Peso é inválido!");
            }
          
            if(!Validation.validHeight(patient.altura)){
              error.push("Altura é inválida!");
            }
          
            if(patient.gordura.length == 0){
              error.push("A gordura não pode ser em branco!");
            }
          
            if (patient.peso.length == 0) {
              error.push("O peso não pode ser em branco!");
            }
          
            if (patient.altura.length == 0) {
              error.push("A altura não pode ser em branco!");
            }
    
            // if (patient.endereco[0].cep == 0 || patient.endereco[0].cep < 9) {
            //   error.push("O cep está incorreto!");
            // }
    
            return error;

        },//valida patient
        
        showMessageErrors: function(messageErros){

            var ul = document.querySelector("#mensagem-de-erro");
            ul.innerHTML = "";
      
            messageErros.forEach(function(error){
              var li = document.createElement("li");
              li.textContent = error;
              ul.appendChild(li);
            });
      
        },

    }//end return

})();//Validation