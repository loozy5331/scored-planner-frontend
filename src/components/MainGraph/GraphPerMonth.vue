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
      const chartData = rawData;
      const labels = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]
      const backgroundColors = []
      const data = []

      labels.forEach((label) => {
        if (label in chartData) {
          backgroundColors.push(this.getScoreColor(chartData[label]))
          data.push(chartData[label])
        } else {
          backgroundColors.push(this.getScoreColor(0))
          data.push(0)
        }
      })

      return {
        labels: labels, 
        datasets: 
          [
            {
              label:"월 별 평균 점수", 
              backgroundColor: backgroundColors, 
              data: data}
          ]
      }
    }
  },
  async mounted() {
      this.loaded = false;

      await this.axios.get(`/api/graph/${this.$store.state.username}`)
      .then((res) => {
          console.log(res);
          this.chartData = this.setDefaultValue(res.data);
          this.loaded = true;
      }).catch((e) => {
        console.log(e);
      });
  }

}
</script>