import { AbstractNodeOnce, OnceMode, OnceState } from "ior:esm:/tla.EAM.Once[build]";
import DefaultOnceWebserver from "ior:esm:/tla.EAM.Once.Server.WebServer[build]";

export default class OnceNodeServer extends AbstractNodeOnce {
  webserver: DefaultOnceWebserver | undefined;
  mode = OnceMode.NODE_JS;
  state = OnceState.INITIALIZED;

  async start(): Promise<void> {
    console.log("OnceNodeServer started");
    await DefaultOnceWebserver.start();

  }
}
