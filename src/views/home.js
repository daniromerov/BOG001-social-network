export default (doc, rute)=>{
  history.replaceState({},'home', '#home');
  console.log(window.location.hash)
  const home = document.createElement('section');
  home.setAttribute('class', 'home');
  home.innerHTML = `<p class="welcome">Welcome to the largest community of series and movies lovers</p>`;
  home.addEventListener('click', (e)=>{

    doc.innerHTML = rute;
      history.replaceState({},'recover', '#/recover');
  })
  return home;
}

/*`<div class="home">
  <p class="welcome">Welcome to the largest community of series and movies lovers</p>
</div>`*/