// import { forgotPassword } from "../../Backend/controllers/ForgotPassController.js";
import { api, setHeaders } from "./api.js";

export const productApi = {
  getProduct() {
    const url = "/product";
    return api.get(url, setHeaders());
  },
  getProductById(id) {
    const url = `/product/${id}`;
    return api.get(url, setHeaders());
  },
  createProduct(data) {
    //   {
    //     "name":"Laptop Lenovo IdeaPad Slim 3 14IAH8 83EQ0005VN",
    //     "alias": "laptop-lenovo-ideapad-slim-3-14iah8-83eq0005vn",
    //     "desc":"Laptop Lenovo IdeaPad Slim 3 14IAH8 83EQ0005VN (Core i5-12450H | 16GB | 512GB | Intel UHD | 14 inch FHD | Win 11 | Xám)",
    //     "brand": "Lenovo",
    //     "price": 12990000,
    //     "category": ["Laptop", "Computer"],
    //     "stock": 100,
    //     "image": "https://laptopworld.vn/media/product/14758_lenovo_ideapad_slim_3_14iah8_logo.jpg",
    //     "rate": 2
    // }
    const url = "/product";
    return api.post(url, data, setHeaders());
  },
  deleteProduct(productId) {
    const url = `/product/${productId}`;
    return api.delete(url, setHeaders());
  },
  updateProduct(data, productId) {
    //   {
    //     "name":"Laptop Lenovo IdeaPad Slim 3 14IAH8 83EQ0005VN",
    //     "alias": "laptop-lenovo-ideapad-slim-3-14iah8-83eq0005vn",
    //     "desc":"Laptop Lenovo IdeaPad Slim 3 14IAH8 83EQ0005VN (Core i5-12450H | 16GB | 512GB | Intel UHD | 14 inch FHD | Win 11 | Xám)",
    //     "brand": "Lenovo",
    //     "price": 12990000,
    //     "category": ["Laptop", "Computer"],
    //     "stock": 100,
    //     "image": "https://laptopworld.vn/media/product/14758_lenovo_ideapad_slim_3_14iah8_logo.jpg",
    //     "rate": 2
    // }
    const url = `/product/${productId}`;
    return api.put(url, data, setHeaders());
  },
  getUserCart(userId) {
    const url = `/user/${userId}/cart/`;
    return api.get(url, setHeaders());
  },
  updateUserCart(userId, productId) {
    const url = `/user/${userId}/cart/${productId}`;
    return api.post(url, setHeaders());
  },
  deleteUserCart(userId, cartItems) {
    console.log(">>>>", cartItems);
    const url = `/user/${userId}/cart`;
    const res = api.post(url, cartItems, setHeaders());
    console.log(res);
    return res;
  },
};

export const checkoutApi = {
  async checkout(data) {
    try {
      // {
      //     "userId": "664cc642e3de3cee7ce68cb3",
      //     "cartItems": [
      //       {
      //           "id": "66125699a6aeb7c988b75e06",
      //           "quantity" : 2
      //       },
      //       {
      //           "id": "66134c4c5e06ddba8e42df76",
      //           "quantity" : 4
      //       }
      //     ]
      //}
      const url = "/stripe/create-checkout-session";
      const stripeUrl = await api.post(url, data, setHeaders());
      window.location.href = stripeUrl.data.url;
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  },
};

export const commentApi = {
  getAllComments(productId) {
    const url = `/product/${productId}/comment`;
    return api.get(url, setHeaders());
  },

  createComment(productId, comment) {
    // {
    //   "userId": "664cc642e3de3cee7ce68cb3",
    //   "comment": "this product is greate",
    //   "userName": "Dat",
    // }
    const url = `/product/${productId}/comment`;
    return api.post(url, comment, setHeaders());
  },

  reply(productId, commentId, comment) {
    // {
    //   "userId": "664cc642e3de3cee7ce68cb3",
    //   "comment": "this product is greate",
    //   "userName": "Dat",
    // }
    const url = `/product/${productId}/comment/${commentId}`;
    return api.post(url, comment, setHeaders());
  },
};
