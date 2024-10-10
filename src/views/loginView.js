export default {
    template: `
      <div class="container">
        <form @submit.prevent="login">
          <div>
            <label for="email">E-mail</label>
            <input type="email" v-model="email" required>
          </div>
          <div>
            <label for="password">Пароль</label>
            <input type="password" v-model="password" required>
          </div>
          <button type="submit">Войти</button>
          <button type="button" @click="goToRegister">Зарегистрироваться</button>
          <a href="staff-login.html" class="staff-login-link">Вход для персонала</a>
        </form>
      </div>
    `,
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      async login() {
        try {
          const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: this.email, password: this.password })
          });
          const data = await response.json();
          if (response.ok) {
            localStorage.setItem('token', data.token);
            this.$router.push('/profile');
          } else {
            alert(data.message);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      },
      goToRegister() {
        this.$router.push('/register');
      }
    }
  };
  