import { printPost } from './printPost.js';

export const commentPublish = (comment, category, userID) => {
  try {
    const userDocRef = data.collection('post').doc().set({
      comment,
      category,
      userID,
      date: firebase.firestore.Timestamp.fromDate(new Date()),
      likes: [],
    });
  } catch (e) {
    console.log(e);
  }
};

export const loadPost = async (containerDOM) => {
  try {
    const users = await userInfo();
    await data.collection('post').orderBy('date', 'desc').onSnapshot((querySnapshot) => {
      containerDOM.innerHTML = '';
      querySnapshot.forEach((doc) => {
        const postid = doc.id;
        const post = doc.data();
        const user = users.find(user => user.id === post.userID);
        containerDOM.appendChild(printPost(post, user, postid));
      });
    });
  } catch (e) {
    console.log(e);
  }
};

export const currentUserPost = async (containerDOM, currentUser) => {
  try {
    const user = {
      name: currentUser.displayName,
      photo: currentUser.photoURL,
    };
    await data.collection('post').where('userID', '==', currentUser.uid).orderBy('date', 'desc')
      .onSnapshot((querySnapshot) => {
        containerDOM.innerHTML = '';
        querySnapshot.forEach(async (doc) => {
          const postid = doc.id;
          const post = doc.data();
          containerDOM.appendChild(printPost(post, user, postid));
        });
      });
  } catch (e) {
    console.log(e);
  }
};

export const deletePost = async (id) => {
  try {
    await data.collection('post').doc(id).delete();
  } catch (e) {
    console.log(e);
  }
};

const userInfo = async () => {
  const users = [];
  await data.collection('users').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, name: doc.data().name, photo: doc.data().photo });
    });
  });
  return users;
};


// coloca y quita los likes.
export async function likePost(currentUserId, postId, pushLike) {
  const postRef = data.collection('post').doc(postId);
  if (pushLike) {
    postRef.update({
      likes: firebase.firestore.FieldValue.arrayRemove(currentUserId),
    });
  } else {
    postRef.update({
      likes: firebase.firestore.FieldValue.arrayUnion(currentUserId),
    });
  }
}
