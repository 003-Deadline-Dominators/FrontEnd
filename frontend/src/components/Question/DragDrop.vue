<template>
  <div class="container">
    <div class="drag-title">
      <h1 id="drag">Drag from here</h1>
      <h1 id="drop">Drop blocks here</h1>
    </div>
    <div class="flex-draggable-container">
      <VueDraggable
          class="draggable-list"
          v-model="list1"
          animation="150"
          ghostClass="ghost"
          group="people"
          @update="onUpdate"
          @add="onAdd"
          @remove="remove"
          id="left"
      >
        <div
            v-for="item in list1"
            :key="item.id"
            class="draggable-item"
            :style="{ marginLeft: `${item.position * 20}px` }"
            @click="cyclePosition(item)"
        >
          {{ item.content }}
        </div>
        <img :src="animation" alt="animation" class = "animation"/>
      </VueDraggable>
      <VueDraggable
          class="draggable-list"
          v-model="list2"
          animation="150"
          id="right"
          group="people"
          ghostClass="ghost"
          @update="onUpdate"
          @add="onAdd"
          @remove="remove"
      >
        <div
            v-for="item in list2"
            :key="item.id"
            class="draggable-item"
            :style="{ marginLeft: `${item.position * 40}px` }"
            @click="cyclePosition(item)"
        >
          <!-- Only show tooltip when list2 has exactly 1 item and tooltip hasn't been shown before -->
          <div class="tooltip" v-if="shouldShowTooltip">
            {{ item.content }}
            <span class="tooltiptext">single click to indent</span>
          </div>
          <div v-else>{{ item.content }}</div>
        </div>
      </VueDraggable>
    </div>
  </div>
</template>


<script>
import { VueDraggable } from 'vue-draggable-plus';
import axios from 'axios';
import animation from '@/assets/Topic/Context/Question/dragAni.svg';

export default {
  components: { VueDraggable },
  props: {
    problemData: {
      type: Object,  // or String, depending on the structure of the data
      required: true
    },
    showOverlay: {
      type: Boolean,
      default: false
    },
    problemSectionLoaded: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    // Watch for the problemSectionLoaded prop to change
    problemSectionLoaded(newVal) {
      if (newVal) {
        this.fetchCodeData();  // Fetch data after the problem section is loaded
      }
    }
  },
  data() {
    return {
      list1: [],
      list2: [],
      animation,
      showTooltip: false, // Control for showing the tooltip
      tooltipShown: localStorage.getItem('tooltipShown') === 'true',
    };
  },
  computed: {
    // Dynamically set maxHeight based on showOverlay prop
    shouldShowTooltip() {
      console.log(`update: status  = ${this.tooltipShown}`);
      return this.list2.length === 1 && !this.tooltipShown;
    }
  },
  methods: {
    fetchCodeData() {
      axios
          .get('http://localhost:8080/code')
          .then((response) => {
            console.log(response.data);
            this.$emit('drag-drop-loaded');
            this.$emit('data-define', response.data.data);
            this.list1 = this.formatItems(response.data.code);
            this.list1 = this.shuffleArray(this.list1);
          })
          .catch((error) => {
            console.error("Error fetching code data:", error);
          });
    },
    onUpdate() {
      console.log('update');
      this.$emit('update:list2', this.list2);
      this.checkTooltip();
      console.log(`update: status  = ${this.tooltipShown}`);
    },
    onAdd() {
      console.log('add');
      this.$emit('update:list2', this.list2);
      this.checkTooltip();
      console.log(`update: status  = ${this.tooltipShown}`);
    },
    remove() {
      console.log('remove');
    },
    cyclePosition(item) {
      item.position = (item.position + 1) % 4;
      this.$emit('update:list2', this.list2);
    },
    formatItems(items) {
      return items.map(item => ({
        id: item.id || Date.now() + Math.random(),
        content: item,
        position: 0
      }));
    },
    shuffleArray(array) {
      return array.sort(() => Math.random() - 0.5); // Simple shuffle
    },
    rebuild() {
      location.reload();
    },
    resetBlocks() {
      // Move all items from list2 back to list1
      this.list1.push(...this.list2);
      // Clear list2
      this.list2 = [];
      this.list1 = this.shuffleArray(this.list1);
    },
    submit() {
      const plainProblemData = JSON.stringify(this.problemData);
      const requestBodyData = JSON.stringify(this.list2);

      let formData = new FormData();
      formData.append('preDefine', plainProblemData);
      formData.append('requestBody', requestBodyData);

      // Send data to backend using axios
      axios.post('http://localhost:8080/submit', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
          .then(response => {
            console.log(response.data.stdout);
            console.log(response.data.stderr);
            this.$emit('submitted-data', response.data);
          })
          .catch(error => {
            console.error(error);
          });
    },
    checkTooltip() {
      if (this.list2.length === 1 && !this.tooltipShown) {
        setTimeout(() => {
          // Store that the tooltip has been shown after delay
          localStorage.setItem('tooltipShown', 'true');
          this.tooltipShown = true;
        }, 250000);  // Delay for 2 seconds (adjust the time as needed)
      }
    }
  },
  mounted() {
    if (this.problemSectionLoaded) {
      this.fetchCodeData();
    }
    this.tooltipShown = localStorage.getItem('tooltipShown') === 'true';
    console.log(`update: status  = ${this.tooltipShown}`);
  }
};
</script>

<style scoped>
.container {
  background-color: white;
  border-radius: 5px 5px 0 0;
}

.drag-title{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

}

.flex-draggable-container {
  display: flex;
  flex-direction: row;
  overflow: visible;
}

.draggable-list {
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 45%;
  min-height: 50vh;
  max-height: 50vh;
  overflow-y: auto !important;
  margin: 10px 0 20px 5px;
  border-radius: 0.5rem;
  border: 2px dashed #bbbbbb;
}

.draggable-item {
  cursor: move;
  color: black;
  background-color: #D8D8D8;
  height: fit-content;
  border-radius: 0.5rem;
  padding: 0.75rem;
  margin: 5px;
  transition: margin-left 0.3s ease;
  overflow: visible;
  font-size: 16px;
}

#left{
  padding-top: 30px;
}

#right {
  width: 50%;
  overflow-x: auto;
  min-height: 50.01vh;
  padding-top: 30px;
}

#drag, #drop {
  font-size: 20px;
  font-weight: bold;
  display: flex;
  height: fit-content;
  justify-content: center;
  padding: 10px;
  border-radius: 5px;
}

#drag {
  margin-left: 5px;
  width: 45.3%;
  background-color: #d9ebff;
  color: #007aff;
}

#drop {
  width: 50%;
  background-color: #daf9f1;
  color: #06d49f;
  margin-left: 5px;
}

svg{
  width: 10px;
}

.animation{
  display: flex;
  margin-top: auto;
  margin-left: auto;
  width: 200px;
}

::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  border-radius: 0.5rem;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #B9B9B9AB;
  max-height: 10px;
  border-radius: 0.5rem;
  height: 20px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #bbbbbb;
}
.tooltip {
  position: relative;
  display: inline-block;
  overflow-y: visible !important;
}

.tooltip .tooltiptext {
  visibility: visible;
  background-color: #96EA63;
  color: #6e6e6e;
  text-align: center;
  border-radius: 15px;
  padding: 6px 16px;
  position: absolute;
  z-index: 1;
  bottom: 200%;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  opacity: 1;
  transition: opacity 0.3s;
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #96EA63 transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}

</style>


