# Breaking down the route.js file using the Filemaker Data API w/Axios

## Difference between 'Server' Might make a good blog post

Server (Computer): A machine (physical or virtual) that provides services/data.
Server (Software): The program or process running on that machine that listens for requests and responds to them.
Server (File/Configuration): The files/scripts/settings that configure how the software or the computer should operate.

<hr/>

## Key Components of an HTTP Request:

    1.	HTTP Method: This indicates the type of action you want to perform. The most common methods are:

    ◦	GET: Requests data from a server (e.g., viewing a webpage).
    ◦	POST: Submits data to a server (e.g., submitting a form).
    ◦	PUT: Updates existing data on the server.
    ◦	DELETE: Deletes data on the server.

    2.	URL: The address of the resource you want to interact with. For example, in "https://example.com/api/users", https://example.com is the domain, and /api/users is the specific resource you're targeting.

    3.	Headers: Additional information sent with the request, such as authentication tokens, content type, etc. Headers tell the server more about the request and how to handle it.

    4.	Body: (Optional) Contains data sent to the server, typically with POST, PUT, or PATCH requests. This might be form data, JSON, etc.

    5.	Query Parameters: (Optional) Extra data added to the URL to specify the request further. For example, "https://example.com/api/users?id=123" has a query parameter id=123.

<hr/>

## I need to get better understanding how async/await works.

<hr/>

## GET() function

Naming Convention: Yes, it's important to name the function GET() because this is how Next.js knows it should handle GET requests to that API route.

fetch('/api/data'): This line sends an HTTP GET request to the /api/data endpoint.

The fetch function is responsible for making the request to the API route.
The API route's GET() function is triggered by this request and processes it, returning the necessary data.

**_ Can you have more that one export function per route? _**

## Auth function - in axios

auth: {} is an Axios-specific feature that simplifies the process of adding Basic Authentication to your HTTP requests.

Axios automatically encodes the username and password and adds the necessary Authorization header.

## Token

When you send a POST request to the /sessions endpoint, FileMaker creates a new session for you and returns a unique session token. This token is tied to that specific session and must be used in the Authorization header for all subsequent requests during that session.

Token Reuse: Store the session token securely and reuse it for as long as the session is valid. This approach minimizes the need to create new sessions and makes your application more efficient.

## Processing the Retrieved Data

```js
const thisObject = dataResponse.data.response.data;
```

This line extracts the entire array of records returned by the API. Each element in the array corresponds to a record from the EricTesting layout.

Here’s a simplified example of what a single record might look like in the response from FileMaker:

**_ This object structure is specific to the data api _**

```json
{
  "response": {
    "data": [
      {
        "fieldData": {
          "col_1": "Value for col_1",
          "col_2": "Value for col_2"
          // ... other fields
        },
        "portalData": {
          // Data from related records (portals) if any
        },
        "modId": "1", // Modification ID, increments when record is modified
        "recordId": "123" // Unique identifier for this record
      }
      // ... potentially more records
    ]
  }
}
```

The fieldData object is specific to the FileMaker Data API. It is a part of the structure that FileMaker uses to represent the data retrieved from a record in a layout.

Understanding fieldData in FileMaker Data API
When you request records from a layout using the FileMaker Data API, each record returned in the response contains several key components, one of which is the fieldData object.

Structure of a Record in FileMaker Data API
Here’s a simplified example of what a single record might look like in the response from FileMaker:

**Explanation of Key Components in returned object:**

- fieldData:
  What it is: fieldData is an object that contains the actual data fields from the record as defined in the layout.
  Contents: Inside fieldData, each key corresponds to a field name in the layout, and the value is the data stored in that field for the particular record.
  Use Case: You access the values of fields (like col_1, col_2, etc.) directly from this fieldData object.

- portalData:
  What it is: portalData contains related records (from portals) if your layout includes related tables.
  Contents: Each portal has its own structure, and portalData contains the records from these related tables.

- modId:
  What it is: This is a modification ID that increments every time the record is modified. It helps in tracking changes.

- recordId:
  What it is: A unique identifier for the record within the database. It’s often used to perform updates or deletes on the specific record.

### New find: Object.entries --

Object.entries(item.fieldData): This method returns an array of a given object's key-value pairs as arrays. So, each field name and its value are accessible as fieldName and value.
