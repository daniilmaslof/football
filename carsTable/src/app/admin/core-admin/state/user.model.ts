/**
 *  type User use in state.
 */
export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  role: Irole;
}
/**
 *  role user.
 */
export interface Irole {
  id: number;
  name: string;
}
/**
 *  Create user.
 */
export function createUser({ id = null, firstName = '', lastName = '', email = '', gender = '', role = null }: Partial<User>): User {
  return {
    id,
    firstName,
    lastName,
    email,
    gender,
    role,
  } as User;
}
