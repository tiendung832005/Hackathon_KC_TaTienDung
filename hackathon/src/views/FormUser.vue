<template>
    <div class="form-backdrop" v-if="isVisible">
      <div class="form-container">
        <h3>Add New User</h3>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="user.name" required />
          </div>
  
          <div class="form-group">
            <label>Gender:</label>
            <div class="gender-options">
              <label><input type="radio" value="Male" v-model="user.gender" /> Male</label>
              <label><input type="radio" value="Female" v-model="user.gender" /> Female</label>
              <label><input type="radio" value="Other" v-model="user.gender" /> Other</label>
            </div>
          </div>
  
          <div class="form-group">
            <label for="dob">Date Of Birth:</label>
            <input type="date" id="dob" v-model="user.dateOfBirth" required />
            <p v-if="errorMessage.dateOfBirth" class="error">{{ errorMessage.dateOfBirth }}</p>
          </div>
  
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="user.email" required />
            <p v-if="errorMessage.email" class="error">{{ errorMessage.email }}</p>
          </div>
  
          <div class="form-buttons">
            <button type="button" class="close-btn" @click="closeForm">Close</button>
            <button type="submit" class="submit-btn">Add</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineEmits, defineProps } from 'vue'
  
  // Nhận danh sách email hiện tại từ component cha
  const { isVisible, existingEmails } = defineProps({ isVisible: Boolean, existingEmails: Array })
  
  const emit = defineEmits(['close', 'submitUser'])
  
  const user = ref({
    name: '',
    gender: 'Male',
    dateOfBirth: '',
    email: '',
  })
  
  const errorMessage = ref({
    dateOfBirth: '',
    email: '',
  })
  
  const closeForm = () => {
    emit('close')
  }
  
  const submitForm = () => {
  const today = new Date()
  const dateOfBirth = new Date(user.value.dateOfBirth)

  let isValid = true

  // Kiểm tra ngày sinh
  if (dateOfBirth > today) {
    errorMessage.value.dateOfBirth = 'Ngày sinh không được quá hiện tại'
    isValid = false
  } else {
    errorMessage.value.dateOfBirth = ''
  }

  // Kiểm tra email có trùng hay không
  if (Array.isArray(existingEmails) && existingEmails.includes(user.value.email)) {
    errorMessage.value.email = 'Email đã tồn tại'
    isValid = false
  } else {
    errorMessage.value.email = ''
  }

  // Nếu không có lỗi, gửi form
  if (isValid) {
    emit('submitUser', user.value)
    user.value = { name: '', gender: 'Male', dateOfBirth: '', email: '' }
  }
}
  </script>
  
  <style scoped>
  .form-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .form-container {
    color: black;
    background-color: white;
    padding: 20px;
    width: 400px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  h3 {
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .gender-options {
    display: flex;
    gap: 15px;
  }
  
  .gender-options label {
    display: flex;
    align-items: center;
  }
  
  .form-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
  
  .close-btn {
    background-color: #6c757d;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .submit-btn {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .close-btn:hover {
    background-color: #5a6268;
  }
  
  .submit-btn:hover {
    background-color: #0056b3;
  }
  
  .error {
    color: red;
    font-size: 12px;
    margin-top: 5px;
  }
  </style>
  