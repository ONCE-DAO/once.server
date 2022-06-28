// TODO@MERGE remove npm dependency when moving back Server to own module
import fastify, { FastifyInstance } from "fastify";
import { BaseNodeOnce } from "ior:esm:/tla.EAM.Once[dev]";
import { EAMD } from "ior:esm:/tla.EAM.Once[dev]";
import { OnceMode, OnceState } from "ior:esm:/tla.EAM.Once[dev]";
import mkdirp from 'mkdirp';

import { keygen } from 'tls-keygen';

import fastifyStatic from "@fastify/static"
import path from "path";
import { existsSync, readFileSync } from "fs";

export default class OnceNodeServer extends BaseNodeOnce {
  ENV = process.env;
  creationDate: Date;
  mode = OnceMode.NODE_JS;
  state = OnceState.INITIALIZED;
  runningPort: number | undefined = 3000;

  _server: FastifyInstance | undefined;

  constructor(eamd: EAMD) {
    super(eamd);
    this.creationDate = new Date();
  }
  global: typeof globalThis = global;

  get tlsPath(): string {
    return path.join(ONCE.eamd.scenario.eamdPath, ONCE.eamd.scenario.scenarioPath, 'tls')
  }

  get tlsKeyPath(): string {
    return path.join(this.tlsPath, 'key.pem');
  }

  get tlsCertPath(): string {
    return path.join(this.tlsPath, 'cert.pem');
  }

  async start(): Promise<void> {

    let scenario = ONCE.eamd.scenario;
    const tlsPaths = { key: this.tlsKeyPath, cert: this.tlsCertPath }


    if (scenario.name === "localhost") {
      if (!existsSync(tlsPaths.key)) {
        await mkdirp(path.dirname(tlsPaths.key))
        await keygen({ ...tlsPaths, entrust: false });
      }
    }

    let server = fastify({
      logger: true,
      http2: true,
      https: {
        allowHTTP1: true, // fallback support for HTTP1
        key: readFileSync(tlsPaths.key),
        cert: readFileSync(tlsPaths.cert)
      }
    });


    let webRoot = path.join(scenario.eamdPath, scenario.webRoot);

    server.register(fastifyStatic, {
      root: webRoot,
      prefix: '/' + webRoot.split('/').pop() + '/',
      index: false,
      list: {
        format: 'html',
        render: this.buildDirectoryPage
      }
    })

    try {
      server.listen({ port: this.runningPort })

    } catch (err) {
      console.error(err);
    }
    console.log("ONCE STARTED AS NODE_JS WITH EXTERNAL MODULE");
  }

  buildDirectoryPage(dirs: { href: string, name: string }[], files: { href: string, name: string }[]) {
    this;
    return `
<html><body>
<ul>
  ${dirs.map(dir => `<li><a href="${dir.href}">${dir.name}</a></li>`).join('\n  ')}
</ul>
<ul>
  ${files.map(file => `<li><a href="${file.href}">${file.name}</a></li>`).join('\n  ')}
</ul>
</body></html>
`
  }
}
