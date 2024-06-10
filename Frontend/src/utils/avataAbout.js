export const stringToColor = (string) => {
    let hash = 0;
    let i;
    for (i = 0; i < string?.length; i++) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff;
        color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
}

export const stringAvatar = (name) => {
    const nameParts = name?.split(' ');
    const initials = nameParts?.slice(0, 2).map(word => word[0]).join('');
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: initials,
    };
}
