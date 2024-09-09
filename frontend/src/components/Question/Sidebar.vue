<template>
  <div class="sidebar">
    <h2>Logo</h2>
    <button class="menu">Topics</button>
    <button class="menu">contexts</button>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
};
</script>

<style scoped>
.sidebar {
  width: 12%;
  padding: 1%;
  background-color: white;
}

.menu {
  background-color: white;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  border: none;
  padding: 10px;
  border-radius: 5px;
  text-align: left;
}

.menu:hover {
  background-color: #96ea63;
  transition: ease-in 0.5s;
}
</style>
