import { OnceMode, OnceState, Once, AbstractNodeOnce } from "ior:esm:/tla.EAM.Once[build]";
import DefaultOnceWebServer from "ior:esm:/tla.EAM.Once.Server.WebServer[build]";

export default class OnceNodeServer extends AbstractNodeOnce {
  webserver: DefaultOnceWebServer | undefined;
  mode = OnceMode.NODE_JS;
  state = OnceState.INITIALIZED;

  async start(): Promise<void> {
    console.log("OnceNodeServer started");
    await DefaultOnceWebServer.start();
  }

  static start(): Promise<Once> {
    return super.start()
  }
}
