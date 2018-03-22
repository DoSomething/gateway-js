class GatewayError extends Error {
  constructor(response = null, ...params) {
    super(...params);

    this.response = response;
    this.date = new Date();
  }
}

export default GatewayError;
