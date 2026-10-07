/* Fiche de grammaire d'un chapitre. La page définit avant ce script :
   LESSON = {
     goals:  [{jp, fr}],
     points: [{title, struct:[jp], expl, ex:[{jp, fr}],
               drill:{title, items:[{prompt, q?, a, fr}]}}]
   }
   Notation dans les textes japonais :
   - 漢字[よみ]     furigana
   - {te:起きて}    mot coloré (te, kara, p, adj, q, mou) */

function ruby(s){
  return s.replace(/([一-鿿々]+)\[([^\]]+)\]/g,'<ruby>$1<rt>$2</rt></ruby>');
}
function jp(s){
  return ruby(s).replace(/\{(\w+):([^}]*)\}/g,'<span class="k-$1">$2</span>');
}

function renderLesson(L){
  const goals=`<section class="goals">
      <h2>Objectifs</h2>
      <ol>${L.goals.map(g=>`<li><div class="jp">${jp(g.jp)}</div><div class="fr">${g.fr}</div></li>`).join('')}</ol>
    </section>`;
  const points=L.points.map((p,i)=>{
    const ex=p.ex.map(e=>`<li><div class="jp">${jp(e.jp)}</div><div class="fr">${e.fr}</div></li>`).join('');
    const drill=p.drill?`<div class="drill">
        <h4>${jp(p.drill.title)}</h4>
        <ol>${p.drill.items.map(d=>`<li>
          <div class="prompt jp">${jp(d.prompt)}</div>
          <details><summary>Voir la réponse</summary>
            ${d.q?`<div class="jp">${jp(d.q)}</div>`:''}
            <div class="jp ans">${jp(d.a)}</div>
            <div class="fr">${d.fr}</div>
          </details></li>`).join('')}</ol>
      </div>`:'';
    return `<section class="point" id="p${i+1}">
        <h3><span class="num">${i+1}</span>${jp(p.title)}</h3>
        <div class="struct">${p.struct.map(s=>`<div class="jp">${jp(s)}</div>`).join('')}</div>
        <p class="expl">${jp(p.expl)}</p>
        <h4>Exemples</h4>
        <ul class="ex">${ex}</ul>
        ${drill}
      </section>`;
  }).join('');
  const toc=`<nav class="toc">${L.points.map((p,i)=>`<a href="#p${i+1}"><span class="num">${i+1}</span>${jp(p.title)}</a>`).join('')}</nav>`;
  document.getElementById('lesson').innerHTML=goals+toc+points;
}

renderLesson(LESSON);
