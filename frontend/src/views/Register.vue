
<template>
    <div class="register-container">
      <h1 class="register-title">Giriş Yapmak Için Lütfen Kaydolun!</h1>
      <div class="form-container">
        <div class="form-group">
          <label for="email">E-mail:</label>
          <input type="email" id="email" v-model="email" />
        </div>
        <div class="form-group">
          <label for="name">Isim:</label>
          <input type="text" id="name" v-model="name" />
        </div>
        <div class="form-group">
          <label for="surname">Soyisim:</label>
          <input type="text" id="surname" v-model="surname" />
        </div>
        <div class="form-group">
          <label for="password">Sifre:</label>
          <input type="password" id="password" v-model="password" />
        </div>
        <div class="form-group">
          <label for="confirm-password">Sifre Tekrar:</label>
          <input type="password" id="confirm-password" v-model="confirmPassword" />
        </div>
        <div>
          <router-link to="/"><button @click="register">Kaydol</button></router-link>
          
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';

  export default {
    data() {
      return {
        email: '',
        name: '',
        surname: '',
        password: '',
        confirmPassword: ''
      };
    },
    methods: {
      register() {
        axios.post(`http://localhost:8081/odev/kullanici/register`, {
          "email": this.email,
          "ad": this.name,
          "soyad": this.surname,
          "sifre": this.password,
          }).then(response => {
            if(response.data.email == this.email){
              alert("Kayıt başarılı!");
              this.$router.push("/");
            }else{
              alert("Bu e-mail adresi zaten kayıtlı!");
            }
      })},
    }
  };
  </script>
  
  <style scoped>
  .register-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin-left: 30%;
  }
  
  .register-title {
    font-size: 24px;
    margin-bottom: 50px;
  }
  
  .form-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  
  label {
    font-weight: bold;
  }
  
  input {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  
  </style>
  