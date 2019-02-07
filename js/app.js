export const writeUserData = (uid, name, email, imageUrl) => {
  firebase.database().ref('users/'+uid).set({
    "perfil": {
      username: name !== null ? name : firebase.auth().currentUser.email,
      email: email,
      profile_picture: imageUrl !== null ? imageUrl : false,
    }
      
  });
}

export const enviarConvalidacionAFirebase =(uid, username,title, body,imagen)=>{
  // Crear nuevo post
  const postData = {
    author: username,
    uid: uid,
    body: body,
    title: title,
    imagen: imagen !== null ? imagen : false,
    
  };

  // Llave que identifica el nuevo post
  var newPostKey = firebase.database().ref().child('posts').push().key;

  // Ingresa el post en publico y en su perfil.
  var updates = {};
  updates['/posts/' + newPostKey] = postData;
  updates['/users/' + uid + '/post/' + newPostKey] = postData;

  return firebase.database().ref().update(updates);
}

export const readPost = (onpostChange) => {
  var postRef = firebase.database().ref('posts');
  postRef.on('child_added',(coment)=> {
    onpostChange(coment);
  });
};

// export const deletePost = () => {
//   var userID = deletePost1.target.getAttribute("userid");   //userid="${coment.key}"
//   var firebaseref = firebase.database().ref('posts/'+ userID).delete();
//   firebaseref.remove().then(function(){
//     alert("hola");
//   }).catch(function(error){
//     console.log("remove failed: " + error.message)
//   })
// }
// export function deletePost(){
//  //referencia post publico 
//   let gg = firebase.database().ref('posts/'+ this.id)
//   gg.remove();
//   location.reload();  
//   //referencia en el perfil del usuario 
//   // firebase.database().ref('/users/' + firebase.auth().currentUser.uid+ '/post/'+ this.id).set({
//   //   null:null
//   // })

// };











