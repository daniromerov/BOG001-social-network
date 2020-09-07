import printPost from '../components/printPost.js';
import profile from '../views/profile.js';

export const commentPublish = (comment, category, userID) => {
  try {
    var userDocRef = data.collection('post').doc().set({
      comment,
      category,
      userID,
      date: firebase.firestore.Timestamp.fromDate(new Date()),
    });
  } catch (e) {
    console.log(e);
  }
};
//onSnapshot,cambios de la colección post,trae o quita los cambios que se hagan
export const loadPost =  async (containerDOM) =>{
  try {
    let users = await userInfo();
      await data.collection('post').orderBy('date','desc').onSnapshot((querySnapshot) => {
        containerDOM.innerHTML= '';
        querySnapshot.forEach( (doc) => {
        let postid = doc.id;
        let post =  doc.data();
        const user =  users.find((user) => user.id === post.userID);
        containerDOM.appendChild(printPost(post, user, postid));
        });
      });
  } catch (e) {
      console.log(e);
  }
};

//User login autora del post, posts del usuario logueado
export const currentUserPost =  async (containerDOM, currentUser) =>{
  try {
      let user = {
        name: currentUser.displayName,
        photo: currentUser.photoURL
      }
      await data.collection('post').where("userID", "==", currentUser.uid).orderBy('date','desc')
      .onSnapshot((querySnapshot) => {
        containerDOM.innerHTML= '';
        querySnapshot.forEach(async (doc) => {
        let postid = doc.id;
        let post = doc.data();
        containerDOM.appendChild(printPost(post, user, postid));
        });
      });
  } catch (e) {
      console.log(e);
  }
};

export const deletePost = async(id) =>{
  try {
    await data.collection('post').doc(id).delete();
  } catch (e) {
    console.log(e);
  }
};

/*export const updateBiography = async(id, biography) =>{
    try{
      await data.collection('users').doc(id).update({biography:biography});
    } catch (error) {
      console.log(error);
    }
  };*/

  /*export async function editBiography(id, biography) {
    const data = firebase.firestore();
    const bioRef = data.collection('users').doc(id);
    return bioRef.update({
      biography,
    });
  }*/

  export const updateBiography = async(id, biography,profileContainer) =>{
    try{
      await data.collection('users').doc(id).update({biography:biography}).onSnapshot((querySnapshot) => {
        profileContainer.innerHTML= '';
        querySnapshot.forEach((doc) => {
          const task = doc.data();
          task.id = doc.id;
          console.log(task);
          biography.value = task.biography;
          //let biography = doc.data();
          //let biographyid = doc.id;
          const user =  users.find((user) => user.id === biography.userID);
          profileContainer.appendChild(profile(biography,user,biographyid));
        });
      });
    } catch (error) {
      console.log(error);
    }
  };



export const userInfo = async() =>{
  const users = []
  await data.collection('users').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            users.push({id: doc.id, name: doc.data().name, photo: doc.data().photo, biography:doc.data().biography});
        });
      });
  return users;
};