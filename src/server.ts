import { server } from "./app";
import configuration from "./config";

server.listen(configuration.port || 3333, async () => {
  console.log("running on port 3333");
});
