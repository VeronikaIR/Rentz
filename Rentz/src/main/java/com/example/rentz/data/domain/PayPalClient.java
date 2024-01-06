package com.example.rentz.data.domain;

import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;

import jakarta.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PayPalClient {

    private final APIContext apiContext;

    public PayPalClient() {
        String clientSecret = "EN1LZffLO1ai23cxHt3cWetCxdng5vW-QyGrsUSVW2v_f3Xv2dLsasd5Oh5og3t_1SdtTRSEaH6Rccwq";
        String clientId = "AcyICFQ9czLGKG09Au0rjmW68yySnjBGFSX0p7s6aJ5Q8mjINZVQIncesaQKLQ6XXqIQYdrDN7DA2BVO";
        this.apiContext = new APIContext(clientId, clientSecret, "sandbox");
    }

    public Map<String, Object> createPayment(String sum) {
        Map<String, Object> response = new HashMap<>();

        Amount amount = new Amount();
        amount.setCurrency("USD");
        amount.setTotal(sum);

        Transaction transaction = new Transaction();
        transaction.setAmount(amount);

        List<Transaction> transactions = new ArrayList<>();
        transactions.add(transaction);

        Payer payer = new Payer();
        payer.setPaymentMethod("paypal");

        Payment payment = new Payment();
        payment.setIntent("sale");
        payment.setPayer(payer);
        payment.setTransactions(transactions);

        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setCancelUrl("http://localhost:4200/cancel");
        redirectUrls.setReturnUrl("http://localhost:4200/");
        payment.setRedirectUrls(redirectUrls);

        try {
            Payment createdPayment = payment.create(apiContext);
            if (createdPayment != null) {
                List<Links> links = createdPayment.getLinks();
                String redirectUrl = links.stream()
                        .filter(link -> "approval_url".equals(link.getRel()))
                        .findFirst()
                        .map(Links::getHref)
                        .orElse("");

                response.put("status", "success");
                response.put("redirect_url", redirectUrl);
            }
        } catch (PayPalRESTException e) {
            handlePayPalException(e);
        }

        return response;
    }

    public Map<String, Object> completePayment(String paymentId, String payerId) {
        Map<String, Object> response = new HashMap<>();

        Payment payment = new Payment();
        payment.setId(paymentId);

        PaymentExecution paymentExecution = new PaymentExecution();
        paymentExecution.setPayerId(payerId);

        try {
            Payment createdPayment = payment.execute(apiContext, paymentExecution);
            if (createdPayment != null) {
                response.put("status", "success");
                //response.put("payment", createdPayment);
            }
        } catch (PayPalRESTException e) {
            handlePayPalException(e);
            response.put("status", "failed");
            response.put("error", e.getDetails().getMessage());
        }

        return response;
    }

    private void handlePayPalException(PayPalRESTException e) {
        System.err.println("Error happened during PayPal operation!");
        System.err.println(e.getDetails());
        // You can log or throw a custom exception here
    }
}
