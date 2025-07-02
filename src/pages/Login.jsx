// import React, { useState } from "react";
// import {
//   TextField,
//   Button,
//   Typography,
//   MenuItem,
//   Paper,
//   makeStyles,
// } from "@material-ui/core";
// import { useNavigate } from "react-router-dom";


// import bgImage from "../assets/img/Login_bg.png";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     minHeight: "100vh",
//     backgroundImage: `url(${bgImage})`,
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   paper: {
//     padding: theme.spacing(6),
//     maxWidth: 400,
//     width: "100%",
//     borderRadius: theme.spacing(2),
//     backgroundColor: "rgba(255,255,255,0.1)",
//     backdropFilter: "blur(10px)",
//     color: "#fff",
//     boxShadow: theme.shadows[5],
//   },
//   title: {
//     fontWeight: "bold",
//     textAlign: "center",
//     color: "#fff",
//   },
//   subtitle: {
//     textAlign: "center",
//     fontWeight: 600,
//     marginBottom: theme.spacing(4),
//     color: "#fff",
//   },
//   input: {
//     marginBottom: theme.spacing(2),
//     backgroundColor: "rgba(255,255,255,0.8)",
//     borderRadius: 4,
//   },
//   select: {
//     marginBottom: theme.spacing(2),
//     backgroundColor: "rgba(255,255,255,0.8)",
//     borderRadius: 4,
//   },
//   button: {
//     marginTop: theme.spacing(2),
//     backgroundColor: "#d0183c",
//     color: "#fff",
//     fontWeight: "bold",
//     "&:hover": {
//       backgroundColor: "#b71533",
//     },
//   },
// }));

// export default function Login() {
//   const classes = useStyles();
  
// const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     department: "",
//   });

//   const [errors, setErrors] = useState({});

//   const departments = ["Admin", "Finance", "HR", "Sales", "IT"];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: "" })); // clear error on change
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.email) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Invalid email format";
//     }

//     if (!formData.password) {
//       newErrors.password = "Password is required";
//     }

//     if (!formData.department) {
//       newErrors.department = "Please select a department";
//     }

//     return newErrors;
//   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     const validationErrors = validate();
// //     if (Object.keys(validationErrors).length === 0) {
// //       console.log("Login Success:", formData);
// //       history.push("/admin/dashboard"); // Navigate to dashboard
// //     } else {
// //       setErrors(validationErrors);
// //     }
// //   };

//   const handleSubmit = (e) => {
//   e.preventDefault();
//   const validationErrors = validate();
//   if (Object.keys(validationErrors).length === 0) {
//     console.log("Login Success:", formData);
//     localStorage.setItem("isLoggedIn", "true"); // ✅ Store login
//     navigate("/dashboard"); // ✅ Redirect to dashboard
//   } else {
//     setErrors(validationErrors);
//   }
// };


//   return (
//     <div className={classes.root}>
//       <Paper elevation={6} className={classes.paper}>
//         <Typography variant="h4" className={classes.title}>
//           ECO <span style={{ color: "#4caf50" }}>SOUL</span>
//         </Typography>
//         <Typography variant="h6" className={classes.subtitle}>
//           Data-Hive
//         </Typography>
//         <form onSubmit={handleSubmit} noValidate>
//           <TextField
//             fullWidth
//             variant="filled"
//             name="email"
//             label="Email"
//             type="email"
//             required
//             value={formData.email}
//             onChange={handleChange}
//             error={!!errors.email}
//             helperText={errors.email}
//             className={classes.input}
//           />
//           <TextField
//             fullWidth
//             variant="filled"
//             name="password"
//             label="Password"
//             type="password"
//             required
//             value={formData.password}
//             onChange={handleChange}
//             error={!!errors.password}
//             helperText={errors.password}
//             className={classes.input}
//           />
//           <TextField
//             select
//             fullWidth
//             variant="filled"
//             name="department"
//             label="Select Department"
//             required
//             value={formData.department}
//             onChange={handleChange}
//             error={!!errors.department}
//             helperText={errors.department}
//             className={classes.select}
//           >
//             {departments.map((dept) => (
//               <MenuItem key={dept} value={dept}>
//                 {dept}
//               </MenuItem>
//             ))}
//           </TextField>
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             className={classes.button}
//           >
//             Sign in
//           </Button>
//         </form>
//       </Paper>
//     </div>
//   );
// }






import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/img/Login_bg.png";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    department: "",
  });

  const [errors, setErrors] = useState({});

  const departments = ["Admin", "Finance", "HR", "Sales", "IT"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (!formData.department) {
      newErrors.department = "Please select a department";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      console.log("Login Success:", formData);
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-md text-white">
        <h2 className="text-3xl font-bold text-center">
          ECO <span className="text-green-500">SOUL</span>
        </h2>
        <p className="text-center text-lg font-semibold mb-6">Data-Hive</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-white/80 text-black"
              required
            />
            {errors.email && (
              <p className="text-red-300 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-white/80 text-black"
              required
            />
            {errors.password && (
              <p className="text-red-300 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-white/80 text-black"
              required
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            {errors.department && (
              <p className="text-red-300 text-sm mt-1">{errors.department}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md font-bold"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
