package com.ex.pojos;
/**
 * Represents the Reimbursements
 * @author Kevin Altieri
 */
import io.vertx.core.json.*;
import org.bson.types.*;

import java.time.*;
import java.util.*;

public class Reimbursement {

    private String _id;
    private String employee;
    private String money;
    private String message;
    private String date;
    private boolean pending;
    private boolean approved;
    private String manager;

    public Reimbursement() {}

    public Reimbursement(String employee, String money, String message, String date) {
        this.employee = employee;
        this.money = money;
        this.message = message;
        this.date = date;
        this.pending = true;
        this.approved = false;
        this.manager = "";
    }

  /**
   * @param entries Helps map a Json to a new reimbursement
   */
    public Reimbursement(JsonObject entries) {
      this._id = (String) entries.getValue("_id");
      this.employee = (String)entries.getValue("employee");
      this.money = (String)entries.getValue("money");
      this.message = (String)entries.getValue("message");
      this.date = (String) entries.getValue("date");
      this.pending = true;
      this.approved = false;
      this.manager = "";
      if(entries.containsKey("pending")) {
        this.pending = (Boolean) entries.getValue("pending");
      }
      if(entries.containsKey("approved")) {
        this.approved = (Boolean) entries.getValue("approved");
      }
      if(entries.containsKey("manager")) {
        this.manager = (String) entries.getValue("manager");
      }
    }

  /**
   * @return A new json that specifically ignores the id field to allow the mongo client to auto generate one
   */
    public JsonObject toJson() {
      JsonObject result = new JsonObject();
      result.put("employee", employee)
        .put("money", money)
        .put("message", message)
        .put("date", date)
        .put("pending", pending)
        .put("approved", approved)
        .put("manager", manager);
      return result;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getEmployee() {
        return employee;
    }

    public void setEmployee(String employee) {
        this.employee = employee;
    }

    public String getMoney() {
        return money;
    }

    public void setMoney(String money) {
        this.money = money;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public boolean isPending() { return pending; }

    public void setPending(boolean pending) { this.pending = pending; }

    public boolean isApproved() {
        return approved;
    }

    public void setApproved(boolean approved) {
        this.approved = approved;
    }

    public String getManager() {
        return manager;
    }

    public void setManager(String manager) {
        this.manager = manager;
    }

    @Override
    public String toString() {
        return "Reimbursement{" +
                "employee='" + employee + '\'' +
                ", money='" + money + '\'' +
                ", message='" + message + '\'' +
                ", date='" + date + '\'' +
                ", approved=" + approved +
                ", manager='" + manager + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Reimbursement that = (Reimbursement) o;
        return get_id().equals(that.get_id());
    }

    @Override
    public int hashCode() {
        return Objects.hash(get_id());
    }
}
