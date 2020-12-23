<template>
  <div></div>
</template>

<script>
export default {
  props: ["info"],
  data() {
    return {
      form: {},
      formDefault: {
          
      },
    };
  },
  mounted() {
    this.form = JSON.parse(JSON.stringify(this.formDefault));
  },
};
</script>
<style scoped>
</style>