export function formatLogHelper(action, description, kioskId, userId, id) {
  return {
    action,
    description,
    kioskId: `kioskId ${kioskId}`,
    userId: `userId ${userId}`,
    id,
  };
}
