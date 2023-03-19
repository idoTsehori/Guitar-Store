<template>
  <!-- <section class="header"> -->
  <!-- <h1 class="title">Toys Store🧸</h1>
    <AppNav /> -->
  <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    active-text-color="#905e1c">
    <!-- <el-menu-item index="2">Ido's Guitar Store</el-menu-item> -->
    <h1 class="title" index="2">Ido's Guitar Store🎸</h1>
    <el-menu-item index="3"><RouterLink to="/">Home</RouterLink></el-menu-item>
    <el-menu-item index="4"><RouterLink to="/guitar">Guitars</RouterLink></el-menu-item>
    <el-sub-menu index="5">
      <template #title>About</template>
      <el-menu-item index="5-1"><RouterLink to="/about">About me</RouterLink></el-menu-item>
      <el-menu-item index="5-2">Nothing</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="6"><RouterLink to="/chart">Chart</RouterLink></el-menu-item>
    <el-menu-item index="7"><RouterLink to="/map">Map</RouterLink></el-menu-item>
  </el-menu>
  <!-- </section> -->
</template>

<script>
import AppNav from './AppNav.vue'
export default {
  name: 'AppHeader',
  components: {
    AppNav,
  },
  // emits: ['handleSelect'],
}
</script>

<style></style>
