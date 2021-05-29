export interface IIdentityConfiguration {
  authTokenKey: string;
  authRefreshTokenKey: string;
  authTokenExpiresIn: string;
  authRefreshTokenExpiresIn: string;
}

const IdentityConfiguration: IIdentityConfiguration = {
  authTokenKey: process.env.AUTH_TOKEN_KEY!,
  authRefreshTokenKey: process.env.AUTH_REFRESH_TOKEN_KEY!,
  authTokenExpiresIn: process.env.AUTH_TOKEN_EXPIRES_IN!,
  authRefreshTokenExpiresIn: process.env.AUTH_REFRESH_TOKEN_EXPIRES_IN!,
};

export default IdentityConfiguration;
