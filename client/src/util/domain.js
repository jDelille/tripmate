const newLocal = "development";
const newLocal_1 = "production";
export default process.env.NODE_ENV === newLocal
  ? "http://localhost:3535"
  : process.env.NODE_ENV === newLocal_1 &&
    "https://travel-plan-site.herokuapp.com";
