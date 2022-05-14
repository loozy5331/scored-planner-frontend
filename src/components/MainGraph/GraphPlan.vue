<template>
  <Bar
    v-if="loaded"
    :chart-data="chartData"
    :chart-options="chartOptions"
  />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  props:["pivot"],  
  data() {
    return {
      loaded: false, 
      chartData: null,
      chartOptions: {
        maintainAspectRatio: false,
        scales: {y: { min: 0, max: 10}}
      }
    }
  },
  methods: {
    getScoreColor(score) {
      if (score <= 3) {
        return "#4D96FF"
      } else if (score <= 5) {
        return "#6BCB77"
      } else if (score <= 7) {
        return "#FFD93D"
      } else {
        return "#FF6B6B"
      }
    },
    getChartData(rawData){
        if (this.pivot == "freq"){
            return this.getPlanPerFreq(rawData)
        } else { // ASC, DESC
            return this.setScorePerPlan(rawData)
        }
    },
    getPlanPerFreq(rawData) {
        // 자주 등장한 계획들 반환
        const labels = []
        const backgroundColors = []
        const data = []

        rawData.forEach((obj) => {
            labels.push(obj["key"])
            backgroundColors.push("#F1EEE9");
            data.push(obj["count"])
        })

        this.chartOptions = {}

        return {
            labels: labels, 
            datasets: [
                {
                label:`Freq per plan`, 
                backgroundColor: backgroundColors, 
                data: data}]
        }
    },
    setScorePerPlan(rawData) {
      const labels = []
      const backgroundColors = []
      const data = []

      rawData.forEach((obj) => {
        labels.push(obj["key"])
        backgroundColors.push(this.getScoreColor(obj["score"]))
        data.push(obj["score"])
      })

      return {
        labels: labels, 
        datasets: [
            {
              label:`Score per plan [${this.pivot}]`, 
              backgroundColor: backgroundColors, 
              data: data }]
      }
    }
  },
  async mounted() {
      this.loaded = false;
      await this.axios.get(`/api/graph/plan/${this.pivot}/${this.$store.state.username}`)
      .then((res) => {
          this.chartData = this.getChartData(res.data);
          this.loaded = true;
      }).catch((e) => {
        console.log(e);
      });
  }

}
</script>