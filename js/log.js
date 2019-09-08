function redireccionar(){
      window.location.replace("usuario.html");
    }
function writeUserData(userId, email,nombre,appat,apmat,tel) {
  firebase.database().ref('users/' + userId).set({
    email: email,
    nombre: nombre,
    apellidopaterno: appat,
    apellidomaterno: apmat,
    telefono: tel,
    saldo: 0
  });
}
(function(){
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').then(function(registration) {
      }, function(err) {
      });
    });
  }       
 	// Iniciando Firebase
  	const config = {
    apiKey: "AIzaSyBqwlg3WAgBJgpKLTgqtIGlq89Cgo40YXM",
    authDomain: "criptobank-ba3be.firebaseapp.com",
    databaseURL: "https://criptobank-ba3be.firebaseio.com",
    projectId: "criptobank-ba3be",
    storageBucket: "criptobank-ba3be.appspot.com",
    messagingSenderId: "509341828638"
  	};
  	firebase.initializeApp(config);
  	//Obtenemos elementos
    var txtNomreg = document.getElementById('txtNomreg');
    var txtApPatreg = document.getElementById('txtApPatreg');
    var txtApMatreg = document.getElementById('txtApMatreg');
    var txtTelreg = document.getElementById('txtTelreg');
    var txtEmailreg = document.getElementById('txtEmailreg');
    var txtPasswordreg = document.getElementById('txtPasswordreg');
    var txtEmailrec = document.getElementById('txtEmailrec');
  	var txtEmail = document.getElementById('txtEmail');
  	var txtPassword = document.getElementById('txtPassword');
  	var iniciaSe = document.getElementById('IniciaSe');
  	var creaUs = document.getElementById('CreaUs');
    var reset = document.getElementById('Reset');
    var spass = document.getElementById('show-pass');
    var spassreg = document.getElementById('show-passreg');
    //Sincronizacion
    /*if (bowser.name==='Microsoft Edge'||bowser.name==='Safari') {
      alert('Navegador Parcialmente Soportado');      
    }*/
  	iniciaSe.addEventListener('click', e =>{
  		firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  		.then(function() {
  			const email = txtEmail.value;
  			const pass = txtPassword.value;
  			const auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(email, pass);
  			promise.catch(e => alert(e.message));
  			})
  		.catch(function(error) {alert(e.message)  
  			});  		
  	});
  	creaUs.addEventListener('click', e =>{
      if (txtNomreg.value!=''&&txtApPatreg.value!=''&&txtApMatreg.value!='') {
        if (txtTelreg.value!=''&&txtTelreg.value.length==10) {          
          const nombre = txtNomreg.value;
          const appat = txtApPatreg.value;
          const apmat = txtApMatreg.value;
          const tel = txtTelreg.value;
      		const email = txtEmailreg.value;
      		const pass = txtPasswordreg.value;
      		const auth = firebase.auth();          
      		const promise = auth.createUserWithEmailAndPassword(email, pass);  
          firebase.auth().onAuthStateChanged(firebaseUser=>{
          if (firebaseUser) {
            writeUserData(firebaseUser.uid,email,nombre,appat,apmat,tel); 
            auth.currentUser.sendEmailVerification().then(function() {
            alert('Recibira un correo de verificación');
            }).catch(function(error) {
            // An error happened.
            });         
          }
          });      
      		promise.catch(e => alert(e.message));
        }else{alert('La longitud del teléfono es incorrecta');}
      }else{alert('Datos Incompletos');}
  	});    
  	firebase.auth().onAuthStateChanged(firebaseUser=>{      
  		if (firebaseUser) {
        document.getElementById('formulario').classList.add('hide');
        document.getElementById('load').classList.remove('hide');
        $('#ModalNewUs').foundation('close');
        setTimeout("redireccionar()",3000);  			
  		}
  		else{
  		}
  	});
    reset.addEventListener('click',e =>{
      var auth = firebase.auth();
      var emailAddress = txtEmailrec.value;
      auth.sendPasswordResetEmail(emailAddress).then(function() {
      alert("Recibirás un enlace para restablecer tu contraseña por email a la dirección asociada a tu cuenta.")
      }).catch(function(error) {
      alert("Ingresa tu Correo en el campo correspondiente")
      });
    });
    spass.addEventListener('click', e=>{
      if (txtPassword.type=="password") {
        txtPassword.type="text";
      }
      else{
        txtPassword.type="password";
      }
    }); 
    spassreg.addEventListener('click', e=>{
      if (txtPasswordreg.type=="password") {
        txtPasswordreg.type="text";
      }
      else{
        txtPasswordreg.type="password";
      }
    });     

 }());
 