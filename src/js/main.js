import {checkAuthState, register, exit, google, facebook, login} from  './auth.js'
import {enviarConvalidacionAFirebase, readPost,guardandoComentarios} from './app.js'

 
window.onload = () =>{
 
    checkAuthState((firebaseUser) => {
        if (firebaseUser){

            login_pagecontent.style.display ='none';
            header_page.style.display='block';
            footer_page.style.display='block';
            index_page.style.display='block';
            readPostFromDatabase();

        }else{
            login_pagecontent.style.display ='block';
            header_page.style.display='none';
            footer_page.style.display='none';
            index_page.style.display='none';
        }
    });
    
}

const registerWithEmail =()=>{

    const email = textEmail.value;
    const pass = password.value;

    register(email,pass);

};

btnSignUp.addEventListener('click', registerWithEmail);

const loginWithEmail =()=>{

    const loginEmail = textEmail.value;
    const loginPass = password.value;
    if(loginEmail != '' && loginPass != ''){
        login(loginEmail,loginPass);
    }if (loginEmail != '@' && loginPass !== ''){
        document.getElementById('loginError').innerHTML = 'Debes ingresar un correo electrónico valido.'
    }else{
        document.getElementById('loginError').innerHTML = 'Debes ingresar tu email y password'

    }


};

btnLogin.addEventListener('click', loginWithEmail);

const logOut =() =>{

    exit()
}

btnLogout.addEventListener('click', logOut);

const loginGoogle =()=>{

    google()

}

btnGoogle.addEventListener('click', loginGoogle)

const loginFacebook =()=>{

    facebook()
}
btnFacebook.addEventListener('click', loginFacebook)


 const guardarComentarios = () => {

    const name = firebase.auth().currentUser.displayName;
    const title = tituloaconvalidar.value;
    const coment = coments.value;
    let photoUser = firebase.auth().currentUser.photoURL;
    let user_photo= photoUser !== null ? photoUser: 'IMG/avatar-default.png'
    const userId = firebase.auth().currentUser.uid;
    const tags = hashtagsPost.value;
    document.getElementById('coments').value ='';
    document.getElementById('tituloaconvalidar').value='';
    document.getElementById('hashtagsPost').value='';
    //alert("tu comentario ha sido creado")

    
    if ( name == ''){
        alert(` Se deben rellenar todos los campos para poder publicar` )
    }if ( title == ''){
        alert(` Se deben rellenar todos los campos para poder publicar` ) 
    }if ( coment == ''){
        alert(` Se deben rellenar todos los campos para poder publicar` )
    }if ( tags == ''){
        alert(` Se deben rellenar todos los campos para poder publicar` )
    } 
    enviarConvalidacionAFirebase(user_photo,userId, name,title,coment,tags);

 }
 
btnComents.addEventListener('click', guardarComentarios)


const readPostFromDatabase = () => {
    root.style.display='block'
    let currentDate = new Date()
    let day = currentDate.getDate() 
    let month = currentDate.getMonth().toString()
    let year = currentDate.getFullYear()
    
    readPost((coment)=>{            
        newcoments.innerHTML = 
      `          
      <div class='row' id= ${coment.key}>  
          <div class='col-3 col-m-2 col-s-12'></div>
          <div class='col-6 col-m-8 col-s-12'>  
                    <div class='box_text'>
                        <div class='box-header'>
                         <div class='avatar_post'><img src='${coment.val().profile_picture}'/></div> 
                          <div class='name-post'>${coment.val().author}</div>
                        </div>
                        <div class='box-content'>
                        <h3>${coment.val().title}</h3><br>
                          <div class='content'>                          
                            <p>${coment.val().body}</p>
                          </div><br>
                          <h4>${coment.val().hashtag}</h4><br>
                          <span> Creado: ${day} / ${month} / ${year} </span>
                        </div>
                        <div class='box-buttons'>
                       <div class='row'>
                        <div class='col-4'>
                            <button class='btn-likecoment'><span class='fa fa-thumbs-up'></span> Like</button></div>
                         <div class='col-4'>
                            <button  class='btn-likecoment'><span class='ion-chatbox-working'></span>Comentar</button></div>
                            <div class='col-4'>
                            <button  id="btn${coment.key}" userpp=${coment.key} class='btn-likecoment'><span class='ion-chatbox-working'></span>Borrar</button></div>   
                               </div>
                        </div>
                 </div>     
            </div>
        <div class='col-3 col-m-2 col-s-12'></div>
         </div>` + newcoments.innerHTML;  
         document.getElementById("btn"+ coment.key).addEventListener('click', ()=>{
             deletePost(deletePost1, key);
         } );
                      
       //  document.getElementById('btn').addEventListener('click', deletePost)
       if ( coment.val().hashtag == '#receta' || coment.val().hashtag == '#recetas' || coment.val().hashtag == '#recetasaludable'  ) {
        recipes_post.innerHTML =  `
          
        <div class='row' id= ${coment.key}>  
            <div class='col-3 col-m-2 col-s-12'></div>
            <div class='col-6 col-m-8 col-s-12'>  
                      <div class='box_text'>
                          <div class='box-header'>
                           <div class='avatar_post'><img src='${coment.val().profile_picture}'/></div> 
                            <div class='name-post'>${coment.val().author}</div>
                          </div>
                          <div class='box-content'>
                          <h3>${coment.val().title}</h3><br>
                            <div class='content'>                            
                              <p>${coment.val().body}</p><br>
                            </div>
                            <h4>${coment.val().hashtag}</h4><br>
                            <span> Creado:${day} / ${month} / ${year} </span>
                          </div>
                          <div class='box-buttons'>
                         <div class='row'>
                          <div class='col-6'>
                              <button class='btn-likecoment'><span class='fa fa-thumbs-up'></span> Like</button></div>
                           <div class='col-4'>
                              <button  class='btn-likecoment' id='comentarpost${coment.key}'><span class='ion-chatbox-working'></span>Comentar</button></div>
                                <div class='col-4'></div>
                                 </div>
                                 <div id='comentPost${coment.key}'> </div>
                                 <div id='print${coment.key}'> </div>
                          </div>
                   </div>     
              </div>
          <div class='col-3 col-m-2 col-s-12'></div>
           </div>` + recipes_post.innerHTML; 
           document.getElementById(`comentarpost${coment.key}`).addEventListener('click', readComent)
            }
        })
    };     
  
