import json

from flask import Flask, render_template
from flask import render_template
from flask import request
from Messages import Messages

app = Flask(__name__)
app.config.from_object('secrets')

@app.route('/')
def display_sweetboard():
    messages = Messages()
    return render_template('index.html', messages=messages.list(app.config['TWILIO_ACCOUNT_SID'], app.config['TWILIO_AUTH_TOKEN']))    

@app.route('/api/message/<sid>.json')
def get_message(sid):
    messages = Messages()
    
    msg = messages.getMessage(app.config['TWILIO_ACCOUNT_SID'], 
        app.config['TWILIO_AUTH_TOKEN'], 
        sid)
    return json.dumps({"sid": msg.sid, "body": msg.body, "date_sent": msg.date_sent, "from": msg.from_})

@app.route('/api/messages.json')
def get_messages():
    messages = Messages()
    messages=messages.list(app.config['TWILIO_ACCOUNT_SID'], app.config['TWILIO_AUTH_TOKEN'])
    ret_message = []
    for msg in messages:
        if msg.direction == 'inbound':
            ret_message.append({"sid": msg.sid, "body": msg.body, "date_sent": str(msg.date_sent), "from": msg.from_})
    
    return json.dumps(ret_message)

@app.route('/api/messages_sid.json')
def get_message_sid_list():
    messages = Messages()
    messages=messages.list(app.config['TWILIO_ACCOUNT_SID'], app.config['TWILIO_AUTH_TOKEN'])
    message_sid_list = []
    for message in messages:
        if message.direction == 'inbound':
            message_sid_list.append(message.sid)
    
    return json.dumps(message_sid_list)

@app.route('/archive')
def get_archive():
    messages = Messages()
    return render_template('archive.html', messages=messages.list(app.config['TWILIO_ACCOUNT_SID'], app.config['TWILIO_AUTH_TOKEN']))    

@app.route("/new_sweet", methods=["GET", "POST"])
def new_sweetness():
    if request.method == "POST":
        pass
    else:
        return render_template("add.html")

@app.route("/sprite_demo/<character>/<direction>/<action>/")
def sprite_demo(character, direction, action):
    return render_template('sprite.html', character=character, direction=direction, action=action)

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
