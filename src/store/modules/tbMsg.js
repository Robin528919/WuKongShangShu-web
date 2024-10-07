const useTbMsgStore = defineStore("tbMsg", {
  state: () => ({
    tbMsg: {
      pic_path: "",
      sid: "",
      title: "",
    },
  }),
  actions: {
    changeTbMsg(msg) {
      this.tbMsg = msg;
      localStorage.setItem('tbMsg',JSON.stringify(msg) )
    },
  },
});

export default useTbMsgStore;
