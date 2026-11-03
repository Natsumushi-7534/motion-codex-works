"use strict";
const themeButton = byId("theme");
function setTheme(dark) {
  document.documentElement.classList.toggle("cinematic", dark);
  themeButton.textContent = dark ? "Classic" : "Cinematic";
  themeButton.setAttribute("aria-label",themeButton.textContent+"表示に切り替える");
}
try { setTheme(sessionStorage.getItem("works-library-theme") !== "classic"); } catch { setTheme(true); }
themeButton.onclick = () => {
  setTheme(!document.documentElement.classList.contains("cinematic"));
  try { sessionStorage.setItem("works-library-theme",themeButton.textContent==="Classic"?"cinematic":"classic"); } catch {}
};
for (const series of new Set(works.map(w=>w.series))) byId("series").add(new Option(series,series));
const cards = new Map(works.map((w,i)=>[w.version,byId("gallery").children[i]]));
function filterWorks(){
  const series = byId("series").value;
  let count = 0;
  Chronology.ordered(works,byId("sort").value).forEach(w=>{
    const match = !series || w.series===series;
    const card = cards.get(w.version);
    card.hidden=!match;
    byId("gallery").append(card);
    if(match) count++;
  });
  byId("count").textContent = (count===works.length ? count : count+" / "+works.length)+" 作品";
  byId("no-results").hidden=!!count;
}
byId("series").onchange=filterWorks;
byId("sort").onchange=filterWorks;
filterWorks();
