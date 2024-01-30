export function splitUrlParams(param: string) {
  const [key, prevalues] = param.split("=");
  const values = prevalues ? prevalues.split(",") : "";
  return [key, values, prevalues];
}
