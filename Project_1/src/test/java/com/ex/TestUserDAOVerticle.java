package com.ex;

import com.ex.pojos.*;
import com.fasterxml.jackson.core.*;
import com.fasterxml.jackson.core.type.*;
import com.fasterxml.jackson.databind.*;
import io.vertx.core.*;
import io.vertx.core.json.*;
import io.vertx.ext.unit.Async;
import io.vertx.ext.unit.TestContext;
import io.vertx.ext.unit.junit.RunTestOnContext;
import io.vertx.ext.unit.junit.VertxUnitRunner;
import io.vertx.ext.web.common.template.*;
import org.junit.*;
import org.junit.runner.RunWith;
import sun.nio.ch.*;

import java.io.*;
import java.util.*;

@RunWith(VertxUnitRunner.class)
public class TestUserDAOVerticle {

  private static int MONGO_PORT = 12345;
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

    MainVerticle mainVert = new MainVerticle();
    UserDAOVert userDAOVert = new UserDAOVert();
    userDAOVert.setClient(vertx, options.getConfig());
    vertx.deployVerticle(mainVert, options, testContext.asyncAssertSuccess());
  }

  @After
  public void tearDown(TestContext context) {
    vertx.close(context.asyncAssertSuccess());
  }

  @Test
  public void getEmployees(TestContext context) {
    Async async = context.async();
    vertx.createHttpClient().get(port, "localhost", "/api/employees/")
      .putHeader("content-type", "application/json")
      .handler(response -> {
        context.assertTrue(response.headers().get("content-type").contains("application/json"));
        response.bodyHandler(body -> {
          ObjectMapper map = new ObjectMapper();
          try {
            User[] users = map.readValue(body.toString(), User[].class);
            context.assertEquals(users[3].getFirstName(), "NotManager");
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
    vertx.createHttpClient().get(port, "localhost", "/api/users/")
      .putHeader("content-type", "application/json")
      .handler(response -> {
      context.assertTrue(response.headers().get("content-type").contains("application/json"));
      response.bodyHandler(body -> {
      ObjectMapper map = new ObjectMapper();
        try {
          User[] users = map.readValue(body.toString(), User[].class);
          context.assertEquals(users[0].getFirstName(), "c");
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
    Async async = context.async();
    final String json = Json.encodePrettily(new User("Test3", "Test3", "Test3", "Test3"));
    final String length = Integer.toString(json.length());
    vertx.createHttpClient().post(port, "localhost", "/api/users/add")
      .putHeader("content-type", "application/json")
      .putHeader("content-length", length)
      .handler(response -> {
        context.assertEquals(response.statusCode(), 201);
        context.assertTrue(response.headers().get("content-type").contains("application/json"));
        response.bodyHandler(body -> {
          final User user = Json.decodeValue(body.toString(), User.class);
          context.assertEquals(user.getEmail(), "Test3");
          context.assertEquals(user.getPassword(), "Test3");
          context.assertEquals(user.getFirstName(), "Test3");
          context.assertEquals(user.getLastName(), "Test3");
          async.complete();
        });
      })
      .write(json)
      .end();
  }

  @Test
  public void getOne(TestContext context) {
    Async async = context.async();
    vertx.createHttpClient().get(port, "localhost", "/api/users/Kevin")
      .putHeader("content-type", "application/json")
      .handler(response -> {
        context.assertTrue(response.headers().get("content-type").contains("application/json"));
        response.bodyHandler(body -> {
          ObjectMapper map = new ObjectMapper();
          try {
            User[] user = map.readValue(body.toString(), User[].class);
            context.assertEquals(user[0].getFirstName(), "Kevin");
          } catch (JsonProcessingException e) {
            e.printStackTrace();
          }
          async.complete();
        });
      })
      .end();
  }

  @Test
  public void updateOne(TestContext context) {
    Async async = context.async();
    List<String> testing = new ArrayList<>();
    testing.add("Potato");
    testing.add("Asparagus");
    testing.add("Fruit");
    User update = new User("a", "b", "c", "d");
    update.setReimbursementRequests(testing);
    final String json = Json.encodePrettily(update.toJson().put("_id", "6095e09d574b1a425aadbc2d"));
    final String length = Integer.toString(json.length());
    vertx.createHttpClient().put(port, "localhost", "/api/users/update")
      .putHeader("content-type", "application/json")
      .putHeader("content-length", length)
      .handler(response -> {
        context.assertEquals(response.statusCode(), 201);
        context.assertTrue(response.headers().get("content-type").contains("application/json"));
        response.bodyHandler(body -> {
          ObjectMapper map = new ObjectMapper();
          try {
            User[] user = map.readValue(body.toString(), User[].class);
            context.assertEquals(user[0].getEmail(), "a");
            context.assertEquals(user[0].getPassword(), "b");
            context.assertEquals(user[0].getFirstName(), "c");
            context.assertEquals(user[0].getLastName(), "d");
            context.assertEquals(user[0].getReimbursementRequests().size(), 3);
          } catch (JsonProcessingException e) {
            e.printStackTrace();
          }
          async.complete();
        });
      })
      .write(json)
      .end();
  }
}
