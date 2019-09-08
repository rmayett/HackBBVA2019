function redireccionar(){
      window.location.replace("index.html");
    }
(function(){  
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
  //Obtener elementos 
  var em = document.getElementById('email');   
  var name = document.getElementById('name'); 
  var tel = document.getElementById('tel');
  var sal = document.getElementById('sal');
  var cierra = document.getElementById('Close');  
  var reset = document.getElementById('Change');
  var del = document.getElementById('Delete');
  var pass = document.getElementById('txtPassword');
  var tran = document.getElementById('Transacdiv');
  var state = document.getElementById('Statediv');
  var move = document.getElementById('Movediv');
  var welcome = document.getElementById('bienvenido');  
  var usertra = document.getElementById('UserTransf');
  var monto = document.getElementById('Monto');  
  var movimiento = document.getElementById('Movimientos'); 
  var chat = document.getElementById('Chat'); 
  var respm = document.getElementById('RespuestaMe');
  var resp = document.getElementById('Resp');
  var respuesta = document.getElementById('Respuesta');
  var texto = document.getElementById('texto');
  //Crear referencias 

  //sincronizacion  
  document.getElementById('Transferir').addEventListener('click',function(){
    var user = firebase.auth().currentUser;
    var fecha = new Date();
    var saldoref = firebase.database().ref('users').child(user.uid+'/saldo');
    var saldorefben = firebase.database().ref('users').child(usertra.value+'/saldo');    
    var saldo = 0; 
    var saldoben = 0;
    if (usertra.value!=''&&monto.value!=''&&monto.value>0) {         
    firebase.database().ref('users/'+usertra.value).once("value",snapshot => {
        if (snapshot.exists()){
          saldoref.once('value', snap=>{
                saldo = snap.val();                
          });
        }else{alert('No existe el beneficiario')}
    }).then(function(){
      if (parseInt(saldo)>monto.value) {
        firebase.database().ref('users/'+user.uid+'/movimientos/'+user.uid+'-'+fecha.getHours()+'-'+fecha.getMinutes()+'-'+fecha.getDate()+'-'+(fecha.getMonth()+1)+'-'+fecha.getFullYear()).set({
          fecha: fecha.getDate()+"/"+(fecha.getMonth()+1)+"/"+fecha.getFullYear(),
          hora: fecha.getHours()+":"+fecha.getMinutes(),
          banco: 'Criptobank',
          beneficiario: usertra.value, 
          monto: '-'+monto.value     
          }).then(function(){
            saldorefben.once('value', snap=>{
              saldoben=snap.val();                        
            }).then(function(){
              var newsalben=parseInt(saldoben)+parseInt(monto.value);
              var newsal=saldo-monto.value;
              firebase.database().ref('users/'+ usertra.value+'/').update({
                saldo: newsalben
                }).then(function(){
                  });
              firebase.database().ref('users/'+ user.uid+'/').update({
                saldo: newsal
                }).then(function(){
                  firebase.database().ref('users/'+usertra.value+'/movimientos/'+usertra.value+'-'+fecha.getHours()+'-'+fecha.getMinutes()+'-'+fecha.getDate()+'-'+(fecha.getMonth()+1)+'-'+fecha.getFullYear()).set({
                    fecha: fecha.getDate()+"/"+(fecha.getMonth()+1)+"/"+fecha.getFullYear(),
                    hora: fecha.getHours()+":"+fecha.getMinutes(),
                    banco: 'Criptobank',
                    beneficiario: user.uid, 
                    monto: '+'+monto.value     
                    })
                  alert('Transacción realizada con exito');
                  });
            }).catch(function(error){alert('No pudo realizarse la transacción');});                      
            }).catch(function(error){
              alert('No pudo realizarse la transacción');
              });            
      }
      else{alert('Saldo insuficiente');}
    });}else{alert('Faltan campos');}    
  });
  document.getElementById('menos').addEventListener('click',function() {
    if (monto.value>0) {
      monto.value=monto.value-1;      
    }
    if (monto.value<=0){
      monto.value=0;
    }
  });
  document.getElementById('mas').addEventListener('click',function() {
    if (monto.value>=0) {
      monto.value=parseInt(monto.value)+1;      
    }
  });
  document.getElementById('Soporte').addEventListener('click',function(){
    welcome.classList.add('hide');
    state.classList.add('hide');
    move.classList.add('hide');
    tran.classList.add('hide');
    chat.classList.remove('hide');
    var fecha = new Date();
    document.getElementById('Horac').innerText=fecha.getHours()+":"+fecha.getMinutes()+'| Hoy';
    respuesta.innerText='';
    respm.classList.add('hide');
    resp.classList.add('hide');
    texto.disabled=false;
    document.getElementById('Send').disabled=false; 
  });  
  document.getElementById('Inicio').addEventListener('click',function(){
    welcome.classList.remove('hide');
    state.classList.add('hide');
    move.classList.add('hide');
    tran.classList.add('hide');
    chat.classList.add('hide');
  });
  document.getElementById('Transac').addEventListener('click',function(){
      tran.classList.remove('hide');
      state.classList.add('hide');
      move.classList.add('hide');
      welcome.classList.add('hide');
      chat.classList.add('hide');
    });
  document.getElementById('State').addEventListener('click',function(){
      state.classList.remove('hide');
      tran.classList.add('hide');
      move.classList.add('hide');  
      welcome.classList.add('hide');
      chat.classList.add('hide');
        tel.innerHTML='';
        cuenta.innerHTML=''; 
        em.innerHTML='';
        sal.innerHTML='';
        name.innerHTML='';           
        var user = firebase.auth().currentUser;
        var dbConUs = firebase.database().ref('users').child(user.uid+'/saldo');
        var dbConTel = firebase.database().ref('users').child(user.uid+'/telefono');
        var dbConNom = firebase.database().ref('users').child(user.uid+'/nombre');
        var dbConApP = firebase.database().ref('users').child(user.uid+'/apellidopaterno');
        var dbConApM = firebase.database().ref('users').child(user.uid+'/apellidomaterno');            
        var emailu = document.createElement('tr');
        var uuid = document.createElement('tr');
        var tele = document.createElement('tr');
        var uuid = document.createElement('tr');
        var saldos = document.createElement('tr');
        var nam = document.createElement('td');
        var app = document.createElement('td');
        var apm = document.createElement('td');
        var etiqueta = document.createElement('td');
        etiqueta.innerText = "Nombre: ";
        emailu.innerText = "Correo: " + user.email;
        uuid.innerText = "ID de Cuenta: " + user.uid; 
        dbConNom.on('value', snap=>{
          nam.innerText= snap.val();
        });
        dbConApP.on('value', snap=>{
          app.innerText= snap.val();
        });
        dbConApM.on('value', snap=>{
          apm.innerText= snap.val();
        });       
        dbConUs.on('value', snap=>{
          saldos.innerText= 'Su saldo es: '+snap.val();
        });
        dbConTel.on('value', snap=>{
          tele.innerText= 'Telefono: '+snap.val();
        });
        tel.appendChild(tele);
        cuenta.appendChild(uuid); 
        em.appendChild(emailu);
        sal.appendChild(saldos);
        name.appendChild(etiqueta);
        name.appendChild(nam);
        name.appendChild(app);
        name.appendChild(apm);
    });
  document.getElementById('Move').addEventListener('click',function(){
      move.classList.remove('hide');
      state.classList.add('hide');
      tran.classList.add('hide');
      welcome.classList.add('hide');
      chat.classList.add('hide');
      var user = firebase.auth().currentUser;     
      firebase.database().ref('users/'+user.uid+'/movimientos').orderByChild('fecha').on('value',snap=>{ 
        movimiento.innerHTML='';       
        var index=[];
        for (var x in snap.val()) {
          index.push(x);        
        }
        for (var i = 0; i < index.length; i++) { 
          var aux = document.createElement('tr');
          aux.innerHTML="<td>"+snap.val()[index[i]].banco+"</td><td>"+snap.val()[index[i]].beneficiario+"</td><td>"+snap.val()[index[i]].fecha+"</td><td>"+snap.val()[index[i]].hora+"</td><td>"+snap.val()[index[i]].monto+"</td>";
          movimiento.appendChild(aux);
        }              
      });
    });
  del.addEventListener('click',e=>{
    var user = firebase.auth().currentUser;
    var userem = user.email;
    var credential = firebase.auth.EmailAuthProvider.credential(
    userem,
    pass.value
    );
    user.reauthenticateAndRetrieveDataWithCredential(credential).then(function() {
      user.delete().then(function() {
        firebase.database().ref('users/' + user.uid).remove();      
      }).catch(function(error) {
      // An error happened.
      });
    }).catch(function(error) {
    // An error happened.
    });    
  });  
  cierra.addEventListener('click', e=>{
    firebase.auth().signOut();
  });
  reset.addEventListener('click',e =>{
      var auth = firebase.auth();
      var emailAddress = auth.currentUser.email;
      auth.sendPasswordResetEmail(emailAddress).then(function() {
      alert("Recibirás un enlace para restablecer tu contraseña por email a la dirección asociada a tu cuenta.")
      }).catch(function(error) {
      alert("Ingresa tu Correo en el campo correspondiente")
      });
    });  
  firebase.auth().onAuthStateChanged(firebaseUser=>{        
     if (firebaseUser) { 
      //logeado     
      var user = firebase.auth().currentUser;
      firebase.database().ref('users').child(user.uid).once('value').then(function(snap){        
        if (snap.exists()===true) {
          var fecha = new Date();
          if (fecha.getHours()<6||fecha.getHours()>17) {
            document.getElementById('Transac').classList.add('disabled');
          }         
          var title = document.getElementById('titulo'); 
          var usuario = document.getElementById('navbarUser'); 
          var dbConNom = firebase.database().ref('users').child(user.uid+'/nombre');
          dbConNom.on('value', snap=>{        
            if (user.emailVerified===true) {
              title.innerHTML = "<h2>"+'<i class="fas fa-user-shield"></i>'+" Bienvenido a Criptobank "+snap.val()+"</h2><br><p>"+'<i class="fas fa-calendar"></i>'+" Fecha de Ingreso: "+fecha.getDate()+"/"+(fecha.getMonth()+1)+"/"+fecha.getFullYear()+'</p><p> <i class="fas fa-stopwatch"></i>'+" Hora de ingreso: "+fecha.getHours()+":"+fecha.getMinutes()+"</p>";
              document.getElementById('Transferir').removeAttribute("disabled","");
              document.getElementById('dep').classList.remove('hide');
            }
            else{
              document.getElementById('dep').classList.add('hide');
              document.getElementById('Transferir').setAttribute("disabled","");
              title.innerHTML = "<h2>"+'<i class="fas fa-user-shield"></i>'+" Bienvenido a Criptobank "+snap.val()+"</h2><br><p>"+'<i class="fas fa-calendar"></i>'+" Fecha de Ingreso: "+fecha.getDate()+"/"+(fecha.getMonth()+1)+"/"+fecha.getFullYear()+'</p><p> <i class="fas fa-stopwatch"></i>'+" Hora de ingreso: "+fecha.getHours()+":"+fecha.getMinutes()+'</p><div class="alert alert-warning alert-dismissible fade show" role="alert"><i class="fi-x"></i>Usuario No Verificado<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
              document.getElementById('veruser').classList.remove('hide');
              document.getElementById('veruser').addEventListener('click', e =>{
                var user = firebase.auth().currentUser; 
                user.sendEmailVerification().then(function() {
                  alert('Correo de Verificacion Enviado');
                }).catch(function(error) {
                  alert('Error al enviar el correo de Verificacion');}); });
            }            
            usuario.innerHTML = '<i class="far fa-user"></i> '+snap.val();
          });
        }
        else{
          firebase.auth().signOut();
          alert('Acceso Denegado');
        }
      });               
    }
    else{
      setTimeout("redireccionar()",50);  
    }
  });
  document.getElementById('Send').addEventListener('click',function(){    
    var fecha = new Date();
    document.getElementById('Horaenv').innerText=fecha.getHours()+":"+fecha.getMinutes()+' | Hoy';
    document.getElementById('Horaresp').innerText=fecha.getHours()+":"+fecha.getMinutes()+' | Hoy';
    respuesta.innerText=texto.value;
    respm.classList.remove('hide');
    resp.classList.remove('hide');
    texto.value="";
    texto.disabled=true;
    document.getElementById('Send').disabled=true;     
  });
  
  paypal.Buttons({

            // Set up the transaction
            createOrder: function(data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: '100.0'
                        }
                    }]
                });
            },

            // Finalize the transaction
            onApprove: function(data, actions) {
                return actions.order.capture().then(function(details) {
                    // Show a success message to the buyer
                    var user = firebase.auth().currentUser;
                    var dbConNom = firebase.database().ref('users').child(user.uid+'/nombre');
                    var dbConSal = firebase.database().ref('users').child(user.uid+'/saldo');
                    var saldo = 0;
                    dbConSal.on('value', snap=>{
                    saldo = snap.val();
                    });
                    var newsal = 0;
                    newsal = parseInt(saldo)+parseInt(details.purchase_units[0].amount.value);                    
                    firebase.database().ref('users/'+ user.uid+'/').update({
                      saldo: newsal
                    });
                    dbConNom.on('value', snap=>{
                      alert('Transaction completed by ' + snap.val() + ' total: '+details.purchase_units[0].amount.value);
                    }); 
                });
            },
            onError: function (err) {
              alert('El pago no pudo ser procesado');
            }
        }).render('#paypal');
  

}());  