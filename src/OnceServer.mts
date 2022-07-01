// TODO@MERGE remove npm dependency when moving back Server to own module
import { BaseNodeOnce } from "ior:esm:/tla.EAM.Once[dev-merge]";
import { EAMD } from "ior:esm:/tla.EAM.Once[dev-merge]";
import { OnceMode, OnceState } from "ior:esm:/tla.EAM.Once[dev-merge]";

import DefaultOnceWebserver from "ior:esm:/tla.EAM.Once.Server.OnceWebserver[build]";

export default class OnceNodeServer extends BaseNodeOnce {
  ENV = process.env;
  creationDate: Date;
  mode = OnceMode.NODE_JS;
  state = OnceState.INITIALIZED;
  runningPort: number | undefined = 3000;

  constructor(eamd: EAMD) {
    super(eamd);
    this.creationDate = new Date();
  }
  global: typeof globalThis = global;

  webserver: DefaultOnceWebserver | undefined;

  async start(): Promise<void> {

    await DefaultOnceWebserver.start();
    console.log("ONCE STARTED AS NODE_JS WITH EXTERNAL MODULE");
  }


}
