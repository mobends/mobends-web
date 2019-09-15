export function combineClasses(object: {[key: string]: boolean}): string {
    return Object.keys(object).filter(key => object[key]).join(' ');
}