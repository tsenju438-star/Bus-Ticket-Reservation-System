package com.Bus.TicketReservation.DTO;

public class LoginResponse {

    private String message;
    private String username;
    private long mobile;

    public LoginResponse() {
    }

    public LoginResponse(String message, String username, long mobile) {
        this.message = message;
        this.username = username;
        this.mobile = mobile;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public long getMobile() {
        return mobile;
    }

    public void setMobile(long mobile) {
        this.mobile = mobile;
    }
}
