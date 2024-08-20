import axios from "axios";

const headerConfig = {
    headers: {
        'access-token': localStorage.getItem('token')
    }
}

export const getAllBooksApi = async () => {
    const response = await axios.get('https://bookstore.incubation.bridgelabz.com/bookstore_user/get/book', headerConfig);
    console.log(response.data);
    return response
}