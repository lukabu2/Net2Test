export default async function token() {
  let headers = {
    accept: "text/plain",
    "Content-Type": "application/json-patch+json",
  };
  return axios
    .post(
      "https://pimb2bqaapi.pimalion.cloud/app/Account/Login",
      {
        username: "practicalTest@gmail.com",
        password: "practicalTest@gmail.com2022!",
      },
      {
        headers,
      }
    )
    .then((response) => {
      if (response.status === 200) {
        return response.data.data.tokenResponse.token;
      }
    });
}
