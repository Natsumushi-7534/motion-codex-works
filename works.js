const works = [
  {
    "id": "MC011",
    "version": "MC011-C01",
    "title": "AURELIA SOUND",
    "description": "海を進む架空の客船AURELIA。甲板を渡る風と波の響きが、船の大きさを伝える。",
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
  },
  {
    "id": "MC071",
    "version": "MC071-C16",
    "title": "星を汲む鳥｜THE STAR DIPPER",
    "description": "水鳥がくちばしで一粒の星を拾う。水面の光はやがて、空を渡る星の川へ。",
    "series": "CG短編",
    "rating": 5,
    "seconds": 96,
    "video": "nKhZ_kyRp60",
    "thumbnail": "./images/star.jpg",
    "featured": true
  },
  {
    "id": "MC072",
    "version": "MC072-r02",
    "title": "時を駆ける兎｜THE HOUR THAT RAN",
    "description": "月球儀を囲む24体の兎。円盤が回ると、一羽の兎が同じ場所で駆けはじめる。",
    "series": "CG短編",
    "rating": 5,
    "seconds": 72,
    "video": "5ugjJ9g48eM",
    "thumbnail": "./images/hour.jpg",
    "featured": true
  },
  {
    "id": "MC073",
    "version": "MC073-r01",
    "title": "硝子の中庭｜THE GLASS COURTYARD",
    "description": "瓶を透かした琥珀色の光。その奥に、小さな回廊と鏡池が浮かび上がる。",
    "series": "CG短編",
    "rating": 5,
    "seconds": 72,
    "video": "UEbORGqeIhk",
    "thumbnail": "./images/glass.jpg",
    "featured": true
  }
];
const initialFeaturedIds = works.filter(work => work.featured).map(work => work.id);