const readComent =(e) =>{
const key = e.target.getAttribute("id").slice(12)
console.log(key)

document.getElementById("comentPost"+key).innerHTML = `    
   <div class="container" id="">
    <div class="row">
        <div class="col-4">
            <textarea name="comentario" id="comentsPost${key}" cols="30" rows="10"
                placeholder="Escribe aqui tu comentario..."></textarea>           
            <button id='btnComent${key}'>Comentar</button>
        </div>
    </div>
</div>
    ` 
    document.getElementById(`btnComent${key}`).addEventListener('click', saveComent)
}


const saveComent =(e) =>{
    const key = e.target.getAttribute("id").slice(9)
    const name=firebase.auth().currentUser.displayName;
    const contenido= document.getElementById(`comentsPost${key}`).value
   
    console.log(key)

    guardandoComentarios(key,contenido,name)

}



const showUserInfo = () => {
    index_page.style.display='none';
    recipes_container.style.display ='none';
    profile_container.style.display ='block';
    search_container.style.display ='none';
    addpost_container.style.display ='none';

    const userInfo = firebase.auth().currentUser;
     console.log(userInfo)   
    //console.log(userInfo)
    if(userInfo.photoURL != null){
           
    profile_container.innerHTML =`
    <div class='container'>
    <div class='row'>
    <div class='col-4 col-m-2'></div>
    <div class='col-4 col-m-8 col-s-12'>
    <div class='card card-one'>
           <div class='header_card'>
           <div class='avatar'><img src='${userInfo.photoURL}' alt='Jhon Doe' /></div>
           </div>
           <p class='info-user-p'>${userInfo.email}</p>
           <div class='desc'>
           Lorem ipsum dolor sit amet, consectetur adipisicing elit et cupiditate deleniti.
           </div>
           
           <div class='footer_card'>
           <button id='btn-logoutA' class='btn-likecoment'>Cerrar Sesión</button>
           </div>
     </div>
     </div>
     <div class='col-4 col-m-2'></div>
     </div>
     </div>
            `;document.getElementById('btn-logoutA').addEventListener('click', logOut)
           
       }else{
        profile_container.innerHTML =
        `   <div class='container'>
        <div class='row'>
        <div class='col-4 col-m-2'></div>
        <div class='col-4 col-m-8 col-s-12'>
        <div class='card card-one'>
               <div class='header_card'>
               <div class='avatar'><img src='IMG/avatar-default.png' alt='Jhon Doe' /></div>
               </div>
               <p class='info-user-p'>${userInfo.email}</p>
               <div class='desc'>
               Lorem ipsum dolor sit amet, consectetur adipisicing elit et cupiditate deleniti.
               </div>               
               <div class='footer_card'>
               <button id='btn-logout' class='btn-likecoment'>Cerrar Sesión</button>
               </div>
         </div>
         </div>
         <div class='col-4 col-m-2'></div>
         </div>
         </div>
       `;document.getElementById('btn-logout').addEventListener('click', logOut)
    
    }
    }

showUser.addEventListener('click', showUserInfo);    

document.getElementById('addPost').addEventListener('click', () =>{

    document.getElementById('addpost_container').style.display ='block';
    document.getElementById('index_page').style.display='none';
    document.getElementById('search_container').style.display ='none';
    document.getElementById('profile_container').style.display ='none';
    document.getElementById('recipes_container').style.display ='none';

})


document.getElementById('index').addEventListener('click', () =>{

    document.getElementById('addpost_container').style.display ='none';
    document.getElementById('index_page').style.display='block';
    document.getElementById('search_container').style.display ='none';
    document.getElementById('profile_container').style.display ='none';
    document.getElementById('recipes_container').style.display ='none';

})

document.getElementById('search').addEventListener('click', () =>{

    document.getElementById('addpost_container').style.display ='none';
    document.getElementById('index_page').style.display='none';
    document.getElementById('search_container').style.display ='block';
    document.getElementById('profile_container').style.display ='none';
    document.getElementById('recipes_container').style.display ='none';

})

document.getElementById('recipes').addEventListener('click', () =>{

    document.getElementById('addpost_container').style.display ='none';
    document.getElementById('index_page').style.display='none';
    document.getElementById('search_container').style.display ='block';
    document.getElementById('profile_container').style.display ='none';
    document.getElementById('recipes_container').style.display ='block';

})

// active buttons footer

let btns = document.getElementsByClassName('btn-act');
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener('click', function() {
  let current = document.getElementsByClassName('active');
  current[0].className = current[0].className.replace(' active', '');
  this.className += ' active';
  });
}