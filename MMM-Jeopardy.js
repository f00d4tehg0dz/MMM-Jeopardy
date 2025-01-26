/* global Module */
/* Magic Mirror
 * Module: MMM-Jeopardy
 *
 * By Adrian Chrysanthou
 * MIT Licensed.
 */
Module.register("MMM-Jeopardy", {
	defaults: {
	  useHeader: false,
	  header: "This is Jeopardy!",
	  maxWidth: "400px",
	  textAlignment: "right",
	  animationSpeed: 3000,
	  rotateInterval: 30 * 1000,
	  updateInterval: 60 * 60 * 1000,
	  initialLoadDelay: 4250,
	  answerDisplayDuration: 20 * 1000,
	  nextQuestionDelay: 10 * 1000,
	  api: "https://f00d.me/jeopardy/data?count=100",
	  user_agent: "Magic Mirror Module - Jeopardy Game",
	},
  
	start() {
	  Log.info(`Starting module: ${this.name}`);
	  this.jeopardy = [];
	  this.activeItem = 0;
	  this.loaded = false;
	  this.scheduleUpdate();
	  this.setUpdateInterval();
	},
  
	getStyles() {
	  return ["MMM-Jeopardy.css"];
	},
  
	getTranslations() {
	  return {
		en: "translations/en.json",
		es: "translations/es.json",
	  };
	},
  
	scheduleUpdate() {
	  setTimeout(() => this.getJEOPARDY(), this.config.initialLoadDelay);
	  setInterval(() => this.getJEOPARDY(), this.config.updateInterval);
	},
  
	setUpdateInterval() {
	  setInterval(() => this.updateDom(), this.config.updateInterval);
	},
  
	getDom() {
	  const wrapper = document.createElement("div");
	  wrapper.className = "wrapper";
	  wrapper.style.setProperty("--text-align", this.config.textAlignment);
	  wrapper.style.setProperty("--max-width", this.config.maxWidth);
  
	  if (!this.loaded) {
		wrapper.innerHTML = "Loading JEOPARDY...";
		wrapper.className = "dimmed light small";
		return wrapper;
	  }
  
	  wrapper.appendChild(this.createTable());
	  return wrapper;
	},
  
	createTable() {
	  const tableWrapper = document.createElement("div");
  
	  if (this.config.useHeader) {
		const header = document.createElement("header");
		header.className = "xsmall bright light";
		header.innerHTML = this.config.header;
		tableWrapper.appendChild(header);
	  }
  
	  const currentItem = this.jeopardy[this.activeItem] || {};
	  const tableContent = `
		<table class="small">
		  <tr>
			<td class="field">Category:</td>
			<td class="value">${currentItem.category?.toUpperCase() || "Unknown"}</td>
		  </tr>
		  <tr>
			<td class="field">For:</td>
			<td class="value">${currentItem.value || "$200"}</td>
		  </tr>
		  <tr>
			<td class="field">Clue:</td>
			<td class="value">${currentItem.question || "N/A"}</td>
		  </tr>
		  <tr>
			<td class="field">Answer:</td>
			<td class="value" id="jeopardy-answer"></td>
		  </tr>
		</table>
	  `;
  
	  tableWrapper.innerHTML = tableContent;
  
	  // Add delayed answer reveal logic
	  setTimeout(() => {
		const answerElement = tableWrapper.querySelector("#jeopardy-answer");
		answerElement.innerHTML = `What is ${currentItem.answer || "N/A"}?`;
		setTimeout(() => {
		  this.activeItem++;
		  this.updateDom(this.config.animationSpeed);
		}, this.config.nextQuestionDelay);
	  }, this.config.answerDisplayDuration);
  
	  return tableWrapper;
	},
  
	notificationReceived(notification) {
	  if (notification === "HIDE_JEOPARDY") {
		this.hide(1000);
	  } else if (notification === "SHOW_JEOPARDY") {
		this.show(1000);
	  }
	},
  
	processJEOPARDY(data) {
	  this.jeopardy = data;
	  this.loaded = true;
	},
  
	scheduleCarousel() {
	  setInterval(() => {
		this.activeItem++;
		this.updateDom(this.config.animationSpeed);
	  }, this.config.rotateInterval);
	},
  
	getJEOPARDY() {
	  this.sendSocketNotification("GET_JEOPARDY", this.config.api);
	},
  
	socketNotificationReceived(notification, payload) {
	  if (notification === "JEOPARDY_RESULT") {
		this.processJEOPARDY(payload);
		if (!this.rotateInterval) {
		  this.scheduleCarousel();
		}
		this.updateDom(this.config.animationSpeed);
	  }
	},
  });  