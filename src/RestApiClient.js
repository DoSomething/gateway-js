import merge from 'lodash/merge';

class RestApiClient {
  constructor(url, overrides = {}) {
    this.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    const csrfToken = document.querySelector('meta[name="csrf-token"]');

    if (csrfToken) {
      this.headers['X-CSRF-Token'] = csrfToken.getAttribute('content');
    }

    this.url = url;


    merge(this, overrides);
  }
}

export default RestApiClient;
