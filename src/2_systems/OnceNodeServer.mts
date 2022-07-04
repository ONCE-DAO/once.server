import { NodeOnce, OnceMode, OnceState, Once } from "ior:esm:/tla.EAM.Once[build]";
import DefaultOnceWebServer from "ior:esm:/tla.EAM.Once.Server.WebServer[build]";

export default class OnceNodeServer extends NodeOnce {
  webserver: DefaultOnceWebServer | undefined;
  mode = OnceMode.NODE_JS;
  state = OnceState.INITIALIZED;

  async start(): Promise<void> {
    console.log("OnceNodeServer started");
    await DefaultOnceWebServer.start();
  }

  static start():Promise<Once>{
    return super.start()
  }
}
