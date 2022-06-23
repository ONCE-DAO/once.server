import Once, {
  OnceMode,
  OnceState,
} from "../../../../../../../Scenarios/localhost/tla/EAM/Thinglish/dev/3_services/Once.interface.mjs";
import fastify from "fastify";

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
  global: typeof globalThis = global;
  async start(): Promise<void> {

    let server = fastify();

    server.get("/", async (request, reply) => {
      reply.type("application/json").code(200);
      return { hello: "once!!!" };
    });

    this.runningPort = 3000;

    try {
      server.listen(3000, (err, address) => {
        if (err) throw err;
        console.log(`App listening on ${address}`);
      });
    } catch (err) {
      console.error(err);
    }
    console.log("ONCE STARTED AS NODE_JS WITH EXTERNAL MODULE");
  }
}
