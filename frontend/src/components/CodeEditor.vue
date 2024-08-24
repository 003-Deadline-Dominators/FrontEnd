<template>
  <div class="code-editor">
    <div class="sub-select">
      <button class="sub-button" v-for="btn in buttons" :key="btn.text">
        <img :src="btn.src" width="20" height="20" />
        {{ btn.text }}
      </button>
      <button class="sub-button-right">
        <img :src="expandIcon" width="20" height="20" />
      </button>
    </div>
    <pre class="code" v-pre>
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
public class SnakeGame {
  private static final int WIDTH = 20;
  private static final int HEIGHT = 20;
  private List&lt;Position&gt; snake;
  private Position food;
  private char direction = 'R'; // Right
}
    </pre>
  </div>
</template>

<script>
import feedbackIcon from '@/assets/feedback.svg';
import codeIcon from '@/assets/code.svg';
import expandIcon from '@/assets/expand.svg';

export default {
  data() {
    return {
      buttons: [
        { src: feedbackIcon, text: 'Feedback' },
        { src: codeIcon, text: 'Code' },
      ],
      expandIcon,
    };
  },
};
</script>

<style>
.code-editor {
  background-color: #1e1e1e;
  color: #ffffff;
  border-radius: 5px;
}

.sub-select {
  display: flex;
  flex-direction: row;
  padding: 5px;
  background-color: #30313d;
  border-radius: 5px;
}

.sub-button {
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px;
  font-size: 16px;
}

.sub-button-right {
  margin-left: auto;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 10px;
}

.code {
  padding: 15px;
  white-space: pre-wrap; /* Ensure the code block wraps */
}

img {
  width: 20px;
  height: 20px;
}
</style>
