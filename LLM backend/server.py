from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/process_message', methods=['POST'])
def process_message():

    data = request.json
    # Call api key here and make it work

    return jsonify({"status": "success", "message": "Message processed"}), 200

if __name__ == '__main__':
    app.run(debug=True)
