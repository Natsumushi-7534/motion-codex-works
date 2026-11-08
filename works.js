const works = [
  {
    "id": "MC011",
    "version": "MC011-C01",
    "description": "海を進む架空の客船AURELIA。甲板を渡る風と波の響きが、船の大きさを伝える。",
    "series": "旅・風景",
    "seconds": 60,
    "video": "B2MxL2delxY",
    "thumbnail": "./images/aurelia.jpg",
    "featured": true,
    "japaneseTitle": "",
    "englishTitle": "AURELIA SOUND",
    "completion": {
      "day": "2026-10-16",
      "at": "2026-10-16T22:45+09:00"
    }
  },
  {
    "id": "MC005",
    "version": "MC005-r07",
    "description": "山岳の空から岩場へ。舞い降りたMJを、青いオーラが包む。",
    "series": "アクション",
    "seconds": 27.67,
    "video": "6F3ll2d8P6I",
    "thumbnail": "./images/mj.jpg",
    "featured": false,
    "japaneseTitle": "相棒MJの覚醒",
    "englishTitle": "MJ AWAKENING",
    "completion": {
      "day": "2026-10-11",
      "at": null
    }
  },
  {
    "id": "MC071",
    "version": "MC071-C16",
    "description": "水鳥がくちばしで一粒の星を拾う。水面の光はやがて、空を渡る星の川へ。",
    "series": "CG短編",
    "seconds": 96,
    "video": "nKhZ_kyRp60",
    "thumbnail": "./images/star.jpg",
    "featured": true,
    "japaneseTitle": "星を汲む鳥",
    "englishTitle": "THE STAR DIPPER",
    "completion": {
      "day": "2026-11-02",
      "at": null
    }
  },
  {
    "id": "MC072",
    "version": "MC072-r02",
    "description": "月球儀を囲む24体の兎。円盤が回ると、一羽の兎が同じ場所で駆けはじめる。",
    "series": "CG短編",
    "seconds": 72,
    "video": "5ugjJ9g48eM",
    "thumbnail": "./images/hour.jpg",
    "featured": false,
    "japaneseTitle": "時を駆ける兎",
    "englishTitle": "THE HOUR THAT RAN",
    "completion": {
      "day": "2026-11-02",
      "at": null
    }
  },
  {
    "id": "MC073",
    "version": "MC073-r01",
    "description": "瓶を透かした琥珀色の光。その奥に、小さな回廊と鏡池が浮かび上がる。",
    "series": "CG短編",
    "seconds": 72,
    "video": "UEbORGqeIhk",
    "thumbnail": "./images/glass.jpg",
    "featured": false,
    "japaneseTitle": "硝子の中庭",
    "englishTitle": "THE GLASS COURTYARD",
    "completion": {
      "day": "2026-11-02",
      "at": null
    }
  },
  {
    "id": "MC036",
    "version": "MC036-C05",
    "japaneseTitle": "光の彫刻",
    "englishTitle": "CHROMA",
    "description": "色の輪がほどけ、旋回し、再びひとつの彫刻へ。透明な層に光と色が重なる40秒の抽象映像。",
    "series": "抽象映像",
    "seconds": 40.0,
    "video": "mWYedpSXS50",
    "thumbnail": "./images/MC036-C05.jpg",
    "featured": false,
    "completion": {
      "day": "2026-10-23",
      "at": "2026-10-23T07:46+09:00"
    }
  },
  {
    "id": "MC049",
    "version": "MC049-C05",
    "japaneseTitle": "",
    "englishTitle": "A BREATH OF MATTER",
    "description": "55層の陶質の造形が、卵形からS字へと呼吸するように開いていく。わずかに遅れて動く一枚一枚の層が、静かなかたちに生命の気配を生み出す。",
    "series": "映像作品",
    "seconds": 30.0,
    "video": "TK82t-tBAI0",
    "thumbnail": "./images/MC049-C05-141fa363752f47c0.jpg",
    "featured": true,
    "completion": {
      "day": "2026-10-31",
      "at": null
    }
  },
  {
    "id": "MC077",
    "version": "MC077-C05",
    "japaneseTitle": "露の番人",
    "englishTitle": "THE DEW KEEPER",
    "description": "静かな池でハエを狙う蛙。頭にとまったハエは去り、空いた葉を見つめる蛙だけが残る。静と動、音と静寂、最後の5秒の余韻を描く。",
    "series": "映像作品",
    "seconds": 28.0,
    "video": "onXO24Y9mlg",
    "thumbnail": "./images/MC077-C05-43da3b698222d034.jpg",
    "featured": false,
    "completion": {
      "day": "2026-11-04",
      "at": null
    }
  },
  {
    "id": "MC066",
    "version": "MC066-C11",
    "japaneseTitle": "夜をひと巻き",
    "englishTitle": "ONE TURN OF NIGHT",
    "description": "円筒の陰刻が朱蝋の浮き彫りに残り、街の模様が夜蛾の翅になる。",
    "series": "映像作品",
    "seconds": 90.0,
    "video": "4_qXkEUsorU",
    "thumbnail": "./images/MC066-C11-f720a062f8d5c973.jpg",
    "featured": false,
    "completion": {
      "day": "2026-11-01",
      "at": null
    }
  }
];
const initialFeaturedVersions = ["MC011-C01", "MC049-C05", "MC071-C16"];
const initialFeaturedIds = works.filter(work => work.featured).map(work => work.id);
