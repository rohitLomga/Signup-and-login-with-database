// import axios from "axios";
// import { useState } from "react";

// export const Login = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [message, setMessage] = useState('');

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         setMessage("");

//         try {
//             const response = await axios.post("http://localhost:5000/api/login", {
//                 username, password
//             });

//             setMessage(response.data.message);
//         } catch (error) {
//             setMessage(error.response?.data?.message || "Login Failed");
//         }
//     };

//     return (
//         <div>
//             <h1>Login</h1>
//             <p>{message}</p>
//             <form onSubmit={handleSubmit}>
//                 <label>Username</label><br />
//                 <input 
//                     type="text" 
//                     name="username" 
//                     value={username} 
//                     onChange={(e) => setUsername(e.target.value)} 
//                 /><br />

//                 <label>Password</label><br />
//                 <input 
//                     type="password" 
//                     name="password" 
//                     value={password} 
//                     onChange={(e) => setPassword(e.target.value)} 
//                 /><br />

//                 <button type="submit">Log in</button>
//             </form>
//         </div>
//     );
// };