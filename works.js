const works = [
  {
    "id": "MC011",
    "version": "MC011-C01",
    "title": "AURELIA SOUND",
    "description": "海を進む客船AURELIA。音楽と環境音に耳を澄ませながら、その甲板へ。",
    "series": "旅・風景",
    "rating": 5,
    "seconds": 60,
    "video": "B2MxL2delxY",
    "thumbnail": "./images/aurelia.jpg",
    "featured": true
  },
  {
    "id": "MC005",
    "version": "MC005-r07",
    "title": "MJ Awakening｜新たな力",
    "description": "山岳の空から岩場へ。舞い降りたMJを、青いオーラが包む。",
    "series": "アクション",
    "rating": null,
    "seconds": 27.67,
    "video": "6F3ll2d8P6I",
    "thumbnail": "./images/mj.jpg",
    "featured": true
  }
];
const initialFeaturedIds = works.filter(work => work.featured).map(work => work.id);
