class ErrorApp extends Error {
  constructor() {
    super();
  }

  creat(message, statuscode, statusText) {
    (this.message = message),
      (this.statuscode = statuscode),
      (this.statusText = statusText);
console.log("error----", this.message);

    return this;
  }
}

export default new ErrorApp();
