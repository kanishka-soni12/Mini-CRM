const Login = () => {
  const handleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google?prompt=select_account';
  };

  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
};

export default Login;
