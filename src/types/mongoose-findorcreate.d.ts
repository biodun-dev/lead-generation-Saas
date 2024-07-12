
import { Document, Schema, Model } from 'mongoose';

declare module 'mongoose' {
  interface Model<T extends Document> {
    findOrCreate(
      condition: Partial<T>,
      doc: Partial<T>,
      options?: any
    ): Promise<{ doc: T; created: boolean }>;
  }
}

declare module 'mongoose-findorcreate' {
  function findOrCreate(schema: Schema): void;
  export = findOrCreate;
}
