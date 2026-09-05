/* Live TMDB award-winning movie spotlight. The backend owns the TMDB credential. */
(function(){
  const API='https://fabrizio-romanio-backend.onrender.com';
  const esc=v=>String(v??'').replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]));
  const mount=()=>{
    const anchor=document.querySelector('.movie-info-band')||document.querySelector('#catalogue');
    if(!anchor||document.getElementById('awardSpotlight'))return;
    const section=document.createElement('section');
    section.id='awardSpotlight';
    section.className='award-spotlight';
    section.innerHTML='<div class="container"><div class="award-head"><div><span class="eyebrow">AWARD-WINNING SPOTLIGHT</span><h2>Celebrated films</h2><p>Explore a curated live collection of major award-winning and acclaimed films.</p></div><span class="award-live">LIVE TMDB DATA</span></div><div id="awardGrid" class="award-grid"><div class="award-loading">Loading celebrated films…</div></div><p class="award-note">Movie metadata and artwork are supplied by TMDB. This section is a curated award-winning spotlight, not an official TMDB award-count ranking.</p></div>';
    anchor.parentNode.insertBefore(section,anchor);
    const style=document.createElement('style');
    style.textContent='.award-spotlight{padding:72px 0;background:#111;color:#fff}.award-head{display:flex;justify-content:space-between;gap:20px;align-items:end;margin-bottom:25px}.award-head h2{font-size:clamp(32px,4vw,52px);line-height:.95;letter-spacing:-.055em;margin:7px 0}.award-head p{max-width:650px;color:#aaa;font-size:13px;line-height:1.6}.award-live{border:1px solid #ffffff22;border-radius:999px;padding:9px 12px;font-size:9px;font-weight:900;letter-spacing:.12em;white-space:nowrap}.award-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:14px}.award-card{display:block;color:#fff;text-decoration:none;background:#1a1a1d;border:1px solid #fff1;border-radius:8px;overflow:hidden;transition:.2s}.award-card:hover{transform:translateY(-4px);border-color:#fff3}.award-card img{width:100%;aspect-ratio:2/3;object-fit:cover;display:block}.award-copy{padding:13px}.award-copy strong{display:block;font-size:14px;line-height:1.15}.award-copy small{display:block;color:#8f9198;margin-top:7px;font-size:9px}.award-score{display:inline-block;margin-top:8px;font-size:9px;font-weight:900}.award-loading,.award-empty{grid-column:1/-1;padding:35px;border:1px dashed #ffffff22;border-radius:8px;color:#999;text-align:center}.award-note{color:#777;font-size:9px;line-height:1.6;margin-top:18px}.award-spotlight .eyebrow{color:#e30613}@media(max-width:1000px){.award-grid{grid-template-columns:repeat(3,1fr)}}@media(max-width:650px){.award-head{align-items:start;flex-direction:column}.award-grid{grid-template-columns:repeat(2,1fr)}}';
    document.head.appendChild(style);
    load();
  };
  async function load(){
    const grid=document.getElementById('awardGrid');
    try{
      const r=await fetch(API+'/api/tmdb-awards',{headers:{Accept:'application/json'}});
      if(!r.ok)throw new Error('API '+r.status);
      const data=await r.json();
      const items=Array.isArray(data)?data:(data.results||data.movies||[]);
      if(!items.length){grid.innerHTML='<div class="award-empty">No award-winning spotlight titles are available right now.</div>';return}
      grid.innerHTML=items.slice(0,10).map(v=>{
        const title=esc(v.title||'Untitled'),year=esc((v.release_date||'').slice(0,4)||v.year||'—'),poster=esc(v.poster_url||v.poster_large||'');
        return `<a class="award-card" href="movie-detail.html?id=${encodeURIComponent(v.id)}"><img src="${poster}" alt="${title}" loading="lazy"><div class="award-copy"><strong>${title}</strong><small>${year}</small>${v.vote_average?`<span class="award-score">★ ${Number(v.vote_average).toFixed(1)}/10</span>`:''}</div></a>`;
      }).join('');
    }catch(e){console.warn('TMDB awards failed:',e);grid.innerHTML='<div class="award-empty">Award data is temporarily unavailable. Please try again shortly.</div>'}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
