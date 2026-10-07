window.MC = window.MC || {};
(() => {
  const bridge = () => (typeof window.AndroidBridge !== 'undefined' ? window.AndroidBridge : null);
  const isAndroidApp = () => !!bridge();

  function safeName(name){
    return String(name || 'MundoCuadro.json').replace(/[\\/:*?"<>|]+/g,'_').slice(0,120);
  }
  function downloadText(fileName, text, mime='application/json'){
    fileName=safeName(fileName);
    const b=bridge();
    if(b && typeof b.saveTextFile==='function'){
      try{b.saveTextFile(fileName,String(text),String(mime));return true}catch(e){console.warn('Android save bridge',e)}
    }
    try{
      const blob=new Blob([String(text)],{type:mime}),a=document.createElement('a');
      a.href=URL.createObjectURL(blob);a.download=fileName;document.body.appendChild(a);a.click();a.remove();
      setTimeout(()=>URL.revokeObjectURL(a.href),1200);return true;
    }catch(e){console.warn('Browser download',e);return false}
  }
  function vibrate(ms=35){
    const b=bridge();
    try{if(b&&typeof b.vibrate==='function'){b.vibrate(Math.max(1,+ms||35));return}navigator.vibrate?.(Math.max(1,+ms||35))}catch(e){}
  }
  function nativeToast(message){
    const b=bridge();
    try{if(b&&typeof b.toast==='function')b.toast(String(message))}catch(e){}
  }
  function requestFullscreen(){
    const b=bridge();
    try{if(b&&typeof b.immersive==='function'){b.immersive();return}}
    catch(e){}
    const el=document.documentElement;
    try{el.requestFullscreen?.({navigationUI:'hide'})?.catch?.(()=>{})}catch(e){}
  }

  MC.platform={isAndroidApp,downloadText,vibrate,nativeToast,requestFullscreen};
  document.documentElement.classList.toggle('android-app',isAndroidApp());
  addEventListener('pointerdown',()=>{if(isAndroidApp())requestFullscreen()},{once:true,passive:true});
})();
