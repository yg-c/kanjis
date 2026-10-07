/* Fiches à retourner, communes aux pages de verbes et de vocabulaire.
   La page définit avant ce script :
   - CARDS   : verbes [{n, g, fr, obj?, masu, dict, te, ta?, nai?}]
               ou mots [{n, fr, obj?, jp}]
               ou adjectifs [{n, t:"i"|"na", fr, adj}] (formes calculées)
   - IMG_DIR : dossier des dessins, ex. "images/verbes" (fichiers NN.jpg)
   - LABEL   : mot du compteur, ex. "verbes" ou "mots"
   Le dos affiche le groupe et les formes présentes, ou le mot japonais (jp). */

/* 漢字[よみ] -> <ruby>漢字<rt>よみ</rt></ruby> */
function ruby(s){
  return s.replace(/([一-鿿々]+)\[([^\]]+)\]/g,'<ruby>$1<rt>$2</rt></ruby>');
}
const GROUPES=['','Groupe I','Groupe II','Groupe III'];
const FORMS=[['masu','ます'],['dict','辞書'],['te','て'],['ta','た'],['nai','ない']];

const grid=document.getElementById('grid');
let order=[...CARDS.keys()];

/* Formes polies d'un adjectif : 新[あたら]しい (t:"i") ou 静[しず]か (t:"na") */
const ADJ_TAGS=['です','ない','た','なかった'];
function adjForms(v){
  if(v.t==='i'){
    const stem=v.adj.slice(0,-1);   // retire le い final
    return [v.adj+'です',stem+'くないです',stem+'かったです',stem+'くなかったです'];
  }
  return [v.adj+'です',v.adj+'じゃありません',v.adj+'でした',v.adj+'じゃありませんでした'];
}

function backHTML(v){
  const obj=v.obj?`<div class="obj">(${ruby(v.obj)})</div>`:'';
  if(v.jp) return `${obj}<div class="jp">${ruby(v.jp)}</div>`;
  if(v.adj){
    // si la forme est trop longue, la coupure tombe entre l'adjectif et la terminaison
    const base=v.t==='i'?v.adj.slice(0,-1):v.adj;
    const val=f=>`<span class="nw">${ruby(base)}</span><span class="nw">${f.slice(base.length)}</span>`;
    return `<div class="grp">Adjectif en ${v.t==='i'?'い':'な'}</div>`+
      adjForms(v).map((f,i)=>`<div class="form"><span class="tag">${ADJ_TAGS[i]}</span><span class="val">${val(f)}</span></div>`).join('');
  }
  const rows=FORMS.filter(([k])=>v[k])
    .map(([k,tag])=>`<div class="form ${k}"><span class="tag">${tag}</span><span class="val">${ruby(v[k])}</span></div>`).join('');
  return `<div class="grp">${GROUPES[v.g]}</div>${obj}${rows}`;
}

function render(){
  grid.innerHTML='';
  order.forEach(i=>{
    const v=CARDS[i];
    const card=document.createElement('div');
    card.className='card'+(v.adj?' adj':FORMS.filter(([k])=>v[k]).length>3?' f5':'');
    card.innerHTML=`
      <div class="inner">
        <div class="face front">
          <img src="${IMG_DIR}/${String(v.n).padStart(2,'0')}.jpg" alt="${v.fr}">
          <div class="fr">${v.fr}</div>
          <span class="hint">toucher</span>
        </div>
        <div class="face back">${backHTML(v)}</div>
      </div>`;
    card.addEventListener('click',()=>card.classList.toggle('flip'));
    grid.appendChild(card);
  });
  document.getElementById('count').textContent=CARDS.length+' '+LABEL;
}

document.getElementById('flipAll').addEventListener('click',function(){
  this.classList.toggle('on');
  const on=this.classList.contains('on');
  document.querySelectorAll('.card').forEach(c=>c.classList.toggle('flip',on));
});
document.getElementById('reset').addEventListener('click',()=>{
  document.querySelectorAll('.card').forEach(c=>c.classList.remove('flip'));
  document.getElementById('flipAll').classList.remove('on');
});
document.getElementById('shuffle').addEventListener('click',()=>{
  for(let i=order.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[order[i],order[j]]=[order[j],order[i]];}
  render();
  document.getElementById('flipAll').classList.remove('on');
});

render();
