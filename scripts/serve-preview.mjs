import {createServer} from 'node:http';
import {createReadStream} from 'node:fs';
import {stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(fileURLToPath(new URL('../',import.meta.url)));
const types={'.html':'text/html; charset=utf-8','.wav':'audio/wav','.mp4':'video/mp4','.png':'image/png'};
createServer(async(req,res)=>{
 try{
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  let path=resolve(root,'.'+pathname);
  if(!path.startsWith(root+sep)&&path!==root){res.writeHead(403).end();return;}
  let info=await stat(path);if(info.isDirectory()){path=resolve(path,'index.html');info=await stat(path);}
  let start=0,end=info.size-1;const match=/^bytes=(\d+)-(\d*)$/.exec(req.headers.range??'');
  if(match){start=Number(match[1]);if(match[2])end=Math.min(Number(match[2]),end);if(start>end){res.writeHead(416,{'Content-Range':`bytes */${info.size}`}).end();return;}}
  res.writeHead(match?206:200,{'Content-Type':types[extname(path)]??'application/octet-stream','Accept-Ranges':'bytes','Content-Length':end-start+1,...(match?{'Content-Range':`bytes ${start}-${end}/${info.size}`}:{})});
  if(req.method==='HEAD')res.end();else createReadStream(path,{start,end}).pipe(res);
 }catch{res.writeHead(404).end('Not found');}
}).listen(3029,'127.0.0.1',()=>console.log('Preview: http://127.0.0.1:3029/dist/'));
