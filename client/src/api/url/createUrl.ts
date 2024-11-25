export default (endpoint: string) => {
  const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT as string;
  return `${API_ENDPOINT}${endpoint}`;
};
