from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  

@app.route('/api/health', methods=['GET'])
def health_check():
    """Simple health check endpoint"""
    return jsonify({
        'status': 'success',
        'message': 'Backend is running!',
        'version': '1.0.0'
    })

@app.route('/api/test', methods=['GET'])
def test():
    """Test endpoint"""
    return jsonify({
        'status': 'success',
        'data': {
            'project': 'Guide to Network Troubleshooting',
            'author': 'Noor Babar',
            'purpose': 'Cisco Systems Engineer Intern Application'
        }
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)