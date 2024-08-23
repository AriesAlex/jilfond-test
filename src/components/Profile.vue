<template>
  <div class="no-profile" v-if="!selectedUser">
    Выберите сотрудника, чтобы посмотреть его профиль
  </div>
  <div class="profile" v-else>
    <div class="avatar" />
    <div class="info">
      <div>
        <b>{{ selectedUser.name }}</b>
      </div>
      <small><b>email:</b> {{ selectedUser.email }}</small>
      <small><b>phone:</b> {{ selectedUser.phone }}</small>

      <div class="about-title"><b>О себе</b></div>
      <div class="about">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['selectedUser']),
  },
}
</script>

<style lang="scss" scoped>
.profile {
  flex: 1;
  display: flex;
  padding: 30px;
  gap: 60px;
  justify-content: space-between;

  @media (max-width: 1200px) {
    flex-direction: column;
  }

  > .avatar {
    border: 1px solid rgba(224, 224, 224, 1);
    background-image: url(../assets/placeholder.png);
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 300px;
  }

  > .info {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-weight: 400;
    color: rgba(118, 120, 125, 1);

    small {
      font-size: 14px;
    }

    > .about-title,
    b {
      color: black;
    }
    > .about-title {
      margin: 20px 0;
    }
    > .about {
      font-size: 14px;
    }
  }
}
.no-profile {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  padding: 15px;
  text-align: center;
}
</style>
