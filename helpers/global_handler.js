import nc from "next-connect";
// import someCommonMiddleware from "..some-common-middlware-path";

export function handle() {
  //   return nc(config).use(someCommonMiddleware);
  return nc({
    onError(error, req, res) {
      res.status(501).json({ error: `Something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
      res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
  });
}

export default handle;
