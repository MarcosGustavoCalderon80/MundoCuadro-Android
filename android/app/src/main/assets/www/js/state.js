window.MC = window.MC || {};
(() => {
  const GEAR_CATALOG={
    miner_boots:{id:'miner_boots',slot:'boots',name:'Botas del Minero',icon:'🥾',desc:'+ salto y control en roca',bonus:{jump:45,speed:12}},
    crystal_charm:{id:'crystal_charm',slot:'charm',name:'Amuleto Resonante',icon:'💠',desc:'+ cadencia y magnetismo inicial',bonus:{cadence:-0.035,magnet:4}},
    spore_guard:{id:'spore_guard',slot:'charm',name:'Broche Micelio',icon:'🍄',desc:'+ 1 corazón máximo',bonus:{hp:1}},
    forge_core:{id:'forge_core',slot:'core',name:'Núcleo de Forja',icon:'🔥',desc:'+ daño y demolición',bonus:{damage:1,breakPower:1}},
    quarry_plate:{id:'quarry_plate',slot:'core',name:'Placa del Rey de la Cantera',icon:'🪨',desc:'+ 2 corazones y resistencia',bonus:{hp:2,damageReduction:.12}}
  };
  window.MC.GEAR_CATALOG=GEAR_CATALOG;
  const KEY = 'mundo_cuadro_reborn_save_v4';
  const OLD_KEYS = ['mundo_cuadro_reborn_save_v3','mundo_cuadro_reborn_save_v2','mundo_cuadro_reborn_save_v1'];
  const defaults = {
    profile:{name:'Jugador', level:5, xp:1391, xpNext:2000, coins:1250, crystals:85, totalStars:0, starTokens:null, lives:3, continues:3, lifeCoinProgress:0},
    avatar:{heroBase:'explorer',gender:'boy',basePreset:'orion',hair:0,hairColor:'#7a3f28',skin:'#f4c29b',face:0,outfit:0,outfitColor:'#ffb22e',shoes:0,accessory:9,armor:0,body:0,eyeColor:'#5b331f',pet:'drone',emote:'wave'},
    progress:{unlocked:1,stars:{},bestCoins:{},completed:[],bonusCompleted:{},checkpoints:{},worldCores:0,secretsFound:{}},
    inventory:{owned:['hero:explorer','outfit:0','hair:0','shoes:0','accessory:0','accessory:9','pet:drone'],equipped:{},items:{potion:2,shield:1,magnet:1,bomb:0,relic:0},materials:{grass:24,wood:22,brick:26,stone:20,iron:10,metal:8,glass:12,crystal:14,obsidian:6},gearOwned:[],equippedGear:{boots:null,charm:null,core:null},skillsOwned:[],equippedSkill:null,toolsOwned:[],equippedTool:null},
    dialogueMemory:{},
    quests:{},
    economy:{daily:{lastClaim:'',streak:0,missionDate:'',missionProgress:{coins:0,enemies:0,levels:0,chests:0},missionClaims:[]}},
    forge:{
      selectedProject:'starter',clipboard:[],campaignWorlds:[],projects:[{
        id:'starter',name:'Mi primer mundo',description:'Un nivel creado por vos',theme:'meadow',music:'adventure',spawn:{x:120,y:500},objective:{type:'collect',target:3},
        objects:[
          {id:'p1',type:'platform',x:0,y:610,w:520,h:80,material:'grass'},
          {id:'p2',type:'platform',x:680,y:520,w:260,h:48,material:'grass'},
          {id:'c1',type:'coin',x:760,y:450},{id:'cube1',type:'cube',x:850,y:430},
          {id:'enemy1',type:'enemy_blob',x:1080,y:555},{id:'spring1',type:'spring',x:1260,y:585},
          {id:'p3',type:'platform',x:1380,y:430,w:300,h:48,material:'stone'},
          {id:'checkpoint1',type:'checkpoint',x:1490,y:360},{id:'portal1',type:'portal',x:2050,y:470}
        ]
      }]
    },
    settings:{volume:70,reducedMotion:false,alwaysTouch:false,testMode:true,showGrid:true,snap:40,quality:'high',initialLives:3,initialContinues:3,extraLifeCoins:100,difficulty:'normal',respawnMode:'checkpoint',gamepadDeadzone:0.18,gamepadVibration:true}
  };
  const clone=o=>JSON.parse(JSON.stringify(o));
  const makeId=prefix=>`${prefix}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;
  function deepMerge(a,b){if(!b||typeof b!=='object')return a;for(const k of Object.keys(b)){if(b[k]&&typeof b[k]==='object'&&!Array.isArray(b[k]))a[k]=deepMerge(a[k]||{},b[k]);else a[k]=b[k]}return a}
  function load(){
    let d=clone(defaults),raw=null;
    try{raw=localStorage.getItem(KEY);if(!raw){for(const k of OLD_KEYS){raw=localStorage.getItem(k);if(raw)break}}if(raw)d=deepMerge(d,JSON.parse(raw))}catch(e){console.warn('Save load',e)}
    if(!Array.isArray(d.forge.projects)||!d.forge.projects.length){d.forge.projects=clone(defaults.forge.projects);d.forge.selectedProject='starter'}
    d.forge.campaignWorlds=Array.isArray(d.forge.campaignWorlds)?d.forge.campaignWorlds:[];d.forge.campaignWorlds.forEach((w,i)=>{w.name=String(w.name||`Mi mundo ${i+1}`).slice(0,32);w.sub=String(w.sub||'Mundo creado en WorldForge').slice(0,64);w.theme=w.theme||'meadow';w.levelIds=Array.isArray(w.levelIds)?w.levelIds:[]});for(const p of d.forge.projects){if(!p.publish)p.publish=null}
    if(Array.isArray(d.forge.objects)&&d.forge.objects.length&&d.forge.projects[0].objects.length===0)d.forge.projects[0].objects=d.forge.objects;
    d.settings.initialLives=Math.max(1,Math.min(9,+d.settings.initialLives||3));d.settings.initialContinues=Math.max(0,Math.min(9,+d.settings.initialContinues||3));d.settings.extraLifeCoins=Math.max(25,Math.min(500,+d.settings.extraLifeCoins||100));d.settings.difficulty=['casual','normal','challenge'].includes(d.settings.difficulty)?d.settings.difficulty:'normal';d.settings.respawnMode=['checkpoint','level'].includes(d.settings.respawnMode)?d.settings.respawnMode:'checkpoint';d.settings.gamepadDeadzone=Math.max(.05,Math.min(.45,+d.settings.gamepadDeadzone||.18));d.settings.gamepadVibration=d.settings.gamepadVibration!==false;
    d.profile.lives=Math.max(0,+d.profile.lives||d.settings.initialLives);d.profile.continues=Math.max(0,+d.profile.continues||d.settings.initialContinues);
    d.avatar.heroBase=d.avatar.heroBase||'explorer';d.avatar.pet=d.avatar.pet||'drone';d.avatar.gender=['boy','girl','neutral'].includes(d.avatar.gender)?d.avatar.gender:'boy';d.avatar.basePreset=d.avatar.basePreset||'orion';
    d.inventory.items=Object.assign({potion:0,shield:0,magnet:0,bomb:0,relic:0},d.inventory.items||{});d.inventory.materials=Object.assign({grass:8,wood:8,brick:10,stone:8,iron:4,metal:4,glass:5,crystal:5,obsidian:2},d.inventory.materials||{});d.inventory.gearOwned=Array.isArray(d.inventory.gearOwned)?d.inventory.gearOwned:[];d.inventory.equippedGear=Object.assign({boots:null,charm:null,core:null},d.inventory.equippedGear||{});d.inventory.skillsOwned=Array.isArray(d.inventory.skillsOwned)?d.inventory.skillsOwned:[];d.inventory.toolsOwned=Array.isArray(d.inventory.toolsOwned)?d.inventory.toolsOwned:[];d.inventory.equippedSkill=d.inventory.skillsOwned.includes(d.inventory.equippedSkill)?d.inventory.equippedSkill:null;d.inventory.equippedTool=d.inventory.toolsOwned.includes(d.inventory.equippedTool)?d.inventory.equippedTool:null;d.dialogueMemory=d.dialogueMemory||{};d.quests=d.quests||{};d.progress.secretsFound=d.progress.secretsFound||{};d.progress.bonusCompleted=d.progress.bonusCompleted||{};if(d.profile.starTokens==null||!Number.isFinite(+d.profile.starTokens))d.profile.starTokens=Object.values(d.progress.stars||{}).reduce((a,b)=>a+(+b||0),0);d.economy=d.economy||{};d.economy.daily=Object.assign({lastClaim:'',streak:0,missionDate:'',missionProgress:{coins:0,enemies:0,levels:0,chests:0},missionClaims:[]},d.economy.daily||{});d.economy.daily.missionProgress=Object.assign({coins:0,enemies:0,levels:0,chests:0},d.economy.daily.missionProgress||{});d.economy.daily.missionClaims=Array.isArray(d.economy.daily.missionClaims)?d.economy.daily.missionClaims:[];
    return d;
  }
  let data=load();const listeners=[];
  function save(){try{localStorage.setItem(KEY,JSON.stringify(data))}catch(e){}listeners.forEach(fn=>fn(data))}
  function reset(){data=clone(defaults);save()}
  function exportSave(){return {format:'MundoCuadro.PlayerSave.v1',game:'Mundo Cuadro REBORN',saveVersion:4,exportedAt:new Date().toISOString(),data:clone(data)}}
  function importSave(payload){
    let src=payload;
    if(typeof src==='string')src=JSON.parse(src);
    if(src&&src.format==='MundoCuadro.PlayerSave.v1'&&src.data)src=src.data;
    if(!src||typeof src!=='object'||Array.isArray(src))throw new Error('Formato de partida no válido');
    const next=deepMerge(clone(defaults),clone(src));
    if(!next.profile||!next.progress||!next.inventory||!next.forge||!next.settings)throw new Error('La copia no contiene una partida completa');
    data=next;save();return true;
  }
  function starsTotal(){return Object.values(data.progress.stars||{}).reduce((a,b)=>a+(+b||0),0)}
  function addCoins(n){data.profile.coins=Math.max(0,(data.profile.coins||0)+n);save()}
  function currencyAmount(kind){if(kind==='coins')return Math.max(0,+data.profile.coins||0);if(kind==='crystals')return Math.max(0,+data.profile.crystals||0);if(kind==='stars')return Math.max(0,+data.profile.starTokens||0);return 0}
  function addCurrency(kind,n){n=+n||0;if(kind==='coins')data.profile.coins=Math.max(0,(data.profile.coins||0)+n);if(kind==='crystals')data.profile.crystals=Math.max(0,(data.profile.crystals||0)+n);if(kind==='stars')data.profile.starTokens=Math.max(0,(data.profile.starTokens||0)+n);save();return currencyAmount(kind)}
  function spendCurrency(kind,n){n=Math.max(0,+n||0);if(currencyAmount(kind)<n)return false;if(kind==='coins')data.profile.coins-=n;if(kind==='crystals')data.profile.crystals-=n;if(kind==='stars')data.profile.starTokens-=n;save();return true}
  function owns(key){return (data.inventory.owned||[]).includes(key)||(key.startsWith('gear:')&&data.inventory.gearOwned.includes(key.slice(5)))||(key.startsWith('skill:')&&data.inventory.skillsOwned.includes(key.slice(6)))||(key.startsWith('tool:')&&data.inventory.toolsOwned.includes(key.slice(5)))}
  function unlock(key){if(!key)return false;if(key.startsWith('gear:'))return addGear(key.slice(5));if(key.startsWith('skill:')){const id=key.slice(6);if(!data.inventory.skillsOwned.includes(id))data.inventory.skillsOwned.push(id);save();return true}if(key.startsWith('tool:')){const id=key.slice(5);if(!data.inventory.toolsOwned.includes(id))data.inventory.toolsOwned.push(id);save();return true}if(!data.inventory.owned.includes(key))data.inventory.owned.push(key);save();return true}
  function purchase(key,currency,price){if(owns(key))return {ok:false,reason:'owned'};if(!spendCurrency(currency,price))return {ok:false,reason:'funds'};unlock(key);return {ok:true}}
  function equipSkill(id){if(id&&!data.inventory.skillsOwned.includes(id))return false;data.inventory.equippedSkill=data.inventory.equippedSkill===id?null:id;save();return true}
  function equipTool(id){if(id&&!data.inventory.toolsOwned.includes(id))return false;data.inventory.equippedTool=data.inventory.equippedTool===id?null:id;save();return true}
  function skillBonuses(){const id=data.inventory.equippedSkill;return {airJumps:id==='triple_jump'?1:0,startShield:id==='prism_aegis'?6:0,magnetRadius:id==='treasure_field'?280:0,shotDamage:id==='nova_rounds'?1:0}}
  function toolBonuses(){const id=data.inventory.equippedTool;return {mapStart:id==='nova_scanner',breakPower:id==='breaker_glove'?2:0,freeBuildChance:id==='builder_matrix'?0.25:0}}
  function localDateKey(dt=new Date()){const y=dt.getFullYear(),m=String(dt.getMonth()+1).padStart(2,'0'),d=String(dt.getDate()).padStart(2,'0');return `${y}-${m}-${d}`}
  function dateGap(a,b){if(!a||!b)return 999;const aa=new Date(a+'T12:00:00'),bb=new Date(b+'T12:00:00');return Math.round((bb-aa)/86400000)}
  const DAILY_MISSIONS=[
    {id:'coins',label:'Recolectá 30 monedas en levels',target:30,reward:{kind:'coins',amount:180},icon:'🪙'},
    {id:'enemies',label:'Derrotá 6 enemigos',target:6,reward:{kind:'crystals',amount:2},icon:'⚔️'},
    {id:'levels',label:'Completá 1 level o bonus',target:1,reward:{kind:'coins',amount:260},icon:'🏁'},
    {id:'chests',label:'Abrí 2 cofres',target:2,reward:{kind:'crystals',amount:2},icon:'🎁'}
  ];
  function ensureDaily(){const today=localDateKey(),d=data.economy.daily;if(d.missionDate!==today){d.missionDate=today;d.missionProgress={coins:0,enemies:0,levels:0,chests:0};d.missionClaims=[];save()}return d}
  function dailyStatus(){const d=ensureDaily(),today=localDateKey(),claimed=d.lastClaim===today,gap=dateGap(d.lastClaim,today),nextStreak=claimed?((+d.streak||0)%7)+1:(gap===1?Math.min(7,(+d.streak||0)+1):1);return{today,claimed,streak:+d.streak||0,nextStreak,lastClaim:d.lastClaim,missions:DAILY_MISSIONS.map(m=>({...m,progress:Math.min(m.target,+d.missionProgress[m.id]||0),claimed:d.missionClaims.includes(m.id)}))}}
  function claimDailyReward(){const d=ensureDaily(),today=localDateKey();if(d.lastClaim===today)return{ok:false,reason:'claimed'};const gap=dateGap(d.lastClaim,today);d.streak=gap===1?Math.min(7,(+d.streak||0)+1):1;const rewards=[{kind:'coins',amount:120},{kind:'crystals',amount:2},{kind:'coins',amount:180},{kind:'crystals',amount:3},{kind:'coins',amount:260},{kind:'crystals',amount:4},{kind:'stars',amount:1}],reward=rewards[(d.streak-1)%7];d.lastClaim=today;addCurrency(reward.kind,reward.amount);save();return{ok:true,streak:d.streak,reward}}
  function dailyEvent(kind,n=1){const d=ensureDaily();if(!(kind in d.missionProgress))return;d.missionProgress[kind]=Math.max(0,(+d.missionProgress[kind]||0)+(+n||0));save()}
  function claimDailyMission(id){const d=ensureDaily(),m=DAILY_MISSIONS.find(x=>x.id===id);if(!m)return{ok:false,reason:'missing'};if(d.missionClaims.includes(id))return{ok:false,reason:'claimed'};if((+d.missionProgress[id]||0)<m.target)return{ok:false,reason:'progress'};d.missionClaims.push(id);addCurrency(m.reward.kind,m.reward.amount);save();return{ok:true,reward:m.reward}}
  function spendLife(){data.profile.lives=Math.max(0,(data.profile.lives||0)-1);save();return data.profile.lives}
  function addLife(n=1){data.profile.lives=Math.min(99,(data.profile.lives||0)+n);save()}
  function resetRunResources(){data.profile.lives=data.settings.initialLives||3;data.profile.continues=data.settings.initialContinues||3;save()}
  function applyRunSettings(){data.profile.lives=Math.max(1,Math.min(9,+data.settings.initialLives||3));data.profile.continues=Math.max(0,Math.min(9,+data.settings.initialContinues||3));save()}
  function addItem(id,n=1){data.inventory.items[id]=Math.max(0,(data.inventory.items[id]||0)+n);save();return data.inventory.items[id]}
  function consumeItem(id,n=1){if((data.inventory.items[id]||0)<n)return false;data.inventory.items[id]-=n;save();return true}
  function addMaterial(id,n=1){data.inventory.materials=data.inventory.materials||{};data.inventory.materials[id]=Math.max(0,(data.inventory.materials[id]||0)+n);save();return data.inventory.materials[id]}
  function consumeMaterial(id,n=1){data.inventory.materials=data.inventory.materials||{};if((data.inventory.materials[id]||0)<n)return false;data.inventory.materials[id]-=n;save();return true}
  function addGear(id){if(!GEAR_CATALOG[id])return false;if(!data.inventory.gearOwned.includes(id))data.inventory.gearOwned.push(id);save();return true}
  function equipGear(id){const g=GEAR_CATALOG[id];if(!g||!data.inventory.gearOwned.includes(id))return false;data.inventory.equippedGear[g.slot]=data.inventory.equippedGear[g.slot]===id?null:id;save();return true}
  function gearBonuses(){const out={hp:0,speed:0,jump:0,damage:0,cadence:0,magnet:0,breakPower:0,damageReduction:0};for(const id of Object.values(data.inventory.equippedGear||{})){const b=GEAR_CATALOG[id]?.bonus||{};for(const k of Object.keys(out))out[k]+=+b[k]||0}return out}
  function rememberDialog(level,npcId,patch={}){const key=String(level);data.dialogueMemory[key]=data.dialogueMemory[key]||{};data.dialogueMemory[key][npcId]=Object.assign({talks:0,last:''},data.dialogueMemory[key][npcId]||{},patch);save();return data.dialogueMemory[key][npcId]}
  function dialogMemory(level,npcId){return data.dialogueMemory?.[String(level)]?.[npcId]||{talks:0,last:''}}
  function setQuest(id,patch){data.quests[id]=Object.assign({status:'inactive',progress:0,target:1,reward:null},data.quests[id]||{},patch);save();return data.quests[id]}
  function getQuest(id){return data.quests[id]||null}
  function markSecret(level,id){const k=String(level);data.progress.secretsFound[k]=data.progress.secretsFound[k]||[];if(!data.progress.secretsFound[k].includes(id))data.progress.secretsFound[k].push(id);save()}
  function completeLevel(level,stars,coins){dailyEvent('levels',1);const old=data.progress.stars[level]||0,next=Math.max(old,stars),delta=Math.max(0,next-old);data.progress.stars[level]=next;data.progress.bestCoins[level]=Math.max(data.progress.bestCoins[level]||0,coins||0);if(!data.progress.completed.includes(level))data.progress.completed.push(level);data.progress.unlocked=Math.max(data.progress.unlocked,Math.min(40,level+1));data.profile.coins+=coins||0;data.profile.totalStars=starsTotal();data.profile.starTokens=Math.max(0,(+data.profile.starTokens||0)+delta);data.profile.xp+=(100+stars*50);while(data.profile.xp>=data.profile.xpNext){data.profile.xp-=data.profile.xpNext;data.profile.level++;data.profile.xpNext=Math.round(data.profile.xpNext*1.18/50)*50;data.profile.crystals+=2}save()}
  function completeBonus(afterLevel){dailyEvent('levels',1);const k=String(afterLevel),first=!data.progress.bonusCompleted[k];data.progress.bonusCompleted[k]=true;save();return first}
  function currentProject(){let p=data.forge.projects.find(x=>x.id===data.forge.selectedProject);if(!p){p=data.forge.projects[0];data.forge.selectedProject=p.id}return p}
  function saveProject(project){const i=data.forge.projects.findIndex(x=>x.id===project.id);if(i>=0)data.forge.projects[i]=project;else data.forge.projects.push(project);data.forge.selectedProject=project.id;save()}
  function createProject(){const id=makeId('world');const p={id,name:'Nuevo nivel',description:'Creado en WorldForge',theme:'meadow',music:'adventure',spawn:{x:120,y:500},objective:{type:'collect',target:3},publish:null,objects:[{id:'ground_'+Date.now(),type:'platform',x:0,y:610,w:520,h:80,material:'grass'},{id:'portal_'+Date.now(),type:'portal',x:1800,y:470}]};data.forge.projects.push(p);data.forge.selectedProject=id;save();return p}
  function createCampaignWorld(name='Mi mundo nuevo',theme='meadow'){const id=makeId('campaign'),palette=['#56e6dd','#ffb84b','#ff7f88','#6cb8ff','#b97cff','#73d56d'];const w={id,name:String(name||'Mi mundo nuevo').slice(0,32),sub:'Mundo creado en WorldForge',theme:String(theme||'meadow'),accent:palette[data.forge.campaignWorlds.length%palette.length],levelIds:[]};data.forge.campaignWorlds.push(w);save();return w}
  function renameCampaignWorld(id,name,sub){const w=data.forge.campaignWorlds.find(x=>x.id===id);if(!w)return false;w.name=String(name||w.name||'Mi mundo').trim().slice(0,32)||'Mi mundo';if(sub!=null)w.sub=String(sub||'Mundo creado en WorldForge').trim().slice(0,64)||'Mundo creado en WorldForge';save();return true}
  function publishProject(projectId,target){const p=data.forge.projects.find(x=>x.id===projectId);if(!p)return false;for(const w of data.forge.campaignWorlds)w.levelIds=(w.levelIds||[]).filter(id=>id!==projectId);if(!target||target==='none'){p.publish=null;save();return true}if(String(target).startsWith('official:')){const world=Math.max(1,Math.min(8,+String(target).split(':')[1]||1)),list=publishedForOfficial(world).filter(x=>x.id!==projectId),maxOrder=list.reduce((m,x)=>Math.max(m,+x.publish?.order||0),0);p.publish={type:'official',world,order:maxOrder+1};save();return true}if(String(target).startsWith('custom:')){const worldId=String(target).slice(7),w=data.forge.campaignWorlds.find(x=>x.id===worldId);if(!w)return false;p.publish={type:'custom',worldId};w.levelIds=w.levelIds||[];if(!w.levelIds.includes(projectId))w.levelIds.push(projectId);save();return true}return false}
  function publishedForOfficial(world){return data.forge.projects.filter(p=>p.publish?.type==='official'&&+p.publish.world===+world).sort((a,b)=>{const ao=+a.publish?.order||data.forge.projects.indexOf(a)+1,bo=+b.publish?.order||data.forge.projects.indexOf(b)+1;return ao-bo})}
  function levelsForCampaignWorld(worldId){const w=data.forge.campaignWorlds.find(x=>x.id===worldId);if(!w)return[];const map=new Map(data.forge.projects.map(p=>[p.id,p]));return (w.levelIds||[]).map(id=>map.get(id)).filter(Boolean)}
  function movePublishedProject(projectId,delta){delta=delta<0?-1:1;const p=data.forge.projects.find(x=>x.id===projectId);if(!p?.publish)return false;if(p.publish.type==='custom'){const w=data.forge.campaignWorlds.find(x=>x.id===p.publish.worldId);if(!w)return false;const a=w.levelIds||[],i=a.indexOf(projectId),j=Math.max(0,Math.min(a.length-1,i+delta));if(i<0||i===j)return false;[a[i],a[j]]=[a[j],a[i]];save();return true}if(p.publish.type==='official'){const list=publishedForOfficial(p.publish.world),i=list.findIndex(x=>x.id===projectId),j=Math.max(0,Math.min(list.length-1,i+delta));if(i<0||i===j)return false;list.forEach((x,k)=>{x.publish.order=k+1});[list[i].publish.order,list[j].publish.order]=[list[j].publish.order,list[i].publish.order];save();return true}return false}
  function campaignWorldBundle(worldId){const w=data.forge.campaignWorlds.find(x=>x.id===worldId);if(!w)return null;return{format:'MundoCuadro.WorldForgeWorld.v1',world:clone(w),levels:levelsForCampaignWorld(worldId).map(clone)}}
  function deleteCampaignWorld(id){const w=data.forge.campaignWorlds.find(x=>x.id===id);if(!w)return false;for(const p of data.forge.projects)if(p.publish?.type==='custom'&&p.publish.worldId===id)p.publish=null;data.forge.campaignWorlds=data.forge.campaignWorlds.filter(x=>x.id!==id);save();return true}
  function deleteProject(id){if(data.forge.projects.length<=1)return false;data.forge.projects=data.forge.projects.filter(p=>p.id!==id);for(const w of data.forge.campaignWorlds)w.levelIds=(w.levelIds||[]).filter(x=>x!==id);if(data.forge.selectedProject===id)data.forge.selectedProject=data.forge.projects[0].id;save();return true}
  window.MC.state={get data(){return data},save,reset,exportSave,importSave,subscribe(fn){listeners.push(fn)},starsTotal,currencyAmount,addCurrency,spendCurrency,owns,unlock,purchase,equipSkill,equipTool,skillBonuses,toolBonuses,dailyStatus,claimDailyReward,dailyEvent,claimDailyMission,addCoins,spendLife,addLife,resetRunResources,applyRunSettings,addItem,consumeItem,addMaterial,consumeMaterial,addGear,equipGear,gearBonuses,rememberDialog,dialogMemory,setQuest,getQuest,markSecret,completeLevel,completeBonus,currentProject,saveProject,createProject,deleteProject,createCampaignWorld,renameCampaignWorld,publishProject,publishedForOfficial,levelsForCampaignWorld,movePublishedProject,campaignWorldBundle,deleteCampaignWorld};
})();
