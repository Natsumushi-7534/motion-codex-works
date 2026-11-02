"use strict";
const byId = id => document.getElementById(id);
function clock(seconds) {
  const total = Math.round(seconds);
  return Math.floor(total / 60) + ":" + String(total % 60).padStart(2, "0");
}
function node(tag, cls, text) {
  const el = document.createElement(tag);
  if (cls) el.className = cls;
  if (text) el.textContent = text;
  return el;
}
function image(work) {
  const img = node("img");
  img.src = work.thumbnail;
  img.alt = "";
  return img;
}
function stars(work) {
  if (work.rating == null) return node("span", "unrated", "未評価");
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns,"svg");
  svg.setAttribute("viewBox","0 0 116 20");
  svg.setAttribute("class","stars");
  svg.setAttribute("role","img");
  svg.setAttribute("aria-label","Human評価 " + work.rating.toFixed(1) + " / 5");
  for(let i=0;i<5;i++){
    const star = document.createElementNS(ns,"path");
    star.setAttribute("d","M10 0.8 12.9 6.7 19.5 7.7 14.7 12.3 15.8 19 10 15.9 4.2 19 5.3 12.3 0.5 7.7 7.1 6.7Z");
    const slot = document.createElementNS(ns,"g");
    slot.setAttribute("transform","translate(" + (24*i) + " 0)");
    slot.append(star);
    const fraction = Math.min(1,Math.max(0,work.rating-i));
    if (fraction) {
      const clip = document.createElementNS(ns,"svg");
      clip.setAttribute("width",String(20*fraction));
      clip.setAttribute("height","20");
      clip.setAttribute("overflow","hidden");
      clip.setAttribute("class","lit");
      clip.append(star.cloneNode());
      slot.append(clip);
    }
    svg.append(slot);
  }
  return svg;
}
function filmTitle(work,tag) {
  const title=node(tag,"film-title");
  const [first,second]=work.title.split("｜");
  title.append(node("span","main-title",first));
  if(second) title.append(node("span","alternate-title",second));
  return title;
}
let startOnOpen = null;
function entry(work,featured){
  const link=node("a",featured?"featured":"card");
  link.href="#"+work.version;
  const poster=image(work);
  const line=node("div","film-facts");
  line.append(stars(work),node("span","running-time",clock(work.seconds)));
  if (featured) {
    const caption=node("div","featured-caption");
    caption.append(node("span","hero-label","FEATURED WORK"),filmTitle(work,"h2"),line,
      node("p","synopsis",work.description),node("span","cta",work.video?"▶　作品を再生":"作品をひらく　↗"));
    link.append(poster,caption);
    if(work.video) link.addEventListener("click",event=>{
      if(!event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) startOnOpen=work.version;
    });
  } else {
    const cover=node("div","card-cover");
    poster.loading="lazy";
    cover.append(poster,node("span","card-arrow","↗"));
    const text=node("div","card-text");
    text.append(node("small","film-id",work.id+"　/　"+work.series),filmTitle(work,"h3"),line,node("p","synopsis",work.description));
    link.append(cover,text);
  }
  return link;
}
byId("count").textContent = works.length + " 作品";
for (const w of works) {
  byId("gallery").append(entry(w, false));
}

let activePlayer;
let currentFrame;
let lastEntry;
document.addEventListener("click", event => {
  const link = event.target.closest("#library a");
  if (link) lastEntry = link;
});
function status(message) { byId("status").textContent = message; }

function observePlayer() {
  const frame = currentFrame;
  if (!frame || !window.YT?.Player || activePlayer) return;
  activePlayer = new YT.Player(frame, {events: {
    onStateChange(event) {
      if (currentFrame !== frame) return;
      if (event.data === 1) status("再生中");
      if (event.data === 0) status("上映は終了しました。もう一度再生するか、作品一覧に戻れます。");
    },
    onError(event) {
      if (currentFrame !== frame) return;
      const reason = {100: "動画を取得できません。", 101: "埋め込み再生が許可されていません。",
        150: "埋め込み再生が許可されていません。", 153: "再生元を確認できません。"};
      const message = reason[event.data] || "プレーヤーで再生できません。";
      status(message + "「YouTubeで見る」からも確認できます。");
      byId("expand").hidden = true;
      const direct = byId("watch").cloneNode(true);
      direct.removeAttribute("id");
      direct.className = "direct-view";
      direct.replaceChildren(node("span", "", message), node("strong", "", "YouTubeで見る ↗"));
      byId("stage").replaceChildren(direct);
      direct.focus({preventScroll: true});
    }
  }});
}
window.onYouTubeIframeAPIReady = observePlayer;
byId("expand").onclick = async () => {
  try { await byId("stage").requestFullscreen(); }
  catch { status("全画面を開けませんでした。プレーヤーの全画面ボタンもお試しください。"); }
};
function start(work) {
  const frame = node("iframe");
  frame.title = work.title + " — YouTubeプレーヤー";
  frame.allow = "autoplay; encrypted-media; fullscreen; picture-in-picture";
  frame.allowFullscreen = true;
  frame.referrerPolicy = "strict-origin-when-cross-origin";
  const url = new URL("https://www.youtube.com/embed/" + work.video);
  url.search = new URLSearchParams({playsinline: 1, autoplay: 1, enablejsapi: 1, origin: location.origin});
  frame.src = url;
  currentFrame = frame;
  byId("stage").replaceChildren(frame);
  byId("expand").hidden = !document.fullscreenEnabled;
  frame.focus();
  status("再生が始まらないときはプレーヤーの再生ボタン、または「YouTubeで見る」をお使いください。");
  if (window.YT?.Player) observePlayer();
  else if (!byId("yt-api")) {
    const api = node("script");
    api.id = "yt-api";
    api.src = "https://www.youtube.com/iframe_api";
    document.head.append(api);
  }
}
function route() {
  byId("expand").hidden = true;
  currentFrame = null;
  activePlayer?.destroy();
  activePlayer = null;
  byId("stage").replaceChildren();
  const work = works.find(w => "#" + w.version === location.hash);
  byId("screening").hidden = !work;
  byId("library").hidden = !!work;
  if (!work) {
    document.title = "Motion × Codex — Works Library";
    if (location.hash === "#collection") byId("collection").scrollIntoView();
    if (lastEntry?.isConnected) lastEntry.focus({preventScroll: true});
    return;
  }
  document.title = work.title + " — Works Library";
  byId("title").replaceChildren(...filmTitle(work,"span").childNodes);
  byId("detail-rating").replaceChildren(stars(work));
  byId("meta").textContent = [clock(work.seconds), work.version, work.series].join("　·　");
  byId("description").textContent = work.description;
  const watch = byId("watch");
  watch.hidden = !work.video;
  if (work.video) watch.href = "https://www.youtube.com/watch?v=" + work.video;
  else watch.removeAttribute("href");
  const play = node("button", "poster");
  play.type = "button";
  play.disabled = !work.video;
  play.setAttribute("aria-label", work.video ? work.title + "を再生" : "YouTube再生不可・投稿状況未確認");
  play.append(image(work), node("span", "play-label", work.video ? "▶　作品を再生" : "YouTube投稿状況　未確認"));
  if (work.video) play.onclick = () => start(work);
  byId("stage").append(play);
  status(work.video ? "音声付きの作品です。" : "対応するYouTube動画をまだ確認できていません。");
  window.scrollTo(0, 0);
  byId("title").focus({preventScroll: true});
  if (startOnOpen === work.version && work.video) start(work);
  startOnOpen = null;
}
window.addEventListener("hashchange", route);
route();
