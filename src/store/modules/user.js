import { login,  getInfo } from "@/api/login";
import { getToken, setToken, removeToken } from "@/utils/auth";
import defAva from "@/assets/images/profile.jpg";

const useUserStore = defineStore("user", {
  state: () => ({
    token: getToken(),
    is_superuser: localStorage.getItem("is_superuser")?localStorage.getItem("is_superuser"):0,
    id: "",
    name: "",
    avatar: "",
    roles: [],
    permissions: [],
  }),
  actions: {
    // 登录
    login(userInfo) {
      const username = userInfo.email.trim();
      const password = userInfo.password;
      // const code = userInfo.code;
      // const uuid = userInfo.uuid;
      return new Promise((resolve, reject) => {
        login({
          email: username,
          password,
        })
          .then((res) => {
            console.log("user/profileuser/profile",res)
            setToken(res.data.token);
            this.token = res.data.token;
            this.is_superuser = res.data.is_superuser;
            localStorage.setItem("is_superuser",res.data.is_superuser);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 获取用户信息
    getInfo() {
      return new Promise((resolve, reject) => {
        getInfo()
          .then((res) => {
            const user = res.user;
            const avatar =
              user.avatar == "" || user.avatar == null
                ? defAva
                : import.meta.env.VITE_APP_BASE_API + user.avatar;

            if (res.roles && res.roles.length > 0) {
              // 验证返回的roles是否是一个非空数组
              this.roles = res.roles;
              this.permissions = res.permissions;
            } else {
              this.roles = ["ROLE_DEFAULT"];
            }
            this.id = user.userId;
            this.name = user.userName;
            this.avatar = avatar;
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 退出系统
    logOut() {
      return new Promise((resolve, reject) => {
        logout(this.token)
          .then(() => {
            this.token = "";
            this.roles = [];
            this.permissions = [];
            removeToken();
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});

export default useUserStore;
