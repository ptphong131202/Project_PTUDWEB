<template>
    <head>
        <title>Dashboard</title>
    </head>
    <div class="admin-welcome" style="height: 100vh;">
        <h1>Chào mừng đến trang quản trị</h1>
        <p>Đây là trang quản lý nội dung của hệ thống của bạn. Tại đây bạn có thể quản lý thông tin, sản phẩm, danh mục, đơn
            hàng, người dùng, và nhiều hơn nữa.</p>
        <img src="https://th.bing.com/th/id/OIP.IZepiZ0KQXerQt7EAsIPdgHaDa?w=341&h=161&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="">
    </div>
</template>
<style scoped>
.admin-welcome {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.admin-welcome img {
    margin-top: 30px;
    max-width: 100%;
    height: auto;
}

.admin-welcome {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
}

.admin-welcome h1 {
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 20px;
}

.admin-welcome p {
    font-size: 18px;
    margin-bottom: 10px;
    line-height: 1.5;
}

.admin-welcome-image {
    margin-top: 40px;
}

.admin-welcome-image img {
    width: 100%;
    max-height: 500px;
    object-fit: cover;
}
</style>
  