export class ForbiddenError extends Error {
  constructor(msg = "FORBIDDEN") {
    super(msg);
    this.name = "ForbiddenError";
  }
}
