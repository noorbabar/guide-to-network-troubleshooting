from flask import Blueprint, jsonify
import json
import os

commands_bp = Blueprint('commands', __name__)

@commands_bp.route('/api/commands', methods=['GET'])
def get_commands():
    """Get all network commands"""
    try:
        data_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'commands.json')
        with open(data_path, 'r') as f:
            commands = json.load(f)
        
        return jsonify({
            'status': 'success',
            'data': commands
        }), 200
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@commands_bp.route('/api/commands/<int:command_id>', methods=['GET'])
def get_command(command_id):
    """Get single command by ID"""
    try:
        data_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'commands.json')
        with open(data_path, 'r') as f:
            commands = json.load(f)
        
        command = next((cmd for cmd in commands if cmd['id'] == command_id), None)
        
        if command:
            return jsonify({
                'status': 'success',
                'data': command
            }), 200
        else:
            return jsonify({
                'status': 'error',
                'message': 'Command not found'
            }), 404
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500