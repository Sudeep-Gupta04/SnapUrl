class LoginRequest {
  constructor(data) {
    this.username = data.username;
    this.password = data.password;
  }
}

class RegisterRequest {
  constructor(data) {
    this.username = data.username;
    this.email = data.email;
    this.password = data.password;
  }
}

class JwtAuthenticationResponse {
  constructor(token) {
    this.token = token;
  }
}

module.exports = {
  LoginRequest,
  RegisterRequest,
  JwtAuthenticationResponse
}; 