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

        #for message in client.sms.messages.list():
        #    print message.body
        messages = client.sms.messages.list(direction="inbound")
        for message in messages:
            #message.date_sent = datetime.isoformat(message.date_sent)
            pass
        return messages
        