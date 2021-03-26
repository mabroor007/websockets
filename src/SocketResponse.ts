export const createSocketResponse = (
  success: boolean,
  payload: any = null
): string => {
  return JSON.stringify({ success, payload });
};
