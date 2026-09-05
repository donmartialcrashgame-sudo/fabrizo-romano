/* Shared site navigation. Every page can use this loader for the same football + movie navigation. */
(function(){
const pages=[['index.html','Home'],['transfers.html','Transfers'],['news.html','News'],['videos.html','Videos'],['players.html','Players'],['clubs.html','Clubs'],['movies.html','Movies'],['settings.html','Settings'],['contact-support.html','Support']];
function mount(){
  let host=document.querySelector('[data-global-nav]');
  if(!host){
    const old=document.querySelector('.header,.site-header,.site-nav');
    if(old){host=document.createElement('header');old.replaceWith(host)}else{host=document.createElement('header');document.body.prepend(host)}
  }
  host.className='site-nav';
  const current=location.pathname.split('/').pop()||'index.html';
  host.innerHTML='<div class="site-nav-inner"><a class="site-brand" href="index.html"><b>FABRIZIO</b> ROMANO</a><button class="site-menu" aria-label="Open menu" aria-expanded="false">☰</button><nav>'+pages.map(p=>'<a href="'+p[0]+'" class="'+(current===p[0]?'active':'')+'">'+p[1]+'</a>').join('')+'</nav></div><div class="movie-subnav"><strong>🎬 Movie Centre</strong><a href="movies.html">Discover</a><a href="movies.html#trendingSection">Trending</a><a href="movies.html#catalogue">Latest</a><a href="movies.html#catalogue">Upcoming</a><a href="movies.html#catalogue">Genres</a><a href="artist-detail.html">Artists</a></div>';
  const b=host.querySelector('.site-menu'),n=host.querySelector('nav');
  b?.addEventListener('click',()=>{const open=n.classList.toggle('open');b.setAttribute('aria-expanded',String(open))});
  n?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{n.classList.remove('open');b?.setAttribute('aria-expanded','false')}));
}
function start(){
  if(!document.querySelector('link[data-navigation-css]')){const l=document.createElement('link');l.rel='stylesheet';l.href='navigation.css';l.dataset.navigationCss='1';document.head.appendChild(l)}
  mount();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
