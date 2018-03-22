/**
 * GatewayError
 *
 * Custom error to append additional data.
 */
class GatewayError extends Error {
  /**
   * GatewayError constructor
   *
   * @param  {Response} response
   * @param  {...String} params
   */
  constructor(response = null, ...params) {
    super(...params);

    this.date = new Date();
    this.response = response;
  }
}

export default GatewayError;
