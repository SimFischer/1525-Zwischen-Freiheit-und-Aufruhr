import {normalizeSavedState,safeSavedStructure,isTestMode} from './save-system.js';
export const CONTINUATION_API_BASE='https://luther-und-die-bauernkriege.vercel.app';
export const APP_ID='1525-zwischen-freiheit-und-aufruhr';
export const MAX_SNAPSHOT_BYTES=2*1024*1024;
export const MAX_CIPHER_CHARS=Math.ceil((MAX_SNAPSHOT_BYTES+16)/3)*4;
export const CODE_ALPHABET='0123456789ABCDEFGHJKMNPQRSTVWXYZ';
const enc=new TextEncoder(),dec=new TextDecoder('utf-8',{fatal:true});
export class ContinuationError extends Error {constructor(kind){super(kind);this.kind=kind;}}
export const normalizeCode=input=>String(input??'').replace(/[\s-]/g,'').toUpperCase().replace(/O/g,'0').replace(/[IL]/g,'1');
export const validCode=code=>/^[0-9A-HJKMNP-TV-Z]{8}$/.test(code);
export const formatCode=code=>code.slice(0,4)+'-'+code.slice(4);
export function newContinuationCode(){return Array.from(crypto.getRandomValues(new Uint8Array(8)),n=>CODE_ALPHABET[n&31]).join('');}
export async function deriveContinuationKeys(input){const code=normalizeCode(input);if(!validCode(code))throw new ContinuationError('invalid');
 if(!globalThis.crypto?.subtle)throw new ContinuationError('crypto');
 const base=await crypto.subtle.importKey('raw',enc.encode(code),'PBKDF2',false,['deriveBits']);
 const bits=new Uint8Array(await crypto.subtle.deriveBits({name:'PBKDF2',hash:'SHA-256',salt:enc.encode('1525-short-v1'),iterations:200000},base,512));
 return {id:Array.from(bits.slice(0,32),n=>n.toString(16).padStart(2,'0')).join(''),key:await crypto.subtle.importKey('raw',bits.slice(32),'AES-GCM',false,['encrypt','decrypt'])};
}
const b64=bytes=>{let binary='';for(let i=0;i<bytes.length;i+=8192)binary+=String.fromCharCode(...bytes.subarray(i,i+8192));return btoa(binary);};
const bytes=value=>Uint8Array.from(atob(value),c=>c.charCodeAt(0));
export function validateContinuationSnapshot(value){
 try{safeSavedStructure(value);if(!value||value.app!==APP_ID||value.format!==1||typeof value.savedAt!=='string'||!Number.isFinite(Date.parse(value.savedAt))||!value.state)throw Error();
 if(enc.encode(JSON.stringify(value)).length>MAX_SNAPSHOT_BYTES)throw new ContinuationError('size');
 const state=normalizeSavedState(value.state);if(!state||state.consequences?.adminScenario)throw Error();
 delete state.uiMode;return {app:APP_ID,format:1,savedAt:value.savedAt,state};
 }catch(error){throw error instanceof ContinuationError?error:new ContinuationError('snapshot');}
}
export function buildContinuationSnapshot(state){
 if(isTestMode()||state?.consequences?.adminScenario)throw new ContinuationError('test');
 const next=validateContinuationSnapshot({app:APP_ID,format:1,savedAt:new Date().toISOString(),state});
 return next;
}
export async function encryptContinuationSnapshot(snapshot,code){const k=await deriveContinuationKeys(code),iv=crypto.getRandomValues(new Uint8Array(12));
 const raw=enc.encode(JSON.stringify(snapshot));if(raw.length>MAX_SNAPSHOT_BYTES)throw new ContinuationError('size');
 const ciphertext=await crypto.subtle.encrypt({name:'AES-GCM',iv,additionalData:enc.encode(APP_ID+':1')},k.key,raw);
 return {id:k.id,payload:{v:1,iv:b64(iv),data:b64(new Uint8Array(ciphertext))}};
}
export async function decryptContinuationSnapshot(payload,code){
 try{if(!payload||payload.v!==1||! /^[A-Za-z0-9+/]{16}$/.test(payload.iv||'')||typeof payload.data!=='string'||payload.data.length>MAX_CIPHER_CHARS||payload.data.length%4!==0||! /^[A-Za-z0-9+/]+={0,2}$/.test(payload.data))throw Error();
 const k=await deriveContinuationKeys(code),raw=await crypto.subtle.decrypt({name:'AES-GCM',iv:bytes(payload.iv),additionalData:enc.encode(APP_ID+':1')},k.key,bytes(payload.data));
 if(raw.byteLength>MAX_SNAPSHOT_BYTES)throw Error();return validateContinuationSnapshot(JSON.parse(dec.decode(raw)));
 }catch{throw new ContinuationError('decrypt');}
}
async function rpc(action,body){
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),20000);
 try{const response=await fetch(CONTINUATION_API_BASE+'/api/continuation',{method:'POST',mode:'cors',credentials:'omit',cache:'no-store',referrerPolicy:'no-referrer',headers:{'Content-Type':'application/json'},body:JSON.stringify({action,...body}),signal:controller.signal});
 if(response.status===409)throw new ContinuationError('collision');if(!response.ok)throw new ContinuationError('network');
 const raw=await response.text();if(raw.length>MAX_CIPHER_CHARS+2048)throw Error();return JSON.parse(raw);
 }catch(error){throw error instanceof ContinuationError?error:new ContinuationError('network');}finally{clearTimeout(timer);}
}
export async function createContinuationCode(state){const snapshot=buildContinuationSnapshot(state);
 for(let attempt=0;attempt<5;attempt++){const code=newContinuationCode(),{id,payload}=await encryptContinuationSnapshot(snapshot,code);
 try{const result=await rpc('save',{p_id:id,p_payload:payload});if(!Number.isFinite(Date.parse(result?.expires_at)))throw new ContinuationError('network');return {code:formatCode(code),expiresAt:result.expires_at,savedAt:snapshot.savedAt};}
 catch(error){if(error.kind!=='collision')throw error;}}
 throw new ContinuationError('network');
}
export async function loadContinuationCode(input){if(isTestMode())throw new ContinuationError('test');const code=normalizeCode(input);if(!validCode(code))throw new ContinuationError('invalid');
 const {id}=await deriveContinuationKeys(code),payload=await rpc('load',{p_id:id});if(!payload)throw new ContinuationError('missing');return decryptContinuationSnapshot(payload,code);
}
export function continuationErrorMessage(error,loading=true){return ({invalid:'Bitte gib den Code vollständig ein.',missing:'Dieser Code wurde nicht gefunden oder ist nicht mehr gültig.',decrypt:'Dieser Spielstand konnte nicht sicher gelesen werden. Prüfe den Code.',snapshot:'Dieser Spielstand konnte nicht sicher gelesen werden. Prüfe den Code.',test:'Im Testmodus können keine Fortsetzungscodes gespeichert oder geladen werden.',size:'Dieser Spielstand ist zu groß für einen Fortsetzungscode. Dein lokaler Spielstand bleibt erhalten.',crypto:'Bitte öffne die App über ihre HTTPS-Adresse.'})[error.kind]||(loading?'Der Online-Spielstand konnte gerade nicht geladen werden. Dein lokaler Spielstand bleibt unverändert.':'Der Fortsetzungscode konnte gerade nicht erzeugt werden. Dein lokaler Spielstand bleibt unverändert.');}
