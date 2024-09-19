import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";

const blogCollection = collection(db, "blogs");

const getCurrentUserEmail = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  return user ? user.email : null;
};

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const snapshot = await getDocs(blogCollection);
  const blogs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return blogs;
});

export const addBlog = createAsyncThunk("blogs/addBlog", async (blog) => {
  const email = getCurrentUserEmail();
  if (!email) throw new Error("User not authenticated");

  const blogWithAuthor = { ...blog, author: email };
  const docRef = await addDoc(blogCollection, blogWithAuthor);
  return { id: docRef.id, ...blogWithAuthor };
});

export const updateBlog = createAsyncThunk(
  "blogs/updateBlog",
  async ({ id, updatedBlog }) => {
    const email = getCurrentUserEmail();
    const blogDoc = doc(db, "blogs", id);
    const existingBlogSnapshot = await getDoc(blogDoc);
    const existingBlog = existingBlogSnapshot.data();

    const blogWithAuthor = {
      ...updatedBlog,
      author: existingBlog.author || email,
    };

    await updateDoc(blogDoc, blogWithAuthor);
    return { id, ...blogWithAuthor };
  }
);

export const deleteBlog = createAsyncThunk("blogs/deleteBlog", async (id) => {
  const blogDoc = doc(db, "blogs", id);
  await deleteDoc(blogDoc);
  return id;
});

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.blogs = payload;
      })
      .addCase(fetchBlogs.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      .addCase(addBlog.fulfilled, (state, { payload }) => {
        state.blogs.push(payload);
      })
      .addCase(updateBlog.fulfilled, (state, { payload }) => {
        const index = state.blogs.findIndex((blog) => blog.id === payload.id);
        if (index !== -1) {
          state.blogs[index] = payload;
        }
      })
      .addCase(deleteBlog.fulfilled, (state, { payload }) => {
        state.blogs = state.blogs.filter((blog) => blog.id !== payload);
      });
  },
});

export default blogSlice.reducer;
