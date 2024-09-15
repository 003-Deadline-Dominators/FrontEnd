<template>
  <div class="answer">
    <div class="drag-zone">
      <h4 class="drag-title">Drag from here</h4>
      <div id="left">
        <div class="code-block" v-for="block in shuffledBlocks" :key="block" draggable="true">{{ block }}</div>
      </div>
    </div>
    <div class="drop-zone">
      <h4 class="drop-title">Drop blocks here</h4>
      <div id="right"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      blocks: [],
      selectedBlock: null,
      startTime: null,
      attempts: 0,
    };
  },
  computed: {
    shuffledBlocks() {
      return this.shuffleArray([...this.blocks]);
    },
  },
  methods: {
    resetBlocks() {
      const leftZone = document.getElementById('left');
      const rightZone = document.getElementById('right');

      while (rightZone.firstChild) {
        leftZone.appendChild(rightZone.firstChild);
      }

      for (let i = leftZone.children.length; i >= 0; i--) {
        leftZone.appendChild(leftZone.children[Math.random() * i | 0]);
      }
    },

    startTimer() {
      if (!this.startTime) {
        this.startTime = new Date();
        this.attempts = 0;
      }
    },

    submit() {
      this.attempts++;

      const rightZone = document.getElementById('right');
      const rightBlocks = Array.from(rightZone.querySelectorAll('.code-block'));

      // Extract block content
      const blockContents = rightBlocks.map(block => block.textContent.trim());

      console.log("Sending blocks:", blockContents); // Log the blocks being sent

      // Post block contents as an object
      axios.post('http://localhost:8080/submit', { blocks: blockContents }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
          .then(response => {
            console.log('Server response:', response.data); // Handle server response
          })
          .catch(error => {
            console.error('Error submitting data:', error); // Handle error
          });
    },


    handleDragStart(event) {
      this.selectedBlock = event.target;
    },

    handleDrop(event, targetZone) {
      event.preventDefault();
      if (this.selectedBlock && targetZone) {
        targetZone.appendChild(this.selectedBlock);
        this.selectedBlock = null;  // Clear the selected block
      }
    },

    handleDragOver(event) {
      event.preventDefault();  // Prevent default to allow drop
    },

    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },

    rebuild(){
      location.reload();
    }

  },

  mounted() {
    axios
        .get('http://localhost:8080/code', { params: {  variable1: this.$route.query.topicTitle, variable2: this.$route.query.contextTitle } })
        .then(response => {
          console.log(response.data); // Check the structure here
          this.blocks = response.data.code; // Correct access to 'blocks'

          // Ensure blocks are rendered before setting up drag-and-drop and colors
          this.$nextTick(() => {
            const codeBlocks = document.querySelectorAll('.code-block');

            // Add drag event listeners for the blocks
            codeBlocks.forEach(block => {
              block.addEventListener('dragstart', this.handleDragStart);
            });

            // Add drop event listeners for both zones
            const leftZone = document.getElementById('left');
            const rightZone = document.getElementById('right');

            leftZone.addEventListener('dragover', this.handleDragOver);
            rightZone.addEventListener('dragover', this.handleDragOver);

            leftZone.addEventListener('drop', (event) => this.handleDrop(event, leftZone));
            rightZone.addEventListener('drop', (event) => this.handleDrop(event, rightZone));

            // Random color allocation for code blocks
          });
        })
        .catch(error => {
          console.log(error);
        });

    this.startTimer();
  }
};
</script>

<style scoped>
.answer {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  background-color: white;
  border-radius: 5px;
  width: 100%;
}

.drag-zone, .drop-zone {
  margin: 20px;
  width: 78%;
}

.code-block {
  padding: 10px;
  margin: 5px;
  background-color: #1e1e1e;
  color: white;
  border-radius: 5px;
  cursor: grab;
  width: 30%;
}

.answer {
  display: flex;
  flex-direction: row;
}

#left, #right {
  display: flex;
  flex-direction: column;
  min-height: 300px;
  margin: 20px;
  border: 2px dashed #bbbbbb;
  border-radius: 5px;
  padding: 10px;
}

.drag-title {
  font-size: 18px;
  font-weight: bold;
  padding: 4%;
  margin: 5%;
  background-color: #d9ebff;
  color: #007aff;
  border-radius: 5px;
}

.drop-title {
  font-size: 18px;
  font-weight: bold;
  padding: 4%;
  margin: 5%;
  background-color: #daf9f1;
  color: #06d49f;
  border-radius: 5px;
}

.code-block {
  margin-bottom: 1px;
  padding: 10px;
  color: black;
  background-color: #D8D8D8;
  font-weight: normal;
  cursor: grab;
  border-radius: 5px;
  font-size: 16px;
  width: 40%;
  overflow: auto;
}
</style>

<style>
body{
  background-color: white;
}
</style>