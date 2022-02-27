class TokenService {
    constructor(accessToken = null) {
        this.accessToken = accessToken;
    }

    getAccessToken() {
        return this.accessToken;
    }

    setAccessToken(accessToken) {
        this.accessToken = accessToken;
    }
}

const tokenService = new TokenService();

export default tokenService;
