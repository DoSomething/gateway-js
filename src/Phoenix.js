import RestApiClient from './RestApiClient';

/**
 * Phoenix Client.
 */
class Phoenix extends RestApiClient {
  /**
   * Client constructor
   *
   * @param  {Object} config
   * @param  {Object} overrides
   * @return {Object}
   */
  constructor(config = {}, overrides = {}) {

    const url = config.url || null;

    super(url, overrides);
  }

  /**
   * Get an index of (optionally filtered) campaign reportbacks.
   *
   * @param  {Object} query
   * @return {Promise}
   */
  getAllReportbacks(query = {}) {
    return this.get('api/v1/reportbacks', query);
  }

  /**
   * Get details for a particular reportback.
   *
   * @param  {Integer} id
   * @return {Promise}
   */
  getReportback(id) {
    return this.get(`api/v1/reportbacks/${id}`);
  }

  /**
   * Get an index of (optionally filtered) campaign signups.
   *
   * @param  {Object} query
   * @return {Promise}
   */
  getAllSignups(query = {}) {
    return this.get('api/v1/signups', query);
  }

  /**
   * Get details for a particular campaign signup.
   *
   * @param  {Integer} id
   * @return {Promise}
   */
  getSignup(id) {
    return this.get(`api/v1/signups/${id}`);
  }

  /**
   * Store a new campaign signup.
   *
   * @param  {Object} body
   * @return {Promise}
   */
  storeSignup(body = {}) {
    return this.post('api/v1/signups', body);
  }
}

export default Phoenix;
