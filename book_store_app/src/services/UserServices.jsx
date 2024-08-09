import axios from "axios";

export const LoginPost = async(data) => {
    let res = await axios.post("https://bookstore.incubation.bridgelabz.com/bookstore_user/login", data)
    console.log(res);
    return res
}

export const RegisterPost = async(data) => {
    let res = await axios.post("https://bookstore.incubation.bridgelabz.com/bookstore_user/registration",data)
    console.log(res);
    return res
}
