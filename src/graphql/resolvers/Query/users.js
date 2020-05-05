const usersResolver = async () => {
    return await User.findAll();
};

export default usersResolver;