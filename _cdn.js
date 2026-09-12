const fs=require('fs');
const cdn='https://cdn.jsdelivr.net/gh/ExCokai/yunx-esports@master/';
let c=fs.readFileSync('index.html','utf8');

// CSS url('xxx') 和 url("xxx") — 只替换不是 http 开头的
c=c.replace(/url\(["']?(?!https?:\/\/)([^"')]+?\.(?:jpg|jpeg|png|webp))["']?\)/gi,(_,u)=>`url("${cdn}${u}")`);

// HTML src="xxx" 和 src='xxx'
c=c.replace(/(src=["'])(?!https?:\/\/)([^"']+\.(?:jpg|jpeg|png|webp))/gi,(_,p,u)=>`${p}${cdn}${u}`);

// JS 里的 .src='xxx' 或 .src="xxx"
c=c.replace(/(\.src=["'])(?!https?:\/\/)([^"']+\.(?:jpg|jpeg|png|webp))/gi,(_,p,u)=>`${p}${cdn}${u}`);

fs.writeFileSync('index.html',c,'utf8');
console.log('Done. CDN prefix added to all local image refs.');
// 验证
const matches=c.match(/cdn\.jsdelivr\.net/g);
console.log(`Total CDN references: ${matches?matches.length:0}`);
