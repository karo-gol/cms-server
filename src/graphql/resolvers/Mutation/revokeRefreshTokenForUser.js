const revokeRefreshTokenForUserResolver = async (obj, { userId }) => {
    await User.increment('tokenVersion', { where: { userId: userId } });
    return true;
};

export default revokeRefreshTokenForUserResolver;