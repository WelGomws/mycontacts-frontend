export default class APIError extends Error {
  constructor(response, body) {
    super(); // error constructor()
    this.name = 'APIError';
    this.response = response;
    this.message = body?.error || `${response.status} - ${response.statusText}`;
  }
}
