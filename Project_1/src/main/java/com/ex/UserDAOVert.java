package com.ex;

import com.ex.pojos.*;
import io.vertx.core.*;
import io.vertx.core.eventbus.*;
import io.vertx.core.json.*;
import io.vertx.ext.mongo.*;
import io.vertx.ext.web.*;
import io.vertx.ext.web.*;
import org.apache.log4j.*;
import org.apache.logging.log4j.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.util.*;

public class UserDAOVert extends AbstractVerticle {

  private MongoClient client;
//  Logger rootLogger = LogManager.getRootLogger();

  /**
   * <p>Sets up mongo client config through the event bus</p>
   * @param startPromise Represents the writable side of an action that may, or may not, have occurred yet for the main dao
   */
  @Override
  public void start(Promise<Void> startPromise) {
//    org.apache.log4j.Logger rootLogger = org.apache.log4j.Logger.getLogger("Main Verticle");
//    BasicConfigurator.configure();
    final EventBus eventBus = vertx.eventBus();
    eventBus.consumer("UserConfig", object -> {
      client = MongoClient.createShared(vertx, (JsonObject)object.body());
    });
  }

  /**
   * @param vertx the current non clustered interface
   * @param config the configuration needed to set up connection to the mongo client.  Used as a back up (and for testing)
   */
  public void setClient(Vertx vertx, JsonObject config) {
    client = MongoClient.createShared(vertx, config);
  }

  /**
   * <p>Grabs all Users that are employees</p>
   * @param routingContext The context for handling a request
   */
  public void getEmployees(RoutingContext routingContext) {
    List<User> users = new ArrayList<>();
    client.find("user", new JsonObject().put("manager", false), results -> {
      if (results.succeeded()) {
        for (JsonObject json : results.result()) {
          users.add(new User(json));
        }
//        rootLogger.info("List of employees has been found and processed - 200");
        routingContext.response()
          .setStatusCode(200)
          .putHeader("content-type", "application/json; charset=utf-8")
          .end(Json.encodePrettily(users));
      } else {
//        rootLogger.info(results.cause());
//        rootLogger.info("404");
        routingContext.response().setStatusCode(404).end();
      }
    });
  }

  /**
   * <p>Gets all users</p>
   * @param routingContext The context for handling a request
   */
  public void getAll(RoutingContext routingContext) {
    List<User> users = new ArrayList<>();
    client.find("user", new JsonObject(), results -> {
      if (results.succeeded()) {
        for (JsonObject json : results.result()) {
          users.add(new User(json));
        }
//        rootLogger.info("List of users has been found and processed - 200");
        routingContext.response()
          .putHeader("content-type", "application/json; charset=utf-8")
          .end(Json.encodePrettily(users));
      } else {
//        rootLogger.info(results.cause());
//        rootLogger.info("404");
        routingContext.response().setStatusCode(404).end();
      }
    });
  }

  /**
   * <p>Adds one user.  Checks to make sure that the email has not been used before inserting</p>
   * @param routingContext The context for handling a request
   */
  public void addOne(RoutingContext routingContext) {
    User user = new User(routingContext.getBodyAsJson());
    client.find("user", new JsonObject().put("email", user.getEmail()), results -> {
      if(results.succeeded()) {
        if(results.result().size() != 0) {
//          rootLogger.info("Email is in use");
          User compare = new User(results.result().get(0));
          if (compare.getEmail().equals(user.getEmail())) {
//            rootLogger.info("Email is used by another user.");
            routingContext.response().setStatusCode(403).end();
            return;
          }
        }
//        rootLogger.info("Email in use belongs to current user.");
        client.save("user", user.toJson(), result -> {
          if(result.succeeded()) {
//            rootLogger.info("User saved with ID added - 201");
            user.set_id(result.result());
            routingContext.response()
              .setStatusCode(201)
              .putHeader("content-type", "application/json; charset=windows-1252")
              .end(Json.encodePrettily(user));
          } else {
//            rootLogger.info(result.cause());
//            rootLogger.info("400");
            result.cause().printStackTrace();
            routingContext.response().setStatusCode(400).end();
          }
        });
      }
      else {
//        rootLogger.info(results.cause());
//        rootLogger.info("400");
        results.cause().printStackTrace();
        routingContext.response().setStatusCode(404).end();
      }
    });
  }

  /**
   * <p>Finds one user by email.</p>
   * @param routingContext The context for handling a request
   */
  public void getOne(RoutingContext routingContext) {
    final String email = routingContext.request().getParam("email");
    if (email == null) {
//      rootLogger.info("Email is null - 400");
      routingContext.response().setStatusCode(400).end();
    } else {
      client.find("user", new JsonObject().put("email", email), results -> {
        if(results.succeeded()) {
//          rootLogger.info("User successfully found - 200");
          routingContext.response()
            .setStatusCode(200)
            .putHeader("content-type", "application/json; charset=utf-8")
            .end(Json.encode(results.result()));
        }
        else {
//          rootLogger.info(results.cause());
//          rootLogger.info("400");
          results.cause().printStackTrace();
          routingContext.response().setStatusCode(400).end();
        }
      });
    }
  }

  /**
   * <p>First checks to see if the new email is already in use.  If not, it updates the user by its id</p>
   * @param routingContext The context for handling a request
   */
  public void updateOne(RoutingContext routingContext) {
    User update = new User(routingContext.getBodyAsJson());
    update.set_id(routingContext.getBodyAsJson().getString("_id"));

    //Query = find by email
    client.find("user", new JsonObject().put("email", update.getEmail()), results -> {
      if(results.succeeded()) {
        if(results.result().size() < 2) {
          if(results.result().size() == 1) {
            User check = new User(results.result().get(0));
            check.set_id(results.result().get(0).getString("_id"));
            if (!check.equals(update)) {
//              rootLogger.info("More than 2 emails are in use - 403");
              routingContext.response().setStatusCode(403).end();
              return;
            }
          }
          //Query = if initial query returned the same email, find once again and replace
          client.findOneAndReplace("user", new JsonObject().put("_id", update.get_id()), JsonObject.mapFrom(update), result -> {
            if(result.succeeded()) {
//              rootLogger.info("User updated successfully - 201");
              routingContext.response()
                .setStatusCode(201)
                .putHeader("content-type", "application/json; charset=utf-8")
                .end(Json.encodePrettily(results.result()));
            }
            else {
//              rootLogger.info(results.cause());
//              rootLogger.info("404");
              results.cause().printStackTrace();
              routingContext.response().setStatusCode(404).end();
            }
          });
        }
        else {
//          rootLogger.info("More than 2 emails are in use - 403");
          routingContext.response().setStatusCode(403).end();
        }
      }
      else {
//        rootLogger.info(results.cause());
//        rootLogger.info("404");
        results.cause().printStackTrace();
        routingContext.response().setStatusCode(404).end();
      }
    });
  }

}
