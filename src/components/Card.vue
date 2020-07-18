<template>
  <div class="card">
  <div class="card-content">
    <div class="card-title">{{ value }}</div>
    <div class="card-text">{{ name }}</div>
  </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    value: String
  }
};
</script>

<style scoped>
.card {
  float: left;
  display: grid;
  grid-row: auto;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px #ccc;
  margin: 10px;
}
.card-content {
  padding: 20px;
}
.card-title {
  font-size: 30px;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}
.card-text {
  color: #777;
  font-size: 20px;
  line-height: 1.5;
}
</style>