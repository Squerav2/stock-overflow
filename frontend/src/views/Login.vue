<template>
  <div class="login-screen">
    <div class="login-container">
      <h1>Lütfen Giriş Yapın!</h1>
      <form @submit.prevent="login">
        <div class="form">
          <div class="input-container">
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="username" required>
          </div>
          <div class="input-container">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required>
          </div>
        </div>
        <button type="submit">Giriş Yap</button>
      </form>
      <router-link to="/register">Kayıt Ol</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(`http://localhost:3000/auth/login`, {
          username: this.username,
          password: this.password
        });

        // Check if the response data includes the necessary properties
        if (response.data && response.data.email && response.data.password) {
          console.log("Giriş başarılı!", response.data);
          this.$store.commit('LOGIN', response.data);
          console.log(this.$store.state.user);
          
          this.$router.push("/");
        } else {
          console.log("Giriş başarısız!");
        }
      } catch (error) {
        console.error('Giriş yapılırken hata oluştu:', error);
      }
    }
  }
};
</script>


<style scoped>
.login-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f8f9fa;
}

.login-container {
  width: 300px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.login-container h1 {
  margin-bottom: 20px;
  color: #6c757d;
}

.form {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.input-container label {
  margin-bottom: 10px;
  color: #6c757d;
}

.input-container input {
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background: #007bff;
  color: white;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background: #0056b3;
}

router-link {
  margin-top: 20px;
  color: #007bff;
  text-decoration: none;
}

router-link:hover {
  text-decoration: underline;
}
</style>