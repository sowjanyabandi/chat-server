const express = require("express");
const { Router } = express;

const messages = ["Hello world", "good bye"];

function factory(stream) {
  const router = new Router();

  function onStream(request, response) {
    const data = JSON.stringify(messages);
    console.log("data test:", data);
    stream.updateInit(data);
    stream.init(request, response);
  }
  router.get("/stream", onStream);

  function onMessage(request, response) {
    const { text } = request.body;
    messages.push(text);
    const data = JSON.stringify(messages);
    stream.send(data);
    return response.send(text);
  }
  router.post("/message", onMessage);

  return router;
}

module.exports = factory;
