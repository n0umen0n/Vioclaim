const { Api, JsonRpc, RpcError } = require("eosjs");
const { JsSignatureProvider } = require("eosjs/dist/eosjs-jssig");
const { TextEncoder, TextDecoder } = require("util");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const defaultPrivateKey = "XXXXXXXXXXXXXXPutprivatekeyhereXXXXXXXXXXXXX";
const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);

const rpc = new JsonRpc("https://api.main.alohaeos.com", { fetch });

const api = new Api({
  rpc,
  signatureProvider,
  textDecoder: new TextDecoder(),
  textEncoder: new TextEncoder(),
});

exports.handler = (event, context, callback) => {
  try {
    api.transact(
      {
        actions: [
          {
            account: "labelaarbaro",
            name: "checkin",
            authorization: [
              {
                actor: "vladislav.x",
                permission: "active",
              },
            ],
            data: {
              owner: "vladislav.x",
            },
          },
        ],
      },
      {
        blocksBehind: 1,
        expireSeconds: 30,
      }
    );
  } catch (error) {
    console.log(error);
    return context.logStreamName;
  }
};
