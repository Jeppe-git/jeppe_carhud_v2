const app = new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  data: () => ({
    windowShow: false,
    configShow: false,
    speed: null,
    fuel: null,
    engine: null,
    oil: null,
    engineColor: null,
    oilColor: null,
    dashboardWidth: 400,
    engineIcon: 45,
    oilIcon: 45,
    warningIcon: 45,
    fuelBar: 10
  }),

  methods: {
    OPEN_CONFIG(data) {
      this.configShow = true;
    },
    OPEN(data) {
      this.windowShow = true;
      this.speed = data.speed;
      this.fuel = data.fuel;
      this.engine = data.engine;
      this.oil = data.oil;
    },
    checkEngineColor() {
      if (this.engine > 800) {
        return 'white';
      } else if (this.engine < 800 && this.engine > 400) {
        return 'yellow';
      } else {
        return 'red'
      }
    },
    checkFuelColor() {
      if (this.fuel > 50) {
        return 'white';
      } else if (this.fuel < 50 && this.fuel > 30) {
        return 'yellow';
      } else {
        return 'red';
      }
    },
    checkOilColor() {
      if (this.oil > 70) {
        return 'white';
      } else if (this.oil < 70 && this.oil > 30) {
        return 'yellow';
      } else {
        return 'red';
      }
    },
    CLOSE: function (data) {
      this.windowShow = false;
      post("http://jeppe_carhud/close", null);
    },
    CLOSE_CONFIG(data) {
      this.configShow = false;
      post("http://jeppe_carhud/close_config", null);
    },
  },

  mounted() {
    this.escapeListener = window.addEventListener("keyup", (event) => {
      if (event.keyCode === 27) {
        this.CLOSE_CONFIG();
      }
    });
    this.messageListener = window.addEventListener("message", (event) => {
      const item = event.data || event.detail; //'detail' is for debugging via browsers
      if (this[item.type]) {
        this[item.type](item);
      }
    });
  },
})

window.post = (url, data) => {
  var request = new XMLHttpRequest();
  request.open("POST", url, true);
  request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  request.send(data);
};
