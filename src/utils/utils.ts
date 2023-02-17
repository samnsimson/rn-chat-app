export const uuidv4 = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = Math.floor(Math.random() * 16);
        const v = c === "x" ? r : (r % 4) + 8;
        return v.toString(16);
    });
};

export const gravatar = (str: string) => {
    let hash = 0;
    if (str.length === 0) return undefined;
    for (let i = 0; i < str.length; i++) {
        let char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
    }
    return `https://www.gravatar.com/avatar/${hash}`;
};
