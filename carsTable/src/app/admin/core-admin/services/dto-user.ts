/**
 * The interface of the user coming from the server.
 */
export interface IUserDto {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  role: Role;
}
/**
 * The interface of the role user coming from the server.
 */
export interface Role {
  id: number;
  name: string;
}
