/**
 * Interface for all contact related response data received from REST API
 */
export interface ContactList {
  _id: string;
  name: string;
  phoneNumber: number;
  email: string;
}
