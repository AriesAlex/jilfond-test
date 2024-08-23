<template>
  <header>
    <h1>Жилфонд</h1>
    <span>Пользователь</span>
  </header>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 700px) {
    flex-direction: column;
  }

  > h1 {
    all: unset;
    font-size: 32px;
    font-weight: 700;
    color: rgba(227, 31, 36, 1);
  }
}
</style>
