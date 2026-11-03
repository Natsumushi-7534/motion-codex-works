"use strict";
// Display names are peer language forms. No stored combined display title.
const Titles=(()=>{
 const clean=x=>typeof x==="string"?x.trim():"";
 const key=x=>clean(x).normalize("NFKC").toLocaleLowerCase();
 function parts(work){
  let ja=clean(work.japaneseTitle),en=clean(work.englishTitle);
  if(ja&&en&&key(ja)===key(en))ja="";
  if(!ja&&!en){
   const original=clean(work.title||work.formalTitle);
   const pair=original.split("｜");
   if(pair.length===2&&/[\u3040-\u30ff\u3400-\u9fff]/.test(pair[0])){ja=clean(pair[0]);en=clean(pair[1]);}
   else en=original;
  }
  return {ja,en};
 }
 function text(work){const {ja,en}=parts(work);return [ja,en].filter(Boolean).join("｜");}
 function search(work){return [text(work),work.formalTitle||work.title||"",work.id||"",work.version||""].join(" ");}
 function render(work,tag="span"){
  const {ja,en}=parts(work),root=document.createElement(tag);root.className="film-title";
  function line(value,language,cls){const span=document.createElement("span");span.className=cls;span.lang=language;span.textContent=value;root.append(span);}
  if(ja)line(ja,"ja","main-title");
  if(en)line(en,"en",ja?"english-title":"main-title");
  return root;
 }
 return {parts,text,search,render};
})();
if(typeof module!=="undefined")module.exports=Titles;
