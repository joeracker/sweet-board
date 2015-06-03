# Download the Python helper library from twilio.com/docs/libraries
from twilio.rest import TwilioRestClient
from datetime import datetime
 
# Your Account Sid and Auth Token from twilio.com/user/account
account_sid = ""
auth_token  = ""
current_time = str(datetime.now())
message = "SweetBoardTest: " + current_time
client = TwilioRestClient(account_sid, auth_token)

message = client.sms.messages.create(body=message,
    to="+12107141408",
    from_="+12107141408")
print message.sid + " " + message.body
