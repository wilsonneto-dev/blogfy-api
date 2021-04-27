interface IRandomTokenProvider {
  generate: () => Promise<string>;
}

export default IRandomTokenProvider;
