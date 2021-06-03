package com.ex;

import io.vertx.config.*;
import io.vertx.core.*;
import io.vertx.core.eventbus.*;
import io.vertx.ext.mongo.*;
import io.vertx.ext.web.*;
import io.vertx.ext.web.handler.*;
import org.apache.log4j.*;
import org.apache.logging.log4j.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import static org.apache.logging.log4j.LogManager.getLogger;

public class MainVerticle extends AbstractVerticle {

  MongoClient client;
  org.apache.logging.log4j.Logger rootLogger = LogManager.getRootLogger();


  /**
   * <p>Sets up the UserDao and the ReimbursementDao, sets up the different routes and the config</p>
   * @param startPromise Represents the writable side of an action that may, or may not, have occurred yet for the main dao
   */
  @Override
  public void start(Promise<Void> startPromise) {
    //Responsible for dispatching the HTTP requests to the right handler
    BasicConfigurator.configure();
    rootLogger.info("Starting up main verticle");

    UserDAOVert userDao = new UserDAOVert();
    ReimbursementDAOVert reimbursementDao = new ReimbursementDAOVert();
    vertx.deployVerticle(userDao);
    vertx.deployVerticle(reimbursementDao);
    client = MongoClient.createShared(vertx, config());

    final EventBus eventBus = vertx.eventBus();
    eventBus.send("UserConfig", config());
    userDao.setClient(vertx, config());
    reimbursementDao.setClient(vertx, config());
    eventBus.send("ReimbursementConfig", config());

    Router router = Router.router(vertx);

    router.route("/").handler(routingContext -> {
      routingContext.reroute("/assets/build/index.html");
    });

    router.route("/assets/build*").handler(StaticHandler.create("assets/build"));
    router.route("/static*").handler(StaticHandler.create("assets/build/static"));

    router.route().handler(io.vertx.ext.web.handler.CorsHandler.create("*")
      .allowedMethod(io.vertx.core.http.HttpMethod.GET)
      .allowedMethod(io.vertx.core.http.HttpMethod.POST)
      .allowedMethod(io.vertx.core.http.HttpMethod.OPTIONS)
      .allowedMethod(io.vertx.core.http.HttpMethod.PUT)
      .allowedHeader("Access-Control-Request-Method")
      .allowedHeader("Access-Control-Allow-Credentials")
      .allowedHeader("Access-Control-Allow-Origin")
      .allowedHeader("Access-Control-Allow-Headers")
      .allowedHeader("Content-Type"));

    router.get("/api/users").handler(userDao::getAll);
    router.get("/api/employees").handler(userDao::getEmployees);
    router.get("/api/users/:email").handler(userDao::getOne);
    router.route("/api/users*").handler(BodyHandler.create());
    router.post("/api/users/add").handler(userDao::addOne);
    router.put("/api/users/update").handler(userDao::updateOne);

    router.get("/api/reimbursements").handler(reimbursementDao::getAll);
    router.route("/api/reimbursements*").handler(BodyHandler.create());
    router.post("/api/reimbursements/add").handler(reimbursementDao::addOne);
    router.get("/api/reimbursements/:id").handler(reimbursementDao::getAllById);
    router.put("/api/reimbursements/update").handler(reimbursementDao::updateOne);



    ConfigRetriever retriever = ConfigRetriever.create(vertx);
    retriever.getConfig(
      config -> {
        if (config.failed()) {
          startPromise.fail(config.cause());
        } else {
          // Create the HTTP server and pass
          // the "accept" method to the request
          // handler.
          vertx
            .createHttpServer()
            .requestHandler(router)
            .listen(
              // Retrieve the port from the
              // config, default to 8080.
              config().getInteger("http.port", 8080),
              result -> {
                if (result.succeeded()) {
                  startPromise.complete();
                } else {
                  startPromise.fail(result.cause());
                }
              }
            );
        }
      }
    );
  }
}
