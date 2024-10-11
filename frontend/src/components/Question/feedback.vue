<template>
  <div class="feedback">
    <div class="title">
      <img :src="review" alt="image button">
      <h3>Completion progress feedback</h3>
    <div class="content-wrapper">
      <div class="row">
        <H3>Timer:</H3>
        <p>5:00</p>
      </div>
      <div class="row">
        <H3>Answer Times</H3>
        <p>5:00</p>
      </div>
      <div class = "feedback-buttons">
        <button>Retry</button>
        <button>Next</button>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import review from '@/assets/Topic/Context/Question/review.svg';
export default {
  data() {
    return {
      review
    }
  }
}

</script>

<style scoped>
.feedback {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  padding: 100px;

}
.title {
  background-color: #F1FAF9;
  padding: 30px 80px;
  border-radius: 10px;
}

.title img{
  width: 240px;
  height: auto;
}

.feedback-buttons{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 24px;
  font-weight: bold;
}

.content-wrapper{
  background-color: white;
  margin-top: 10px;
  padding: 20px;
}

.row{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #F7F7F7;
  padding: 2px 10px;
  border-radius: 5px;
  margin-top: 10px;
}

.row h3{
  font-size: 18px;
  font-weight: normal;
  color: #666666;
}

.feedback-buttons{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 20px;
}

.feedback-buttons button{
  background-color: #68D2BF;
  color: black;
  border-style: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 20px;
}

</style>