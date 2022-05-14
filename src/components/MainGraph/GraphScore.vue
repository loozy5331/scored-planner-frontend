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
    getRawLabels(){
        /* 
            pivot에 따라 필요한 label들을 반환
        */
        const labels = [];
        var LIMIT = 0;

        if (this.pivot == 'month'){ LIMIT = 12} 
        else if (this.pivot == 'day'){ LIMIT = 31} 
        else if (this.pivot == 'week') { LIMIT = 7}

        for(let i=1; i <= LIMIT; i+=1) {
            labels.push(i)
        }

        return labels
    },
    getLabel(key) {
        /* 
            pivot에 따라 key를 변환하여 반환
        */
        if (this.pivot == 'month'){
            return `${key}월`
        } else if (this.pivot == 'day'){
            return `${key}일`
        } else if (this.pivot == 'week') {
            const weeks = ["일", "월", "화", "수", "목", "금", "토"];
            return `${weeks[key-1]}요일`
        }

        console.log(`[ERROR] pivot(${this.pivot}) is not valid`)
    },
    setDefaultValue(rawData) {
      const chartData = rawData;
      const defaultScore = 0;
      const rawLabels = this.getRawLabels()

      const labels = []
      const backgroundColors = []
      const data = []

      rawLabels.forEach((rawLabel) => {
        labels.push(this.getLabel(rawLabel))

        if (rawLabel in chartData) {
          backgroundColors.push(this.getScoreColor(chartData[rawLabel]))
          data.push(chartData[rawLabel])
        } else {
          backgroundColors.push(this.getScoreColor(defaultScore))
          data.push(defaultScore)
        }
      })


      return {
        labels: labels, 
        datasets: 
          [
            {
              label:`Score per ${this.pivot}`, 
              backgroundColor: backgroundColors, 
              data: data}
          ]
      }
    }
  },
  async mounted() {
      this.loaded = false;
      await this.axios.get(`/api/graph/${this.pivot}/${this.$store.state.username}`)
      .then((res) => {
        //   console.log(res);
          this.chartData = this.setDefaultValue(res.data);
          this.loaded = true;
      }).catch((e) => {
        console.log(e);
      });
  }

}
</script>