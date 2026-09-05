/* Shared site navigation for every Fabrizio Romano page. */
(function(){
  const current = location.pathname.split('/').pop() || 'index.html';
  const links = [
    ['index.html','Home'],['transfers.html','Transfers'],['news.html','News'],['videos.html','Videos'],['players.html','Players'],['clubs.html','Clubs'],['movies.html','Movies'],['settings.html','Settings']
  ];
  function init(){
    const host=document.querySelector('[data-global-nav]');
    if(!host)return;
    host.innerHTML=`<div class="global-nav-inner"><a class="global-brand" href="index.html"><strong>FABRIZIO</strong><span>ROMANO</span></a><button class="global-menu" aria-label="Open navigation" aria-expanded="false">☰</button><nav class="global-links">${links.map(([href,label])=>`<a href="${href}" class="${current===href?'active':''}">${label}</a>`).join('')}</nav></div><div class="movie-nav"><span>🎬 Movie Centre</span><a href="movies.html">Discover</a><a href="movies.html#trending">Trending</a><a href="movies.html#latest">Latest</a><a href="movies.html#upcoming">Upcoming</a><a href="movies.html#genres">Genres</a><a href="movies.html#artists">Artists</a></div>`;
    const btn=host.querySelector('.global-menu'), nav=host.querySelector('.global-links');
    btn?.addEventListener('click',()=>{const open=nav.classList.toggle('open');btn.setAttribute('aria-expanded',String(open));});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
