const { trimStr } = require('../utils');

const users = [];

const findUser = (user) => {
    const userName = trimStr(user.name);
    const userRoom = trimStr(user.room);

    return users.find(
        (u) => trimStr(u.name) === userName && trimStr(u.room) === userRoom
    );
};

const addUser = (user) => {
    const isExist = findUser(user);

    if (!isExist) users.push(user);

    const currentUser = isExist || user;

    return { isExist: !!isExist, user: currentUser };
};

const removeUser = (user) => {
    const found = findUser(user);

    if (found) {
        const updatedUsers = users.filter(
            ({ room, name }) => room === found.room && name !== found.name
        );

        users.splice(0, users.length, ...updatedUsers);

        return found;
    }

    return null;
};

module.exports = {
    addUser,
    findUser,
    removeUser,
    users
}