# Receptury API endpoints

Endpoints URLs are described relatively to `http://jidelny.test/wp-json/receptury/v1` address. All endpoints are also available on https://jidelny.cz/wp-json/receptury/v1.

`DateTime` data type is returned as ISO 8601 string (ie. 2024-03-24T22:15:36+00:00).

## About error

Error responds with 4xx or 5xx HTTP status, unique error `code` string and czech error `message`, sometimes extended with additional `data` object.

Following errors might be returned by almost all endpoints:

`ip_forbidden` (403): If not documented otherwise, endpoints are accessible only from predefined IP addresses. This error is returned if accessed from forbidden IP.<br>
`rest_invalid_param` (400): Given parameter is given in unexpected format.<br>
`rest_missing_callback_param` (400): Required parameter is missing.<br>



## Register user `/user/register` (POST)
Create user account and send activation e-mail with follwing redirection to given URL.<br>
URL in `redirectAfter` will be extended with parameter `registration_result` with value *success*, *malformed* or *failed*.

### Arguments
*string `firstName`* Required<br>
*string `lastName`* Required<br>
*string `email`* Required, e-mail format<br>
*string `password`* Required, minlength 6, one uppercase and one lowercase character<br>
*string `redirectAfter`* Optional, URL format

### Returns
*bool `success`* Whether the registration was successful

### Errors
`email_exists` (400): When user with given e-mail already exists



## Login user `/user/login` (POST)
Generate token to be used in other methods to authenticate user.

### Arguments
*string `email`* Required, e-mail format<br>
*string `password`* Required, minlength 6

### Returns
*string `token`* 64-characters token, which will expire in 2 hours<br>
*DateTime `tokenValidTo`* Date and time when the token expires<br>
*string `email`* User's e-mail for additional check

### Errors
`user_not_found` (404)<br>
`password_incorrect` (401)



## Validate user `/user/validate` (POST)
Validate user's token obtained by login endopoint and check if user has paid membership.

### Arguments
*string `token`* Required, length 64

### Returns
*bool `paid`* Whether the membership is paid and valid<br>
*DateTime|null `paidTo`* Date and time when the paid membership expires or null if not paid<br>
*DateTime `tokenValidTo`* Date and time when the token expires<br>
*string `email`* User's e-mail for additional check

### Errors
`user_not_found` (404)<br>
`token_expired` (401)



## Get user profile `/user/profile` (POST)
Get data associated with user profile.<br>
Profile data might be incomplete right after registration - some fields are not required in registration, but has to be given in checkout process and profile edit. See return field comments.

### Arguments
*string `token`* Required, length 64

### Returns
*string `firstName`* Always<br>
*string `lastName`* Always<br>
*string `email`* Always<br>
*string `phone`* Optional<br>

*bool `invoiceIsCompany`* Whether to invoice to company.<br>
*string `invoiceCompanyId`* Might not be relevant when `invoiceIsCompany` = false<br>
*string `invoiceCompanyName`* Might not be relevant when `invoiceIsCompany` = false<br>
*string `invoiceCompanyVatId`* Might not be relevant when `invoiceIsCompany` = false<br>
*string `invoiceStreet`* Always after first order<br>
*string `invoiceCity`* Always after first order<br>
*string `invoiceZip`* Always after first order<br>

*bool `deliveryIsDifferent`* Whether delivery address differs from invoice address.<br>
*string `deliveryStreet`* Might not be relevant when `deliveryIsDifferent` = false<br>
*string `deliveryCity`* Might not be relevant when `deliveryIsDifferent` = false<br>
*string `deliveryZip`* Might not be relevant when `deliveryIsDifferent` = false



## Edit user profile `/user/edit` (POST)
Edit user's profile data. Validaiton of each field is described in arguments comments.

### Arguments
*string `token`* Required, length 64<br>
*string `firstName`* Required<br>
*string `lastName`* Required<br>
*string `email`* Required, e-mail format<br>
*string `phone`* Optional, phone format \+[0-9]{3} [0-9]{3} [0-9]{3} [0-9]{3}\<br>

*bool `invoiceIsCompany`* Required<br>
*string `invoiceCompanyId`* Required if `invoiceIsCompany` = true, validated using ARES<br>
*string `invoiceCompanyName`* Required if `invoiceIsCompany` = true<br>
*string `invoiceCompanyVatId`* Optional, validated if matches with `invoiceCompanyId` using ARES<br>
*string `invoiceStreet`* Required<br>
*string `invoiceCity`* Required<br>
*string `invoiceZip`* Required, minlength 4<br>

*bool `deliveryIsDifferent`* Required<br>
*string `deliveryStreet`* Required if `deliveryIsDifferent` = true<br>
*string `deliveryCity`* Required if `deliveryIsDifferent` = true<br>
*string `deliveryZip`* Required if `deliveryIsDifferent` = true, minlength 4

### Returns
*bool `success`* Whether the update was successful

### Errors
`user_not_found` (404)<br>
`token_expired` (401)<br>
`company_id_invalid` (400): ARES validation was unsuccessful<br>
`email_exists` (400): When changing e-mail address to a value, which is already used by another user



## Add membership to cart `/cart/buy-membership` (POST)
Accociate membership cart item with the user. Membership can be later claimed using `/cart/redirect`.

### Arguments
*string `token`* Required, length 64<br>

### Returns
*DateTime `orderTokenValidTo`* Date and time when the order token expires<br>
*string `orderToken`* 64-characters token, which will expire in 5 minutes

### Errors
`user_not_found` (404)<br>
`token_expired` (401)



## Redirect user to checkout `/cart/redirect` (GET)
Redirect user to this endpoint after `/cart/buy-membership` call.<br>

> This endpoint should be used as redirection landing page, opened in browser. Redirect the user to this endpoint from front-end.<br>
> Referrer IP address is not checked in this endpoint.

### Arguments
*string `orderToken`* Required, length 64 (value from `/cart/buy-membership` response)<br>
*string `redirectAfter`* Required, URL format

### Returns
void

### Errors
No errors in redirect