# Tebak Masa

[![npm version](https://img.shields.io/npm/v/@ariya/tebakmasa)](https://www.npmjs.com/package/@ariya/tebakmasa)
[![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/@ariya/tebakmasa.svg)](https://bundlephobia.com/result?p=@ariya/tebakmasa)
[![GitHub license](https://img.shields.io/github/license/ariya/tebakmasa)](https://github.com/ariya/tebakmasa/blob/master/LICENSE)
[![Tests](https://github.com/ariya/tebakmasa/workflows/Tests/badge.svg)](https://github.com/ariya/tebakmasa/actions)


[Bahasa Indonesia](#indonesian) | [English](#english)

---

### <a name="indonesian"></a>Bahasa Indonesia

**Tebak Masa**: pustaka JavaScript untuk Node.js ([@ariya/tebakmasa](https://www.npmjs.com/package/@ariya/tebakmasa)) guna mengira tanggal dan waktu dari deskripsi umumnya dalam bahasa Indonesia.

Contoh:

```js
const tebakmasa = require('@ariya/tebakmasa');

tebakmasa('3 menit yang lalu');
tebakmasa('13:37 WIB');
tebakmasa('17 Agustus 2020 10:00');   // 1600311600028
tebakmasa('17/8/2020 10:00')
```

Nilai yang dikembalikan pemanggilan fungsi `tebakmasa` adalah _Unix epoch_, jumlah milidetik semenjak tengah malam tanggal 1 Januari 1970 UTC. Untuk rincinya, silakan merujuk ke dokumentasi JavaScript [tentang Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date).


---

### <a name="english"></a>English

**Tebak Masa**: a JavaScript library for Node.js ([@ariya/tebakmasa](https://www.npmjs.com/package/@ariya/tebakmasa)) to infer the date and time from the general description in Indonesian (_Bahasa Indonesia_).

Examples:
```js
const tebakmasa = require('@ariya/tebakmasa');

tebakmasa('3 menit yang lalu');
tebakmasa('13:37 WIB');
tebakmasa('17 Agustus 2020 10:00');   // 1600311600028
tebakmasa('17/8/2020 10:00')
```

The return value is _Unix epoch_, the number of milliseconds that have elapsed since midnight on January 1, 1970, UTC. For more details, refer to the documentation of [JavaScript Date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date).
