<template>
  <div class="login">
    <form action="">
      <label for="">名称：<input type="text" v-model="user.name"></label>
    </form>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Login',

  components: {},

  mixins: [],

  props: {},

  data() {
    return {
      user: {
        name: ''
      }
    };
  },

  methods: {
  },
};
</script>

<style scoped lang="scss">
</style>
