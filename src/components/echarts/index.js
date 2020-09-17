import Echarts from './echarts.vue';

Echarts.install = Vue => {
  Vue.component(Echarts.name, Echarts);
};

export default Echarts;
