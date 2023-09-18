import Error from "next/error";

function Page({ stars, statusCode }) {
  if (statusCode !== 200) {
    return <Error statusCode={statusCode} />;
  }

  return <div>Next stars: {stars}</div>;
}

Page.getInitialProps = async (ctx) => {
  try {
    const res = await fetch("https://api.github.com/repos/vercel/next.js");
    const json = await res.json();

    if (res.status >= 400) {
      return { stars: json.stargazers_count, statusCode: res.status };
    }

    return { stars: json.stargazers_count, statusCode: 200 };
  } catch (error) {
    return { stars: null, statusCode: 503 };
  }
};

export default Page;
