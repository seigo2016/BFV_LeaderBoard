<template>
 <div>
    <h1>{{ title }} </h1>
    <form class="form" @submit.prevent="search_name">
      <input v-model="search" placeholder="chalacter name">
      <button type="submit">Search</button>
    </form>
    <div class="body">
    <card name="Kill" :value="kill"></card>
    <card name="Death" :value="death"></card>
    <card name="Kill Ratio" :value="kd"></card>
    </div>
    <line-chart id="chart" class="chart" :chart-data="chartData" :options="chartOptions"></line-chart>
  </div>
</template>

<script>
import Card from "./Card.vue";
import LineChart from '../chart.js'
export default {
  components:{
    LineChart,
    Card
  },
  name: 'Top',
  mounted(){
    this.token = process.env.VUE_APP_TOKEN
  },
  data: function () {
    return {
      search: null,
      msg: 'BFV API Search',
      kill:  '',
      death: '',
      kd: '',
      spm: '',
      classesLabels: ['Assault', 'Medic', 'Recon', 'Support', 'Tanker', 'Pilot'],
      classesData: [null,null,null,null,null,null],
      chartData: null,
      chartOptions:{
        responsive: true,
        maintainAspectRatio: false
      },
      token: '',
    }
  },
  methods: {
    search_name: function (event) {
      event;
      let queries = {'TRN-Api-Key': this.token}
      this.axios.get('/' + this.search, {params: queries})
      .then(response => {
        let data = response.data.data.segments;
        let overview = data.find(data => data.type === 'overview').stats;
        let classes = data.filter(data => data.type === 'class');
        this.kill = overview.kills.displayValue;
        this.death = overview.deaths.displayValue;
        this.kd = overview.kdRatio.displayValue;
        this.spm = overview.scorePerMinute.displayValue;
        for(let i=0; i<this.classesLabels.length; i++){
          let classInfo = classes.find(classes => classes.attributes.class === this.classesLabels[i].toLowerCase());
          this.classesData[i] = classInfo.stats.timePlayed.value / 3600;
        }
        this.chartData = {
          labels: this.classesLabels,
          datasets: [
            {
              label: 'Classes',
              data: this.classesData
            }
          ]
        }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.form{
  padding: 20px;
}
.body{
  margin-right: auto;
  margin-left: auto;
  width: 95%;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
}
.chart{
  max-height: 70%;
}
</style>
