function findMonth(monthName) {
    const MONTH_NAMES_ID = [
        'januari',
        'februari',
        'maret',
        'april',
        'mei',
        'juni',
        'juli',
        'agustus',
        'september',
        'oktober',
        'november',
        'desember'
    ];
    const MONTH_NAMES_EN = [
        'january',
        'february',
        'march',
        'april',
        'may',
        'june',
        'july',
        'august',
        'september',
        'october',
        'november',
        'december'
    ];

    const name = monthName;
    let index = MONTH_NAMES_ID.indexOf(name);
    if (index >= 0) return index;
    index = MONTH_NAMES_EN.indexOf(name);
    if (index >= 0) return index;
    let match = -1;
    MONTH_NAMES_ID.forEach((m) => {
        const sub = m.substr(0, name.length);
        if (sub === name.toLowerCase()) match = findMonth(m);
    });
    if (match < 0) {
        MONTH_NAMES_EN.forEach((m) => {
            const sub = m.substr(0, name.length);
            if (sub === name.toLowerCase()) match = findMonth(m);
        });
    }
    return match;
}

function tebakmasa(masa, options) {
    if (!masa) return null;

    const ref = options && options.ref ? options.ref : Date.now();

    const segments = masa.split(' ').map((segment) => segment.toLowerCase());
    let state = {
        number: null,
        date: null,
        month: null,
        year: null,
        hours: null,
        minutes: null,
        seconds: null,
        unit: null,
        relative: null,
        tzOffset: 7
    };
    segments.forEach((segment) => {
        if (segment.trim().length === 0) return;
        const asNumber = parseInt(segment, 10);
        if ('detik menit jam hari'.indexOf(segment) >= 0) {
            state.unit = segment;
        } else if ('lalu lampau'.indexOf(segment) >= 0) {
            let anchor = ref;
            if (state.unit === 'detik') {
                anchor -= state.number * 1000;
            } else if (state.unit === 'menit') {
                anchor -= state.number * 60 * 1000;
            } else if (state.unit === 'jam') {
                anchor -= state.number * 60 * 60 * 1000;
            } else if (state.unit === 'hari') {
                anchor -= state.number * 24 * 60 * 60 * 1000;
            } else if (typeof state.unit === 'string' && state.unit.length > 0) {
                throw new Error('Unknown time unit ' + state.unit);
            } else {
                // ignore
            }
            if (anchor !== ref) {
                state.relative = anchor;
            }
        } else if (segment === 'wita') {
            state.tzOffset = 8;
        } else if (segment === 'wit') {
            state.tzOffset = 9;
        } else if (segment.indexOf(':') > 0) {
            const parts = segment.split(':');
            state.hours = parseInt(parts[0], 10);
            state.minutes = parseInt(parts[1], 10);
            state.seconds = parts.length > 2 ? parseInt(parts[2], 10) : 0;
        } else if (segment.indexOf('/') > 0) {
            const parts = segment.split('/');
            if (parts.length === 3) {
                state.date = parseInt(parts[0], 10);
                state.month = parseInt(parts[1], 10) - 1;
                state.year = parseInt(parts[2], 10);
            }
        } else if (Number.isNaN(asNumber)) {
            const m = findMonth(segment);
            if (m >= 0) {
                state.month = m;
            }
        } else {
            state.number = asNumber;
            if (asNumber > 1900) {
                state.year = asNumber;
            } else if (asNumber >= 1 && asNumber <= 31) {
                state.date = asNumber;
            }
        }
    });

    if (state.relative !== null) {
        return state.relative;
    }
    const hasCompleteDate = state.date != null && state.month != null && state.year != null;
    const hasNoDateAtAll = state.date === null && state.month === null && state.year === null;
    if (hasCompleteDate || hasNoDateAtAll) {
        const tzShift = state.tzOffset * 60 * 60 * 1000;
        let dateTime = new Date(ref + tzShift);
        if (hasCompleteDate) {
            dateTime.setUTCDate(state.date);
            dateTime.setUTCMonth(state.month);
            dateTime.setUTCFullYear(state.year);
        }
        dateTime.setUTCHours(state.hours);
        dateTime.setUTCMinutes(state.minutes);
        dateTime.setUTCSeconds(state.seconds);
        return dateTime.valueOf() - tzShift;
    }

    return null;
}

module.exports = tebakmasa;
