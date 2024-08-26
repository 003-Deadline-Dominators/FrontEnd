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

    mark() {
      this.attempts++;

      const rightZone = document.getElementById('right');
      const rightBlocks = rightZone.querySelectorAll('.code-block');

      if (rightBlocks.length !== this.blocks.length) {
        alert('False - Not all blocks are in the right zone');
        return;
      }

      for (let i = 0; i < this.blocks.length; i++) {
        const userBlock = rightBlocks[i].textContent.trim();
        const correctBlock = this.blocks[i].trim();

        if (userBlock !== correctBlock) {
          alert('False - Order is incorrect');
          return;
        }
      }

      const endTime = new Date();
      const timeElapsed = (endTime - this.startTime) / 1000; // Convert to seconds

      alert(`Correct - Order matches exactly\nTime taken: ${timeElapsed.toFixed(2)} seconds\nAttempts: ${this.attempts}`);

      this.startTime = null;
      this.attempts = 0;
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
        .get('http://localhost:8080/code')
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
            const colors = ['#007aff', '#06d6a0']; // Add more colors if needed

            codeBlocks.forEach((block, index) => {
              block.style.backgroundColor = colors[index % colors.length];
            });
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
  background-color: white;
  border-radius: 5px;
}

.drag-zone, .drop-zone {
  margin: 20px;
}

.code-block {
  padding: 10px;
  margin: 5px;
  background-color: #1e1e1e;
  color: white;
  border-radius: 5px;
  cursor: grab;
}
</style>
