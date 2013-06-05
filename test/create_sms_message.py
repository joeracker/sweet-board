# Download the Python helper library from twilio.com/docs/libraries
from twilio.rest import TwilioRestClient
from datetime import datetime
 
# Your Account Sid and Auth Token from twilio.com/user/account
account_sid = "AC616fbbf5c3dedbedf36db0bbb38853f5"
auth_token  = "aa3c91e49e8c8995a1be057f96cd33e5"
current_time = str(datetime.now())
message = "SweetBoardTest: " + current_time
client = TwilioRestClient(account_sid, auth_token)

message = client.sms.messages.create(body=message,
    to="+12107141408",
    from_="+12107141408")
print message.sid + " " + message.body