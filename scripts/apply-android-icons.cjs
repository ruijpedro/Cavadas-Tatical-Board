
const fs = require('fs');
const path = require('path');
const src = path.join(process.cwd(), 'android-assets', 'res');
const dst = path.join(process.cwd(), 'android', 'app', 'src', 'main', 'res');
function copyDir(s,d){ if(!fs.existsSync(s)) return; fs.mkdirSync(d,{recursive:true}); for(const f of fs.readdirSync(s)){ const sp=path.join(s,f), dp=path.join(d,f); if(fs.statSync(sp).isDirectory()) copyDir(sp,dp); else fs.copyFileSync(sp,dp); }}
copyDir(src,dst);
const any = path.join(dst,'mipmap-anydpi-v26'); fs.mkdirSync(any,{recursive:true});
const xml = `<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">\n    <background android:drawable="@mipmap/ic_launcher_adaptive_back"/>\n    <foreground android:drawable="@mipmap/ic_launcher_adaptive_fore"/>\n</adaptive-icon>\n`;
fs.writeFileSync(path.join(any,'ic_launcher.xml'), xml);
fs.writeFileSync(path.join(any,'ic_launcher_round.xml'), xml);
const manifest = path.join(process.cwd(),'android','app','src','main','AndroidManifest.xml');
if(fs.existsSync(manifest)){
  let t = fs.readFileSync(manifest,'utf8');
  if(!/android:icon=/.test(t)) t = t.replace('<application', '<application android:icon="@mipmap/ic_launcher" android:roundIcon="@mipmap/ic_launcher_round"');
  t = t.replace(/android:icon="[^"]*"/g,'android:icon="@mipmap/ic_launcher"');
  if(/android:roundIcon=/.test(t)) t=t.replace(/android:roundIcon="[^"]*"/g,'android:roundIcon="@mipmap/ic_launcher_round"');
  else t=t.replace(/android:icon="@mipmap\/ic_launcher"/, 'android:icon="@mipmap/ic_launcher" android:roundIcon="@mipmap/ic_launcher_round"');
  fs.writeFileSync(manifest,t);
}
console.log('Cavadas Tactical icons applied.');
