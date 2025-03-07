# MARKETPLACE-APIS

## Test

| HTTP Method | path                     | RequestBody | Response                                               |
| ----------- | ------------------------ | ----------- | ------------------------------------------------------ |
| GET         | /testing                 | none        | {"message":"The testing endpoint functions correctly"} |
| GET         | /test/get                | none        | { "message": "TESTGETJSON" }                           |
| GET         | /test/ethers             | none        | {"status":"ok","blocknumber":14834871}                 |
| GET         | /test/moralisNFTMETADATA | none        | {"status":"ok","metadata":{...metadata}}               |

---

## Orders

| HTTP Method | path                                    | RequestBody                 | Response                                                | Notes         |
| ----------- | --------------------------------------- | --------------------------- | ------------------------------------------------------- | ------------- |
| GET         | /orders                                 | none                        | { "status": "ok", "orders": [{...},{...},{...}]}        |               |
| GET         | /orders?chain=42&limit=20&offset=10     | none                        | { "status": "ok", "orders": [{...},{...},{...}]}        | See Notes \*1 |
| GET         | /orders/{id}                            | none                        | { "status": "ok", "order": {...}}                       |               |
| GET         | /orders/collection/{collection_address} | none                        | { "status": "ok", "orders": [{...},{...},{...}]}        |               |
| GET         | /orders/owner/{owner_address}           | none                        | { "status": "ok", "orders": [{...},{...},{...}]}        |               |
| POST        | /orders                                 | \*required                  | { "status": "ok", "body": {...req.body} , "orderId": 1} |               |
| POST        | /orders/confirm                         | {orderId,message,signature} | { "status": "ok", "orderId": 1}                         |               |
| POST        | /orders/cancel                          | {orderId,message,signature} | { "status": "ok", "orderId": 1}                         |               |

---

## Proofs

| HTTP Method | path                | RequestBody                | Response                                          |
| ----------- | ------------------- | -------------------------- | ------------------------------------------------- |
| POST        | /proof/swap         | {order,chainId,tokenIndex} | { "status": "ok", order,chainId,tokenIndex,proof} |
| POST        | /proof/partial-swap | {order,token}              | { "status": "ok", order,token,proof}              |
| POST        | /proof/claim        | {order,account,token}      | { "status": "ok", order,account,proof}            |

---

## NFTs

| HTTP Method | path                                 | RequestBody | Response                                 | Notes                                  |
| ----------- | ------------------------------------ | ----------- | ---------------------------------------- | -------------------------------------- |
| GET         | /nft/metadata/{address}/{id}/{chain} | none        | {"status":"ok","metadata":{...metadata}} | chainId is in hexadecimal (eg. "0x89") |

---

## Disputes

| HTTP Method | path                  | RequestBody                                   | Response                                      | Notes         |
| ----------- | --------------------- | --------------------------------------------- | --------------------------------------------- | ------------- |
| GET         | /disputes             | none                                          | { "status": "ok", disputes }                  |               |
| GET         | /disputes/{id}        | none                                          | { "status": "ok", dispute }                   |               |
| POST        | /disputes/            | { email, address, orderLink, type, comments } | { "status": "ok", body: req.body, disputeId } |               |
| POST        | /disputes/update/{id} | { resolved (boolean), adminComment (string) } | { "status": "ok", dispute(updated) }          | See Notes \*2 |

---

## Collections

| HTTP Method | path                        | RequestBody | Response                        | Notes         |
| ----------- | --------------------------- | ----------- | ------------------------------- | ------------- |
| GET         | /collections?chain=80001,42 | none        | { "status": "ok", collections } | See Notes \*3 |
| GET         | /collections/{address}      | none        | { "status": "ok", collection }  |               |

---

## Users

| HTTP Method | path             | RequestBody | Response                  | Notes         |
| ----------- | ---------------- | ----------- | ------------------------- | ------------- |
| GET         | /users/          | none        | { "status": "ok", users } | See Notes \*4 |
| GET         | /users/{address} | none        | { "status": "ok", user }  |               |

---

### Notes

\*1 : all queries are optional. default values : limit:500 (this will soon be changed to a lower number), offset: 0

\*2 : this API endpoint for admin to manage and keep track of disputes.

\*3 : chain is required in query params, multiple chains can be passed as argument separated by **comma**. This endpoint supports pagination with **offsets** and **limits**.

\*4 : This endpoint supports pagination with **offsets** and **limits**.

#### Development Starting From SCB10X - May 2022 - Hackathon
