import { Role } from 'src/auth/enums/roles.enum';

interface JwtUser {
  id: string;
  email: string;
  roles: Role[];
  isAdmin?: boolean;
}

export default JwtUser;
