const { sql, poolPromise } = require("./db");
// const bcrypt = require("bcryptjs");

async function userSignUp(username, email, password) {
  try {
    const pool = await poolPromise;

    // Check if email already exists
    // const emailCheck = await pool
    //   .request()
    //   .input("email", sql.VarChar, email)
    //   .query("SELECT email FROM Users WHERE email = @email");

    // if (emailCheck.recordset.length > 0) {
    //   return { success: false, message: "Email already registered" };
    // }

    // Hash password before storing
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    await pool
      .request()
      .input("username", sql.VarChar, username)
      .input("email", sql.VarChar, email)
      // .input("password", sql.VarChar, hashedPassword)
      .input("password", sql.VarChar, password)

      .query(
        "INSERT INTO USERS (username, email, password) VALUES (@username, @email, @password)"
      );

    return { success: true, message: "User registered successfully" };
  } catch (error) {
    console.error("❌ Database Error:", error);
    return { success: false, message: "Error registering user" };
  }
}

// Login
async function Login(username, password) {
  try{
    const pool = await poolPromise;
    await pool.request()
          .input("username", sql.VarChar, username)
          // .input("password", sql.VarChar, password)

          .query("SELECT (username, password) FROM USERS WHERE username = @username");

          return{success: true, message: "Login successfully"};
  }catch(error){
    return {success: false, message: "Error loging in"}
  }
}

module.exports = { userSignUp, Login };
