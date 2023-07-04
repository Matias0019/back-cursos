const allRoles = {
  user: [],
  admin: ['getUsers', 'manageUsers', 'manageCursoUsuario', 'getCursoUsuario', 'getCategoriaCurso', 'manageCategoriaCurso', 'getCursoBase', 'manageCursoBase', 'getCursoModulo', 'manageCursoModulo', 'getCursoLeccion', 'manageCursoLeccion'],
  superadmin: ['getUsers', 'manageUsers', 'manageCursoUsuario', 'getCursoUsuario', 'getCategoriaCurso', 'manageCategoriaCurso', 'getCursoBase', 'manageCursoBase', 'getCursoModulo', 'manageCursoModulo', 'getCursoLeccion', 'manageCursoLeccion'],
};

export const roles: string[] = Object.keys(allRoles);
export const roleRights: Map<string, string[]> = new Map(Object.entries(allRoles));
