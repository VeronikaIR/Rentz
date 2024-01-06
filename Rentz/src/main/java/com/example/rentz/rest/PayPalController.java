package com.example.rentz.rest;


import com.example.rentz.data.domain.PayPalClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
@RequestMapping(value = "/paypal")
public class PayPalController {

    private final PayPalClient payPalClient;

    @Autowired
    PayPalController(PayPalClient payPalClient) {
        this.payPalClient = payPalClient;
    }

    @PostMapping(value = "/make/payment")
    public Map<String, Object> makePayment(@RequestParam("sum") String sum) {
        return payPalClient.createPayment(sum);
    }

    @PostMapping(value = "/complete/payment")
    public ResponseEntity<Map<String, Object>> completePayment(@RequestBody Map<String, String> payload) {
        String paymentId = payload.get("paymentId");
        String payerId = payload.get("PayerID");

        return ResponseEntity.ok(payPalClient.completePayment(paymentId, payerId));
    }
}
