export function cn(...classes) {
    return classes.filter(Boolean).join(" ")
}

export const isTouch = () => {
    return (
        window.matchMedia("(pointer: coarse)").matches ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0
    );
};

export const isIOS = () => {
    return /iP(ad|hone|od)/i.test(navigator.userAgent);
};

export const isIOSSafari = () => {
    const ua = navigator.userAgent;
    return (
        /iP(ad|hone|od)/i.test(ua) &&
        !/CriOS/i.test(ua) && // Chrome iOS
        !/FxiOS/i.test(ua) && // Firefox iOS
        /Safari/i.test(ua)
    );
};
