from flask import Blueprint, jsonify
import json
import os

troubleshooting_bp = Blueprint('troubleshooting', __name__)

@troubleshooting_bp.route('/api/troubleshooting/scenarios', methods=['GET'])
def get_scenarios():
    """Get all troubleshooting scenarios"""
    try:
        data_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'troubleshooting.json')
        with open(data_path, 'r') as f:
            data = json.load(f)
        
        return jsonify({
            'status': 'success',
            'data': data['scenarios']
        }), 200
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@troubleshooting_bp.route('/api/troubleshooting/question/<question_id>', methods=['GET'])
def get_question(question_id):
    """Get a specific question by ID"""
    try:
        data_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'troubleshooting.json')
        with open(data_path, 'r') as f:
            data = json.load(f)
        
        question = data['questions'].get(question_id)
        
        if question:
            return jsonify({
                'status': 'success',
                'data': question
            }), 200
        else:
            return jsonify({
                'status': 'error',
                'message': 'Question not found'
            }), 404
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@troubleshooting_bp.route('/api/troubleshooting/solution/<solution_id>', methods=['GET'])
def get_solution(solution_id):
    """Get a specific solution by ID"""
    try:
        data_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'troubleshooting.json')
        with open(data_path, 'r') as f:
            data = json.load(f)
        
        solution = data['solutions'].get(solution_id)
        
        if solution:
            return jsonify({
                'status': 'success',
                'data': solution
            }), 200
        else:
            return jsonify({
                'status': 'error',
                'message': 'Solution not found'
            }), 404
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@troubleshooting_bp.route('/api/troubleshooting/scenario/<scenario_id>', methods=['GET'])
def get_scenario(scenario_id):
    """Get complete scenario data including first question"""
    try:
        data_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'troubleshooting.json')
        with open(data_path, 'r') as f:
            data = json.load(f)
        
        # Find the scenario
        scenario = next((s for s in data['scenarios'] if s['id'] == scenario_id), None)
        
        if not scenario:
            return jsonify({
                'status': 'error',
                'message': 'Scenario not found'
            }), 404
        
        # Get the first question
        first_question = data['questions'].get(scenario['startQuestion'])
        
        return jsonify({
            'status': 'success',
            'data': {
                'scenario': scenario,
                'firstQuestion': first_question
            }
        }), 200
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500