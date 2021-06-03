package com.ex;

import com.ex.pojos.*;
import io.vertx.core.*;
import io.vertx.core.json.*;
import io.vertx.ext.unit.Async;
import io.vertx.ext.unit.TestContext;
import io.vertx.ext.unit.junit.RunTestOnContext;
import io.vertx.ext.unit.junit.VertxUnitRunner;
import org.junit.*;
import org.junit.runner.RunWith;

@RunWith(VertxUnitRunner.class)
public class TestMainVerticle {

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
  public void checkThatTheIndexPageIsServed(TestContext testContext) {
    Async async = testContext.async();
    vertx.createHttpClient().getNow(port, "localhost", "/", response -> {
      testContext.assertEquals(response.statusCode(), 200);
      testContext.assertEquals(response.headers().get("content-type"), "text/html;charset=UTF-8");
      response.bodyHandler(body -> {
        testContext.assertTrue(body.toString().contains("<title>React App</title>"));
        async.complete();
      });
    });
  }
}
