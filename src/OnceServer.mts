import Once, {
  OnceMode,
  OnceState,
} from "../../../../Once/dist/once.ts/main/3_services/Once.interface.mjs";
//@ts-ignore
import fastify from "../../node_modules/fastify/fastify.js";

export default class OnceNodeServer implements Once {
  ENV = process.env;
  creationDate: Date;
  mode = OnceMode.NODE_JS;
  state = OnceState.INITIALIZED;
  runningPort: number | undefined;

  static async start() {
    return new OnceNodeServer();
  }

  constructor() {
    this.creationDate = new Date();
  }
  async start(): Promise<void> {
    // WATCHMODE
    if (process.env.NODE_ENV === "watch") {
      setInterval(function () {
        console.log("timer that keeps nodejs processing running");
      }, 1000 * 60 * 60);
    }
    let server = fastify();
    //@ts-ignore

    server.get("/", async (request, reply) => {
      reply.type("application/json").code(200);
      return { hello: "world" };
    });

    this.runningPort = 3000;

    //@ts-ignore
    server.listen(3000, (err, address) => {
      if (err) throw err;
      // console.log(`App listening on ${address}`);
    });

    console.log("ONCE STARTED AS NODE_JS, EXTERNAL MODULE");
  }
}
