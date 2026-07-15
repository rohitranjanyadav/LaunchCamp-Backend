# Register a user
1. take data
2. validate the data
3. check in DB if user already exists
4. Save the new user(Access Token, Refresh Token, General Token, sendmail)
5. user verification => email
6. send response to the user


# Login a user
1. take data from the user
2. validate
3. check if user exists
4. check if password is correct
5. generate tokens
6. send tokens in cookies (cookie-parser)