package com.ex.pojos;
/**
 * Represents the User
 * @author Kevin Altieri
 */

import io.vertx.core.json.*;
import org.bson.types.*;

import java.util.*;

public class User {

  private String _id;
  private String email;
  private String password;
  private String firstName;
  private String lastName;
  private boolean manager;
  private List<String> reimbursementRequests;

  public User() {}

  public User (String email, String password, String firstName, String lastName) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.manager = false;
    reimbursementRequests = new ArrayList<>();
  }

  public User(JsonObject entries) {
    this._id = (String) entries.getValue("_id");
    this.email = (String)entries.getValue("email");
    this.password = (String)entries.getValue("password");
    this.firstName = (String)entries.getValue("firstName");
    this.lastName = (String)entries.getValue("lastName");
    if(entries.getValue("manager") != null) {
      this.manager = (Boolean) entries.getValue("manager");
    }
    reimbursementRequests = new ArrayList<>();
    if(entries.getJsonArray("reimbursementRequests") != null) {
      JsonArray array = (JsonArray)entries.getValue("reimbursementRequests");
      for(Object obj : array) {
        reimbursementRequests.add(obj.toString());
      }
    }
  }

  public JsonObject toJson() {
    JsonObject result = new JsonObject();
    result.put("email", email)
      .put("password", password)
      .put("firstName", firstName)
      .put("lastName", lastName)
      .put("manager", manager)
      .put("reimbursementRequests", reimbursementRequests);
    return result;
  }

  public String get_id() {
    return _id;
  }

  public void set_id(String _id) {
    this._id = _id;
  }

  public String getEmail() { return email; }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public boolean isManager() {
    return manager;
  }

  public void setManager(boolean manager) {
    this.manager = manager;
  }

  public List<String> getReimbursementRequests() {
    return reimbursementRequests;
  }

  public void setReimbursementRequests(List<String> reimbursementRequests) {
    this.reimbursementRequests = new ArrayList<>(reimbursementRequests);
  }

  public void addReimbursementRequest(String reimbursementRequest) {
    reimbursementRequests.add(reimbursementRequest);
  }

  @Override
  public String toString() {
    return "User{" +
      "email='" + email + '\'' +
      ", firstName='" + firstName + '\'' +
      ", lastName='" + lastName + '\'' +
      '}';
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    User user = (User) o;
    return get_id().equals(user.get_id()) &&
      getEmail().equals(user.getEmail());
  }

  @Override
  public int hashCode() {
    return Objects.hash(get_id(), getEmail());
  }
}
