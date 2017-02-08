import RestApiClient from './RestApiClient';

class PhoenixAshes extends RestApiClient {
  constructor(config = {}, overrides = {}) {
    const baseUrl = 'https://staging.dosomething.org';

    super(baseUrl, {headers: 'poop'});
  }
}

export default PhoenixAshes;
