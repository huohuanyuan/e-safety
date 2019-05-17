/*
 * @Author: chengshanshan 
 * @Date: 2018-07-04 16:16:33 
 * @Last Modified by: chengshanshan
 * @Last Modified time: 2019-04-04 15:41:18
 */

import moment from 'moment';
let dateFunc = {
    /**
     * 计算月历的第一天日期
     * @param { Date } date 日期
     * @param { Number } firstDay 日历第一列，0表示星期日
     * @return 月历第一天的日期
     */
    getMonthViewStartDate(date, firstDay) {
        firstDay = parseInt(firstDay);
        let start = moment(date);
        let startOfMonth = moment(start.startOf('month'));

        start.subtract(startOfMonth.day(), 'days');

        if (startOfMonth.day() < firstDay) {
            start.subtract(7, 'days');
        }
        start.add(firstDay, 'days');
        return start;
    },
    /**
     * 计算月历的最后一天日期
     * @param { Date } date 日期
     * @param { Number } firstDay 日历第一列，0表示星期日
     * @return 月历最后一天的日期
     * 
     */
    getMonthViewEndDate(date, firstDay) {
       
        return this.getMonthViewStartDate(date, firstDay).add(6, 'weeks');
    }
};

export default dateFunc;