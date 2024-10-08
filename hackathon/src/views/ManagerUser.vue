<template>
    <div class="container">
        <div class="header">
            <h2>Manager User</h2>
            <button class="add-user-btn" @click="toggleForm">Add New User</button>
        </div>

        <div class="search-container">
            <input type="text" v-model="searchQuery" placeholder="Search by name..." class="search-input" />
        </div>

        <table>
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Date Of Birth</th>
                    <th>Email</th>
                    <th>Option</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in filteredUsers" :key="user.email">
                    <td>{{ index + 1 }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.gender }}</td>
                    <td>{{ user.dateOfBirth }}</td>
                    <td>{{ user.email }}</td>
                    <td>
                        <button class="edit-btn" @click="editUser(user)">Edit</button>
                        <button class="delete-btn" @click="deleteUser(user)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Form thêm người dùng -->
        <FormUser v-if="showForm" :isVisible="showForm" :existingEmails="existingEmails" @close="closeForm"
            @submitUser="addUser" />

        <!-- Form chỉnh sửa người dùng -->
        <FormEdit v-if="showEditForm" :isVisible="showEditForm" :userToEdit="userToEdit"
            :existingEmails="existingEmails" @close="closeEditForm" @saveChanges="saveChanges" />
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import FormUser from './FormUser.vue'
import FormEdit from './FormEdit.vue'

const users = ref([])

const showForm = ref(false)
const showEditForm = ref(false)
const userToEdit = ref(null)
const searchQuery = ref('')

const existingEmails = computed(() => users.value.map(user => user.email))

// lọc danh sách người dùng theo từ khóa tìm kiếm
const filteredUsers = computed(() => {
    if (searchQuery.value.trim() === '') {
        return users.value
    }
    return users.value.filter(user =>
        user.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
})

const toggleForm = () => {
    showForm.value = !showForm.value
}

const closeForm = () => {
    showForm.value = false
}
const closeEditForm = () => {
    showEditForm.value = false
}
//   thêm ng dùng
const addUser = (newUser) => {
    users.value.push(newUser)
    localStorage.setItem('users', JSON.stringify(users.value))
    closeForm()
}
//   sửa ng dùng
const editUser = (user) => {
    userToEdit.value = { ...user }
    showEditForm.value = true
}
//   lưu ng dùng
const saveChanges = (updatedUser) => {
    const index = users.value.findIndex(u => u.email === updatedUser.email)
    if (index !== -1) {
        users.value.splice(index, 1, { ...updatedUser })
        localStorage.setItem('users', JSON.stringify(users.value))
        closeEditForm()
    }
}
//   xóa ng dùng
const deleteUser = (user) => {
    const confirmDelete = confirm(`Bạn có muốn xóa ${user.name}?`)
    if (confirmDelete) {
        users.value = users.value.filter(u => u.email !== user.email)
        localStorage.setItem('users', JSON.stringify(users.value))
    }
}
// lấy trên local
onMounted(() => {
    const storedUsers = localStorage.getItem('users')
    if (storedUsers) {
        users.value = JSON.parse(storedUsers)
    }
})
</script>

<style scoped>
.container {
    margin: 20px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

thead {
    font-size: 18px;
    color: black;
    font-weight: 800;
}

.add-user-btn {
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.add-user-btn:hover {
    background-color: #0056b3;
}

table {
    width: 100%;
    border-collapse: collapse;
}

table th,
table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
}

table th {
    background-color: #f2f2f2;
}

.edit-btn {
    background-color: orange;
    border: none;
    color: white;
    padding: 5px 10px;
    border-radius: 3px;
    cursor: pointer;
    margin-right: 5px;
}

.delete-btn {
    background-color: red;
    border: none;
    color: white;
    padding: 5px 10px;
    border-radius: 3px;
    cursor: pointer;
}

.edit-btn:hover {
    background-color: darkorange;
}

.delete-btn:hover {
    background-color: darkred;
}

.search-container {
    margin-bottom: 10px;
}

.search-input {
    padding: 8px;
    width: 300px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
}
</style>