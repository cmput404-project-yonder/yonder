# Yonder API
Yonder API documentation

## Version: v1

### Security
**Basic**  

|basic|*Basic*|
|---|---|

### /author/{author_id}/followers

#### GET
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| author_id | path |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [ [AuthorFollower](#AuthorFollower) ] |

### /author/{author_id}/followers/{follower_id}

#### GET
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| author_id | path |  | Yes | string |
| follower_id | path |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [AuthorFollower](#AuthorFollower) |

#### PUT
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| author_id | path |  | Yes | string |
| follower_id | path |  | Yes | string |
| data | body |  | Yes | [AuthorFollower](#AuthorFollower) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [AuthorFollower](#AuthorFollower) |

#### DELETE
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| author_id | path |  | Yes | string |
| follower_id | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 204 |  |

### /author/{author_id}/posts/

#### GET
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| author_id | path |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [ [Post](#Post) ] |

#### POST
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| author_id | path |  | Yes | string |
| data | body |  | Yes | [Post](#Post) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 201 |  | [Post](#Post) |

### /author/{author_id}/posts/{id}

#### GET
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| author_id | path |  | Yes | string |
| id | path | A UUID string identifying this post. | Yes | string (uuid) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [Post](#Post) |

#### PUT
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| author_id | path |  | Yes | string |
| id | path | A UUID string identifying this post. | Yes | string (uuid) |
| data | body |  | Yes | [Post](#Post) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [Post](#Post) |

#### PATCH
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| author_id | path |  | Yes | string |
| id | path | A UUID string identifying this post. | Yes | string (uuid) |
| data | body |  | Yes | [Post](#Post) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [Post](#Post) |

#### DELETE
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| author_id | path |  | Yes | string |
| id | path | A UUID string identifying this post. | Yes | string (uuid) |

##### Responses

| Code | Description |
| ---- | ----------- |
| 204 |  |

### /author/{author_id}/posts/{post_id}/comments/

#### GET
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| author_id | path |  | Yes | string |
| post_id | path |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [ [Comment](#Comment) ] |

#### POST
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| author_id | path |  | Yes | string |
| post_id | path |  | Yes | string |
| data | body |  | Yes | [Comment](#Comment) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 201 |  | [Comment](#Comment) |

### /author/{author_id}/posts/{post_id}/comments/{id}

#### GET
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| author_id | path |  | Yes | string |
| id | path | A UUID string identifying this comment. | Yes | string (uuid) |
| post_id | path |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [Comment](#Comment) |

#### PUT
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| author_id | path |  | Yes | string |
| id | path | A UUID string identifying this comment. | Yes | string (uuid) |
| post_id | path |  | Yes | string |
| data | body |  | Yes | [Comment](#Comment) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [Comment](#Comment) |

#### PATCH
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| author_id | path |  | Yes | string |
| id | path | A UUID string identifying this comment. | Yes | string (uuid) |
| post_id | path |  | Yes | string |
| data | body |  | Yes | [Comment](#Comment) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [Comment](#Comment) |

#### DELETE
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| author_id | path |  | Yes | string |
| id | path | A UUID string identifying this comment. | Yes | string (uuid) |
| post_id | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 204 |  |

### /author/{id}

#### GET
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | A UUID string identifying this author. | Yes | string (uuid) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [Author](#Author) |

#### PUT
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | A UUID string identifying this author. | Yes | string (uuid) |
| data | body |  | Yes | [Author](#Author) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [Author](#Author) |

#### PATCH
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | A UUID string identifying this author. | Yes | string (uuid) |
| data | body |  | Yes | [Author](#Author) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [Author](#Author) |

#### DELETE
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | A UUID string identifying this author. | Yes | string (uuid) |

##### Responses

| Code | Description |
| ---- | ----------- |
| 204 |  |

### /authors

#### GET
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [ [Author](#Author) ] |

### /login

#### POST
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| data | body |  | Yes | [Login](#Login) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 201 |  | [Login](#Login) |

### /logout

#### POST
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| data | body |  | Yes | object |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 201 |  | object |

### /service/author/{author_id}/inbox

#### GET
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| author_id | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

#### POST
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| author_id | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 |  |

#### DELETE
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| author_id | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 204 |  |

### /signup

#### POST
##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| data | body |  | Yes | [Register](#Register) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 201 |  | [Register](#Register) |

### Models


#### AuthorFollower

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| author | string (uuid) |  | Yes |
| follower | string |  | Yes |
| created_at | dateTime |  | No |

#### Author

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | string (uuid) |  | No |
| host | string (uri) |  | No |
| displayName | string |  | Yes |
| github | string (uri) |  | No |

#### Post

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | string (uuid) |  | No |
| title | string |  | Yes |
| source | string (uri) |  | Yes |
| origin | string (uri) |  | Yes |
| description | string |  | Yes |
| content | string |  | Yes |
| contentType | string |  | No |
| author | [Author](#Author) |  | Yes |
| categories | [ string ] |  | No |
| count | integer |  | No |
| size | integer |  | No |
| published | dateTime |  | No |
| visibility | string |  | No |
| unlisted | boolean |  | Yes |

#### Comment

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | string (uuid) |  | No |
| author | string (uuid) |  | Yes |
| post | string (uuid) |  | Yes |
| comment | string |  | Yes |
| contentType | string |  | No |
| published | dateTime |  | Yes |

#### Login

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| username | string |  | Yes |
| password | string |  | Yes |

#### Register

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| username | string | Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. | Yes |
| password | string |  | Yes |
| displayName | string |  | Yes |
| github | string (uri) |  | No |
