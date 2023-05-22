/* global Module */

/* Magic Mirror
 * Module: MMM-Jeopardy
 *
 * By Adrian Chrysanthou
 * Initial Code Forked from Mykle1 https://github.com/mykle1/MMM-JEOPARDY/blob/master/MMM-JEOPARDY.js
 * MIT Licensed.
 */

Module.register('MMM-Jeopardy', {
  defaults: {
    rotateInterval: 30 * 1000,
    useHeader: false,
    header: "This is Jeopardy!",
    maxWidth: "250px",
    animationSpeed: 3000,
    initialLoadDelay: 4250,
    retryDelay: 5000,
    api: 'https://f00d.me/jeopardy/data?count=100',
    user_agent: 'Magic Mirror Module - Jeopardy Game',
    updateInterval: 60 * 60 * 1000
  },


  getStyles: function () {
    return ['MMM-Jeopardy.css'];
  },

  getTranslations: function () {
    return {
      en: 'translations/en.json',
      es: 'translations/es.json',
    };
  },

  start: function () {
    Log.info("Starting module: " + this.name);
    requiresVersion: '2.1.0',
    this.jeopardy = [];
    this.activeItem = 0;
    this.rotateInterval = null;
    this.scheduleUpdate();
    setInterval(() => this.updateDom(), this.config.updateInterval);
  },

  getDom: function () {
    var wrapper = document.createElement("div");
    wrapper.className = "wrapper";
    wrapper.style.maxWidth = this.config.maxWidth;

    if (!this.loaded) {
      wrapper.innerHTML = "This is JEOPARDY!";
      wrapper.classList.add("bright", "light", "small");
      return wrapper;
    }

    this.createDomContent(wrapper);
    return wrapper;
  },

  scheduleUpdate: function () {
    setInterval(() => this.getJEOPARDY(), this.config.updateInterval);
    this.getJEOPARDY(this.config.initialLoadDelay);
  },


  createDomContent: function (wrapper) {
    if (this.config.useHeader) {
      var header = document.createElement("header");
      header.classList.add("xsmall", "bright", "light");
      header.innerHTML = this.config.header;
      wrapper.appendChild(header);
    }

    var jeopardyKeys = Object.keys(this.jeopardy);
    if (jeopardyKeys.length > 0) {
      if (this.activeItem >= jeopardyKeys.length) {
        this.activeItem = 0;
      }
      var jeopardy = this.jeopardy[jeopardyKeys[this.activeItem]];

      var top = document.createElement("div");
      top.classList.add("list-row");

      var pic = document.createElement("div");
      var img = document.createElement("img");
      img.classList.add("img");
      img.src = "modules/MMM-Jeopardy/header.png";
      pic.appendChild(img);
      wrapper.appendChild(pic);

      // ...
      var category = document.createElement("div");
      var str = jeopardy.category;
      var res = str.toUpperCase();
      category.classList.add("xsmall", "bright");
      category.innerHTML = "Category: &nbsp" + res;
      wrapper.appendChild(category);

      var jeopardyValue = document.createElement("div");
      jeopardyValue.classList.add("xsmall", "bright");
      jeopardyValue.innerHTML = (jeopardy.value != null) ? "For:   " + jeopardy.value : "For: $200";
      wrapper.appendChild(jeopardyValue);

      var jeopardyClue = document.createElement("div");
      jeopardyClue.classList.add("xsmall", "bright");
      jeopardyClue.innerHTML = "The clue is: &nbsp" + jeopardy.question + ".";
      wrapper.appendChild(jeopardyClue);

      var jeopardyAnswer = document.createElement("div");
      jeopardyAnswer.classList.add("small", "bright");
      setTimeout(function () {
          jeopardyAnswer.innerHTML = "What is " + jeopardy.answer + "?"
      }, 20 * 1000);
      wrapper.appendChild(jeopardyAnswer);
    }
    return wrapper;
  },

  notificationReceived: function (notification, payload) {
    if (notification === 'HIDE_JEOPARDY') {
      this.hide(1000);
    } else if (notification === 'SHOW_JEOPARDY') {
      this.show(1000);
    }
  },

  processJEOPARDY: function (data) {
    this.jeopardy = data;
    this.loaded = true;
  },

  scheduleCarousel: function () {
    this.rotateInterval = setInterval(() => {
      this.activeItem++;
      this.updateDom(this.config.animationSpeed);
    }, this.config.rotateInterval);
  },

  getJEOPARDY: function () {
    this.sendSocketNotification('GET_JEOPARDY', this.config.api);
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === "JEOPARDY_RESULT") {
      this.processJEOPARDY(payload);
      if (this.rotateInterval == null) {
        this.scheduleCarousel();
      }
      this.updateDom(this.config.animationSpeed);
    }
    this.updateDom(this.config.initialLoadDelay);
  },

});
