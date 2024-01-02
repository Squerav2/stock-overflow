<template>
  <nav class="header">
    <div class="container">
      <div v-if="isLoggedIn">
        Welcome, {{ username }}
        <button @click="logout"><button class="login_button">Logout</button></button>
      </div>
      <div v-else>
        <router-link to="/login"> <button class="login_button">Giriş Yap</button> </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState(['user']),
    isLoggedIn() {
      return this.user !== null;
    },
    username() {
      return this.user ? this.user.name : '';
    }
  },
  methods: {
    ...mapMutations(['LOGOUT']),
    logout() {
      this.LOGOUT();
      this.$router.push('/');
    }
  }
};
</script>

<style lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #1E293B;
  padding: 10px 0;
  z-index: 0;
}

.container {
  display: flex;
  justify-content: flex-end;
  align-items: right;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  color: #ccc;
}

.search-box {
  margin-left: 30%;
}

.search-box input[type="text"] {
  padding: 6px 89px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-right: 8px;
}

 .login_button {
  background-color: #3c84f9;
  border: none;
  color: white;
  padding: 6px 12px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
}
</style>