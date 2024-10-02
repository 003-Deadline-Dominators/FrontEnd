<template>
  <div class="container">
    <nava :show-context="false" :show-selected="false"/>
    <div class="sub-nav">
      <h1>Answer in the last seven days</h1>
      <select v-model="selectedCategory" @change="filterCards" id="selection">
        <option value="">All topics</option>
        <option v-for="topic in topics" :key="topic.id" :value="topic.name">{{ topic.topicTitle }}</option>
      </select>
    </div>

    <!-- Chart container -->
    <div ref="chartContainer" class="chart-container"></div>

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
      tableData: [], // Initial empty array for table data
      selectedCategory: '',
      topics: [], // Add this property to store the topics
    };
  },
  async created() {
    await this.fetchTopics(); // Fetch topics when the component is created
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
    async fetchTopics() {
      try {
        const response = await axios.get('http://localhost:8080/topics/all');
        this.topics = response.data; // Assuming the response data contains an array of topics
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to load data. Please try again later.");
      }
    },
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
    // Helper method to format timestamp
    formatTimestamp(timestamp) {
      if (!timestamp) return '';
      const date = new Date(timestamp);
      const options = {timeZone: 'Australia/Sydney', hour12: false};
      const formattedDate = date.toLocaleDateString('en-AU', options); // Format date
      const formattedTime = date.toLocaleTimeString('en-AU', options); // Format time
      return `${formattedDate}<br>${formattedTime}`; // Combine with line break
    },
  },
};
</script>

<style scoped>
/* Ensure the main container stacks elements vertically */
.container {
  display: flex;
  flex-direction: column;
  gap: 20px; /* Adds space between each block element */
}

/* .sub-nav should be properly spaced above the table */
.sub-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 80px;
  margin-right: 80px;
  font-size: 10px;
}

#selection {
  display: inline-block;
  justify-content: right;
  align-items: center;
  background-color: #e9e9e9;
  border-radius: 5px;
  border: 1px solid transparent;
  font-size: 20px;
  cursor: pointer;
  transition: transform 0.3s ease;
  padding: 10px;
}

.chart-container {
  width: 100vw;
  height: 50vh;
}

.table {
  width: 100%;
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
</style>
