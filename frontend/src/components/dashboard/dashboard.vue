<template>
  <div class="container">
    <nava :show-context="false" :show-selected="false"/>
    <div class="chart-container">
      <div class="sub-nav">
        <h1>Answer in the last seven days</h1>
        <select v-model="selectedTopic" @change="filterCards" id="selection">
          <option value="">All topics</option>
          <option v-for="topic in topics" :key="topic.id" :value="topic.topicTitle">{{ topic.topicTitle }}</option>
        </select>
      </div>

      <!-- Chart container -->
      <div ref="chartContainer" class="chart-container"></div>
    </div>
    <!-- Table for displaying data -->
    <el-table :data="tableData" stripe class="table">
      <el-table-column prop="ipAddress" label="IP Address"></el-table-column>
      <el-table-column prop="correctness" label="Correctness"></el-table-column>
      <el-table-column prop="topicCategory" label="Topic Category"></el-table-column>
      <el-table-column prop="contexts" label="Context"></el-table-column>

      <!-- Formatted timestamps -->
      <el-table-column>
        <template #header>
          <div>
            Generate Time<br>
            <span style="font-size: 12px; color: #888;">AEST (UTC+10)</span>
          </div>
        </template>
        <template #default="scope">
          <div>
            <span v-html="formatTimestamp(scope.row.generateTime).split(' ')[0]"></span><br>
            <span v-html="formatTimestamp(scope.row.generateTime).split(' ')[1]"></span>
          </div>
        </template>
      </el-table-column>
      <el-table-column>
        <template #header>
          <div>
            submit Time<br>
            <span style="font-size: 12px; color: #888;">AEST (UTC+10)</span>
          </div>
        </template>
        <template #default="scope">
          <div>
            <span v-html="formatTimestamp(scope.row.submitTime).split(' ')[0]"></span><br>
            <span v-html="formatTimestamp(scope.row.submitTime).split(' ')[1]"></span>
          </div>
        </template>
      </el-table-column>
      <el-table-column>
        <template #header>
          <div>
            Time Taken<br>
            <span style="font-size: 12px; color: #888;">(hr:min:sec)</span>
          </div>
        </template>
        <template #default="scope">
          <span>{{ scope.row.duration }}</span> <!-- Display duration as is -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import logo from '@/assets/logo.svg';
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
      logo,
      icon,
      selectedTopic: '', // Ensure this is initialized properly
      topics: [],
      tableData: [],
      chartData: [],
    };
  },
  async created() {
    await this.fetchTopics();
  },
  mounted() {
    this.fetchTableData().then(() => {
      this.initChart();
    });
    window.addEventListener('resize', this.resizeChart);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.resizeChart);
  },
  methods: {
    async fetchTopics() {
      try {
        const response = await axios.get('http://localhost:8080/topics/all');
        this.topics = response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to load data. Please try again later.");
      }
    },
    async fetchTableData() {
      try {
        const response = await axios.get('http://localhost:8080/admin/all');
        this.tableData = response.data;
        console.log('Table data:', this.tableData);
      } catch (error) {
        console.error('Error fetching table data:', error);
      }
    },
    async fetchChartData() {
      try {
        const response = await axios.get(`http://localhost:8080/admin/selectNumberOfQuestions`);
        this.chartData = response.data;
        console.log(this.chartData)
        this.updateChart();
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    },
    async fetchChartDataFromTopic() {
      try {
        const response = await axios.get(`http://localhost:8080/admin/selectNumberOfQuestions/${this.selectedTopic}`);
        this.chartData = response.data;
        console.log(this.chartData)
        this.updateChart();
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    },
    filterCards() {
      console.log(this.selectedTopic);
      if (this.selectedTopic === '' || this.selectedTopic === 'All topics') {
        this.fetchChartData();
      } else {
        this.fetchChartDataFromTopic();
      }
    },
    initChart() {
      const chartDom = this.$refs.chartContainer;
      this.myChart = echarts.init(chartDom);
      this.fetchChartData();
    },
    updateChart() {
      const days = [];
      const options = { timeZone: 'Australia/Sydney', year: 'numeric', month: 'short', day: 'numeric' };
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        days.push(date.toLocaleDateString('en-AU', options));
      }

      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'cross' }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: days,
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
            data: this.chartData,
            type: 'line',
            areaStyle: {
              color: {
                type: 'linear',
                x: 0, y: 0, x2: 0, y2: 1,
                colorStops: [
                  { offset: 0, color: '#b8f5aa' },
                  { offset: 1, color: 'white' }
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
        this.myChart.resize();
      }
    },
    formatTimestamp(timestamp) {
      if (!timestamp) return '';
      const date = new Date(timestamp);
      const options = {timeZone: 'Australia/Sydney', hour12: false};
      const formattedDate = date.toLocaleDateString('en-AU', options);
      const formattedTime = date.toLocaleTimeString('en-AU', options);
      return `${formattedDate}<br>${formattedTime}`;
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.chart-container {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 50vh;
  background-color: white;
  margin-top: 10px;
  border-radius: 10px;
}
.sub-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 80px;
  margin-right: 80px;
  font-size: 10px;
  background-color: white;
}
#selection {
  margin-top: 30px;
  display: inline-block;
  overflow-x: hidden;
  background-color: #e9e9e9;
  border-radius: 5px;
  border: 1px solid transparent;
  font-size: 20px;
  cursor: pointer;
  transition: transform 0.3s ease;
  padding: 10px;
  width: 150px;
}
.table {
  width: 100%;
  font-size: 18px;
  margin-top: 30px;
  background-color: white;
}
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
</style>

<style>
body {
  background-color: #F6F6F6 !important;
}
</style>