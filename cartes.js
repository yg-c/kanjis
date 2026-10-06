/* Fiches à retourner, communes aux pages de verbes et de vocabulaire.
   La page définit avant ce script :
   - CARDS   : verbes [{n, g, fr, obj?, masu, dict, te, ta?, nai?}]
               ou mots [{n, fr, obj?, jp}]
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

function backHTML(v){
  const obj=v.obj?`<div class="obj">(${ruby(v.obj)})</div>`:'';
  if(v.jp) return `${obj}<div class="jp">${ruby(v.jp)}</div>`;
  const rows=FORMS.filter(([k])=>v[k])
    .map(([k,tag])=>`<div class="form ${k}"><span class="tag">${tag}</span><span class="val">${ruby(v[k])}</span></div>`).join('');
  return `<div class="grp">${GROUPES[v.g]}</div>${obj}${rows}`;
}

function render(){
  grid.innerHTML='';
  order.forEach(i=>{
    const v=CARDS[i];
    const card=document.createElement('div');
    card.className='card'+(FORMS.filter(([k])=>v[k]).length>3?' f5':'');
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
