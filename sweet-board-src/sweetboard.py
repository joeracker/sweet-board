
from flask import Flask, render_template
from flask import render_template
from flask import request
from Messages import Messages

app = Flask(__name__)
app.config.from_object('secrets')

@app.route('/')
def display_sweetboard():
    messages = Messages()
    return render_template('sweetboard.html', messages=messages.list(app.config['TWILIO_ACCOUNT_SID'], app.config['TWILIO_AUTH_TOKEN']))    

@app.route('/message/<sid>')
def get_message(sid):
    messages = Messages()
    return render_template('message.html', 
        message=messages.getMessage(app.config['TWILIO_ACCOUNT_SID'], 
        app.config['TWILIO_AUTH_TOKEN'], 
        sid))    

@app.route('/message_sid_list')
def get_message_sid_list():
    messages = Messages()
    messages=messages.list(app.config['TWILIO_ACCOUNT_SID'], app.config['TWILIO_AUTH_TOKEN'])
    message_sid_list = []
    for message in messages:
        if message.direction == 'inbound':
            message_sid_list.append(message.sid)
    
    message_sids=",".join(message_sid_list)
    #return render_template('message_sid_list.html', message_sids=",".join(message_sid_list))    
    return message_sids

@app.route('/archive')
def get_archive():
   messages = Messages()
   return render_template('archive.html', messages=messages.list(app.config['TWILIO_ACCOUNT_SID'], app.config['TWILIO_AUTH_TOKEN']))    

@app.route("/new_sweet", methods=["GET", "POST"])
def new_sweetness():
    if request.method == "POST":
        pass
    else:
        return render_template("add.html");

@app.route('/debug')
def debug():
    return app.config['TWILIO_ACCOUNT_SID']

@app.route('/dump')
def dump():
    messages = Messages()
    return render_template('dump.html', 
    messages=messages.list(app.config['TWILIO_ACCOUNT_SID'], 
    app.config['TWILIO_AUTH_TOKEN']))

if __name__ == '__main__':
    app.debug = True
    app.run(host="0.0.0.0")