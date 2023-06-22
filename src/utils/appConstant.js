export const PERMISSIONS = Object.freeze({
  CREATE: 1,
  READ: 2,
  UPDATE: 3,
  DELETE: 4,
  MODIFY_PERMISSIONS: 4,
});

export const ROLES = Object.freeze({
  SUPER_ADMIN: 1,
  ADMIN: 2,
  BASIC_USER: 3,
});

export const MODULE_PERMISSIONS = Object.freeze({
  user: 1,
  feed: 2,
});
