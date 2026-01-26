from flask import Flask, render_template

app = Flask(__name__, template_folder="templates", static_folder="static")

@app.route("/")
def home():
    return render_template("about.html")

# DO NOT use app.run()
