import flask
from flask import Flask, render_template

app = Flask(__name__, static_url_path='/static')
# cors = CORS(app)

# url_for('static', filename='style.css')

# @app.route("/")
# def index():
#     return "<p>Hello, World!</p>"

# @app.route('/')
# @app.route('/index')
# def index():
#     return app.send_static_file('index.html')

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    if len(path)==0:
        # return("index")
        return app.send_static_file('index.html')
        # return app.send_static_file('hello.html')
    else:
        return app.send_static_file(path)
        # return 'You want path: %s' % path

# @app.route('/', defaults={'path': ''})
# @app.route('/<path:path>')
# def catch_all(path):
#     print("catchall ", path)
#     #see https://github.com/pallets/flask/issues/3452
#     build_folder = dir_path.joinpath("server", "static")
#     if path != "" and os.path.exists(dir_path.joinpath(build_folder, path)):
#         if path.count("/") > 1:
#             [path, filename] = path.rsplit("/", maxsplit=1)
#             return send_from_directory(dir_path.joinpath(build_folder, path), filename)
#         else:
#             filename = path
#             return send_from_directory(dir_path.joinpath(build_folder), filename)
#     else:
#         return render_template("index.html")

if __name__ == '__main__':
    app.config.from_object('default_settings')
    app.run(host=app.config["APP_HOST"], port=app.config["APP_PORT"], debug=True)

    # app.run()
    # app.run(debug=True)
