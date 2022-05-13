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
  data() {
    return {
      loaded: false, 
      chartData: null,
      chartOptions: {
        maintainAspectRatio: false,
        scales: {
            y: {
                min: 0,
                max: 10,
            }
        }
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
    setDefaultValue(rawData) {
      const chartData = JSON.parse(rawData);
      const labels = []
      const backgroundColors = []
      const data = []

      console.log(chartData);
      for(var i=0; i<chartData["words"].length;i++){
          var word = chartData["words"][i]
          var score = chartData["scores"][i]
          labels.push(word);
          backgroundColors.push(this.getScoreColor(score));
          data.push(score);
      }

      return {
        labels: labels, 
        datasets: 
          [
            {
              label:"점수 하위 10개 단어", 
              backgroundColor: backgroundColors, 
              data: data}
          ]
      }
    }
  },
  async mounted() {
      this.loaded = false;

      await this.axios.get(`/api/graph/bottom10-words`)
      .then((res) => {
          this.chartData = this.setDefaultValue(res.data);
          this.loaded = true;
      });
  }

}
</script>