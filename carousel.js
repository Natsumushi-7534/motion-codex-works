"use strict";
const carousel = (() => {
  const root = document.querySelector(".spotlight");
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const dots = byId("dots");
  const slide = byId("featured");
  let selected = [];
  let index = 0;
  let paused = motion.matches;
  let timer;
  function schedule() {
    clearTimeout(timer);
    if (paused || document.hidden || byId("library").hidden || selected.length < 2 || slide.contains(document.activeElement)) return;
    timer = setTimeout(() => show(index + 1), 10000);
  }
  function show(requested) {
    if (!selected.length) {
      slide.replaceChildren(node("p", "empty-feature", "現在、Featuredに掲載中の作品はありません。"));
      byId("position").textContent = "0 / 0";
    } else {
      index = (requested + selected.length) % selected.length;
      const hadFocus = slide.contains(document.activeElement);
      const link = entry(selected[index], true);
      slide.replaceChildren(link);
      if (hadFocus) link.focus({preventScroll:true});
      byId("position").textContent = (index + 1) + " / " + selected.length;
      [...dots.children].forEach((dot,i) => dot.setAttribute("aria-current", String(i === index)));
    }
    schedule();
  }
  function select(ids) {
    const previous = selected[index]?.id;
    selected = works.filter(w => ids.includes(w.id)).sort((a,b) => b.id.localeCompare(a.id));
    dots.replaceChildren(...selected.map((work,i) => {
      const dot = node("button", "dot");
      dot.type = "button";
      dot.setAttribute("aria-label", Titles.text(work) + "を表示");
      dot.onclick = () => show(i);
      return dot;
    }));
    dots.hidden = selected.length < 2;
    document.querySelector(".feature-nav").hidden = selected.length < 2;
    show(Math.max(0, selected.findIndex(w => w.id === previous)));
  }
  function setPaused(value) {
    paused = value;
    byId("rotation").textContent = paused ? "自動切替を再開" : "一時停止";
    schedule();
  }
  byId("rotation").onclick = () => setPaused(!paused);
  byId("prev").onclick = () => show(index - 1);
  byId("next").onclick = () => show(index + 1);
  root.addEventListener("keydown", event => {
    if (event.altKey || event.ctrlKey || event.metaKey || selected.length < 2) return;
    const target = {ArrowLeft:index - 1, ArrowRight:index + 1, Home:0, End:selected.length - 1}[event.key];
    if (target === undefined) return;
    event.preventDefault();
    const focusChoice = dots.contains(document.activeElement) || slide.contains(document.activeElement);
    show(target);
    if (focusChoice) dots.children[index].focus({preventScroll:true});
  });
  motion.addEventListener("change", event => setPaused(event.matches));
  slide.addEventListener("focusin", schedule);
  slide.addEventListener("focusout", () => queueMicrotask(schedule));
  document.addEventListener("visibilitychange", schedule);
  window.addEventListener("hashchange", schedule);
  window.addEventListener("pageshow", schedule);
  setPaused(paused);
  select(initialFeaturedIds);
  return {select};
})();
