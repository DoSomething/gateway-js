'use strict';

const EventEmitter = require('events');
const camelCase = require('camelcase');

const RogueEndpointSignups = require('./endpoint-signups');
const RogueEndpointPosts = require('./endpoint-posts');

const config = require('../config/rogue/client');
const clientCredentialsStrategy = require('./auth-strategies/client-credentials').getInstance({
  tokenConfig: {
    scope: config.authStrategies.clientCredentials.scopes,
  },
});

/**
 * RogueClient
 * @extends EventEmitter
 */
class RogueClient extends EventEmitter {
  /**
   * Create a new client
   *
   * @param  {Object} opts
   * @param  {Array} strategies - Auth strategies the client will support
   */
  constructor(opts) {
    super();
    this.strategies = [clientCredentialsStrategy];
    this.config = config;
    this.baseUri = opts.baseUri || config.baseUri;
    this.setup();

    // Endpoints
    this.Signups = new RogueEndpointSignups(this);
    this.Posts = new RogueEndpointPosts(this);
  }
  /**
   * request - Gets a request client that is authorized by the strategy named in the strategyName
   * argument. The goal is that each strategy should implement the getAuthorizedClient method.
   *
   * @param  {string} strategyName
   * @return {Object} Authorized client
   */
  request(strategyName) {
    if (!strategyName) {
      throw new Error('RogueClient.request: a strategyName is required');
    }
    return this.availableStrategies[strategyName].getAuthorizedClient();
  }
  /**
   * @static getInstance
   *
   * @param  {Object} opts = {}
   * @param  {Array} strategies = []
   * @return {RogueClient}
   */
  static getInstance(opts = {}) {
    return new RogueClient(opts);
  }

  /**
   * If JS had private scope, the following methods would be private. -----------------------------\
   * There is hope: @see https://github.com/tc39/proposal-private-methods
   */

  /**
   * setup - Initializes each strategy and creates a map of the camelCased strategy names and the
   * strategy instances.
   */
  setup() {
    this.availableStrategies = {};
    this.strategies.forEach((strategy) => {
      const name = camelCase(strategy.constructor.name);
      this.availableStrategies[name] = strategy;
      strategy.setup();
    });
  }
  // End "private" methods ------------------------------------------------------------------------/
}

module.exports = RogueClient;
