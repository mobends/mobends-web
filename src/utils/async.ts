export function waitForMilliseconds(ms: number) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    });
}