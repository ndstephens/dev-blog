import type { ZodType } from 'zod';

export const validateOptionalQueryParam = <T extends ZodType>(
  queryParam: unknown,
  zodSchema: T
): T['_output'] | undefined => {
  const result = zodSchema.optional().safeParse(queryParam);
  return result.success ? result.data : undefined;
};
