import { hash } from "bcryptjs";

const createUserResolver = async (obj, { login, password, email }) => {
    const hashedPassword = await hash(password, 12);

    try {
        await User.create({
            login: login,
            email: email,
            password: hashedPassword
        });
    } catch (err) {
        console.log(err);
        return false;
    }

    return true;
};

export default createUserResolver;