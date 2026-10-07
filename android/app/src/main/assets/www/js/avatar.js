window.MC = window.MC || {};
(() => {
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const normalizeHex=h=>{h=String(h||'#777').replace('#','');if(h.length===3)h=[...h].map(x=>x+x).join('');return h.padEnd(6,'0').slice(0,6)};
  const darken=(hex,p=.22)=>{const h=normalizeHex(hex),n=parseInt(h,16);let r=n>>16,g=n>>8&255,b=n&255;r=Math.max(0,Math.round(r*(1-p)));g=Math.max(0,Math.round(g*(1-p)));b=Math.max(0,Math.round(b*(1-p)));return '#'+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1)};
  const lighten=(hex,p=.22)=>{const h=normalizeHex(hex),n=parseInt(h,16);let r=n>>16,g=n>>8&255,b=n&255;r=Math.min(255,Math.round(r+(255-r)*p));g=Math.min(255,Math.round(g+(255-g)*p));b=Math.min(255,Math.round(b+(255-b)*p));return '#'+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1)};
  const outfitThemes=[
    ['#ffb22e','#1a2538','#54e9ff'],['#4e7cff','#edf3ff','#7beaff'],['#00c7cc','#17243a','#79f4ff'],['#4fca73','#183426','#d8ff73'],['#ff6a42','#301b1b','#ffd15b'],['#19b5df','#102f4f','#76f1ff'],['#8c62ff','#221c4d','#ff7adf'],['#f2a735','#273041','#5fe5ff'],['#2b3145','#0e121b','#d6e1ff'],['#8d4b32','#261a18','#ffc66a'],['#ff6aa9','#3a1d39','#82f0ff'],['#80d8ff','#173256','#ecfbff'],['#30e0c6','#1d2534','#f45cff'],['#ff8ed0','#4a2352','#ffd25a'],['#d28a38','#273144','#6ff4ff'],['#4e8c52','#1c3827','#e4ff79']
  ];

  const svgPath=(d,fill,stroke='none',sw=0)=>`<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round" stroke-linecap="round"/>`;

  function hairArt(i,color,outline,isGirl,bodyDisplay){
    const c=color,o=outline,back=[]; let front='';
    const idx=((i%28)+28)%28;
    const longBack=(left='M169 136c-28 58-28 142-5 206l44-17c-14-55-11-112 13-174z',right='M333 136c28 58 28 142 5 206l-44-17c14-55 11-112-13-174z')=>{back.push(svgPath(left,c,o,6));back.push(svgPath(right,c,o,6));};
    switch(idx){
      case 0: front=svgPath('M160 151c2-72 40-119 104-121 55-2 98 27 111 87-32-18-60-20-88-8-30-18-72-7-127 42z',c,o,6); break;
      case 1: front=svgPath('M160 150c1-66 29-108 88-121l-2 31 30-39 7 40 35-31-3 43 45-15-17 44 46 7-36 42c-29-24-69-37-113-29-29 6-53 15-80 28z',c,o,6); break;
      case 2: front=svgPath('M158 151c-2-70 39-119 105-120 53-1 92 22 111 67-52-14-91-7-119 21-26 25-40 27-97 32z',c,o,6); break;
      case 3: back.push(svgPath('M190 70c-42-42 3-82 43-48 10 9 14 22 8 38z',c,o,6));back.push(svgPath('M315 70c42-42-3-82-43-48-10 9-14 22-8 38z',c,o,6));front=svgPath('M161 151c-3-68 33-114 100-119 61-4 102 30 111 93-35-16-69-17-98-4-31-19-70-7-113 30z',c,o,6); break;
      case 4: front=svgPath('M160 148c4-66 34-109 93-117 68-9 112 29 119 90-20-13-42-18-64-16l-7 39-33-28-30 38-15-43c-19 8-39 20-63 37z',c,o,6); break;
      case 5: front=svgPath('M159 149c-1-69 35-115 99-118 64-3 107 34 113 100-31-18-59-20-86-8-31-18-73-8-126 26z',c,o,6)+svgPath('M198 64c28-44 85-50 116-13-43 5-78 17-116 13z',c,o,6); break;
      case 6: front=svgPath('M160 150c2-66 34-112 99-119 65-7 108 30 113 92-26-16-52-20-78-12l15 34-38-19-21 35-16-38c-22 6-44 16-74 27z',c,o,6); break;
      case 7: front=svgPath('M160 148c3-55 29-99 84-113 55-14 106 6 131 51-50-9-113-5-174 16l-17 46z',c,o,6)+svgPath('M160 95c63-28 149-31 213-6l-7 21c-58-17-126-13-193 12z','#263553',o,5); break;
      case 8: front=svgPath('M174 147c-6-56 15-101 54-120l15 43 17-58 21 56 31-44 3 54 47-24-15 55 40-2-29 46c-32-21-67-25-99-14-29-14-58-4-85 8z',c,o,6); break;
      case 9: front=svgPath('M162 151c0-70 36-117 101-120 61-3 102 30 109 94-29-14-58-14-86-1-28-18-69-7-124 27z',c,o,6)+svgPath('M173 93c51-30 136-37 190-11l-6 19c-57-18-120-12-181 14z','#edf7ff',o,5); break;
      case 10: longBack(); front=svgPath('M159 149c-1-70 39-116 103-117 64-1 105 37 108 103-34-17-63-19-91-7-28-18-68-9-120 21z',c,o,6)+svgPath('M185 126c21 36 29 75 20 121M315 126c-21 36-29 75-20 121', 'none',lighten(c,.22),7); break;
      case 11: front=svgPath('M160 148c1-67 37-113 100-117 64-4 106 34 111 98-31-17-60-18-88-7-29-18-70-7-123 26z',c,o,6); back.push(`<g><circle cx="166" cy="177" r="28" fill="#192b48" stroke="${lighten(c,.18)}" stroke-width="5"/><circle cx="337" cy="177" r="28" fill="#192b48" stroke="${lighten(c,.18)}" stroke-width="5"/><path d="M171 158c18-31 143-31 161 0" fill="none" stroke="#192b48" stroke-width="12"/></g>`); break;
      case 12: front=svgPath('M162 149c-2-66 30-111 91-117 66-7 112 28 119 91-30-11-55-13-80-4-28-16-64-7-130 30z',c,o,6)+`<g fill="${c}" stroke="${o}" stroke-width="5">${[[179,93],[207,63],[242,55],[279,58],[317,75],[344,105]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="25"/>`).join('')}</g>`; break;
      case 13: longBack(); back.push(svgPath('M180 123c-55 32-66 79-39 127l34-19c-17-32-10-61 27-87z',c,o,6));back.push(svgPath('M322 123c55 32 66 79 39 127l-34-19c17-32 10-61-27-87z',c,o,6));front=svgPath('M160 149c-2-67 34-114 101-117 63-3 105 32 110 98-28-14-57-15-84-4-29-18-68-8-127 23z',c,o,6); break;
      case 14: front=svgPath('M160 148c0-69 37-115 101-117 64-2 106 35 110 101-28-14-57-17-85-9-31-18-72-8-126 25z',c,o,6)+svgPath('M182 122l31-48 18 44 20-60 25 56 40-41 5 50',c,o,6); break;
      case 15: front=svgPath('M160 149c0-70 39-116 103-118 62-2 103 33 108 98-29-16-58-17-84-5-23 13-41 14-65 8-23-6-40 0-62 17z',c,o,6)+svgPath('M199 106c20 28 39 37 63 27 17-7 32-20 43-39-3 31-10 52-23 69-22-17-48-20-83-57z',c,o,6); break;
      case 16: longBack();front=svgPath('M160 149c1-68 37-114 101-117 64-3 107 32 111 97-30-15-58-17-85-5-29-18-69-8-127 25z',c,o,6)+svgPath('M180 126c15 30 39 35 66 14 23 18 50 13 76-15', 'none',lighten(c,.25),7); break;
      case 17: front=svgPath('M168 147c-5-58 21-105 67-118l13 39 19-54 23 53 35-37 0 48 43-18-13 48 36-2-30 43c-27-16-60-20-91-11-27-14-57-5-92 9z',c,o,6); break;
      case 18: longBack();front=svgPath('M159 149c-1-71 39-117 104-118 64-1 106 36 109 103-31-17-60-18-88-5-29-18-70-9-125 20z',c,o,6); break;
      case 19: back.push(svgPath('M165 137c-9 71 6 139 43 191l35-25c-27-46-34-98-20-157z',c,o,6));back.push(svgPath('M338 137c9 71-6 139-43 191l-35-25c27-46 34-98 20-157z',c,o,6));front=svgPath('M160 149c0-68 34-113 98-118 63-4 108 31 113 95-30-15-59-16-86-4-30-17-71-6-125 27z',c,o,6); break;
      case 20: longBack('M171 136c-30 65-28 144 7 207l36-23c-28-56-28-112-9-169z','M335 136c21 54 23 107 4 156l28 16c25-59 26-118 1-172z');front=svgPath('M161 149c-1-68 34-113 97-118 63-5 108 30 113 94-30-14-59-16-86-4-29-18-69-7-124 28z',c,o,6); break;
      case 21: back.push(`<g fill="${c}" stroke="${o}" stroke-width="6"><circle cx="162" cy="126" r="42"/><circle cx="340" cy="126" r="42"/><path d="M149 133c-16 79-2 144 28 195l31-22c-21-49-23-101-8-157z"/><path d="M353 133c16 79 2 144-28 195l-31-22c21-49 23-101 8-157z"/></g>`);front=svgPath('M160 150c0-67 35-113 99-118 63-5 108 30 112 95-30-16-58-16-86-4-28-17-67-7-125 27z',c,o,6); break;
      case 22: longBack();front=svgPath('M160 149c0-68 35-113 98-118 65-5 109 30 114 97-31-15-60-16-88-4-30-18-71-8-124 25z',c,o,6)+`<g fill="${c}" stroke="${o}" stroke-width="5">${[[175,117],[198,87],[229,73],[265,72],[300,82],[330,105]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="24"/>`).join('')}</g>`; break;
      case 23: front=svgPath('M159 148c2-69 39-115 104-117 64-2 105 36 109 102-28-16-57-18-84-7-26 16-45 14-65 4-22-10-40-2-64 18z',c,o,6)+svgPath('M190 103c39-35 92-39 136-7-29 1-51 14-67 38-20-24-42-34-69-31z',lighten(c,.08),o,4); break;
      case 24: front=svgPath('M160 149c0-70 38-116 103-118 64-2 106 35 109 101-31-17-60-17-88-4-27-17-68-9-124 21z',c,o,6)+svgPath('M176 110c44 20 86 22 126 2-19 27-42 42-70 44-24-3-42-18-56-46z',lighten(c,.06),o,4); break;
      case 25: longBack();front=svgPath('M159 149c0-70 38-116 103-118 64-2 106 35 110 102-31-17-60-18-88-5-29-18-70-8-125 21z',c,o,6)+svgPath('M181 123c15 26 34 31 56 13 20 18 45 17 75-4', 'none',lighten(c,.25),7); break;
      case 26: back.push(svgPath('M181 128c-35 63-34 134-3 197l31-18c-24-56-23-108 3-164z',c,o,6));back.push(svgPath('M320 128c35 63 34 134 3 197l-31-18c24-56 23-108-3-164z',c,o,6));front=svgPath('M160 149c0-68 35-113 99-118 64-5 108 31 112 96-30-15-59-17-86-5-30-18-70-7-125 27z',c,o,6); break;
      case 27: front=svgPath('M163 149c-1-61 30-106 89-117 58-11 108 15 121 73-37-10-67-7-93 9-26-12-64-1-117 35z',c,o,6)+svgPath('M208 75c18-35 59-50 91-32-26 10-49 26-67 49z',lighten(c,.08),o,4); break;
    }
    return {back:back.join(''),front};
  }

  function bodyMetrics(body,gender){
    const compact=body===2, sturdy=body===3, athletic=body===1;
    return {
      sx:sturdy?1.12:compact?.92:athletic?1.04:1,
      sy:compact?.94:athletic?1.03:1,
      shoulder:gender==='girl'?(sturdy?58:50):(sturdy?72:athletic?68:62),
      waist:gender==='girl'?(sturdy?49:40):(sturdy?58:athletic?47:52),
      hip:gender==='girl'?(sturdy?62:55):(sturdy?61:50),
      legW:gender==='girl'?(sturdy?43:37):(sturdy?49:43)
    };
  }

  function torsoBase(m,primary,secondary,glow,light,dark){
    const L=250-m.shoulder,R=250+m.shoulder,WL=250-m.waist,WR=250+m.waist,HL=250-m.hip,HR=250+m.hip;
    return `<path d="M${L} 292 Q250 262 ${R} 292 L${WR} 371 Q${HR} 397 ${HR} 414 Q250 435 ${HL} 414 Q${HL} 394 ${WL} 371Z" fill="url(#jacket)" stroke="#13233a" stroke-width="8"/>
      <path d="M${250-m.waist+8} 291 L${250+m.waist-8} 291 L${250+m.waist-3} 404 Q250 419 ${250-m.waist+3} 404Z" fill="${secondary}" opacity=".94"/>
      <path d="M247 307l24 22-21 33-23-32z" fill="${glow}" filter="url(#glow)"/>
      <rect x="${250-m.waist+4}" y="372" width="${m.waist*2-8}" height="24" rx="10" fill="#101a2a"/><rect x="234" y="370" width="36" height="28" rx="7" fill="${primary}" stroke="#d9f8ff" stroke-width="3"/>`;
  }

  function outfitLayer(idx,gender,primary,secondary,glow,bodyDisplay){
    if(bodyDisplay)return '';
    const p=primary,d=darken(primary,.32),l=lighten(primary,.32),g=glow, girl=gender==='girl';
    switch(idx){
      case 0:return `<path d="M187 306l27-30 23 14-11 42-35 15zm126 0-27-30-23 14 11 42 35 15z" fill="${p}" stroke="#17243a" stroke-width="5"/><path d="M202 405h96" stroke="${g}" stroke-width="5"/>`;
      case 1:return `<path d="M204 285h92l-12 126h-68z" fill="#f3f6ff" opacity=".92"/><path d="M250 301l14 31-14 46-14-46z" fill="${p}"/><path d="M197 331h29m48 0h29" stroke="${p}" stroke-width="9"/>`;
      case 2:return `<path d="M187 304l34-28 29 20-15 58-47 18zm126 0-34-28-29 20 15 58 47 18z" fill="${d}" stroke="#bdf7ff" stroke-width="5"/><circle cx="250" cy="344" r="30" fill="none" stroke="${g}" stroke-width="8" filter="url(#glow)"/>`;
      case 3:return `<path d="M195 284c38-24 72-24 110 0l-16 31c-26-13-52-13-78 0z" fill="#d8ef92"/><path d="M183 348l-30 39 39 4m125-43 30 39-39 4" fill="none" stroke="#355e32" stroke-width="13"/><path d="M208 386l42 26 42-26" fill="none" stroke="#7bcf68" stroke-width="9"/>`;
      case 4:return `<path d="M184 303l28-29 27 20-15 41-38 8zm132 0-28-29-27 20 15 41 38 8z" fill="#ff8d4f" stroke="#ffd66d" stroke-width="6"/><path d="M217 376l33-56 33 56" fill="none" stroke="#ffd55d" stroke-width="8"/><path d="M205 414l45 13 45-13" fill="none" stroke="#ff7040" stroke-width="9"/>`;
      case 5:return `<path d="M199 283c34-22 68-22 102 0l-15 28c-24-11-48-11-72 0z" fill="#edfaff"/><path d="M204 357c31 27 61 27 92 0" fill="none" stroke="#43dcff" stroke-width="9"/><path d="M228 300l22 31 22-31" fill="none" stroke="#7cf5ff" stroke-width="6"/><path d="M201 390c33 17 65 17 98 0" fill="none" stroke="#216bc6" stroke-width="8"/>`;
      case 6:return `<path d="M195 285c29-31 81-31 110 0l-19 28c-24-16-48-16-72 0z" fill="#6e4ed2"/><path d="M184 298l-30 122 52-18 44 45 44-45 52 18-30-122" fill="#342660" opacity=".82"/><circle cx="250" cy="336" r="20" fill="#ff74dc" filter="url(#glow)"/>`;
      case 7:return `<path d="M183 313h134v70H183z" fill="#c17a28" opacity=".72"/><path d="M190 334h43m34 0h43" stroke="#ffd26c" stroke-width="10"/><rect x="218" y="369" width="64" height="31" rx="7" fill="#2d3544" stroke="#ffd26c" stroke-width="5"/><path d="M201 289v119m98-119v119" stroke="#5f4126" stroke-width="9"/>`;
      case 8:return `<path d="M196 281c35-29 74-29 109 0l-14 38c-26-18-55-18-82 0z" fill="#121923"/><path d="M202 312l48 78 48-78" fill="#080d13"/><path d="M218 291h64" stroke="${g}" stroke-width="5"/><path d="M189 405l61 28 61-28" fill="none" stroke="#29394c" stroke-width="12"/>`;
      case 9:return `<path d="M191 290c36-27 82-27 118 0l-21 35c-24-18-52-18-76 0z" fill="#5a3429"/><path d="M187 344c42 22 84 22 126 0" fill="none" stroke="#cf4b42" stroke-width="14"/><circle cx="250" cy="351" r="9" fill="#ffd45d"/><path d="M190 395l34 32m86-32-34 32" stroke="#c8a36a" stroke-width="8"/>`;
      case 10:return `<path d="M197 283c36-25 72-25 108 0l-14 29c-28-13-55-13-82 0z" fill="#fff1f9"/><path d="M204 380l-21 63 67-23 67 23-21-63" fill="#ff83bd" opacity=".9"/><path d="M226 297h49" stroke="#64f2ff" stroke-width="7"/><path d="M212 337l-22 13m98-13 22 13" stroke="#ffc2e1" stroke-width="8"/>`;
      case 11:return `<path d="M190 289c40-31 81-31 121 0l-18 30c-29-19-57-19-86 0z" fill="#f5fbff"/><circle cx="204" cy="298" r="20" fill="#eafaff"/><circle cx="296" cy="298" r="20" fill="#eafaff"/><path d="M207 386h86" stroke="#bcefff" stroke-width="9"/><path d="M194 417l56 18 56-18" fill="none" stroke="#7ed7ff" stroke-width="7"/>`;
      case 12:return `<path d="M194 287c37-22 75-22 112 0l-12 26c-30-12-58-12-88 0z" fill="#262f43"/><path d="M192 332h116v67H192z" fill="#171e2d"/><path d="M200 346h33m34 0h33" stroke="${g}" stroke-width="8"/><path d="M219 410l31 19 31-19" fill="none" stroke="#ff56d6" stroke-width="7"/>`;
      case 13:return `<path d="M198 282c34-24 70-24 104 0l-12 28c-27-12-53-12-80 0z" fill="#fff4da"/><path d="M185 362c44 29 87 29 130 0l-15 59c-33 18-66 18-100 0z" fill="${p}"/><path d="M211 330l39 23 39-23" fill="none" stroke="#ffd45d" stroke-width="9"/>`;
      case 14:return `<path d="M188 299l33-27 29 17-17 48-44 12zm124 0-33-27-29 17 17 48 44 12z" fill="#5a4435" stroke="#d6ae78" stroke-width="6"/><path d="M205 385h90" stroke="#78eaff" stroke-width="7"/><path d="M216 301l34 26 34-26" fill="none" stroke="#f2c178" stroke-width="7"/>`;
      case 15:return `<path d="M194 286c37-28 75-28 112 0l-16 31c-27-14-53-14-80 0z" fill="#416f42"/><path d="M179 353l36-17m106 17-36-17" stroke="#78a75f" stroke-width="15"/><path d="M205 405l45 24 45-24" fill="none" stroke="#d2f28c" stroke-width="7"/>`;
      case 16:return `<path d="M195 283c38-26 72-26 110 0l-14 31c-28-14-54-14-82 0z" fill="#f8f2ff"/><path d="M202 350h96v58h-96z" fill="#9f62ff" opacity=".75"/><path d="M212 365h76" stroke="#ff72d8" stroke-width="8"/><circle cx="250" cy="331" r="14" fill="#ffe264"/>`;
      case 17:return `<path d="M194 283c38-23 75-23 112 0l-15 29c-27-12-54-12-81 0z" fill="#173d5f"/><path d="M188 330c41 30 83 30 124 0l-8 89c-36 17-72 17-108 0z" fill="#0d2541"/><path d="M216 374h68" stroke="#4fe8ff" stroke-width="10"/>`;
      case 18:return `<path d="M196 282c37-27 73-27 110 0l-15 30c-27-13-54-13-81 0z" fill="#fff1f9"/><path d="M188 347l30-19 32 22 32-22 30 19-8 76-54 19-54-19z" fill="#ff6ca8" opacity=".9"/><path d="M221 307h58" stroke="#66f2ff" stroke-width="6"/>`;
      case 19:return `<path d="M190 292l31-25 29 17 29-17 31 25-17 49-43 14-43-14z" fill="#5f5ecb" stroke="#b7b9ff" stroke-width="5"/><path d="M200 383l50 38 50-38" fill="none" stroke="#df8aff" stroke-width="11"/><circle cx="250" cy="322" r="18" fill="#7ef5ff"/>`;
      case 20:return `<path d="M194 285c38-23 74-23 112 0l-16 30c-27-13-53-13-80 0z" fill="#fff3e9"/><path d="M184 357c44 25 88 25 132 0l-17 70c-33 15-66 15-99 0z" fill="#ff8a72"/><path d="M205 371h90" stroke="#5be8ff" stroke-width="7"/>`;
      case 21:return `<path d="M194 285c38-24 74-24 112 0l-15 29c-28-13-54-13-82 0z" fill="#f7f9ff"/><path d="M190 342l29-18 31 20 31-20 29 18-10 77-50 21-50-21z" fill="#6db7ff"/><path d="M218 304h64" stroke="#ffd057" stroke-width="6"/>`;
      case 22:return `<path d="M190 299l32-27 28 17 28-17 32 27-15 44-45 16-45-16z" fill="#252a43" stroke="#ff78cb" stroke-width="5"/><path d="M199 388h102" stroke="#65eeff" stroke-width="8"/><circle cx="250" cy="326" r="15" fill="#ff79d3"/>`;
      case 23:return `<path d="M195 282c38-25 72-25 110 0l-14 30c-27-13-54-13-81 0z" fill="#345a43"/><path d="M184 342l34-21 32 18 32-18 34 21-16 85-50 16-50-16z" fill="#284235"/><path d="M210 365l40 24 40-24" fill="none" stroke="#c4f48f" stroke-width="8"/>`;
      case 24:return `<path d="M201 282h98l-10 132h-78z" fill="#f4f7ff"/><path d="M250 298l15 34-15 47-15-47z" fill="#9368ff"/><path d="M191 330h36m46 0h36" stroke="#7cdfff" stroke-width="8"/><path d="M211 400h78" stroke="#ff82d9" stroke-width="7"/>`;
      case 25:return `<path d="M196 284c36-24 72-24 108 0l-15 29c-26-12-52-12-78 0z" fill="#f6fbff"/><path d="M188 337c40 25 81 25 122 0l-7 81c-35 19-70 19-105 0z" fill="#236da9"/><path d="M212 367h76" stroke="#fff" stroke-width="8"/>`;
      case 26:return `<path d="M196 282c37-25 73-25 110 0l-15 30c-27-14-54-14-81 0z" fill="#231b46"/><path d="M184 355c44 27 88 27 132 0l-18 71c-32 18-64 18-96 0z" fill="#9b61da"/><path d="M214 359l36 27 36-27" fill="none" stroke="#ffd65f" stroke-width="8"/>`;
      case 27:return `<path d="M193 287c38-22 76-22 114 0l-14 27c-29-13-57-13-86 0z" fill="#263548"/><path d="M190 339h120v71H190z" fill="#173c50"/><path d="M201 355h34m30 0h34" stroke="#4ee8ff" stroke-width="9"/><path d="M215 414l35 17 35-17" fill="none" stroke="#7df3ff" stroke-width="6"/>`;
      case 28:return `<path d="M190 294l31-26 29 17 29-17 31 26-14 51-46 16-46-16z" fill="#ffb33c" stroke="#fff2b0" stroke-width="5"/><path d="M187 384l63 47 63-47" fill="none" stroke="#ff7b64" stroke-width="10"/><circle cx="250" cy="322" r="17" fill="#67f3ff"/>`;
      case 29:return `<path d="M184 314h132v70H184z" fill="#e7a64f"/><path d="M195 286v127m110-127v127" stroke="#5d4126" stroke-width="10"/><rect x="215" y="369" width="70" height="32" rx="6" fill="#293748" stroke="#62eaff" stroke-width="5"/><path d="M204 333h35m22 0h35" stroke="#ff79d2" stroke-width="8"/>`;
      case 30:return `<path d="M193 286c38-28 76-28 114 0l-16 31c-27-15-55-15-82 0z" fill="#e9f8ff"/><path d="M185 344l34-21 31 20 31-20 34 21-14 86-51 16-51-16z" fill="#293769"/><path d="M211 371l39 24 39-24" fill="none" stroke="#c477ff" stroke-width="9"/><circle cx="250" cy="326" r="16" fill="#76f2ff" filter="url(#glow)"/>`;
      case 31:return `<path d="M190 286c40-30 80-30 120 0l-18 30c-28-16-56-16-84 0z" fill="#35285f" stroke="#d6b7ff" stroke-width="5"/><path d="M177 333l38-25 35 24 35-24 38 25-18 101-55 18-55-18z" fill="#56408f"/><path d="M205 382l45-60 45 60" fill="none" stroke="#8cf4ff" stroke-width="8"/><circle cx="250" cy="343" r="18" fill="#c77cff" filter="url(#glow)"/>`;
      case 32:return `<path d="M188 295l33-28 29 17 29-17 33 28-16 54-46 18-46-18z" fill="#9f2f2f" stroke="#ffd36b" stroke-width="6"/><path d="M180 365l70 70 70-70-18 67-52 24-52-24z" fill="#e04d32"/><path d="M218 323l32-38 32 38-32 58z" fill="#ffcc48" filter="url(#glow)"/>`;
      case 33:return `<path d="M194 284c38-24 74-24 112 0l-15 29c-27-13-54-13-81 0z" fill="#f7fbff"/><path d="M183 349c44 24 90 24 134 0l-15 78-52 22-52-22z" fill="#d8edff"/><path d="M170 340Q125 320 115 375Q156 362 190 383M330 340Q375 320 385 375Q344 362 310 383" fill="#ffffff" stroke="#9fe9ff" stroke-width="6"/><circle cx="250" cy="331" r="15" fill="#fff3a8"/>`;
      case 34:return `<path d="M192 286c39-25 77-25 116 0l-16 29c-28-13-56-13-84 0z" fill="#15395b"/><path d="M184 339l34-24 32 19 32-19 34 24-14 91-52 18-52-18z" fill="#205a78"/><path d="M171 365l-54 30 60 10m146-40 54 30-60 10" fill="none" stroke="#7bf5ff" stroke-width="12"/><path d="M210 373h80" stroke="#ffffff" stroke-width="6"/>`;
      case 35:return `<path d="M193 285c38-28 76-28 114 0l-17 31c-27-15-53-15-80 0z" fill="#171227"/><path d="M181 342l37-24 32 21 32-21 37 24-18 93-51 17-51-17z" fill="#281b47"/><path d="M205 378l45 24 45-24" fill="none" stroke="#a96cff" stroke-width="10"/><circle cx="250" cy="330" r="18" fill="#6c44c8" filter="url(#glow)"/>`;
    }
  }

  function shoesLayer(idx,primary,glow,bodyDisplay,legL,legR,legW){
    if(bodyDisplay)return '';
    const i=idx, base=['#f4f7ff','#e7f0ff','#28344b','#3d2e4c','#fafafa','#25283d','#2c6584','#414957','#f2f2f2','#272f45','#eef7ff','#ffffff','#382c59','#fff3ea','#202a3b','#e5f5ff','#27242d','#f3f6ff'][i%18];
    const y=482, leftX=219-legW/2-7,rightX=285-legW/2-3,w=legW+22;
    let detail='';
    if(i===0)detail=`<path d="M${leftX+5} 507h${w-10}m${rightX+5} 0h${w-10}" stroke="${glow}" stroke-width="6"/>`;
    if(i===1)detail=`<path d="M${leftX+8} 491v29m18-29v29m${rightX+8-leftX} 0v-29m18 0v29" stroke="#8097af" stroke-width="5"/>`;
    if(i===2)detail=`<path d="M${leftX} 489h${w}v34h-${w}zm${rightX-leftX} 0h${w}v34h-${w}z" fill="${darken(primary,.18)}" opacity=".8"/>`;
    if(i===3)detail=`<path d="M${leftX+2} 518h${w+4}m${rightX-leftX-2} 0h${w+4}" stroke="#a6ff72" stroke-width="9"/>`;
    if(i===4)detail=`<circle cx="${leftX+w/2}" cy="520" r="10" fill="${glow}"/><circle cx="${rightX+w/2}" cy="520" r="10" fill="${glow}"/>`;
    if(i===5)detail=`<circle cx="${leftX+12}" cy="527" r="8" fill="#ff78d8"/><circle cx="${leftX+w-12}" cy="527" r="8" fill="#ff78d8"/><circle cx="${rightX+12}" cy="527" r="8" fill="#ff78d8"/><circle cx="${rightX+w-12}" cy="527" r="8" fill="#ff78d8"/>`;
    if(i===6)detail=`<path d="M${leftX-22} 512l23-18v33zM${leftX+w+22} 512l-23-18v33zM${rightX-22} 512l23-18v33zM${rightX+w+22} 512l-23-18v33z" fill="#65eaff"/>`;
    if(i===7)detail=`<rect x="${leftX-3}" y="474" width="${w+6}" height="48" rx="12" fill="#4a5362"/><rect x="${rightX-3}" y="474" width="${w+6}" height="48" rx="12" fill="#4a5362"/><path d="M${leftX+5} 492h${w-10}m${rightX+5} 0h${w-10}" stroke="#bcd4e7" stroke-width="5"/>`;
    if(i===8)detail=`<path d="M${leftX+2} 497h${w-4}m${rightX+2} 0h${w-4}" stroke="#ff6eaa" stroke-width="7"/><path d="M${leftX+8} 509l14-8 14 8m${rightX+8-leftX} 0 14-8 14 8" fill="none" stroke="#fff" stroke-width="4"/>`;
    if(i===9)detail=`<path d="M${leftX-8} 520l-18 30 35-15m${rightX-8} -15-18 30 35-15" fill="#5feaff" stroke="#1d5d81" stroke-width="4" filter="url(#glow)"/>`;
    if(i===10)detail=`<path d="M${leftX+8} 488l${w-16} 32m${rightX+8-leftX} -32 ${w-16} 32" stroke="#a569ff" stroke-width="8"/><circle cx="${leftX+w/2}" cy="505" r="7" fill="#fff"/><circle cx="${rightX+w/2}" cy="505" r="7" fill="#fff"/>`;
    if(i===11)detail=`<path d="M${leftX+2} 508h${w-4}m${rightX+2} 0h${w-4}" stroke="#404c60" stroke-width="5"/><path d="M${leftX+8} 490h${w-16}m${rightX+8} 0h${w-16}" stroke="#8ea0b7" stroke-width="4"/>`;
    if(i===12)detail=`<path d="M${leftX-4} 480h${w+8}v42h-${w+8}zm${rightX-leftX} 0h${w+8}v42h-${w+8}z" fill="#4b3d72"/><path d="M${leftX+5} 495h${w-10}m${rightX+5} 0h${w-10}" stroke="#ff7adc" stroke-width="6"/>`;
    if(i===13)detail=`<path d="M${leftX+4} 503c13-19 28-19 42 0m${rightX+4-leftX} 0c13-19 28-19 42 0" fill="none" stroke="#ff8f78" stroke-width="7"/>`;
    if(i===14)detail=`<rect x="${leftX-2}" y="478" width="${w+4}" height="44" rx="10" fill="#1b2538"/><rect x="${rightX-2}" y="478" width="${w+4}" height="44" rx="10" fill="#1b2538"/><path d="M${leftX+5} 485v30m${rightX+5} 0v-30" stroke="#57efff" stroke-width="7"/>`;
    if(i===15)detail=`<path d="M${leftX} 518h${w}m${rightX} 0h${w}" stroke="#75dcff" stroke-width="8"/><path d="M${leftX+10} 487h${w-20}m${rightX+10} 0h${w-20}" stroke="#fff" stroke-width="5"/>`;
    if(i===16)detail=`<path d="M${leftX+5} 492l${w-10} 18m-${w-10} 0 ${w-10}-18m${rightX+5-leftX} 0 ${w-10} 18m-${w-10} 0 ${w-10}-18" stroke="#ff87d6" stroke-width="6"/>`;
    if(i===17)detail=`<path d="M${leftX+2} 486h${w-4}v35h-${w-4}zm${rightX-leftX} 0h${w-4}v35h-${w-4}z" fill="#ecf5ff"/><path d="M${leftX+8} 505h${w-16}m${rightX+8} 0h${w-16}" stroke="#ffd763" stroke-width="6"/>`;
    if(i===18)detail=`<path d="M${leftX-4} 482h${w+8}v42h-${w+8}zm${rightX-leftX} 0h${w+8}v42h-${w+8}z" fill="#35285f"/><path d="M${leftX+5} 501h${w-10}m${rightX+5} 0h${w-10}" stroke="#b884ff" stroke-width="7"/><circle cx="${leftX+w/2}" cy="514" r="5" fill="#78efff"/><circle cx="${rightX+w/2}" cy="514" r="5" fill="#78efff"/>`;
    if(i===19)detail=`<path d="M${leftX-2} 480h${w+4}v44h-${w+4}zm${rightX-leftX} 0h${w+4}v44h-${w+4}z" fill="#8e2d25"/><path d="M${leftX+4} 493l${w-8} 22m${rightX+4-leftX} -22 ${w-8} 22" stroke="#ffcf4a" stroke-width="8"/><path d="M${leftX-8} 518l-15 16 26-4m${rightX-8} -12-15 16 26-4" fill="#ff7a37"/>`;
    if(i===20)detail=`<path d="M${leftX-4} 483h${w+8}v39h-${w+8}zm${rightX-leftX} 0h${w+8}v39h-${w+8}z" fill="#ecf8ff"/><path d="M${leftX-16} 498l-24-18 11 31m${leftX+w+16} -13 24-18-11 31m${rightX-16} -13-24-18 11 31m${rightX+w+16} -13 24-18-11 31" fill="#c8f4ff" stroke="#67c9ef" stroke-width="4"/>`;
    return `<g transform="rotate(${legL} 220 420)"><path d="M${leftX} ${y}h${w}l12 38c-8 18-${w+8} 21-${w+16} 2z" fill="${base}" stroke="#17233a" stroke-width="7"/></g><g transform="rotate(${legR} 287 420)"><path d="M${rightX} ${y}h${w}l15 35c-6 21-${w+12} 25-${w+18} 5z" fill="${base}" stroke="#17233a" stroke-width="7"/></g>${detail}`;
  }

  function accessoryLayer(i,primary,glow,hairColor,hairD,bodyDisplay){
    const idx=i;
    if(idx===0)return '';
    const body=bodyDisplay?'display:none':'';
    switch(idx){
      case 1:return `<g><ellipse cx="210" cy="143" rx="43" ry="22" fill="none" stroke="#111c2c" stroke-width="11"/><ellipse cx="294" cy="143" rx="43" ry="22" fill="none" stroke="#111c2c" stroke-width="11"/><path d="M253 142h-7" stroke="#111c2c" stroke-width="8"/><ellipse cx="210" cy="143" rx="34" ry="15" fill="url(#lens)"/><ellipse cx="294" cy="143" rx="34" ry="15" fill="url(#lens)"/></g>`;
      case 2:return `<path d="M176 151c19-33 51-41 81-35h37c25 2 43 14 55 33l-18 17c-13-13-25-18-40-18h-54c-17 1-30 7-43 20z" fill="#10213c" stroke="${glow}" stroke-width="5"/><rect x="198" y="128" width="112" height="33" rx="15" fill="#07172e"/><path d="M218 145h72" stroke="${glow}" stroke-width="6"/>`;
      case 3:return `<g><circle cx="171" cy="185" r="26" fill="#172b49" stroke="${glow}" stroke-width="6"/><circle cx="333" cy="185" r="26" fill="#172b49" stroke="${glow}" stroke-width="6"/><path d="M175 166c18-38 135-38 154 0" fill="none" stroke="#192b48" stroke-width="13"/></g>`;
      case 4:return `<path d="M160 112c28-54 74-71 124-51 29 11 48 27 60 50-57-10-120-8-184 1z" fill="${darken(primary,.18)}"/><path d="M165 107c56-15 123-13 179 3l-8 23c-55-13-111-12-169 3z" fill="${primary}"/>`;
      case 5:return `<path d="M203 239c34 18 67 18 102 0l-6 36c-33 18-63 18-93 0z" fill="#ff5b67"/><path d="M236 271l15 42 15-42" fill="#d63f50"/>`;
      case 6:return `<ellipse cx="252" cy="64" rx="78" ry="21" fill="none" stroke="#ffe46b" stroke-width="10" filter="url(#glow)"/>`;
      case 7:return `<path d="M178 120l-23-56 53 30m116 26 24-56-53 30" fill="${hairColor}" stroke="${hairD}" stroke-width="7"/>`;
      case 8:return `<g style="${body}"><rect x="130" y="284" width="72" height="130" rx="24" fill="#263954" stroke="#111d31" stroke-width="7"/><rect x="145" y="306" width="43" height="60" rx="12" fill="${primary}"/><path d="M152 324h29m-29 13h29" stroke="${glow}" stroke-width="5"/></g>`;
      case 9:return `<g transform="translate(365 286) scale(.64)" filter="url(#shadow)"><path d="M-25-58l13-28 16 25m58 3 13-28 16 25" stroke="#74f1ff" stroke-width="11"/><rect x="-48" y="-58" width="150" height="104" rx="38" fill="#eef8ff" stroke="#173d62" stroke-width="10"/><rect x="-24" y="-35" width="104" height="58" rx="24" fill="#071a33"/><circle cx="8" cy="-6" r="7" fill="#59f3ff"/><circle cx="49" cy="-6" r="7" fill="#59f3ff"/><path d="M17 11c10 9 20 9 30 0" fill="none" stroke="#59f3ff" stroke-width="6"/></g>`;
      case 10:return `<g><ellipse cx="210" cy="147" rx="45" ry="24" fill="none" stroke="#19314f" stroke-width="10"/><ellipse cx="294" cy="147" rx="45" ry="24" fill="none" stroke="#19314f" stroke-width="10"/><ellipse cx="210" cy="147" rx="33" ry="16" fill="#58dfff" opacity=".75"/><ellipse cx="294" cy="147" rx="33" ry="16" fill="#58dfff" opacity=".75"/><path d="M167 148h-18m209 0h-18" stroke="#19314f" stroke-width="8"/></g>`;
      case 11:return `<path d="M162 111c18-52 61-74 91-74 31 0 73 20 92 73l-22 10c-15-34-44-47-70-47-28 0-57 15-70 48z" fill="#f2b640" stroke="#744c17" stroke-width="6"/><rect x="174" y="103" width="157" height="18" rx="8" fill="#ffd96d"/><circle cx="252" cy="66" r="12" fill="${glow}"/>`;
      case 12:return `<path d="M209 98l18-25 23 14 23-14 20 25-18 12-25-9-25 9z" fill="#d68cff" stroke="#6a3e9b" stroke-width="5"/><circle cx="250" cy="86" r="8" fill="#7ff2ff"/>`;
      case 13:return `<g style="${body}"><path d="M180 286c30 19 109 19 140 0l10 28c-34 25-126 25-160 0z" fill="${primary}"/><path d="M207 304l-28 97" stroke="${primary}" stroke-width="17"/></g>`;
      case 14:return `<g style="${body}"><rect x="128" y="282" width="80" height="142" rx="26" fill="#24364d" stroke="#101a2a" stroke-width="7"/><circle cx="167" cy="319" r="23" fill="${glow}" filter="url(#glow)"/><path d="M145 350h45v44h-45z" fill="#17243a"/><path d="M134 380l-28 48m96-48 30 49" stroke="#63eaff" stroke-width="8"/></g>`;
      case 15:return `<g style="${body}"><path d="M188 487l-37 15 31 25m132-40 37 15-31 25" fill="#56dff7" stroke="#1b6885" stroke-width="6"/></g>`;
      case 16:return `<g style="${body}"><rect x="206" y="370" width="89" height="33" rx="10" fill="#101a2a"/><path d="M246 374l11 11-11 11-11-11z" fill="${glow}"/></g>`;
      case 17:return `<path d="M179 111c48-21 98-21 146 0" fill="none" stroke="${primary}" stroke-width="12"/><circle cx="179" cy="111" r="8" fill="${glow}"/><circle cx="325" cy="111" r="8" fill="${glow}"/>`;
      case 18:return `<g><path d="M169 149c16-29 45-36 78-25" fill="none" stroke="#f06ba9" stroke-width="10"/><path d="M336 149c-16-29-45-36-78-25" fill="none" stroke="#f06ba9" stroke-width="10"/><path d="M191 137c12-14 26-14 38 0-12 20-26 20-38 0zm84 0c12-14 26-14 38 0-12 20-26 20-38 0z" fill="#ff8fc8" stroke="#702b57" stroke-width="4"/></g>`;
      case 19:return `<path d="M171 113c24-57 66-80 105-69 31 9 53 30 66 64-50-14-110-12-171 5z" fill="#5966b6" stroke="#282d64" stroke-width="6"/><path d="M175 110c60-11 119-8 165 4l-10 18c-47-9-96-9-150 1z" fill="#8d78e6"/>`;
      case 20:return `<g style="${body}"><rect x="129" y="289" width="78" height="128" rx="24" fill="#325f74" stroke="#17354b" stroke-width="7"/><path d="M143 314c18-21 33-21 50 0v50c-17 16-33 16-50 0z" fill="#ff7f8a"/><path d="M153 323l13 16 13-16" fill="none" stroke="#fff0cc" stroke-width="5"/></g>`;
      case 21:return `<g style="${body}"><rect x="329" y="351" width="34" height="22" rx="9" fill="#17243a" stroke="${glow}" stroke-width="4"/><circle cx="345" cy="362" r="6" fill="${glow}"/></g>`;
      case 22:return `<g style="${body}"><path d="M205 294l45-32 45 32 41 142-86-34-86 34z" fill="#5b3ca0" opacity=".84"/><path d="M210 304l40-22 40 22" fill="none" stroke="#dca3ff" stroke-width="5"/></g>`;
      case 23:return `<path d="M206 93l16-25 28 16 28-16 17 25-19 15-26-11-26 11z" fill="#ffd65c" stroke="#976a16" stroke-width="5"/><circle cx="250" cy="86" r="8" fill="#67eaff"/>`;
      case 24:return `<g><circle cx="171" cy="185" r="25" fill="#ff76c7" stroke="#7b3262" stroke-width="5"/><circle cx="333" cy="185" r="25" fill="#ff76c7" stroke="#7b3262" stroke-width="5"/><path d="M174 166c21-39 134-39 156 0" fill="none" stroke="#69375b" stroke-width="12"/></g>`;
      case 25:return `<g style="${body}"><path d="M177 302l-30 96 32 11 29-94" fill="#7b4f2c" stroke="#e0ad66" stroke-width="6"/><rect x="150" y="340" width="42" height="45" rx="7" fill="#9f6b3c"/></g>`;
      case 26:return `<path d="M179 132c42-39 104-39 146 0l-18 34c-30-22-82-22-110 0z" fill="#19233d" stroke="#b46fff" stroke-width="6"/><path d="M205 145h90" stroke="#62edff" stroke-width="5"/>`;
      case 27:return `<g style="${body}"><path d="M167 300Q105 318 84 391Q145 367 202 383" fill="#e9fbff" stroke="#6fdfff" stroke-width="7"/><path d="M333 300Q395 318 416 391Q355 367 298 383" fill="#e9fbff" stroke="#6fdfff" stroke-width="7"/></g>`;
      case 28:return `<path d="M176 118l-22-60 47 39m123 21 22-60-47 39" fill="#ff7b43" stroke="#8e2e22" stroke-width="7"/><path d="M171 111l18-23 15 28m125-5-18-23-15 28" fill="#ffd052"/>`;
      case 29:return `<path d="M205 93l18-32 27 20 27-20 18 32-18 18-27-10-27 10z" fill="#d8f5ff" stroke="#6cbfe6" stroke-width="6"/><circle cx="250" cy="83" r="9" fill="#ffffff" filter="url(#glow)"/>`;
      case 30:return `<g style="${body}"><rect x="126" y="276" width="82" height="150" rx="27" fill="#222f47" stroke="#60e9ff" stroke-width="6"/><circle cx="167" cy="316" r="23" fill="#66ecff" filter="url(#glow)"/><path d="M139 360l-38 56m93-56 41 56" stroke="#ffb94c" stroke-width="11"/></g>`;
      case 31:return `<g style="${body}"><path d="M198 286l-68 143 120-52 120 52-68-143" fill="#2e2358" opacity=".94"/><path d="M207 305l43-24 43 24" fill="none" stroke="#d5a2ff" stroke-width="7"/><circle cx="250" cy="335" r="12" fill="#7ef5ff"/></g>`;
    }
  }

  function armorLayer(i,primary,glow,bodyDisplay){
    if(!i||bodyDisplay)return '';
    const idx=i;
    const common=(chest,edge)=>`<path d="M187 298l63-24 64 24 17 100-54 37h-54l-54-37z" fill="${chest}" stroke="${edge}" stroke-width="6"/><path d="M250 303l29 30-29 58-29-58z" fill="${glow}" filter="url(#glow)"/>`;
    switch(idx){
      case 1:return `<g>${common('#667f9d','#dff8ff')}<path d="M180 307l-38 23 19 46 35-21m124-48 38 23-19 46-35-21" fill="#51677f" stroke="#c8e7ff" stroke-width="5"/></g>`;
      case 2:return `<g>${common('#6f62a5','#efe8ff')}<path d="M176 298l-42 31 26 61 42-36m124-56 42 31-26 61-42-36" fill="#8a7fc6" stroke="#fff" stroke-width="6"/><path d="M206 410h88" stroke="#b5a2ff" stroke-width="10"/></g>`;
      case 3:return `<g>${common('#273e5f','#71f2ff')}<path d="M175 364l-44 28 55 10m139-38 44 28-55 10" fill="none" stroke="#69f2ff" stroke-width="11"/><path d="M214 407l-16 37m88-37 16 37" stroke="#ffe259" stroke-width="8"/></g>`;
      case 4:return `<g>${common('#2f7c95','#b9fbff')}<path d="M184 325l-44 25 38 23m142-48 44 25-38 23" fill="#4cc3d7" stroke="#b7fbff" stroke-width="6"/><path d="M203 422l47 19 47-19" fill="none" stroke="#64efff" stroke-width="9"/></g>`;
      case 5:return `<g>${common('#2b174f','#d7a3ff')}<path d="M191 292l-40 140 99-39 99 39-40-140" fill="#261142" opacity=".8"/><circle cx="250" cy="343" r="34" fill="none" stroke="#c170ff" stroke-width="8" filter="url(#glow)"/></g>`;
      case 6:return `<g>${common('#636d78','#eef7ff')}<rect x="174" y="300" width="45" height="86" rx="10" fill="#7f8b98" stroke="#dfe8f1" stroke-width="5"/><rect x="281" y="300" width="45" height="86" rx="10" fill="#7f8b98" stroke="#dfe8f1" stroke-width="5"/><path d="M191 405h118" stroke="#ffbc4a" stroke-width="12"/></g>`;
      case 7:return `<g>${common('#4a6a8d','#dff8ff')}<path d="M174 330l-70 35 66 15m156-50 70 35-66 15" fill="#7ae5ff" stroke="#e9fdff" stroke-width="6"/><path d="M159 361l-54 42m236-42 54 42" stroke="#66eaff" stroke-width="12"/></g>`;
      case 8:return `<g>${common('#6a7c92','#ffffff')}<path d="M182 292l-36 46 40 25 24-47m108-24 36 46-40 25-24-47" fill="#9fb5ca" stroke="#fff" stroke-width="6"/><path d="M215 316l35-31 35 31-35 39z" fill="#8cf1ff"/></g>`;
      case 9:return `<g>${common('#6c538f','#f6dfff')}<path d="M193 300l-28 44 34 23m108-67 28 44-34 23" fill="#9b74bf" stroke="#fff" stroke-width="5"/><path d="M205 411l45 28 45-28" fill="none" stroke="#ff75cf" stroke-width="9"/></g>`;
      case 10:return `<g>${common('#e7ecf5','#ffffff')}<path d="M188 318l-33 31 30 29m130-60 33 31-30 29" fill="#d9f8ff" stroke="#5abfd6" stroke-width="6"/><path d="M207 397c28 27 58 27 86 0" fill="none" stroke="#5ee9ff" stroke-width="10"/></g>`;
      case 11:return `<g>${common('#426a65','#dbfff9')}<path d="M185 306l-34 31 30 42m138-73 34 31-30 42" fill="#4c8a7d" stroke="#afffea" stroke-width="6"/><path d="M204 418l46 21 46-21" fill="none" stroke="#ff8b76" stroke-width="9"/></g>`;
      case 12:return `<g>${common('#7a5aa8','#ffffff')}<path d="M186 293l-37 44 32 36 30-55m103-25 37 44-32 36-30-55" fill="#a67ac9" stroke="#fff" stroke-width="6"/><path d="M214 406l36 40 36-40" fill="none" stroke="#ffd968" stroke-width="10"/><path d="M232 288l18-22 18 22" fill="none" stroke="#ffe789" stroke-width="7"/></g>`;
      case 13:return `<g>${common('#38285f','#d8b7ff')}<path d="M184 306l-48 35 36 48 42-38m102-45 48 35-36 48-42-38" fill="#5a4288" stroke="#8cf3ff" stroke-width="6"/><circle cx="250" cy="342" r="31" fill="none" stroke="#b987ff" stroke-width="7"/></g>`;
      case 14:return `<g>${common('#8f3028','#ffd56c')}<path d="M181 305l-49 36 41 47 39-42m107-41 49 36-41 47-39-42" fill="#c64b32" stroke="#ffb34d" stroke-width="7"/><path d="M214 408l36 35 36-35" fill="none" stroke="#ffe167" stroke-width="10"/></g>`;
      case 15:return `<g>${common('#315d79','#ecfbff')}<path d="M178 322l-63 39 68 16m139-55 63 39-68 16" fill="#bfefff" stroke="#68dfff" stroke-width="7"/><path d="M206 410l44 28 44-28" fill="none" stroke="#82f6ff" stroke-width="9"/></g>`;
    }
  }

  function avatarSVG(c={},opts={}){
    const portrait=!!opts.portrait, action=opts.action||'idle';
    const hair=c.hair??0,hairColor=c.hairColor||'#7a3f28',skin=c.skin||'#f4c29b',face=c.face??0,outfit=c.outfit??0,shoes=c.shoes??0,accessory=c.accessory??0,armor=c.armor??0,body=c.body??0,eye=c.eyeColor||'#5b331f',heroBase=c.heroBase||'explorer',gender=c.gender||'boy',isGirl=gender==='girl';
    const theme=outfitThemes[outfit%outfitThemes.length],primary=c.outfitColor||theme[0],secondary=theme[1],glow=theme[2],dark=darken(primary,.26),light=lighten(primary,.22),hairD=darken(hairColor,.27),skinD=darken(skin,.17);
    const m=bodyMetrics(body,gender);
    const runB=action==='runB',isRun=['runA','runB','run'].includes(action);
    const pose=isRun?(runB?{armL:25,armR:-24,legL:-22,legR:23,bob:1,sy:1}:{armL:-25,armR:24,legL:23,legR:-22,bob:5,sy:1}):action==='jump'?{armL:-34,armR:30,legL:-10,legR:27,bob:-8,sy:1}:action==='fall'?{armL:25,armR:-20,legL:12,legR:-8,bob:-2,sy:1}:action==='pound'?{armL:-50,armR:50,legL:-5,legR:5,bob:15,sy:.92}:action==='ride'?{armL:-20,armR:20,legL:72,legR:-72,bob:86,sy:.68}:action==='crouch'?{armL:-10,armR:10,legL:12,legR:-12,bob:90,sy:.82}:action==='idle2'?{armL:-18,armR:22,legL:0,legR:0,bob:-2,sy:1}:{armL:-6,armR:6,legL:0,legR:0,bob:0,sy:1};
    const focus=opts.focus||'',view=portrait?'80 20 340 315':focus==='shoes'?'155 365 205 190':focus==='torso'?'135 250 235 270':focus==='accessory'?'120 55 275 390':'45 10 410 565',bodyDisplay=portrait?'display:none':'';
    const hairParts=hairArt(hair,hairColor,hairD,isGirl,bodyDisplay);
    const eyesClosed=action==='blink';
    const eyeSvg=eyesClosed?`<g fill="none" stroke="#31221d" stroke-width="6" stroke-linecap="round"><path d="M201 201c12 8 24 8 36 0"/><path d="M275 201c12 8 24 8 36 0"/></g>`:`<g><ellipse cx="219" cy="199" rx="22" ry="27" fill="#fff"/><ellipse cx="293" cy="199" rx="22" ry="27" fill="#fff"/><ellipse cx="220" cy="202" rx="12" ry="17" fill="${eye}"/><ellipse cx="292" cy="202" rx="12" ry="17" fill="${eye}"/><ellipse cx="221" cy="204" rx="6" ry="10" fill="#101018"/><ellipse cx="291" cy="204" rx="6" ry="10" fill="#101018"/><circle cx="225" cy="195" r="4" fill="#fff"/><circle cx="296" cy="195" r="4" fill="#fff"/></g>`;
    const lashes=isGirl&&!eyesClosed?`<g stroke="#31221d" stroke-width="4" stroke-linecap="round"><path d="M197 184l-9-8m17 4-5-11m111 15 9-8m-17 4 5-11"/></g>`:'';
    const faceMouth=[`<path d="M242 222c9 10 21 10 30 0" fill="none" stroke="#8e473e" stroke-width="4"/>`,`<path d="M242 226l12 2 11-3" fill="none" stroke="#8e473e" stroke-width="4"/>`,`<path d="M239 221c10 16 27 16 38 0" fill="none" stroke="#8e473e" stroke-width="5"/>`,`<path d="M244 226h25" stroke="#8e473e" stroke-width="4"/>`,`<path d="M242 223c11 9 22 6 30-3" fill="none" stroke="#8e473e" stroke-width="4"/>`,`<path d="M240 222q14 18 29 0" fill="none" stroke="#8e473e" stroke-width="5"/><circle cx="232" cy="222" r="4" fill="#e9958c"/><circle cx="282" cy="222" r="4" fill="#e9958c"/>`,`<path d="M242 225q12 4 26-2" fill="none" stroke="#8e473e" stroke-width="4"/>`,`<path d="M242 220q12 14 27 0" fill="none" stroke="#8e473e" stroke-width="4"/><path d="M226 215l-8 5m70-5 8 5" stroke="#8e473e" stroke-width="3"/>`][face%8];
    const torso=torsoBase(m,primary,secondary,glow,light,dark);
    const legGap=gender==='girl'?12:18,legW=m.legW,leftLegX=250-legGap/2-legW,rightLegX=250+legGap/2;
    const legHtml=bodyDisplay?'':`<g transform="rotate(${pose.legL} ${leftLegX+legW/2} 420)"><rect x="${leftLegX}" y="396" width="${legW}" height="102" rx="${Math.min(20,legW/2)}" fill="url(#pants)"/></g><g transform="rotate(${pose.legR} ${rightLegX+legW/2} 420)"><rect x="${rightLegX}" y="396" width="${legW}" height="102" rx="${Math.min(20,legW/2)}" fill="url(#pants)"/></g>`;
    const armShift=m.shoulder-52;
    const arms=bodyDisplay?'':`<g transform="rotate(${pose.armL} ${180-armShift} 320)"><path d="M${184-armShift} 298c-31 24-41 70-31 112l35-9 23-91z" fill="url(#jacket)" stroke="#13233a" stroke-width="8"/><circle cx="${165-armShift}" cy="405" r="24" fill="url(#skin)"/><path d="M${148-armShift} 397c12-12 30-12 42 0l-2 19c-12 15-32 15-42 0z" fill="#17243a"/></g><g transform="rotate(${pose.armR} ${320+armShift} 320)"><path d="M${316+armShift} 297c31 24 42 68 32 110l-36-8-23-90z" fill="url(#jacket)" stroke="#13233a" stroke-width="8"/><circle cx="${335+armShift}" cy="403" r="24" fill="url(#skin)"/><path d="M${317+armShift} 395c12-12 30-12 42 0l-2 19c-12 15-32 15-42 0z" fill="#17243a"/></g>`;
    const outfitArt=outfitLayer(outfit,gender,primary,secondary,glow,bodyDisplay);
    const accessoryArt=accessoryLayer(accessory,primary,glow,hairColor,hairD,bodyDisplay);
    const armorArt=armorLayer(armor,primary,glow,bodyDisplay);
    const heroOverlay=bodyDisplay?'':heroBase==='runner'?`<path d="M185 362l-38 28 42 8m126-36 38 28-42 8" fill="none" stroke="#62f2ff" stroke-width="10"/><path d="M233 330l18-24 18 24-18 38z" fill="#fff26a"/>`:heroBase==='guardian'?`<path d="M177 299l41-27 17 33-48 29zm147 0-41-27-17 33 48 29z" fill="#7388a8" stroke="#dff8ff" stroke-width="5"/>`:heroBase==='aqua'?`<path d="M176 335l-35 18 31 21m152-39 35 18-31 21" fill="none" stroke="#60e8ff" stroke-width="11"/>`:heroBase==='forge'?`<rect x="190" y="366" width="124" height="34" rx="10" fill="#3b342b" stroke="#ffc85a" stroke-width="4"/>`:heroBase==='void'?`<path d="M199 280c29-34 73-39 103 0l38 148-90-25-90 25z" fill="#2a184d" opacity=".56"/>`:'';
    return `<svg viewBox="${view}" xmlns="http://www.w3.org/2000/svg" aria-label="Personaje Mundo Cuadro"><defs>
      <linearGradient id="jacket" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${light}"/><stop offset=".52" stop-color="${primary}"/><stop offset="1" stop-color="${dark}"/></linearGradient>
      <linearGradient id="pants" x1="0" y1="0" x2="0" y2="1"><stop stop-color="${lighten(secondary,.12)}"/><stop offset="1" stop-color="${darken(secondary,.23)}"/></linearGradient>
      <linearGradient id="skin" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${lighten(skin,.13)}"/><stop offset=".7" stop-color="${skin}"/><stop offset="1" stop-color="${skinD}"/></linearGradient>
      <linearGradient id="lens" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#71f6ff"/><stop offset=".45" stop-color="#2c9be8"/><stop offset="1" stop-color="#765dff"/></linearGradient>
      <filter id="shadow" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="12" stdDeviation="9" flood-color="#000" flood-opacity=".42"/></filter>
      <filter id="glow" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs><g transform="translate(${250*(1-m.sx)} ${pose.bob}) scale(${m.sx} ${m.sy*(pose.sy||1)})" filter="url(#shadow)">
      <ellipse style="${bodyDisplay}" cx="252" cy="535" rx="112" ry="19" fill="#001020" opacity=".48"/>
      ${hairParts.back}${legHtml}${shoesLayer(shoes,primary,glow,bodyDisplay,pose.legL,pose.legR,legW)}
      <g style="${bodyDisplay}">${torso}</g>${outfitArt}${heroOverlay}${arms}${armorArt}
      <circle cx="158" cy="192" r="24" fill="url(#skin)" stroke="${skinD}" stroke-width="5"/><circle cx="344" cy="192" r="24" fill="url(#skin)" stroke="${skinD}" stroke-width="5"/>
      <path d="M166 121c19-52 153-53 174 0l2 94c-11 58-59 85-91 85s-80-27-91-85z" fill="url(#skin)" stroke="${skinD}" stroke-width="6"/>
      ${hairParts.front}<path d="M197 183c13-17 34-18 50-5" fill="none" stroke="${hairD}" stroke-width="7" stroke-linecap="round"/><path d="M270 178c16-13 37-12 50 5" fill="none" stroke="${hairD}" stroke-width="7" stroke-linecap="round"/>
      ${eyeSvg}${lashes}${isGirl?`<g fill="#ef8f8f" opacity=".23"><ellipse cx="190" cy="226" rx="18" ry="8"/><ellipse cx="322" cy="226" rx="18" ry="8"/></g>`:''}
      <path d="M250 207c-5 8-4 15 4 18" fill="none" stroke="${skinD}" stroke-width="3"/>${faceMouth}${accessoryArt}
      </g></svg>`;
  }

  function dataUrl(svg){return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg)}
  function imgHTML(c,opts={}){const alt=opts.alt||'Personaje Mundo Cuadro';return `<img class="avatar-img" draggable="false" alt="${esc(alt)}" src="${dataUrl(avatarSVG(c,opts))}">`}
  function render(el,c,opts={}){if(!el)return;const img=new Image();img.className='avatar-img';img.alt=opts.alt||'Personaje Mundo Cuadro';img.draggable=false;img.decoding='async';img.src=dataUrl(avatarSVG(c,opts));el.replaceChildren(img)}
  window.MC.avatar={svg:avatarSVG,dataUrl,imgHTML,render,darken,lighten,outfitThemes};
})();
