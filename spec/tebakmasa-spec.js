const tebakmasa = require('../');

describe('tebakmasa', function () {
    it('should return null for an empty input', function () {
        expect(tebakmasa(null)).toEqual(null);
        expect(tebakmasa('')).toEqual(null);
    });

    it('should handle relative reference', function () {
        const opt = { ref: 60 * 60 * 1000 };
        expect(tebakmasa('1 detik lalu', opt)).toEqual((3600 - 1) * 1000);
        expect(tebakmasa('1 menit lalu', opt)).toEqual(59 * 60 * 1000);
        expect(tebakmasa('1 jam lalu', opt)).toEqual(0);
    });

    it('should ignore extra words', function () {
        const opt = { ref: 60 * 60 * 1000 };
        expect(tebakmasa('Diterbitkan di Bandung 1 menit lalu', opt)).toEqual(59 * 60 * 1000);
    });

    it('should handle absolute time reference with the default timezone', function () {
        const opt = { ref: 1587847080000 };
        expect(new Date(opt.ref).toUTCString()).toEqual('Sat, 25 Apr 2020 20:38:00 GMT');
        expect(new Date(tebakmasa('13:37', opt)).toUTCString()).toEqual('Sun, 26 Apr 2020 06:37:00 GMT');
    });

    it('should handle absolute time reference with an explicit timezone', function () {
        const opt = { ref: 1587847080000 };
        expect(new Date(opt.ref).toUTCString()).toEqual('Sat, 25 Apr 2020 20:38:00 GMT');
        expect(new Date(tebakmasa('13:37  WIB', opt)).toUTCString()).toEqual('Sun, 26 Apr 2020 06:37:00 GMT');
        expect(new Date(tebakmasa('13:37 WITA', opt)).toUTCString()).toEqual('Sun, 26 Apr 2020 05:37:00 GMT');
        expect(new Date(tebakmasa('13:37   WIT', opt)).toUTCString()).toEqual('Sun, 26 Apr 2020 04:37:00 GMT');
    });

    it('should handle absolute time reference in details', function () {
        const opt = { ref: 1587847080000 };
        expect(new Date(opt.ref).toUTCString()).toEqual('Sat, 25 Apr 2020 20:38:00 GMT');
        expect(new Date(tebakmasa('13:37:01', opt)).toUTCString()).toEqual('Sun, 26 Apr 2020 06:37:01 GMT');
    });

    it('should handle absolute date time reference with the default timezone', function () {
        const opt = { ref: 0 };
        expect(new Date(tebakmasa('28/4/2021 4:56 WIB', opt)).toUTCString()).toEqual('Tue, 27 Apr 2021 21:56:00 GMT');
    });

    it('should handle absolute date time reference with an explicit timezone', function () {
        const opt = { ref: 0 };
        expect(new Date(tebakmasa('28/4/2021 4:56 WIB', opt)).toUTCString()).toEqual('Tue, 27 Apr 2021 21:56:00 GMT');
        expect(new Date(tebakmasa('28/4/2021 4:56  WITA', opt)).toUTCString()).toEqual('Tue, 27 Apr 2021 20:56:00 GMT');
        expect(new Date(tebakmasa('28/4/2021 4:56   WIT', opt)).toUTCString()).toEqual('Tue, 27 Apr 2021 19:56:00 GMT');
    });

    it('should handle spaced datestamp numbers with the default timezone', function () {
        const opt = { ref: 0 };
        expect(new Date(tebakmasa('28 4 2021 4:56', opt)).toUTCString()).toEqual('Tue, 27 Apr 2021 21:56:00 GMT');
    });

    it('should handle month names', function () {
        const opt = { ref: 123456789 };
        expect(new Date(tebakmasa('14 Mar 2020 13:37', opt)).toUTCString()).toEqual('Sat, 14 Mar 2020 06:37:00 GMT');
    });

    it('should handle abbreviated English month name', function () {
        const opt = { ref: 123456789 };
        expect(new Date(tebakmasa('27 Oct 2021 13:37', opt)).toUTCString()).toEqual('Wed, 27 Oct 2021 06:37:00 GMT');
    });

    it('should ignore day-of-the-week', function () {
        const opt = { ref: 0 };
        expect(new Date(tebakmasa('Sabtu 16 Mei 2020 12:34', opt)).toUTCString()).toEqual(
            'Sat, 16 May 2020 05:34:00 GMT'
        );
    });
});
