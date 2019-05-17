<template>
  <div
    class="date-pickers"
    v-clickoutside="handleClose"
  >
    <Input
      v-model="selectDay"
      type="text"
      readonly
      icon="ios-calendar-outline"  
      @on-focus="trueDateBox"
    />

    <transition name="fade">
      <div
        class="date-box"
        v-if="dateBoxFlag"
      >
        <div class="day-header">
          <div>

            <Icon
              type="ios-arrow-back"
              @click.stop="goPrevMon"
            />
            <span>{{month}}</span>

            <Icon
              type="ios-arrow-forward"
              @click.stop="goNextMon"
            />

          </div>
          <div>
            {{year}}-{{month}}
          </div>
          <div>
            <Icon
              type="ios-arrow-back"
              @click.stop="goPrevYear"
            />
            <span>{{year}}</span>
            <Icon
              type="ios-arrow-forward"
              @click.stop="goNextYear"
            />

          </div>

        </div>
        <div class="full-calendar-body">
          <div class="weeks">
            <strong
              class="week"
              v-for="dayIndex in 7"
            >{{ (dayIndex - 1) | localeWeekDay(firstDay, locale) }}</strong>
          </div>
          <div class="dates">
            <div
              class="week-row"
              v-for="week in currentDates"
            >
              <div
                class="day-cell"
                v-for="day in week"
                :class="{'today': day.isToday, 'not-cur-month':!day.isCurMonth,'selected':day.isSelected}"
                @click.stop="dayClick(day.date)"
              >

                {{day.monthDay}}

              </div>
            </div>
          </div>

          <div class="other-btns">
            <div
              class="today"
              @click="today(todayDate)"
            >
              今天
            </div>
            <div
              v-if="isShowUKBtn"
              @click="setUKdate(monthUK)"
            >
              {{monthUK}}
            </div>
            <div
              v-if="isShowUKBtn"
              @click="setUKdate(dayUK)"
            >
              {{dayUK}}
            </div>
            <div
              class="close"
              @click="handleClose"
            >
              确定
            </div>

          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import moment from "moment";
