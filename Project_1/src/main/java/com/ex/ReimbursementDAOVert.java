package com.ex;
/**
 * Represents the Reimbursement Verticle
 * @author Kevin Altieri
 */

import com.ex.pojos.*;
import io.vertx.core.*;
import io.vertx.core.eventbus.*;
import io.vertx.core.json.*;
import io.vertx.ext.mongo.*;
import io.vertx.ext.web.*;
import org.apache.log4j.*;
import org.apache.logging.log4j.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.util.*;

public class ReimbursementDAOVert extends AbstractVerticle {

  private MongoClient client;
//  Logger rootLogger = LogManager.getRootLogger();


  /**
   * @param startPromise Represents the writable side of an action that may, or may not, have occurred yet for the main dao
   */
  @Override
  public void start(Promise<Void> startPromise) {
//    org.apache.log4j.Logger rootLogger = org.apache.log4j.Logger.getLogger("Reimbursement Verticle");
//    BasicConfigurator.configure();
    final EventBus eventBus = vertx.eventBus();
    eventBus.consumer("ReimbursementConfig", object -> {
      client = MongoClient.createShared(vertx, (JsonObject)object.body());
    });
//    rootLogger.info("Starting up reimbursement dao verticle");
  }

  /**
   * @param vertx the current non clustered interface
   * @param config the configuration needed to set up connection to the mongo client.  Used as a back up (and for testing)
   */
  public void setClient(Vertx vertx, JsonObject config) {
    client = MongoClient.createShared(vertx, config);
  }

  /**
   * <p>Gets all reimbursements</p>
   * @param routingContext The context for handling a request
   */
  public void getAll(RoutingContext routingContext) {
    List<Reimbursement> reimbursements = new ArrayList<>();
    client.find("reimbursement", new JsonObject(), results -> {
      if (results.succeeded()) {
        for (JsonObject json : results.result()) {
          reimbursements.add(new Reimbursement(json));
        }
//        rootLogger.info("List of Reimbursements has been found - 200");
        routingContext.response()
          .setStatusCode(200)
          .putHeader("content-type", "application/json; charset=utf-8")
          .end(Json.encodePrettily(reimbursements));
      } else {
//        rootLogger.info(results.cause());
//        rootLogger.info("404");
        routingContext.response().setStatusCode(404).end();
      }
    });
  }

  /**
   * <p>Gets all reimbursements by a provided user id</p>
   * @param routingContext The context for handling a request
   */
  public void getAllById(RoutingContext routingContext) {
    final String employeeId = routingContext.request().getParam("id");
    List<Reimbursement> reimbursements = new ArrayList<>();
    client.find("reimbursement", new JsonObject().put("employee", employeeId), results -> {
      if (results.succeeded()) {
        for (JsonObject json : results.result()) {
          reimbursements.add(new Reimbursement(json));
        }
//        rootLogger.info("List of Reimbursements by ID have been found - 200");
        routingContext.response()
          .setStatusCode(200)
          .putHeader("content-type", "application/json; charset=utf-8")
          .end(Json.encodePrettily(reimbursements));
      } else {
//        rootLogger.info(results.cause());
//        rootLogger.info("404");
        routingContext.response().setStatusCode(404).end();
      }
    });
  }



  /**
   * <p>Adds a single reimbursement from routing context</p>
   * @param routingContext The context for handling a request
   */
  public void addOne(RoutingContext routingContext) {
    Reimbursement reimbursement = new Reimbursement(routingContext.getBodyAsJson());
    client.insert("reimbursement", reimbursement.toJson(), result -> {
      if(result.succeeded()) {
//        rootLogger.info("New Reimbursement has been successfully added - 201");
        reimbursement.set_id(result.result());
        routingContext.response()
          .setStatusCode(201)
          .putHeader("content-type", "application/json; charset=windows-1252")
          .end(Json.encodePrettily(reimbursement));
      } else {
//        rootLogger.info(result.cause());
//        rootLogger.info("400");
        routingContext.response().setStatusCode(400).end();
      }
    });
  }

  /**
   * <p>Finds a reimbursement by ID, sets pending to false, and updates the approved and manager fields by context</p>
   * @param routingContext The context for handling a request
   */
  public void updateOne(RoutingContext routingContext) {
    final String id = routingContext.getBodyAsJson().getString("_id");
    final boolean approved = routingContext.getBodyAsJson().getBoolean("approved");
    final String manager = routingContext.getBodyAsJson().getString("manager");
    if (id == null) {
//      rootLogger.info("No ID given - 400");
      routingContext.response().setStatusCode(400).end();
    } else {
      JsonObject update = new JsonObject().put("$set", new JsonObject().put("pending", false).put("approved", approved).put("manager", manager));
      client.findOneAndUpdate("reimbursement", new JsonObject().put("_id", id), update, results -> {
        if(results.succeeded()) {
//          rootLogger.info("Reimbursement successfully updated - 201");
          Reimbursement returnResult = new Reimbursement(results.result());
          returnResult.setPending(false);
          returnResult.setApproved(approved);
          returnResult.setManager(manager);
          routingContext.response()
            .setStatusCode(201)
            .putHeader("content-type", "application/json; charset=utf-8")
            .end(Json.encodePrettily(returnResult));
        }
        else {
//          rootLogger.info(results.cause());
//          rootLogger.info("404");
          routingContext.response().setStatusCode(404).end();
        }
      });
    }
  }
}
