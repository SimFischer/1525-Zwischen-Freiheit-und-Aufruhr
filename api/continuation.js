import {put,get,del} from '@vercel/blob';
export const MAX_REQUEST_BYTES=3*1024*1024;
export const MAX_CIPHER_CHARS=Math.ceil((2*1024*1024+16)/3)*4;
export const BLOB_NAMESPACE='1525-v1/';
const allowed=new Set(['https://simfischer.github.io','https://luther-und-die-bauernkriege.vercel.app','https://luther-und-die-bauernkriege-d0mc17qws-herr-fischer.vercel.app']);
export function createContinuationHandler(store={put,get,del},options={}){
 const recent=new Map(),clock=options.now||Date.now,token=()=>options.token??process.env.BLOB_READ_WRITE_TOKEN;
 return async function handler(req,res){
 res.setHeader('Cache-Control','no-store');res.setHeader('Vary','Origin');
 const origin=req.headers.origin;let local=false;try{const url=new URL(origin);local=['localhost','127.0.0.1','[::1]'].includes(url.hostname)&&['http:','https:'].includes(url.protocol)&&url.origin===origin;}catch{}
 if(origin&&!allowed.has(origin)&&!local)return res.status(403).json({error:'Origin not allowed'});
 if(origin)res.setHeader('Access-Control-Allow-Origin',origin);
 res.setHeader('Access-Control-Allow-Methods','POST, OPTIONS');res.setHeader('Access-Control-Allow-Headers','Content-Type');
 if(req.method==='OPTIONS')return res.status(204).end();
 if(req.method!=='POST')return res.status(405).json({error:'Use POST'});
 if(!token())return res.status(503).json({error:'Storage not configured'});
 if(!String(req.headers['content-type']||'').toLowerCase().startsWith('application/json'))return res.status(415).json({error:'Use JSON'});
 if(Number(req.headers['content-length']||0)>MAX_REQUEST_BYTES)return res.status(413).json({error:'Too large'});
 const now=clock(),ip=String(req.headers['x-forwarded-for']||'unknown').split(',')[0].trim();
 for(const [key,v]of recent)if(v.until<=now)recent.delete(key);
 if(recent.size>10000)return res.status(429).json({error:'Try again later'});
 const rate=recent.get(ip)||{count:0,until:now+60000};recent.set(ip,rate);if(++rate.count>600)return res.status(429).json({error:'Try again later'});
 let body;try{const raw=typeof req.body==='string'?req.body:JSON.stringify(req.body);if(!raw||Buffer.byteLength(raw)>MAX_REQUEST_BYTES)return res.status(413).json({error:'Too large'});body=JSON.parse(raw);}catch{return res.status(400).json({error:'Invalid JSON'});}
 if(!body||!['save','load'].includes(body.action)||typeof body.p_id!=='string'||! /^[a-f0-9]{64}$/.test(body.p_id)||Object.keys(body).some(k=>!['action','p_id','p_payload'].includes(k)))return res.status(400).json({error:'Invalid request'});
 const path=BLOB_NAMESPACE+body.p_id+'.json';
 try{
 if(body.action==='save'){
  const p=body.p_payload;if(!p||p.v!==1||typeof p.iv!=='string'||! /^[A-Za-z0-9+/]{16}$/.test(p.iv)||typeof p.data!=='string'||p.data.length<24||p.data.length>MAX_CIPHER_CHARS||p.data.length%4!==0||! /^[A-Za-z0-9+/]+={0,2}$/.test(p.data)||Object.keys(p).some(k=>!['v','iv','data'].includes(k)))return res.status(400).json({error:'Invalid payload'});
  const expires_at=new Date(now+90*86400000).toISOString();
  try{await store.put(path,JSON.stringify({expires_at,payload:{v:1,iv:p.iv,data:p.data}}),{access:'private',addRandomSuffix:false,allowOverwrite:false,contentType:'application/json',token:token()});}
  catch(error){if(['BlobPathnameConflictError','BlobPreconditionFailedError'].includes(error?.name)||/already exists|pathname.*exist/i.test(String(error?.message)))return res.status(409).json({error:'Code already in use'});throw error;}
  return res.status(201).json({expires_at});
 }
 const item=await store.get(path,{access:'private',useCache:false,token:token()});if(!item||item.statusCode!==200||!item.stream)return res.status(200).json(null);
 const raw=await new Response(item.stream).text();if(Buffer.byteLength(raw)>MAX_REQUEST_BYTES)return res.status(503).json({error:'Invalid stored snapshot'});const value=JSON.parse(raw);
 if(!Number.isFinite(Date.parse(value.expires_at))||Date.parse(value.expires_at)<=now){await store.del(path,{token:token()});return res.status(200).json(null);}
 return res.status(200).json(value.payload);
 }catch{return res.status(503).json({error:'Storage temporarily unavailable'});}
 };
}
export default createContinuationHandler();
