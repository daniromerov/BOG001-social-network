import { deletePost } from '../lib/firebaseFirestore.js';
import { updateFieldData } from '../lib/firebaseFirestore.js';

//Imprime el post en el timeline y en profile
export default (post, user, postid) => {
  const newpost = document.createElement('div');
  newpost.setAttribute('id', postid);
  newpost.setAttribute('class', 'post');
  newpost.innerHTML = `<div class="card">
  <div class="content">
  <div class="header">
    <div class="profile-pic"><img src="${user.photo}" id="profile-pic"/></div>
      <div class="detail">
      <p class="name">${user.name}</p>
      <p class="posted">${post.date.toDate().toDateString()}</p>
    </div>
    <img class="categories">
  </div>
  <div id="post" class="desc" contenteditable="false">
  ${post.comment}
  </div>
  </div></div>`;

  const categoryIcon = newpost.querySelector('.categories');
  switch (post.category) {
    case 'Movie':
      categoryIcon.src = 'img/movie.png';
      break;
    case 'Documentary':
      categoryIcon.src = 'img/documentary.png';
      break;
    case 'Serie':
      categoryIcon.src = 'img/serie.png';
      break;
  }


  const icons = document.createElement('section');
  icons.setAttribute('class', 'input-comment');
  icons.innerHTML = `<div id="icons">
    <img src="img/delete.png" id="delete" class="icons"/>
    <button type="button" class="btnEdits" id="edits">
    <img src="img/edit.png" id="edit" class="icons"/>
    </button>
    <img src="img/like.png" id="likes" class="icons"/>
    <span>00000</span>
    <img src="img/comment.png" class="commentaries icons"/>
    <span>00000</span>
    </div>
    <button type="button" class="btn" id="saveBtn" style="display:none">GUARDAR</button>
    <div id="confirm">
      <h2>¿Estás seguro que quieres eliminar la publicación?</h2>
      <button type="submit" class="btn" id="deleteBtn">ELIMINAR</button>
    </div>
  <div class="inputCommentandButton">
    <textarea class="inputComment" id="comment" rows="2" required placeholder="Escribe tu comentario aquí"></textarea>
    <button type="submit" class="btnCommentaries">Enviar</button>
  </div>`;

  newpost.appendChild(icons);
  const comments = document.createElement('section');
  comments.setAttribute('class', 'newsfeed');
  comments.innerHTML = `
  <div class="comments">
      <div class="content">
        <div class="detail">
          </div>
      </div>
      <div class="desc">
      "" </div></div>`;

  if (window.location.hash === '#timeline') {
    icons.querySelector('#delete').style.display = 'none';
    icons.querySelector('#edit').style.display = 'none';
  }
  // newpost.appendChild(comments);
  const postId = newpost.getAttribute('id');
  window.addEventListener('click', (e) => {
    if (e.target === icons.querySelector('.commentaries')) {
      icons.querySelector('.inputCommentandButton').style.display = 'block';
      newpost.querySelector('.card').style.display = 'none';
    } else if (e.target === icons.querySelector('#delete')) {
      icons.querySelector('#confirm').style.display = 'block';
    } else if (e.target === icons.querySelector('#deleteBtn')) {
      //const postId = newpost.getAttribute('id');
      deletePost(postId);
    } else {
      icons.querySelector('.inputCommentandButton').style.display = 'none';
      newpost.querySelector('.card').style.display = 'block';
      icons.querySelector('#confirm').style.display = 'none';
    }
  });

  let editPost = newpost.querySelector('#post');
  const btnEdit = icons.querySelector('#edits');
  const btnSave = icons.querySelector('#saveBtn');

  btnEdit.addEventListener ('click', () => {
    editPost.contentEditable = true;
    btnSave.style.display = 'block';
    console.log('editing')

  });

  btnSave.addEventListener ('click', () => {
    updateFieldData('post',postId,{comment: editPost.innerHTML})
    console.log(postId,editPost.innerHTML);
    editPost.contentEditable = false;
    btnSave.style.display = 'none';


  });
  
  /* window.addEventListener('click', (e)=>{
    if(e.target == icons.querySelector('.commentaries')){
      icons.querySelector('.inputCommentandButton').style.display = 'block';
    }else{
      icons.querySelector('.inputCommentandButton').style.display = 'none';
    }); */

  return newpost;
};
