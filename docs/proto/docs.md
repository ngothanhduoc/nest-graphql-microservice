# Protocol Documentation

<a name="top"></a>

## Table of Contents

- [user.proto](#user.proto)

  - [CreateUserInput](#user.CreateUserInput)
  - [FindUsersPayload](#user.FindUsersPayload)
  - [UpdateUserInput](#user.UpdateUserInput)
  - [User](#user.User)
  - [UserEdge](#user.UserEdge)

  - [UserService](#user.UserService)

- [saving.proto](#saving.proto)

  - [CreateSavingInput](#saving.CreateSavingInput)
  - [UpdateUserInput](#saving.UpdateSavingInput)
  - [Saving](#saving.Saving)

  - [SavingsService](#saving.SavingsService)

- [Scalar Value Types](#scalar-value-types)

<a name="user.proto"></a>

<p align="right"><a href="#top">Top</a></p>

## user.proto

<a name="user.CreateUserInput"></a>

### CreateUserInput

| Field    | Type              | Label | Description |
| -------- | ----------------- | ----- | ----------- |
| name     | [string](#string) |       |             |
| email    | [string](#string) |       |             |
| password | [string](#string) |       |             |
| age      | [int32](#int32)   |       |             |

<a name="user.FindUsersPayload"></a>

### FindUsersPayload

| Field    | Type                                  | Label    | Description |
| -------- | ------------------------------------- | -------- | ----------- |
| edges    | [UserEdge](#user.UserEdge)            | repeated |             |
| pageInfo | [commons.PageInfo](#commons.PageInfo) |          |             |

<a name="user.UpdateUserInput"></a>

### UpdateUserInput

| Field | Type               | Label | Description |
| ----- | ------------------ | ----- | ----------- |
| id    | [string](#string)  |       |             |
| data  | [User](#user.User) |       |             |

<a name="user.User"></a>

### User

| Field     | Type              | Label | Description |
| --------- | ----------------- | ----- | ----------- |
| id        | [string](#string) |       |             |
| name      | [string](#string) |       |             |
| email     | [string](#string) |       |             |
| password  | [string](#string) |       |             |
| age       | [int32](#int32)   |       |             |
| createdAt | [string](#string) |       |             |
| updatedAt | [string](#string) |       |             |
| version   | [int32](#int32)   |       |             |

<a name="user.UserEdge"></a>

### UserEdge

| Field  | Type               | Label | Description |
| ------ | ------------------ | ----- | ----------- |
| node   | [User](#user.User) |       |             |
| cursor | [string](#string)  |       |             |

<a name="user.UserService"></a>

### UserService

| Method Name | Request Type                             | Response Type                              | Description |
| ----------- | ---------------------------------------- | ------------------------------------------ | ----------- |
| find        | [.commons.Query](#commons.Query)         | [FindUsersPayload](#user.FindUsersPayload) |             |
| findById    | [.commons.Id](#commons.Id)               | [User](#user.User)                         |             |
| findOne     | [.commons.Query](#commons.Query)         | [User](#user.User)                         |             |
| count       | [.commons.Query](#commons.Query)         | [.commons.Count](#commons.Count)           |             |
| create      | [CreateUserInput](#user.CreateUserInput) | [User](#user.User)                         |             |
| update      | [UpdateUserInput](#user.UpdateUserInput) | [User](#user.User)                         |             |
| destroy     | [.commons.Query](#commons.Query)         | [.commons.Count](#commons.Count)           |             |

<a name="saving.proto"></a>

<p align="right"><a href="#top">Top</a></p>

## saving.proto

<a name="saving.CreateUserInput"></a>

### CreateSavingInput

| Field         | Type              | Label | Description |
| ------------- | ----------------- | ----- | ----------- |
| usersId       | [string](#string) |       |             |
| balanceAmount | [float](#float)   |       |             |

<a name="saving.UpdateUserInput"></a>

### UpdateSavingInput

| Field   | Type              | Label | Description |
| ------- | ----------------- | ----- | ----------- |
| usersId | [string](#string) |       |             |
| amount  | [int64](#int64)   |       |             |

<a name="saving.Saving"></a>

### Saving

| Field         | Type              | Label | Description |
| ------------- | ----------------- | ----- | ----------- |
| id            | [string](#string) |       |             |
| usersId       | [string](#string) |       |             |
| balanceAmount | [float](#float)   |       |             |
| createdAt     | [string](#string) |       |             |
| updatedAt     | [string](#string) |       |             |

<a name="saving.SavingsService"></a>

### UserService

| Method Name | Request Type                                   | Response Type            | Description |
| ----------- | ---------------------------------------------- | ------------------------ | ----------- |
| findOne     | [.commons.Query](#commons.Query)               | [Saving](#saving.Saving) |             |
| create      | [CreateSavingInput](#saving.CreateSavingInput) | [Saving](#saving.Saving) |             |
| update      | [UpdateSavingInput](#saving.UpdateSavingInput) | [Saving](#saving.Saving) |             |

<a name="saving.proto"></a>

<p align="right"><a href="#top">Top</a></p>

## saving.proto

<a name="saving.CreateUserInput"></a>

### CreateSavingInput

| Field         | Type              | Label | Description |
| ------------- | ----------------- | ----- | ----------- |
| usersId       | [string](#string) |       |             |
| balanceAmount | [float](#float)   |       |             |

<a name="saving.UpdateUserInput"></a>

### UpdateSavingInput

| Field   | Type              | Label | Description |
| ------- | ----------------- | ----- | ----------- |
| usersId | [string](#string) |       |             |
| amount  | [int64](#int64)   |       |             |

<a name="saving.Saving"></a>

### Saving

| Field         | Type              | Label | Description |
| ------------- | ----------------- | ----- | ----------- |
| id            | [string](#string) |       |             |
| usersId       | [string](#string) |       |             |
| balanceAmount | [float](#float)   |       |             |
| createdAt     | [string](#string) |       |             |
| updatedAt     | [string](#string) |       |             |

<a name="saving.SavingsService"></a>

### UserService

| Method Name | Request Type                                   | Response Type            | Description |
| ----------- | ---------------------------------------------- | ------------------------ | ----------- |
| findOne     | [.commons.Query](#commons.Query)               | [Saving](#saving.Saving) |             |
| create      | [CreateSavingInput](#saving.CreateSavingInput) | [Saving](#saving.Saving) |             |
| update      | [UpdateSavingInput](#saving.UpdateSavingInput) | [Saving](#saving.Saving) |             |

## Scalar Value Types

| .proto Type                    | Notes                                                                                                                                           | C++ Type | Java Type  | Python Type |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ---------- | ----------- |
| <a name="double" /> double     |                                                                                                                                                 | double   | double     | float       |
| <a name="float" /> float       |                                                                                                                                                 | float    | float      | float       |
| <a name="int32" /> int32       | Uses variable-length encoding. Inefficient for encoding negative numbers – if your field is likely to have negative values, use sint32 instead. | int32    | int        | int         |
| <a name="int64" /> int64       | Uses variable-length encoding. Inefficient for encoding negative numbers – if your field is likely to have negative values, use sint64 instead. | int64    | long       | int/long    |
| <a name="uint32" /> uint32     | Uses variable-length encoding.                                                                                                                  | uint32   | int        | int/long    |
| <a name="uint64" /> uint64     | Uses variable-length encoding.                                                                                                                  | uint64   | long       | int/long    |
| <a name="sint32" /> sint32     | Uses variable-length encoding. Signed int value. These more efficiently encode negative numbers than regular int32s.                            | int32    | int        | int         |
| <a name="sint64" /> sint64     | Uses variable-length encoding. Signed int value. These more efficiently encode negative numbers than regular int64s.                            | int64    | long       | int/long    |
| <a name="fixed32" /> fixed32   | Always four bytes. More efficient than uint32 if values are often greater than 2^28.                                                            | uint32   | int        | int         |
| <a name="fixed64" /> fixed64   | Always eight bytes. More efficient than uint64 if values are often greater than 2^56.                                                           | uint64   | long       | int/long    |
| <a name="sfixed32" /> sfixed32 | Always four bytes.                                                                                                                              | int32    | int        | int         |
| <a name="sfixed64" /> sfixed64 | Always eight bytes.                                                                                                                             | int64    | long       | int/long    |
| <a name="bool" /> bool         |                                                                                                                                                 | bool     | boolean    | boolean     |
| <a name="string" /> string     | A string must always contain UTF-8 encoded or 7-bit ASCII text.                                                                                 | string   | String     | str/unicode |
| <a name="bytes" /> bytes       | May contain any arbitrary sequence of bytes.                                                                                                    | string   | ByteString | str         |
