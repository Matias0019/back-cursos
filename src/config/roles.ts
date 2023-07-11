const allRoles = {
  user: [],
  admin: ['getUsers', 'manageUsers', 'manageCursoUsuario', 'getCursoUsuario', 'getCategoriaCurso', 'manageCategoriaCurso', 'getCursoBase', 'manageCursoBase', 'getCursoModulo', 'manageCursoModulo', 'getCursoLeccion', 'manageCursoLeccion', 'manageUploadFile'],
  superadmin: ['getUsers', 'manageUsers', 'manageCursoUsuario', 'getCursoUsuario', 'getCategoriaCurso', 'manageCategoriaCurso', 'getCursoBase', 'manageCursoBase', 'getCursoModulo', 'manageCursoModulo', 'getCursoLeccion', 'manageCursoLeccion', 'manageUploadFile'],
};

export const roles: string[] = Object.keys(allRoles);
export const roleRights: Map<string, string[]> = new Map(Object.entries(allRoles));
