<template>
    <div class="nav">
      <div class="original-nav">
        <img :src="logo" alt="Logo" width="300" height="150">
        <button id="start">Module</button>
      </div>
      <div class="image-input-container">
        <img :src="icon" @click="toggleInput"
             alt="Clickable image"
             style="cursor: pointer;" class="clickable-image">
        <input
            v-if="showInput"
            v-model="inputValue"
            type="text"
            placeholder="Enter text here"
            class="input-field"
        />
      </div>
    </div>
  <div ref="chartContainer" class="chart-container"></div>
  <el-table :data="tableData" stripe class="table">
    <el-table-column prop="userId" label="User ID" align="center"></el-table-column>
    <el-table-column prop="topic" label="Topic" align="center"></el-table-column>
    <el-table-column prop="context" label="Context" align="center"></el-table-column>
    <el-table-column prop="timestamp" label="Timestamp" align="center"></el-table-column>
    <el-table-column prop="timeTaken" label="Time Taken" align="center"></el-table-column>
    <el-table-column prop="correctness" label="Correctness" align="center"></el-table-column>
  </el-table>
</template>

<script>
import * as echarts from 'echarts';
import logo from '@/assets/logo.svg';   // Import logo
import icon from '@/assets/Topic/user.svg';
import { ElTable, ElTableColumn } from 'element-plus';
export default {
  name: 'LineChart',
  components: {
    ElTable,
    ElTableColumn
  },
  data() {
    return {
      logo, // Bind logo to the data
      icon,
      tableData: [
        {
          userId: 'U123',
          topic: 'Machine Learning',
          context: 'Supervised Learning',
          timestamp: '2024-09-10 12:30:45',
          timeTaken: '5 mins',
          correctness: '80%'
        },
        {
          userId: 'U124',
          topic: 'Data Science',
          context: 'Exploratory Data Analysis',
          timestamp: '2024-09-10 12:45:12',
          timeTaken: '8 mins',
          correctness: '90%'
        },
        // Add more rows as needed
      ]
    };
  },
  mounted() {
    this.initChart();
    window.addEventListener('resize', this.resizeChart); // To handle resizing the chart when the window size changes
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.resizeChart);
  },
  methods: {
    initChart() {
      const chartDom = this.$refs.chartContainer;
      this.myChart = echarts.init(chartDom);

      const option = {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {
              color: {
                type: 'linear', // Type of gradient: 'linear', 'radial'
                x: 0, y: 0, x2: 0, y2: 1, // Gradient direction (x, y, x2, y2 define start and end points)
                colorStops: [
                  { offset: 0, color: '#b8f5aa' }, // Start color
                  { offset: 1, color: 'white' }  // End color
                ]
              }
            },
            lineStyle: {color: '#efa354'},
            itemStyle: {color: '#7e9aff'},
          },
        ],
      };

      this.myChart.setOption(option);
    },
    resizeChart() {
      if (this.myChart) {
        this.myChart.resize(); // Resize the chart when window size changes
      }
    },
  },
};
</script>

<style scoped>
.chart-container {
  width: 100vw; /* 90% of the viewport width */
  height: 50vh; /* 60% of the viewport height */
  margin: 0 auto; /* Center the chart */
}
.original-nav{
  display: flex;
  justify-content: space-between;
  background-color: white;
  align-items: center;
}
.image-input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.clickable-image {
  cursor: pointer;
  max-width: 100%;
  height: auto;
}

.input-field {
  margin-top: 10px;
  padding: 5px;
  width: 100%;
  max-width: 300px;
}
button{
  margin-left: 14%;
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
}
.table {
  width: 100%;
  margin: 0 auto;
  font-size: 18px;
}
/* Deep selector to ensure stripes appear even with scoped styles */
:deep(.el-table__row:nth-child(odd)) {
  background-color: #f1f7ef;
}

:deep(.el-table__row:nth-child(even)) {
  background-color: #fff;
}

:deep(.el-table__cell) {
  text-align: center;
  vertical-align: middle !important;
  padding: 20px;
}
/* Target each cell for extra padding and alignment */
</style>
