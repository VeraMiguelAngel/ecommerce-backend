import { Role } from '../auth/enums/roles.enum';

export default interface JwtUser {
  sub: string; // ID del usuario (subject del JWT)
  id: string; // redundante, pero útil si lo usás en tu app
  email: string; // correo del usuario
  roles: Role[]; // array de roles: ['admin'] o ['user']
}
