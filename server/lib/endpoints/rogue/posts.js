'use strict';

const OAuthEndpoint = require('../oauth-endpoint');

class RogueEndpointPosts extends OAuthEndpoint {
  constructor(client) {
    super(client);
    this.url = `${this.client.config.services.rogue.baseUri}/posts`;
  }
  /**
   * index - Retrieve all Posts
   *
   * @see https://github.com/DoSomething/rogue/blob/master/docs/endpoints/posts.md#retrieve-all-posts
   * @param  {Object} query
   * @return {Promise}
   */
  index(query) {
    return this
      .executeGet(this.url, query)
      .then(responseBody => responseBody);
  }
  /**
   * getById - Retrieve a single Post
   *
   * @see https://github.com/DoSomething/rogue/blob/master/docs/endpoints/posts.md#retrieve-a-specific-post
   * @param  {string|number} id
   * @param  {Object} query
   * @return {Promise}
   */
  getById(id, query) {
    return this
      .executeGet(`${this.url}/${id}`, query)
      .then(responseBody => responseBody);
  }
  /**
   * create - Creates a new Post
   *
   * @see https://github.com/DoSomething/rogue/blob/master/docs/endpoints/posts.md#create-a-post
   * @param  {Object} data
   * @return {Promise}
   */
  create(data) {
    return this
      .executePost(data)
      .then(responseBody => responseBody);
  }

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
    /**
     * In the future, Rogue is implementing the concept of actions, for now this
     * is the expected action.
     * TODO: Remove when apps start sending their custom "action" property
     */
    request.field('action', 'default');
    return request.then(res => res.body);
  }
  // End of "Private" methods --------------------
}

module.exports = RogueEndpointPosts;
