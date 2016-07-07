"use strict";

module.exports = {
    isItAlmostWeekend: function(user) {
        var today = new Date();
        var isWeekend = (today.getDay() === 0) || (today.getDay() === 6);

        if (!isWeekend) {
            let weekendOffset = 6 - today.getDay();

            if (weekendOffset === 5) {
                return `Nee <@${user}>.... het is nog lang geen weekend.`;
            } else if (weekendOffset > 1) {
                return `Nee <@${user}>, nog ${weekendOffset} dagen tot het weekend!`;
            } else {
                return 'HET IS BIJNA WEEEKEEEEEEEEEND!';
            }

        } else {
            return 'Het is al weekend, laat me met rust!';
        }

    }
};
