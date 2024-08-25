import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productData from "../productData";

export const getAllData = createAsyncThunk('product', async() => {
  const response = await fetch("https://api.escuelajs.co/api/v1/products");
  const result = response.json();
  return result
})


const initialState = {
  cart: [],
  items: productData,
  filteredItems: productData,
  searchQuery: "",
  totalQuantity: 0,
  totalPrice: 0,
  loading:false,
  error:null
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  extraReducers:{
    [getAllData.pending]:(state)=>{
      state.loading = true;
    },
    [getAllData.fulfilled]:(state, action)=>{
      state.loading = false;
      state.items = action.payload;
    },
    [getAllData.fulfilled]:(state, action)=>{
      state.loading = false;
      state.items = action.payload;
    },
    
  },

  reducers: {
    addToCart: (state, action) => {
      let find = state.cart.findIndex((item) => item.id === action.payload.id);
      if (find >= 0) {
        state.cart[find].quantity += 1;
      } else {
        state.cart.push(action.payload);
      }
    },

    getCartTotal: (state) => {
      let { totalQuantity, totalPrice } = state.cart.reduce(
        (cartTotal, cartItem) => {
          console.log("carttotal", cartTotal);
          console.log("cartitem", cartItem);
          const { price, quantity } = cartItem;
          console.log(price, quantity);
          const itemTotal = price * quantity;
          cartTotal.totalPrice += itemTotal;
          cartTotal.totalQuantity += quantity;
          return cartTotal;
        },
        {
          totalPrice: 0,
          totalQuantity: 0,
        }
      );
      state.totalPrice = parseInt(totalPrice.toFixed(2));
      state.totalQuantity = totalQuantity;
    },

    removeItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    increaseItemQuantity: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    },
    decreaseItemQuantity: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.filteredItems = state.items.filter(item =>
        item.category.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
  },
});

export const {
  addToCart,
  getCartTotal,
  removeItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  setSearchQuery,
} = cartSlice.actions;

export default cartSlice.reducer;
