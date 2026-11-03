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
const normalize = value => value.normalize("NFKC").toLocaleLowerCase();
for (const series of new Set(works.map(w=>w.series))) byId("series").add(new Option(series,series));
const cards = [...byId("gallery").children];
function filterWorks(){
  const query = normalize(byId("search").value.trim());
  const series = byId("series").value;
  let count = 0;
  works.forEach((w,i)=>{
    const match = (!series || w.series===series) && normalize(Titles.search(w)).includes(query);
    cards[i].hidden=!match;
    if(match) count++;
  });
  byId("count").textContent = (count===works.length ? count : count+" / "+works.length)+" 作品";
  byId("no-results").hidden=!!count;
}
byId("search").oninput=filterWorks;
byId("series").onchange=filterWorks;
