export default {
    template: `
      <section class="lk">
        <div class="container">
          <div class="profile-section" id="profileSection">
            <div class="auth-tabs">
              <button class="tab-button active" id="profileTab">Профиль</button>
              <button class="tab-button" id="ordersTab">Заказы</button>
            </div>
            <div class="content" id="profileContent">
              <form class="profile-form" @submit.prevent="updateProfile">
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
                  <input type="date" v-model="birthDate" placeholder="Дата рождения" required>
                </div>
                <button type="submit">Сохранить изменения</button>
              </form>
            </div>
            <div class="content" id="ordersContent" style="display: none;">
              <!-- Orders content here -->
            </div>
          </div>
        </div>
      </section>
    `,
    data() {
      return {
        firstName: '',
        lastName: '',
        middleName: '',
        phone: '',
        birthDate: '',
        email: ''
      };
    },
    async created() {
      try {
        const response = await fetch('/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        this.firstName = data.first_name;
        this.lastName = data.last_name;
        this.middleName = data.middle_name;
        this.phone = data.phone;
        this.birthDate = data.birth_date;
        this.email = data.email;
      } catch (error) {
        console.error('Error:', error);
      }
    },
    methods: {
      async updateProfile() {
        try {
          const response = await fetch('/api/users/profile', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
              first_name: this.firstName,
              last_name: this.lastName,
              middle_name: this.middleName,
              phone: this.phone,
              birth_date: this.birthDate,
              email: this.email
            })
          });
          const data = await response.json();
          if (response.ok) {
            alert('Профиль обновлен');
          } else {
            alert(data.message);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    }
  };
  