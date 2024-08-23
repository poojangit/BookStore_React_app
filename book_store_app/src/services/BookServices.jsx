import axios from "axios";

// const getToken = () => localStorage.getItem('token');

// const headerConfig = () => ({
//     headers: {
//         'access-token': localStorage.getItem('token')
//     }
// });

const headerConfig = () => {
    return {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };
  };

export const getAllBooksApi = async () => {
    const response = await axios.get('https://bookstore.incubation.bridgelabz.com/bookstore_user/get/book', headerConfig());
    console.log(response.data);
    return response;
};

export const getAllCartDetailsApi = async () => {
    const res = await axios.get(
        "https://bookstore.incubation.bridgelabz.com/bookstore_user/get_cart_items",
        headerConfig()
    );
    return res?.data?.result;
};

export const addToCartApi = async (id) => {
    const res = await axios.post(
        `https://bookstore.incubation.bridgelabz.com/bookstore_user/add_cart_item/${id}`,
        {},
        headerConfig()
    );
    return res;
};

export const updateCartApi = async (id, quantity) => {
    console.log(id);
    console.log(quantity);
    const res = await axios.put(
        `https://bookstore.incubation.bridgelabz.com/bookstore_user/cart_item_quantity/${id}`,
        { quantityToBuy: quantity },
        headerConfig()
    );
    return res;
};

export const removeCartApi = async (id) => {
    console.log(id);
    const res = await axios.delete(
        `https://bookstore.incubation.bridgelabz.com/bookstore_user/remove_cart_item/${id}`,
        headerConfig()
    );
    return res;
};

export const getWishlistItemsApi = async () => {
    const res = await axios.get(
        "https://bookstore.incubation.bridgelabz.com/bookstore_user/get_wishlist_items",
        headerConfig()
    );
    return res?.data?.result;
};

export const addToWishListApi = async (id) => {
    return await axios.post(
        `https://bookstore.incubation.bridgelabz.com/bookstore_user/add_wish_list/${id}`,
        '',
        headerConfig()
    );
};

export const removeWishListApi = async (id) => {
    return await axios.delete(
        `https://bookstore.incubation.bridgelabz.com/bookstore_user/remove_wishlist_item/${id}`,
        headerConfig()
    );
};

export const placeOrderApi = async (data) => {
    return await axios.post(
        `https://bookstore.incubation.bridgelabz.com/bookstore_user/add/order`,
        data,
        headerConfig()
    );
};

export const getFeedbackApi = async (id) => {
    console.log(id);
    const response = await axios.get(`https://bookstore.incubation.bridgelabz.com/bookstore_user/get/feedback/${id}`,
        headerConfig()
    );
    // console.log(response.data);
    return response;

};

export const postFeedbackApi = async (id, data) => {
    console.log(id);
    const res = await axios.post(
        `https://bookstore.incubation.bridgelabz.com/bookstore_user/add/feedback/${id}`,
        data,
        headerConfig()
    );
    console.log(res);
    return res;

};
