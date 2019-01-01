export function clean<T extends object>(obj: T): void {
    for (var propName in obj) { 
        if (obj[propName] === null || obj[propName] === undefined) {
          delete obj[propName];
        }
    }
}