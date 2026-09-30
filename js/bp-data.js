/* ベンチプレス プログラムメーカー: 設定値（研究の数字とメニューの組み方） */
(function (root) {
  'use strict';
  const BP = root.BP = root.BP || {};

  BP.DATA = {
    mainName: 'ベンチプレス',
    mainShort: 'ベンチプレス',
    weekOptions: [4, 6, 8, 10, 12],
    defaultWeeks: 8,
    maxFreq: 4,
    step: 2.5,
    bar: 20,
    plates: [20, 15, 10, 5, 2.5, 1.25],

    // 伸びの見込み（1週あたり、始めのMAXに対する%）。
    // ベンチプレス伸び計算機の男性の幅の、体重比0.9倍・1.2倍・1.5倍の値。
    levels: {
      beginner: { name: '初心者', low: 1.5, high: 3.0, heavySets: 3 },
      intermediate: { name: '中級者', low: 0.6, high: 1.5, heavySets: 3 },
      advanced: { name: '上級者', low: 0.4, high: 1.2, heavySets: 4 }
    },
    // 体重比の区切り（女性は男性の値 × 0.69）
    levelCut: { male: [1.0, 1.3], female: [0.7, 0.9] },
    fullRateWeeks: 8,
    lateFactor: 0.5,

    goals: {
      strength: {
        name: 'MAXを伸ばす',
        ending: 'test',
        heavySetsAdd: 0,
        accessoryCount: 2,
        accessorySets: 3,
        accessoryRir: 'あと2〜3回',
        phases: [
          { key: 'base', name: '基礎', share: 0.4, heavy: { reps: [6], rir: [3, 2] }, volume: { reps: [9], rir: [3, 2], sets: 3 }, note: '6回で、フォームを固めながら量をこなす段階です。' },
          { key: 'strength', name: '筋力', share: 0.35, heavy: { reps: [4], rir: [2, 1] }, volume: { reps: [7], rir: [3, 2], sets: 3 }, note: '4回で、MAXの80%を超える重さに慣れる段階です。' },
          { key: 'peak', name: '仕上げ', heavy: { reps: [3, 2], rir: [2, 1] }, volume: { reps: [5], rir: [3, 2], sets: 2 }, note: '3回と2回で、MAXに近い重さに体を慣らす段階です。' }
        ]
      },
      hypertrophy: {
        name: '胸を大きくする',
        ending: 'reps',
        heavySetsAdd: 1,
        accessoryCount: 3,
        accessorySets: 3,
        accessoryRir: 'あと1〜2回',
        phases: [
          { key: 'h1', name: '慣らし', share: 0.35, heavy: { reps: [12], rir: [3, 2] }, volume: { reps: [15], rir: [3, 2], sets: 3 }, note: '12回で、筋肉が大きくなる刺激に体を慣らす段階です。' },
          { key: 'h2', name: '積み上げ', share: 0.35, heavy: { reps: [10], rir: [2, 1] }, volume: { reps: [12], rir: [2, 1], sets: 4 }, note: '10回で、セット数を増やして量を積み上げる段階です。' },
          { key: 'h3', name: '追い込み', heavy: { reps: [8], rir: [1, 1] }, volume: { reps: [10], rir: [1, 1], sets: 4 }, note: '8回で、限界の近くまで行う段階です。' }
        ]
      },
      both: {
        name: '両方（MAXと胸の大きさ）',
        ending: 'test',
        heavySetsAdd: 0,
        accessoryCount: 3,
        accessorySets: 3,
        accessoryRir: 'あと1〜2回',
        phases: [
          { key: 'base', name: '基礎', share: 0.4, heavy: { reps: [6], rir: [3, 2] }, volume: { reps: [10], rir: [2, 2], sets: 3 }, note: '重い日は6回、回数の日は10回で、量を積み上げる段階です。' },
          { key: 'strength', name: '筋力', share: 0.35, heavy: { reps: [5], rir: [2, 1] }, volume: { reps: [10], rir: [2, 1], sets: 4 }, note: '重い日は5回で重さに慣れ、回数の日で胸を大きくします。' },
          { key: 'peak', name: '仕上げ', heavy: { reps: [3], rir: [2, 1] }, volume: { reps: [8], rir: [2, 2], sets: 3 }, note: '重い日は3回で、MAXに近い重さに体を慣らす段階です。' }
        ]
      }
    },

    dayPlan: {
      1: ['heavy'],
      2: ['heavy', 'volume'],
      3: ['heavy', 'light', 'volume'],
      4: ['heavy', 'light', 'volume', 'medium']
    },
    // 胸を大きくする目的では、軽い日のかわりに中くらいの日を先に入れる
    dayPlanOverride: {
      hypertrophy: {
        3: ['heavy', 'medium', 'volume'],
        4: ['heavy', 'medium', 'volume', 'light']
      }
    },
    dayTypes: {
      heavy: { name: '重い日', rest: '3〜4分' },
      light: { name: '軽い日', rest: '2分', rirAdd: 5, sets: 2 },
      medium: { name: '中くらいの日', rest: '2〜3分', rirAdd: 2, sets: 3 },
      volume: { name: '回数の日', rest: '2〜3分' }
    },
    maxMainSets: 5,

    // 苦手に合わせた種目（研究で効果が確かめられた方法ではなく、指導の現場でよく使われる方法）。
    // factor は、ベンチプレスのMAXに対するその種目のMAXの目安。
    weakPoints: {
      none: { name: '特になし・わからない', variation: null },
      bottom: {
        name: '胸の近くで止まる',
        variation: { id: 'pause', name: 'ポーズベンチプレス', factor: 0.93, reps: 3, rir: 3, sets: 3, cue: '胸にバーをつけて1〜2秒止めてから挙げます。反動を使わずに挙げる練習です。' }
      },
      top: {
        name: '腕を伸ばしきる手前で止まる',
        variation: { id: 'close', name: 'ナローグリップベンチプレス', factor: 0.92, reps: 5, rir: 3, sets: 3, cue: '手幅を肩幅くらいにして挙げます。二の腕の裏（上腕三頭筋）をよく使います。' }
      }
    },

    accessories: {
      db_row: { name: 'ダンベルロウ', reps: '8〜12回', target: '背中', cue: '片手と片ひざをベンチにつき、ひじを後ろに引きます。' },
      lat_pulldown: { name: 'ラットプルダウン', reps: '10〜12回', target: '背中', cue: '胸を張って、バーを鎖骨の近くまで引きます。' },
      incline_db: { name: 'インクラインダンベルプレス', reps: '8〜12回', target: '胸の上', cue: 'ベンチの角度は30度くらいにします。' },
      cable_fly: { name: 'ケーブルフライ', reps: '10〜15回', target: '胸', cue: 'ひじを軽く曲げたまま、腕を大きく開いてから閉じます。' },
      db_fly: { name: 'ダンベルフライ', reps: '10〜15回', target: '胸', cue: '胸が伸びるところまで腕を開きます。肩が痛む手前で止めます。' },
      cable_oh_ext: { name: 'ケーブルオーバーヘッドエクステンション', reps: '10〜15回', target: '二の腕の裏', cue: '腕を頭の上に上げたまま、ひじを曲げ伸ばしします。', long: true },
      db_oh_ext: { name: 'ダンベルオーバーヘッドエクステンション', reps: '10〜15回', target: '二の腕の裏', cue: 'ダンベルを両手で持ち、頭の後ろに下ろしてから伸ばします。', long: true },
      lateral: { name: 'サイドレイズ', reps: '12〜20回', target: '肩', cue: 'ダンベルを横に、肩の高さまで上げます。' },
      face_pull: { name: 'フェイスプル', reps: '12〜15回', target: '肩の後ろ・背中', cue: 'ロープを顔の高さに引き、ひじを外に開きます。' }
    },
    accPlan: {
      gym: {
        heavy: ['db_row', 'cable_oh_ext', 'lateral'],
        volume: ['incline_db', 'cable_fly', 'face_pull'],
        light: ['lat_pulldown', 'lateral', 'cable_oh_ext'],
        medium: ['incline_db', 'db_row', 'cable_fly']
      },
      rack: {
        heavy: ['db_row', 'db_oh_ext', 'lateral'],
        volume: ['incline_db', 'db_fly', 'db_row'],
        light: ['db_row', 'lateral', 'db_oh_ext'],
        medium: ['incline_db', 'db_fly', 'lateral']
      }
    },
    machines: ['lat_pulldown', 'cable_fly', 'cable_oh_ext', 'face_pull'],
    equipments: {
      gym: { name: 'ジム', hint: 'マシンやケーブルが使える' },
      rack: { name: 'ベンチとダンベルだけ', hint: '自宅やマシンのない場所' }
    },

    // 限界まで挙げられる回数と MAX に対する割合（Nuzzo 2024 のベンチプレスの表。1回は100%とする）
    repsCurve: [
      { reps: 1, pct: 100 },
      { reps: 2.59, pct: 95 },
      { reps: 4.11, pct: 90 },
      { reps: 6.23, pct: 85 },
      { reps: 8.82, pct: 80 },
      { reps: 11.51, pct: 75 },
      { reps: 14.08, pct: 70 },
      { reps: 16.59, pct: 65 },
      { reps: 19.34, pct: 60 },
      { reps: 22.79, pct: 55 },
      { reps: 27.25, pct: 50 }
    ],

    warmup: {
      normal: [{ pct: 0.4, reps: 5 }, { pct: 0.6, reps: 3 }, { pct: 0.8, reps: 2 }],
      light: [{ pct: 0.6, reps: 5 }],
      test: [{ pct: 0.5, reps: 5 }, { pct: 0.7, reps: 3 }, { pct: 0.8, reps: 2 }, { pct: 0.9, reps: 1 }]
    },
    checkPct: 0.8,
    minutes: { warmupSet: 1.5, heavy: 3.5, light: 2, medium: 3, volume: 3, variation: 3, accessory: 2, fixed: 5 }
  };
})(typeof window !== 'undefined' ? window : globalThis);
