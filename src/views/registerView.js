export default {
    template: `
      <div class="container">
        <form @submit.prevent="register">
          <h2>Регистрация</h2>
          <div class="flex-container">
            <input type="text" v-model="firstName" placeholder="Имя" required>
            <input type="tel" v-model="phone" placeholder="Мобильный телефон" required>
          </div>
          <div class="flex-container">
            <input type="text" v-model="lastName" placeholder="Фамилия" required>
            <input type="email" v-model="email" placeholder="E-mail" required>
          </div>
          <div class="flex-container">
            <input type="text" v-model="middleName" placeholder="Отчество">
            <input type="password" v-model="password" placeholder="Пароль" required>
          </div>
          <div class="flex-container">
            <input type="date" v-model="birthDate" placeholder="Дата рождения" required>
            <input type="password" v-model="confirmPassword" placeholder="Повторите пароль" required>
          </div>
          <button type="submit">Зарегистрироваться</button>
          <button type="button" @click="goToLogin">Войти</button>
        </form>
      </div>
    `,
    data() {
      return {
        firstName: '',
        lastName: '',
        middleName: '',
        phone: '',
        birthDate: '',
        email: '',
        password: '',
        confirmPassword: ''
      };
    },
    methods: {
      async register() {
        if (this.password !== this.confirmPassword) {
          alert('Пароли не совпадают');
          return;
        }
        try {
          const response = await fetch('/api/users/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              first_name: this.firstName,
              last_name: this.lastName,
              middle_name: this.middleName,
              phone: this.phone,
              birth_date: this.birthDate,
              email: this.email,
              password: this.password
            })
          });
          const data = await response.json();
          if (response.ok) {
            alert('Регистрация прошла успешно');
            this.$router.push('/login');
          } else {
            alert(data.message);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      },
      goToLogin() {
        this.$router.push('/login');
      }
    }
  };
  