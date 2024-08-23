<template>
  <Header />
  <main>
    <Sidebar />
    <Profile />
  </main>
</template>

<script>
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Profile from './components/Profile.vue'
export default {
  name: 'App',
  components: { Header, Sidebar, Profile },
}
</script>

<style lang="scss">
body {
  margin: 0;
}
#app {
  font-family: 'Montserrat', sans-serif;
  height: 100vh;
  padding: 50px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 25px;
  -webkit-tap-highlight-color: transparent;

  > main {
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    flex: 1;
    display: flex;
    justify-content: stretch;

    @media (max-width: 1200px) {
      flex-direction: column;
    }
  }
}
</style>
