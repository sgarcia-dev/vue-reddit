<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
  background-color: #fafafa;
}

* {
  box-sizing: border-box;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

a {
  font-weight: bold;
  color: #ff6f00;
  transition: color 0.2s;
  text-decoration: none;
  &:hover {
    color: #f57c00;
  }

  &.router-link-exact-active {
    color: #ffa737;
  }
}
</style>
