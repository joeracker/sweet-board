from flask import Flask
from flask import render_template
from Messages import Messages

app = Flask(__name__)
app.config.from_object('secrets')

@app.route('/debug')
def debug():
    return app.config['TWILIO_ACCOUNT_SID']

@app.route('/')
def display_sweetboard():
    messages = Messages()
    return render_template('sweetboard.html', messages=messages.list(app.config['TWILIO_ACCOUNT_SID'], app.config['TWILIO_AUTH_TOKEN']))    

@app.route('/dump')
def dump():
    messages = Messages()
    return render_template('dump.html', messages=messages.list(app.config['TWILIO_ACCOUNT_SID'], app.config['TWILIO_AUTH_TOKEN']))

if __name__ == '__main__':
    app.debug = True
    app.run(host="0.0.0.0")