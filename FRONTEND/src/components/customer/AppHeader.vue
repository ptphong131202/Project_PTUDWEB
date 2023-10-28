<template>
  <div class="row header">
    <div class="col-2 header-logo">
      <img class="logo" src="../../assets/img/logo/logo.png" />
    </div>
    <div class="col-10">
      <nav class="navbar navbar-expand" style="border: none">
        <div class="container-fluid fst-italic">
          <div class="collapse navbar-collapse">
            <ul class="navbar-nav me-auto">
              <router-link :to="{ name: 'home' }">
                <li class="nav-item">
                  <p class="nav-link active" style="margin: 0; font-size: 18px">
                    Trang chủ
                  </p>
                </li>
              </router-link>

              <router-link
                style="text-decoration: none"
                :to="{ name: 'product' }"
              >
                <li class="nav-item">
                  <p class="nav-link active" style="margin: 0; font-size: 18px">
                    Cửa hàng
                  </p>
                </li>
              </router-link>

              <router-link
                style="text-decoration: none"
                :to="{ name: 'about' }"
              >
                <li class="nav-item">
                  <p class="nav-link active" style="margin: 0; font-size: 18px">
                    Giới Thiệu
                  </p>
                </li>
              </router-link>

              <router-link
                style="text-decoration: none"
                :to="{ name: 'contact' }"
              >
                <li class="nav-item">
                  <p class="nav-link active" style="margin: 0; font-size: 18px">
                    Liên Hệ
                  </p>
                </li>
              </router-link>

              <router-link
                v-if="store.isAuthenticatedCustomer"
                style="text-decoration: none"
                :to="{ name: 'cart' }"
              >
                <li class="nav-item">
                  <p class="nav-link active" style="margin: 0; font-size: 18px">
                    Giỏ hàng
                  </p>
                </li>
              </router-link>

              <router-link
                v-if="store.isAuthenticatedCustomer"
                style="text-decoration: none"
                :to="{ name: 'order' }"
              >
                <li class="nav-item">
                  <p class="nav-link active" style="margin: 0; font-size: 18px">
                    Đơn hàng
                  </p>
                </li>
              </router-link>
            </ul>
          </div>

          <form class="d-flex ms-5">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Tìm kiếm"
              name="tukhoa"
            />
            <button name="search_product" type="submit">Tìm</button>
          </form>

          <ul
            class="navbar-nav me-auto mb-2 mb-lg-0"
            v-if="store.isAuthenticatedCustomer == false"
          >
            <router-link style="text-decoration: none" :to="{ name: 'signin' }">
              <li class="nav-item">
                <a class="nav-link active">Đăng Nhập</a>
              </li>
            </router-link>
            <router-link style="text-decoration: none" :to="{ name: 'signup' }">
              <li class="nav-item">
                <a class="nav-link active">Đăng ký</a>
              </li>
            </router-link>
          </ul>

          <div v-else-if="store.isAuthenticatedCustomer">
            <nav class="navbar navbar-dark ms-2" style="border: none">
              <button class="navbar-toggler" type="button">
                <span class="navbar-toggler-icon ms-2"></span>
              </button>
              <div class="btn-group">
                <button
                  class="btn btn-primary me-2"
                  type="button"
                  @click="signOut"
                >
                  Đăng xuất
                </button>
              </div>
            </nav>
          </div>
        </div>
      </nav>
    </div>
  </div>
  <div class="container" style="height: 80px">
    <hr />
  </div>
</template>

<script>
import { useCustomerStore } from "@/stores/store";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import customerService from "@/services/customer.service";
export default defineComponent({
  setup() {
    const store = useCustomerStore();
    const router = useRouter();
    const signOut = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        };
        await customerService.signOut({ headers });
        localStorage.removeItem("token");
        store.setIsAuthenticatedCustomer(false);
        router.push({ name: "home" });
      } catch (error) {
        console.log(error);
      }
    };
    return {
      store,
      signOut,
    };
  },
});
</script>

<style>
.navbar {
  background-color: #fff;
  border-bottom: 1px solid #ccc;
}

.navbar a.nav-link.active {
  color: #1d3557;
  font-weight: 500;
}

.navbar form {
  position: relative;
}

.navbar form input[type="search"] {
  border: none;
  background-color: #f5f5f5;
  border-radius: 20px;
  padding: 7px 15px;
  width: 250px;
  font-size: 16px;
}

.navbar form button[type="submit"] {
  background-color: #1d3557;
  border: none;
  border-radius: 20px;
  padding: 7px 20px;
  margin-left: -40px;
  color: #fff;
  transition: all 0.3s ease-in-out;
  font-weight: 500;
}

.navbar form button[type="submit"]:hover {
  background-color: #fff;
  border: 1px solid #1d3557;
  color: #1d3557;
}

.navbar .nav-link.active {
  font-size: 16px;
  font-weight: 500;
  margin-left: 30px;
  color: #1d3557;
  transition: all 0.3s ease-in-out;
}

.navbar .nav-link.active:hover {
  color: #e63946;
}

.router-link-active {
  text-decoration: none;
  color: blue;
}

.router-link-active:hover {
  text-decoration: none;
  color: red;
}
</style>
