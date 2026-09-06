export interface IUser {
  _id: string;
  username: string;
  email: string;
  fullname?: string;
  isEmailVerified: boolean;
}
