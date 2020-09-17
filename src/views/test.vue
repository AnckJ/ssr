<template>
  <div class="test">
    <div class="child">{{ text }}</div>
    <p>名称：{{ user.name }}</p>
    <p>年龄：{{ user.age }}</p>
    <p>性别：{{ user.sex }}</p>
    <button @click="changeUser">change</button>

    <Echarts
      :cfg="echartsConfig"
      :is-init="isInitEcharts"
    ></Echarts>
  </div>
</template>

<script type="text/ecmascript-6">
import Echarts from '@/components/echarts/echarts'

export default {
  name: 'Test',

  components: {
    Echarts
  },

  data() {
    return {
      text: 'abc',
      echartsConfig: {
        title: {
          text: '',
          x: 'center',
          top: 10,
          textStyle: {
            fontSize: 15
          }
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b} 团队<br/> 数量：{c} (个)'
        },
        grid: {
          top: '75px',
          left: '84px',
          right: '4%',
          bottom: '8%',
          containLabel: false
        },
        yAxis: [{
          type: 'value',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        }],
        xAxis: [{
          type: 'category',
          name: '',
          axisLabel: {
            interval: 0,
            formatter(value) {
              if (value.length > 6) {
                return `${value.slice(0, 6)}...`;
              }
              return value;
            },
            color: '#333'
          },
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          },
          boundaryGap: true,
          axisTick: {
            alignWithLabel: true
          },
          data: ['team1', 'team2', 'team3']
        }],
        series: {
          name: '',
          type: 'bar',
          barWidth: 20,
          data: [10, 20, 30]
        }
      },
      isInitEcharts: false
    };
  },

  computed: {
    user() {
      return this.$store.getters.user
    }
  },

  methods: {
    changeUser() {
      this.$store.commit('SET_USER', {
        name: '小花',
        age: '16',
        sex: '女'
      })

      this.isInitEcharts = true
      def()
    }
  }
};
</script>

<style scoped lang="scss">
.test {
  width: 500px;
  height: 313px;
  margin: 0 auto;
  background-color: hotpink;
  border-radius: 10px;
  background-image: url('@/assets/imgs/2.jpg')
}
.child {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin: 0 auto;
  color: #fff;
  text-align: center;
  line-height: 200px;
  background-image: url('@/assets/imgs/3.jpg');
  background-size: 250px 208px;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
