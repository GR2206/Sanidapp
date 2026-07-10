interface StringTree {
  [key: string]: string | StringTree;
}

export function mergeLocales<T extends StringTree>(base: T, extension: StringTree): T {
  const result = { ...base } as StringTree;

  for (const key of Object.keys(extension)) {
    const baseValue = result[key];
    const extValue = extension[key];

    if (
      baseValue != null &&
      typeof baseValue === 'object' &&
      extValue != null &&
      typeof extValue === 'object'
    ) {
      result[key] = mergeLocales(baseValue as StringTree, extValue as StringTree);
    } else {
      result[key] = extValue;
    }
  }

  return result as T;
}
