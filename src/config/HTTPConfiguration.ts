export interface IHTTPConfiguration {
  port: string;
}

const HTTPConfiguration: IHTTPConfiguration = {
  port: process.env.SERVER_PORT!,
};

export default HTTPConfiguration;