import dateFunc from "common/js/dateFunc";
//
const clickoutside = {
  // 初始化指令
  bind(el, binding, vnode) {
    function documentHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false;
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e);
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.vueClickOutside = documentHandler;
    document.addEventListener("click", documentHandler);
  },
  update() {},
  unbind(el, binding) {
    // 解除事件监听
    document.removeEventListener("click", el.vueClickOutside);
    delete el.vueClickOutside;
  }
};
export default {
  name: "datePickers",
  props: {
    dataLimit: {
      type: String,
      default: "CCYYMMDD" //CCYYMMDD CCYYUKUK
    },
    dateValue: {
      type: String,
     
    }
  },
  data() {
    return {
      dateBoxFlag: false,
      selectDay: this.dateValue,
      todayDate: moment(),
      // panelDate: this.dateValue?this.dateValue:moment(),
      firstDay: 0,
      panelDate: this.panelBaseDate
    };
  },
  directives: { clickoutside },
  computed: {
    locale() {
      //语言
      return this.$store.state.caseData.locale;
    },
    panelBaseDate() {
      if (this.dateValue) {
        let _y = this.dateValue.slice(0, 4);
        let _m = this.dateValue.slice(4, 6);
        _m = _m == "UK" ? "01" : _m;
        let _d = this.dateValue.slice(6, 8);
        _d = _d == "UK" ? "01" : _d;
        let _date = `${_y}${_m}${_d}`;
        return moment(_date);
      } else {
        return moment();
      }
    },

    currentDates() {
      return this.getCalendar();
    },
    year() {
      return moment(this.panelDate).format("YYYY");
    },
    month() {
      return moment(this.panelDate).format("MM");
    },
    dateTitle() {
      return moment(this.panelDate).format("YYYY MM");
    },
    monthUK() {
      return `${this.year}UKUK`;
    },
    dayUK() {
      return `${this.year}${this.month}UK`;
    },
    isShowUKBtn() {
      return this.dataLimit == "CCYYUKUK";
    }
  },
  watch: {},
  methods: {
    // 显示日期盒子并初始化
    trueDateBox() {
      this.dateBoxFlag = true;
    },
    //关闭盒子
    handleClose(e) {
      this.dateBoxFlag = false;

    },
    // 选择日期
    dayClick(day) {
      this.selectDay = moment(day).format("YYYYMMDD");
      if (!this.isShowUKBtn) {
        this.dateBoxFlag = false;
        this.$emit("setDateValue",this.selectDay)
      }
    },
    //今天
    today(day) {
      this.panelDate = day;
      this.selectDay = moment(day).format("YYYYMMDD");
      this.dateBoxFlag = false;
      this.$emit("setDateValue",this.selectDay)
    },
    setUKdate(day) {
      this.selectDay = day;
      this.dateBoxFlag = false;
      this.$emit("setDateValue",this.selectDay)
    },
    goPrevMon() {
      let newDate = moment(this.panelDate)
        .subtract(1, "months")
        .startOf("month");
      this.panelDate = newDate;
    },
    goNextMon() {
      let newDate = moment(this.panelDate)
        .add(1, "months")
        .startOf("month");
      this.panelDate = newDate;
    },
    goPrevYear() {
      let newDate = moment(this.panelDate).subtract(1, "years");
      this.panelDate = newDate;
    },
    goNextYear() {
      let newDate = moment(this.panelDate).add(1, "years");
      this.panelDate = newDate;
    },
    getCalendar() {
      // calculate 2d-array of each month
      let monthViewStartDate = dateFunc.getMonthViewStartDate(
        this.panelDate,
        this.firstDay
      );
      let calendar = [];
      for (let perWeek = 0; perWeek < 6; perWeek++) {
        let week = [];
        for (let perDay = 0; perDay < 7; perDay++) {
          let dayFormat = moment(monthViewStartDate).format("YYYY-MM-DD");
          week.push({
            monthDay: monthViewStartDate.date(),
            isToday: monthViewStartDate.isSame(moment(), "day"),
            isCurMonth: monthViewStartDate.isSame(this.panelDate, "month"),
            isSelected: monthViewStartDate.isSame(this.selectDay, "day"),
            date: moment(monthViewStartDate)
          });
          monthViewStartDate.add(1, "day");
        }
        calendar.push(week);
      }
      return calendar;
    },
    
  },
  filters: {
    localeWeekDay(weekday, firstDay, locale) {
      firstDay = parseInt(firstDay);
      const localMoment = moment().locale(locale);
      return localMoment.localeData().weekdaysMin()[(weekday + firstDay) % 7];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../common/css/variable";

$cell-width: 24px;
$date-box-width: ($cell-width + 4px) * 7 +4px;

.date-pickers {
  width: 100%;
  position: relative;
  font-size: 12px;
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s;
  }
  .fade-enter,
  .fade-leave-active {
    opacity: 0;
    transform: translateY(-10px);
  }
  .date-box {
    width: $date-box-width;
    border: 1px solid #eaeaea;
    border-radius: 5px;
    box-shadow: 2px 2px 2px #eee;
    background: white;
    position: absolute;
    top: 35px;
    left: 0px;
    z-index: 99;
  }
}
.day-header {
  display: flex;
  justify-content: space-between;
  height: 32px;
  line-height: 32px;
  text-align: center;
  border-bottom: 1px solid #e8eaec;
  font-size: 12px;
  padding: 0 5px;
  > div {
    display: flex;
    align-items: center;
    cursor: pointer;
    span {
      padding: 0 5px;
    }
  }
}
.full-calendar-body {
  padding: 0 2px;
  .weeks {
    display: flex;
    color: #c5c8ce;
    .week {
      width: $cell-width;
      height: $cell-width;
      line-height: $cell-width;
      margin: 2px;
      text-align: center;
    }
  }
  .dates {
    .week-row {
      display: flex;
      .day-cell {
        width: $cell-width;
        height: $cell-width;
        line-height: $cell-width;
        position: relative;
        text-align: center;
        cursor: pointer;
        border-radius: 3px;
        margin: 2px;
        transition: all 0.5s linear;
        border: 1px solid transparent;
        &:hover {
          background-color: rgba(64, 199, 133, 0.2);
        }
        &.today {
          // box-shadow: inset 0 0 0 1px $color-theme;
          &:after {
            content: "";
            display: block;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background-color: $color-theme;
            position: absolute;
            top: 1px;
            right: 1px;
          }
        }
        &.not-cur-month {
          color: #c5c8ce;
        }
        &.selected {
          border: 1px solid $color-theme;
        }
      }
    }
  }
  .other-btns {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    border-top: 1px solid #eaeaea;
    margin: 5px 0 0 0;
    padding: 4px 0;

    > div {
      border: 1px solid #eaeaea;
      height: 24px;
      line-height: 24px;
      padding: 2px;
      border-radius: 2px;
      cursor: pointer;
    }
  }
}
</style>
