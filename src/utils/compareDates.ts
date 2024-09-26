export function compareDates(date?: string) {
  if (!date) return false;

  const tested = new Date(date);
  if (!tested) return false;

  const now = new Date().getTime();

  if (tested.getTime() > now) {
    return true;
  } else {
    return false;
  }
}
