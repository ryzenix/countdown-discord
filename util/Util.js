const moment = require('moment');
require('moment-duration-format');

module.exports = class Util {
    static formatDuration(duration) {
        return moment.duration(duration).format("d[d] h[h] m[m]")
    }
}