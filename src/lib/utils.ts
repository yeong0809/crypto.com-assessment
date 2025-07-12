export const isEmpty = (value: any, isAllowZeroNumber?: boolean) => {
  if (
    `${value}`.trim() === `` ||
    value === null ||
    value === undefined ||
    (!isAllowZeroNumber && (value === 0 || value === `0`)) ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === `object` &&
      Object.entries(value).length === 0 &&
      value.constructor === Object)
  ) {
    return true;
  }

  return false;
};

export const isString = (value: any): value is string => {
  return typeof value === `string` || value instanceof String;
};

export const convertObjectToUrlParameters = (obj: object) => {
  const str = [];

  for (const key in obj) {
    if (Array.isArray(obj[key as keyof typeof obj])) {
      (obj[key as keyof typeof obj] as string[]).forEach((item) => {
        str.push(`${key}[]=${item}`);
      });
    } else if (Object.prototype.hasOwnProperty.call(obj, key)) {
      str.push(
        encodeURIComponent(key) +
          `=` +
          encodeURIComponent(obj[key as keyof typeof obj])
      );
    }
  }

  return str.join(`&`);
};
