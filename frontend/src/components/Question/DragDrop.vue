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
        {{ item.content }}
      </div>
    </VueDraggable>
  </div>
  </div>
</template>

<script>
import { VueDraggable } from 'vue-draggable-plus';
import axios from 'axios';

export default {
  components: { VueDraggable },
  data() {
    return {
      list1: [],
      list2: [],
    };
  },
  methods: {
    onUpdate() {
      console.log('update');
      this.$emit('update:list2', this.list2);
    },
    onAdd() {
      console.log('add');
      this.$emit('update:list2', this.list2);
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
    rebuild(){
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
      axios.post('http://localhost:8080/submit', { list2: this.list2 })
          .then(response => {
            console.log('Data submitted successfully:', response.data);
            this.$emit('submitted-data', response.data);
          })
          .catch(error => {
            console.error('Error submitting data:', error);
            this.$emit('submitted-data', { error: error.response ? error.response.data : 'An error occurred' });
          });
    }
  },
  mounted() {
    axios
        .get('http://localhost:8080/code', {
          params: {
            variable1: this.$route.query.topicTitle,
            variable2: this.$route.query.contextTitle
          }
        })
        .then(response => {
          console.log(response.data);
          this.$emit('drag-drop-loaded');
          this.list1 = this.formatItems(response.data.code);
          this.list1 = this.shuffleArray(this.list1);
        })
        .catch(error => {
          console.error(error);
        });
  }
};
</script>

<style scoped>
.container {
  background-color: white;
}
.drag-title{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.flex-draggable-container {
  display: flex;
  flex-direction: row;
}
.drag-title{
  display: flex;
  flex-direction: row;
}

.draggable-list {
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 45%;
  height: auto;
  margin: 10px 0 20px 5px;
  border-radius: 0.5rem;
  overflow: auto;
  border: 2px dashed #bbbbbb;
}

.draggable-item {
  cursor: move;
  color: black;
  height: fit-content;
  background-color: #D8D8D8;
  border-radius: 0.5rem;
  padding: 0.75rem;
  margin: 5px;
  overflow-x: auto;
  transition: margin-left 0.3s ease;
  font-size: 16px;
}

#right{
  width: 50%;
  overflow-x: auto;
}

#drag {
  font-size: 20px;
  font-weight: bold;
  display: flex;
  height: fit-content;
  justify-content: center;
  width: 45%;
  padding: 10px;
  margin: 20px 0 0 5px;
  background-color: #d9ebff;
  color: #007aff;
  border-radius: 5px;
}

#drop {
  display: flex;
  height: fit-content;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
  margin: 20px 0 0 10px;
  width: 50%;
  background-color: #daf9f1;
  color: #06d49f;
  border-radius: 5px;
}
</style>

<style>
body{
  background-color: white;
}
</style>