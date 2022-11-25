<template>
  <div>
    <canvas height="125" id="chart"></canvas>
  </div>
</template>

<script setup>
import { onMounted, toRefs } from 'vue';
import { Chart, registerables } from 'chart.js';
import { getWeekdaysFromToday } from '../helpers';

const props = defineProps({
  daysData: Array,
});

const { daysData } = toRefs(props)

Chart.register(...registerables);

let chart = ref({});

onMounted(() => {
  const days = getWeekdaysFromToday();

  chart.value = new Chart('chart', {
    type: 'line',
    data: {
      labels: days,
      datasets: [{
        data: daysData.value,
        borderColor: '#9FE271',
        tension: 0.3,
        fill: true,
        pointHitRadius: 10
      }]
    },
    options: {
      plugins: {
        legend: {
          display: false
        }
      }
    }
  })
})
</script>