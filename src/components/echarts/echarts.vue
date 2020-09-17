<template>
  <div
    ref="echart"
    :style="style"
  ></div>
</template>

<script>
import echarts from 'echarts'
import ipxyEcharts from './ipxy_echarts';

export default {
  name: 'BaseEchart',

  props: {
    height: {
      type: String,
      default: '500px'
    },
    isInit: Boolean,
    cfg: Object
  },

  components: {},

  data() {
    return {
      myChart: null
    };
  },

  watch: {
    isInit(val) {
      val && this.setOpt();
      !val && this.myChart.showLoading();
    }
  },

  computed: {
    style() {
      return {
        width: '100%',
        height: this.height
      };
    }
  },

  mounted() {
    this.initEchart();
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.sycnScreen);
  },

  methods: {
    initEchart() {
      echarts.registerTheme('ipxy_echarts', ipxyEcharts);
      this.myChart = echarts.init(this.$refs.echart, 'ipxy_echarts');
      this.handleEvent();
      this.resize();
      this.myChart.showLoading();
    },
    setOpt() {
      this.myChart.hideLoading();
      this.myChart.setOption(this.cfg);
      this.sycnScreen();
    },
    sycnScreen() {
      this.myChart.resize({
        width: null,
        height: null,
        silent: true
      });
    },
    resize() {
      window.addEventListener('resize', this.sycnScreen);
    },
    handleEvent() {
      [
        'click',
        'mouseover',
        'mouseout',
        'legendselectchanged'
      ].forEach(event => {
        this.myChart.on(event, params => {
          this.$emit(`item-${event}`, params);
        });
      })
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
