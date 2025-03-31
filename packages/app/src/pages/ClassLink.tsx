// ?scope=full&redirect_uri=http%3A%2F%2Fclasslink.com%2Fcallback&client_id=c141934310952145edfeee3df2a4079d07f217add9a018&response_type=code&state=f3dhsde&_gl=1*1uax146*_ga*NjQ2MjM0NjYzLjE3NDE3MDA3NjM.*_ga_XR4VK1WY86*MTc0MjQ4OTI2OS42LjEuMTc0MjQ5MDEwOC4wLjAuMA..

export const ClassLink: React.FC = () => {
  const baseUrl = "https://launchpad.classlink.com/oauth2/v2/auth";
  const params = {
    scope: "profile",
    redirect_uri: "http://localhost:5173/classlink",
    client_id: "c1742489763722e1a8df623ae5305ba3ba3b48f840ba5aa",
    response_type: "code",
  };
  const url = new URL(baseUrl);
  const searchParams = new URLSearchParams(params);
  url.search = searchParams.toString();
  const finalUrl = url.toString();
  return (
    <h1>
      <a
        href="https://launchpad.classlink.com/oauth2/v2/auth?scope=profile&redirect_uri=http://localhost%3A5173%2Fclasslink&client_id=c1742489763722e1a8df623ae5305ba3b48f840ba5aa&response_type=code"
        target="_blank"
      >
        link
      </a>
    </h1>
  );
};
