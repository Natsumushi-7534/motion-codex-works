"use strict";
// Only confirmed adoption dates/times. A missing time stays missing.
const Chronology = (() => {
  function value(work) {
    const c = work.completion;
    if (!c || !/^\d{4}-\d{2}-\d{2}$/.test(c.day || "")) return null;
    const date = new Date(c.day + "T00:00:00Z");
    if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== c.day) return null;
    const match = typeof c.at === "string" && c.at.match(/^(\d{4}-\d{2}-\d{2})T(\d{2}):(\d{2})\+09:00$/);
    const timed = match && match[1] === c.day && Number(match[2]) < 24 && Number(match[3]) < 60;
    return {day:c.day, minute:timed ? Number(match[2])*60 + Number(match[3]) : null,
      at:timed ? c.at : null};
  }
  function ordered(items, mode = "completed-desc") {
    const direction = mode === "completed-asc" ? 1 : -1;
    return items.map((item,index) => ({item,index,date:value(item)})).sort((a,b) => {
      if (!!a.date !== !!b.date) return a.date ? -1 : 1;
      if (!a.date) return a.index-b.index;
      const day = a.date.day.localeCompare(b.date.day);
      if (day) return day*direction;
      const timedA = a.date.minute !== null, timedB = b.date.minute !== null;
      // Same-day undated times form a stable group, never an invented midnight.
      if (timedA !== timedB) return timedA ? -1 : 1;
      return (timedA ? (a.date.minute-b.date.minute)*direction : 0) || a.index-b.index;
    }).map(entry => entry.item);
  }
  function label(work) {
    const c = value(work);
    return !c ? "完成採用日時 未確認" : "完成採用 " + c.day.replaceAll("-", ".")
      + (c.at ? " " + c.at.slice(11,16) + " JST" : " · 時刻未確認");
  }
  return {value,ordered,label};
})();
if (typeof module !== "undefined") module.exports = Chronology;
