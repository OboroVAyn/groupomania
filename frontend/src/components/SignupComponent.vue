<template>
  <form class="authform" @submit.prevent="signup">
    <div class="form-group">
      <div class="input-form">
        <label for="lastname">Lastname</label>
        <input
          type="text"
          id="lastname"
          @input="regexLastName()"
          v-model="formData.lastName"
          required
        />
        <p v-if="this.errorLastName">Le champ n'est pas conforme</p>
      </div>
    </div>
    <div class="form-group">
      <div class="input-form">
        <label for="firstname">Firstname</label>
        <input
          type="text"
          id="text"
          @input="regexFirstName()"
          v-model="formData.firstName"
          required
        />
      </div>
      <p v-if="this.errorFirstName">Le champ n'est pas conforme</p>
    </div>
    <div class="form-group">
      <div class="input-form">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          @input="regexEmail()"
          v-model="formData.email"
          required
        />
      </div>
      <p v-if="this.errorEmail">Le champ n'est pas conforme</p>
    </div>
    <div class="form-group">
      <div class="input-form">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          @input="regexPassword()"
          v-model="formData.password"
          required
        />
        <p v-if="this.errorPassword">Le champ n'est pas conforme</p>
      </div>
    </div>
    <button>SIGN UP</button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "signUp",
  data() {
    return {
      formData: {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
      },
      errorPassword: false,
      errorEmail: false,
      errorLastName: false,
      errorFirstName: false,
      errorMsg: "",
    };
  },
  methods: {
    //regex for lastname
    regexLastName() {
      let regexName = /(^[a-zA-Z][a-zA-Z\s-]{0,20}[a-zA-Z]$)/;
      let lastName = this.formData.lastName;
      if (!regexName.test(lastName)) {
        this.errorLastName = true;
      } else {
        this.errorLastName = false;
      }
    },
    //regex for firstname
    regexFirstName() {
      let regexName = /(^[a-zA-Z][a-zA-Z\s-]{0,20}[a-zA-Z]$)/;
      let firstName = this.formData.firstName;
      if (!regexName.test(firstName)) {
        this.errorFirstName = true;
      } else {
        this.errorFirstName = false;
      }
    },
    //regex for password
    regexPassword() {
      let regexPassword = /(^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$)/;
      let password = this.formData.password;
      if (!regexPassword.test(password)) {
        this.errorPassword = true;
      } else {
        this.errorPassword = false;
      }
    },
    //regex for email
    regexEmail() {
      let regexEmail = /^[\w-.]+@([\w-])+\.[\w-]{2,4}$/;
      let email = this.formData.email;
      if (!regexEmail.test(email)) {
        this.errorEmail = true;
      } else {
        this.errorEmail = false;
      }
    },
    // Sending formData to create a new user with axios.post if all regex are validated
    signup() {
      if (
        this.errorEmail == false &&
        this.errorFirstName == false &&
        this.errorLastName == false &&
        this.errorPassword == false
      ) {
        axios
          .post("http://localhost:3000/api/auth/signup", this.formData)
          .then(() => {
            this.$emit("switchTab", this.formData.email);
          })
          .catch(() => (this.errorMsg = "Veuillez remplir les champs"));
      } else {
        alert("Veuillez validé les champs");
      }
    },
  },
};
</script>
