# Instagram Matcher API

Welcome to the **Instagram Matcher API**! This powerful API allows you to fetch detailed information about Instagram accounts and match user profiles based on gender and other criteria. Whether you're building an app, conducting research, or simply curious about Instagram data, this API provides the tools you need.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Endpoints](#endpoints)
- [Example Response](#example-response)
- [Error Handling](#error-handling)

## Features

- **Fetch Instagram Account Information**: Retrieve detailed information about Instagram accounts, including username, full name, biography, profile picture, followers count, following count, and verification status.
- **Gender Matching**: Match user profiles based on gender using the powerful Genderize API.
- **Retry Mechanism**: Handle rate limits gracefully with automatic retries.
- **Optimized Suggestions**: Get gender-based suggested accounts for better user recommendations.

## Getting Started

To get started with the Instagram Matcher API, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/oguzhan18/instagram-matcher-api.git
   cd instagram-matcher-api
   ```
2. ```bash
   npm install
   ```
3. Set up environment variables:
Create a `.env` file in the root directory and add your API keys. Refer to the **Environment Variables**! section for more details.

4. Run the application:
   ```bash
   npm run start
   ```
## Installation
To install the necessary dependencies, run:
```bash
npm install
```
## Usage
Here's how you can use the Instagram Matcher API to fetch and match Instagram account information:
1. Set up environment variables:
Create a `.env` file in the root directory with the following content:
``ènv
RAPIDAPI_KEY=your_rapidapi_key_here
```
2. Start the server:
```bash
npm run start
```
3. Make a request:
Use a tool like Postman or curl to make a GET request to the `/instagram-matcher/match` endpoint with a `username` query parameter.

## Environment Variables
The following environment variables are required for the Instagram Matcher API:
* `RAPIDAPI_KEY:` Your RapidAPI key for accessing the Instagram Scraper API.
  
## Endpoints
### Match Instagram Account
* Endpoint: `/instagram-matcher/match`
* Method: GET
* Query Parameters:
  * `username` (string): The Instagram username to fetch information for.
 
<b>Example Request:</b>
```bash
curl -X GET 'http://localhost:3000/instagram-matcher/match?username=johndoe'
```
## Example Response
```json
{
  "username": "johndoe",
  "full_name": "John Doe",
  "biography": "Travel enthusiast. Photographer. Food lover.",
  "profile_pic_url": "https://example.com/profile_pic.jpg",
  "followers_count": 1234,
  "following_count": 567,
  "is_verified": true,
  "suggested_accounts": [
    {
      "username": "janedoe",
      "full_name": "Jane Doe",
      "profile_pic_url": "https://example.com/jane_profile_pic.jpg",
      "is_verified": false
    }
  ]
}
```
## Error Handling
The Instagram Matcher API includes robust error handling to ensure smooth operation. Common error responses include:
* 429 Too Many Requests: Rate limit exceeded. The API will automatically retry after a delay.
* 500 Internal Server Error: An error occurred while fetching Instagram account data.

<hr>
<b> Instagram Matcher API is your go-to solution for Instagram account data and gender-based profile matching. Get started today and unlock the full potential of Instagram data! </b>

### Happy Coding!


