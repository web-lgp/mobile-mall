//读取token
export function getToken(key) {
    return window.sessionStorage.getItem(key);
}
export function setToken(ms, data) {
    window.sessionStorage.setItem(ms, data);
}