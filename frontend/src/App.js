var vEstadoEye = false;
var indice = 0;
var imagenes = [
  "img/imgLogin.jpg",
  "img/imgLogin2.png",
  "img/imgLogin3.jpg",
  "img/imgLogin4.png",
  "img/imgLogin5.png"
];
document.addEventListener("DOMContentLoaded", function () {



  did("btn_continuar").addEventListener("click", function () {
    console.log(did("lu_usuario_nombres").value == "")

    console.log(did("lu_usuario_nacimiento").value)

       if(did("lu_usuario_nombres").value == ""){
       alert("El campo Nombres es obligatorio");
        return false;
     }
     if(did("lu_usuario_apellidos").value == ""){
       alert("El campo Apellidos es obligatorio");
        return false;
     }
 
     if(did("lu_usuario_correo").value == ""){
       alert("El campo Correo electrónico es obligatorio");
        return false;
     }
 
     if(did("lu_usuario_celular").value == ""){
       alert("El campo Celular es obligatorio");
        return false;
     }
 
     if(did("lu_usuario_documento").value == ""){
       alert("El campo Documento es obligatorio");
        return false;
     }
 
     if(did("lu_password").value == ""){
       alert("El campo Contraseña es obligatorio");
        return false;
     }
 
    
 
     if(did("lu_usuario_nacimiento").value == ""){
       alert("El campo Nacimiento es obligatorio");
        return false;
     }
 
    
     if(!did("ch_politicas").checked){
       alert("Se debe aceptar las politica de tratamiento de datos");
        return false;
     } 

    if (!soloLetras(did("lu_usuario_nombres").value)) {
      alert("El campo Nombre solo admite letras")
      return false;
    }

    if (!soloLetras(did("lu_usuario_apellidos").value)) {
      alert("El campo Apellidos solo admite letras")
      return false;
    }
    if (!isValidEmail(did("lu_usuario_correo").value)) {
      alert("El campo Correo electrónico no tiene el formato esperado")
      return false;
    }

    if (!isNumeric(did("lu_usuario_celular").value)) {
      alert("El campo Celular solo admite números")
      return false;
    }

    if (!isNumeric(did("lu_usuario_documento").value)) {
      alert("El campo Documento solo admite números")
      return false;
    }

    if (did("lu_password").value.length < 8) {
      alert("El campo Contraseña no puede ser inferior a 8 caracteres")
      return false;
    }

    /*++++++++++++++++++++++++*/
    // WARNING: For POST requests, body is set to null by browsers.


    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "correo": did("lu_usuario_correo").value
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://127.0.0.1:3000/validacion", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(typeof result, result)

        if (result.includes("no existe")) {
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          const raw = JSON.stringify({
            "documento": did("lu_usuario_documento").value,
            "contrasena": did("lu_password").value,
            "nombres": did("lu_usuario_nombres").value,
            "apellidos": did("lu_usuario_apellidos").value,
            "celular": did("lu_usuario_celular").value,
            "fecha_nacimiento": did("lu_usuario_nacimiento").value,
            "sexo": did("lu_usuario_sexo").value,
            "correo": did("lu_usuario_correo").value
          });

          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
          };

          fetch("http://127.0.0.1:3000/registro", requestOptions)
            .then((response) => response.text())
            .then((result) => {
              console.log(result)
              if (result.includes("creado")) {
                alert("Usuario creado satisfactoriamente")
                setTimeout(function () {

                  did("lu_usuario_documento").value = ""
                  did("lu_password").value = ""
                  did("lu_usuario_nombres").value = ""
                  did("lu_usuario_apellidos").value = ""
                  did("lu_usuario_celular").value = ""
                  did("lu_usuario_nacimiento").value = ""
                  did("lu_usuario_sexo").value = ""
                  did("lu_usuario_correo").value = ""
                  did("opc_iniciar").click()
                }, 1000)
              } else {
                alert("Ocurrió un error, intente más tarde")
              }
            })
            .catch((error) => console.error(error));

        } else {
          alert("El correo ya se encuentra registrado")
        }
      })
      .catch((error) => console.error(error));

    /*-----------------*/
  })

  setInterval(cambiarFondo, 7000);


  did('opc_registrar').addEventListener("click", function (event) {

    dqs('#cont_2').style.display = "none"
    did('cont_3').style.display = "flex"
    dqs('.contenedor_1_2').style.display = "none"
  })

  did('opc_iniciar').addEventListener("click", function () {
    dqs('#cont_2').style.display = "flex"
    did('cont_3').style.display = "none"
    dqs('.contenedor_1_2').style.display = "flex"
  })

  did('btn_password_see').addEventListener("click", function () {

    if (!vEstadoEye) {
      did('btn_password_see').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
          </svg>`
      did('lu_password').type = "text"
    } else {
      did('btn_password_see').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
            <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
            <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
          </svg>`
      did('lu_password').type = "password"
    }
    vEstadoEye = !vEstadoEye;
  })

  did("btn_continuar_inicio").addEventListener("click", function () {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "correo": did("li_usuario").value
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://127.0.0.1:3000/validacion", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(typeof result, result)

        if (!result.includes("no existe")) {
          var cuenta = did("li_usuario").value
          var contra = did("li_password").value
          if (!isValidEmail(cuenta)) {
            alert("Ingrese un correo válido")
            return false;
          }

          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          const raw = JSON.stringify({
            "correo": cuenta,
            "contrasena": contra
          });

          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
          };

          fetch("http://127.0.0.1:3000/iniciar", requestOptions)
            .then((response) => response.text())
            .then((result) => {
              console.log(result)
              if (result.includes("0")) {
                alert("Las credenciales son incorrectas")
              } else {
                alert("Bienvenido " + cuenta)
                let parametro1 = cif(cuenta) + "_" + cif(contra)
                //let url = "/home.html" + "?par1=" + parametro1;
                url = "http://127.0.0.1/home.html?par1="+parametro1
                window.location.href = url;
              }
            })
            .catch((error) => console.error(error));

        } else {
          alert("Usuario no registrado")
        }
      })
      .catch((error) => console.error(error));



  })
});

function did(id) {
  return document.getElementById(id)
}

function dqs(qs) {
  return document.querySelector(qs)
}

function cambiarFondo() {


  var miDiv = document.getElementById("contenedor_2");

  if (indice == imagenes.length) {
    indice = 0;
  }
  miDiv.style.backgroundImage = "url('" + imagenes[indice] + "')";
  indice++;
}

function isNumeric(input) {
  return /^\d+$/.test(input);
}

function soloLetras(input) {
  return /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(input);
}

function isValidEmail(email) {
  // Expresión regular para validar un correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function cif(text) {
  var res = text.replaceAll("a", "rmwt").replaceAll("e", "atxq").replaceAll("i", "svrg").replaceAll("o", "cfvx").replaceAll("u", "iklc").replaceAll("A", "RMWT").replaceAll("E", "ATXQ").replaceAll("I", "SVRG").replaceAll("O", "CFVX").replaceAll("U", "IKLC");
  res = res.replaceAll("1","PHJF").replaceAll("2","MNGD").replaceAll("3","GTRE").replaceAll("4","PLVC").replaceAll("5","QWXZ").replaceAll("6","PBVK").replaceAll("7","LHVR").replaceAll("8","DFJI").replaceAll("9","ZAMT").replaceAll("0","XEFH").replaceAll("@","TRGNX")
  return res
}