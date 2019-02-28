'use strict';

const OAuthEndpoint = require('../oauth-endpoint');

/**
 * @see https://github.com/DoSomething/rogue/blob/master/docs/endpoints/posts.md
 */
class RogueEndpointPosts extends OAuthEndpoint {
  constructor(client) {
    super(client);
    this.url = `${this.client.config.services.rogue.baseUri}/posts`;
  }
  /**
   * @param  {Object} query
   * @return {Promise}
   */
  index(query) { return this.executeGet(this.url, query); }
  /**
   * @param  {String|Number} id
   * @param  {Object} query
   * @return {Promise}
   */
  get(id, query) { return this.executeGet(`${this.url}/${id}`, query); }
  /**
   * @param  {Object} data
   * @return {Promise}
   */
  create(data) { return this.executePost(data); }

  // "Private" methods --------------------

  /**
   * executePost -  Overrides the RogueEndpoint's executePost method.
   *                We need to setup the superagent request differently for V3 POST /posts requests.
   *                The request has to be of Content-Type: multipart/form-data, but it must not be
   *                set manually. Superagent detects it by using the .field and .attach API methods.
   *
   * @see http://visionmedia.github.io/superagent/#multipart-requests
   * @param  {Object} data
   * @return {Promise}
   */
  executePost(data) {
    const fileProperty = this.client.config.photoPostCreation.fileProperty;
    const request = this.client
      .request('clientCredentials')
      .post(this.url)
      .accept('json');

    // add multipart fields for request
    Object.keys(data).forEach((key) => {
      if (key === fileProperty) {
        request.attach(fileProperty, data[key], 'post-photo');
      } else {
        request.field(key, data[key]);
      }
    });
    return request.then(res => res.body);
  }
  // End of "Private" methods --------------------
}

module.exports = RogueEndpointPosts;
