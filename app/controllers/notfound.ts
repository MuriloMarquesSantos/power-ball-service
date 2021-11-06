// 404 Handler
class HttpError extends Error {
  status?: number;
}
export function notFound() {
  
  console.error("Route Not Found");
  const err = new HttpError("Route Not Found");
  err.status = 404;
  throw err;
}
