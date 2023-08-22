export const SAVE_USER = 'SAVE_USER';

export const createUser = (payload: string) => ({
  type: SAVE_USER,
  payload,
});
