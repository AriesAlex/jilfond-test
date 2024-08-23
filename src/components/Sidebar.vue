<template>
  <div id="sidebar">
    <h2>Поиск сотрудников</h2>

    <input
      type="text"
      class="search-input"
      placeholder="Введите id или имя"
      v-model="query"
    />

    <h2>Результаты</h2>

    <div class="no-query" v-if="!query">начните поиск</div>
    <div class="loading" v-else-if="isLoading"><Loading /></div>
    <div class="loading" v-else-if="error">
      <div>произошла ошибка:</div>
      <b>{{ error }}</b>
    </div>
    <div class="no-users" v-else-if="!users.length">ничего не найдено</div>
    <div class="users" v-else>
      <div
        class="user"
        v-for="user in users"
        :key="user.id"
        :class="{ selected: selectedUser && selectedUser.id == user.id }"
        @click="selectUser(user)"
      >
        <div class="avatar" />
        <div class="info">
          <div class="username">{{ user.username }}</div>
          <div class="email">{{ user.email }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Loading from '@/components/Loading.vue'

function debounce(func, wait) {
  let timeout

  return function (...args) {
    clearTimeout(timeout)

    timeout = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}

export default {
  components: { Loading },
  data() {
    return {
      query: '1,2,3',
    }
  },
  computed: {
    ...mapGetters(['users', 'isLoading', 'error', 'selectedUser']),
  },
  methods: {
    ...mapActions(['fetchUsers', 'clearUsers', 'selectUser']),
  },
  watch: {
    query: {
      handler: debounce(function (query) {
        this.fetchUsers(query)
      }, 300),
      immediate: true,
    },
  },
}
</script>

<style lang="scss" scoped>
#sidebar {
  width: 250px;
  background: #fdfdfd;
  border-right: 1px solid rgba(222, 222, 221, 1);
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid rgba(222, 222, 221, 1);
  }

  > h2 {
    all: unset;
    font-family: Montserrat;
    font-size: 16px;
    font-weight: 600;

    &:nth-of-type(2) {
      margin-top: 15px;
    }
  }

  > .search-input {
    all: unset;
    border: 1.5px solid rgba(233, 236, 239, 1);
    padding: 15px;
    border-radius: 8px;
    font-size: 14px;
    transition: 0.2s all;

    &:focus {
      border: 1.5px solid #007acc;
    }
  }

  > .no-query,
  > .no-users {
    font-size: 14px;
    font-weight: 400;
    color: rgba(118, 120, 125, 1);
  }

  > .loading {
    position: relative;
    margin-top: 30px;
  }

  > .users {
    display: flex;
    flex-direction: column;
    gap: 15px;

    > .user {
      border-radius: 10px;
      display: flex;
      align-items: center;
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      transition: 0.25s all;
      user-select: none;

      &:hover {
        background-color: rgb(247, 247, 247);
      }

      &.selected {
        background-color: rgba(224, 224, 224, 1);
        > .avatar {
          border: 1px solid rgba(224, 224, 224, 1);
        }
      }

      > .avatar {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        width: 70px;
        min-width: 70px;
        height: 70px;
        min-height: 70px;
        background-image: url(../assets/placeholder.png);
        background-position: center;
        background-size: cover;
        background-color: white;
        border: 1px solid transparent;
        border-right: 1px solid rgba(224, 224, 224, 1);
        transition: 0.25s all;
      }

      > .info {
        padding: 15px;
        overflow: hidden;
        mask-image: linear-gradient(to right, black, black 85%, transparent);
        transition: 0.25s all;

        > .username {
          font-size: 14px;
          font-weight: 600;
        }

        > .email {
          font-size: 14px;
          font-weight: 400;
        }
      }
    }
  }
}
</style>
