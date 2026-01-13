from flask import Flask, jsonify
from flask_cors import CORS
from routes.commands import commands_bp
from routes.troubleshooting import troubleshooting_bp
from routes.knowledge_base import kb_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(commands_bp)
app.register_blueprint(troubleshooting_bp)
app.register_blueprint(kb_bp)

@app.route('/api/health', methods=['GET'])
def health_check():
    """Simple health check endpoint"""
    return jsonify({
        'status': 'success',
        'message': 'Backend is running!',
        'version': '1.0.0'
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)