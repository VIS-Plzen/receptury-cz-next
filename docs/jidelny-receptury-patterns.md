# Receptury API patterns

Following examples explains some frequent API workflows. Examples are demonstrated using CURL code, which was not tested and should be considered a pseudo-code.


## User registration

From the user point of view, registration process consists of two steps:
1. Submit their name, surname, e-mail and password in registration form
2. Activate the account by clicking to a button in registration e-mail

First step might be performed using API endpoint `/user/register`, the activation URL will then be redirected to given URL of your choice with appended registration_result parameter.

**1. Registrate user using API**<br>
```sh
curl -H 'Content-Type: application/json' \
	-d '{ "firstName": "Jan", "lastName": "Novák", "email": "jan@novak.cz", "password": "mySecretPassword", "redirectAfter": "https://receptury.cz/registration-finished" }' \
	-X POST \
	https://jidelny.cz/wp-json/receptury/v1/user/register
```

If everything went well, user receives activation e-mail and following response is returned from API:
```json
{
	"success": true
}
```

**2. User activates account**<br>
Clicking on the activation button in the e-mail, account is confirmed and user is redirected to `https://receptury.cz/registration-finished?registration_result=success`.

There might be an errors in the activation process, which will reflect in `registration_result` parameter, so you can show an error in you application:

- `?registration_result=invalid` Activation link was malformed (secure hash is missing) or user wasn't found by secure hash.
- `?registration_result=failed` Activation failed with unknown error.



## Reset user's password

Password reset works in following steps:
1. User enters an e-mail address on `https://jidelny.cz/profil/zapomenute-heslo/`
2. Link to new password form is sent to given e-mail, if this e-mail is associated with any account on Jidelny.cz
3. User clicks on the link and submits a new password

The process has to be completed on Jidelny.cz, but you can set parameter `redirectAfter` to redirect the user back to your application after step 3.<br>
The link to reset password from your app may look like this:

`https://jidelny.cz/profil/zapomenute-heslo/?redirectAfter=https://receptury.cz/password-reset-complete`

In this example, user will be redirected to `https://receptury.cz/password-reset-complete` after the reset password process is complete.



## API authentication and authorization

Most of enpoints, which works with user's private data, are authorized using token with 2-hours expiracy interval. Token must be created using a `/user/login`. With token you can then call other endpoints, each call of such endpoint will reset the token expiracy. The token will expire 2 hours after the last call of any authorized endpoint.<br>
After the token expires, user must log in again.

**1. Log user in**<br>
```sh
curl -H 'Content-Type: application/json' \
	-d '{ "email": "jan@novak.cz", "password": "mySecretPassword" }' \
	-X POST \
	https://jidelny.cz/wp-json/receptury/v1/user/login
```

Response:
```json
{
	"email": "jan@novak.cz",
	"token": "<64-charactersAuthToken>",
	"tokenValidTo": "2024-03-24T22:15:36+00:00"
}
```

**2. Authorize endpoint with token** demonstrated on endpoint to validate user's membership<br>
```sh
curl -H 'Content-Type: application/json' \
	-d '{ "token": "<64-charactersAuthToken>" }' \
	-X POST \
	https://jidelny.cz/wp-json/receptury/v1/user/validate
```

Response:
```json
{
	"email": "jan@novak.cz",
	"tokenValidTo": "2024-03-24T22:15:36+00:00",
	"paid": false,
    "paidTo": null
}
```



## Buy / renew membership

API allows you to benefit from complex checkout process on Jidelny.cz. Ie. a membership can be bought or extended by following these steps:
1. Add membership cart item to Jidelny.cz cart using authorized endpoint `/cart/buy-membership`, get order token from response
2. Redirect user to `/cart/redirect` with order token from step 1 to finish the checkout process
3. After the order is placed on Jidelny.cz, user is redirected back to your app

The process is the same for new members and expiring members. For new members, Jidelny.cz will create a year-long membership starting from the day when the payment is received. For returning members, their membership will extended for 1 year from the end of their expiring membership.

Order token returned in step 1 expires in 5 minutes, so the redirection in step 2 has to be made ASAP.<br>
Cart item's price, vat and title can be set in Jidelny.cz admin.

**1. Add membership cart item**<br>
```sh
curl -H 'Content-Type: application/json' \
	-d '{ "token": "<64-charactersAuthToken>" }' \
	-X POST \
	https://jidelny.cz/wp-json/receptury/v1/cart/buy-membership
```

Expected response:
```json
{
	"orderToken": "<64-charactersOrderHash>",
	"orderTokenValidTo": "2024-03-24T22:15:36+00:00"
}
```

**2. Redirect user to returned URL**<br>
Redirect user to Jidelny.cz with order token and redirectAfter parameters.

`https://jidelny.cz/wp-json/receptury/v1/cart/redirect/?orderToken=<64-charactersOrderToken>&redirectAfter=https://receptury.cz/order-complete`

Jidelny.cz system checks the validity of the order token and uses it to find the user profile and cart content added in step 1.

**3. User returns to your app**<br>
After user finishes the checkout process, he is redirected back to URL given in `redirectAfter` parameter. The URL is extended with `order_result` parameter with code reflecting the order result.<br>
In this example, user would be redirected back to `https://receptury.cz/order-complete?order_result=success`.<br>
The parameter `order_result` may have several values, which should be handled in your app:

- `?order_result=success`<br>
Order was successfully placed and paid using Comgate. User's membership is now valid.
- `?order_result=pending`<br>
Order was successfully placed, but the payment wasn't yet received. User's is not yet valid.<br>
This scenario might happen in several cases:
	- User selected payment by bank transfer, a proforma invoice was sent to their e-mail.
	- There was a problem on Comgate (insufficient balance). User may pay later using a link from e-mail.
- `?order_result=authorized`<br>
Order was successfully placed, the payment was authorized, but wasn't yet received. User's membership is not yet valid.
- `?order_result=cancelled`<br>
Order was successfully placed, but the payment was cancelled on Comgate. User may pay later using a link from e-mail.<br>User's membership is not valid.
- `?order_result=invalid`<br>
Order hash is invalid or expired. User's membership status is unknown.
- `?order_result=failed`<br>
An unknown error occured. User's membership status is unknown.

After the user is returned back to your app, it is recommended to validate his membership using `/user/validate` endpoint, since it always returns fresh status.
