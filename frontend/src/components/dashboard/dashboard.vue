<template>
  <nava :show-context="false" :show-selected="false"/>
  <div class="sub-nav">
    <select v-model="selectedCategory" @change="filterCards" id="selection">
      <option value="">All categories</option>
      <option value="Algorithm">Algorithm</option>
      <option value="Unsupervised">Unsupervised</option>
      <option value="Supervised">Supervised</option>
    </select>
  </div>
  <div ref="chartContainer" class="chart-container"></div>
  <el-table :data="tableData" stripe class="table">
    <el-table-column prop="ipAddress" label="IP Address"></el-table-column>
    <el-table-column prop="correctness" label="Correctness"></el-table-column>
    <el-table-column prop="topicCategory" label="Topic Category"></el-table-column>
    <el-table-column prop="contexts" label="Context"></el-table-column>
    <el-table-column prop="generateTime" label="Generate Time"></el-table-column>
    <el-table-column prop="submitTime" label="Submit Time"></el-table-column>
    <el-table-column prop="duration" label="Time Taken"></el-table-column>
  </el-table>
</template>

<script>
import * as echarts from 'echarts';
import logo from '@/assets/logo.svg';   // Import logo
import icon from '@/assets/user.svg';
import { ElTable, ElTableColumn } from 'element-plus';
import axios from 'axios';
import Nava from "@/components/nav.vue";
export default {
  name: 'LineChart',
  components: {
    ElTable,
    ElTableColumn,
    Nava,
  },
  data() {
    return {
      logo, // Bind logo to the data
      icon,
      tableData: [] // Initial empty array for table data
    };
  },
  mounted() {
    this.fetchTableData();
    this.initChart();
    window.addEventListener('resize', this.resizeChart); // Handle resizing of the chart when the window size changes
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.resizeChart);
  },
  methods: {
    async fetchTableData() {
      try {
        const response = await axios.get('http://localhost:8080/admin/all'); // Fetch data from the backend
        this.tableData = response.data; // Assign the retrieved data to tableData
        console.log('Table data:', this.tableData);
      } catch (error) {
        console.error('Error fetching table data:', error);
      }
    },
    initChart() {
      const chartDom = this.$refs.chartContainer;
      this.myChart = echarts.init(chartDom);

      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'cross' }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          name: 'Past 7 days',
          nameLocation: 'middle',
          nameGap: 30,
        },
        yAxis: {
          type: 'value',
          name: 'Number of attempts',
          nameGap: 30,
          fontSize: 12,
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
            lineStyle: { color: '#efa354' },
            itemStyle: { color: '#7e9aff' },
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
#selection {
  display: inline-block;
  justify-content: right;
  align-items: center;
  background-color: #e9e9e9;
  border-radius: 5px;
  border: 1px solid transparent;
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.3s ease;
}
#selection:after {
  border: 1px solid transparent;
}
#selection:hover {
  border: 1px solid transparent;
}
.chart-container {
  width: 100vw; /* 100% of the viewport width */
  height: 50vh; /* 50% of the viewport height */
  margin: 0 auto; /* Center the chart */
}
button {
  margin-left: 4%;
  align-content: center;
  width: 12%;
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
