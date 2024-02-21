// Configuration
// It is the application setting.
const config = {
  logLevel: {
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
  }, // This is the type of log message to display
  initialName: "please input your name", // I set the initial name is world, so, at first, it will print hello world
};

// Logger with dependecy injection
// It is to print log message to the console based on the specified log level.
class Logger {
  constructor(logLevel) {
    // Assume logLevel is a key from the config.logLevel object ("error", "warn", "info", "debug")
    this.logLevelNumeric = config.logLevel[logLevel];
  }

  log(message, level = "info") {
    // Convert the string level to its numeric value based on the config
    const messageLevelNumeric = config.logLevel[level];
    if (messageLevelNumeric <= this.logLevelNumeric) {
      console.log(`${level.toUpperCase()}: ${message}`);
    }
  }
}

// Model
// It is the object for storing user's name
const model = {
  // This name property stores current name.
  name: config.initialName,
  //`setName` updates the name and logs
  setName(name) {
    this.name = name;
    logger.log(`Name updated: ${name}`);
  },
  // `getName` is to return the current name.
  getName() {
    return this.name;
  },
};

// View
// It is to deal with
class View {
  constructor(appElement, model) {
    this.appElement = appElement;
    this.model = model;

    this.nameInput = appElement.querySelector("#name-input");
    this.greetButton = appElement.querySelector("#greet-button");
    this.greetingElement = appElement.querySelector("#greeting");

    this.attachEventListeners();
  }

  attachEventListeners() {
    this.greetButton.addEventListener("click", (event) => {
      event.preventDefault();
      this.model.setName(this.nameInput.value);
      this.updateGreeting();
    });
  }

  updateGreeting() {
    this.greetingElement.textContent = `Hello, ${this.model.getName()}!`;
  }
}

// Controller
class Controller {
  constructor(model, view, logger) {
    this.model = model;
    this.view = view;
    this.logger = logger;
  }

  start() {
    this.view.updateGreeting();
  }
}

// Manually injected the dependencies
const logger = new Logger(config.logLevel);
const view = new View(document.getElementById("app"), model);
const controller = new Controller(model, view, logger);

controller.start();
