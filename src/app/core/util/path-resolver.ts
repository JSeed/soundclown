
export class PathResolver {

  private baseParts: string[] = [];

  /**
   * Adds a part this builder's base path
   */
  withPart(part: string): PathResolver {
      part = this.sanitize(part || '');

      if (part) {
          this.baseParts.push(part);
      }

      return this;
  }

  /**
   * Resolves the given path parts, applied to the base path parts
   */
  resolve(...parts): string {
      parts = parts.map((part) => this.sanitize(part || ''))
          .filter((part) => part); // Remove empty
      return [...this.baseParts, ...parts].join('/');
  }

  private sanitize(str: string): string {
      // Remove any leading or trailing slashes
      return str.replace(/^\/|\/$/g, '');
  }

}
