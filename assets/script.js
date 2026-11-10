(function(){
  // ---- thoranam (mango leaves + marigold) ----
  function buildThoranam(el){
    var w = el.clientWidth || 400, step = 26, n = Math.ceil(w/step)+1, html='';
    for(var i=0;i<n;i++){
      var x=i*step-6, isFlower=i%3===1, h=isFlower?0:(i%2?52:44);
      if(isFlower){
        html+='<div class="t-item" style="left:'+(x+2)+'px;animation-delay:'+(i*0.13)+'s"><svg width="18" height="40" viewBox="0 0 18 40"><line x1="9" y1="0" x2="9" y2="8" stroke="#9c6a12"/><use href="#marigold" x="0" y="6" width="18" height="18"/><use href="#marigold" x="2" y="22" width="14" height="14"/></svg></div>';
      } else {
        html+='<div class="t-item" style="left:'+x+'px;animation-delay:'+(i*0.13)+'s"><svg width="22" height="'+h+'" viewBox="0 0 20 60" preserveAspectRatio="none"><use href="#leaf"/></svg></div>';
      }
    }
    el.innerHTML=html;
  }
  function allThoranam(){document.querySelectorAll('.thoranam,.house-garland').forEach(buildThoranam);}
  document.querySelectorAll('.house-garland').forEach(function(g){g.classList.add('thoranam');g.style.position='absolute';g.style.top='7px';});
  allThoranam(); window.addEventListener('resize',allThoranam);

  // ---- reveal on scroll ----
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
  },{threshold:.12}) : null;
  document.querySelectorAll('.reveal').forEach(function(r){ io ? io.observe(r) : r.classList.add('in'); });

  // ---- petals ----
  var petals=document.querySelector('.petals'), colors=['#f7931e','#ffb400','#ffd34d','#e2453c','#ff7a00'];
  function petalShower(count){
    for(var i=0;i<count;i++){
      (function(i){ setTimeout(function(){
        var p=document.createElement('span'); p.className='petal';
        p.style.left=(Math.random()*100)+'vw';
        p.style.background=colors[i%colors.length];
        p.style.setProperty('--dx',(Math.random()*120-60)+'px');
        var d=4+Math.random()*4; p.style.animationDuration=d+'s';
        var s=8+Math.random()*10; p.style.width=s+'px'; p.style.height=s+'px';
        petals.appendChild(p); setTimeout(function(){p.remove();},d*1000+200);
      }, i*90); })(i);
    }
  }

  // ---- cover open ----
  var cover=document.getElementById('cover');
  function openInvite(){
    if(cover.classList.contains('open')) return;
    cover.classList.add('open'); document.body.classList.remove('locked');
    petalShower(45);
    setTimeout(function(){cover.classList.add('gone'); allThoranam();},1700);
  }
  document.getElementById('openBtn').addEventListener('click',openInvite);
  if(/[?&]open=1/.test(location.search)){ cover.classList.add('open','gone'); document.body.classList.remove('locked'); }

  // ---- countdown ----
  var target=new Date('2026-12-14T04:30:00+05:30').getTime(), end=new Date('2026-12-14T06:00:00+05:30').getTime();
  var D=document.getElementById('cd-d'),H=document.getElementById('cd-h'),M=document.getElementById('cd-m'),S=document.getElementById('cd-s'),msg=document.getElementById('cd-msg');
  function pad(n){return (n<10?'0':'')+n;}
  function tick(){
    var now=Date.now(), diff=target-now;
    if(diff<=0){
      D.textContent=H.textContent=M.textContent=S.textContent='00';
      msg.textContent = now<end ? 'சுபவேளை நடைபெறுகிறது! 🙏' : 'விழா இனிதே நடைபெற்றது. நன்றி! 🙏';
      return;
    }
    var s=Math.floor(diff/1000);
    D.textContent=Math.floor(s/86400); H.textContent=pad(Math.floor(s%86400/3600)); M.textContent=pad(Math.floor(s%3600/60)); S.textContent=pad(s%60);
  }
  tick(); setInterval(tick,1000);

  // ---- share ----
  document.getElementById('shareBtn').addEventListener('click',function(){
    var data={title:'புதுமனை புகுவிழா அழைப்பிதழ்',text:'14-12-2026 திங்கட்கிழமை காலை 4.30 - 6.00 மணி · கொக்குப்பாளையம், பண்ருட்டி. அன்புடன் அழைக்கிறோம்!',url:location.href.split('?')[0]};
    if(navigator.share){navigator.share(data).catch(function(){});}
    else{ window.open('https://wa.me/?text='+encodeURIComponent(data.title+'\n'+data.text+'\n'+data.url),'_blank'); }
  });
})();
