#from sweetboard import app 
from twilio.rest import TwilioRestClient
#from datetime import datetime
from datetime import datetime, timedelta, date

# To find these visit https://www.twilio.com/user/account

class Messages():
    
    def __init(self):
        pass
    
    def list(self, account_sid, auth_token):
        client = TwilioRestClient(account_sid, auth_token)
        messages = client.sms.messages.list(direction="inbound")
        return messages
    
    def getMessage(self, account_sid, auth_token, message_sid):
        client = TwilioRestClient(account_sid, auth_token)
        message = client.sms.messages.get(message_sid)
        return message