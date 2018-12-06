'use strict';

const RogueEndpoint = require('./endpoint');

class RogueEndpointSignups extends RogueEndpoint {
  constructor(client) {
    super(client);
    this.endpoint = 'signups';
  }
  /**
   * index - Retrieve all Signups
   *
   * @see https://github.com/DoSomething/rogue/blob/master/docs/endpoints/signups.md#retrieve-all-signups
   * @param  {Object} query
   * @return {Promise}
   */
  index(query) {
    return this
      .executeGet(this.endpoint, query)
      .then(responseBody => responseBody);
  }
  /**
   * getById - Retrieve a single Signup
   *
   * @see https://github.com/DoSomething/rogue/blob/master/docs/endpoints/signups.md#retrieve-a-specific-signup
   * @param  {string|number} id
   * @param  {Object} query
   * @return {Promise}
   */
  getById(id, query) {
    return this
      .executeGet(`${this.endpoint}/${id}`, query)
      .then(responseBody => responseBody);
  }
  /**
   * getByUserIdAndCampaignRunId - Retrieves the member's activity in a campaign run,
   *                                including posts
   *
   * @param  {string} userId
   * @param  {number} campaignRunId
   * @return {Promise}
   */
  getByUserIdAndCampaignRunId(userId, campaignRunId) {
    const query = `include=posts&filter[northstar_id]=${userId}&filter[campaign_run_id]=${campaignRunId}`;
    return this
      .index(query);
  }
  /**
   * create - Create a new Signup
   *
   * @see https://github.com/DoSomething/rogue/blob/master/docs/endpoints/signups.md#create-a-signup
   * @param  {Object} data
   * @return {Promise}
   */
  create(data) {
    return this
      .executePost(this.endpoint, data)
      .then(responseBody => responseBody);
  }
}

module.exports = RogueEndpointSignups;
