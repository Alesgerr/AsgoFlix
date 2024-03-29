// import axios from "axios";
// import React, { useState } from "react";
// import * as Yup from "yup";
// import { useFormik } from "formik";

// const schema = Yup.object({
//   title: Yup.string().required("Title is Required"),
//   description: Yup.string().required("Description is Required"),
//   price: Yup.number().required("Price is Required"),
//   quantity: Yup.number().required("Quantity is Required"),
//   brand: Yup.string().required("Brand is Required"),
//   category: Yup.string().required("Category is Required"),
// });

// const AddProduct = () => {
//   const [images, setImages] = useState([]);

//   const formik = useFormik({
//     initialValues: {
//       title: "",
//       description: "",
//       price: 0,
//       quantity: 0,
//       brand: "",
//       category: "",
//     },
//     validationSchema: schema,
//     onSubmit: async (values) => {
//       try {
//         // Verileri hazırla
//         const data = {
//           title: values.title,
//           description: values.description,
//           price: values.price,
//           quantity: values.quantity,
//           brand: values.brand,
//           category: values.category,
//           images: images, // Eğer resimler de post edilecekse, uygun şekilde güncelle
//         };

//         // POST isteği gönder
//         const response = await axios.post(
//           "https://dummyjson.com/products/add",
//           data
//         );

//         // Cevapla ilgili işlemleri gerçekleştir
//         console.log("Product added successfully:", response.data);

//         // Formu sıfırla
//         formik.resetForm();
//       } catch (error) {
//         console.error("Error adding product:", error.message);
//       }
//     },
//   });

//   const handleImageChange = (e) => {
//     // Resim dosyalarını state'e ekleyin
//     const files = Array.from(e.target.files);
//     setImages(files);
//   };

//   return (
//     <div className="px-5">
//       <form onSubmit={formik.handleSubmit}>
//         <input
//           type="text"
//           name="title"
//           placeholder="Title"
//           value={formik.values.title}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//         />
//         {formik.touched.title && formik.errors.title && (
//           <div>{formik.errors.title}</div>
//         )}

//         <input
//           type="text"
//           name="category"
//           placeholder="Category"
//           value={formik.values.category}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//         />
//         {formik.touched.category && formik.errors.category && (
//           <div>{formik.errors.category}</div>
//         )}

//         <input
//           type="text"
//           name="description"
//           placeholder="Description"
//           value={formik.values.description}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//         />
//         {formik.touched.description && formik.errors.description && (
//           <div>{formik.errors.description}</div>
//         )}

//         <input
//           type="number"
//           name="price"
//           placeholder="Price"
//           value={formik.values.price}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//         />
//         {formik.touched.price && formik.errors.price && (
//           <div>{formik.errors.price}</div>
//         )}

//         <input
//           type="number"
//           name="quantity"
//           placeholder="Quantity"
//           value={formik.values.quantity}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//         />
//         {formik.touched.quantity && formik.errors.quantity && (
//           <div>{formik.errors.quantity}</div>
//         )}

//         <input
//           type="text"
//           name="brand"
//           placeholder="Brand"
//           value={formik.values.brand}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//         />
//         {formik.touched.brand && formik.errors.brand && (
//           <div>{formik.errors.brand}</div>
//         )}

//         <input
//           type="file"
//           name="images"
//           onChange={handleImageChange}
//           multiple
//         />

//         <button type="submit">Add Product</button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;
