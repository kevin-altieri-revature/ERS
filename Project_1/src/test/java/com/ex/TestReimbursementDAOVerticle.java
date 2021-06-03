package com.ex;

import com.ex.pojos.*;
import com.fasterxml.jackson.core.*;
import com.fasterxml.jackson.databind.*;
import io.vertx.core.*;
import io.vertx.core.json.*;
import io.vertx.ext.unit.Async;
import io.vertx.ext.unit.TestContext;
import io.vertx.ext.unit.junit.RunTestOnContext;
import io.vertx.ext.unit.junit.VertxUnitRunner;
import org.junit.*;
import org.junit.runner.RunWith;

import java.time.*;

@RunWith(VertxUnitRunner.class)
public class TestReimbursementDAOVerticle {

  private Vertx vertx;
  private int port;

  @Rule
  public RunTestOnContext rule = new RunTestOnContext();

  @Before
  public void deploy_verticle(TestContext testContext) {
    vertx = rule.vertx();
    port = 8080;

    DeploymentOptions options = new DeploymentOptions()
      .setConfig(new JsonObject()
        .put("http.port", 8080)
        .put("db_name", "test")
        .put("connection_string","mongodb://localhost:27017")
      );

    vertx.deployVerticle(MainVerticle.class.getName(), options, testContext.asyncAssertSuccess());
  }

  @After
  public void tearDown(TestContext context) {
    vertx.close(context.asyncAssertSuccess());
  }

  @Test
  public void getAllById(TestContext context) {
    Async async = context.async();
    vertx.createHttpClient().get(port, "localhost", "/api/reimbursements/6095e31a49bd076f7c18c23c")
      .putHeader("content-type", "application/json")
      .handler(response -> {
        context.assertTrue(response.headers().get("content-type").contains("application/json"));
        response.bodyHandler(body -> {
          ObjectMapper map = new ObjectMapper();
          try {
            Reimbursement[] reimbursements = map.readValue(body.toString(), Reimbursement[].class);
            context.assertEquals(reimbursements[0].getDate(), "5/11/2021");
            context.assertEquals(reimbursements[0].getMoney(), "50");
          } catch (JsonProcessingException e) {
            e.printStackTrace();
          }
          async.complete();
        });
      })
      .end();
  }

  @Test
  public void getAll(TestContext context) {
    Async async = context.async();
    vertx.createHttpClient().get(port, "localhost", "/api/reimbursements/")
      .putHeader("content-type", "application/json")
      .handler(response -> {
        context.assertTrue(response.headers().get("content-type").contains("application/json"));
        response.bodyHandler(body -> {
          ObjectMapper map = new ObjectMapper();
          try {
            Reimbursement[] reimbursements = map.readValue(body.toString(), Reimbursement[].class);
            context.assertEquals(reimbursements[0].getMoney(), "50");
          } catch (JsonProcessingException e) {
            e.printStackTrace();
          }
          async.complete();
        });
      })
      .end();
  }

  @Test
  public void addOne(TestContext context) {
    Reimbursement one = new Reimbursement("6095e31a49bd076f7c18c23c", "50", "Paying for lunch", "5/11/2021");
    Reimbursement two = new Reimbursement("6095e31a49bd076f7c18c23c", "200", "Work Dress", "3/15/2021");

    Async async = context.async();
    final String json = Json.encodePrettily(one);
    final String length = Integer.toString(json.length());
    vertx.createHttpClient().post(port, "localhost", "/api/reimbursements/add")
      .putHeader("content-type", "application/json")
      .putHeader("content-length", length)
      .handler(response -> {
        context.assertEquals(response.statusCode(), 201);
        context.assertTrue(response.headers().get("content-type").contains("application/json"));
        response.bodyHandler(body -> {
          final Reimbursement reimbursement = Json.decodeValue(body.toString(), Reimbursement.class);
          context.assertEquals(reimbursement.getEmployee(), "6095e31a49bd076f7c18c23c");
          context.assertEquals(reimbursement.getMoney(), "50");
          context.assertEquals(reimbursement.getMessage(), "Paying for lunch");
          context.assertEquals(reimbursement.getDate(), "5/11/2021");
          async.complete();
        });
      })
      .write(json)
      .end();
  }

  @Test
  public void updateOne(TestContext context) {
    Async async = context.async();
    JsonObject params = new JsonObject().put("_id", "609f6ec855f8992d2b45507b").put("approved", true).put("manager", "Kevin");
    final String json = Json.encodePrettily(params);
    final String length = Integer.toString(json.length());
    vertx.createHttpClient().put(port, "localhost", "/api/reimbursements/update")
      .putHeader("content-type", "application/json")
      .putHeader("content-length", length)
      .handler(response -> {
        context.assertEquals(response.statusCode(), 201);
        context.assertTrue(response.headers().get("content-type").contains("application/json"));
        response.bodyHandler(body -> {
          final Reimbursement reimbursement = Json.decodeValue(body.toString(), Reimbursement.class);
          context.assertEquals(reimbursement.getManager(), "Kevin");
          context.assertFalse(reimbursement.isPending());
          context.assertTrue(reimbursement.isApproved());
          async.complete();
        });
      })
      .write(json)
      .end();
  }
}
