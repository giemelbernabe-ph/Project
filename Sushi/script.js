const CATS = {
  nigiri:{
    label:'Nigiri',eyebrow:'Hand-Pressed · Traditional',
    desc:'Hand-pressed rice topped with the finest cuts — the purest expression of sushi craft.',
    items:[
      {id:'n1',name:'Salmon Nigiri',tag:'Atlantic Salmon',desc:'Rich, buttery wild Atlantic salmon over seasoned shari rice.',price:12,img:'https://images.unsplash.com/photo-1618449840665-9ed506d73a34?w=500&q=80&fit=crop',popular:true},
      {id:'n2',name:'Bluefin Tuna Nigiri',tag:'Hon Maguro',desc:'Premium akami cut from the Oma peninsula — deep and umami-rich.',price:18,img:'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=500&q=80&fit=crop'},
      {id:'n3',name:'Yellowtail Nigiri',tag:'Hamachi',desc:'Silky amberjack with a gentle citrus finish.',price:14,img:'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=500&q=80&fit=crop'},
      {id:'n4',name:'Sea Urchin Nigiri',tag:'Uni · Seasonal',desc:'Fresh Hokkaido uni — intensely oceanic and creamy.',price:22,img:'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=500&q=80&fit=crop',popular:true},
      {id:'n5',name:'Shrimp Nigiri',tag:'Ebi',desc:'Sweet boiled tiger shrimp, butterflied over warm rice.',price:10,img:'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=500&q=80&fit=crop'},
      {id:'n6',name:'Mackerel Nigiri',tag:'Saba',desc:'Lightly cured mackerel with ginger and rice vinegar.',price:11,img:'https://images.unsplash.com/photo-1562802378-063ec186a863?w=500&q=80&fit=crop'},
      {id:'n7',name:'Wagyu Nigiri',tag:'A5 Japanese Beef',desc:'Lightly torched A5 wagyu — decadent and luxurious.',price:28,img:'https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=500&q=80&fit=crop',popular:true},
      {id:'n8',name:'Scallop Nigiri',tag:'Hotate',desc:'Plump Hokkaido scallop, lightly seasoned with yuzu zest.',price:16,img:'https://images.unsplash.com/photo-1617196034096-e3e0f9d88a73?w=500&q=80&fit=crop'},
    ]
  },
  maki:{
    label:'Maki Rolls',eyebrow:'Rolled · Classic & Signature',
    desc:'Artfully rolled and precisely sliced — classics and signature creations.',
    items:[
      {id:'m1',name:'Dragon Roll',tag:'Signature',desc:'Shrimp tempura, avocado, cucumber, topped with fresh salmon and tobiko.',price:18,img:'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=500&q=80&fit=crop',popular:true},
      {id:'m2',name:'Spicy Tuna Roll',tag:'Classic',desc:'Minced bluefin tuna with sriracha aioli and sesame.',price:14,img:'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=500&q=80&fit=crop'},
      {id:'m3',name:'California Roll',tag:'Classic',desc:'Imitation crab, avocado, cucumber — the timeless gateway roll.',price:10,img:'https://images.unsplash.com/photo-1562802378-063ec186a863?w=500&q=80&fit=crop'},
      {id:'m4',name:'Rainbow Roll',tag:'Signature',desc:'California base layered with five types of sashimi on top.',price:20,img:'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=500&q=80&fit=crop',popular:true},
      {id:'m5',name:'Volcano Roll',tag:'Signature',desc:'Crab, cucumber, spicy scallop baked on top with masago.',price:16,img:'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=500&q=80&fit=crop'},
      {id:'m6',name:'Cucumber Roll',tag:'Vegetarian',desc:'Crisp cucumber with rice vinegar and toasted sesame.',price:7,img:'https://images.unsplash.com/photo-1618449840665-9ed506d73a34?w=500&q=80&fit=crop'},
    ]
  },
  sashimi:{
    label:'Sashimi',eyebrow:'Pure · No Rice',
    desc:'Pure sliced fish — no rice, no distraction. Just the sea.',
    items:[
      {id:'s1',name:'Salmon Sashimi',tag:'5 pieces',desc:'Thick-cut Atlantic salmon, served with pickled ginger.',price:16,img:'https://images.unsplash.com/photo-1618449840665-9ed506d73a34?w=500&q=80&fit=crop',popular:true},
      {id:'s2',name:'Tuna Sashimi',tag:'5 pieces',desc:'Deep red akami from the day\'s catch.',price:20,img:'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=500&q=80&fit=crop'},
      {id:'s3',name:'Yellowtail Sashimi',tag:'5 pieces',desc:'Buttery hamachi, fanned and delicately plated.',price:18,img:'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=500&q=80&fit=crop'},
      {id:'s4',name:'Mixed Sashimi',tag:'12 pieces',desc:'Chef\'s selection of the freshest cuts of the day.',price:38,img:'https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=500&q=80&fit=crop',popular:true},
      {id:'s5',name:'Scallop Sashimi',tag:'4 pieces',desc:'Sweet Hokkaido scallop, sliced thin, yuzu ponzu.',price:22,img:'https://images.unsplash.com/photo-1617196034096-e3e0f9d88a73?w=500&q=80&fit=crop'},
      {id:'s6',name:'Octopus Sashimi',tag:'5 pieces',desc:'Tender tako, marinated in light soy and mirin.',price:15,img:'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=500&q=80&fit=crop'},
    ]
  },
  temaki:{
    label:'Temaki',eyebrow:'Hand-Rolled Cones',
    desc:'Hand-rolled cones filled to order — fresh, crunchy, and fun.',
    items:[
      {id:'t1',name:'Spicy Salmon Temaki',tag:'Hand Cone',desc:'Salmon, spicy mayo, cucumber, and tobiko in crispy nori.',price:9,img:'https://images.unsplash.com/photo-1618449840665-9ed506d73a34?w=500&q=80&fit=crop',popular:true},
      {id:'t2',name:'Tuna Avocado Temaki',tag:'Hand Cone',desc:'Akami tuna, ripe avocado, shiso leaf.',price:10,img:'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=500&q=80&fit=crop'},
      {id:'t3',name:'Prawn Tempura Temaki',tag:'Hand Cone',desc:'Crispy shrimp tempura with lettuce and teriyaki glaze.',price:10,img:'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=500&q=80&fit=crop'},
      {id:'t4',name:'Vegetable Temaki',tag:'Vegan',desc:'Pickled daikon, avocado, cucumber, sesame, and sprouts.',price:7,img:'https://images.unsplash.com/photo-1562802378-063ec186a863?w=500&q=80&fit=crop'},
      {id:'t5',name:'Uni Temaki',tag:'Seasonal',desc:'Fresh sea urchin with warm sushi rice and shiso.',price:18,img:'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=500&q=80&fit=crop',popular:true},
    ]
  },
  omakase:{
    label:'Omakase',eyebrow:"Chef's Selection",
    desc:'Trust the chef. A curated experience built around the best the market offers today.',
    items:[
      {id:'o1',name:'Omakase Classic',tag:'10 pieces',desc:'A journey through traditional nigiri cuts, from lighter fish to deeper intensity.',price:65,img:'https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=500&q=80&fit=crop'},
      {id:'o2',name:'Omakase Special',tag:'12 pieces',desc:'The full experience — rare cuts, seasonal specials, and chef\'s surprise plates.',price:85,img:'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=500&q=80&fit=crop',popular:true},
      {id:'o3',name:'Omakase Deluxe',tag:'16 pieces + courses',desc:'Our most luxurious tasting menu with soup, palate cleanser, and premium sakes.',price:145,img:'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=500&q=80&fit=crop'},
    ]
  },
  drinks:{
    label:'Drinks',eyebrow:'Curated Pairings',
    desc:'Japanese sake, beer, and non-alcoholic pairings curated to complement every dish.',
    items:[
      {id:'d1',name:'Junmai Daiginjo Sake',tag:'Premium Sake',desc:'Floral and silky, from Niigata Prefecture.',price:18,img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80&fit=crop',popular:true},
      {id:'d2',name:'Asahi Super Dry',tag:'Japanese Beer',desc:'Crisp, dry, and perfectly cold.',price:7,img:'https://images.unsplash.com/photo-1574096079513-d8259312b785?w=500&q=80&fit=crop'},
      {id:'d3',name:'Yuzu Lemonade',tag:'Non-Alcoholic',desc:'Fresh-pressed yuzu with sparkling water and honey.',price:6,img:'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=500&q=80&fit=crop'},
      {id:'d4',name:'Matcha Latte',tag:'Hot / Iced',desc:'Ceremonial-grade matcha from Uji with steamed oat milk.',price:7,img:'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=500&q=80&fit=crop',popular:true},
      {id:'d5',name:'Plum Wine',tag:'Umeshu',desc:'Sweet, tart Japanese plum wine served over ice.',price:9,img:'https://images.unsplash.com/photo-1547595628-c61a32a3f174?w=500&q=80&fit=crop'},
      {id:'d6',name:'Sencha Green Tea',tag:'Hot Tea',desc:'Brewed fresh from Shizuoka loose-leaf sencha.',price:5,img:'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&q=80&fit=crop'},
      {id:'d7',name:'Sparkling Water',tag:'Still / Sparkling',desc:'Chilled Japanese mineral water.',price:4,img:'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=500&q=80&fit=crop'},
    ]
  }
};

// ── CART ─────────────────────────────────────────────────
let cart = [];
function addToCart(item){
  cart.push(item);
  updateCartUI();
  showToast('Added: '+item.name);
}
function removeFromCart(i){cart.splice(i,1);updateCartUI();}
function updateCartUI(){
  const wrap=document.getElementById('cart-items');
  const total=cart.reduce((s,i)=>s+i.price,0);
  document.getElementById('cart-total').textContent=total;
  document.getElementById('cart-count').textContent=cart.length;
  if(!cart.length){
    wrap.innerHTML=`<div class="cart-empty"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="1"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>Your cart is empty</div>`;
    return;
  }
  wrap.innerHTML=cart.map((item,i)=>`<div class="cart-item">
    <img class="cart-item-img" src="${item.img}" alt="${item.name}" onerror="this.style.display='none'">
    <div class="cart-item-info"><div class="cart-item-name">${item.name}</div><div class="cart-item-price">$${item.price}</div></div>
    <button class="cart-remove" onclick="removeFromCart(${i})"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
  </div>`).join('');
}
function toggleCart(){
  document.getElementById('cart-sidebar').classList.toggle('open');
  document.getElementById('cart-overlay').classList.toggle('open');
}

// ── PAGES ────────────────────────────────────────────────


function showPage(name){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('page-'+name).classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
  setTimeout(initReveal,80);
}

function openCategory(key){
  const cat=CATS[key]; if(!cat) return;
  document.getElementById('cat-eyebrow').textContent=cat.eyebrow;
  document.getElementById('cat-title').innerHTML=cat.label.replace(/(\S+)$/,'<em>$1</em>');
  document.getElementById('cat-desc').textContent=cat.desc;
  document.getElementById('products-grid').innerHTML=cat.items.map(it=>`
    <div class="prod-card">
      ${it.popular?'<span class="popular-tag">Popular</span>':''}
      <div class="prod-img-wrap"><img class="prod-img" src="${it.img}" alt="${it.name}" loading="lazy"></div>
      <div class="prod-tag">${it.tag}</div>
      <div class="prod-name">${it.name}</div>
      <div class="prod-desc">${it.desc}</div>
      <div class="prod-footer">
        <div class="prod-price">$${it.price}.00</div>
        <button class="add-btn" id="btn-${it.id}" onclick="handleAdd('${it.id}','${it.name}',${it.price},'${it.img}')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
      </div>
    </div>`).join('');
  showPage('category');
}

function handleAdd(id,name,price,img){
  addToCart({id,name,price,img});
  const btn=document.getElementById('btn-'+id);
  if(!btn) return;
  btn.classList.add('added');
  btn.innerHTML=`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;
  setTimeout(()=>{
    btn.classList.remove('added');
    btn.innerHTML=`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`;
  },1600);
}

// ── CHECKOUT ─────────────────────────────────────────────
function showCheckout(){
  if(!cart.length){showToast('Your cart is empty!');return;}
  document.getElementById('checkout-modal').classList.add('open');
}
function hideCheckout(){document.getElementById('checkout-modal').classList.remove('open');}
function placeOrder(){
  const n=document.getElementById('f-name').value.trim();
  const e=document.getElementById('f-email').value.trim();
  if(!n||!e){showToast('Please fill in required fields');return;}
  hideCheckout(); toggleCart();
  cart=[]; updateCartUI();
  showToast('Order placed! Arigato, '+n+' 🍣');
}

// ── TOAST ────────────────────────────────────────────────
let toastT;
function showToast(msg){
  const t=document.getElementById('toast');
  document.getElementById('toast-msg').textContent=msg;
  t.classList.add('show');
  clearTimeout(toastT);
  toastT=setTimeout(()=>t.classList.remove('show'),2600);
}

// ── MOBILE NAV ───────────────────────────────────────────
function toggleNav(){
  document.getElementById('mobile-nav').classList.toggle('open');
  document.getElementById('mob-overlay').classList.toggle('open');
}

// ── SCROLL REVEAL ────────────────────────────────────────
function initReveal(){
  document.querySelectorAll('.reveal:not(.visible)').forEach(el=>{
    new IntersectionObserver(entries=>{
      entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');}});
    },{threshold:0.1}).observe(el);
  });
}


function scrollToSection(id) {
  setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, 120);
}

window.addEventListener('scroll',()=>{
  document.getElementById('navbar').classList.toggle('scrolled',window.scrollY>60);
});



updateCartUI();
initReveal();